import { missingFiles, requiredImages } from './required-assets.mjs';

const fonts = ['font/morabba/Morabba-Regular.woff2', 'font/morabba/Morabba-Bold.woff2'];

const missing = missingFiles(requiredImages);
const missingFonts = missingFiles(fonts);

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
