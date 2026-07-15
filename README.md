# Etemad Melal — Marketing Website

A **static, bilingual (FA/EN)** landing site for an investment platform brand. Built as a fast, SEO-friendly public front door; the authenticated app lives on a separate panel subdomain.

> **Portfolio note:** This repository contains the marketing site only. Backend, auth, and investor panel are not included.

## Live demo

Replace with your deployed URL after publishing, e.g. `https://etemadmelal.com`.

## Highlights

- **Single-page homepage** with anchored sections: hero, income streams, features, packages, trust, about, FAQ, contact
- **Articles / blog** via Astro Content Collections (`/articles`, `/en/articles`)
- **Bilingual** — Persian at `/`, English at `/en`
- **Five investment packages** driven from typed config + i18n
- **Glassmorphism UI** with brand colors, gradients, and responsive layout
- **Panel CTAs** linking to external user panel
- **Contact form** — email + message (FormSubmit / optional Formspree)
- **SEO** — meta tags, sitemap, `robots.txt`, canonical URLs, hreflang
- **Persian typography** — IRANSans (with system fallback), full RTL

## Tech stack

| Layer | Choice |
|--------|--------|
| Framework | [Astro](https://astro.build) 6 (static output) |
| Styling | Tailwind CSS 4 |
| Content | Markdown + Content Collections |
| Deploy | Static `dist/` (any host, CDN, or object storage) |

## Getting started

**Requirements:** Node.js 22.12+

```bash
git clone <your-repo-url>
cd main-etemadmelal
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:4321`.

### Environment

```env
PUBLIC_PANEL_URL=https://panel.example.com
# Optional:
# PUBLIC_CONTACT_FORM_URL=https://formspree.io/f/xxxxx
```

### Production build

```bash
npm run build              # auto-downloads images if missing (prebuild)
npm run check              # TypeScript + Astro diagnostics
npm run preview            # open http://localhost:4321 — do not open dist/index.html directly
```

For a clean clone without cached images, `prebuild` runs `ensure-assets.mjs` and downloads defaults automatically. To fetch or refresh images manually: `npm run download:images`.

Upload the contents of **`dist/`** to your static host. No Node.js runtime required on the server.

### Images & fonts

- Site images: `public/images/` (see `public/images/README.md`)
- Replace JPG files with your brand photography — keep filenames or update `src/config/images.ts`
- Fonts: place IRANSans files in `public/font/` (optional; Tahoma fallback is used otherwise)
- Download default photos: `npm run download:images`

### Troubleshooting: styles or images not loading

**Locally:** Do **not** double-click `dist/index.html` in Explorer. The site uses root paths (`/_astro/…`, `/images/…`) that only work over HTTP. Use:

```bash
npm run dev          # development
npm run build:preview # build + preview at http://localhost:4321
```

**On cPanel:** Upload the **contents** of `dist/` into `public_html` (so `index.html` and `_astro/` sit directly in `public_html`, not inside a `dist/` subfolder).

## Project structure

```
src/
  config/           URLs, packages, images
  components/       Section components (Hero, Packages, FAQ, …)
  content/
    articles/fa/    Persian articles (Markdown)
    articles/en/    English articles (Markdown)
    about/          About page content (fa.md, en.md)
  i18n/             Translations (fa.ts, en.ts)
  lib/              Shared utilities (articles, SEO, packages)
  pages/            Routes (index.astro + [...path].astro, news redirects)
public/             Images, fonts, logo
.github/workflows/  CI (check + build)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Static export to `dist/` (ensures assets + article parity) |
| `npm run preview` | Preview production build locally |
| `npm run check` / `npm run lint` | Astro + TypeScript diagnostics |
| `npm run download:images` | Download default JPG photos |
| `npm run check:assets` | Verify required images exist (no auto-download) |
| `npm run check:articles` | Verify FA/EN article slug parity |

## CI

GitHub Actions runs `download:images`, `check`, and `build` on push/PR to `main` or `master` (see `.github/workflows/ci.yml`).

## License

Private / portfolio use — adjust before open-sourcing.
