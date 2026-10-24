import { spawnSync } from 'node:child_process';
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

const missing = required.filter((p) => !existsSync(join(publicDir, p)));

if (missing.length === 0) {
  console.log('Asset check passed.');
  process.exit(0);
}

console.log(`Missing ${missing.length} image(s) — downloading defaults...`);
const result = spawnSync(process.execPath, ['scripts/download-images.mjs'], {
  stdio: 'inherit',
  cwd: fileURLToPath(new URL('..', import.meta.url)),
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

const stillMissing = required.filter((p) => !existsSync(join(publicDir, p)));
if (stillMissing.length > 0) {
  console.error('Missing required images after download:');
  for (const p of stillMissing) console.error(`  - public/${p}`);
  process.exit(1);
}

console.log('Asset check passed.');
