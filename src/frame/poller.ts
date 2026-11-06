import { SAMPLE_INTERVAL_MS, type Stats } from '../shared/stats.ts';

export const MAX_BACKOFF_MS = 10_000;
export const TIMEOUTS_BEFORE_FAILED = 3;

export type BlockedReason = 'not-allowed' | 'paused' | 'failed';

export type PollState =
  | { kind: 'loading' }
  | { kind: 'ready'; stats: Stats }
  | { kind: 'blocked'; reason: BlockedReason };

export type PollerDeps = {
  request: () => Promise<{ status: number; body: string }>;
  onState: (state: PollState) => void;
  visible: () => boolean;
  schedule: (fn: () => void, ms: number) => () => void;
  /** How often to ask while visible. Defaults to the shared sample interval. */
  intervalMs?: number;
};

const errorCode = (error: unknown): string | null => {
  if (typeof error !== 'object' || error === null) return null;
  const code = Reflect.get(error, 'code');
  return typeof code === 'string' ? code : null;
};

const isStats = (value: unknown): value is Stats => {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;
  return typeof record.sampledAt === 'number'
    && typeof record.guard === 'object'
    && record.guard !== null
    && Array.isArray(record.warnings);
};

export type Poller = {
  poll: () => void;
  dispose: () => void;
};

export const createPoller = (deps: PollerDeps): Poller => {
  let inFlight = false;
  let disposed = false;
  let failures = 0;
  let timeouts = 0;
  let shownAt = 0;
  let blocked = false;
  let cancel: (() => void) | null = null;

  const interval = () => deps.intervalMs ?? SAMPLE_INTERVAL_MS;

  const next = (ms: number) => {
    cancel?.();
    cancel = deps.schedule(() => {
      cancel = null;
      poll();
    }, ms);
  };

  const backoff = () => Math.min(MAX_BACKOFF_MS, interval() * 2 ** Math.max(0, failures - 1));

  const fail = (reason: BlockedReason | null) => {
    failures += 1;
    if (reason) {
      blocked = true;
      deps.onState({ kind: 'blocked', reason });
    }
    next(backoff());
  };

  const poll = () => {
    if (disposed || inFlight) return;
    if (!deps.visible()) return;
    inFlight = true;
    void deps.request().then(
      (response) => {
        inFlight = false;
        if (disposed) return;
        let stats: Stats | null = null;
        if (response.status === 200) {
          try {
            const parsed: unknown = JSON.parse(response.body);
            stats = isStats(parsed) ? parsed : null;
          } catch {
            stats = null;
          }
        }
        if (!stats) {
          timeouts += 1;
          fail(timeouts >= TIMEOUTS_BEFORE_FAILED ? 'failed' : null);
          return;
        }
        failures = 0;
        timeouts = 0;
        if (stats.sampledAt >= shownAt || blocked) {
          shownAt = stats.sampledAt;
          blocked = false;
          deps.onState({ kind: 'ready', stats });
        }
        next(interval());
      },
      (error: unknown) => {
        inFlight = false;
        if (disposed) return;
        const code = errorCode(error);
        if (code === 'NO_SERVICE') {
          fail('not-allowed');
        } else if (code === 'DISABLED') {
          fail('paused');
        } else if (code === 'HOST_TIMEOUT') {
          timeouts += 1;
          fail(timeouts >= TIMEOUTS_BEFORE_FAILED ? 'failed' : null);
        } else {
          fail('failed');
        }
      },
    );
  };

  return {
    poll: () => {
      cancel?.();
      cancel = null;
      poll();
    },
    dispose: () => {
      disposed = true;
      cancel?.();
      cancel = null;
    },
  };
};
