# Changelog

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
