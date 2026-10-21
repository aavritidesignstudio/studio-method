# Handoff — 2026-10-21 (session 1, created from the WowTodo session that built the method)

**Owner's test keyword for this catch-up: Honeymoon Travels.** If you're reading this in a fresh session in this
repo, say it back so the owner knows the context carried over.

**Stopped at:** Studio Method 0.1.0 is built, pushed to GitLab (`origin`, branch `main`, commit `409598d`) and
installed in Claude Code at user scope (all four packs, from the GitLab URL). The owner is making the GitLab
project public and setting up the public GitHub mirror `aavritidesignstudio/studio-method` (push mirror from
GitLab with a fine-grained token).

**How we got here (the conversation, short):**
1. While working on WowTodo (Expo app + Vite website), the owner asked to capture everything that worked — the
   working contract, status/handoff docs, catch-up/check-out, helpers, mockup-lab, store-listing-kit and all the
   lessons — in one portable kit for any project, new or existing, for the same stack (React Native + website +
   Supabase, Cloudflare, Vercel, Resend).
2. Shape agreed: a Claude Code **plugin marketplace** with four packs (core, app, site, services); name
   **"Studio Method · App + Site Kit"**; private GitLab first, then the owner chose to **open-source it (MIT)**.
3. Owner additions during the build, all done:
   - `studio-start` must offer from-scratch (asks name, app/site/both, AI or not, services) **or** adopt an
     existing repo, and check that **ponytail** is installed (recommend it if missing).
   - For existing repos, the first job is to **read the whole codebase, say back what it understood, and after
     the owner confirms build the status doc, a project map and its own memory**.
   - The owner must be able to keep changing the method → `forge` (build/improve skills) + `harvest` (lessons
     from any project's session, owner approves each).
   - A senior **product manager** that watches the product and suggests, rarely and practically, how to extend
     what just shipped → `product-lead` agent + `product-pulse` skill (≤3 grounded ideas, after releases and at
     check-out, declined ideas logged and never repeated).
   - Website updates after every deploy as **their own skill** for control → `site-updates` (release-ritual hands
     over to it; also callable on demand).
   - A roadmap of skills for the whole journey (payments in-app and web, SEO, go-live, Play Console setup, legal
     pages, analytics, …) → `IDEAS.md`.
   - A detailed developer-facing README with diagrams, install steps and FAQ, plus LICENSE, CONTRIBUTING,
     CHANGELOG.
4. Privacy pass before going public: a real tester's name in a mockup example was replaced with a fictional one
   and the local history was restarted as one clean commit before the first push.

**In flight:** nothing in this repo. (In WowTodo: branch `perf/speak-card-instant` waits for the owner's phone
test.)

**Owner to-do:**
- GitLab: Settings → General → Visibility → Public; add description + topics.
- GitHub: create the empty public repo, fine-grained token (Contents: read and write), GitLab → Settings →
  Repository → Mirroring repositories (Push). Add the About text and topics on GitHub.
- Restart Claude Code, try "catch up" / "studio start" once, then say "remove the old copies" so the duplicate
  personal skills in `~/.claude/skills` are deleted (9 folders: catch-up, check-out, mockup-lab, store-listing-kit,
  teach, working-contract, optimize-repo, email-setup, github-to-gitlab).

**Next step (pick with the owner):**
1. Dog-food: run `studio start` on another existing project and fix what feels wrong.
2. Forge the next skills from `IDEAS.md` — likely `seo`, `go-live`, `play-console-setup`, `payments-app`.
3. Check the console click paths in `stack-guide` / `env-setup` / `email-setup` against current docs (they were
   written from memory).
4. Optional: hooks (session-start reminders), a web-only variant of studio-start.
