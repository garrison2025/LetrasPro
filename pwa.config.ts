import type { GenerateSWOptions } from 'workbox-build';

export const workboxOptions: Omit<GenerateSWOptions, 'swDest'> = {
  globDirectory: 'dist',
  globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
  globIgnores: ['sw.js', 'workbox-*.js'],
  cleanupOutdatedCaches: true,
  clientsClaim: true,
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/, /^q$/, /^v$/],
  // Keep each page's cached URL; never mask a real 404 with the homepage.
  navigateFallback: undefined,
  // Precache the existing public URLs, without HTML extensions or trailing slashes.
  manifestTransforms: [async entries => ({
    manifest: entries.map(entry => ({ ...entry, url: entry.url === 'index.html' ? '/' : entry.url.replace(/\.html$/, '') })),
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
