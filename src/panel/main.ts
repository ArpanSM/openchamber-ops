import { mountBadge, mountBanner, mountSpinner, type Tone } from '@openchamber/sdk/ui';

import { formatBytes, formatDuration, formatMb, formatNumber, formatPercent, relativeTime, shortProcessName } from '../frame/format.ts';
import { startFrame } from '../frame/host.ts';
import { BASE_CSS, createMeter, element, installStyle, sparkline } from '../frame/ui.ts';
import {
  busiestGpu,
  levelForPercent,
  warningKey,
  type CpuStats,
  type GpuStats,
  type GuardStats,
  type Job,
  type MemoryStats,
  type ProcessStats,
  type Stats,
  type Unavailable,
  type Warning,
} from '../shared/stats.ts';

installStyle(`${BASE_CSS}
html,body{background:var(--oc-bg);min-height:100%}
#root{display:flex;flex-direction:column;gap:14px;padding:12px 12px 20px;container-type:inline-size}
.head{display:flex;align-items:center;gap:8px;padding:0 2px 2px}
.head .name{font-size:13px;font-weight:650;letter-spacing:.01em}
.head .sub{color:var(--oc-muted);font-size:10px;margin-top:1px}
.head .grow{flex:1}
section{display:flex;flex-direction:column;gap:7px;min-width:0}
section+section{border-top:1px solid var(--oc-border);padding-top:12px}
h2{margin:0;font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--oc-muted);display:flex;align-items:baseline;gap:7px;min-width:0}
h2 .sub{font-weight:400;color:var(--oc-muted);letter-spacing:0;text-transform:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.hero{display:flex;align-items:flex-end;justify-content:space-between;gap:8px}
.big{font-size:21px;font-weight:680;letter-spacing:-.02em;line-height:1.05}
.big small{font-size:11px;color:var(--oc-muted);font-weight:500;letter-spacing:0}
.meta{color:var(--oc-muted);font-size:10px;text-align:right;line-height:1.35}
.meta b{color:var(--oc-fg);font-weight:600}
.caption{display:flex;justify-content:space-between;gap:8px;color:var(--oc-muted);font-size:10px;min-width:0}
.caption span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.caption .warn{color:var(--oc-warning-text)}
.caption .critical{color:var(--oc-error-text)}
.warnline{display:flex;align-items:center;gap:6px;color:var(--oc-warning-text);font-size:10.5px;padding:6px 8px;border:1px solid color-mix(in srgb,var(--oc-warning-text) 28%,transparent);border-radius:var(--oc-radius);background:color-mix(in srgb,var(--oc-warning-text) 7%,transparent)}
.warnline.critical{color:var(--oc-error-text);border-color:color-mix(in srgb,var(--oc-error-text) 28%,transparent);background:color-mix(in srgb,var(--oc-error-text) 7%,transparent)}
.jobs{display:flex;flex-direction:column;gap:0}
.job{display:grid;grid-template-columns:1fr auto;gap:2px 8px;padding:7px 0;min-width:0}
.job+.job{border-top:1px solid var(--oc-border)}
.job .jname{font-weight:600;font-size:11.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.job .jkind{color:var(--oc-muted);font-size:9.5px;margin-left:5px;font-weight:500}
.job .jnums{color:var(--oc-muted);font-size:10px;white-space:nowrap;text-align:right}
.job .jnums b{color:var(--oc-fg);font-weight:600}
.job .jfoot{grid-column:1/-1;display:flex;align-items:center;gap:7px;color:var(--oc-muted);font-size:9.5px;min-width:0}
.job .jfoot .grow{flex:1}
.cores{display:grid;gap:2px;height:24px;align-items:end}
.core{background:color-mix(in srgb,var(--oc-primary) 16%,transparent);border-radius:2px 2px 0 0;height:100%;position:relative;overflow:hidden}
.core>i{position:absolute;left:0;right:0;bottom:0;background:var(--oc-primary)}
.rows{display:flex;flex-direction:column;gap:6px}
.row{display:grid;grid-template-columns:46px 1fr auto;gap:7px;align-items:center;min-width:0}
.row .rlabel{color:var(--oc-muted);font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.row .rval{color:var(--oc-muted);font-size:10px;text-align:right;white-space:nowrap}
.row .rval b{color:var(--oc-fg);font-weight:600}
.row .meter{grid-column:2}
.row .meter .meter-head{display:none}
.row .meter .oc-sdk-progress{margin:0}
table{width:100%;border-collapse:collapse;font-size:10px}
th{text-align:left;color:var(--oc-muted);font-weight:600;font-size:9px;letter-spacing:.04em;text-transform:uppercase;padding:0 0 4px}
th.r,td.r{text-align:right}
td{padding:3px 0;border-top:1px solid var(--oc-border);color:var(--oc-muted)}
td.pname{color:var(--oc-fg);max-width:132px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
td .pid{color:var(--oc-muted);font-size:9px;margin-left:4px}
.event{display:flex;gap:7px;align-items:baseline;padding:4px 0;font-size:10px;min-width:0}
.event+.event{border-top:1px solid var(--oc-border)}
.event .when{color:var(--oc-muted);white-space:nowrap;font-size:9.5px}
.event .what{flex:1;color:var(--oc-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.event .what b{color:var(--oc-fg);font-weight:600}
.event .reclaim{color:var(--oc-success-text);font-weight:600;white-space:nowrap}
.event .failed{color:var(--oc-error-text)}
.center{display:flex;align-items:center;gap:8px;color:var(--oc-muted);padding:18px 0}
`);

