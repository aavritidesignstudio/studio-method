# Updates page: reference implementation

**Rule (owner):** every project's `/updates` page is a 1:1 port of this reference (originally WowTodo's live page
at wowtodo.app/updates). Copy it, then change only the design system: colours, fonts and radii, through the CSS
variables at the top of `app/updates/updates.css`. Do not redesign the layout or the behaviour.

Files (Next.js App Router; project-neutral): `app/updates/{page.tsx,updates.css}`,
`components/updates/{UpdatesTimeline,UpdatesNav}.tsx`, `lib/updates/{updates.ts,updates.shared.ts,updates.test.ts}`.
Fill the data with `backfill.md`; add later entries with the `site-updates` skill (`references/updates-data.md`).

## What the page does
- **Desktop (860px+):** sticky left rail: a track, a fill up to the current date, a node per date, a pip per update.
- **Phone:** sticky chip row (a chip per date) with a thin progress line; the active chip is kept centred. The row
  fades out with a solid gradient, never `backdrop-filter` (playbook: no backdrop blur).
- **Intro:** the page starts at the end of the first batch and glides to the top, the count ("N updates since ...")
  counting up and the rail drawing in. Any wheel, touch, click or key cancels it. Skipped with a `#hash` or reduced motion.
- **Batches of 8:** an IntersectionObserver sentinel adds the next 8 near the end. "Show older updates · N more"
  does the same on click. At the end: an end line plus "Back to top".
- **Deep links:** each card has an id (date + title) and a copy-link button with a toast ("Link copied"). Opening
  `/updates#id` loads up to it, lands, highlights it, and lands again as each web font arrives (fonts re-wrap the
  cards above), unless the reader has already scrolled. A `hashchange` in the same tab does the same, smoothly.
- **Header:** sticky and fully solid (a translucent one lets scrolling text show through). Logo on the left, a quiet
  "← Back" text link on the right that goes to the home page, not `history.back()`, so a shared link still has
  somewhere to go. `--ud-head` is set to the header's real height; the chips and rail stick below it.

## Tokens (the only thing you change)
`--bg --fg --card --border --muted-fg --primary --primary-fg --ring` colours; `--f-display` headings and the
count, `--f-body` text; `--r-card --r-pill` radii; `--ud-head` header height in px. Point the fonts at the
project's own (`var(--font-serif), Georgia, serif`). Light and dark: redefine the tokens under the project's theme
selector. Two extras, `--tex` (ring texture) and `--shadow`, follow the theme too.

## Port to Next App Router
1. Copy the files to the same paths; keep the `@/` alias. `npm i lucide-react motion` (skip if present).
2. `page.tsx` is a server page with `metadata`; the timeline is the only client component. Every entry is
   server-rendered (SEO, no-JS); batching starts after mount, so do not "optimise" it into a lazy list.
3. Fill the SLOTS: `PRODUCT` in `updates.ts`, the logo in `page.tsx`, the footer. Change the Back target only if home is not `/`.
4. The intro uses `animate` from `motion`. Without motion, GSAP's `gsap.to` on a `{y}` proxy and a `{n}` counter does
   the same (the Vite original does this).
5. CMS catch-all `[slug]` route? Reserve `updates` in its reserved-slug list, even though a static route wins.
6. Add the page to the sitemap and a "What's new" link in the nav or footer. Run `npm test` (the vitest file checks
   dates, unique ids, item counts and grouping).

## Port to Vite (React + react-router)
Same components, with `next/link` replaced by `Link` from react-router (`to="/"`), `metadata` replaced by the
project's head or prerender mechanism (title, description, canonical, OG), and the `.css` imported in the page.
Keep entries in the prerendered HTML. The original loads GSAP lazily (`loadGsap()` in `src/lib/gsap.ts`) for the intro;
`motion` works too.

## Apps vs web
A web-only product leaves `version` and `needs` out. For an app (WowTodo), each entry carries exactly one:
`version` for a store build ("New app version, update from the store"), `needs` for an over-the-air update
("Arrives on its own if you have version X or newer"). WowTodo shows this as a small notice on the card and an
`UpdateNotice` that compares the visitor's installed version with the entry. Neither is in this template's UI; add
the notice only when the product is an app.

## Gotchas paid for once
- **Oldstyle figures.** Playfair-style display fonts default to oldstyle digits, so "12" in the count looks like
  letters. Keep `font-variant-numeric: lining-nums tabular-nums` on the count (`.ud-count b`).
- **Translucent sticky header.** Text shows through it. Make it a solid `--bg`.
- **Verify by content.** After a deploy, fetch the final URL (the apex may 308 to www; use `curl -L`) and grep the
  page for the newest entry's title. A status code proves nothing.
- **Static route vs CMS `[slug]`.** The static route wins, but reserve the slug anyway so the CMS cannot create a clash.
- **Stale chip row.** Keep the chip fade a solid gradient; blur makes the cards behind look smeared on phones.
- **Header height drift.** Change the header's padding or button size and `--ud-head` goes stale; the chips then
  overlap or leave a gap. Re-measure.
