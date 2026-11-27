import { describe, expect, it } from 'vitest';

import { updates } from './updates';
import { buildGroups, buildIds } from './updates.shared';

describe('updates data', () => {
  it('has YYYY-MM-DD dates, newest first', () => {
    for (const u of updates) expect(u.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const dates = updates.map((u) => u.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it('has unique ids and 1-6 items per entry', () => {
    const ids = buildIds(updates);
    expect(new Set(ids).size).toBe(ids.length);
    for (const u of updates) expect(u.items.length).toBeGreaterThanOrEqual(1), expect(u.items.length).toBeLessThanOrEqual(6);
  });

  it('groups by day: one group per distinct date', () => {
    const { groups, groupOf } = buildGroups(updates);
    expect(groups.length).toBe(new Set(updates.map((u) => u.date)).size);
    expect(groupOf.length).toBe(updates.length);
    expect(groups[groups.length - 1].end).toBe(updates.length - 1);
  });
});
