import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('./finalize-build.mjs', import.meta.url), 'utf8');
const extension = source.match(/fs\.appendFileSync\('dist\/sw\.js', `([\s\S]*?)`\);/)[1];

test('the application worker does not import third-party advertising scripts', () => {
  const listeners = [];
  const self = {
    skipWaiting: async () => {},
    addEventListener: type => listeners.push(type),
  };
  vm.runInNewContext(extension, {
    self,
    importScripts: () => assert.fail('The application extension must not load external scripts'),
  });
  assert.deepEqual(listeners, ['message']);
  assert.equal(self.options, undefined);
});

test('only an explicit application update activates a waiting worker', async () => {
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
  vm.runInNewContext(extension, { self });
  assert.equal(activations, 0, 'Installation must leave the new worker waiting');
  for (const data of [undefined, null, {}, { type: 'UNRELATED' }]) {
    for (const listener of listeners.get('message')) listener({ data });
  }
  assert.equal(activations, 0);
  const pending = [];
  for (const listener of listeners.get('message')) listener({ data: { type: 'SKIP_WAITING' }, waitUntil: promise => pending.push(promise) });
  await Promise.all(pending);
  assert.equal(activations, 1, 'The application update must activate exactly once');
  assert.equal(pending.length, 1, 'Activation must remain alive until its promise completes');
});
