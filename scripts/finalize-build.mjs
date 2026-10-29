import fs from 'node:fs';
import { generateSW } from 'workbox-build';
import { workboxOptions } from '../.ssr/entry-server.js';

const result = await generateSW({ ...workboxOptions, swDest: 'dist/sw.js' });
fs.writeFileSync('dist/app-version.json', JSON.stringify({ release: process.env.CF_PAGES_COMMIT_SHA?.slice(0, 12) || 'quality-20261010' }));
if (result.warnings.length) throw new Error(result.warnings.join('\n'));
// Activate new cached content only after the user accepts the application update.
fs.appendFileSync('dist/sw.js', `
const activateApplicationUpdate = self.skipWaiting.bind(self);
self.skipWaiting = () => Promise.resolve();
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    event.waitUntil(activateApplicationUpdate());
  }
});
`);
console.log(`Cached ${result.count} final assets, including prerendered pages.`);
