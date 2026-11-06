const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'] as const;

export const formatBytes = (bytes: number | null, digits = 1): string => {
  if (bytes === null || !Number.isFinite(bytes)) return '—';
  let value = Math.abs(bytes);
  let unit = 0;
  while (value >= 1024 && unit < UNITS.length - 1) {
    value /= 1024;
    unit += 1;
  }
  const sign = bytes < 0 ? '-' : '';
  const precision = value >= 100 || unit === 0 ? 0 : digits;
  return `${sign}${value.toFixed(precision)} ${UNITS[unit]}`;
};

export const formatMb = (mb: number | null): string => formatBytes(mb === null ? null : mb * 1024 * 1024);

export const formatPercent = (value: number | null): string => (value === null || !Number.isFinite(value) ? '—' : `${Math.round(value)}%`);

export const formatNumber = (value: number | null, digits = 1): string =>
  value === null || !Number.isFinite(value) ? '—' : value.toFixed(digits);

export const formatDuration = (minutes: number | null): string => {
  if (minutes === null || !Number.isFinite(minutes)) return '—';
  if (minutes < 1) return `${Math.max(0, Math.round(minutes * 60))}s`;
  if (minutes < 60) return `${Math.round(minutes)}m`;
  const hours = Math.floor(minutes / 60);
  const rest = Math.round(minutes % 60);
  return rest > 0 ? `${hours}h ${rest}m` : `${hours}h`;
};

export const relativeTime = (at: number | null): string => {
  if (at === null || !Number.isFinite(at)) return '—';
  const seconds = Math.max(0, Math.round((Date.now() - at) / 1000));
  if (seconds < 45) return 'just now';
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
};

export const shortProcessName = (name: string): string => {
  const trimmed = name.trim();
  if (trimmed.length <= 18) return trimmed;
  return `${trimmed.slice(0, 17)}…`;
};
