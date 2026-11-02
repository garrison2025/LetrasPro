import { FontStyle } from '../types';

export const TONES = ['Todos', 'Elegante', 'Gaming', 'Cute', 'Urbano', 'Aesthetic', 'Profesional', 'Tatuajes'];

const SEARCH_ALIASES: Record<string, string[]> = {
  cursiva: ['cursiva', 'cursive', 'italic', 'script'],
  cursivas: ['cursiva', 'cursive', 'italic', 'script'],
  gotica: ['gothic'],
  goticas: ['gothic'],
  gotico: ['gothic'],
  goticos: ['gothic'],
  negrita: ['negrita', 'bold'],
  negritas: ['negrita', 'bold'],
};

function normalizeSearch(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, ' ');
}

export function filterFontsBySearch(fonts: FontStyle[], query: string): FontStyle[] {
  const normalized = normalizeSearch(query);
  if (!normalized) return fonts;
  const terms = Object.hasOwn(SEARCH_ALIASES, normalized) ? [normalized, ...SEARCH_ALIASES[normalized]] : [normalized];
  return fonts.filter(font => [font.name, font.category, ...(font.tags || [])].some(value => {
    const searchable = normalizeSearch(value);
    return terms.some(term => searchable.includes(term));
  }));
}

export function matchesTone(font: FontStyle, tone: string): boolean {
  if (tone === 'Todos' || font.tags?.includes(tone)) return true;
  if (tone === 'Gaming') return ['gaming', 'gothic', 'graffiti'].includes(font.category) || Boolean(font.tags?.includes('Free Fire') || font.tags?.includes('Miedo'));
  if (tone === 'Profesional') return ['sans', 'serif', 'monospace'].includes(font.category);
  if (tone === 'Tatuajes') return font.pages.includes('tatuajes');
  return false;
}
