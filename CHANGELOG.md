# Changelog

## 0.2.8 — 2026-10-29
- **studio-core 0.1.14 · working-contract:** hard rule 0, the main session never executes (plans, audits, reviews, monitors; helpers execute); loaded first in every session. Playbook rule "Main session orchestrates; helpers execute". New session-start hook (startup, resume, clear, compact) that reminds every session to load working-contract + playbook, and gives a light catch-up (handoff Stopped at / Next step + age, status Updated line) so a session that opens with a task still knows where things stand.

## 0.2.7 — 2026-10-28
- **studio-core 0.1.12 · playbook:** rule "Ship the client before the server requires a field".
- **studio-site 0.1.2 · site-builder:** anchor links land on the first click (no ScrollTrigger refresh mid-scroll, reserve late/animated heights, one re-land on near miss, headless check); must-have signup answers go in the form itself, required.

## 0.2.5 — 2026-10-25
- **studio-core 0.1.9 · playbook:** rules "Clickable things look clickable; presets switch off" and "Keep the screen in the URL".
- **studio-app 0.1.3 · device-qa:** section 10, phone-width QA of web panels with a mocked API and a simulated keyboard.
- **IDEAS:** `web-qa` (site).

## 0.2.4 — 2026-10-25
- **studio-core 0.1.8 · mockup-lab:** hard rule "the template shows the product as it looks today": examples teach structure only; compare the template with the newest agreed mockup before copying; on a UI change replace the template; old-UI mockups stay untouched as the record, never copied.

## 0.2.1 — 2026-10-22
- **studio-core 0.1.5:** rules "Run a plugin installed mid-session headless, with explicit tools", "When asked for a tool, show the tool", "Don't drive the owner's browser unasked"; forge: everything a plugin needs lives inside the plugin folder.

## 0.2.0 — 2026-10-22
- **studio-services 0.2.0 · new skill `email-system`** (from WowTodo, proven live): one shared sender, versioned templates
  edited in the admin panel (draft · test · publish · restore), replies on a Resend receiving subdomain that land in the
  panel and the team inbox, Svix-verified webhooks for delivery/bounce/complaint, suppression list, service vs update
  consent, one-click unsubscribe, an app "email me updates" switch, privacy lines, and the gotchas that cost time.
  `email-setup` points to it and names the right Zoho alias screen.
- **studio-core 0.1.4:** rules "Cloud secrets: paste in the dashboard, never through a Windows shell" and "Edit code
  files with the editor, not escaped shell scripts"; the keyboard rule covers web pages (`interactive-widget=resizes-content`).
- **studio-app 0.1.2:** device-qa covers web pages on the phone and Chrome's password-manager sheet.

## 0.1.2 — 2026-10-22
- **Harvest from WowTodo.** studio-core 0.1.3: new rule "one repo, several Vercel projects: each builds only for its
  own folder"; the wrong-project MCP rule now names the cause (a parent-folder `.mcp.json`) and the fix (a
  local-scope MCP entry pinned to the project). studio-services 0.1.1: Vercel monorepo setup + Root Directory picker
  workaround; env-setup naming hygiene (fold `NEW_*` names, never `SUPABASE_ACCESS_TOKEN` in `app/.env`) and why the
  cloud block stays default. studio-app 0.1.1: release-ritual checks `.env` points at the cloud before `eas update`;
  device-qa notes the Git Bash `/sdcard` path rewrite.

## 0.1.1 — 2026-10-21
- **studio-core 0.1.1 · studio-start is safe to run by accident.** A project that already has its status doc and
  handoff gets a choice (catch up · fill only the gaps · full re-read) instead of a full codebase read. When the
  current folder isn't a git repo but one sits inside it, it asks which folder is the project and never runs
  `git init` around an existing repo. An existing status doc is merged, never rewritten; memories are updated, not
  duplicated; the commit goes on `dev` or a branch, never directly on `main`.

## 0.1.0 — 2026-10-21
First public version, distilled from building WowTodo (Expo app on Google Play + Vite website on Vercel).

- **studio-core**: studio-start (new or existing project; existing repos are read in full and said back before
  anything changes), working-contract, playbook (hard rules + glossary), catch-up, check-out, mockup-lab,
  product-pulse with the product-lead agent, harvest, forge, teach, optimize-repo, github-to-gitlab.
- **studio-app**: device-qa, perf-pass, release-ritual, store-listing-kit.
- **studio-site**: site-builder, site-updates.
- **studio-services**: stack-guide, env-setup, email-setup.
- Roadmap of next skills in `IDEAS.md`.
