import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const appRoot = process.cwd();
const decisionsPath = path.join(appRoot, 'content', 'distribution', 'draft-decisions.json');
const allowedStatuses = new Set(['keep', 'maybe', 'remove']);
const args = process.argv.slice(2).filter((arg) => arg !== '--');
const [command, slug, status, ...reasonParts] = args;

if (command === 'list') {
  const decisions = readDecisions();
  console.log(JSON.stringify(decisions, null, 2));
  process.exit(0);
}

if (command !== 'set' || !slug || !status || !allowedStatuses.has(status)) {
  console.error([
    'Usage:',
    '  pnpm draft:decision -- list',
    '  pnpm draft:decision -- set <slug> <keep|maybe|remove> "<reason>"',
    '',
    'Examples:',
    '  pnpm draft:decision -- set battle-bots remove "Not aligned with launch narrative"',
    '  pnpm draft:decision -- set the-shore keep "Potential Golden Hammer collection piece"',
  ].join('\n'));
  process.exit(1);
}

const decisions = readDecisions();
decisions.updatedAt = new Date().toISOString();
decisions.decisions[slug] = {
  status,
  reason: reasonParts.join(' ').trim(),
  decidedAt: decisions.updatedAt,
  decidedBy: 'david-or-agent-cli',
};

fs.mkdirSync(path.dirname(decisionsPath), { recursive: true });
fs.writeFileSync(decisionsPath, `${JSON.stringify(decisions, null, 2)}\n`);

const regenerate = spawnSync('pnpm', ['draft:image-review'], {
  cwd: appRoot,
  stdio: 'inherit',
});

if (regenerate.status !== 0) {
  process.exit(regenerate.status ?? 1);
}

console.log(JSON.stringify({
  ok: true,
  slug,
  status,
  decisionsPath: path.relative(appRoot, decisionsPath),
  regenerated: 'content/distribution/draft-image-review.json',
}, null, 2));

function readDecisions() {
  if (!fs.existsSync(decisionsPath)) {
    return {
      schemaVersion: 'draft-decisions-v1',
      updatedAt: new Date().toISOString(),
      decisions: {},
    };
  }

  return JSON.parse(fs.readFileSync(decisionsPath, 'utf8'));
}
