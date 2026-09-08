/**
 * Fails if this repo's API client has drifted from the other app's.
 *
 * The web and mobile apps each keep their own copy of src/api. A shared npm
 * package would be the textbook fix, but that means a fourth repository to
 * maintain for two consumers. This is the cheaper trade: keep the copies, and
 * make divergence loud instead of silent.
 *
 * It is not hypothetical — within days of the files being created the site had
 * grown two helpers the mobile app lacked.
 *
 * Skips quietly when the sibling checkout is absent, so CI does not fail on a
 * machine that only has one repo.
 *
 *   node scripts/check-api-sync.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const self = resolve(here, '../src/api/index.ts');
const siblings = [
  resolve(here, '../../vaultiva-mobile/src/api/index.ts'),
  resolve(here, '../../vaultiva-site/src/api/index.ts'),
].filter((p) => p !== self && existsSync(p));

if (siblings.length === 0) {
  console.log('check:api — sibling checkout not found, skipping.');
  process.exit(0);
}

/** Ignore the leading banner comment and line-ending differences. */
const normalise = (p) =>
  readFileSync(p, 'utf8')
    .replace(/^\/\*\*[\s\S]*?\*\/\s*/, '')
    .replace(/\r\n/g, '\n')
    .trim();

const mine = normalise(self);
let failed = false;

for (const other of siblings) {
  if (normalise(other) === mine) {
    console.log(`check:api — in sync with ${other}`);
    continue;
  }
  failed = true;
  console.error(`\ncheck:api — DRIFT against ${other}`);

  const a = mine.split('\n');
  const b = normalise(other).split('\n');
  const onlyMine = a.filter((l) => l.trim() && !b.includes(l)).slice(0, 8);
  const onlyOther = b.filter((l) => l.trim() && !a.includes(l)).slice(0, 8);
  if (onlyMine.length) console.error('  only here:\n' + onlyMine.map((l) => '    ' + l).join('\n'));
  if (onlyOther.length) console.error('  only there:\n' + onlyOther.map((l) => '    ' + l).join('\n'));
  console.error('\n  Copy the newer file over the older one, then re-run.');
}

process.exit(failed ? 1 : 0);