const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing root');

const section = (title: string, sub: string | null = null): HTMLElement => {
  const node = element('section');
  const heading = element('h2', '', title);
  if (sub) heading.append(element('span', 'sub', sub));
  node.append(heading);
  return node;
};

const unavailableLine = (parent: HTMLElement, source: Unavailable): void => {
  const reason = source.reason === 'tool-missing' && source.tool
    ? `${source.tool} not found`
    : source.reason === 'no-device'
      ? 'no device'
      : source.reason === 'unsupported'
        ? 'not supported'
        : 'unavailable';
  parent.append(element('div', 'unavailable', reason));
};

const badgeTone = (level: 'warn' | 'critical' | null): Tone => (level === 'critical' ? 'error' : level === 'warn' ? 'warning' : 'success');

const guardStatus = (guard: GuardStats): { label: string; tone: Tone; level: 'warn' | 'critical' | null } => {
  if (!guard.online) return { label: 'Offline', tone: 'warning', level: 'warn' };
  if (guard.state === 'blocked') return { label: 'Blocked', tone: 'warning', level: 'warn' };
  if (guard.state === 'restarting') return { label: 'Restarting', tone: 'warning', level: 'warn' };
  if (guard.state === 'ok') return { label: 'OK', tone: 'success', level: null };
  return { label: guard.state === 'unknown' ? 'Unknown' : guard.state, tone: 'neutral', level: null };
};

const guardReason = (guard: GuardStats): string => {
  if (!guard.online) return guard.error ?? 'state file is stale';
  if (guard.state === 'blocked') {
    const sessions = guard.runningSessions;
    return `over limit · waiting for ${sessions} session${sessions === 1 ? '' : 's'}`;
  }
  if (guard.memMb !== null && guard.limitMb > 0 && guard.memMb > guard.limitMb) {
    return 'over limit · restarts when idle';
  }
  return guard.reasons[0] ?? 'below the limit';
};

const jobTone = (job: Job): Tone => {
  if (job.state === 'busy') return 'success';
  if (job.state === 'waiting') return 'warning';
  if (job.state === 'idle') return 'error';
  return 'neutral';
};

const jobFoot = (job: Job, guard: GuardStats): string => {
  if (job.state === 'busy') return `${formatNumber(job.cpu, 1)}% CPU`;
  const remaining = Math.max(0, guard.jobsIdleMinutes - job.idleMin);
  if (remaining <= 0) return 'due to close';
  return `closes in ${formatDuration(remaining)}`;
};

