export interface DecoratorPattern {
  id: string;
  name: string;
  prefix: string;
  suffix: string;
}

export const DECORATORS: DecoratorPattern[] = [
  { id: 'none', name: 'Sin Decoración', prefix: '', suffix: '' },
  { id: 'wings-1', name: 'Alas Reales', prefix: '꧁ ', suffix: ' ꧂' },
  { id: 'wings-2', name: 'Alas Simples', prefix: '༺ ', suffix: ' ༻' },
  { id: 'stars', name: 'Estrellas', prefix: '★ ', suffix: ' ★' },
  { id: 'sparkles', name: 'Brillos', prefix: '✨ ', suffix: ' ✨' },
  { id: 'arrows', name: 'Flechas', prefix: '➳ ', suffix: ' ➳' },
  { id: 'hearts', name: 'Corazones', prefix: '❤ ', suffix: ' ❤' },
  { id: 'music', name: 'Música', prefix: '♫ ', suffix: ' ♫' },
  { id: 'fire', name: 'Fuego', prefix: '🔥 ', suffix: ' 🔥' },
  { id: 'brackets', name: 'Corchetes', prefix: '【 ', suffix: ' 】' },
  { id: 'sword', name: 'Espadas', prefix: '⚔ ', suffix: ' ⚔' },
  { id: 'lines', name: 'Líneas', prefix: '/// ', suffix: ' ///' },
  { id: 'dots', name: 'Puntos', prefix: '• ', suffix: ' •' },
];

export const applyDecoration = (text: string, decoratorId: string): string => {
  const decorator = DECORATORS.find(d => d.id === decoratorId);
  if (!decorator) return text;
  return `${decorator.prefix}${text}${decorator.suffix}`;
};