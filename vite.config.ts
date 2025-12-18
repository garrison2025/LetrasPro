import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import prerender from '@prerenderer/rollup-plugin';
import jsdomRenderer from '@prerenderer/renderer-jsdom';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.svg', 'robots.txt', 'sitemap.xml', 'og-image.svg'],
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
    }),
    prerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: [
        '/',
        '/letras-cursivas',
        '/letras-tatuajes',
        '/letras-goticas',
        '/letras-graffiti',
        '/letras-amino',
        '/letras-facebook',
        '/letras-tattoo',
        '/repetidor-de-texto',
        '/texto-invisible',
        '/texto-glitch',
        '/texto-al-reves',
        '/letras-grandes',
        '/blog',
        '/sobre-nosotros',
        '/contacto',
        '/politica-de-privacidad',
        '/terminos-y-condiciones',
        // Blog Posts
        '/blog/guia-definitiva-conversor-letras-bonitas-instagram-facebook',
        '/blog/letras-para-tatuajes-guia-estilos-goticos-cursivos',
        '/blog/mejores-nicks-free-fire-pubg-graffiti'
      ],
      renderer: new jsdomRenderer({
        // Wait for the event we dispatch in index.tsx
        renderAfterDocumentEvent: 'render-event',
      }),
      postProcess(renderedRoute) {
        // Optimize output: Remove the "render-event" script to avoid errors on client
        renderedRoute.html = renderedRoute.html.replace(
          /window.document.dispatchEvent\(new Event\("render-event"\)\);/g,
          ''
        );
        return renderedRoute;
      },
    }),
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