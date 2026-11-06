import { mountButton, mountProgress, mountSpinner } from '@openchamber/sdk/ui';

import { formatNumber, formatPercent } from '../frame/format.ts';
import { startFrame } from '../frame/host.ts';
import { BASE_CSS, element, installStyle, toneFor } from '../frame/ui.ts';
import {
  busiestGpu,
  levelForPercent,
  warningKey,
  type GuardStats,
  type Stats,
  type Warning,
  type WarningLevel,
} from '../shared/stats.ts';

installStyle(`${BASE_CSS}
html,body{background:transparent;overflow:hidden}
#root{display:grid;grid-template-columns:auto minmax(34px,1fr) auto;column-gap:8px;row-gap:4px;align-items:center;padding:1px 0 3px}
.line{display:contents}
.line .name{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:92px}
.line .pct{text-align:right;color:var(--oc-muted);min-width:44px}
.line .pct.warn{color:var(--oc-warning-text)}
.line .pct.critical{color:var(--oc-error-text)}
.line .na{grid-column:2/4;color:var(--oc-muted);font-style:italic;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.line .oc-sdk-progress-label{display:none}
.note,.tag{grid-column:1/-1}
.note{display:flex;align-items:center;gap:8px;color:var(--oc-muted);min-height:20px}
.tag{color:var(--oc-muted);font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
`);

const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing root');

type Line = { name: string; percent: number | null; level: WarningLevel | null; value: string; missing?: string };

const guardLevel = (guard: GuardStats): WarningLevel | null => {
  if (!guard.online) return 'warn';
  if (guard.memMb === null || guard.limitMb <= 0) return null;
  const percent = (guard.memMb / guard.limitMb) * 100;
  return percent >= 100 ? 'critical' : levelForPercent(percent);
};

const lines = (stats: Stats): Line[] => {
  const result: Line[] = [];
  const { cpu, gpus, guard } = stats;

  result.push(cpu.status === 'ok'
    ? { name: 'CPU', percent: cpu.total, level: null, value: formatPercent(cpu.total) }
    : { name: 'CPU', percent: null, level: null, value: '', missing: cpu.reason });

  const gLevel = guardLevel(guard);
  const gPercent = guard.memMb !== null && guard.limitMb > 0 ? (guard.memMb / guard.limitMb) * 100 : null;
  result.push({
    name: 'OC mem',
    percent: gPercent,
    level: gLevel,
    value: `${formatNumber((guard.memMb ?? 0) / 1024, 1)}/${formatNumber(guard.limitMb / 1024, 1)} GB`,
  });

  if (gpus.status === 'ok' || gpus.reason !== 'no-device') {
    const busiest = busiestGpu(gpus);
    result.push(gpus.status === 'ok'
      ? { name: 'GPU', percent: busiest, level: null, value: busiest === null ? '—' : formatPercent(busiest) }
      : { name: 'GPU', percent: null, level: null, value: '', missing: gpus.reason });
  }

  const jobCount = guard.jobs.length;
  const guardLabel = !guard.online ? 'offline' : guard.state === 'blocked' ? 'blocked' : guard.state === 'ok' ? 'ok' : guard.state;
  const maxIdle = guard.jobs.reduce((max, job) => Math.max(max, job.idleMin), 0);
  const jobPercent = jobCount > 0 && guard.jobsIdleMinutes > 0 ? Math.min(100, (maxIdle / guard.jobsIdleMinutes) * 100) : 0;
  const nearClose = guard.jobs.some((job) => guard.jobsIdleMinutes - job.idleMin <= 5);
  result.push({
    name: 'Jobs',
    percent: jobPercent,
    level: nearClose ? 'warn' : null,
    value: `${jobCount} · ${guardLabel}`,
  });

  return result;
};

const drawLine = (line: Line): HTMLElement => {
  const node = element('div', 'line');
  node.append(element('span', 'name', line.name));
  if (line.missing || line.percent === null) {
    node.append(element('span', 'na', line.missing ?? ''));
    return node;
  }
  const slot = element('div');
  mountProgress(slot, { value: line.percent, tone: toneFor(line.level), label: line.name });
  node.append(slot, element('span', `pct${line.level ? ` ${line.level}` : ''}`, line.value));
  return node;
};

const levelOfWarnings = (warnings: Warning[]): WarningLevel | null =>
  warnings.some((warning) => warning.level === 'critical') ? 'critical' : warnings.length > 0 ? 'warn' : null;

let badgeKey: string | null = null;

const host = startFrame(({ state, retry }) => {
  if (state.kind === 'loading') {
    const note = element('div', 'note');
    mountSpinner(note, { size: 'sm', label: 'Reading machine and guard' });
    root.replaceChildren(note);
    return;
  }
  if (state.kind === 'blocked') {
    const note = element('div', 'note');
    note.append(element('span', '', state.reason === 'not-allowed' ? 'Service not allowed' : state.reason === 'paused' ? 'Ops is paused' : 'Service is not answering'));
    if (state.reason === 'failed') mountButton(note, { label: 'Retry', size: 'xs', variant: 'ghost', onClick: retry });
    root.replaceChildren(note);
    return;
  }

  const { stats } = state;
  const nodes = lines(stats).map((line) => drawLine(line));
  const level = levelOfWarnings(stats.warnings);
  if (level) {
    const tag = element('div', `tag${level === 'critical' ? ' critical' : ''}`);
    tag.style.color = level === 'critical' ? 'var(--oc-error-text)' : 'var(--oc-warning-text)';
    tag.textContent = stats.warnings[0]?.message ?? '';
    nodes.push(tag);
  }
  root.replaceChildren(...nodes);
}, {
  onStats: (stats, client) => {
    const key = warningKey(stats.warnings);
    if (key === badgeKey) return;
    badgeKey = key;
    void client.setBadge(stats.warnings.length > 0 ? stats.warnings.length : null).catch(() => undefined);
  },
});

let reportedHeight = -1;
new ResizeObserver(() => {
  const height = Math.ceil(root.getBoundingClientRect().height);
  if (height === reportedHeight) return;
  reportedHeight = height;
  void host.setHeight(height).catch(() => undefined);
}).observe(root);
