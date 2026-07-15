import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const dir = dirname(fileURLToPath(import.meta.url));
const stylesDir = join(dir, '../src/styles');
const lines = readFileSync(join(stylesDir, 'global.css'), 'utf8').split(/\r?\n/);

const slices = [
  ['tokens.css', 2, 141],
  ['base.css', 143, 168],
  ['utilities.css', 170, 336],
  ['components.css', 337, 652],
  ['sections.css', 653, lines.length - 1],
];

for (const [file, start, end] of slices) {
  writeFileSync(join(stylesDir, file), lines.slice(start, end + 1).join('\n') + '\n');
}

writeFileSync(
  join(stylesDir, 'global.css'),
  `@import 'tailwindcss';\n@import './tokens.css';\n@import './base.css';\n@import './utilities.css';\n@import './components.css';\n@import './sections.css';\n`,
);

console.log('Split global.css into', slices.map(([f]) => f).join(', '));
