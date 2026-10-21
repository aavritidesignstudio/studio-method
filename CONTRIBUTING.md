# Contributing to Studio Method

Thanks for helping. Studio Method grows from real projects: the best contributions are a skill, rule or fix that
came out of shipping something.

## Ways to help
- **Report a problem**: a skill step that's wrong or out of date (console menus and store policies change), a
  rule that misfires, a broken script. Say which skill, what you expected and what happened.
- **Improve a skill**: clearer steps, a missing gotcha, an updated command. Keep the skill's `name` and trigger
  phrases.
- **Add a skill**: pick one from [IDEAS.md](IDEAS.md) or propose one in an issue first. Claude Code's `forge` skill
  does most of the work.
- **Add a pack** for another stack (for example Next.js, Flutter, iOS-first). Open an issue to agree the shape.

## What a good skill looks like
- `plugins/<pack>/skills/<name>/SKILL.md` with frontmatter `name` (kebab-case) and `description` (what it does plus
  "Use when …" trigger phrases), then numbered steps a fresh session can follow without any other context.
- Depth in `references/*.md`; mechanical steps in `scripts/` (referenced relative to the skill or via
  `${CLAUDE_PLUGIN_ROOT}`).
- About 150 lines or less in SKILL.md. Plain words. Each rule says **why**.
- Facts about consoles, stores, prices and policies are checked against the provider's current docs, with the date
  checked noted in the reference.

## Content rules
- **Project-neutral.** No secrets, API keys, emails, account or project ids, device serials, personal paths or real
  people. Real products may appear only as labelled examples ("Example (WowTodo)"); sample data uses fictional names.
- **Safe by default.** Skills ask before outward actions (push, deploy, publish, send, pay) and never print secret
  values.
- **No vendor lock-in by accident.** Name the default provider and say what would change for an alternative.

## Before you open a merge request
1. `claude plugin validate .` passes from the repo root.
2. The pack's version is bumped in **both** `plugins/<pack>/.claude-plugin/plugin.json` and its entry in
   `.claude-plugin/marketplace.json` (new skill = minor, fix = patch).
3. `README.md` (pack tables) and `CHANGELOG.md` are updated; the item is removed from `IDEAS.md` if it came from
   there.
4. One skill or one fix per merge request, with a short description of the real situation it came from.

**Never rename a plugin's `name`** — existing installs would break. Use `displayName` for the label.

## Code of conduct
Be kind, be specific, assume good intent. Critique the work, not the person.
