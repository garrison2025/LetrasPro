import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://conversordeletrasbonitas.org',
  integrations: [react(), tailwind(), sitemap()],
  output: 'static',
  build: {
    format: 'file'
  }
});