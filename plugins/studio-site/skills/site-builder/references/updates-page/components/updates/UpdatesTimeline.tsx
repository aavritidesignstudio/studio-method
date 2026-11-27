'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { animate } from 'motion';

import { PRODUCT, updates, UPDATES_STOPS } from '@/lib/updates/updates';
import { buildGroups, buildIds, longDate } from '@/lib/updates/updates.shared';
import { UpdatesChips, UpdatesRail } from './UpdatesNav';

const BATCH = 8;
const N = updates.length;
const IDS = buildIds(updates);
const { groups: GROUPS, groupOf: GOF } = buildGroups(updates);

const batchesFor = (count: number) => Math.min(N, Math.ceil(count / BATCH) * BATCH);
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Space to keep clear at the top of the viewport: sticky header, plus the phone chip row. */
function topOffset() {
  const head = document.querySelector('.ud-head')?.getBoundingClientRect().bottom ?? 0;
  const chips = document.querySelector('.ud-chips');
  return head + (chips && getComputedStyle(chips).display !== 'none' ? chips.getBoundingClientRect().height : 0);
}

type Pending = { id: string; smooth: boolean; mark: boolean };

export default function UpdatesTimeline() {
  // Server and first client render show everything (SEO, no-JS); batching starts after mount.
  const [shown, setShown] = useState(N);
  const [anim, setAnim] = useState(N); // cards from this index slide in
  const [ready, setReady] = useState(false);
  const [intro, setIntro] = useState(false);
  const [cur, setCur] = useState(0);
  const [hl, setHl] = useState('');
  const [toast, setToast] = useState('');
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLElement>(null);
  const sentinel = useRef<HTMLDivElement>(null);
  const pending = useRef<Pending | null>(null);
  const shownRef = useRef(shown);
  shownRef.current = shown;
  const stopIntro = useRef<() => void>(() => {});
  const timers = useRef<number[]>([]);
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const goTo = useCallback((p: Pending) => {
    const el = document.getElementById(p.id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - topOffset() - 24;
    window.scrollTo({ top, behavior: p.smooth && !prefersReducedMotion() ? 'smooth' : 'instant' });
    if (p.mark) {
      setHl(p.id);
      later(() => setHl(''), 2600);
    }
  }, []);

  const grow = (to: number) => {
    if (to <= shownRef.current) return;
    setAnim(shownRef.current);
    setShown(to);
  };

  // On mount: start batching, then either honour a #hash or play the intro.
  useLayoutEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const idx = IDS.indexOf(id);
    setReady(true);
    setShown(batchesFor(Math.max(idx + 1, BATCH)));
    if (idx >= 0) {
      pending.current = { id, smooth: false, mark: true };
      // Web fonts re-wrap the cards above the target; land again as each one arrives, unless the reader has already moved.
      let moved = false;
      const evs = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
      const onMove = () => (moved = true);
      const reland = () => moved || goTo({ id, smooth: false, mark: false });
      evs.forEach((e) => window.addEventListener(e, onMove, { passive: true }));
      document.fonts?.addEventListener('loadingdone', reland);
      later(() => {
        evs.forEach((e) => window.removeEventListener(e, onMove));
        document.fonts?.removeEventListener('loadingdone', reland);
      }, 5000);
    } else if (!window.location.hash && !prefersReducedMotion()) setIntro(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Runs after every render: a requested scroll waits until its batch is in the DOM.
  useLayoutEffect(() => {
    if (!pending.current) return;
    const p = pending.current;
    pending.current = null;
    goTo(p);
  });

  // A link to another update pasted into the same tab: load up to it and go there.
  useEffect(() => {
    const on = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const idx = IDS.indexOf(id);
      if (idx < 0) return;
      stopIntro.current();
      pending.current = { id, smooth: true, mark: true };
      if (batchesFor(idx + 1) > shownRef.current) grow(batchesFor(idx + 1));
      else goTo(pending.current);
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Intro: start at the end of the first batch, glide to the top; any user input cancels.
  useLayoutEffect(() => {
    if (!intro) return;
    const el = root.current!;
    const start = Math.max(0, (sentinel.current?.getBoundingClientRect().top ?? 0) + window.scrollY - window.innerHeight);
    const setCount = (v: number) => count.current && (count.current.textContent = String(v));
    let dead = false;
    const anims: { stop: () => void }[] = [];
    const evs = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
    const stop = () => {
      if (dead) return;
      dead = true;
      anims.forEach((a) => a.stop());
      evs.forEach((e) => window.removeEventListener(e, stop));
      setCount(N);
      setIntro(false);
    };
    stopIntro.current = stop;
    window.scrollTo({ top: start, behavior: 'instant' });
    setCount(0);
    evs.forEach((e) => window.addEventListener(e, stop, { passive: true }));
    const raf = requestAnimationFrame(() => el.classList.add('draw'));
    anims.push(
      animate(start, 0, {
        delay: 0.25,
        duration: 1.1,
        ease: [0.45, 0, 0.55, 1],
        onUpdate: (y) => window.scrollTo({ top: y, behavior: 'instant' }),
        onComplete: stop,
      }),
      animate(0, N, {
        delay: 0.25,
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (c) => setCount(Math.round(c)),
      }),
    );
    return () => {
      cancelAnimationFrame(raf);
      if (!dead) stop();
    };
  }, [intro]);

  // Next batch when the end of the list nears the viewport.
  useEffect(() => {
    const s = sentinel.current;
    if (!ready || intro || shown >= N || !s) return;
    const io = new IntersectionObserver((es) => es.some((e) => e.isIntersecting) && grow(shownRef.current + BATCH), {
      rootMargin: '0px 0px 240px 0px',
    });
    io.observe(s);
    return () => io.disconnect();
  }, [ready, intro, shown]);

  // Where you are: the last card whose top has passed the header.
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cards = document.querySelectorAll<HTMLElement>('.ud-card');
        const line = topOffset() + 110;
        let c = 0;
        for (const el of cards) {
          if (el.getBoundingClientRect().top <= line) c = +el.dataset.i!;
          else break;
        }
        if (cards.length && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) c = +cards[cards.length - 1].dataset.i!;
        setCur(c);
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, [shown]);

  const jump = (gi: number) => {
    stopIntro.current();
    pending.current = { id: `ud-g-${gi}`, smooth: true, mark: false };
    const to = batchesFor(GROUPS[gi].end + 1);
    if (to > shownRef.current) grow(to);
    else goTo(pending.current);
  };

  const copy = (i: number) => {
    const url = `${window.location.origin}/updates#${IDS[i]}`; // change the path if the page is not at /updates
    const say = (m: string) => {
      setToast(m);
      later(() => setToast(''), 2200);
    };
    (navigator.clipboard?.writeText(url) ?? Promise.reject()).then(() => say('Link copied'), () => say(url));
  };

  const active = GOF[cur] ?? 0;
  const first = longDate(updates[N - 1].date);
  const rest = N - shown;

  return (
    <div className="ud-page">
      <header className="pg-hero">
        <div className="pg-in">
          <div className="pg-eyebrow">Updates</div>
          <h1 className="pg-h1">
            What&apos;s <em>new</em>
          </h1>
          <p className="pg-lead">The latest improvements to {PRODUCT}, newest first.</p>
          <p className="ud-count">
            <b ref={count}>{N}</b> updates since {first}
          </p>
        </div>
      </header>
      <div ref={root} className={`pg-in ud-wrap pg-sec${intro ? ' drawing' : ''}`} data-stops={UPDATES_STOPS}>
        <UpdatesChips groups={GROUPS} active={active} cur={cur} total={N} onJump={jump} />
        <div className="ud">
          <UpdatesRail groups={GROUPS} active={active} cur={cur} onJump={jump} />
          <div className="ud-list">
            {GROUPS.map((g, gi) => {
              if (g.start >= shown) return null;
              const c = g.end - g.start + 1;
              return (
                <section key={g.k} className="ud-grp">
                  <div className="ud-gh" id={`ud-g-${gi}`}>
                    <h2>{g.head}</h2>
                    <span>
                      {c} update{c === 1 ? '' : 's'}
                    </span>
                  </div>
                  <ol className="ud-cards">
                    {updates.slice(g.start, Math.min(g.end + 1, shown)).map((u, j) => {
                      const i = g.start + j;
                      return (
                        <li
                          key={IDS[i]}
                          id={IDS[i]}
                          data-i={i}
                          className={`ud-card${i >= anim ? ' new' : ''}${hl === IDS[i] ? ' target' : ''}`}
                          style={{ '--k': i - anim } as CSSProperties}
                        >
                          <div className="ud-ch">
                            <time dateTime={u.date}>{longDate(u.date)}</time>
                          </div>
                          <button type="button" className="ud-lnk" aria-label="Copy link to this update" title="Copy link to this update" onClick={() => copy(i)}>
                            <LinkIcon size={16} aria-hidden="true" />
                          </button>
                          <h3>{u.title}</h3>
                          <ul>
                            {u.items.map((it) => (
                              <li key={it.lead}>
                                <strong>{it.lead}</strong> {it.text}
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    })}
                  </ol>
                </section>
              );
            })}
            <div ref={sentinel} id="ud-sentinel" />
            <div className="ud-after">
              {rest > 0 ? (
                <button type="button" className="pg-btn sec" onClick={() => grow(shown + BATCH)}>
                  Show older updates <small>· {rest} more</small>
                </button>
              ) : (
                <>
                  <p className="ud-end">That&apos;s every update, back to the first release on {first}.</p>
                  <button type="button" className="pg-btn sec" onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'instant' : 'smooth' })}>
                    Back to top
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={`ud-toast${toast ? ' on' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  );
}
