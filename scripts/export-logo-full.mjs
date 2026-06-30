import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mediaDir = path.join(root, 'public', 'media');
const sourcePath = path.join(mediaDir, 'etemadmelal-logo.svg');

const source = fs.readFileSync(sourcePath, 'utf8');
const innerSvg = source
  .replace(/<\?xml[^?]*\?>\s*/i, '')
  .replace(/width="[^"]*"/, 'width="1024"')
  .replace(/height="[^"]*"/, 'height="1013"');

const fullSvg = `<?xml version="1.0" encoding="UTF-8"?>
${innerSvg.trim()}\n`;

const fullPath = path.join(mediaDir, 'etemadmelal-logo-full.svg');
fs.writeFileSync(fullPath, fullSvg);

const sizes = [512, 1024, 2048];
for (const size of sizes) {
  const resvg = new Resvg(fullSvg, {
    fitTo: { mode: 'width', value: size },
    background: 'transparent',
  });
  const png = resvg.render().asPng();
  const out = path.join(mediaDir, `etemadmelal-logo-${size}.png`);
  fs.writeFileSync(out, png);
  console.log(`Wrote ${path.relative(root, out)}`);
}

console.log(`Wrote ${path.relative(root, fullPath)}`);
