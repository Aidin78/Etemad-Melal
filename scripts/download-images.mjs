/**
 * One-time download of production images from Unsplash (free license).
 * Run: node scripts/download-images.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const publicDir = fileURLToPath(new URL('../public', import.meta.url));
const imagesDir = join(publicDir, 'images');
const articlesDir = join(imagesDir, 'articles');

const size = 'w=1600&h=900&fit=crop&auto=format&q=85';

const site = {
  hero: `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?${size}`,
  features: `https://images.unsplash.com/photo-1551288049-bebda4e38f71?${size}`,
  about: `https://images.unsplash.com/photo-1497366216548-37526070297c?${size}`,
  trust: `https://images.unsplash.com/photo-1521791136064-7986c2920216?${size}`,
};

const articles = [
  'photo-1460925895917-afdab827c52f',
  'photo-1579621970795-87b1b1c4c1f8',
  'photo-1611974789855-9c2a0a7236a3',
  'photo-1642790106117-e829e14aa795',
  'photo-1590283609335-abffb0e94467',
  'photo-1579532537598-459ecd6f0ccb',
  'photo-1553729459-efe089ef7959',
  'photo-1563986768609-322da13575f3',
  'photo-1454165804606-c3d57bc86b40',
  'photo-1507679799987-c73779587ccf',
  'photo-1556760542-740c274e223f',
  'photo-1551836022-deb49876c854',
];

async function download(url, dest) {
  if (existsSync(dest)) {
    console.log(`skip (exists): ${dest}`);
    return;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`saved: ${dest}`);
}

await mkdir(articlesDir, { recursive: true });

for (const [name, url] of Object.entries(site)) {
  await download(url, join(imagesDir, `${name}.jpg`));
}

for (let i = 0; i < articles.length; i++) {
  const id = articles[i];
  const url = `https://images.unsplash.com/${id}?${size}`;
  const file = `article-${String(i + 1).padStart(2, '0')}.jpg`;
  await download(url, join(articlesDir, file));
}

console.log('Done.');
