/**
 * Writes responsive WebP copies of the photos in public/images to public/images/responsive,
 * and the widths each one got to src/config/responsive-images.json (read by Photo.astro).
 * Copies are committed, so `npm run dev` has them; this only redoes a photo that changed.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const WIDTHS = [480, 800, 1200, 1600];
const QUALITY = 78;

const imagesDir = fileURLToPath(new URL('../public/images', import.meta.url));
const outDir = join(imagesDir, 'responsive');
const manifestPath = fileURLToPath(new URL('../src/config/responsive-images.json', import.meta.url));

function jpegs(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return path === outDir ? [] : jpegs(path);
    return entry.name.endsWith('.jpg') ? [path] : [];
  });
}

const manifest = {};
let written = 0;

for (const source of jpegs(imagesDir)) {
  const name = relative(imagesDir, source).replace(/\\/g, '/').replace(/\.jpg$/, '');
  const { width: sourceWidth } = await sharp(source).metadata();
  const widths = WIDTHS.filter((width) => width <= sourceWidth);
  manifest[`/images/${name}.jpg`] = widths;

  for (const width of widths) {
    const copy = join(outDir, `${name}-${width}.webp`);
    if (existsSync(copy) && statSync(copy).mtimeMs >= statSync(source).mtimeMs) continue;
    mkdirSync(dirname(copy), { recursive: true });
    await sharp(source).resize({ width }).webp({ quality: QUALITY }).toFile(copy);
    written++;
  }
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
const json = `${JSON.stringify(sorted, null, 2)}\n`;
if (!existsSync(manifestPath) || readFileSync(manifestPath, 'utf8') !== json) writeFileSync(manifestPath, json);

console.log(`Responsive images up to date (${written} written).`);
