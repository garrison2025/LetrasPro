import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { vitePrerender } from 'vite-plugin-prerender';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to extract blog slugs directly from file to avoid import issues in Node context
const getBlogRoutes = () => {
  try {
    const dataPath = path.resolve(__dirname, 'data/blogPosts.ts');
    if (!fs.existsSync(dataPath)) return [];
    const content = fs.readFileSync(dataPath, 'utf-8');
    const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
    const slugs = [];
    let match;
    while ((match = slugRegex.exec(content)) !== null) {
      if (match[1]) slugs.push(`/blog/${match[1]}`);
    }
    return slugs;
  } catch (error) {
    console.warn('Could not read blog posts for prerendering:', error);
    return [];
  }
};

// Define all routes to be prerendered
const routesToPrerender = [
  '/',
  '/letras-cursivas',
  '/letras-tatuajes',
  '/letras-goticas',
  '/letras-graffiti',
  '/letras-amino',
  '/letras-facebook',
  '/letras-tattoo',
  '/letras-para-instagram',
  '/nicks-para-free-fire',
  '/letras-para-whatsapp',
  '/letras-para-tiktok',
  '/letras-para-discord',
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
  ...getBlogRoutes()
];

export default defineConfig({
  plugins: [
    react(),
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
    }),
    vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: routesToPrerender,
      renderer: {
        // We use renderAfterTime to ensure React.lazy chunks and fonts are loaded.
        // 3000ms is a safe buffer for local builds.
        renderAfterTime: 3000, 
        maxConcurrentRoutes: 10,
      },
      // Minify HTML output for better performance
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true
      },
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