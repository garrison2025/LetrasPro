import contentDates from '../data/contentDates.json';

// Change this date only when the generator content or functionality changes.
export const useDynamicDate = () => {
  const date = new Date(contentDates.generatorUpdated);
  const month = date.toLocaleString('es-ES', { month: 'long', timeZone: 'UTC' });
  return {
    month: month.charAt(0).toUpperCase() + month.slice(1),
    year: date.getUTCFullYear().toString(),
    fullDate: contentDates.generatorUpdated
  };
};
