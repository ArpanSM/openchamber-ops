import {
  busiestGpu,
  CRITICAL_PERCENT,
  GPU_TEMP_CRITICAL_C,
  GPU_TEMP_WARN_C,
  HISTORY_LENGTH,
  IDLE_STOP_MS,
  levelForPercent,
  RETRY_UNAVAILABLE_MS,
  FAILURES_BEFORE_UNAVAILABLE,
  GUARD_INTERVAL_MS,
  SAMPLE_INTERVAL_MS,
  WARN_PERCENT,
  type CpuStats,
  type GpuStats,
  type GuardStats,
  type MemoryStats,
  type ProcessStats,
  type Stats,
  type Unavailable,
  type Warning,
} from '../shared/stats.ts';
import type { SystemCollector } from './system.ts';

export const PRIME_MS = 500;
const SUSTAINED_SAMPLES = 30;

type Source<T> = { value: T | Unavailable; lastGood: T | null; failures: number; retryAt: number };

const freshSource = <T>(): Source<T> => ({ value: { status: 'unavailable', reason: 'failed', tool: null }, lastGood: null, failures: 0, retryAt: 0 });

const settle = <T extends { status: 'ok' }>(source: Source<T>, result: T | Unavailable, now: number): void => {
  if (result.status === 'ok') {
    source.value = result;
    source.lastGood = result;
    source.failures = 0;
    source.retryAt = 0;
    return;
  }
  if (result.reason === 'failed') {
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

const safely = async <T>(read: () => Promise<T | Unavailable>): Promise<T | Unavailable> => {
  try {
    return await read();
  } catch {
    return { status: 'unavailable', reason: 'failed', tool: null };
  }
};

const due = (source: Source<{ status: 'ok' }>, now: number): boolean => source.retryAt <= now;

const pushHistory = (history: (number | null)[], value: number | null): void => {
  history.push(value);
  if (history.length > HISTORY_LENGTH) history.splice(0, history.length - HISTORY_LENGTH);
};

const sustainedHigh = (history: (number | null)[]): boolean => {
  if (history.length < SUSTAINED_SAMPLES) return false;
  return history.slice(-SUSTAINED_SAMPLES).every((value) => value !== null && value >= WARN_PERCENT);
};

const evaluateWarnings = (input: {
  cpu: CpuStats | Unavailable;
  memory: MemoryStats | Unavailable;
  gpus: GpuStats | Unavailable;
  guard: GuardStats;
  cpuHistory: (number | null)[];
  gpuHistory: (number | null)[];
}): Warning[] => {
  const warnings: Warning[] = [];

  if (input.cpu.status === 'ok' && sustainedHigh(input.cpuHistory)) {
    warnings.push({ kind: 'cpu', target: null, level: 'warn', message: 'CPU at or above 90% for a minute' });
  }

  if (input.memory.status === 'ok' && input.memory.total > 0) {
    const percent = (input.memory.used / input.memory.total) * 100;
    const level = levelForPercent(percent);
    if (level) warnings.push({ kind: 'memory', target: null, level, message: `RAM ${Math.round(percent)}% used` });
  }

  if (input.gpus.status === 'ok') {
    for (const device of input.gpus.devices) {
      if (device.tempC !== null && device.tempC >= GPU_TEMP_WARN_C) {
        warnings.push({
          kind: 'gpu-temp',
          target: device.name,
          level: device.tempC >= GPU_TEMP_CRITICAL_C ? 'critical' : 'warn',
          message: `${device.name} at ${Math.round(device.tempC)}°C`,
        });
      }
    }
  }
  if (sustainedHigh(input.gpuHistory)) {
    warnings.push({ kind: 'gpu', target: null, level: 'warn', message: 'GPU busy for a minute' });
  }

  const guard = input.guard;
  if (!guard.online) {
    warnings.push({ kind: 'guard', target: null, level: 'warn', message: guard.error ?? 'ocguard is not updating' });
  }
  if (guard.memMb !== null && guard.limitMb > 0) {
    const percent = (guard.memMb / guard.limitMb) * 100;
    const level = percent >= 100 ? 'critical' : levelForPercent(percent);
    if (level) {
      warnings.push({
        kind: 'guard',
        target: 'memory',
        level,
        message: guard.state === 'blocked'
          ? `OpenChamber over the limit; waiting for ${guard.runningSessions} session${guard.runningSessions === 1 ? '' : 's'}`
          : `OpenChamber ${Math.round(guard.memMb)} MB of ${guard.limitMb} MB`,
      });
    }
  }
  for (const job of guard.jobs) {
    if (job.state !== 'idle' && job.state !== 'waiting') continue;
    const remaining = guard.jobsIdleMinutes - job.idleMin;
    if (remaining <= 5) {
      warnings.push({
        kind: 'job',
        target: job.id,
        level: remaining <= 0 ? 'critical' : 'warn',
        message: remaining <= 0
          ? `${job.label} is due to close`
          : `${job.label} closes in ${Math.max(1, Math.round(remaining))}m`,
      });
    }
  }

  return warnings;
};

export type SamplerDeps = {
  system: SystemCollector;
  guard: () => Promise<GuardStats>;
  now: () => number;
  wait: (ms: number) => Promise<void>;
  schedule: (fn: () => void, ms: number) => () => void;
};

export type Sampler = {
  stats: () => Promise<Stats>;
  stop: () => void;
  running: () => boolean;
};

export const createSampler = (deps: SamplerDeps): Sampler => {
  let generation = 0;
  let active = false;
  let lastRequest = 0;
  let cancelTimer: (() => void) | null = null;
  let first: Promise<void> | null = null;
  let snapshot: Stats | null = null;

  let cpu = freshSource<CpuStats>();
  let memory = freshSource<MemoryStats>();
  let gpus = freshSource<GpuStats>();
  let processes = freshSource<ProcessStats>();
  let guard: GuardStats | null = null;
  let guardDueAt = 0;
  let cpuHistory: (number | null)[] = [];
  let gpuHistory: (number | null)[] = [];

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

  const readGuard = async (current: number, now: number): Promise<void> => {
    if (now < guardDueAt) return;
    guardDueAt = now + GUARD_INTERVAL_MS;
    try {
      const next = await deps.guard();
      if (current === generation) guard = next;
    } catch {
      // Keep the previous guard reading; the next tick asks again.
    }
  };

  const tick = async (current: number) => {
    const now = deps.now();
    const [cpuResult, memoryResult, gpuResult, processResult] = await Promise.all([
      due(cpu, now) ? safely(deps.system.cpu) : null,
      due(memory, now) ? safely(deps.system.memory) : null,
      due(gpus, now) ? safely(deps.system.gpu) : null,
      due(processes, now) ? safely(deps.system.processes) : null,
    ]);
    if (current !== generation) return;

    const settledAt = deps.now();
    if (cpuResult) settle(cpu, cpuResult, settledAt);
    if (memoryResult) settle(memory, memoryResult, settledAt);
    if (gpuResult) settle(gpus, gpuResult, settledAt);
    if (processResult) settle(processes, processResult, settledAt);

    await readGuard(current, settledAt);
    if (current !== generation) return;

    pushHistory(cpuHistory, cpu.value.status === 'ok' ? cpu.value.total : null);
    pushHistory(gpuHistory, busiestGpu(gpus.value));

    const guardValue: GuardStats = guard ?? {
      online: false,
      updatedAt: null,
      memMb: null,
      limitMb: 2000,
      idleMin: null,
      state: 'unknown',
      reasons: [],
      runningSessions: 0,
      processCount: null,
      lastAction: null,
      jobsIdleMinutes: 30,
      memHistory: [],
      jobs: [],
      history: [],
      error: 'guard state has not been read yet',
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
        gpuHistory,
      }),
    };
  };

  const loop = (current: number) => {
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

  const start = (): Promise<void> => {
    active = true;
    const current = generation;
    return (async () => {
      await deps.system.prime().catch(() => undefined);
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
      if (!snapshot) throw new Error('Sampling stopped before the first reading.');
      return snapshot;
    },
    stop,
    running: () => active,
  };
};

export const WARNING_THRESHOLDS = { WARN_PERCENT, CRITICAL_PERCENT, GPU_TEMP_WARN_C, GPU_TEMP_CRITICAL_C };
