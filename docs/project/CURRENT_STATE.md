# Current state — Studio Method
**Updated:** 2026-10-21 · **Version:** 0.1.0 · **Commit:** 409598d (+ docs commit)

## Summary
Studio Method · App + Site Kit is an open-source (MIT) Claude Code plugin marketplace that packages a proven way of
working plus the skills to build a React Native (Expo) app and its website and ship them. It was distilled from the
WowTodo project. Home: GitLab `aavritidesignstudio/studio-method` (primary), GitHub mirror of the same name.

## Working
- Marketplace `.claude-plugin/marketplace.json` with 4 packs, all passing `claude plugin validate .`, installed
  from GitLab on the owner's machine (user scope):
  - **studio-core** (12 skills + `product-lead` agent): studio-start, working-contract, playbook, catch-up,
    check-out, mockup-lab, product-pulse, harvest, forge, teach, optimize-repo, github-to-gitlab.
  - **studio-app**: device-qa, perf-pass, release-ritual, store-listing-kit.
  - **studio-site**: site-builder, site-updates.
  - **studio-services**: stack-guide, env-setup, email-setup.
- README (diagrams, install, FAQ), ADOPT.md (paste-in prompt), IDEAS.md (roadmap), CONTRIBUTING, CHANGELOG, LICENSE.
- Always-on cost of studio-core ≈ 2k tokens per session (skill descriptions); bodies load on use.

## Open / broken
- Console click paths in stack-guide, env-setup and email-setup were written from memory; verify against current
  docs on first use (each says so).
- The skills haven't been run end to end outside WowTodo yet (studio-start on a fresh folder, on another repo).
- Duplicate personal copies of 9 skills still in `~/.claude/skills` on the owner's PC (remove after a restart test).
- No hooks yet (e.g. the optimize-repo "due" reminder is described as optional setup).

## Next
Dog-food studio-start on another project; forge `seo`, `go-live`, `play-console-setup`, `payments-app`; verify
click paths; then 0.2.0.
