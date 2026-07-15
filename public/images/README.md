# Site images

Production images live here as JPG files. Replace any file with your own asset using the **same filename** (paths are defined in `src/config/images.ts`).

| File | Used in |
|------|---------|
| `hero.jpg` | Homepage hero, OG default |
| `features.jpg` | Features section |
| `about.jpg` | About preview & about page |
| `trust.jpg` | Trust section background |
| `articles/article-01.jpg` … `article-12.jpg` | Article cover images |

Initial photos are from [Unsplash](https://unsplash.com/license). Swap them for your brand photography when ready.

`npm run build` auto-downloads missing files via `scripts/ensure-assets.mjs`. To fetch or refresh manually: `npm run download:images`
