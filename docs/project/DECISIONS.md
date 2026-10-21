# Decisions

| Date | Decision | Why |
|---|---|---|
| 2026-10-21 | Package the WowTodo way of working + skills as a Claude Code **plugin marketplace** | Versioned, installable in any project with `/plugin`, updatable with one command |
| 2026-10-21 | Four packs: **studio-core**, **studio-app**, **studio-site**, **studio-services** | Install only what a project needs; stack-specific parts stay separate |
| 2026-10-21 | Name **"Studio Method · App + Site Kit"** | Says what it is: a method, for an app plus its website |
| 2026-10-21 | Plugin `name`s are permanent; labels via `displayName` | Renaming breaks existing installs |
| 2026-10-21 | `studio-start` adopts existing repos **understanding-first**: read all, say back, owner confirms, then status + project map + memory | Owner request; nothing changes before the model's understanding is checked |
| 2026-10-21 | `studio-start` checks for **ponytail** and recommends it by default | Owner request: minimal code by default |
| 2026-10-21 | `forge` + `harvest` keep the method growing; only the owner pushes | Owner wants to keep modifying it; users who install can't push |
| 2026-10-21 | `product-lead` agent + `product-pulse` skill: ≤3 grounded suggestions, after releases and at check-out, logged, declined ideas never repeated | Owner wants a senior PM's view that is practical and never intrusive |
| 2026-10-21 | Website updates are their own skill (`site-updates`), called by release-ritual and on demand | Owner wants control over how it evolves |
| 2026-10-21 | **Open source, MIT**; GitLab primary, public GitHub mirror; commit email aavritidesignstudio@gmail.com is fine public | Owner wants others to fork and use it |
| 2026-10-21 | Public history restarted as one commit before the first push | A real tester's name had been in an example; history must be clean |
