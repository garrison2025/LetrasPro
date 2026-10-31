import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import test from 'node:test';
import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const modules = new Map();
const dataURL = source => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
function loadSource(filename) {
  if (modules.has(filename)) return modules.get(filename);
  let source = fs.readFileSync(filename, 'utf8');
  if (filename.endsWith('.json')) return dataURL(`export default ${source}`);
  if (filename.endsWith('FontCard.tsx')) source = source.replace('const [justCopied', 'globalThis.fontCardRenders++; const [justCopied');
  if (filename.endsWith('fontMaps.ts')) source = source.replace('const normalized = text.normalize', "if (text === globalThis.trackedPreviewText) globalThis.previewConversions++; const normalized = text.normalize");
  let output = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.React },
  }).outputText;
  output = output.replace(/from ['"]([^'"]+)['"]/g, (_, name) => {
    if (name === 'react-helmet-async') return `from '${dataURL('export const Helmet = () => null;')}'`;
    if (!name.startsWith('.')) return `from '${pathToFileURL(require.resolve(name)).href}'`;
    const base = path.resolve(path.dirname(filename), name);
    const target = [base, `${base}.ts`, `${base}.tsx`].find(candidate => fs.existsSync(candidate));
    assert.ok(target, `Module ${name}`);
    return `from '${loadSource(target)}'`;
  });
  const url = dataURL(output);
  modules.set(filename, url);
  return url;
}
const root = fileURLToPath(new URL('..', import.meta.url));
const { default: GeneratorPage } = await import(loadSource(path.join(root, 'pages/GeneratorPage.tsx')));
const { PAGE_CONFIGS } = await import(loadSource(path.join(root, 'constants.ts')));

test('typing batches storage writes and flushes the latest draft on backgrounding or navigation', async () => {
  const previousWindow = globalThis.window;
  const previousStorage = globalThis.localStorage;
  const windowListeners = new Map();
  const documentListeners = new Map();
  const document = {
    visibilityState: 'visible',
    addEventListener: (name, listener) => documentListeners.set(name, listener),
    removeEventListener: name => documentListeners.delete(name),
  };
  const writes = [];
  let storageAvailable = true;
  globalThis.fontCardRenders = 0;
  globalThis.window = {
    document,
    addEventListener: (name, listener) => windowListeners.set(name, listener),
    removeEventListener: name => windowListeners.delete(name),
  };
  globalThis.localStorage = {
    getItem: key => key === 'let_pro_input' ? 'Guardado ñ' : null,
    setItem: (key, value) => {
      if (!storageAvailable) throw new Error('Storage blocked');
      if (key === 'let_pro_input') writes.push(value);
    },
  };
  let renderer;
  try {
    await act(async () => {
      renderer = TestRenderer.create(React.createElement(MemoryRouter, null,
        React.createElement(GeneratorPage, { config: PAGE_CONFIGS.home })));
    });
    const input = () => renderer.root.findByProps({ 'aria-label': 'Texto para convertir' });
    assert.equal(input().props.value, 'Guardado ñ');
    assert.deepEqual(writes, [], 'Do not overwrite the restored draft with the initial empty debounce value');
    for (let index = 0; index < 20; index++) {
      await act(async () => input().props.onChange({ target: { value: `Café ${index}` } }));
    }
    assert.deepEqual(writes, [], 'No synchronous storage write per keystroke');
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 350)); });
    assert.deepEqual(writes, ['Café 19'], 'Save only the final draft after the burst');
    await act(async () => input().props.onChange({ target: { value: 'Último 👨‍👩‍👧‍👦' } }));
    await act(async () => windowListeners.get('pagehide')());
    assert.equal(writes.at(-1), 'Último 👨‍👩‍👧‍👦');
    await act(async () => input().props.onChange({ target: { value: 'Al cambiar de aplicación 🇪🇸' } }));
    document.visibilityState = 'hidden';
    await act(async () => documentListeners.get('visibilitychange')());
    assert.equal(writes.at(-1), 'Al cambiar de aplicación 🇪🇸');
    storageAvailable = false;
    await act(async () => input().props.onChange({ target: { value: 'Sin perder el borrador' } }));
    await act(async () => windowListeners.get('pagehide')());
    assert.equal(input().props.value, 'Sin perder el borrador');
    assert.ok(JSON.stringify(renderer.toJSON()).includes('No se pudieron guardar algunos cambios'));
    storageAvailable = true;
    await act(async () => windowListeners.get('pagehide')());
    assert.equal(writes.at(-1), 'Sin perder el borrador');
    assert.ok(!JSON.stringify(renderer.toJSON()).includes('No se pudieron guardar algunos cambios'));
    await act(async () => input().props.onChange({ target: { value: 'Antes de navegar áÑ' } }));
    await act(async () => renderer.unmount());
    renderer = null;
    assert.equal(writes.at(-1), 'Antes de navegar áÑ');
    assert.equal(windowListeners.has('pagehide'), false);
    assert.equal(documentListeners.has('visibilitychange'), false);
  } finally {
    if (renderer) await act(async () => renderer.unmount());
    globalThis.window = previousWindow;
    globalThis.localStorage = previousStorage;
    delete globalThis.fontCardRenders;
  }
});

