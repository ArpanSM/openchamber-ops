import { connectHost, type HostClient } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';

import type { Stats } from '../shared/stats.ts';
import { createPoller, type PollState } from './poller.ts';

export type FrameContext = { state: PollState; retry: () => void };

export type FrameOptions = {
  onStats?: (stats: Stats, host: HostClient) => void;
};

export const startFrame = (render: (context: FrameContext) => void, options: FrameOptions = {}): HostClient => {
  const host = connectHost();
  let state: PollState = { kind: 'loading' };

  const poller = createPoller({
    request: () => host.serviceRequest({ method: 'GET', path: '/stats' }),
    onState: (next) => {
      state = next;
      draw();
      if (next.kind === 'ready') options.onStats?.(next.stats, host);
    },
    visible: () => document.visibilityState === 'visible',
    schedule: (fn, ms) => {
      const timer = setTimeout(fn, ms);
      return () => clearTimeout(timer);
    },
  });

  const draw = () => render({ state, retry: poller.poll });

  host.onReady((context) => {
    applyHostReady(context, document.documentElement);
    draw();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') poller.poll();
  });
  window.addEventListener('pagehide', () => {
    poller.dispose();
    host.dispose();
  });

  draw();
  poller.poll();
  return host;
};
