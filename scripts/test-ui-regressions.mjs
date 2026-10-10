import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import test from 'node:test';
import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const modules = new Map();
const dataURL = source => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
function loadSource(filename) {
  if (modules.has(filename)) return modules.get(filename);
  const source = fs.readFileSync(filename, 'utf8');
  if (filename.endsWith('.json')) return dataURL(`export default ${source}`);
  let output = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.React } }).outputText;
  output = output.replace(/from ['"]([^'"]+)['"]/g, (_, name) => {
    if (name === 'react-helmet-async') return `from '${dataURL('export const Helmet = () => null;')}'`;
    if (!name.startsWith('.')) return `from '${pathToFileURL(require.resolve(name)).href}'`;
    const base = path.resolve(path.dirname(filename), name);
    return `from '${loadSource([base, `${base}.ts`, `${base}.tsx`].find(candidate => fs.existsSync(candidate)))}'`;
  });
  const url = dataURL(output);
  modules.set(filename, url);
  return url;
}
const root = fileURLToPath(new URL('..', import.meta.url));
const load = file => import(loadSource(path.join(root, file)));
const { default: GeneratorPage } = await load('pages/GeneratorPage.tsx');
const { default: RepeaterPage } = await load('pages/RepeaterPage.tsx');
const { default: CommentsSection } = await load('components/CommentsSection.tsx');
const { default: FontCard } = await load('components/FontCard.tsx');
const { default: RouteNavigation } = await load('components/RouteNavigation.tsx');
const { ThemeProvider, useTheme } = await load('context/ThemeContext.tsx');
const { PAGE_CONFIGS } = await load('constants.ts');
const { FONTS } = await load('services/fontMaps.ts');
const { TONES, matchesTone } = await load('services/fontFilters.ts');
const { truncateText } = await load('services/text.ts');
let currentLocation;
let navigate;
function GeneratorRoute() {
  currentLocation = useLocation(); navigate = useNavigate();
  const config = Object.values(PAGE_CONFIGS).find(item => item.path === currentLocation.pathname) || PAGE_CONFIGS.home;
  return React.createElement(GeneratorPage, { config });
}
async function mount(component, options = {}) {
  let renderer;
  await act(async () => { renderer = TestRenderer.create(component, { createNodeMock: element => ({ value: element.props.value || '', getBoundingClientRect: () => ({ bottom: 200 }) }), ...options }); });
  return renderer;
}
const button = (renderer, label) => renderer.root.findAllByType('button').find(node => node.children.includes(label));
globalThis.window = { scrollTo() {}, addEventListener() {}, removeEventListener() {}, matchMedia: () => ({ matches: false }) };
globalThis.localStorage = { getItem: () => null, setItem() {} };

test('PNG export uses current text and rejects oversized images without triggering a download', async () => {
  const previousDocument = globalThis.document;
  const previousWarn = console.warn;
  let downloads = 0; const rendered = []; let tooWide = false;
  const context = {
    measureText: () => ({ width: tooWide ? 5000 : 120 }),
    createLinearGradient: () => ({ addColorStop() {} }),
    fillRect() {}, fillText(text) { rendered.push(text); },
  };
  globalThis.document = { createElement: tag => tag === 'canvas'
    ? { getContext: () => context, toDataURL: () => 'data:image/png;base64,test' }
    : { click() { downloads++; } } };
  console.warn = () => {};
  const font = FONTS[0];
  const renderer = await mount(React.createElement(FontCard, {
    font, rawText: 'Old', originalText: 'Old', displaySegments: [], isFavorite: false,
    viewMode: 'list', onToggleFavorite() {}, onCopy() {}, getCurrentText: () => 'María 👨‍👩‍👧‍👦',
  }));
  try {
    const download = () => renderer.root.findAllByType('button').find(node => node.props['aria-label']?.startsWith('Descargar'));
    await act(async () => download().props.onClick({ stopPropagation() {} }));
    assert.equal(downloads, 1); assert.ok(rendered.includes('María 👨‍👩‍👧‍👦'));
    tooWide = true;
    await act(async () => download().props.onClick({ stopPropagation() {} }));
    assert.equal(downloads, 1);
    assert.ok(JSON.stringify(renderer.toJSON()).includes('imagen'));
    assert.equal(download().props.disabled, false);
  } finally {
    await act(async () => renderer.unmount());
    globalThis.document = previousDocument; console.warn = previousWarn;
  }
});

