import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import ts from 'typescript';

const textURL = moduleURL('../services/text.ts');
function moduleURL(file) {
  let { outputText } = ts.transpileModule(fs.readFileSync(new URL(file, import.meta.url), 'utf8'), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext }
  });
  if (file !== '../services/text.ts') outputText = outputText.replace(/from ['"]\.\/text['"]/g, `from '${textURL}'`);
  return `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`;
}
const { splitCharacters, MAX_OUTPUT_LENGTH } = await import(textURL);
const { flipText } = await import(moduleURL('../services/flipMaps.ts'));
const { generateBigText } = await import(moduleURL('../services/bigFonts.ts'));
const { generateZalgo } = await import(moduleURL('../services/zalgo.ts'));
const { repeatText } = await import(moduleURL('../services/repeater.ts'));
const { copyText } = await import(moduleURL('../services/clipboard.ts'));

test('reverse text preserves emoji, flags, joined families and Spanish combining accents', () => {
  assert.equal(flipText('A😊B', 'reverse'), 'B😊A');
  assert.equal(flipText('A👨‍👩‍👧‍👦🇪🇸B', 'reverse'), 'B🇪🇸👨‍👩‍👧‍👦A');
  assert.equal(flipText('u\u0308', 'reverse'), 'ü');
  assert.equal(flipText('😊', 'upside-down'), '😊');
  assert.equal(flipText('', 'reverse'), '');
});

test('older browsers also keep graphemes intact without Intl.Segmenter', () => {
  const segmenter = Intl.Segmenter;
  try {
    Intl.Segmenter = undefined;
    assert.deepEqual(splitCharacters('ñu\u0308👨‍👩‍👧‍👦🇪🇸👍🏽'), ['ñ','ü','👨‍👩‍👧‍👦','🇪🇸','👍🏽']);
  } finally { Intl.Segmenter = segmenter; }
});

test('big letters keep numbers, Spanish accents and unsupported symbols visible', () => {
  assert.equal(generateBigText(''), '');
  assert.ok(generateBigText('0123456789').trim());
  assert.ok(generateBigText('ÑÁÜ').split('\n')[0].includes('~~~'));
  assert.ok(generateBigText('ÑÁÜ').split('\n')[0].includes('. .'));
  assert.notEqual(generateBigText('R'), generateBigText('G'));
  assert.ok(generateBigText('😊').includes('😊'));
  const lines = generateBigText('M4ÑR').split('\n');
  assert.equal(new Set(lines.map(line => line.length)).size, 1);
});

test('repeater validates count and output size before allocating the result', () => {
  assert.equal(repeatText('hola', 3, ', '), 'hola, hola, hola');
  assert.equal(repeatText('a', 1000, ''), 'a'.repeat(1000));
  assert.equal(repeatText('a'.repeat(100), 1000, '').length, MAX_OUTPUT_LENGTH);
  for (const count of [0, -1, 1001, NaN, Infinity, 1.5]) assert.throws(() => repeatText('a', count, ''));
  assert.throws(() => repeatText('a'.repeat(101), 1000, ''));
  assert.throws(() => repeatText('a', 1000, '-'.repeat(100)));
});

test('glitch zero levels preserve the full input, including joined emoji', () => {
  assert.equal(generateZalgo('¡Hola ñ ü 👨‍👩‍👧‍👦!', 0, 0, 0), '¡Hola ñ ü 👨‍👩‍👧‍👦!');
  assert.equal(generateZalgo('', 10, 10, 10), '');
});

test('copy waits for completion and safely reports rejected or unavailable clipboard', async () => {
  const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  try {
    let finish;
    let completed = false;
    Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { clipboard: { writeText: () => new Promise(resolve => { finish = resolve; }) } } });
    const pending = copyText('hola').then(result => { completed = true; return result; });
    await Promise.resolve();
    assert.equal(completed, false);
    finish();
    assert.equal(await pending, true);
    navigator.clipboard.writeText = async () => { throw new Error('Permission denied'); };
    assert.equal(await copyText('hola'), false);
    delete navigator.clipboard;
    assert.equal(await copyText('hola'), false);
  } finally {
    if (navigatorDescriptor) Object.defineProperty(globalThis, 'navigator', navigatorDescriptor);
    else delete globalThis.navigator;
  }
});
