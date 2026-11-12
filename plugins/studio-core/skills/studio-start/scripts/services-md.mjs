// Renders docs/project/services.json -> docs/project/SERVICES.md. `--check` exits 1 if SERVICES.md is stale.
// Run from the repo root: node scripts/services-md.mjs [--check]
import {readFileSync, writeFileSync, existsSync} from 'node:fs';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const JSON_PATH = 'docs/project/services.json';
const MD_PATH = 'docs/project/SERVICES.md';
const cell = (s) => String(s ?? '').replace(/\|/g, '\|').replace(/\n/g, ' ');
const confirm = (a) => (a?.length ? ` [owner to confirm: ${a.join('; ')}]` : '');
const row = (cols) => `| ${cols.map(cell).join(' | ')} |`;
const table = (head, rows) => [row(head), row(head.map(() => '---')), ...rows.map(row)].join('\n');

export function render(d) {
  const ids = new Set(d.services.map((s) => s.id));
  for (const a of d.accounts) for (const id of a.services) assert(ids.has(id), `account ${a.name}: unknown service ${id}`);
  const accounts = d.accounts.map((a) => [a.name, a.login, a.services.join(', '), (a.notes ?? '') + confirm(a.toConfirm)]);
  const services = d.services.map((s) => [
    s.name, s.powers, [s.account, s.login && `(${s.login})`].filter(Boolean).join(' '), s.plan,
    (s.secrets ?? []).join('; '), s.dashboard,
    [s.notes, s.checkBy && `Check by ${s.checkBy}.`].filter(Boolean).join(' ') + confirm(s.toConfirm),
  ]);
  return [
    'Generated from services.json: edit that file, then run `node scripts/services-md.mjs`.', '',
    `# ${d.project} services and accounts`, '',
    `Last reviewed: ${d.updated}. ${d.intro}`, '',
    '## Overview', '', d.overview, '',
    '## Accounts', '', table(['Account', 'Login method', 'Services', 'Notes'], accounts), '',
    '## Services', '', table(['Service', 'What it powers', 'Account (login)', 'Plan', 'Secret names (where set)', 'Dashboard', 'Notes'], services), '',
    '## Keeping this current', '', ...(d.rules ?? []).map((x) => `- ${x}`), '',
  ].join('\n');
}

// Self-check on a tiny fixture: header, pipe escaping, confirm mark, check-by date, unknown-id guard.
function selfTest() {
  const base = {project: 'P', updated: '2000-01-01', intro: 'i', overview: 'o', rules: [],
    accounts: [{name: 'a', login: 'g', services: ['s'], notes: 'n'}],
    services: [{id: 's', name: 'Svc|x', powers: 'p', account: 'a', plan: 'Free', secrets: ['K'], dashboard: '', notes: '', checkBy: '2030-01-01', toConfirm: ['q']}]};
  const md = render(base);
  assert(md.startsWith('Generated from services.json') && md.includes('Svc\|x') && md.includes('[owner to confirm: q]') && md.includes('Check by 2030-01-01'));
  assert.throws(() => render({...base, accounts: [{name: 'a', login: '', services: ['nope']}]}));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  selfTest();
  const out = render(JSON.parse(readFileSync(JSON_PATH, 'utf8')));
  if (process.argv.includes('--check')) {
    // Line endings ignored so a CRLF checkout does not fail the check.
    const cur = existsSync(MD_PATH) ? readFileSync(MD_PATH, 'utf8').replace(/\r\n/g, '\n') : '';
    if (cur !== out) { console.error(`${MD_PATH} is stale: run \`node scripts/services-md.mjs\` and commit it.`); process.exit(1); }
  } else writeFileSync(MD_PATH, out);
}