const guardSection = (guard: GuardStats): HTMLElement => {
  const node = section('OpenChamber memory', 'guard');
  const percent = guard.memMb !== null && guard.limitMb > 0 ? (guard.memMb / guard.limitMb) * 100 : null;
  const level = percent === null ? null : percent >= 100 ? 'critical' : levelForPercent(percent);
  const hero = element('div', 'hero');
  const big = element('div', 'big');
  big.append(document.createTextNode(formatMb(guard.memMb)));
  const small = element('small');
  small.textContent = ` / ${formatMb(guard.limitMb)} limit`;
  big.append(small);
  hero.append(big);
  const meta = element('div', 'meta');
  meta.append(document.createTextNode('idle '));
  const idle = element('b', '', formatDuration(guard.idleMin));
  meta.append(idle);
  hero.append(meta);
  node.append(hero);

  createMeter(node).update({
    label: 'memory',
    percent,
    value: percent === null ? '—' : formatPercent(percent),
    level,
  });

  const reason = element('div', `caption${level ? ` ${level}` : ''}`);
  reason.append(element('span', '', guardReason(guard)));
  reason.append(element('span', '', percent === null ? '' : formatPercent(percent)));
  node.append(reason);

  const history = guard.memHistory.map(([, mb]) => mb);
  if (history.length > 1) {
    node.append(sparkline(history, level));
  }
  const foot = element('div', 'caption');
  foot.append(element('span', '', 'last hour'));
  foot.append(element('span', '', `${guard.runningSessions} sessions · ${guard.processCount ?? '—'} processes`));
  node.append(foot);
  return node;
};

const jobsSection = (guard: GuardStats): HTMLElement => {
  const node = section('Jobs', `${guard.jobs.length} tracked`);
  if (guard.jobs.length === 0) {
    node.append(element('div', 'unavailable', 'no tracked jobs'));
    return node;
  }
  const list = element('div', 'jobs');
  for (const job of guard.jobs) {
    const row = element('div', 'job');
    const name = element('div', 'jname');
    name.append(document.createTextNode(job.label));
    name.append(element('span', 'jkind', job.kind));
    row.append(name);
    const nums = element('div', 'jnums');
    const rss = element('b', '', formatMb(job.rssMb));
    nums.append(rss);
    if (job.swapMb >= 1) nums.append(document.createTextNode(` + ${formatMb(job.swapMb)} swap`));
    row.append(nums);
    const foot = element('div', 'jfoot');
    const badgeSlot = element('span');
    mountBadge(badgeSlot, { label: job.state, tone: jobTone(job) });
    foot.append(badgeSlot);
    foot.append(element('span', '', jobFoot(job, guard)));
    foot.append(element('span', 'grow'));
    if (job.port !== null) foot.append(element('span', '', `:${job.port}`));
    if (job.unit) foot.append(element('span', '', job.unit));
    row.append(foot);
    list.append(row);
  }
  node.append(list);
  return node;
};

const cpuSection = (cpu: CpuStats | Unavailable, stats: Stats): HTMLElement => {
  const node = section('CPU', cpu.status === 'ok' ? cpu.model : null);
  if (cpu.status !== 'ok') {
    unavailableLine(node, cpu);
    return node;
  }
  const hero = element('div', 'hero');
  hero.append(element('div', 'big', formatPercent(cpu.total)));
  const meta = element('div', 'meta');
  if (cpu.load) {
    meta.append(document.createTextNode('load '));
    meta.append(element('b', '', cpu.load.map((value) => formatNumber(value, 2)).join(' · ')));
  }
  hero.append(meta);
  node.append(hero);
  node.append(sparkline(stats.history.cpu, cpu.total >= 90 ? 'warn' : null));
  if (cpu.perCore.length > 1) {
    const cores = element('div', 'cores');
    cores.style.gridTemplateColumns = `repeat(${cpu.perCore.length}, minmax(0, 1fr))`;
    cores.setAttribute('role', 'img');
    cores.setAttribute('aria-label', 'Per-core CPU usage');
    cpu.perCore.forEach((value, index) => {
      const core = element('div', 'core');
      core.title = `#${index + 1}: ${formatPercent(value)}`;
      const fill = element('i');
      fill.style.height = `${Math.round(value)}%`;
      core.append(fill);
      cores.append(core);
    });
    node.append(cores);
  }
  const caption = element('div', 'caption');
  caption.append(element('span', '', `${cpu.cores} cores${cpu.freqMhz ? ` · ${Math.round(cpu.freqMhz)} MHz` : ''}${cpu.tempC !== null ? ` · ${Math.round(cpu.tempC)}°C` : ''}`));
  const gpu = stats.gpus;
  if (gpu.status === 'ok' && gpu.devices[0]) {
    const device = gpu.devices[0];
    caption.append(element('span', '', `GPU ${formatPercent(device.utilization)} · ${formatBytes(device.memUsed)} / ${formatBytes(device.memTotal)}`));
  }
  node.append(caption);
  return node;
};

