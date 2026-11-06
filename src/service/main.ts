import http from 'node:http';

import { readGuard } from './guard.ts';
import { createSampler } from './sampler.ts';
import { createSystemCollector } from './system.ts';

const port = Number(process.env.OPENCHAMBER_SERVICE_PORT);
const token = process.env.OPENCHAMBER_SERVICE_TOKEN ?? '';
if (!port || !token) {
  console.error('OPENCHAMBER_SERVICE_PORT and OPENCHAMBER_SERVICE_TOKEN are required');
  process.exit(1);
}

const sampler = createSampler({
  system: createSystemCollector(),
  guard: readGuard,
  now: () => Date.now(),
  wait: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  schedule: (fn, ms) => {
    const timer = setTimeout(fn, ms);
    return () => clearTimeout(timer);
  },
});

const send = (res: http.ServerResponse, status: number, body: object): void => {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
};

const server = http.createServer((req, res) => {
  if (req.headers.authorization !== `Bearer ${token}`) {
    send(res, 401, { error: 'unauthorized' });
    return;
  }
  const { pathname } = new URL(req.url ?? '/', 'http://127.0.0.1');
  if (pathname === '/health') {
    send(res, 200, { ok: true });
    return;
  }
  if (pathname === '/stats' && req.method === 'GET') {
    sampler.stats().then(
      (stats) => send(res, 200, stats),
      () => send(res, 503, { error: 'not-ready' }),
    );
    return;
  }
  send(res, 404, { error: 'not-found' });
});

const shutdown = () => {
  sampler.stop();
  server.close();
  process.exit(0);
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

server.listen(port, '127.0.0.1');
