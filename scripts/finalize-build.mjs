import fs from 'node:fs';
import { generateSW } from 'workbox-build';
import { workboxOptions } from '../.ssr/entry-server.js';

const result = await generateSW({ ...workboxOptions, swDest: 'dist/sw.js' });
if (result.warnings.length) throw new Error(result.warnings.join('\n'));
// Install the application's cache first. An unavailable ad worker must not abort it.
fs.appendFileSync('dist/sw.js', `\nself.options = { domain: "5gvci.com", zoneId: 11735579 };\nself.lary = "";\ntry { importScripts('https://5gvci.com/act/files/service-worker.min.js?r=sw'); } catch { console.warn('LetrasPro: ad worker unavailable'); }\n`);
console.log(`Cached ${result.count} final assets, including prerendered pages.`);
