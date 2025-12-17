import { PageConfig, NavLink } from './types';

export const PAGE_CONFIGS: Record<string, PageConfig> = {
  home: {
    path: '/',
    title: 'Conversor de Letras Bonitas (Copiar y Pegar)',
    heading: 'Conversor de Letras Bonitas',
    description: 'El mejor conversor de letras bonitas para Instagram y redes sociales. Transforma textos con este conversor de letras bonitas gratuito.',
    content: 'Bienvenido al conversor de letras bonitas más completo de internet. Si buscas destacar en redes sociales, nuestro conversor de letras bonitas es la herramienta definitiva que transforma tu texto plano en tipografías estéticas y llamativas. A diferencia de otros sitios, este conversor de letras bonitas está optimizado para garantizar la compatibilidad en Instagram, TikTok, WhatsApp y más.',
    filter: (f) => f.pages.includes('home'),
    whyFeatures: [
      { title: 'Conversor Gratuito', description: 'Este conversor de letras bonitas es 100% gratuito, ilimitado y no requiere registro.', icon: 'zap' },
      { title: 'Compatibilidad Total', description: 'Nuestro conversor genera caracteres Unicode probados para funcionar en todas las apps sociales.', icon: 'smartphone' },
      { title: '90+ Estilos Pro', description: 'Ofrecemos la mayor variedad de fuentes: desde cursivas y góticas hasta estilos aesthetic.', icon: 'palette' }
    ],
    howToSteps: [
      'Escribe tu frase en el panel superior del conversor de letras bonitas.',
      'Explora la lista de resultados que genera el conversor automáticamente.',
      'Haz clic en tu estilo favorito para copiarlo desde el conversor.',
      'Pega el texto transformado en tus redes sociales.'
    ],
    faqs: [
      { question: '¿Qué es un conversor de letras bonitas?', answer: 'Es una herramienta que traduce caracteres ASCII a símbolos Unicode estéticos. Nuestro conversor facilita este proceso para que puedas personalizar tus perfiles sin conocimientos técnicos.' },
      { question: '¿Es seguro usar este conversor?', answer: 'Sí, absolutamente. Funciona localmente en tu navegador y los estilos son seguros para evitar problemas en plataformas como Instagram.' }
    ]
  },
  cursivas: {
    path: '/letras-cursivas',
    title: 'Conversor de Letras Cursivas y Manuscritas',
    heading: 'Conversor de Letras Cursivas',
    description: 'Utiliza nuestro conversor de letras cursivas para generar textos elegantes. El mejor conversor de letras cursivas para Instagram y tatuajes.',
    content: '¿Buscas elegancia? Nuestro conversor de letras cursivas transforma instantáneamente tus frases en hermosa caligrafía manuscrita. Las fuentes script son ideales para transmitir sofisticación, y con este conversor de letras cursivas, puedes obtener estilos negrita, delicados o clásicos en segundos.',
    filter: (f) => f.category === 'script' || f.id.includes('italic') || f.pages.includes('cursivas'),
    whyFeatures: [
      { title: 'Elegancia Instantánea', description: 'Convierte textos aburridos en arte caligráfico sofisticado al instante.', icon: 'star' },
      { title: '90+ Estilos Únicos', description: 'La mayor variedad de cursivas, desde manuscritas finas hasta scripts negritas.', icon: 'palette' },
      { title: 'Legibilidad Pro', description: 'Fuentes seleccionadas que mantienen la claridad incluso en pantallas pequeñas.', icon: 'check' }
    ],
    howToSteps: [
      'Introduce el texto en el conversor de letras cursivas.',
      'Visualiza las 90+ opciones script y handwriting disponibles.',
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
    title: 'Conversor de Letras Góticas (Dark & Blackletter)',
    heading: 'Conversor de Letras Góticas',
    description: 'Genera textos oscuros con el conversor de letras goticas. Ideal para nicks y bios darks, usa nuestro conversor de letras goticas gratis.',
    content: 'El estilo Blackletter nunca pasa de moda, y nuestro conversor de letras goticas lo trae a la era digital. Este conversor es esencial para crear una estética "dark", misteriosa o antigua en tus perfiles.',
    filter: (f) => f.category === 'gothic' || f.pages.includes('goticas'),
    whyFeatures: [
      { title: 'Impacto Visual', description: 'Genera textos Fraktur que captan la atención inmediatamente.', icon: 'shield' },
      { title: 'Perfecto para Gamers', description: 'Crea nicks intimidantes en juegos competitivos.', icon: 'smartphone' },
      { title: 'Estética Dark', description: 'Ideal para perfiles con temática oscura, emo o alternativa.', icon: 'star' }
    ],
    howToSteps: [
      'Escribe tu nick en el conversor de letras goticas.',
      'Selecciona entre Fraktur normal o negrita.',
      'Copia el resultado directamente.',
      'Pégalo en tu juego o red social favorita.'
    ],
    faqs: [
      { question: '¿El conversor funciona en Instagram?', answer: 'Sí, Instagram soporta perfectamente los caracteres generados por el conversor de letras goticas.' }
    ]
  },
  graffiti: {
    path: '/letras-graffiti',
    title: 'Conversor de Letras Graffiti y Urbano',
    heading: 'Conversor de Letras Graffiti',
    description: 'Crea textos urbanos con el conversor de letras graffiti. Estilos burbuja y callejeros en este conversor de letras graffiti online.',
    content: 'Dale un toque callejero a tu presencia digital con el conversor de letras graffiti. Este estilo vibrante y rebelde es posible gracias a los caracteres de doble trazo y burbujas.',
    filter: (f) => f.category === 'decorative' || f.pages.includes('graffiti'),
    whyFeatures: [
      { title: 'Estilo Urbano', description: 'Lleva el arte callejero directamente a tus textos digitales.', icon: 'palette' },
      { title: 'Destaca en Comentarios', description: 'Las fuentes ocupan más espacio visual y llaman la atención.', icon: 'star' },
      { title: 'Diversión Pura', description: 'Perfecto para mensajes informales y divertidos.', icon: 'heart' }
    ],
    howToSteps: [
      'Introduce tu texto para "graffitear".',
      'Elige estilos de burbujas o doble trazo.',
      'Copia el arte generado.',
      'Pégalo en comentarios o foros.'
    ],
    faqs: [
      { question: '¿Puedo usar números?', answer: 'Sí, el conversor también transforma números al estilo de doble trazo o burbuja.' }
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
