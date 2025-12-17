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
      { question: '¿Por qué este es el mejor conversor de letras bonitas?', answer: 'Ofrecemos 96 fuentes verificadas, modo oscuro, histórico de copiado y compatibilidad total con móviles.' }
    ]
  },
  cursivas: {
    path: '/letras-cursivas',
    title: 'Conversor de Letras Cursivas Elegantes (80+ Estilos Manuscritos)',
    heading: 'Conversor de Letras Cursivas',
    description: 'Genera textos elegantes con nuestro conversor de letras cursivas. Más de 80 estilos de letras cursivas y manuscritas para copiar y pegar.',
    content: '¿Buscas elegancia? Nuestro conversor de letras cursivas ofrece 80 estilos únicos que incluyen desde caligrafía inglesa hasta firmas modernas y trazos artísticos.',
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
      { question: '¿Qué tipos de cursiva ofrece este conversor?', answer: 'Ofrecemos caligrafía fina, negrita, firma real, manuscrita casual y decoraciones elegantes.' }
    ]
  },
  goticas: {
    path: '/letras-goticas',
    title: 'Conversor de Letras Góticas Profesionales (80+ Estilos Dark)',
    heading: 'Conversor de Letras Góticas',
    description: 'Genera textos oscuros con nuestro conversor de letras goticas. Más de 80 fuentes góticas, medievales y dark para Instagram y tatuajes.',
    content: 'El estilo gótico es eterno. Nuestro conversor de letras goticas ha sido expandido a 80 estilos únicos que incluyen Fraktur clásico, Blackletter medieval, estilos Chicanos y Metal Extremo. Ideal para perfiles dark, nicks de juegos y diseños de tatuajes sofisticados.',
    filter: (f) => f.pages.includes('goticas'),
    whyFeatures: [
      { title: '80+ Estilos Góticos', description: 'Fraktur, Blackletter, Medieval y Chicano en una sola herramienta.', icon: 'shield' },
      { title: 'Impacto Visual Dark', description: 'Decoradores únicos de cruces, calaveras y rituales oscuros.', icon: 'star' },
      { title: 'Perfecto para Gamers', description: 'Crea nicks intimidantes para Free Fire, PUBG o Discord.', icon: 'zap' }
    ],
    howToSteps: [
      'Escribe tu nick o frase en el conversor de letras goticas.',
      'Selecciona entre 80 variantes medievales o modernas.',
      'Personaliza con decoradores dark automáticos.',
      'Copia y pega en tu red social favorita.'
    ],
    faqs: [
      { question: '¿Qué es el estilo gótico Fraktur?', answer: 'Es el estilo clásico de letra gótica alemana utilizado en manuscritos medievales, ahora adaptado a redes sociales.' }
    ]
  },
  graffiti: {
    path: '/letras-graffiti',
    title: 'Conversor de Letras Graffiti y Urbano (40+ Estilos)',
    heading: 'Conversor de Letras Graffiti',
    description: 'Crea textos urbanos con nuestro conversor de letras graffiti. Estilos burbuja, goteos y tags callejeros online.',
    content: 'Dale un toque rebelde a tu perfil con el conversor de letras graffiti. Incluye estilos de burbuja, firmas tipo tag y efectos de goteo.',
    filter: (f) => f.pages.includes('graffiti'),
    whyFeatures: [
      { title: 'Estilo Urbano Real', description: 'Efectos de goteo y firmas tipo tag de rotulador.', icon: 'palette' },
      { title: '40+ Variantes Mural', description: 'Combina alfabetos de bloque y burbuja con decoradores.', icon: 'zap' }
    ],
    howToSteps: [
      'Introduce tu texto en el conversor de letras graffiti.',
      'Elige entre burbuja, bloque o tag.',
      'Copia y pega el arte urbano.'
    ],
    faqs: [
      { question: '¿Sirve para nombres de clanes?', answer: 'Sí, es el estilo más popular para crear nicks impactantes en juegos competitivos.' }
    ]
  },
  tatuajes: {
    path: '/letras-tatuajes',
    title: 'Conversor de Letras para Tatuajes Online',
    heading: 'Conversor de Letras para Tatuajes',
    description: 'Prueba diseños con el conversor de letras para tatuajes. Encuentra fuentes góticas y cursivas en este conversor.',
    content: 'Diseñar arte corporal requiere precisión, y nuestro conversor de letras para tatuajes es la herramienta perfecta para visualizar tus ideas.',
    filter: (f) => f.category === 'gothic' || f.category === 'script',
    whyFeatures: [
      { title: 'Previsualización Real', description: 'Mira cómo queda tu frase en diferentes estilos antes de tatuarte.', icon: 'palette' },
      { title: 'Estilos Clásicos', description: 'Incluye fuentes Chicano, Old English y Góticas.', icon: 'star' }
    ],
    howToSteps: [
      'Escribe tu idea en el conversor.',
      'Filtra entre estilos góticos y cursivos.',
      'Copia el resultado.'
    ],
    faqs: [
      { question: '¿Son gratis las fuentes?', answer: 'Sí, genera caracteres Unicode de dominio público.' }
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
