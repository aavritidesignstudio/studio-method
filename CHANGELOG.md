# Changelog

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
