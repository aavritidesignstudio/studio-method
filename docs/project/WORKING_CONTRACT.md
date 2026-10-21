# Working contract — Studio Method repo

This repo follows its own method: the `working-contract` and `playbook` skills (studio-core) apply in full.
Short version:
- Main session plans, reviews and decides; helper agents execute in the background (≤2 in parallel below 75 %
  usage), commit often, keep ≤15-line notes in `docs/agent-notes/`, never edit the status doc.
- `docs/project/CURRENT_STATE.md` is updated in every commit; `HANDOFF.md` at check-out or ~90 % usage.
- Short, plain output. Ask before pushing; batch pushes.

## Project overrides
- **Content must stay project-neutral and public-safe**: no secrets, emails (other than example.com), account or
  project ids, device serials, personal paths or real people. Real products only as "Example (<name>)".
- Every change to a pack bumps its version in **both** `plugins/<pack>/.claude-plugin/plugin.json` and
  `.claude-plugin/marketplace.json`, passes `claude plugin validate .`, and gets a CHANGELOG line.
- New skills come through `forge`; lessons from other projects through `harvest`.
- No AI attribution lines in commits.
