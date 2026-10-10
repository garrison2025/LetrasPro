import type { GenerateSWOptions } from 'workbox-build';

export const workboxOptions: Omit<GenerateSWOptions, 'swDest'> = {
  globDirectory: 'dist',
  globPatterns: ['**/*.{js,css,html,png,svg}'],
  globIgnores: ['sw.js', 'workbox-*.js'],
  cleanupOutdatedCaches: true,
  clientsClaim: true,
  // Precache the public page URLs, not just the physical /index.html files.
  manifestTransforms: [async entries => ({
    manifest: entries.map(entry => ({ ...entry, url: entry.url === 'index.html' ? '/' : entry.url.replace(/\/index\.html$/, '') })),
    warnings: []
  })],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'CacheFirst',
      options: { cacheName: 'google-fonts-cache', expiration: { maxEntries: 10, maxAgeSeconds: 31536000 }, cacheableResponse: { statuses: [0, 200] } }
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: 'CacheFirst',
      options: { cacheName: 'gstatic-fonts-cache', expiration: { maxEntries: 10, maxAgeSeconds: 31536000 }, cacheableResponse: { statuses: [0, 200] } }
    }
  ]
};
