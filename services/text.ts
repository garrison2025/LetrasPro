export function splitCharacters(text: string): string[] {
  const normalized = text.normalize('NFC');
  if (typeof Intl.Segmenter === 'function') {
    return [...new Intl.Segmenter('es', { granularity: 'grapheme' }).segment(normalized)].map(part => part.segment);
  }
  // Keep combining marks, emoji modifiers, flags and joined emoji together on older browsers.
  const result: string[] = [];
  let regionalCount = 0;
  for (const char of normalized) {
    const regional = /\p{Regional_Indicator}/u.test(char);
    const last = result.length - 1;
    if (last >= 0 && (/\p{Mark}|\p{Emoji_Modifier}|\u200d/u.test(char)
      || result[last].endsWith('\u200d') || (regional && regionalCount % 2 === 1))) {
      result[last] += char;
    } else {
      result.push(char);
    }
    regionalCount = regional ? regionalCount + 1 : 0;
  }
  return result;
}

export const MAX_INPUT_LENGTH = 5000;
export const MAX_OUTPUT_LENGTH = 100000;

// Retain the existing UTF-16 budget without cutting a visible character in half.
export function truncateText(text: string, limit = MAX_INPUT_LENGTH): string {
  let result = '';
  for (const character of splitCharacters(text.replace(/[\uD800-\uDFFF]/gu, '\uFFFD'))) {
    if (result.length + character.length > limit) break;
    result += character;
  }
  return result;
}
