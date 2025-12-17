import { PageConfig, NavLink } from './types';

export const PAGE_CONFIGS: Record<string, PageConfig> = {
  home: {
    path: '/',
    title: 'Conversor de Letras Bonitas (90+ Estilos para Copiar y Pegar)',
    heading: 'Conversor de Letras Bonitas',
    description: 'El mejor conversor de letras bonitas con más de 90 estilos únicos para Instagram, TikTok y redes sociales. Transforma tus textos gratis.',
    content: 'Bienvenido al conversor de letras bonitas más profesional de internet. Hemos actualizado nuestra herramienta para ofrecerte más de 90 tipografías únicas diseñadas específicamente para destacar en el ecosistema digital hispanohablante. Con nuestro conversor de letras bonitas, puedes transformar texto plano en estilos cursivos, góticos, negritas y artísticos en un solo clic, garantizando que tu biografía de Instagram o tus posts de Facebook se vean increíbles.',
    filter: (f) => f.pages.includes('home'),
    whyFeatures: [
      { title: '90+ Estilos Únicos', description: 'La mayor variedad de fuentes premium gratuitas: desde cursivas elegantes hasta góticas potentes.', icon: 'palette' },
      { title: 'Compatibilidad Total', description: 'Nuestro conversor utiliza caracteres Unicode optimizados para Instagram, WhatsApp y TikTok.', icon: 'smartphone' },
      { title: 'Optimizado para Español', description: 'Soporte completo para tildes y nuestra letra "ñ" mediante un sistema inteligente de fallback.', icon: 'check' }
    ],
    howToSteps: [
      'Introduce tu texto en el panel superior de este conversor de letras bonitas.',
      'Explora la lista con más de 90 variantes visuales que aparecen al instante.',
      'Copia el estilo que más te guste haciendo clic en la tarjeta de la fuente.',
      'Pega el resultado en tu perfil favorito y disfruta del impacto visual.'
    ],
    faqs: [
      { question: '¿Por qué este es el mejor conversor de letras bonitas?', answer: 'A diferencia de otros, nuestro sitio ofrece más de 90 fuentes verificadas, modo oscuro nativo, histórico de copiado y una compatibilidad superior con dispositivos móviles.' },
      { question: '¿Es compatible con la letra Ñ y tildes?', answer: 'Sí, nuestro conversor está diseñado para el mercado español. Si un carácter no existe en el mapa Unicode, nuestra tecnología lo muestra de forma legible sin perder la estética.' }
    ]
  },
  cursivas: {
    path: '/letras-cursivas',
    title: 'Conversor de Letras Cursivas y Manuscritas Elegantes',
    heading: 'Conversor de Letras Cursivas',
    description: 'Genera textos elegantes con nuestro conversor de letras cursivas. Más de 80 estilos de letras cursivas para copiar y pegar en Instagram.',
    content: '¿Buscas elegancia? Nuestro conversor de letras cursivas transforma instantáneamente tus frases en hermosa caligrafía manuscrita. Las fuentes script son ideales para transmitir sofisticación, y con este conversor de letras cursivas, puedes obtener estilos negrita, delicados o clásicos en segundos.',
    filter: (f) => f.category === 'script' || f.id.includes('italic') || f.pages.includes('cursivas'),
    whyFeatures: [
      { title: 'Elegancia Instantánea', description: 'Convierte textos aburridos en arte caligráfico sofisticado al instante.', icon: 'star' },
      { title: '80+ Estilos Únicos', description: 'La mayor biblioteca de cursivas, itálicas y caligrafías del mercado.', icon: 'palette' },
      { title: 'Legibilidad Pro', description: 'Fuentes seleccionadas que mantienen la claridad incluso en pantallas pequeñas.', icon: 'check' }
    ],
    howToSteps: [
      'Introduce el texto en el conversor de letras cursivas.',
      'Visualiza las 80+ opciones script y handwriting disponibles.',
      'Copia tu estilo preferido generado por el conversor.',
      'Úsalo donde quieras; es compatible universalmente.'
    ],
    faqs: [
      { question: '¿Cómo funciona el conversor de letras cursivas?', answer: 'El conversor mapea cada letra a su equivalente matemático en formato script Unicode. Esto permite pegar el texto en sitios que normalmente no permiten cambiar fuentes.' },
      { question: '¿Sirve este conversor para tatuajes?', answer: '¡Por supuesto! Es excelente para previsualizar nombres con elegancia antes de tatuarlos.' }
    ]
  },
  tatuajes: {
    path: '/letras-tatuajes',
    title: 'Conversor de Letras para Tatuajes Online',
    heading: 'Conversor de Letras para Tatuajes',
    description: 'Prueba diseños con el conversor de letras para tatuajes. Encuentra fuentes góticas y cursivas en este conversor de letras para tatuajes.',
    content: 'Diseñar arte corporal requiere precisión, y nuestro conversor de letras para tatuajes es la herramienta perfecta para visualizar tus ideas. Ya sea que busques un estilo chicano, gótico o minimalista, este conversor te ofrece una vista previa instantánea.',
    filter: (f) => f.category === 'gothic' || f.category === 'script' || f.pages.includes('tatuajes'),
    whyFeatures: [
      { title: 'Previsualización Real', description: 'Mira cómo queda tu frase en diferentes estilos antes de tatuarte.', icon: 'palette' },
      { title: 'Estilos Clásicos', description: 'Incluye fuentes Chicano, Old English, Góticas y Script.', icon: 'star' },
      { title: 'Sin Instalación', description: 'Funciona 100% online en tu navegador móvil o escritorio.', icon: 'zap' }
    ],
    howToSteps: [
      'Escribe tu idea en el conversor de letras para tatuajes.',
      'Filtra entre estilos góticos y cursivos.',
      'Añade símbolos especiales disponibles.',
      'Lleva el diseño a tu estudio de confianza.'
    ],
    faqs: [
      { question: '¿Son gratis las fuentes?', answer: 'Sí, genera caracteres Unicode de dominio público, por lo que puedes usarlos sin problemas de licencia.' }
    ]
  },
  goticas: {
    path: '/letras-goticas',
    title: 'Conversor de Letras Góticas Profesionales (70+ Estilos)',
    heading: 'Conversor de Letras Góticas',
    description: 'Genera textos oscuros con nuestro conversor de letras goticas. Más de 70 fuentes góticas, medievales y dark para Instagram y tatuajes.',
    content: 'El estilo Blackletter nunca pasa de moda, y nuestro conversor de letras goticas lo trae a la era digital con una variedad sin precedentes. Este conversor es esencial para crear una estética "dark", misteriosa o antigua. Hemos incluido desde la clásica gótica Fraktur hasta estilos modernos de metal extremo y rituales oscuros.',
    filter: (f) => f.category === 'gothic' || f.pages.includes('goticas'),
    whyFeatures: [
      { title: 'Impacto Visual', description: 'Genera textos Fraktur y Blackletter que captan la atención inmediatamente.', icon: 'shield' },
      { title: '70+ Variantes Dark', description: 'La colección más grande de góticas con decoradores de cruces, dagas y calaveras.', icon: 'palette' },
      { title: 'Perfecto para Gamers', description: 'Crea nicks intimidantes para Free Fire, PUBG o nicks de clanes.', icon: 'smartphone' }
    ],
    howToSteps: [
      'Escribe tu nick o frase en el conversor de letras goticas.',
      'Selecciona entre Fraktur, Medieval, Vampírica o Chicana.',
      'Añade decoradores dark automáticos.',
      'Copia el resultado y úsalo en tus redes sociales.'
    ],
    faqs: [
      { question: '¿El conversor de letras góticas es compatible?', answer: 'Sí, utilizamos caracteres Unicode específicos que son compatibles con Instagram, TikTok y la mayoría de nicks de videojuegos.' },
      { question: '¿Qué estilos góticos incluye?', answer: 'Incluye Fraktur, Old English, Medieval, estilos de Metal y variaciones con símbolos dark únicos.' }
    ]
  },
  graffiti: {
    path: '/letras-graffiti',
    title: 'Conversor de Letras Graffiti y Urbano (40+ Estilos)',
    heading: 'Conversor de Letras Graffiti',
    description: 'Crea textos urbanos con nuestro conversor de letras graffiti. Más de 40 estilos burbuja, goteos y tags callejeros en este conversor online.',
    content: 'Dale un toque callejero y rebelde a tu presencia digital con el conversor de letras graffiti. Hemos diseñado una colección exclusiva que simula el arte urbano real: desde letras "Burbuja" (throw-ups) hasta firmas rápidas tipo "Tag". Este conversor es perfecto para personalizar perfiles de Discord, nicks de juegos y comentarios llamativos en TikTok o Instagram.',
    filter: (f) => f.category === 'decorative' || f.pages.includes('graffiti'),
    whyFeatures: [
      { title: 'Estilo Urbano Real', description: 'Incluye efectos de goteo de pintura y firmas tipo tag de rotulador.', icon: 'palette' },
      { title: '40+ Variantes Mural', description: 'Combina alfabetos de bloque y burbuja con decoradores de graffiti.', icon: 'zap' },
      { title: 'Impacto en Redes', description: 'Fuentes diseñadas para ocupar espacio visual y destacar en cualquier feed.', icon: 'star' }
    ],
    howToSteps: [
      'Introduce tu texto en el conversor de letras graffiti.',
      'Explora las opciones de burbuja, bloque y tag caligráfico.',
      'Selecciona el diseño con efecto de goteo o corona.',
      'Copia y pega el arte urbano en tu perfil favorito.'
    ],
    faqs: [
      { question: '¿Qué es el estilo graffiti Unicode?', answer: 'Son combinaciones de caracteres de burbuja y bloque con símbolos especiales que imitan la estética del arte callejero sin necesidad de imágenes.' },
      { question: '¿Sirve para nombres de clanes?', answer: 'Sí, es muy popular para crear nicks impactantes en juegos como Free Fire o Call of Duty.' }
    ]
  },
  amino: {
    path: '/letras-amino',
    title: 'Conversor de Letras Amino (Compatibles)',
    heading: 'Conversor de Letras Amino',
    description: 'El único conversor de letras amino optimizado. Crea blogs estéticos con fuentes seguras usando el conversor de letras amino.',
    content: 'La comunidad Amino valora la estética, y nuestro conversor está diseñado específicamente para ello, filtrando caracteres que suelen dar error.',
    filter: (f) => f.pages.includes('amino'),
    whyFeatures: [
      { title: '100% Compatible', description: 'Filtra solo las fuentes que se visualizan correctamente en la App.', icon: 'check' },
      { title: 'Blogs Estéticos', description: 'Crea títulos llamativos y separa secciones con elegancia.', icon: 'palette' }
    ],
    howToSteps: [
      'Escribe el título de tu blog.',
      'Elige un estilo decorativo seguro.',
      'Copia el texto estilizado.',
      'Pega el diseño en la app Amino.'
    ],
    faqs: [
      { question: '¿Sirve para títulos?', answer: 'Sí, las letras "Small Caps" son las favoritas para títulos limpios.' }
    ]
  },
  facebook: {
    path: '/letras-facebook',
    title: 'Conversor de Letras para Facebook (Anti-Ban)',
    heading: 'Conversor de Letras para Facebook',
    description: 'Mejora tus posts con el conversor de letras para facebook. Fuentes legibles y seguras en este conversor de letras para facebook.',
    content: 'Facebook es estricto, pero nuestro conversor te permite personalizar tus posts sin perder visibilidad ni arriesgar tu cuenta.',
    filter: (f) => f.pages.includes('facebook') || f.category === 'sans' || f.category === 'serif',
    whyFeatures: [
      { title: 'Anti-Spam', description: 'Evita caracteres que la plataforma marca como ilegibles.', icon: 'shield' },
      { title: 'Visibilidad Feed', description: 'Asegura que tus amigos vean el texto tal como lo diseñaste.', icon: 'check' }
    ],
    howToSteps: [
      'Escribe tu estado en el conversor.',
      'Selecciona estilos legibles recomendados.',
      'Copia el texto generado.',
      'Publica en tu muro con estilo.'
    ],
    faqs: [
      { question: '¿Funciona en Messenger?', answer: 'Sí, puedes enviar mensajes estilizados a través de Messenger sin problemas.' }
    ]
  },
  tattoo: {
    path: '/letras-tattoo',
    title: 'Conversor de Letras Tattoo (Diseños Gratis)',
    heading: 'Conversor de Letras Tattoo',
    description: 'El mejor conversor de letras tattoo para inspirarte. Crea diseños únicos de piel con el conversor de letras tattoo.',
    content: 'Encontrar la fuente perfecta para tu piel es fácil con el conversor de letras tattoo. Combina lo mejor de la tipografía clásica y moderna.',
    filter: (f) => f.category === 'gothic' || f.category === 'script' || f.pages.includes('tattoo'),
    whyFeatures: [
      { title: 'Inspiración Artística', description: 'Combina estilos para crear diseños de tatuajes únicos.', icon: 'palette' },
      { title: 'Prueba Rápida', description: 'Prueba docenas de fuentes en segundos antes de decidir.', icon: 'zap' }
    ],
    howToSteps: [
      'Escribe la palabra clave.',
      'Busca estilos "Old English" o "Script".',
      'Haz una captura del resultado.',
      'Muestra el diseño a tu tatuador.'
    ],
    faqs: [
      { question: '¿Qué estilo es mejor para zonas pequeñas?', answer: 'Recomendamos fuentes Sans-Serif o Manuscritas simples para evitar que la tinta se expanda.' }
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
