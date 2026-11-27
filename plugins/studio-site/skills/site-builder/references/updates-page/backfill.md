# Backfilling the updates history

Do this once, when a product gets its updates page. Afterwards each release adds one entry (`site-updates`).

1. **Date by the day it reached production.** For each change, find the earliest commit on
   `git rev-list --first-parent <prod-branch>` that contains it, and use that commit's **committer** date (not the
   author date). A commit merged only into `dev` ships on the next promotion, so it is dated then.
2. **Check what is switched on.** Read the production feature flags and leave out anything off for normal users.
3. **Ask the owner for the first public (preview) release day.** The oldest entry is that day.
4. **Major milestones only.** Group small commits into one user-visible change. Every bullet must be true on
   production today (drop anything later removed or replaced).
5. **Write like the product talks to a friend.** Plain "you" tone. Each item: a bold lead ending in a period, then
   one everyday sentence (`lead` / `text`). 2 to 4 word title, 3 to 6 items. No internal names (components, ids,
   libraries, flags), nothing the project bans in copy.
6. **Mirror it.** Put every entry in `docs/release/WHATS_NEW.md` too, and add a `docs/release/RELEASE_LOG.md` row
   per promotion to production (technical: date, what, commit).
7. **Check.** `npm test` (dates, order, ids), build, then open `/updates` and `/updates#<an old id>`.
