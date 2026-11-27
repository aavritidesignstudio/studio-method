import type { Update } from './updates';

export type StopGroup = { k: string; label: string; head: string; start: number; end: number };

export function fmtDate(iso: string, o: Intl.DateTimeFormatOptions): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', { ...o, timeZone: 'UTC' });
}

export const longDate = (iso: string) => fmtDate(iso, { day: 'numeric', month: 'long', year: 'numeric' });

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Stable, unique anchor id per entry (date + title, de-duplicated). */
export function buildIds(list: readonly Update[]): string[] {
  const seen = new Map<string, number>();
  return list.map((u) => {
    const base = slug(`${u.date} ${u.title}`);
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return n ? `${base}-${n + 1}` : base;
  });
}

/** One group per run of the same date (list is newest first). */
export function buildGroups(list: readonly Update[]): { groups: StopGroup[]; groupOf: number[] } {
  const groups: StopGroup[] = [];
  const groupOf: number[] = [];
  list.forEach((u, i) => {
    const last = groups[groups.length - 1];
    if (last?.k === u.date) last.end = i;
    else {
      groups.push({
        k: u.date,
        label: fmtDate(u.date, { day: 'numeric', month: 'short' }),
        head: longDate(u.date),
        start: i,
        end: i,
      });
    }
    groupOf[i] = groups.length - 1;
  });
  return { groups, groupOf };
}
