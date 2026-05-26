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
  integrations: [sitemap()],
  redirects: {
    '/news': '/articles',
  },
});