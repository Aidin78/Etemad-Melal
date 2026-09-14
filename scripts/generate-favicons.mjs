import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const sourcePath = path.join(publicDir, 'favicon.svg');
const svg = fs.readFileSync(sourcePath, 'utf8');

const targets = [
  { file: 'favicon-16x16.png', size: 16, background: 'rgba(0,0,0,0)' },
  { file: 'favicon-32x32.png', size: 32, background: 'rgba(0,0,0,0)' },
  // Apple doesn't composite transparency, so the touch icon gets the brand's dark background.
  { file: 'apple-touch-icon.png', size: 180, background: '#12110f' },
];

for (const { file, size, background } of targets) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
    background,
  });
  const png = resvg.render().asPng();
  const out = path.join(publicDir, file);
  fs.writeFileSync(out, png);
  console.log(`Wrote ${path.relative(root, out)}`);
}
