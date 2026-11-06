import os from 'node:os';
import { readdir } from 'node:fs/promises';

import {
  unavailable,
  type CpuStats,
  type GpuDevice,
  type GpuStats,
  type MemoryStats,
  type ProcessRow,
  type ProcessStats,
  type SwapDevice,
  type Unavailable,
  type ZramStats,
} from '../shared/stats.ts';
import { readText, run } from './exec.ts';

const KIB = 1024;
const MIB = 1024 * 1024;

type CoreTimes = { user: number; nice: number; sys: number; idle: number; irq: number };

const clampPercent = (value: number): number => Math.min(100, Math.max(0, value));

const cpuUsage = (previous: CoreTimes[], next: CoreTimes[]): { total: number; perCore: number[] } | null => {
  if (previous.length === 0 || previous.length !== next.length) return null;
  let busyAll = 0;
  let totalAll = 0;
  const perCore: number[] = [];
  for (let index = 0; index < next.length; index++) {
    const before = previous[index];
    const after = next[index];
    if (!before || !after) return null;
    const busy = (after.user - before.user) + (after.nice - before.nice) + (after.sys - before.sys) + (after.irq - before.irq);
    const total = busy + (after.idle - before.idle);
    busyAll += busy;
    totalAll += total;
    perCore.push(total > 0 ? clampPercent((busy / total) * 100) : 0);
  }
  if (totalAll <= 0) return null;
  return { total: clampPercent((busyAll / totalAll) * 100), perCore };
};

const parseMeminfo = (text: string): { total: number; available: number; swapTotal: number; swapFree: number } | null => {
  const read = (name: string): number | null => {
    const match = new RegExp(`^${name}:\\s+(\\d+) kB`, 'm').exec(text);
    if (!match?.[1]) return null;
    const value = Number(match[1]);
    return Number.isFinite(value) ? value * KIB : null;
  };
  const total = read('MemTotal');
  const available = read('MemAvailable');
  if (total === null || available === null) return null;
  return {
    total,
    available,
    swapTotal: read('SwapTotal') ?? 0,
    swapFree: read('SwapFree') ?? 0,
  };
};

const parseZram = (text: string): ZramStats | null => {
  const line = text.split(/\r?\n/).map((value) => value.trim()).find(Boolean);
  if (!line) return null;
  const parts = line.split(/\s+/);
  if (parts.length < 6) return null;
  const [algo, disksize, data, compr, memUsed] = parts.slice(1);
  const numbers = [disksize, data, compr, memUsed].map((value) => Number(value));
  if (numbers.some((value) => !Number.isFinite(value))) return null;
  return {
    algo: algo ?? 'zram',
    disksize: numbers[0] ?? 0,
    data: numbers[1] ?? 0,
    compr: numbers[2] ?? 0,
    memUsed: numbers[3] ?? 0,
  };
};

const parseSwaps = (text: string): SwapDevice[] => {
  const devices: SwapDevice[] = [];
  for (const line of text.split(/\r?\n/).slice(1)) {
    const parts = line.trim().split(/\s+/);
    if (parts.length < 5) continue;
    const [name, type, size, used, priority] = parts;
    const sizeBytes = Number(size) * KIB;
    const usedBytes = Number(used) * KIB;
    const prio = Number(priority);
    if (!Number.isFinite(sizeBytes) || !Number.isFinite(usedBytes)) continue;
    devices.push({ name: name ?? '', type: type ?? '', size: sizeBytes, used: usedBytes, priority: Number.isFinite(prio) ? prio : 0 });
  }
  return devices;
};

