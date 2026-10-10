import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import ts from 'typescript';

const source = fs.readFileSync(new URL('../services/fontMaps.ts', import.meta.url), 'utf8');
const textModule = ts.transpileModule(fs.readFileSync(new URL('../services/text.ts', import.meta.url), 'utf8'), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext }
});
const textURL = `data:text/javascript;base64,${Buffer.from(textModule.outputText).toString('base64')}`;
let { outputText } = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext }
});
outputText = outputText.replace(/from ['"]\.\/text['"]/g, `from '${textURL}'`);
const { FONTS, convertText, getDisplaySegments } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const font = name => {
  const result = FONTS.find(item => item.name === name);
  assert.ok(result, `Missing font: ${name}`);
  return result;
};

test('display segments preserve emoji, mark accents and keep long styled text in a single segment', () => {
  const map = font('Cursive Bold').map;
  const output = convertText('niño 👨‍👩‍👧‍👦', map);
  const segments = getDisplaySegments(output, map);
  assert.equal(segments.map(segment => segment.content).join(''), output);
  assert.ok(segments.some(segment => segment.isCombined));
  assert.ok(segments.some(segment => segment.content.includes('👨‍👩‍👧‍👦')));
  assert.equal(getDisplaySegments(convertText('a'.repeat(5000), map), map).length, 1);
  assert.deepEqual(getDisplaySegments('', map), []);
  assert.ok(getDisplaySegments('漢', map)[0].isFallback);
});

test('Gothic keeps every letter and digit in its corresponding position', () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const expected = '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ0123456789';
  assert.equal(convertText(alphabet, font('Gothic Normal').map), expected);
});

test('Lovely keeps uppercase letters and digits aligned', () => {
  assert.equal(convertText('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', font('Lovely Cursive').map), 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ0123456789');
});

test('cursive and bubble mappings do not substitute different letters', () => {
  assert.equal(convertText('q', font('Cursive Bold').map), '𝓺');
  assert.equal(convertText('dD', font('Bubble Dark').map), '𝑫𝑫');
});

test('parenthesized digits retain their numeric values', () => {
  assert.equal(convertText('0123456789', font('Amino [Brackets]').map), '0⑴⑵⑶⑷⑸⑹⑺⑻⑼');
});

test('normal text preserves Spanish accents, punctuation and digits', () => {
  const input = '¡ÁÉÍÓÚ áéíóú Ññ Üü! 0123456789';
  assert.equal(convertText(input, font('Normal Sans').map).normalize('NFC'), input);
});

test('styled ü uses a diaeresis and ñ uses a tilde', () => {
  const result = convertText('üÜ ñÑ', font('Cursive Bold').map);
  assert.equal(result, '𝓾\u0308𝓤\u0308 𝓷\u0303𝓝\u0303');
  assert.equal(convertText('u\u0308', font('Cursive Bold').map), '𝓾\u0308');
});

test('Vaporwave spaces graphemes without breaking accents or emoji', () => {
  const input = 'á😊👨‍👩‍👧‍👦👍🏽🇪🇸';
  assert.equal(convertText(input, font('Vaporwave').map, true), 'ａ\u0301 😊 👨‍👩‍👧‍👦 👍🏽 🇪🇸');
});

test('Vaporwave safely preserves text when grapheme segmentation is unavailable', () => {
  const descriptor = Object.getOwnPropertyDescriptor(Intl, 'Segmenter');
  try {
    Object.defineProperty(Intl, 'Segmenter', { value: undefined, configurable: true });
    assert.equal(convertText('á😊👨‍👩‍👧‍👦', font('Vaporwave').map, true), 'ａ\u0301😊👨‍👩‍👧‍👦');
  } finally {
    Object.defineProperty(Intl, 'Segmenter', descriptor);
  }
});

test('existing decorators, empty input and unknown characters remain supported', () => {
  assert.equal(convertText('abc', font('Coquette Bow 1').map), '🎀 𝓪𝓫𝓬 🎀');
  assert.equal(convertText('', font('Normal Sans').map), '');
  assert.equal(convertText('中文 😊', font('Normal Sans').map), '中文 😊');
});

test('the font catalogue retains its IDs, order and complete source alphabet', () => {
  assert.equal(FONTS.length, 259);
  assert.equal(new Set(FONTS.map(item => item.id)).size, FONTS.length);
  assert.equal(FONTS[0].id, 'pro-sans');
  for (const item of FONTS) {
    for (const char of 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') {
      assert.equal(typeof item.map[char], 'string', `${item.id}: ${char}`);
    }
  }
});