test('all homepage tones match real styles and unavailable page tones are disabled', async () => {
  for (const tone of TONES) assert.ok(FONTS.some(font => matchesTone(font, tone)), tone);
  assert.ok(FONTS.filter(font => matchesTone(font, 'Gaming')).every(PAGE_CONFIGS.freefire.filter));
  assert.ok(FONTS.filter(font => matchesTone(font, 'Tatuajes')).every(font => font.pages.includes('tatuajes')));
  const renderer = await mount(React.createElement(MemoryRouter, { initialEntries: ['/letras-cursivas'] }, React.createElement(GeneratorRoute)));
  try {
    assert.equal(button(renderer, 'Gaming').props.disabled, true);
    assert.equal(button(renderer, 'Tatuajes').props.disabled, false);
  } finally { await act(async () => renderer.unmount()); }
});

test('URL queries follow navigation, back and forward; editing preserves unrelated parameters', async () => {
  const renderer = await mount(React.createElement(MemoryRouter, { initialEntries: ['/?q=Cute&utm_source=test'] }, React.createElement(GeneratorRoute)));
  const search = () => renderer.root.findByProps({ 'aria-label': 'Buscar estilo' });
  try {
    assert.equal(search().props.value, 'Cute');
    await act(async () => navigate('/?q=Elegante&utm_source=test'));
    assert.equal(search().props.value, 'Elegante');
    assert.equal(currentLocation.search, '?q=Elegante&utm_source=test');
    await act(async () => navigate('/letras-cursivas'));
    assert.equal(search().props.value, '');
    assert.equal(currentLocation.search, '');
    await act(async () => navigate(-1));
    assert.equal(search().props.value, 'Elegante');
    await act(async () => search().props.onChange({ target: { value: 'Sans' } }));
    assert.equal(new URLSearchParams(currentLocation.search).get('utm_source'), 'test');
    await act(async () => navigate(1));
    assert.equal(search().props.value, '');
  } finally { await act(async () => renderer.unmount()); }
});

test('empty searches explain the result and reset without losing campaign attribution', async () => {
  const renderer = await mount(React.createElement(MemoryRouter, { initialEntries: ['/?q=__no_matching_style__&utm_source=test'] }, React.createElement(GeneratorRoute)));
  try {
    assert.ok(renderer.root.findAllByType('p').some(node => node.children.includes('No hay estilos que coincidan con esta búsqueda y filtro.')));
    await act(async () => button(renderer, 'Restablecer filtros').props.onClick());
    assert.equal(new URLSearchParams(currentLocation.search).get('q'), null);
    assert.equal(new URLSearchParams(currentLocation.search).get('utm_source'), 'test');
    assert.equal(renderer.root.findAllByType('article').filter(node => node.props.className?.includes('content-visibility-auto')).length, 24);
  } finally { await act(async () => renderer.unmount()); }
});

test('hidden sticky inputs are hidden from focus and cards contain independent native buttons', async () => {
  const renderer = await mount(React.createElement(MemoryRouter, null, React.createElement(GeneratorRoute)));
  try {
    const sticky = renderer.root.findByProps({ 'aria-label': 'Texto para convertir (barra fija)' });
    assert.equal(sticky.parent.parent.props.hidden, true);
    const cards = renderer.root.findAllByType('article').filter(node => node.props.className?.includes('content-visibility-auto'));
    assert.equal(cards.length, 24);
    for (const card of cards) {
      assert.equal(card.props.role, undefined);
      assert.equal(card.findAllByType('button').length, 3);
      assert.ok(card.findAllByType('button').every(node => node.props['aria-label']));
    }
    assert.equal(renderer.root.findByProps({ 'aria-label': 'Convertir a mayúsculas' }).props['aria-pressed'], false);
    await act(async () => button(renderer, 'Gaming').props.onClick());
    assert.equal(button(renderer, 'Gaming').props['aria-pressed'], true);
  } finally { await act(async () => renderer.unmount()); }
});

test('length protection preserves full graphemes at the boundary, including older browsers', () => {
  for (const segmenter of [Intl.Segmenter, undefined]) {
    const original = Intl.Segmenter;
    try {
      Intl.Segmenter = segmenter;
      for (const suffix of ['😀', '🇪🇸', '👨‍👩‍👧‍👦', '👍🏽']) {
        assert.equal(truncateText('a'.repeat(4999) + suffix), 'a'.repeat(4999));
        const value = truncateText('a'.repeat(5000 - suffix.length) + suffix);
        assert.ok(value.endsWith(suffix));
        assert.equal(value.length, 5000);
        assert.ok(value.isWellFormed());
      }
      assert.equal(truncateText('u\u0308', 1), 'ü');
      assert.ok(truncateText('a\ud800').isWellFormed());
    } finally { Intl.Segmenter = original; }
  }
});

