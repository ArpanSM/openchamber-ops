// src/service/main.ts
import http from "node:http";

// src/service/guard.ts
import os from "node:os";
import path from "node:path";
import { readFile, stat } from "node:fs/promises";
var STATE_DIR = path.join(os.homedir(), ".local", "state", "ocguard");
var STATE_FILE = path.join(STATE_DIR, "state.json");
var LOG_FILE = path.join(STATE_DIR, "guard.log");
var FRESH_MS = 9e4;
var HISTORY_LINES = 5e3;
var num = (value) => {
  const result = typeof value === "number" ? value : Number(value);
  return Number.isFinite(result) ? result : null;
};
var str = (value) => typeof value === "string" && value.trim() ? value : null;
var asObject = (value) => typeof value === "object" && value !== null ? value : null;
var asArray = (value) => Array.isArray(value) ? value : [];
var jobState = (value) => {
  if (value === "busy" || value === "waiting" || value === "idle") return value;
  return "unknown";
};
var readJobs = (state) => {
  const jobs = asObject(state.jobs);
  if (!jobs) return [];
  return asArray(jobs.items).flatMap((value) => {
    const item = asObject(value);
    if (!item) return [];
    const id = str(item.id);
    if (!id) return [];
    return [{
      id,
      kind: str(item.kind) ?? "job",
      label: str(item.label) ?? id,
      state: jobState(item.state),
      idleMin: num(item.idle_min) ?? 0,
      rssMb: num(item.rss_mb) ?? 0,
      swapMb: num(item.swap_mb) ?? 0,
      totalMb: num(item.total_mb) ?? 0,
      cpu: num(item.cpu) ?? 0,
      pids: asArray(item.pids).flatMap((pid) => {
        const value2 = num(pid);
        return value2 === null ? [] : [value2];
      }),
      unit: str(item.unit),
      port: num(item.port),
      reason: str(item.reason)
    }];
  });
};
var readHistory = async () => {
  const text = await readFile(LOG_FILE, "utf8").catch(() => "");
  if (!text) return [];
  const events = [];
  for (const line of text.split(/\r?\n/).slice(-HISTORY_LINES)) {
    if (!line.trim()) continue;
    let record;
    try {
      record = JSON.parse(line);
    } catch {
      continue;
    }
    const at = Date.parse(String(record.ts ?? ""));
    if (!Number.isFinite(at)) continue;
    const event = record.event;
    if (event === "restart.done") {
      events.push({
        kind: "restart",
        at,
        label: "OpenChamber restarted",
        reclaimedMb: num(record.reclaimed_mb),
        beforeMb: num(record.mem_before_mb),
        afterMb: num(record.mem_after_mb),
        ok: true
      });
    } else if (event === "jobs.close.done") {
      events.push({
        kind: "job-close",
        at,
        label: str(record.label) ?? "Job closed",
        reclaimedMb: num(record.reclaimed_mb),
        beforeMb: num(record.before_mb),
        afterMb: num(record.after_mb),
        ok: record.ok !== false
      });
    } else if (event === "jobs.close.failed") {
      events.push({
        kind: "job-failed",
        at,
        label: str(record.label) ?? "Job close failed",
        reclaimedMb: null,
        beforeMb: null,
        afterMb: null,
        ok: false
      });
    }
  }
  return events.sort((left, right) => right.at - left.at).slice(0, 8);
};
var readGuard = async () => {
  const empty = {
    online: false,
    updatedAt: null,
    memMb: null,
    limitMb: 2e3,
    idleMin: null,
    state: "unknown",
    reasons: [],
    runningSessions: 0,
    processCount: null,
    lastAction: null,
    jobsIdleMinutes: 30,
    memHistory: [],
    jobs: [],
    history: [],
    error: null
  };
  const info = await stat(STATE_FILE).catch(() => null);
  if (!info) {
    return { ...empty, error: "ocguard state file not found" };
  }
  const raw = await readFile(STATE_FILE, "utf8").catch(() => null);
  if (!raw) {
    return { ...empty, error: "ocguard state file is not readable" };
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ...empty, error: "ocguard state file is not valid JSON" };
  }
  const detail = asObject(parsed.detail) ?? {};
  const memHistory = asArray(parsed.mem_history).flatMap((value) => {
    if (!Array.isArray(value) || value.length < 2) return [];
    const ts = num(value[0]);
    const mb = num(value[1]);
    return ts === null || mb === null ? [] : [[ts * 1e3, mb]];
  }).slice(-120);
  return {
    online: Date.now() - info.mtimeMs < FRESH_MS,
    updatedAt: info.mtimeMs,
    memMb: num(parsed.mem_mb),
    limitMb: num(parsed.limit_mb) ?? 2e3,
    idleMin: num(parsed.idle_min),
    state: str(parsed.state) ?? "unknown",
    reasons: asArray(parsed.reasons).flatMap((reason) => typeof reason === "string" ? [reason] : []),
    runningSessions: asArray(detail.running_sessions).length,
    processCount: num(detail.process_count),
    lastAction: str(parsed.last_action),
    jobsIdleMinutes: num(asObject(parsed.jobs)?.idle_minutes) ?? 30,
    memHistory,
    jobs: readJobs(parsed),
    history: await readHistory(),
    error: null
  };
};

