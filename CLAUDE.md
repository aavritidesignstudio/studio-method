# Studio Method repo

This is the source of **Studio Method · App + Site Kit**, a Claude Code plugin marketplace (see README.md). Work on
it the way it tells other projects to work.

## Studio Method
Every session: load `working-contract` + `playbook` (studio-core). Docs: `docs/project/{CURRENT_STATE,HANDOFF,
WORKING_CONTRACT,DECISIONS}.md`. Words: "catch up", "check out", "mockup", "teach", "harvest", "forge",
"product pulse" (see the playbook glossary).

## Editing the method
- Skills: `plugins/<pack>/skills/<skill>/SKILL.md` (+ `references/`, `scripts/`); agents: `plugins/<pack>/agents/`.
- After any change: bump the pack version in its `plugin.json` and in `.claude-plugin/marketplace.json`, run
  `claude plugin validate .`, update `CHANGELOG.md` (and README tables / IDEAS.md when skills are added).
- Public repo: keep everything project-neutral (overrides in `docs/project/WORKING_CONTRACT.md`).
- To test locally after edits: `/plugin marketplace update studio-method`, then update the packs and restart.
