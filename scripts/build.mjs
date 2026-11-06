import { copyFile, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');

const bundle = async (entry, outfile, options) => {
  const file = resolve(dist, outfile);
  await mkdir(dirname(file), { recursive: true });
  await build({
    entryPoints: [resolve(root, entry)],
    outfile: file,
    bundle: true,
    sourcemap: false,
    logLevel: 'silent',
    ...options,
  });
};

await rm(dist, { recursive: true, force: true });
await bundle('src/panel/main.ts', 'panel/main.js', {
  format: 'iife',
  platform: 'browser',
  target: ['chrome120'],
  minify: true,
});
await bundle('src/status/main.ts', 'status/main.js', {
  format: 'iife',
  platform: 'browser',
  target: ['chrome120'],
  minify: true,
});
await bundle('src/service/main.ts', 'service/main.js', {
  format: 'esm',
  platform: 'node',
  target: ['node22'],
  minify: false,
});
await copyFile(resolve(root, 'src/panel/index.html'), resolve(dist, 'panel/index.html'));
await copyFile(resolve(root, 'src/status/index.html'), resolve(dist, 'status/index.html'));
console.log('Built dist/');
