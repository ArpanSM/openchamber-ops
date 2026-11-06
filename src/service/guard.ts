import os from 'node:os';
import path from 'node:path';
import { open, readFile, stat } from 'node:fs/promises';

import type { GuardEvent, GuardStats, Job, JobState } from '../shared/stats.ts';

const STATE_DIR = path.join(os.homedir(), '.local', 'state', 'ocguard');
const STATE_FILE = path.join(STATE_DIR, 'state.json');
const LOG_FILE = path.join(STATE_DIR, 'guard.log');
const FRESH_MS = 90_000;
const HISTORY_LINES = 2_000;
const HISTORY_TTL_MS = 60_000;
const MAX_LOG_BYTES = 256 * 1024;

let historyCache: { at: number; events: GuardEvent[] } | null = null;

const num = (value: unknown): number | null => {
  const result = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(result) ? result : null;
};

const str = (value: unknown): string | null => (typeof value === 'string' && value.trim() ? value : null);

const asObject = (value: unknown): Record<string, unknown> | null =>
  typeof value === 'object' && value !== null ? value as Record<string, unknown> : null;

const asArray = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

const jobState = (value: unknown): JobState => {
  if (value === 'busy' || value === 'waiting' || value === 'idle') return value;
  return 'unknown';
};

const readJobs = (state: Record<string, unknown>): Job[] => {
  const jobs = asObject(state.jobs);
  if (!jobs) return [];
  return asArray(jobs.items).flatMap((value) => {
    const item = asObject(value);
    if (!item) return [];
    const id = str(item.id);
    if (!id) return [];
    return [{
      id,
      kind: str(item.kind) ?? 'job',
      label: str(item.label) ?? id,
      state: jobState(item.state),
      idleMin: num(item.idle_min) ?? 0,
      rssMb: num(item.rss_mb) ?? 0,
      swapMb: num(item.swap_mb) ?? 0,
      totalMb: num(item.total_mb) ?? 0,
      cpu: num(item.cpu) ?? 0,
      pids: asArray(item.pids).flatMap((pid) => {
        const value = num(pid);
        return value === null ? [] : [value];
      }),
      unit: str(item.unit),
      port: num(item.port),
      reason: str(item.reason),
    }];
  });
};

const readTail = async (): Promise<string> => {
  const handle = await open(LOG_FILE, 'r').catch(() => null);
  if (!handle) return '';
  try {
    const info = await handle.stat();
    const start = Math.max(0, info.size - MAX_LOG_BYTES);
    const length = info.size - start;
    if (length <= 0) return '';
    const buffer = Buffer.alloc(length);
    await handle.read(buffer, 0, length, start);
    let text = buffer.toString('utf8');
    if (start > 0) {
      const newline = text.indexOf('\n');
      text = newline === -1 ? '' : text.slice(newline + 1);
    }
    return text;
  } finally {
    await handle.close();
  }
};

const readHistory = async (): Promise<GuardEvent[]> => {
  const at = Date.now();
  if (historyCache && at - historyCache.at < HISTORY_TTL_MS) return historyCache.events;

  const text = await readTail();
  const events: GuardEvent[] = [];
  for (const line of text.split(/\r?\n/).slice(-HISTORY_LINES)) {
    if (!line.trim()) continue;
    let record: Record<string, unknown>;
    try {
      record = JSON.parse(line) as Record<string, unknown>;
    } catch {
      continue;
    }
    const eventAt = Date.parse(String(record.ts ?? ''));
    if (!Number.isFinite(eventAt)) continue;
    const event = record.event;
    if (event === 'restart.done') {
      events.push({
        kind: 'restart',
        at: eventAt,
        label: 'OpenChamber restarted',
        reclaimedMb: num(record.reclaimed_mb),
        beforeMb: num(record.mem_before_mb),
        afterMb: num(record.mem_after_mb),
        ok: true,
      });
    } else if (event === 'jobs.close.done') {
      events.push({
        kind: 'job-close',
        at: eventAt,
        label: str(record.label) ?? 'Job closed',
        reclaimedMb: num(record.reclaimed_mb),
        beforeMb: num(record.before_mb),
        afterMb: num(record.after_mb),
        ok: record.ok !== false,
      });
    } else if (event === 'jobs.close.failed') {
      events.push({
        kind: 'job-failed',
        at: eventAt,
        label: str(record.label) ?? 'Job close failed',
        reclaimedMb: null,
        beforeMb: null,
        afterMb: null,
        ok: false,
      });
    }
  }
  const sorted = events.sort((left, right) => right.at - left.at).slice(0, 6);
  historyCache = { at, events: sorted };
  return sorted;
};

export const readGuard = async (): Promise<GuardStats> => {
  const empty: GuardStats = {
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
    error: null,
  };

  const info = await stat(STATE_FILE).catch(() => null);
  if (!info) {
    return { ...empty, error: 'ocguard state file not found' };
  }
  const raw = await readFile(STATE_FILE, 'utf8').catch(() => null);
  if (!raw) {
    return { ...empty, error: 'ocguard state file is not readable' };
  }
  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return { ...empty, error: 'ocguard state file is not valid JSON' };
  }

  const detail = asObject(parsed.detail) ?? {};
  const memHistory = asArray(parsed.mem_history).flatMap((value) => {
    if (!Array.isArray(value) || value.length < 2) return [];
    const ts = num(value[0]);
    const mb = num(value[1]);
    return ts === null || mb === null ? [] : [[ts * 1000, mb] as [number, number]];
  }).slice(-120);

  return {
    online: Date.now() - info.mtimeMs < FRESH_MS,
    updatedAt: info.mtimeMs,
    memMb: num(parsed.mem_mb),
    limitMb: num(parsed.limit_mb) ?? 2000,
    idleMin: num(parsed.idle_min),
    state: str(parsed.state) ?? 'unknown',
    reasons: asArray(parsed.reasons).flatMap((reason) => (typeof reason === 'string' ? [reason] : [])),
    runningSessions: asArray(detail.running_sessions).length,
    processCount: num(detail.process_count),
    lastAction: str(parsed.last_action),
    jobsIdleMinutes: num(asObject(parsed.jobs)?.idle_minutes) ?? 30,
    memHistory,
    jobs: readJobs(parsed),
    history: await readHistory(),
    error: null,
  };
};