test('sticky input observes viewport crossings and rebuilds at desktop/mobile resize without a scroll listener', async () => {
  const previousWindow = globalThis.window;
  const previousStorage = globalThis.localStorage;
  const previousObserver = globalThis.IntersectionObserver;
  const listeners = new Map();
  const observers = [];
  globalThis.window = {
    innerWidth: 390,
    addEventListener: (name, listener) => listeners.set(name, listener),
    removeEventListener: (name, listener) => { if (listeners.get(name) === listener) listeners.delete(name); },
  };
  globalThis.localStorage = { getItem() { return null; }, setItem() {} };
  globalThis.IntersectionObserver = class {
    constructor(callback, options) { this.callback = callback; this.options = options; observers.push(this); }
    observe(element) { this.element = element; }
    disconnect() { this.disconnected = true; }
  };
  let renderer;
  try {
    await act(async () => {
      renderer = TestRenderer.create(React.createElement(MemoryRouter, null, React.createElement(GeneratorPage, { config: PAGE_CONFIGS.home })), {
        createNodeMock: () => ({ value: '', getBoundingClientRect: () => ({ bottom: 200 }) }),
      });
    });
    const stickyHidden = () => renderer.root.findAllByType('div').find(node => node.props.className?.includes('fixed top-[64px]')).props.hidden;
    assert.equal(listeners.has('scroll'), false);
    assert.equal(observers[0].options.rootMargin, '-64px 0px 0px 0px');
    assert.equal(stickyHidden(), true);
    await act(async () => observers[0].callback([{ boundingClientRect: { bottom: 64 } }]));
    assert.equal(stickyHidden(), false, 'Show sticky input above the mobile header');
    await act(async () => observers[0].callback([{ boundingClientRect: { bottom: 900 } }]));
    assert.equal(stickyHidden(), true, 'Do not show sticky input when the editor is below the viewport');
    window.innerWidth = 1280;
    await act(async () => listeners.get('resize')());
    assert.equal(observers[0].disconnected, true);
    assert.equal(observers[1].options.rootMargin, '-80px 0px 0px 0px');
    await act(async () => observers[1].callback([{ boundingClientRect: { bottom: 79 } }]));
    assert.equal(stickyHidden(), false);
    await act(async () => renderer.unmount());
    renderer = null;
    assert.equal(observers[1].disconnected, true);
    assert.equal(listeners.has('resize'), false);
  } finally {
    if (renderer) await act(async () => renderer.unmount());
    globalThis.window = previousWindow;
    globalThis.localStorage = previousStorage;
    if (previousObserver === undefined) delete globalThis.IntersectionObserver;
    else globalThis.IntersectionObserver = previousObserver;
  }
});

