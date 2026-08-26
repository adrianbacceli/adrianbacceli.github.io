import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://adrianbacceli.com',
  outDir: './docs',
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', es: 'es-PA', it: 'it-IT' },
      },
    }),
  ],
  i18n: {
    locales: ['en', 'es', 'it'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
  },
});
