// Studio Method session-start: rules reminder + light catch-up (handoff + status). Sync, no network, never fails.
import { readFileSync, statSync, readdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const out = [
  "Studio Method rules for this session:",
  "- Load the working-contract and playbook skills now, before any other tool call.",
  "- The main session plans, audits, reviews and monitors; all execution goes to Sonnet helpers (background).",
  '- Before every action ask: "Is this execution? Then brief a helper." Update the status doc in every commit.',
];
const cut = (s, n = 200) => (s.length > n ? s.slice(0, n - 1) + "…" : s);
const clean = (s) => s.replace(/\*\*/g, "").replace(/\s+/g, " ").trim();

try {
  const bases = [process.cwd()];
  try {
    const top = execFileSync("git", ["rev-parse", "--show-toplevel"], { timeout: 1500, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
    if (top && !bases.includes(top)) bases.push(top);
  } catch {}
  const dirs = [];
  for (const b of bases) {
    for (const d of [join(b, "docs"), join(b, "docs", "project"), b]) dirs.push(d);
    try {
      for (const e of readdirSync(b, { withFileTypes: true }))
        if (e.isDirectory() && !e.name.startsWith(".") && e.name !== "node_modules")
          dirs.push(join(b, e.name, "docs"), join(b, e.name, "docs", "project"));
    } catch {}
  }
  const find = (names) => {
    for (const d of dirs) for (const n of names) { const p = join(d, n); if (existsSync(p)) return p; }
  };
  const field = (text, label) => {
    const lines = text.split(/\r?\n/);
    const i = lines.findIndex((l) => l.includes(`**${label}:**`));
    if (i < 0) return "";
    let v = clean(lines[i].split(`**${label}:**`)[1] || "");
    for (let j = i + 1; !v && j < lines.length && j < i + 4; j++) v = clean(lines[j]);
    return v.startsWith("<") ? "" : v;
  };

  const lines = [];
  const h = find(["HANDOFF.md"]);
  if (h) {
    const t = readFileSync(h, "utf8");
    const stop = field(t, "Stopped at"), next = field(t, "Next step");
    if (stop || next) {
      const age = Math.floor((Date.now() - statSync(h).mtimeMs) / 86400000);
      lines.push(`Handoff ${h} (${age} days old)`);
      if (stop) lines.push(`  Stopped at: ${cut(stop)}`);
      if (next) lines.push(`  Next step: ${cut(next)}`);
    }
  }
  const s = find(["PROJECT_STATUS.md", "CURRENT_STATE.md", "STATUS.md"]);
  if (s) {
    const l = readFileSync(s, "utf8").split(/\r?\n/).find((x) => /\*\*(Last updated|Updated):\*\*/.test(x));
    lines.push(`Status ${s}${l ? ": " + cut(clean(l)) : ""}`);
  }
  if (lines.length)
    out.push("Where the project was left:", ...lines,
      'If the owner starts with a task instead of "catch up", read these quietly, mention anything that matters in one line, then do the task.');
} catch {}
console.log(out.join("\n"));
process.exit(0);
