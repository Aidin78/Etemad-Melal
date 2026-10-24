import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const publicDir = fileURLToPath(new URL('../public', import.meta.url));

const required = [
  'images/hero.jpg',
  'images/features.jpg',
  'images/about.jpg',
  'images/trust.jpg',
  // Fallback cover for articles without an `image` (siteImages.articleDefault)
  'images/articles/article-01.jpg',
];

const fonts = [
  'font/IRANSansX-Regular.woff',
  'font/IRANSansX-Bold.woff',
  'font/IRANSansXV.woff',
];

const missing = required.filter((p) => !existsSync(join(publicDir, p)));
const missingFonts = fonts.filter((p) => !existsSync(join(publicDir, p)));

if (missing.length > 0) {
  console.error('Missing required images:');
  for (const p of missing) console.error(`  - public/${p}`);
  console.error('\nAdd your images to public/ or run: node scripts/download-images.mjs');
  process.exit(1);
}

if (missingFonts.length > 0) {
  console.warn('Optional fonts missing (site falls back to Tahoma):');
  for (const p of missingFonts) console.warn(`  - public/${p}`);
}

console.log('Asset check passed.');
