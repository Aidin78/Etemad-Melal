// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

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
      filter: (page) => !page.includes('/news'),
      serialize(item) {
        if (item.url === 'https://etemadmelal.com/') {
          item.priority = 1;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/articles/')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        } else if (item.url.endsWith('/articles')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }
        return item;
      },
    }),
  ],
  redirects: {
    '/news': '/articles',
  },
});