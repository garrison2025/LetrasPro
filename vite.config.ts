import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { workboxOptions } from './pwa.config';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    react(),
    ...(!isSsrBuild ? [VitePWA({
      registerType: 'prompt',
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
      workbox: workboxOptions
    })] : [])
  ],
  ssr: { noExternal: ['react-helmet-async'] },
  build: {
    outDir: 'dist',
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
          'ui-vendor': ['lucide-react'],
          'utils-vendor': ['clsx', 'tailwind-merge']
        }
      }
    }
  }
}));
