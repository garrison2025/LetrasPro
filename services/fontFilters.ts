import { FontStyle } from '../types';

export const TONES = ['Todos', 'Elegante', 'Gaming', 'Cute', 'Urbano', 'Aesthetic', 'Profesional', 'Tatuajes'];

export function matchesTone(font: FontStyle, tone: string): boolean {
  if (tone === 'Todos' || font.tags?.includes(tone)) return true;
  if (tone === 'Gaming') return ['gaming', 'gothic', 'graffiti'].includes(font.category) || Boolean(font.tags?.includes('Free Fire') || font.tags?.includes('Miedo'));
  if (tone === 'Profesional') return ['sans', 'serif', 'monospace'].includes(font.category);
  if (tone === 'Tatuajes') return font.pages.includes('tatuajes');
  return false;
}
