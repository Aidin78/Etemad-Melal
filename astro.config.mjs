// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://etemadmelal.com',
  trailingSlash: 'never',
  server: {
    host: true,
    port: 4321,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      filter: (page) => !/^\/(news(\/|$)|(en\/)?404\/?$)/.test(new URL(page).pathname),
      i18n: {
        defaultLocale: 'fa',
        locales: {
          fa: 'fa-IR',
          en: 'en',
        },
      },
      serialize(item) {
        if (item.url === 'https://etemadmelal.com/') {
          return { ...item, priority: 1, changefreq: ChangeFreqEnum.WEEKLY };
        }
        if (item.url.includes('/articles/')) {
          return { ...item, priority: 0.7, changefreq: ChangeFreqEnum.MONTHLY };
        }
        if (item.url.endsWith('/articles')) {
          return { ...item, priority: 0.8, changefreq: ChangeFreqEnum.WEEKLY };
        }
        return item;
      },
    }),
  ],
  redirects: {
    '/news': '/articles',
  },
});