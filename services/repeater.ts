import { MAX_OUTPUT_LENGTH } from './text';

export function repeatText(text: string, count: number, separator: string): string {
  if (!Number.isInteger(count) || count < 1 || count > 1000) {
    throw new Error('Elige entre 1 y 1000 repeticiones.');
  }
  if (text.length * count + separator.length * (count - 1) > MAX_OUTPUT_LENGTH) {
    throw new Error('El resultado supera 100 000 caracteres. Reduce el texto o las repeticiones.');
  }
  return Array(count).fill(text).join(separator);
}
