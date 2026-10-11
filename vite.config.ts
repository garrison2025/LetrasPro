import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { workboxOptions } from './pwa.config';

export default defineConfig(({ isSsrBuild }) => ({
  define: {
    'import.meta.env.VITE_APP_RELEASE': JSON.stringify(process.env.CF_PAGES_COMMIT_SHA?.slice(0, 12) || 'quality-20261010'),
  },
  plugins: [
    react(),
    ...(!isSsrBuild ? [VitePWA({
      registerType: 'prompt',
      includeAssets: ['logo.svg', 'favicon.ico', 'robots.txt', 'sitemap.xml', 'og-image.png'],
      manifest: {
        name: 'Conversor de Letras Pro',
        short_name: 'LetrasPro',
        lang: 'es',
        start_url: '/',
        scope: '/',
        description: 'Generador de fuentes y letras bonitas para Instagram y redes sociales.',
        theme_color: '#7c3aed',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: workboxOptions
    })] : [])
  ],
  ssr: { noExternal: ['react-helmet-async'] },
  build: {
    outDir: 'dist',
    manifest: !isSsrBuild,
    sourcemap: false,
    minify: isSsrBuild ? false : 'terser',
    terserOptions: {
      compress: {
        pure_funcs: ['console.log', 'console.debug', 'console.info'],
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: isSsrBuild ? undefined : {
          'react-vendor': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          'ui-vendor': ['lucide-react']
        }
      }
    }
  }
}));