// src/shared/stats.ts
var SAMPLE_INTERVAL_MS = 2e3;
var HISTORY_LENGTH = 60;
var IDLE_STOP_MS = 3e4;
var RETRY_UNAVAILABLE_MS = 6e4;
var FAILURES_BEFORE_UNAVAILABLE = 3;
var WARN_PERCENT = 90;
var CRITICAL_PERCENT = 95;
var GPU_TEMP_WARN_C = 85;
var GPU_TEMP_CRITICAL_C = 92;
var unavailable = (reason, tool = null) => ({
  status: "unavailable",
  reason,
  tool
});
var levelForPercent = (percent) => {
  if (percent >= CRITICAL_PERCENT) return "critical";
  if (percent >= WARN_PERCENT) return "warn";
  return null;
};
var busiestGpu = (gpus) => {
  if (gpus.status !== "ok") return null;
  let busiest = null;
  for (const device of gpus.devices) {
    if (device.utilization !== null && (busiest === null || device.utilization > busiest)) busiest = device.utilization;
  }
  return busiest;
};

// src/service/sampler.ts
var PRIME_MS = 500;
var GUARD_INTERVAL_MS = 5e3;
var SUSTAINED_SAMPLES = 30;
var freshSource = () => ({ value: { status: "unavailable", reason: "failed", tool: null }, lastGood: null, failures: 0, retryAt: 0 });
var settle = (source, result, now) => {
  if (result.status === "ok") {
    source.value = result;
    source.lastGood = result;
    source.failures = 0;
    source.retryAt = 0;
    return;
  }
  if (result.reason === "failed") {
    source.failures += 1;
    if (source.failures < FAILURES_BEFORE_UNAVAILABLE) {
      source.value = source.lastGood ?? result;
      return;
    }
  }
  source.value = result;
  source.lastGood = null;
  source.retryAt = now + RETRY_UNAVAILABLE_MS;
};
var safely = async (read) => {
  try {
    return await read();
  } catch {
    return { status: "unavailable", reason: "failed", tool: null };
  }
};
var due = (source, now) => source.retryAt <= now;
var pushHistory = (history, value) => {
  history.push(value);
  if (history.length > HISTORY_LENGTH) history.splice(0, history.length - HISTORY_LENGTH);
};
var sustainedHigh = (history) => {
  if (history.length < SUSTAINED_SAMPLES) return false;
  return history.slice(-SUSTAINED_SAMPLES).every((value) => value !== null && value >= WARN_PERCENT);
};
var evaluateWarnings = (input) => {
  const warnings = [];
  if (input.cpu.status === "ok" && sustainedHigh(input.cpuHistory)) {
    warnings.push({ kind: "cpu", target: null, level: "warn", message: "CPU at or above 90% for a minute" });
  }
  if (input.memory.status === "ok" && input.memory.total > 0) {
    const percent = input.memory.used / input.memory.total * 100;
    const level = levelForPercent(percent);
    if (level) warnings.push({ kind: "memory", target: null, level, message: `RAM ${Math.round(percent)}% used` });
  }
  if (input.gpus.status === "ok") {
    for (const device of input.gpus.devices) {
      if (device.tempC !== null && device.tempC >= GPU_TEMP_WARN_C) {
        warnings.push({
          kind: "gpu-temp",
          target: device.name,
          level: device.tempC >= GPU_TEMP_CRITICAL_C ? "critical" : "warn",
          message: `${device.name} at ${Math.round(device.tempC)}\xB0C`
        });
      }
    }
  }
  if (sustainedHigh(input.gpuHistory)) {
    warnings.push({ kind: "gpu", target: null, level: "warn", message: "GPU busy for a minute" });
  }
  const guard = input.guard;
  if (!guard.online) {
    warnings.push({ kind: "guard", target: null, level: "warn", message: guard.error ?? "ocguard is not updating" });
  }
  if (guard.memMb !== null && guard.limitMb > 0) {
    const percent = guard.memMb / guard.limitMb * 100;
    const level = percent >= 100 ? "critical" : levelForPercent(percent);
    if (level) {
      warnings.push({
        kind: "guard",
        target: "memory",
        level,
        message: guard.state === "blocked" ? `OpenChamber over the limit; waiting for ${guard.runningSessions} session${guard.runningSessions === 1 ? "" : "s"}` : `OpenChamber ${Math.round(guard.memMb)} MB of ${guard.limitMb} MB`
      });
    }
  }
  for (const job of guard.jobs) {
    if (job.state !== "idle" && job.state !== "waiting") continue;
    const remaining = guard.jobsIdleMinutes - job.idleMin;
    if (remaining <= 5) {
      warnings.push({
        kind: "job",
        target: job.id,
        level: remaining <= 0 ? "critical" : "warn",
        message: remaining <= 0 ? `${job.label} is due to close` : `${job.label} closes in ${Math.max(1, Math.round(remaining))}m`
      });
    }
  }
  return warnings;
};
var createSampler = (deps) => {
  let generation = 0;
  let active = false;
  let lastRequest = 0;
  let cancelTimer = null;
  let first = null;
  let snapshot = null;
  let cpu = freshSource();
  let memory = freshSource();
  let gpus = freshSource();
  let processes = freshSource();
  let guard = null;
  let guardDueAt = 0;
  let cpuHistory = [];
  let gpuHistory = [];
  const reset = () => {
    cpu = freshSource();
    memory = freshSource();
    gpus = freshSource();
    processes = freshSource();
    guard = null;
    guardDueAt = 0;
    cpuHistory = [];
    gpuHistory = [];
    snapshot = null;
  };
  const stop = () => {
    generation += 1;
    active = false;
    first = null;
    cancelTimer?.();
    cancelTimer = null;
    reset();
  };
  const readGuard2 = async (current, now) => {
    if (now < guardDueAt) return;
    guardDueAt = now + GUARD_INTERVAL_MS;
    try {
      const next = await deps.guard();
      if (current === generation) guard = next;
    } catch {
    }
  };
  const tick = async (current) => {
    const now = deps.now();
    const [cpuResult, memoryResult, gpuResult, processResult] = await Promise.all([
      due(cpu, now) ? safely(deps.system.cpu) : null,
      due(memory, now) ? safely(deps.system.memory) : null,
      due(gpus, now) ? safely(deps.system.gpu) : null,
      due(processes, now) ? safely(deps.system.processes) : null
    ]);
    if (current !== generation) return;
    const settledAt = deps.now();
    if (cpuResult) settle(cpu, cpuResult, settledAt);
    if (memoryResult) settle(memory, memoryResult, settledAt);
    if (gpuResult) settle(gpus, gpuResult, settledAt);
    if (processResult) settle(processes, processResult, settledAt);
    await readGuard2(current, settledAt);
    if (current !== generation) return;
    pushHistory(cpuHistory, cpu.value.status === "ok" ? cpu.value.total : null);
    pushHistory(gpuHistory, busiestGpu(gpus.value));
    const guardValue = guard ?? {
      online: false,
      updatedAt: null,
      memMb: null,
      limitMb: 2e3,
      idleMin: null,
      state: "unknown",
      reasons: [],
      runningSessions: 0,
      processCount: null,
      lastAction: null,
      jobsIdleMinutes: 30,
      memHistory: [],
      jobs: [],
      history: [],
      error: "guard state has not been read yet"
    };
    snapshot = {
      sampledAt: settledAt,
      cpu: cpu.value,
      memory: memory.value,
      gpus: gpus.value,
      processes: processes.value,
      guard: guardValue,
      history: { cpu: [...cpuHistory], gpu: [...gpuHistory] },
      warnings: evaluateWarnings({
        cpu: cpu.value,
        memory: memory.value,
        gpus: gpus.value,
        guard: guardValue,
        cpuHistory,
        gpuHistory
      })
    };
  };
  const loop = (current) => {
    cancelTimer = deps.schedule(() => {
      cancelTimer = null;
      if (current !== generation) return;
      if (deps.now() - lastRequest >= IDLE_STOP_MS) {
        stop();
        return;
      }
      void tick(current).finally(() => {
        if (current === generation) loop(current);
      });
    }, SAMPLE_INTERVAL_MS);
  };
  const start = () => {
    active = true;
    const current = generation;
    return (async () => {
      await deps.system.prime().catch(() => void 0);
      await deps.wait(PRIME_MS);
      if (current !== generation) return;
      await tick(current);
      if (current === generation) loop(current);
    })();
  };
  return {
    stats: async () => {
      lastRequest = deps.now();
      if (!active) first = start();
      if (first) await first;
      if (!snapshot) throw new Error("Sampling stopped before the first reading.");
      return snapshot;
    },
    stop,
    running: () => active
  };
};

