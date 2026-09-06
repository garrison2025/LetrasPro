import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const monetagSwPlugin = () => ({
  name: 'monetag-sw-inject',
  enforce: 'post' as const,
  apply: 'build' as const,
  closeBundle: {
    sequential: true,
    order: 'post' as const,
    handler() {
      const swPath = path.resolve(__dirname, 'dist/sw.js');
      const monetagCode = `self.options = {
    "domain": "5gvci.com",
    "zoneId": 11735579
};
self.lary = "";
importScripts('https://5gvci.com/act/files/service-worker.min.js?r=sw');
`;
      try {
        if (fs.existsSync(swPath)) {
          const originalContent = fs.readFileSync(swPath, 'utf-8');
          if (!originalContent.includes('5gvci.com')) {
            fs.writeFileSync(swPath, monetagCode + '\n' + originalContent, 'utf-8');
            console.log('Successfully injected Monetag code into dist/sw.js');
          }
        } else {
          fs.writeFileSync(swPath, monetagCode, 'utf-8');
        }
      } catch (e) {
        console.error('Failed to inject Monetag SW:', e);
      }
    }
  }
});

export default defineConfig({
  plugins: [
    react(),
    monetagSwPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.svg', 'robots.txt', 'sitemap.xml', 'og-image.png'],
      manifest: {
        name: 'Conversor de Letras Pro',
        short_name: 'LetrasPro',
        description: 'Generador de fuentes y letras bonitas para Instagram y redes sociales.',
        theme_color: '#7c3aed',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'logo.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: 'logo.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          'ui-vendor': ['lucide-react'],
          'utils-vendor': ['clsx', 'tailwind-merge']
        }
      }
    }
  }
});