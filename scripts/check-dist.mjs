/**
 * Checks the built pages for what `astro check` can't see: every internal link and asset
 * resolves, anchors exist, tags are well formed, and <head> keeps the shape the host relies on.
 * Run after `npm run build`.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const distDir = process.argv[2] ?? fileURLToPath(new URL('../dist', import.meta.url));
const origin = 'https://etemadmelal.com';

if (!existsSync(distDir)) {
  console.error(`No build found at ${distDir} — run npm run build first.`);
  process.exit(1);
}

const pages = readdirSync(distDir, { recursive: true, encoding: 'utf8' })
  .filter((file) => file.endsWith('.html'))
  .map((file) => ({ url: `/${file.replace(/\\/g, '/').replace(/(index)?\.html$/, '').replace(/\/$/, '')}`, file: join(distDir, file) }));

const TAG = /<([a-z][\w-]*)((?:\s+[^\s=>/]+(?:=(?:"[^"]*"|'[^']*'|[^\s>]*))?)*)\s*\/?>/gi;
const ATTR = /([^\s=]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]*)))?/g;

const parseTags = (html) =>
  [...html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, (block) => block.slice(0, block.indexOf('>') + 1)).matchAll(TAG)].map(([, name, rawAttrs]) => ({
    name: name.toLowerCase(),
    attrs: [...rawAttrs.matchAll(ATTR)].map(([, key, a, b, c]) => [key.toLowerCase(), a ?? b ?? c ?? '']),
  }));

/** Same-site path of a URL, or null when it points elsewhere */
function internalPath(value) {
  if (/^(mailto:|tel:|data:|#)/.test(value)) return null;
  if (value.startsWith('//')) return null;
  if (/^https?:/.test(value) && !value.startsWith(origin)) return null;
  return value.replace(origin, '') || '/';
}

const resolves = (path) =>
  path === '/' || [path, `${path}/index.html`, `${path}.html`].some((p) => existsSync(join(distDir, p)));

const idsByPage = new Map();
const parsed = pages.map((page) => {
  const html = readFileSync(page.file, 'utf8');
  const tags = parseTags(html);
  idsByPage.set(page.url || '/', new Set(tags.flatMap((tag) => tag.attrs.filter(([k]) => k === 'id').map(([, v]) => v))));
  return { ...page, html, tags };
});

const problems = [];

for (const { url, file, html, tags } of parsed) {
  const page = url || '/';
  const report = (message) => problems.push(`${relative(distDir, file)}: ${message}`);

  const seenIds = new Set();
  for (const { name, attrs } of tags) {
    const keys = attrs.map(([key]) => key);
    const repeated = keys.find((key, i) => keys.indexOf(key) !== i);
    // The HTML parser keeps the first value and silently drops the rest
    if (repeated) report(`<${name}> repeats the attribute "${repeated}"`);

    const get = (key) => attrs.find(([k]) => k === key)?.[1];
    const id = get('id');
    if (id && seenIds.has(id)) report(`duplicate id "${id}"`);
    if (id) seenIds.add(id);

    const urls = [get('href'), get('src'), ...(get('srcset') ?? '').split(',').map((s) => s.trim().split(/\s+/)[0])];
    for (const value of urls.filter(Boolean)) {
      if (name === 'link' && get('rel') === 'canonical') continue;
      if (value.startsWith('#')) {
        if (value.length > 1 && !seenIds.has(value.slice(1)) && !idsByPage.get(page)?.has(value.slice(1))) report(`broken anchor ${value}`);
        continue;
      }
      const path = internalPath(value);
      if (path === null) continue;
      const [target] = path.split(/[?#]/);
      const hash = path.split('#')[1];
      if (target.length > 1 && target.endsWith('/')) report(`trailing slash in ${value} (the host 301s it)`);
      else if (!resolves(target)) report(`broken link ${value}`);
      else if (hash && !idsByPage.get(target)?.has(hash)) report(`broken anchor ${value}`);
    }
  }

  // Redirect stubs have no <main> and none of the head below
  if (!html.includes('<main')) continue;

  if (html.search(/<meta charset/i) === -1 || html.search(/<meta charset/i) > 1024) {
    report('<meta charset> must sit within the first 1024 bytes');
  }
  const canonical = tags.filter(({ name, attrs }) => name === 'link' && attrs.some(([k, v]) => k === 'rel' && v === 'canonical'));
  if (canonical.length !== 1) report(`expected one canonical link, found ${canonical.length}`);
  const hreflangs = tags.filter(({ name, attrs }) => name === 'link' && attrs.some(([k]) => k === 'hreflang'));
  if (hreflangs.length !== 3) report(`expected 3 hreflang links, found ${hreflangs.length}`);
}

if (problems.length > 0) {
  console.error(`dist check failed (${problems.length}):`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log(`dist check passed (${pages.length} pages).`);
