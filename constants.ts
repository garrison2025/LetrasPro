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
    content: 'El estilo gótico es eterno. Nuestro conversor de letras goticas ha sido expandido a 80 estilos únicos que incluyen Fraktur clásico, Blackletter medieval, estilos Chicanos y Metal Extremo.',
    filter: (f) => f.pages.includes('goticas'),
    whyFeatures: [
      { title: '80+ Estilos Góticos', description: 'Fraktur, Blackletter, Medieval y Chicano en una sola herramienta.', icon: 'shield' },
      { title: 'Impacto Visual Dark', description: 'Decoradores únicos de cruces, calaveras y rituales oscuros.', icon: 'star' }
    ],
    howToSteps: [
      'Escribe tu nick o frase en el conversor de letras goticas.',
      'Selecciona entre 80 variantes medievales o modernas.',
      'Copia y pega en tu red social favorita.'
    ],
    faqs: [
      { question: '¿Qué es el estilo gótico Fraktur?', answer: 'Es el estilo clásico de letra gótica alemana utilizado en manuscritos medievales.' }
    ]
  },
  graffiti: {
    path: '/letras-graffiti',
    title: 'Conversor de Letras Graffiti y Urbano (40+ Estilos Murales)',
    heading: 'Conversor de Letras Graffiti',
    description: 'Crea textos urbanos con nuestro conversor de letras graffiti. Estilos burbuja, goteos y tags callejeros online.',
    content: 'Dale un toque rebelde y callejero a tu perfil con el conversor de letras graffiti. 40 estilos que simulan el arte urbano real.',
    filter: (f) => f.pages.includes('graffiti'),
    whyFeatures: [
      { title: '40+ Estilos Graffiti', description: 'Burbuja, Tag, Wildstyle y Chicano en una sola herramienta urbana.', icon: 'palette' },
      { title: 'Efectos Murales', description: 'Decoradores únicos de goteo y coronas de king.', icon: 'zap' }
    ],
    howToSteps: [
      'Introduce tu texto en el conversor de letras graffiti.',
      'Elige entre burbuja, bloque o tag.',
      'Copia y pega tu arte urbano.'
    ],
    faqs: [
      { question: '¿Son compatibles con nicks de juegos?', answer: 'Sí, aceptados en Free Fire, PUBG y nicks de clanes.' }
    ]
  },
  tatuajes: {
    path: '/letras-tatuajes',
    title: 'Conversor de Letras para Tatuajes Online (36+ Estilos)',
    heading: 'Conversor de Letras para Tatuajes',
    description: 'Diseña tu próximo tattoo con el conversor de letras para tatuajes. Más de 36 estilos góticos, chicanos y cursivos para visualizar en tu piel.',
    content: 'Visualiza tu diseño con el conversor de letras para tatuajes más completo. Ofrecemos 36 estilos especializados: desde el elegante "Fine Line" hasta el potente "Old English" y el auténtico estilo "Chicano". Ideal para probar nombres, fechas y frases antes de acudir a tu tatuador de confianza.',
    filter: (f) => f.pages.includes('tatuajes'),
    whyFeatures: [
      { title: '36+ Estilos Tattoo', description: 'Chicano, Fine Line, Blackletter y Caligrafía diseñados para la piel.', icon: 'palette' },
      { title: 'Previsualización Real', description: 'Añade decoradores de dagas, cruces y dotwork a tus frases.', icon: 'star' },
      { title: 'Optimizado para Piel', description: 'Fuentes seleccionadas por su legibilidad y estética artística atemporal.', icon: 'check' }
    ],
    howToSteps: [
      'Introduce la palabra o frase en el conversor de letras para tatuajes.',
      'Elige entre los estilos Chicano, Fine Line o Gótico.',
      'Personaliza con un decorador de daga o cruz si lo deseas.',
      'Haz una captura o copia el resultado para mostrarlo a tu tatuador.'
    ],
    faqs: [
      { question: '¿Cuál es el mejor estilo para un tatuaje de nombre?', answer: 'Recomendamos el estilo "Chicano" o "Fine Line" por su elegancia y fluidez natural.' }
    ]
  },
  tattoo: {
    path: '/letras-tattoo',
    title: 'Conversor de Letras Tattoo (36+ Estilos de Lettering)',
    heading: 'Conversor de Letras Tattoo',
    description: 'Encuentra la fuente perfecta en el conversor de letras tattoo. 36 diseños de lettering para tatuajes góticos, urbanos y cursivos.',
    content: 'El conversor de letras tattoo definitivo. Explora 36 variaciones de lettering que incluyen caligrafía tradicional, bloques marineros y script moderno. Nuestra herramienta utiliza caracteres Unicode artísticos que te permiten llevar tu idea a cualquier parte.',
    filter: (f) => f.pages.includes('tattoo'),
    whyFeatures: [
      { title: 'Lettering Profesional', description: 'Inspirado en los mejores artistas de tatuaje internacionales.', icon: 'palette' },
      { title: 'Diseños Únicos', description: 'Combina bases de texto con símbolos de dotwork y dagas.', icon: 'zap' },
      { title: 'Sin Instalación', description: 'Gratis y 100% online desde tu navegador móvil.', icon: 'smartphone' }
    ],
    howToSteps: [
      'Escribe tu texto en el conversor de letras tattoo.',
      'Busca el estilo "Old English" o "Inked Script".',
      'Copia el diseño estilizado.',
      'Úsalo como referencia para tu arte corporal.'
    ],
    faqs: [
      { question: '¿Qué es el estilo Fine Line en tatuajes?', answer: 'Es una técnica de tatuado con agujas muy finas que crea diseños delicados y minimalistas.' }
    ]
  },
  amino: {
    path: '/letras-amino',
    title: 'Conversor de Letras Amino (Compatibles)',
    heading: 'Conversor de Letras Amino',
    description: 'El único conversor de letras amino optimizado. Crea blogs estéticos con fuentes seguras.',
    content: 'La comunidad Amino valora la estética. Nuestro conversor filtra caracteres que suelen dar error.',
    filter: (f) => f.pages.includes('amino') || f.category === 'other',
    whyFeatures: [
      { title: '100% Compatible', description: 'Filtra solo las fuentes que se visualizan correctamente en la App.', icon: 'check' },
      { title: 'Blogs Estéticos', description: 'Crea títulos llamativos y separa secciones.', icon: 'palette' }
    ],
    howToSteps: [
      'Escribe el título en el conversor.',
      'Copia el texto estilizado.',
      'Pega en la app Amino.'
    ],
    faqs: [
      { question: '¿Sirve para títulos?', answer: 'Sí, las letras Small Caps son ideales.' }
    ]
  },
  facebook: {
    path: '/letras-facebook',
    title: 'Conversor de Letras para Facebook (Legibles)',
    heading: 'Conversor de Letras para Facebook',
    description: 'Mejora tus posts con el conversor de letras para facebook. Fuentes legibles.',
    content: 'Personaliza tus posts con fuentes sans y serif optimizadas.',
    filter: (f) => f.category === 'sans' || f.category === 'serif',
    whyFeatures: [
      { title: 'Anti-Spam', description: 'Evita caracteres marcados como ilegibles.', icon: 'shield' },
      { title: 'Visibilidad Feed', description: 'Asegura que tus amigos vean el texto tal como lo diseñaste.', icon: 'check' }
    ],
    howToSteps: [
      'Escribe tu estado.',
      'Selecciona estilos legibles.',
      'Publica con estilo.'
    ],
    faqs: [
      { question: '¿Funciona en Messenger?', answer: 'Sí, perfectamente.' }
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