// src/service/system.ts
import os2 from "node:os";
import { readdir } from "node:fs/promises";

// src/service/exec.ts
import { execFile } from "node:child_process";
import { readFile as readFile2 } from "node:fs/promises";
var EXEC_TIMEOUT_MS = 3e3;
var run = async (commands, args, timeout = EXEC_TIMEOUT_MS) => {
  for (const command of commands) {
    const result = await new Promise((resolve) => {
      execFile(command, args, { timeout, maxBuffer: 4 * 1024 * 1024, windowsHide: true }, (error, stdout) => {
        if (!error) {
          resolve({ ok: true, stdout });
          return;
        }
        resolve({ ok: false, missing: "code" in error && error.code === "ENOENT" });
      });
    });
    if (result.ok || !result.missing) return result;
  }
  return { ok: false, missing: true };
};
var readText = async (path2) => {
  try {
    return await readFile2(path2, "utf8");
  } catch {
    return null;
  }
};

// src/service/system.ts
var KIB = 1024;
var MIB = 1024 * 1024;
var clampPercent = (value) => Math.min(100, Math.max(0, value));
var cpuUsage = (previous, next) => {
  if (previous.length === 0 || previous.length !== next.length) return null;
  let busyAll = 0;
  let totalAll = 0;
  const perCore = [];
  for (let index = 0; index < next.length; index++) {
    const before = previous[index];
    const after = next[index];
    if (!before || !after) return null;
    const busy = after.user - before.user + (after.nice - before.nice) + (after.sys - before.sys) + (after.irq - before.irq);
    const total = busy + (after.idle - before.idle);
    busyAll += busy;
    totalAll += total;
    perCore.push(total > 0 ? clampPercent(busy / total * 100) : 0);
  }
  if (totalAll <= 0) return null;
  return { total: clampPercent(busyAll / totalAll * 100), perCore };
};
var parseMeminfo = (text) => {
  const read = (name) => {
    const match = new RegExp(`^${name}:\\s+(\\d+) kB`, "m").exec(text);
    if (!match?.[1]) return null;
    const value = Number(match[1]);
    return Number.isFinite(value) ? value * KIB : null;
  };
  const total = read("MemTotal");
  const available = read("MemAvailable");
  if (total === null || available === null) return null;
  return {
    total,
    available,
    swapTotal: read("SwapTotal") ?? 0,
    swapFree: read("SwapFree") ?? 0
  };
};
var parseZram = (text) => {
  const line = text.split(/\r?\n/).map((value) => value.trim()).find(Boolean);
  if (!line) return null;
  const parts = line.split(/\s+/);
  if (parts.length < 6) return null;
  const [algo, disksize, data, compr, memUsed] = parts.slice(1);
  const numbers = [disksize, data, compr, memUsed].map((value) => Number(value));
  if (numbers.some((value) => !Number.isFinite(value))) return null;
  return {
    algo: algo ?? "zram",
    disksize: numbers[0] ?? 0,
    data: numbers[1] ?? 0,
    compr: numbers[2] ?? 0,
    memUsed: numbers[3] ?? 0
  };
};
var parseSwaps = (text) => {
  const devices = [];
  for (const line of text.split(/\r?\n/).slice(1)) {
    const parts = line.trim().split(/\s+/);
    if (parts.length < 5) continue;
    const [name, type, size, used, priority] = parts;
    const sizeBytes = Number(size) * KIB;
    const usedBytes = Number(used) * KIB;
    const prio = Number(priority);
    if (!Number.isFinite(sizeBytes) || !Number.isFinite(usedBytes)) continue;
    devices.push({ name: name ?? "", type: type ?? "", size: sizeBytes, used: usedBytes, priority: Number.isFinite(prio) ? prio : 0 });
  }
  return devices;
};
var readCpuTemp = async () => {
  const entries = await readdir("/sys/class/hwmon").catch(() => []);
  let best = null;
  for (const entry of entries) {
    const base = `/sys/class/hwmon/${entry}`;
    const name = (await readText(`${base}/name`))?.trim().toLowerCase() ?? "";
    if (!["coretemp", "k10temp", "zenpower", "cpu_thermal", "soc_thermal"].includes(name)) continue;
    const files = await readdir(base).catch(() => []);
    for (const file of files) {
      if (!/^temp\d+_input$/.test(file)) continue;
      const raw = Number((await readText(`${base}/${file}`))?.trim());
      if (!Number.isFinite(raw)) continue;
      const celsius = raw / 1e3;
      if (best === null || celsius > best) best = celsius;
    }
  }
  if (best !== null) return Math.round(best * 10) / 10;
  const zones = await readdir("/sys/class/thermal").catch(() => []);
  for (const zone of zones) {
    if (!/^thermal_zone\d+$/.test(zone)) continue;
    const base = `/sys/class/thermal/${zone}`;
    const type = (await readText(`${base}/type`))?.trim().toLowerCase() ?? "";
    if (!type.includes("x86_pkg_temp") && !type.includes("cpu")) continue;
    const raw = Number((await readText(`${base}/temp`))?.trim());
    if (Number.isFinite(raw)) return Math.round(raw / 1e3 * 10) / 10;
  }
  return null;
};
var numberOrNull = (text) => {
  if (text === void 0) return null;
  const value = Number(text.trim());
  return text.trim() !== "" && Number.isFinite(value) ? value : null;
};
var parseNvidia = (text) => {
  const devices = [];
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const parts = line.split(",").map((part) => part.trim());
    if (parts.length < 7) continue;
    const clock = numberOrNull(parts.pop());
    const power = numberOrNull(parts.pop());
    const temp = numberOrNull(parts.pop());
    const total = numberOrNull(parts.pop());
    const used = numberOrNull(parts.pop());
    const utilization = numberOrNull(parts.pop());
    devices.push({
      name: parts.join(", ") || "NVIDIA GPU",
      utilization: utilization === null ? null : clampPercent(utilization),
      memUsed: used === null ? null : used * MIB,
      memTotal: total === null ? null : total * MIB,
      tempC: temp,
      powerW: power,
      clockMhz: clock
    });
  }
  return devices;
};
var parsePmon = (text) => {
  const map = /* @__PURE__ */ new Map();
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const fields = trimmed.split(/\s+/);
    if (fields.length < 5) continue;
    const pid = Number(fields[1]);
    if (!Number.isInteger(pid)) continue;
    map.set(pid, {
      type: fields[2] ?? "",
      sm: fields[3] === "-" ? null : numberOrNull(fields[3]),
      mem: fields[4] === "-" ? null : numberOrNull(fields[4])
    });
  }
  return map;
};
var createSystemCollector = () => {
  let previousTimes = [];
  return {
    prime: async () => {
      previousTimes = os2.cpus().map((cpu) => cpu.times);
    },
    cpu: async () => {
      const times = os2.cpus().map((cpu) => cpu.times);
      const usage = cpuUsage(previousTimes, times);
      previousTimes = times;
      if (!usage) return unavailable("failed");
      const load = os2.loadavg();
      return {
        status: "ok",
        total: usage.total,
        perCore: usage.perCore,
        load: [load[0] ?? 0, load[1] ?? 0, load[2] ?? 0],
        cores: times.length,
        model: os2.cpus()[0]?.model.trim() || null,
        freqMhz: os2.cpus()[0]?.speed || null,
        tempC: await readCpuTemp()
      };
    },
    memory: async () => {
      const info = parseMeminfo(await readText("/proc/meminfo") ?? "");
      if (!info) return unavailable("failed");
      const zramResult = await run(["zramctl", "/usr/sbin/zramctl"], ["--bytes", "--noheadings", "/dev/zram0"]);
      const zram = zramResult.ok ? parseZram(zramResult.stdout) : null;
      const swaps = parseSwaps(await readText("/proc/swaps") ?? "");
      return {
        status: "ok",
        used: info.total - info.available,
        total: info.total,
        swapUsed: info.swapTotal > 0 ? info.swapTotal - info.swapFree : null,
        swapTotal: info.swapTotal > 0 ? info.swapTotal : null,
        zram,
        swapDevices: swaps
      };
    },
    gpu: async () => {
      const result = await run(
        ["nvidia-smi", "/usr/bin/nvidia-smi"],
        ["--query-gpu=name,utilization.gpu,memory.used,memory.total,temperature.gpu,power.draw,clocks.sm", "--format=csv,noheader,nounits"]
      );
      if (!result.ok) return unavailable(result.missing ? "tool-missing" : "failed", "nvidia-smi");
      const devices = parseNvidia(result.stdout);
      return devices.length > 0 ? { status: "ok", devices } : unavailable("no-device");
    },
    processes: async () => {
      const ps = await run(
        ["ps", "/usr/bin/ps"],
        ["-eo", "pid=,comm=,%cpu=,rss=,args=", "--sort=-rss"]
      );
      if (!ps.ok) return unavailable(ps.missing ? "tool-missing" : "failed", "ps");
      const rows = [];
      for (const line of ps.stdout.split(/\r?\n/)) {
        const match = /^\s*(\d+)\s+(\S+)\s+([\d.]+)\s+(\d+)\s+(.*)$/.exec(line);
        if (!match) continue;
        const pid = Number(match[1]);
        const rss = Number(match[4]) * KIB;
        if (!Number.isInteger(pid) || !Number.isFinite(rss)) continue;
        rows.push({
          pid,
          name: match[2] ?? "process",
          cpu: Number(match[3]) || 0,
          rss,
          swap: 0,
          gpuType: null,
          gpuSm: null,
          gpuMem: null
        });
        if (rows.length >= 24) break;
      }
      const [pmon, ...statuses] = await Promise.all([
        run(["nvidia-smi", "/usr/bin/nvidia-smi"], ["pmon", "-c", "1"], 4e3),
        ...rows.map((row) => readText(`/proc/${row.pid}/status`))
      ]);
      const gpuMap = pmon.ok ? parsePmon(pmon.stdout) : /* @__PURE__ */ new Map();
      rows.forEach((row, index) => {
        const status = statuses[index] ?? "";
        const swapMatch = /^VmSwap:\s+(\d+) kB/m.exec(status);
        if (swapMatch?.[1]) row.swap = Number(swapMatch[1]) * KIB;
        const gpu = gpuMap.get(row.pid);
        if (gpu) {
          row.gpuType = gpu.type;
          row.gpuSm = gpu.sm;
          row.gpuMem = gpu.mem;
        }
      });
      return { status: "ok", rows };
    }
  };
};

