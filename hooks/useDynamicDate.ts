
import { useState, useEffect } from 'react';

export const useDynamicDate = () => {
  const [dateInfo, setDateInfo] = useState({
    month: '',
    year: '',
    fullDate: new Date().toISOString()
  });

  useEffect(() => {
    const date = new Date();
    // Capitalize month name (e.g., "diciembre" -> "Diciembre")
    const monthName = date.toLocaleString('es-ES', { month: 'long' });
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    
    setDateInfo({
      month: capitalizedMonth,
      year: date.getFullYear().toString(),
      fullDate: date.toISOString()
    });
  }, []);

  return dateInfo;
};
