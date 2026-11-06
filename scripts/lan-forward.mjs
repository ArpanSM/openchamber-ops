// A small LAN forwarder for the OpenChamber web UI.
//
// It exists because the desktop app listens on 127.0.0.1 only. This forwards a
// LAN port to it so a phone or tablet on the same network can open the browser
// UI. It is a raw TCP proxy: it does not add authentication, so only run it on
// a network you trust, or put the UI behind its own password/tunnel.
//
// Usage:
//   node scripts/lan-forward.mjs
//   LISTEN_PORT=8080 TARGET_PORT=57123 node scripts/lan-forward.mjs
import net from 'node:net';

const listenPort = Number(process.env.LISTEN_PORT ?? 8080);
const targetHost = process.env.TARGET_HOST ?? '127.0.0.1';
const targetPort = Number(process.env.TARGET_PORT ?? 57123);

const server = net.createServer((client) => {
  client.setNoDelay(true);
  const upstream = net.connect({ host: targetHost, port: targetPort });
  upstream.setNoDelay(true);

  const close = () => {
    client.destroy();
    upstream.destroy();
  };

  client.on('error', close);
  upstream.on('error', close);
  client.on('close', close);
  upstream.on('close', close);

  client.pipe(upstream);
  upstream.pipe(client);
});

server.on('error', (error) => {
  console.error(`lan-forward: ${error.message}`);
  process.exitCode = 1;
});

server.listen(listenPort, '0.0.0.0', () => {
  console.log(`lan-forward: 0.0.0.0:${listenPort} -> ${targetHost}:${targetPort}`);
});

const shutdown = () => {
  server.close(() => process.exit(0));
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
