// The `/stats` contract between the service and both frames.
// A missing value is `null`, never 0: 0 % is a measurement, `null` is "unknown".

export type UnavailableReason =
  | 'tool-missing'
  | 'no-device'
  | 'unsupported'
  | 'failed';

export type Unavailable = { status: 'unavailable'; reason: UnavailableReason; tool: string | null };

export type CpuStats = {
  status: 'ok';
  /** 0..100 across all cores. */
  total: number;
  /** 0..100 per core. */
  perCore: number[];
  load: [number, number, number] | null;
  cores: number;
  model: string | null;
  freqMhz: number | null;
  tempC: number | null;
};

export type ZramStats = {
  algo: string;
  disksize: number;
  data: number;
  compr: number;
  memUsed: number;
};

export type SwapDevice = {
  name: string;
  type: string;
  size: number;
  used: number;
  priority: number;
};

export type MemoryStats = {
  status: 'ok';
  used: number;
  total: number;
  swapUsed: number | null;
  swapTotal: number | null;
  zram: ZramStats | null;
  swapDevices: SwapDevice[];
};

export type GpuDevice = {
  name: string;
  utilization: number | null;
  memUsed: number | null;
  memTotal: number | null;
  tempC: number | null;
  powerW: number | null;
  clockMhz: number | null;
};

export type GpuStats = { status: 'ok'; devices: GpuDevice[] };

export type ProcessRow = {
  pid: number;
  name: string;
  cpu: number;
  rss: number;
  swap: number;
  gpuType: string | null;
  gpuSm: number | null;
  gpuMem: number | null;
};

export type ProcessStats = { status: 'ok'; rows: ProcessRow[] };

export type JobState = 'busy' | 'waiting' | 'idle' | 'unknown';

export type Job = {
  id: string;
  kind: string;
  label: string;
  state: JobState;
  idleMin: number;
  rssMb: number;
  swapMb: number;
  totalMb: number;
  cpu: number;
  pids: number[];
  unit: string | null;
  port: number | null;
  reason: string | null;
};

export type GuardEvent = {
  kind: 'restart' | 'job-close' | 'job-failed';
  at: number;
  label: string;
  reclaimedMb: number | null;
  beforeMb: number | null;
  afterMb: number | null;
  ok: boolean | null;
};

export type GuardStats = {
  /** True when the state file is fresh enough to trust. */
  online: boolean;
  updatedAt: number | null;
  memMb: number | null;
  limitMb: number;
  idleMin: number | null;
  state: string;
  reasons: string[];
  runningSessions: number;
  processCount: number | null;
  lastAction: string | null;
  jobsIdleMinutes: number;
  memHistory: Array<[number, number]>;
  jobs: Job[];
  history: GuardEvent[];
  error: string | null;
};

export type WarningKind = 'cpu' | 'gpu' | 'gpu-temp' | 'memory' | 'guard' | 'job';

export type WarningLevel = 'warn' | 'critical';

export type Warning = {
  kind: WarningKind;
  target: string | null;
  level: WarningLevel;
  message: string;
};

export type Stats = {
  sampledAt: number;
  cpu: CpuStats | Unavailable;
  memory: MemoryStats | Unavailable;
  gpus: GpuStats | Unavailable;
  processes: ProcessStats | Unavailable;
  guard: GuardStats;
  history: { cpu: (number | null)[]; gpu: (number | null)[] };
  warnings: Warning[];
};

export const SAMPLE_INTERVAL_MS = 2_000;
export const GUARD_INTERVAL_MS = 5_000;
export const HISTORY_LENGTH = 60;
export const IDLE_STOP_MS = 30_000;
export const RETRY_UNAVAILABLE_MS = 60_000;
export const FAILURES_BEFORE_UNAVAILABLE = 3;

export const WARN_PERCENT = 90;
export const CRITICAL_PERCENT = 95;
export const GPU_TEMP_WARN_C = 85;
export const GPU_TEMP_CRITICAL_C = 92;

export const unavailable = (reason: UnavailableReason, tool: string | null = null): Unavailable => ({
  status: 'unavailable',
  reason,
  tool,
});

export const levelForPercent = (percent: number): WarningLevel | null => {
  if (percent >= CRITICAL_PERCENT) return 'critical';
  if (percent >= WARN_PERCENT) return 'warn';
  return null;
};

export const busiestGpu = (gpus: GpuStats | Unavailable): number | null => {
  if (gpus.status !== 'ok') return null;
  let busiest: number | null = null;
  for (const device of gpus.devices) {
    if (device.utilization !== null && (busiest === null || device.utilization > busiest)) busiest = device.utilization;
  }
  return busiest;
};

export const warningKey = (warnings: Warning[]): string =>
  warnings.map((warning) => `${warning.kind}:${warning.target ?? ''}:${warning.level}`).sort().join('|');