const readCpuTemp = async (): Promise<number | null> => {
  const entries = await readdir('/sys/class/hwmon').catch(() => [] as string[]);
  let best: number | null = null;
  for (const entry of entries) {
    const base = `/sys/class/hwmon/${entry}`;
    const name = (await readText(`${base}/name`))?.trim().toLowerCase() ?? '';
    if (!['coretemp', 'k10temp', 'zenpower', 'cpu_thermal', 'soc_thermal'].includes(name)) continue;
    const files = await readdir(base).catch(() => [] as string[]);
    for (const file of files) {
      if (!/^temp\d+_input$/.test(file)) continue;
      const raw = Number((await readText(`${base}/${file}`))?.trim());
      if (!Number.isFinite(raw)) continue;
      const celsius = raw / 1000;
      if (best === null || celsius > best) best = celsius;
    }
  }
  if (best !== null) return Math.round(best * 10) / 10;

  const zones = await readdir('/sys/class/thermal').catch(() => [] as string[]);
  for (const zone of zones) {
    if (!/^thermal_zone\d+$/.test(zone)) continue;
    const base = `/sys/class/thermal/${zone}`;
    const type = (await readText(`${base}/type`))?.trim().toLowerCase() ?? '';
    if (!type.includes('x86_pkg_temp') && !type.includes('cpu')) continue;
    const raw = Number((await readText(`${base}/temp`))?.trim());
    if (Number.isFinite(raw)) return Math.round((raw / 1000) * 10) / 10;
  }
  return null;
};

const numberOrNull = (text: string | undefined): number | null => {
  if (text === undefined) return null;
  const value = Number(text.trim());
  return text.trim() !== '' && Number.isFinite(value) ? value : null;
};

const parseNvidia = (text: string): GpuDevice[] => {
  const devices: GpuDevice[] = [];
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const parts = line.split(',').map((part) => part.trim());
    // name may contain commas; the six numbers are always last.
    if (parts.length < 7) continue;
    const clock = numberOrNull(parts.pop());
    const power = numberOrNull(parts.pop());
    const temp = numberOrNull(parts.pop());
    const total = numberOrNull(parts.pop());
    const used = numberOrNull(parts.pop());
    const utilization = numberOrNull(parts.pop());
    devices.push({
      name: parts.join(', ') || 'NVIDIA GPU',
      utilization: utilization === null ? null : clampPercent(utilization),
      memUsed: used === null ? null : used * MIB,
      memTotal: total === null ? null : total * MIB,
      tempC: temp,
      powerW: power,
      clockMhz: clock,
    });
  }
  return devices;
};

type GpuProc = { type: string; sm: number | null; mem: number | null };

const parsePmon = (text: string): Map<number, GpuProc> => {
  const map = new Map<number, GpuProc>();
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const fields = trimmed.split(/\s+/);
    if (fields.length < 5) continue;
    const pid = Number(fields[1]);
    if (!Number.isInteger(pid)) continue;
    map.set(pid, {
      type: fields[2] ?? '',
      sm: fields[3] === '-' ? null : numberOrNull(fields[3]),
      mem: fields[4] === '-' ? null : numberOrNull(fields[4]),
    });
  }
  return map;
};

export type SystemCollector = {
  prime: () => Promise<void>;
  cpu: () => Promise<CpuStats | Unavailable>;
  memory: () => Promise<MemoryStats | Unavailable>;
  gpu: () => Promise<GpuStats | Unavailable>;
  processes: () => Promise<ProcessStats | Unavailable>;
};