const memorySection = (memory: MemoryStats | Unavailable): HTMLElement => {
  const node = section('Memory');
  if (memory.status !== 'ok') {
    unavailableLine(node, memory);
    return node;
  }
  const rows = element('div', 'rows');
  const ramPercent = memory.total > 0 ? (memory.used / memory.total) * 100 : 0;
  const ramLevel = levelForPercent(ramPercent);
  const ram = element('div', 'row');
  ram.append(element('span', 'rlabel', 'RAM'));
  const ramMeter = createMeter(ram);
  ramMeter.update({ label: 'RAM', percent: ramPercent, value: '', level: ramLevel });
  ram.append(element('span', 'rval', `${formatBytes(memory.used)} / ${formatBytes(memory.total)}`));
  rows.append(ram);

  if (memory.swapTotal !== null && memory.swapUsed !== null) {
    const swapPercent = memory.swapTotal > 0 ? (memory.swapUsed / memory.swapTotal) * 100 : 0;
    const swap = element('div', 'row');
    swap.append(element('span', 'rlabel', 'Swap'));
    const swapMeter = createMeter(swap);
    swapMeter.update({ label: 'Swap', percent: swapPercent, value: '', level: levelForPercent(swapPercent) });
    swap.append(element('span', 'rval', `${formatBytes(memory.swapUsed)} / ${formatBytes(memory.swapTotal)}`));
    rows.append(swap);
  }

  if (memory.zram) {
    const zramPercent = memory.zram.disksize > 0 ? (memory.zram.data / memory.zram.disksize) * 100 : 0;
    const zram = element('div', 'row');
    zram.append(element('span', 'rlabel', `zram`));
    const zramMeter = createMeter(zram);
    zramMeter.update({ label: 'zram', percent: zramPercent, value: '', level: null });
    zram.append(element('span', 'rval', `${formatBytes(memory.zram.data)} → ${formatBytes(memory.zram.memUsed)}`));
    rows.append(zram);
  }
  node.append(rows);

  const caption = element('div', 'caption');
  if (memory.zram) {
    const ratio = memory.zram.memUsed > 0 ? memory.zram.data / memory.zram.memUsed : null;
    caption.append(element('span', '', `${memory.zram.algo}${ratio ? ` · ${formatNumber(ratio, 1)}× compression` : ''}`));
  }
  const swaps = memory.swapDevices.map((device) => `${device.name} ${formatBytes(device.used)}`).join(' · ');
  caption.append(element('span', '', swaps || 'no swap devices'));
  node.append(caption);
  return node;
};

const processesSection = (processes: ProcessStats | Unavailable): HTMLElement => {
  const node = section('Processes', 'top by RAM');
  if (processes.status !== 'ok') {
    unavailableLine(node, processes);
    return node;
  }
  if (processes.rows.length === 0) {
    node.append(element('div', 'unavailable', 'no processes'));
    return node;
  }
  const table = element('table');
  const thead = element('thead');
  const headRow = element('tr');
  for (const [label, right] of [['Process', false], ['CPU', true], ['RAM', true], ['Swap', true], ['GPU', true]] as const) {
    const th = element('th', right ? 'r' : '', label);
    headRow.append(th);
  }
  thead.append(headRow);
  table.append(thead);
  const tbody = element('tbody');
  for (const row of processes.rows.slice(0, 8)) {
    const tr = element('tr');
    const name = element('td', 'pname');
    name.append(document.createTextNode(shortProcessName(row.name)));
    name.append(element('span', 'pid', String(row.pid)));
    tr.append(name);
    tr.append(element('td', 'r', formatPercent(row.cpu)));
    tr.append(element('td', 'r', formatBytes(row.rss)));
    tr.append(element('td', 'r', row.swap > 0 ? formatBytes(row.swap) : '—'));
    const gpu = row.gpuType ? `${row.gpuType}${row.gpuSm !== null ? ` ${Math.round(row.gpuSm)}%` : ''}` : '—';
    tr.append(element('td', 'r', gpu));
    tbody.append(tr);
  }
  table.append(tbody);
  node.append(table);
  return node;
};

