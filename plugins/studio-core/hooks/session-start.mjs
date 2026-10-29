// Studio Method session-start reminder. Prints plain text (added as context). No network; never fails.
try {
  console.log(`Studio Method rules for this session:
- Load the working-contract and playbook skills now, before any other tool call.
- The main session plans, audits, reviews and monitors; all execution goes to Sonnet helpers (background).
- Before every action ask: "Is this execution? Then brief a helper."
- Update the status doc in every commit.`);
} catch {}
process.exit(0);
