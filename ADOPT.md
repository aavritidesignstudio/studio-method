# Start a project on Studio Method

Paste this into the first Claude Code session of a project (new folder or existing repo):

---

This project follows **Studio Method · App + Site Kit**. Please:

1. Check the Studio Method plugins are installed (`studio-core` at least; `studio-app`, `studio-site`,
   `studio-services` as this project needs) and that `ponytail` is installed. If anything is missing, tell me the
   exact `/plugin` commands and wait.
2. Run the `studio-start` skill. If this folder is empty, ask me what we're building (name, app and/or website,
   AI or not, which services, languages) and scaffold it. If it already has code, first read the whole codebase
   and tell me what you understood (what it is, how it's built, each feature and its state, risks, open
   questions). After I confirm or correct it, build the project's memory from it: the status doc, a project map
   and your own memory notes. Keep every existing doc; only add what's missing, plus the Studio Method section in
   CLAUDE.md.
3. From then on, every session: follow `working-contract` and `playbook`. Plan and review in the main session,
   hand execution to helpers, keep `docs/project/CURRENT_STATE.md` current, write `HANDOFF.md` when I say
   "check out", and offer `harvest` at the end.
4. Before any new screen or website section, ask whether I want a `mockup` first.
5. Talk to me in short, plain sentences. Ask before pushing, deploying or anything outward-facing.

---

Shorter, once the plugins are installed: **"studio start"**.
