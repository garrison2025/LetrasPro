import { PageConfig, NavLink } from './types';

export const PAGE_CONFIGS: Record<string, PageConfig> = {
  home: {
    path: '/',
    title: 'Conversor de Letras Bonitas (96+ Estilos para Copiar y Pegar)',
    heading: 'Conversor de Letras Bonitas',
    description: 'El mejor conversor de letras bonitas con más de 96 estilos únicos para Instagram, TikTok y redes sociales. Transforma tus textos gratis.',
    content: 'Bienvenido al conversor de letras bonitas más profesional de internet. Hemos actualizado nuestra herramienta para ofrecerte 96 tipografías únicas diseñadas para destacar en redes sociales. Con nuestro conversor de letras bonitas, puedes transformar texto plano en estilos cursivos, góticos, negritas y artísticos en un clic.',
    filter: (f) => f.pages.includes('home'),
    whyFeatures: [
      { title: '96+ Estilos Únicos', description: 'La mayor variedad de fuentes premium gratuitas en un solo lugar.', icon: 'palette' },
      { title: 'Compatibilidad Total', description: 'Caracteres Unicode optimizados para Instagram, WhatsApp y TikTok.', icon: 'smartphone' },
      { title: 'Optimizado para Español', description: 'Soporte completo para tildes y nuestra letra "ñ" mediante fallback.', icon: 'check' }
    ],
    howToSteps: [
      'Introduce tu texto en el panel superior del conversor de letras bonitas.',
      'Explora la lista con más de 90 variantes visuales que aparecen al instante.',
      'Copia el estilo que más te guste haciendo clic en la tarjeta.',
      'Pega el resultado en tu perfil y disfruta del impacto visual.'
    ],
    faqs: [
      { question: '¿Por qué este es el mejor conversor de letras bonitas?', answer: 'Ofrecemos 96 fuentes verificadas, modo oscuro, histórico de copiado y compatibilidad total con móviles.' },
      { question: '¿Es compatible con la letra Ñ?', answer: 'Sí, nuestro conversor está diseñado para el mercado español y mantiene la legibilidad en caracteres especiales.' }
    ]
  },
  cursivas: {
    path: '/letras-cursivas',
    title: 'Conversor de Letras Cursivas Elegantes (80+ Estilos Manuscritos)',
    heading: 'Conversor de Letras Cursivas',
    description: 'Genera textos elegantes con nuestro conversor de letras cursivas. Más de 80 estilos de letras cursivas y manuscritas para copiar y pegar.',
    content: '¿Buscas elegancia? Nuestro conversor de letras cursivas ofrece 80 estilos únicos que incluyen desde caligrafía inglesa hasta firmas modernas y trazos artísticos. Las fuentes script son ideales para transmitir sofisticación en Instagram.',
    filter: (f) => f.pages.includes('cursivas'),
    whyFeatures: [
      { title: '80+ Estilos Cursivos', description: 'La mayor biblioteca de caligrafías y manuscritas del mercado.', icon: 'palette' },
      { title: 'Elegancia Instantánea', description: 'Convierte textos planos en arte caligráfico sofisticado al instante.', icon: 'star' },
      { title: 'Legibilidad Pro', description: 'Fuentes cursivas seleccionadas que mantienen la claridad en móviles.', icon: 'check' }
    ],
    howToSteps: [
      'Introduce tu frase en el conversor de letras cursivas.',
      'Visualiza las 80+ opciones manuscritas e itálicas.',
      'Copia tu estilo caligráfico favorito generado.',
      'Úsalo en tu biografía; es compatible universalmente.'
    ],
    faqs: [
      { question: '¿Qué tipos de cursiva ofrece este conversor?', answer: 'Ofrecemos caligrafía fina, negrita, firma real, manuscrita casual y decoraciones con corazones.' }
    ]
  },
  graffiti: {
    path: '/letras-graffiti',
    title: 'Conversor de Letras Graffiti y Urbano (40+ Estilos)',
    heading: 'Conversor de Letras Graffiti',
    description: 'Crea textos urbanos con nuestro conversor de letras graffiti. Más de 40 estilos burbuja, goteos y tags callejeros online.',
    content: 'Dale un toque rebelde a tu perfil con el conversor de letras graffiti. Incluye estilos de burbuja, firmas tipo tag y efectos de goteo de pintura realistas.',
    filter: (f) => f.pages.includes('graffiti'),
    whyFeatures: [
      { title: 'Estilo Urbano Real', description: 'Efectos de goteo y firmas tipo tag de rotulador.', icon: 'palette' },
      { title: '40+ Variantes Mural', description: 'Combina alfabetos de bloque y burbuja con decoradores.', icon: 'zap' },
      { title: 'Impacto Visual', description: 'Fuentes diseñadas para destacar en cualquier feed o nick.', icon: 'star' }
    ],
    howToSteps: [
      'Introduce tu texto en el conversor de letras graffiti.',
      'Elige entre burbuja, bloque o tag caligráfico.',
      'Selecciona el diseño con efecto de goteo o corona.',
      'Copia y pega el arte urbano en tu perfil favorito.'
    ],
    faqs: [
      { question: '¿Sirve para nombres de clanes?', answer: 'Sí, es el estilo más popular para crear nicks impactantes en Free Fire o COD.' }
    ]
  }
};

export const NAVIGATION_LINKS: NavLink[] = [
  { label: 'Inicio', path: '/' },
  { label: 'Cursivas', path: '/letras-cursivas', group: 'generators' },
  { label: 'Góticas', path: '/letras-goticas', group: 'generators' },
  { label: 'Graffiti', path: '/letras-graffiti', group: 'generators' },
  { label: 'Tatuajes', path: '/letras-tatuajes', group: 'generators' },
  { label: 'Tattoo', path: '/letras-tattoo', group: 'generators' },
  { label: 'Facebook', path: '/letras-facebook', group: 'generators' },
  { label: 'Amino', path: '/letras-amino', group: 'generators' },
  { label: 'Repetidor', path: '/repetidor-de-texto', group: 'tools' },
  { label: 'Invisible', path: '/texto-invisible', group: 'tools' },
  { label: 'Glitch', path: '/texto-glitch', group: 'tools' },
  { label: 'Al Revés', path: '/texto-al-reves', group: 'tools' },
  { label: 'Grandes', path: '/letras-grandes', group: 'tools' },
  { label: 'Blog', path: '/blog' },
];