test('storage failures stay usable without falsely claiming a rating was saved', async () => {
  const original = globalThis.localStorage;
  globalThis.localStorage = { getItem: () => null, setItem() { throw new Error('Full'); } };
  const renderer = await mount(React.createElement(MemoryRouter, null, React.createElement(GeneratorRoute)));
  try {
    assert.ok(JSON.stringify(renderer.toJSON()).includes('No se pudieron guardar algunos cambios'));
    await act(async () => renderer.root.findByProps({ 'aria-label': 'Calificar con 4 estrellas' }).props.onClick());
    assert.ok(JSON.stringify(renderer.toJSON()).includes('no se pudo guardar'));
    assert.ok(!JSON.stringify(renderer.toJSON()).includes('Tu valoración personal está guardada'));
  } finally { await act(async () => renderer.unmount()); globalThis.localStorage = original; }
});

test('personal notes can be removed and persistence failures are reported', async () => {
  const original = globalThis.localStorage;
  globalThis.localStorage = { getItem: () => null, setItem() {} };
  const renderer = await mount(React.createElement(CommentsSection));
  try {
    await act(async () => renderer.root.findByProps({ id: 'note-text' }).props.onChange({ target: { value: 'Mi nota' } }));
    await act(async () => renderer.root.findByType('form').props.onSubmit({ preventDefault() {} }));
    assert.equal(renderer.root.findAllByType('article').length, 1);
    globalThis.localStorage.setItem = () => { throw new Error('Full'); };
    await act(async () => button(renderer, 'Eliminar nota').props.onClick());
    assert.equal(renderer.root.findAllByType('article').length, 0);
    assert.ok(JSON.stringify(renderer.toJSON()).includes('puede reaparecer'));
  } finally { await act(async () => renderer.unmount()); globalThis.localStorage = original; }
});

test('repeater flags stale results and requires regeneration before copying', async () => {
  const renderer = await mount(React.createElement(RepeaterPage));
  try {
    const input = () => renderer.root.findByProps({ id: 'repeat-text' });
    const copy = () => button(renderer, ' Copiar');
    await act(async () => input().props.onChange({ target: { value: 'Hola' } }));
    await act(async () => button(renderer, ' Generar Texto').props.onClick());
    assert.equal(copy().props.disabled, false);
    await act(async () => input().props.onChange({ target: { value: 'Adiós' } }));
    assert.equal(copy().props.disabled, true);
    assert.ok(JSON.stringify(renderer.toJSON()).includes('Genera de nuevo'));
    await act(async () => button(renderer, ' Generar Texto').props.onClick());
    assert.equal(copy().props.disabled, false);
    assert.ok(renderer.root.findByProps({ 'aria-label': 'Resultado del texto repetido' }).props.value.startsWith('Adiós'));
  } finally { await act(async () => renderer.unmount()); }
});

test('theme toggles update both the document theme and browser theme color', async () => {
  let mode = 'light'; let color;
  window.document = { documentElement: { classList: { remove() {}, add(value) { mode = value; } } }, querySelector: () => ({ setAttribute: (_, value) => { color = value; } }) };
  function Toggle() { const { toggleTheme } = useTheme(); return React.createElement('button', { onClick: toggleTheme }, 'Toggle'); }
  const renderer = await mount(React.createElement(ThemeProvider, null, React.createElement(Toggle)));
  try {
    await act(async () => button(renderer, 'Toggle').props.onClick());
    assert.equal(mode, 'dark'); assert.equal(color, '#0f172a');
    await act(async () => button(renderer, 'Toggle').props.onClick());
    assert.equal(mode, 'light'); assert.equal(color, '#7c3aed');
  } finally { await act(async () => renderer.unmount()); delete window.document; }
});

test('page navigation scrolls and focuses content while search changes and history do not reset it', async () => {
  let scrolls = 0; let focuses = 0;
  window.scrollTo = () => { scrolls++; };
  globalThis.document = { getElementById: () => ({ focus: () => { focuses++; } }) };
  function Probe() { navigate = useNavigate(); return React.createElement(RouteNavigation); }
  const renderer = await mount(React.createElement(MemoryRouter, null, React.createElement(Probe)));
  try {
    assert.equal(scrolls, 0);
    await act(async () => navigate('/texto-invisible'));
    assert.equal(scrolls, 1); assert.equal(focuses, 1);
    await act(async () => navigate('/texto-invisible?q=test'));
    assert.equal(scrolls, 1);
    await act(async () => navigate(-1));
    assert.equal(scrolls, 1);
  } finally { await act(async () => renderer.unmount()); delete globalThis.document; window.scrollTo = () => {}; }
});
