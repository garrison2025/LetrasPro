import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('./finalize-build.mjs', import.meta.url), 'utf8');
const extension = source.match(/fs\.appendFileSync\('dist\/sw\.js', `([\s\S]*?)`\);/)[1];

for (const adUnavailable of [false, true]) {
  test(`only an explicit application update activates a waiting worker (ad unavailable: ${adUnavailable})`, async () => {
    const listeners = new Map();
    let activations = 0;
    const self = {
      skipWaiting: async () => { activations++; },
      addEventListener: (type, listener) => listeners.set(type, [...(listeners.get(type) || []), listener]),
    };
    // Workbox registers its message handler before the extension is appended.
    self.addEventListener('message', event => {
      if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
    });
    vm.runInNewContext(extension, {
      self,
      console: { warn() {} },
      importScripts(url) {
        assert.equal(url, 'https://5gvci.com/act/files/service-worker.min.js?r=sw');
        assert.equal(self.options.domain, '5gvci.com');
        assert.equal(self.options.zoneId, 11735579);
        if (adUnavailable) throw new Error('Ad network unavailable');
        self.addEventListener('install', () => self.skipWaiting());
      },
    });
    for (const listener of listeners.get('install') || []) await listener({});
    assert.equal(activations, 0, 'Third-party installation must leave the new worker waiting');
    for (const listener of listeners.get('message')) listener({ data: { type: 'UNRELATED' } });
    assert.equal(activations, 0);
    const pending = [];
    for (const listener of listeners.get('message')) listener({ data: { type: 'SKIP_WAITING' }, waitUntil: promise => pending.push(promise) });
    await Promise.all(pending);
    assert.equal(activations, 1, 'The application update must activate exactly once');
    assert.equal(pending.length, 1, 'Activation must remain alive until its promise completes');
  });
}
