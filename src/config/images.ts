/** Central image paths for the marketing site */
export const siteImages = {
  hero: '/images/hero.jpg',
  features: '/images/features.jpg',
  about: '/images/about.jpg',
  trust: '/images/trust.jpg',
  article: (index: number) =>
    `/images/articles/article-${String(index).padStart(2, '0')}.jpg`,
  articleDefault: '/images/articles/article-01.jpg',
} as const;
