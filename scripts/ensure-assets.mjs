import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { missingFiles, requiredImages } from './required-assets.mjs';

const missing = missingFiles(requiredImages);

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

const stillMissing = missingFiles(requiredImages);
if (stillMissing.length > 0) {
  console.error('Missing required images after download:');
  for (const p of stillMissing) console.error(`  - public/${p}`);
  process.exit(1);
}

console.log('Asset check passed.');
