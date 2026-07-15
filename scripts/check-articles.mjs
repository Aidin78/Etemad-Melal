import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const articlesDir = fileURLToPath(new URL('../src/content/articles', import.meta.url));

function slugs(locale) {
  const dir = join(articlesDir, locale);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
    .sort();
}

const rootMd = readdirSync(articlesDir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => f.replace(/\.md$/, ''));

if (rootMd.length > 0) {
  console.error('Remove legacy article files from src/content/articles/ root:');
  console.error('  ', rootMd.join(', '));
  console.error('Articles must live only under fa/ and en/.');
  process.exit(1);
}

const fa = slugs('fa');
const en = slugs('en');
const missingInEn = fa.filter((s) => !en.includes(s));
const missingInFa = en.filter((s) => !fa.includes(s));

if (missingInEn.length > 0 || missingInFa.length > 0) {
  console.error('Article slug mismatch between fa/ and en/:');
  if (missingInEn.length) console.error('  Missing in en/:', missingInEn.join(', '));
  if (missingInFa.length) console.error('  Missing in fa/:', missingInFa.join(', '));
  process.exit(1);
}

console.log(`Article locales in sync (${fa.length} slugs each).`);
