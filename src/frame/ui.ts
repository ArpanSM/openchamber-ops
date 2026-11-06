import { mountProgress, type ProgressHandle, type Tone } from '@openchamber/sdk/ui';

import type { WarningLevel } from '../shared/stats.ts';

export const BASE_CSS = `
*{box-sizing:border-box}
[data-oc-theme="dark"]{color-scheme:dark}
[data-oc-theme="light"]{color-scheme:light}
html,body{margin:0;color:var(--oc-fg);font:12px/1.4 var(--oc-font);font-variant-numeric:tabular-nums}
[hidden]{display:none!important}
.muted{color:var(--oc-muted)}
.meter{display:flex;flex-direction:column;gap:3px;min-width:0}
.meter-head{display:flex;align-items:baseline;gap:8px;min-width:0}
.meter-label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.meter-value{flex:none;color:var(--oc-muted)}
.meter-value.warn{color:var(--oc-warning-text)}
.meter-value.critical{color:var(--oc-error-text)}
.meter .oc-sdk-progress{margin:0}
.unavailable{color:var(--oc-muted);font-style:italic}
.spark{display:block;width:100%;height:34px;margin-top:6px;color:var(--oc-primary)}
.spark.warn{color:var(--oc-warning-text)}
.spark.critical{color:var(--oc-error-text)}
`;

export const installStyle = (css: string): void => {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.append(style);
};

export const element = <K extends keyof HTMLElementTagNameMap>(tag: K, className = '', text = ''): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
};

export const toneFor = (level: WarningLevel | null): Tone => {
  if (level === 'critical') return 'error';
  if (level === 'warn') return 'warning';
  return 'primary';
};

export type MeterProps = {
  label: string;
  percent: number | null;
  value: string;
  level: WarningLevel | null;
  unavailable?: boolean;
};

export type Meter = { node: HTMLElement; update: (props: MeterProps) => void };

export const createMeter = (parent: HTMLElement): Meter => {
  const node = element('div', 'meter');
  const head = element('div', 'meter-head');
  const label = element('span', 'meter-label');
  const value = element('span', 'meter-value');
  head.append(label, value);
  const barSlot = element('div');
  node.append(head, barSlot);
  parent.append(node);
  let bar: ProgressHandle | null = null;
  return {
    node,
    update: (props) => {
      label.textContent = props.label;
      value.textContent = props.value;
      value.className = `meter-value${props.unavailable ? ' unavailable' : props.level ? ` ${props.level}` : ''}`;
      const show = props.percent !== null && !props.unavailable;
      barSlot.hidden = !show;
      if (!show) return;
      const barProps = { value: props.percent ?? 0, tone: toneFor(props.level), label: undefined };
      if (bar) bar.update(barProps);
      else bar = mountProgress(barSlot, barProps);
      barSlot.querySelector('[role="progressbar"]')?.setAttribute('aria-label', props.label);
    },
  };
};

export const sparkline = (values: (number | null)[], level: WarningLevel | null = null): SVGSVGElement => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', `spark${level ? ` ${level}` : ''}`);
  svg.setAttribute('viewBox', '0 0 300 34');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'History');
  const points = values.filter((value): value is number => value !== null);
  if (points.length < 2) return svg;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const step = 300 / Math.max(1, values.length - 1);
  const coords: string[] = [];
  values.forEach((value, index) => {
    if (value === null) return;
    const x = index * step;
    const y = 32 - ((value - min) / span) * 28;
    coords.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  });
  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', coords.join(' '));
  polyline.setAttribute('fill', 'none');
  polyline.setAttribute('stroke', 'currentColor');
  polyline.setAttribute('stroke-width', '1.6');
  polyline.setAttribute('vector-effect', 'non-scaling-stroke');
  svg.append(polyline);
  return svg;
};
