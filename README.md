# Etemad Melal — Marketing Website

A **static, RTL Persian** landing site for an investment platform brand. Built as a fast, SEO-friendly public front door; the authenticated app lives on a separate panel subdomain.

> **Portfolio note:** This repository contains the marketing site only. Backend, auth, and investor panel are not included.

## Live demo

Replace with your deployed URL after publishing, e.g. `https://etemadmelal.com`.

## Highlights

- **Single-page homepage** with anchored sections: hero, income streams, features, packages, trust, about, FAQ, contact
- **News / blog** via Astro Content Collections (`/news`, markdown articles)
- **Five investment packages** driven from a typed config
- **Glassmorphism UI** with brand colors, gradients, and responsive layout
- **Panel CTAs** — short labels (`شروع` / `ورود`) linking to external user panel
- **Contact form** — email + message (FormSubmit / optional Formspree)
- **SEO** — meta tags, sitemap, `robots.txt`, canonical URLs
- **Persian typography** — IRANSans, full RTL

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
npm run build
npm run preview   # open http://localhost:4321 — do not open dist/index.html directly
```

Upload the contents of **`dist/`** to your static host. No Node.js runtime required on the server.

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
  config/         Global site config, packages, income streams
  components/     Section components (Hero, Packages, FAQ, …)
  content/news/   Blog posts (Markdown)
  pages/          Routes
public/           Fonts, images, logo
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Static export to `dist/` |
| `npm run preview` | Preview production build locally |

## What I focused on

- Static-first architecture for cheap hosting and fast TTFB
- Config-driven packages and income copy for easy updates without touching layout
- Accessible, semantic markup and Persian RTL layout
- Clear separation between marketing site and product panel

## License

Private / portfolio use — adjust before open-sourcing.

---

**Author:** [Your name]  
**Role:** Front-end / full-stack sample — marketing site for fintech-style product