test('typing skips unchanged cards while immediate copy, case changes and preview updates stay correct', async () => {
  const previousWindow = globalThis.window;
  const previousStorage = globalThis.localStorage;
  const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  const copied = [];
  const nodes = new Map();
  globalThis.fontCardRenders = 0;
  globalThis.window = { scrollTo() {}, addEventListener() {}, removeEventListener() {} };
  globalThis.localStorage = { getItem() { return null; }, setItem() {} };
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { clipboard: { async writeText(text) { copied.push(text); } } } });
  let renderer;
  try {
    await act(async () => {
      renderer = TestRenderer.create(React.createElement(MemoryRouter, null, React.createElement(GeneratorPage, { config: PAGE_CONFIGS.home })), {
        createNodeMock(element) {
          const node = { value: element.props.value || '', getBoundingClientRect: () => ({ bottom: 200 }) };
          if (element.props['aria-label']) nodes.set(element.props['aria-label'], node);
          return node;
        },
      });
    });
    const beforeTyping = globalThis.fontCardRenders;
    assert.equal(renderer.root.findAll(node => node.type === 'button' && node.props['aria-label']?.startsWith('Copiar estilo de letra ')).length, 24);
    assert.ok(beforeTyping >= 24);
    const previewRegion = renderer.root.findByProps({ 'aria-label': 'Vista previa de Sans Bold' });
    assert.equal(previewRegion.props.role, 'region');
    assert.equal(previewRegion.props.tabIndex, 0, 'Long previews remain keyboard-scrollable');
    assert.match(previewRegion.props.className, /max-h-72.*overflow-auto/);
    const region = { scrollTop: 0, scrollHeight: 1200, clientHeight: 288 };
    let prevented = 0;
    const key = (value, extra = {}) => previewRegion.props.onKeyDown({ key: value, target: region, currentTarget: region, preventDefault: () => prevented++, ...extra });
    key('ArrowDown'); assert.equal(region.scrollTop, 80);
    key('ArrowUp'); assert.equal(region.scrollTop, 0);
    key('PageDown'); assert.equal(region.scrollTop, 288);
    key('PageUp'); assert.equal(region.scrollTop, 0);
    key('End'); assert.equal(region.scrollTop, 1200);
    key('Home'); assert.equal(region.scrollTop, 0);
    const handled = prevented;
    key('End', { ctrlKey: true });
    key('End', { target: {} });
    key('Tab');
    assert.equal(prevented, handled, 'Keep browser shortcuts, child controls and Tab behavior');
    const input = renderer.root.findByProps({ 'aria-label': 'Texto para convertir' });
    const latest = 'Último ñ 👨‍👩‍👧‍👦🇪🇸';
    for (const value of ['U', 'Último', latest]) {
      nodes.get('Texto para convertir').value = value;
      await act(async () => { input.props.onChange({ target: { value } }); });
    }
    assert.equal(globalThis.fontCardRenders, beforeTyping, 'No card rerender on each keystroke before debounce');
    const clickCopy = async () => {
      const card = renderer.root.findByProps({ 'aria-label': 'Copiar estilo de letra Normal Sans' });
      await act(async () => { await card.props.onClick({ stopPropagation() {} }); });
    };
    await clickCopy();
    assert.equal(copied.at(-1).normalize('NFC'), latest, 'Copy uses the current input before the preview catches up');
    await act(async () => { renderer.root.findByProps({ 'aria-label': 'Convertir a mayúsculas' }).props.onClick(); });
    await clickCopy();
    assert.equal(copied.at(-1).normalize('NFC'), latest.toUpperCase());
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 330)); });
    const preview = renderer.root.findAllByProps({ role: 'img' }).find(node => node.props['aria-label'] === latest.toUpperCase());
    assert.ok(preview, 'Preview eventually renders the latest text');
    globalThis.trackedPreviewText = latest.toUpperCase();
    globalThis.previewConversions = 0;
    await act(async () => { renderer.root.findByProps({ 'aria-label': 'Añadir Normal Sans a favoritos' }).props.onClick({ stopPropagation() {} }); });
    assert.ok(renderer.root.findByProps({ 'aria-label': 'Quitar Normal Sans de favoritos' }));
    assert.equal(globalThis.previewConversions, 0, 'Favoriting keeps every existing conversion');
    await act(async () => { renderer.root.findAllByType('button').find(node => node.children.includes('Cargar más estilos')).props.onClick(); });
    assert.equal(globalThis.previewConversions, 24, 'Loading more converts only the 24 new cards');
    assert.equal(renderer.root.findAll(node => node.type === 'button' && node.props['aria-label']?.startsWith('Copiar estilo de letra ')).length, 48);
  } finally {
    if (renderer) await act(async () => { renderer.unmount(); });
    if (previousWindow === undefined) delete globalThis.window; else globalThis.window = previousWindow;
    if (previousStorage === undefined) delete globalThis.localStorage; else globalThis.localStorage = previousStorage;
    if (navigatorDescriptor) Object.defineProperty(globalThis, 'navigator', navigatorDescriptor); else delete globalThis.navigator;
    delete globalThis.fontCardRenders;
    delete globalThis.trackedPreviewText;
    delete globalThis.previewConversions;
  }
});