export const createSystemCollector = (): SystemCollector => {
  let previousTimes: CoreTimes[] = [];
  let zramCache: { at: number; value: ZramStats | null } | null = null;
  let swapsCache: { at: number; value: SwapDevice[] } | null = null;
  let tempCache: { at: number; value: number | null } | null = null;
  let gpuProcCache: { at: number; value: Map<number, GpuProc> } | null = null;
  let gpuCache: { at: number; value: GpuStats | Unavailable } | null = null;
  let processCache: { at: number; value: ProcessStats | Unavailable } | null = null;

  const now = () => Date.now();

  return {
    prime: async () => {
      previousTimes = os.cpus().map((cpu) => cpu.times);
    },

    cpu: async () => {
      const times = os.cpus().map((cpu) => cpu.times);
      const usage = cpuUsage(previousTimes, times);
      previousTimes = times;
      if (!usage) return unavailable('failed');
      const load = os.loadavg();
      const at = now();
      if (!tempCache || at - tempCache.at >= 10_000) {
        tempCache = { at, value: await readCpuTemp() };
      }
      return {
        status: 'ok',
        total: usage.total,
        perCore: usage.perCore,
        load: [load[0] ?? 0, load[1] ?? 0, load[2] ?? 0],
        cores: times.length,
        model: os.cpus()[0]?.model.trim() || null,
        freqMhz: os.cpus()[0]?.speed || null,
        tempC: tempCache.value,
      };
    },

    memory: async () => {
      const info = parseMeminfo((await readText('/proc/meminfo')) ?? '');
      if (!info) return unavailable('failed');
      const at = now();
      if (!zramCache || at - zramCache.at >= 30_000) {
        const zramResult = await run(['zramctl', '/usr/sbin/zramctl'], ['--bytes', '--noheadings', '/dev/zram0']);
        zramCache = { at, value: zramResult.ok ? parseZram(zramResult.stdout) : null };
      }
      if (!swapsCache || at - swapsCache.at >= 30_000) {
        swapsCache = { at, value: parseSwaps((await readText('/proc/swaps')) ?? '') };
      }
      return {
        status: 'ok',
        used: info.total - info.available,
        total: info.total,
        swapUsed: info.swapTotal > 0 ? info.swapTotal - info.swapFree : null,
        swapTotal: info.swapTotal > 0 ? info.swapTotal : null,
        zram: zramCache.value,
        swapDevices: swapsCache.value,
      };
    },

    gpu: async () => {
      const at = now();
      if (gpuCache && at - gpuCache.at < 10_000) return gpuCache.value;
      const result = await run(
        ['nvidia-smi', '/usr/bin/nvidia-smi'],
        ['--query-gpu=name,utilization.gpu,memory.used,memory.total,temperature.gpu,power.draw,clocks.sm', '--format=csv,noheader,nounits'],
      );
      const value: GpuStats | Unavailable = !result.ok
        ? unavailable(result.missing ? 'tool-missing' : 'failed', 'nvidia-smi')
        : (() => {
            const devices = parseNvidia(result.stdout);
            return devices.length > 0 ? { status: 'ok' as const, devices } : unavailable('no-device');
          })();
      gpuCache = { at, value };
      return value;
    },

    processes: async () => {
      const at = now();
      if (processCache && at - processCache.at < 10_000) return processCache.value;
      const ps = await run(
        ['ps', '/usr/bin/ps'],
        ['-eo', 'pid=,comm=,%cpu=,rss=,args=', '--sort=-rss'],
      );
      if (!ps.ok) return unavailable(ps.missing ? 'tool-missing' : 'failed', 'ps');

      const rows: ProcessRow[] = [];
      for (const line of ps.stdout.split(/\r?\n/)) {
        const match = /^\s*(\d+)\s+(\S+)\s+([\d.]+)\s+(\d+)\s+(.*)$/.exec(line);
        if (!match) continue;
        const pid = Number(match[1]);
        const rss = Number(match[4]) * KIB;
        if (!Number.isInteger(pid) || !Number.isFinite(rss)) continue;
        rows.push({
          pid,
          name: match[2] ?? 'process',
          cpu: Number(match[3]) || 0,
          rss,
          swap: 0,
          gpuType: null,
          gpuSm: null,
          gpuMem: null,
        });
        if (rows.length >= 12) break;
      }

      if (!gpuProcCache || at - gpuProcCache.at >= 10_000) {
        const pmon = await run(['nvidia-smi', '/usr/bin/nvidia-smi'], ['pmon', '-c', '1'], 4_000);
        gpuProcCache = { at, value: pmon.ok ? parsePmon(pmon.stdout) : new Map<number, GpuProc>() };
      }
      const gpuMap = gpuProcCache.value;
      const statuses = await Promise.all(rows.map((row) => readText(`/proc/${row.pid}/status`)));
      rows.forEach((row, index) => {
        const status = statuses[index] ?? '';
        const swapMatch = /^VmSwap:\s+(\d+) kB/m.exec(status);
        if (swapMatch?.[1]) row.swap = Number(swapMatch[1]) * KIB;
        const gpu = gpuMap.get(row.pid);
        if (gpu) {
          row.gpuType = gpu.type;
          row.gpuSm = gpu.sm;
          row.gpuMem = gpu.mem;
        }
      });

      const value: ProcessStats = { status: 'ok', rows };
      processCache = { at, value };
      return value;
    },
  };
};