// src/service/main.ts
var port = Number(process.env.OPENCHAMBER_SERVICE_PORT);
var token = process.env.OPENCHAMBER_SERVICE_TOKEN ?? "";
if (!port || !token) {
  console.error("OPENCHAMBER_SERVICE_PORT and OPENCHAMBER_SERVICE_TOKEN are required");
  process.exit(1);
}
var sampler = createSampler({
  system: createSystemCollector(),
  guard: readGuard,
  now: () => Date.now(),
  wait: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  schedule: (fn, ms) => {
    const timer = setTimeout(fn, ms);
    return () => clearTimeout(timer);
  }
});
var send = (res, status, body) => {
  res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" });
  res.end(JSON.stringify(body));
};
var server = http.createServer((req, res) => {
  if (req.headers.authorization !== `Bearer ${token}`) {
    send(res, 401, { error: "unauthorized" });
    return;
  }
  const { pathname } = new URL(req.url ?? "/", "http://127.0.0.1");
  if (pathname === "/health") {
    send(res, 200, { ok: true });
    return;
  }
  if (pathname === "/stats" && req.method === "GET") {
    sampler.stats().then(
      (stats) => send(res, 200, stats),
      () => send(res, 503, { error: "not-ready" })
    );
    return;
  }
  send(res, 404, { error: "not-found" });
});
var shutdown = () => {
  sampler.stop();
  server.close();
  process.exit(0);
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
server.listen(port, "127.0.0.1");