test('case buttons commit their state before deferred previews and the final text catches up', async () => {
  const previousWindow = globalThis.window;
  const previousStorage = globalThis.localStorage;
  const previousAct = globalThis.IS_REACT_ACT_ENVIRONMENT;
  const commits = [];
  globalThis.window = { addEventListener() {}, removeEventListener() {} };
  globalThis.localStorage = { getItem() { return null; }, setItem() {} };
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  globalThis.fontCardRenders = 0;
  let renderer;
  try {
    const recordCommit = () => {
      if (!renderer) return;
      commits.push({
        upper: renderer.root.findByProps({ 'aria-label': 'Convertir a mayúsculas' }).props['aria-pressed'],
        preview: renderer.root.findAllByProps({ role: 'img' })[0].props['aria-label'],
      });
    };
    await act(async () => {
      renderer = TestRenderer.create(React.createElement(React.Profiler, { id: 'generator', onRender: recordCommit },
        React.createElement(MemoryRouter, null, React.createElement(GeneratorPage, { config: PAGE_CONFIGS.home }))), {
        unstable_isConcurrent: true,
        createNodeMock: () => ({ value: '', getBoundingClientRect: () => ({ bottom: 200 }) }),
      });
    });
    const latest = 'Último ñ 👨‍👩‍👧‍👦🇪🇸';
    await act(async () => renderer.root.findByProps({ 'aria-label': 'Texto para convertir' }).props.onChange({ target: { value: latest } }));
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 330)); });
    commits.length = 0;
    await act(async () => renderer.root.findByProps({ 'aria-label': 'Convertir a mayúsculas' }).props.onClick());
    assert.ok(commits.some(commit => commit.upper && commit.preview === latest), 'Button feedback is committed before converting the previews');
    assert.equal(commits.at(-1).preview, latest.toUpperCase(), 'The preview catches up without a fixed extra timer');
  } finally {
    if (renderer) await act(async () => renderer.unmount());
    if (previousWindow === undefined) delete globalThis.window; else globalThis.window = previousWindow;
    if (previousStorage === undefined) delete globalThis.localStorage; else globalThis.localStorage = previousStorage;
    if (previousAct === undefined) delete globalThis.IS_REACT_ACT_ENVIRONMENT; else globalThis.IS_REACT_ACT_ENVIRONMENT = previousAct;
    delete globalThis.fontCardRenders;
  }
});
