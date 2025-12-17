import { PageConfig, NavLink } from './types';

export const PAGE_CONFIGS: Record<string, PageConfig> = {
  home: {
    path: '/',
    title: 'Conversor de Letras Bonitas (140+ Estilos para Copiar y Pegar)',
    heading: 'Conversor de Letras Bonitas',
    description: 'El mejor conversor de letras bonitas con más de 140 estilos únicos para Instagram, TikTok y redes sociales. Transforma tus textos gratis con alfabetos reales.',
    content: 'Bienvenido al conversor de letras bonitas más profesional de internet. Hemos actualizado nuestra herramienta para ofrecerte 140 tipografías únicas que van más allá de simples decoraciones. Incluimos alfabetos góticos, cursivos, aesthetic y urbanos verificados para máxima compatibilidad en todo el mundo hispano.',
    filter: (f) => f.pages.includes('home'),
    whyFeatures: [
      { title: '140+ Estilos Reales', description: 'La mayor biblioteca de alfabetos Unicode premium en español.', icon: 'palette' },
      { title: 'Optimización Hispana', description: 'Soporte inteligente para tildes y letra "ñ" mediante fallback visual.', icon: 'check' },
      { title: 'Compatibilidad Total', description: 'Fuentes verificadas para Instagram, WhatsApp, TikTok y Facebook.', icon: 'smartphone' }
    ],
    howToSteps: [
      'Introduce tu texto en el panel superior del conversor de letras bonitas.',
      'Navega por los más de 140 alfabetos y estilos visuales disponibles.',
      'Copia tu estilo favorito con un solo clic sobre la tarjeta.',
      'Pega en tu biografía o post y destaca sobre los demás.'
    ],
    faqs: [
      { question: '¿Por qué este es el mejor conversor?', answer: 'Ofrecemos 140 estilos únicos, soporte completo para español, modo oscuro y descarga de texto como imagen.' }
    ]
  },
  cursivas: {
    path: '/letras-cursivas',
    title: 'Conversor de Letras Cursivas (80+ Estilos Manuscritos)',
    heading: 'Conversor de Letras Cursivas',
    description: 'Genera textos elegantes con nuestro conversor de letras cursivas. Más de 80 estilos manuscritos, firmas y caligrafías para copiar y pegar.',
    filter: (f) => f.pages.includes('cursivas') || f.category === 'script',
    content: 'La elegancia es clave. Nuestro conversor de letras cursivas ofrece 80 estilos únicos que emulan la caligrafía real, desde trazos finos (Fine Line) hasta firmas gruesas y elegantes.',
    whyFeatures: [
      { title: '80+ Estilos Cursivos', description: 'Desde caligrafía inglesa hasta firmas modernas minimalistas.', icon: 'star' },
      { title: 'Fluidez Visual', description: 'Diseños que mantienen la conexión visual entre letras para un look natural.', icon: 'palette' }
    ],
    howToSteps: ['Escribe tu frase.', 'Elige entre caligrafía, manuscrita o firma.', 'Copia y pega.'],
    faqs: [{ question: '¿Son legibles?', answer: 'Sí, seleccionamos alfabetos que mantienen la legibilidad incluso en pantallas pequeñas.' }]
  },
  goticas: {
    path: '/letras-goticas',
    title: 'Conversor de Letras Góticas (80+ Estilos Medieval y Dark)',
    heading: 'Conversor de Letras Góticas',
    description: 'Genera textos oscuros con nuestro conversor de letras goticas. Más de 80 fuentes góticas, medievales y Fraktur profesionales.',
    filter: (f) => f.pages.includes('goticas') || f.category === 'gothic',
    content: 'Domina el estilo gótico. Ofrecemos 80 variaciones que incluyen Fraktur, Old English y Rotunda medieval, perfectas para nicks agresivos o estética dark.',
    whyFeatures: [
      { title: '80+ Variantes Góticas', description: 'La colección más grande de alfabetos góticos reales online.', icon: 'shield' },
      { title: 'Impacto Visual', description: 'Fuentes de gran peso visual ideales para títulos y nicks gaming.', icon: 'zap' }
    ],
    howToSteps: ['Introduce tu nick.', 'Selecciona una base gótica (Bold, Light o Medieval).', 'Copia el resultado.'],
    faqs: [{ question: '¿Sirve para Free Fire?', answer: 'Absolutamente, el estilo gótico es el #1 para clanes y nicks competitivos.' }]
  },
  graffiti: {
    path: '/letras-graffiti',
    title: 'Conversor de Letras Graffiti (40+ Estilos Urbanos)',
    heading: 'Conversor de Letras Graffiti',
    description: 'Crea textos urbanos con nuestro conversor de letras graffiti. Estilos burbuja, goteos y tags callejeros compatibles.',
    filter: (f) => f.pages.includes('graffiti'),
    content: 'Arte callejero en tu móvil. 40 estilos graffiti que capturan la esencia del tag y la burbuja neoyorquina.',
    whyFeatures: [
      { title: '40+ Estilos Urbanos', description: 'Burbuja, Tag, Goteo y Wildstyle simulados.', icon: 'palette' },
      { title: 'Legibilidad Tag', description: 'Estilos diseñados para ser leídos rápidamente en el feed.', icon: 'zap' }
    ],
    howToSteps: ['Introduce tu texto urbano.', 'Elige tu estilo de graffiti favorito.', 'Copia y pega tu arte.'],
    faqs: [{ question: '¿Funcionan los cuadros?', answer: 'Incluimos avisos de compatibilidad para asegurar que elijas estilos que todos vean.' }]
  },
  tatuajes: {
    path: '/letras-tatuajes',
    title: 'Conversor de Letras para Tatuajes (60+ Estilos Lettering)',
    heading: 'Conversor de Letras para Tatuajes',
    description: 'Diseña tu próximo tattoo con el conversor de letras para tatuajes. 60 estilos profesionales: Chicano, Gótico y Fine Line.',
    filter: (f) => f.pages.includes('tatuajes'),
    content: 'El diseño definitivo para tu piel. Nuestro conversor de letras para tatuajes incluye 60 alfabetos inspirados en el lettering profesional de estudios reales: Chicano, Old English, Fine Line y Tribal.',
    whyFeatures: [
      { title: '60+ Estilos Tattoo', description: 'Diseñados por y para entusiastas del arte corporal.', icon: 'palette' },
      { title: 'Simulación Real', description: 'Prueba nombres y frases antes de ir a tu sesión de tatuaje.', icon: 'star' }
    ],
    howToSteps: ['Escribe el nombre o frase.', 'Prueba estilos Chicanos o Góticos.', 'Muestra el diseño a tu tatuador.'],
    faqs: [{ question: '¿Cuál es el más popular?', answer: 'El estilo Chicano y el Fine Line son los más buscados en 2025.' }]
  },
  tattoo: {
    path: '/letras-tattoo',
    title: 'Conversor de Letras Tattoo (60+ Estilos de Lettering Pro)',
    heading: 'Conversor de Letras Tattoo',
    description: 'Encuentra la fuente perfecta en el conversor de letras tattoo. 60 diseños de lettering gótico, urbano y tribal.',
    filter: (f) => f.pages.includes('tattoo'),
    content: 'Explora 60 estilos que cubren todas las ramas del tatuaje moderno. Desde letras marineras hasta caligrafía agresiva para el pecho o espalda.',
    whyFeatures: [
      { title: 'Matriz de 60 Fuentes', description: 'Una combinación perfecta de bases y decoradores inked.', icon: 'palette' },
      { title: 'Visor de Diseño', description: 'Ideal para visualizar tatuajes en zonas amplias del cuerpo.', icon: 'zap' }
    ],
    howToSteps: ['Introduce el texto.', 'Navega por las 60 opciones de lettering.', 'Copia tu diseño final.'],
    faqs: [{ question: '¿Es gratuito?', answer: 'Sí, todas nuestras 60 fuentes tattoo son gratis para uso personal.' }]
  },
  facebook: {
    path: '/letras-facebook',
    title: 'Conversor de Letras para Facebook (60+ Estilos Legibles)',
    heading: 'Conversor de Letras para Facebook',
    description: 'Mejora tus posts con el conversor de letras para facebook. Más de 60 estilos de fuentes negritas y subrayadas optimizadas.',
    content: 'Destaca en el feed de noticias. Nuestro conversor de letras para facebook ofrece 60 estilos seleccionados por su alta legibilidad y bajo riesgo de filtro anti-spam, incluyendo negritas reales, versalitas y subrayados.',
    filter: (f) => f.pages.includes('facebook'),
    whyFeatures: [
      { title: '60+ Estilos FB', description: 'Negritas y versalitas de alta visibilidad para posts.', icon: 'palette' },
      { title: 'Zero Spam', description: 'Caracteres Unicode seguros que no afectan el alcance orgánico.', icon: 'shield' }
    ],
    howToSteps: ['Escribe tu estado.', 'Selecciona estilos de negrita o subrayado.', 'Publica y atrae miradas.'],
    faqs: [{ question: '¿Se ve en FB Lite?', answer: 'Sí, priorizamos alfabetos que se renderizan bien en todas las versiones de Facebook.' }]
  },
  amino: {
    path: '/letras-amino',
    title: 'Conversor de Letras Amino (40+ Estilos Aesthetic)',
    heading: 'Conversor de Letras Amino',
    description: 'El único conversor de letras amino optimizado con más de 40 estilos estéticos. Crea blogs y wikis con fuentes verificadas.',
    filter: (f) => f.pages.includes('amino'),
    content: 'La estética lo es todo en Amino. Ofrecemos 40 estilos "Aesthetic" diseñados para decorar wikis, biografías y títulos de blogs con total compatibilidad.',
    whyFeatures: [
      { title: '40+ Estilos Aesthetic', description: 'Fuentes suaves y minimalistas para una comunidad creativa.', icon: 'palette' },
      { title: '100% Compatible', description: 'Filtramos caracteres que dan error de "cuadro vacío" en la app.', icon: 'check' }
    ],
    howToSteps: ['Introduce el título de tu Wiki.', 'Elige entre 40 opciones estéticas.', 'Copia y decora tu blog.'],
    faqs: [{ question: '¿Sirve para títulos?', answer: 'Sí, el estilo Small Caps es el estándar de oro en Amino.' }]
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
