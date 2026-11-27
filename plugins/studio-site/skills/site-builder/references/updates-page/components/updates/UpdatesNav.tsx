'use client';

import { useEffect, useLayoutEffect, useRef, type CSSProperties } from 'react';

import type { StopGroup } from '@/lib/updates/updates.shared';

type Props = { groups: StopGroup[]; active: number; cur: number; total: number; onJump: (gi: number) => void };

const n = (g: StopGroup) => g.end - g.start + 1;
const plural = (c: number) => `${c} update${c === 1 ? '' : 's'}`;

/** Phones: sticky row of chips, with a thin progress line. The active chip is kept centred. */
export function UpdatesChips({ groups, active, cur, total, onJump }: Props) {
  const row = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const r = row.current;
    const chip = r?.querySelector<HTMLElement>('[aria-current="true"]');
    if (r && chip) r.scrollLeft = chip.offsetLeft - r.clientWidth / 2 + chip.offsetWidth / 2;
  }, [active]);
  const step = Math.min(60, 600 / Math.max(groups.length, 1));
  return (
    <nav className="ud-chips" aria-label="Jump to">
      <div className="ud-chips-row" ref={row}>
        {groups.map((g, gi) => (
          <button
            key={g.k}
            type="button"
            className="ud-chip"
            style={{ '--d': Math.round(gi * step) } as CSSProperties}
            aria-current={gi === active ? 'true' : undefined}
            aria-label={`${g.head}, ${plural(n(g))}`}
            onClick={() => onJump(gi)}
          >
            {g.label}
            <small>{n(g)}</small>
          </button>
        ))}
      </div>
      <span className="ud-cbar" aria-hidden="true">
        <i style={{ width: `${total > 1 ? (cur / (total - 1)) * 100 : 100}%` }} />
      </span>
    </nav>
  );
}

/** Desktop: sticky left rail. A vertical track filled to the current stop, a node per stop, a pip per update. */
export function UpdatesRail({ groups, active, cur, onJump }: Omit<Props, 'total'>) {
  const wrap = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const w = wrap.current;
    const node = w?.querySelector<HTMLElement>('.ud-g.on');
    if (!w || !node) return;
    if (fill.current) fill.current.style.height = `${node.offsetTop}px`;
    if (node.offsetTop < w.scrollTop || node.offsetTop > w.scrollTop + w.clientHeight - 40) w.scrollTop = node.offsetTop - w.clientHeight / 2;
  }, [active]);
  const step = Math.min(70, 900 / Math.max(groups.length, 1));
  return (
    <nav className="ud-rail" aria-label="Jump to">
      <div className="ud-rail-h">Jump to</div>
      <div className="ud-spine-wrap" ref={wrap}>
        <div className="ud-spine">
          <span className="ud-trk" />
          <span className="ud-fill" ref={fill} />
          <ol>
            {groups.map((g, gi) => (
              <li
                key={g.k}
                className={`ud-g${gi === active ? ' on' : ''}${gi < active ? ' past' : ''}`}
                style={{ '--d': Math.round((groups.length - 1 - gi) * step) } as CSSProperties}
              >
                <span className="ud-node" />
                <button
                  type="button"
                  aria-current={gi === active ? 'true' : undefined}
                  aria-label={`${g.head}, ${plural(n(g))}`}
                  onClick={() => onJump(gi)}
                >
                  <span className="ud-gl">{g.label}</span>
                  <span className="ud-gn">{n(g)}</span>
                </button>
                <span className="ud-pips" aria-hidden="true">
                  {Array.from({ length: n(g) }, (_, j) => {
                    const i = g.start + j;
                    return <i key={i} className={i < cur ? 'done' : i === cur ? 'cur' : undefined} />;
                  })}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </nav>
  );
}
