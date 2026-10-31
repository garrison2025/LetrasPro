export function splitCharacters(text: string): string[] {
  const normalized = text.normalize('NFC');
  // Latin, letterlike, enclosed, block, fullwidth and mathematical characters
  // cannot join without marks/ZWJ. Regional indicators deliberately stay out.
  // Styled alphabets otherwise repeat expensive segmentation for every card.
  if (/^[\u0020-\u007e\u00a0-\u00ff\u2100-\u214f\u2460-\u24ff\u2580-\u259f\uff01-\uff60\u{1d400}-\u{1d7ff}\t\n]*$/u.test(normalized)) return [...normalized];
  if (typeof Intl.Segmenter === 'function') {
    const result: string[] = [];
    for (const part of new Intl.Segmenter('es', { granularity: 'grapheme' }).segment(normalized)) result.push(part.segment);
    return result;
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
  const normalized = text.replace(/[\uD800-\uDFFF]/gu, '\uFFFD').normalize('NFC');
  if (normalized.length <= limit) return normalized;
  let result = '';
  if (typeof Intl.Segmenter === 'function') {
    // Stop at the budget instead of materializing every grapheme in a large paste.
    for (const { segment } of new Intl.Segmenter('es', { granularity: 'grapheme' }).segment(normalized)) {
      if (result.length + segment.length > limit) break;
      result += segment;
    }
  } else {
    for (const character of splitCharacters(normalized)) {
      if (result.length + character.length > limit) break;
      result += character;
    }
  }
  return result;
}
