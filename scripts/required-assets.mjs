import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

export const publicDir = fileURLToPath(new URL('../public', import.meta.url));

export const requiredImages = [
  'images/hero.jpg',
  'images/features.jpg',
  'images/about.jpg',
  // Fallback cover for articles without an `image` (siteImages.articleDefault)
  'images/articles/article-01.jpg',
];

export const missingFiles = (paths) => paths.filter((p) => !existsSync(join(publicDir, p)));