const historySection = (guard: GuardStats): HTMLElement => {
  const node = section('History', 'guard actions');
  if (guard.history.length === 0) {
    node.append(element('div', 'unavailable', 'no guard actions yet'));
    return node;
  }
  for (const event of guard.history.slice(0, 5)) {
    const row = element('div', 'event');
    row.append(element('span', 'when', relativeTime(event.at)));
    const what = element('span', 'what');
    const label = element('b', '', event.kind === 'restart' ? 'OpenChamber' : event.label);
    what.append(label);
    if (event.kind === 'restart') what.append(document.createTextNode(' restarted'));
    if (event.kind === 'job-close') what.append(document.createTextNode(' closed'));
    if (event.kind === 'job-failed') what.append(document.createTextNode(' close failed'));
    if (event.beforeMb !== null && event.afterMb !== null) {
      what.append(document.createTextNode(` · ${formatMb(event.beforeMb)} → ${formatMb(event.afterMb)}`));
    }
    row.append(what);
    if (event.reclaimedMb !== null) {
      row.append(element('span', 'reclaim', formatMb(event.reclaimedMb)));
    } else if (event.ok === false) {
      row.append(element('span', 'failed', 'failed'));
    }
    node.append(row);
  }
  return node;
};

const warningLine = (warnings: Warning[]): HTMLElement | null => {
  if (warnings.length === 0) return null;
  const critical = warnings.some((warning) => warning.level === 'critical');
  const line = element('div', `warnline${critical ? ' critical' : ''}`);
  line.append(document.createTextNode(`⚠ ${warnings.length} warning${warnings.length === 1 ? '' : 's'} · ${warnings[0]?.message ?? ''}`));
  return line;
};

let badgeKey: string | null = null;

startFrame(({ state, retry }) => {
  if (state.kind === 'loading') {
    const note = element('div', 'center');
    mountSpinner(note, { size: 'sm', label: 'Reading machine and guard' });
    root.replaceChildren(note);
    return;
  }
  if (state.kind === 'blocked') {
    const slot = element('div');
    const text = state.reason === 'not-allowed'
      ? { title: 'Service not allowed', body: 'Allow the Ops local service in Settings → Extensions.' }
      : state.reason === 'paused'
        ? { title: 'Ops is paused', body: 'Enable Ops in Settings → Extensions.' }
        : { title: 'Service is not answering', body: 'The local service did not answer. Retry, or check Settings → Extensions.' };
    mountBanner(slot, {
      tone: state.reason === 'failed' ? 'error' : 'warning',
      title: text.title,
      body: text.body,
      action: state.reason === 'failed' ? { label: 'Retry', onClick: retry } : undefined,
    });
    root.replaceChildren(slot);
    return;
  }

  const { stats } = state;
  const guard = stats.guard;
  const status = guardStatus(guard);
  const nodes: HTMLElement[] = [];

  const head = element('div', 'head');
  const nameBlock = element('div');
  nameBlock.append(element('div', 'sub', 'machine + guard'));
  head.append(nameBlock);
  head.append(element('div', 'grow'));
  const badge = element('span');
  mountBadge(badge, { label: status.label, tone: status.tone });
  head.append(badge);
  nodes.push(head);

  const warn = stats.warnings.length > 1 || stats.warnings.some((warning) => warning.kind !== 'guard')
    ? warningLine(stats.warnings)
    : null;
  if (warn) nodes.push(warn);

  nodes.push(
    guardSection(guard),
    jobsSection(guard),
    cpuSection(stats.cpu, stats),
    memorySection(stats.memory),
    processesSection(stats.processes),
    historySection(guard),
  );
  root.replaceChildren(...nodes);
}, {
  onStats: (stats, host) => {
    const key = warningKey(stats.warnings);
    if (key === badgeKey) return;
    badgeKey = key;
    void host.setBadge(stats.warnings.length > 0 ? stats.warnings.length : null).catch(() => undefined);
  },
});
