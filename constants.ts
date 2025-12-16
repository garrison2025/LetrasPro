import { PageConfig, NavLink } from './types';

export const PAGE_CONFIGS: Record<string, PageConfig> = {
  home: {
    path: '/',
    title: 'Conversor de Letras Bonitas (Copiar y Pegar)',
    heading: 'Conversor de Letras Bonitas',
    description: 'El mejor conversor de letras bonitas para Instagram y redes sociales. Transforma textos con este conversor de letras bonitas gratuito.',
    content: 'Bienvenido al conversor de letras bonitas más completo de internet. Si buscas destacar en redes sociales, nuestro conversor de letras bonitas es la herramienta definitiva que transforma tu texto plano en tipografías estéticas y llamativas. A diferencia de otros sitios, este conversor de letras bonitas está optimizado para garantizar la compatibilidad en Instagram, TikTok, WhatsApp y más. Usar un conversor de letras bonitas te ayuda a captar la atención de tus seguidores inmediatamente. Simplemente escribe, y deja que nuestro conversor de letras bonitas haga la magia por ti.',
    filter: (f) => f.pages.includes('home'),
    whyFeatures: [
      { title: 'Conversor Gratuito', description: 'Este conversor de letras bonitas es 100% gratuito, ilimitado y no requiere registro para generar fuentes estilizadas.', icon: 'zap' },
      { title: 'Compatibilidad Total', description: 'Nuestro conversor de letras bonitas genera caracteres Unicode probados para funcionar en todas las apps sociales.', icon: 'smartphone' },
      { title: 'Estilos Variados', description: 'El conversor de letras bonitas ofrece más de 70 estilos, desde cursivas hasta góticas, en un solo lugar.', icon: 'palette' }
    ],
    howToSteps: [
      'Escribe tu frase en el panel superior del conversor de letras bonitas.',
      'Explora la lista de resultados que genera el conversor de letras bonitas automáticamente.',
      'Haz clic en tu estilo favorito para copiarlo desde el conversor.',
      'Pega el texto transformado por el conversor de letras bonitas en tus redes.'
    ],
    faqs: [
      { question: '¿Qué es un conversor de letras bonitas?', answer: 'Un conversor de letras bonitas es una herramienta digital que traduce caracteres ASCII normales a símbolos Unicode estéticos. Nuestro conversor de letras bonitas facilita este proceso técnico para que puedas personalizar tus perfiles sin conocimientos de código.' },
      { question: '¿Es seguro usar este conversor de letras bonitas?', answer: 'Sí, absolutamente. Este conversor de letras bonitas funciona localmente en tu navegador, protegiendo tu privacidad. Además, los estilos del conversor de letras bonitas son seguros para evitar baneos en plataformas como Instagram.' },
      { question: '¿Por qué usar un conversor de letras bonitas en 2024?', answer: 'La competencia en redes es alta. Un conversor de letras bonitas te permite diferenciarte visualmente. Los influencers utilizan nuestro conversor de letras bonitas para resaltar palabras clave en sus biografías y pies de foto.' }
    ]
  },
  cursivas: {
    path: '/letras-cursivas',
    title: 'Conversor de Letras Cursivas y Manuscritas',
    heading: 'Conversor de Letras Cursivas',
    description: 'Utiliza nuestro conversor de letras cursivas para generar textos elegantes. El mejor conversor de letras cursivas para Instagram y tatuajes.',
    content: '¿Buscas elegancia? Nuestro conversor de letras cursivas transforma instantáneamente tus frases en hermosa caligrafía manuscrita. Las fuentes script son ideales para transmitir sofisticación, y con este conversor de letras cursivas, puedes obtener estilos negrita, delicados o clásicos en segundos. Muchos diseñadores usan nuestro conversor de letras cursivas para maquetar invitaciones o nombres. Si necesitas destacar un nombre en tu biografía, el conversor de letras cursivas es tu mejor aliado. Prueba ahora la versatilidad de este conversor de letras cursivas.',
    filter: (f) => f.pages.includes('cursivas'),
    whyFeatures: [
      { title: 'Elegancia Instantánea', description: 'El conversor de letras cursivas convierte textos aburridos en arte caligráfico sofisticado al instante.', icon: 'star' },
      { title: 'Ideal para Nombres', description: 'Usa el conversor de letras cursivas para embellecer nombres propios en perfiles sociales.', icon: 'heart' },
      { title: 'Alta Legibilidad', description: 'Este conversor de letras cursivas selecciona estilos script que se leen bien en móviles.', icon: 'check' }
    ],
    howToSteps: [
      'Introduce el texto en el conversor de letras cursivas.',
      'Visualiza las opciones script y handwriting del conversor de letras cursivas.',
      'Copia tu estilo preferido generado por el conversor de letras cursivas.',
      'Úsalo donde quieras; el conversor de letras cursivas es compatible universalmente.'
    ],
    faqs: [
      { question: '¿Cómo funciona el conversor de letras cursivas?', answer: 'El conversor de letras cursivas mapea cada letra de tu teclado a su equivalente matemático en formato script Unicode. Esto hace que el texto del conversor de letras cursivas se pueda pegar en sitios que normalmente no permiten cambiar fuentes.' },
      { question: '¿Puedo usar el conversor de letras cursivas para Nicks?', answer: 'Sí, muchos jugadores usan el conversor de letras cursivas para crear nicks únicos en Free Fire o PUBG. La estética fluida del conversor de letras cursivas destaca en las listas de jugadores.' },
      { question: '¿Sirve este conversor de letras cursivas para tatuajes?', answer: '¡Por supuesto! El conversor de letras cursivas es excelente para previsualizar nombres antes de tatuarlos. Simplemente escribe en el conversor de letras cursivas y muestra el diseño a tu artista.' }
    ]
  },
  tatuajes: {
    path: '/letras-tatuajes',
    title: 'Conversor de Letras para Tatuajes Online',
    heading: 'Conversor de Letras para Tatuajes',
    description: 'Prueba diseños con el conversor de letras para tatuajes. Encuentra fuentes góticas y cursivas en este conversor de letras para tatuajes.',
    content: 'Diseñar arte corporal requiere precisión, y nuestro conversor de letras para tatuajes es la herramienta perfecta para visualizar tus ideas. Ya sea que busques un estilo chicano, gótico o minimalista, este conversor de letras para tatuajes te ofrece una vista previa instantánea. Ahorra tiempo explicándole a tu artista lo que quieres; usa el conversor de letras para tatuajes para generar la referencia exacta. Miles de usuarios confían en nuestro conversor de letras para tatuajes para decidir la tipografía de fechas importantes, nombres y frases célebres. El conversor de letras para tatuajes es tu primer paso hacia la tinta.',
    filter: (f) => f.pages.includes('tatuajes'),
    whyFeatures: [
      { title: 'Previsualización Real', description: 'El conversor de letras para tatuajes te permite ver cómo queda tu frase en diferentes estilos antes de la tinta.', icon: 'palette' },
      { title: 'Estilos Clásicos', description: 'Nuestro conversor de letras para tatuajes incluye fuentes Chicano, Old English y Script.', icon: 'star' },
      { title: 'Sin Instalación', description: 'No necesitas instalar fuentes; el conversor de letras para tatuajes funciona en tu navegador.', icon: 'zap' }
    ],
    howToSteps: [
      'Escribe tu idea en el conversor de letras para tatuajes.',
      'Filtra entre estilos góticos y cursivos en el conversor de letras para tatuajes.',
      'Añade símbolos especiales disponibles en el conversor de letras para tatuajes.',
      'Lleva el diseño del conversor de letras para tatuajes a tu estudio de confianza.'
    ],
    faqs: [
      { question: '¿Cómo elegir en el conversor de letras para tatuajes?', answer: 'El conversor de letras para tatuajes ofrece variedad. Para zonas grandes, usa estilos góticos del conversor de letras para tatuajes. Para muñecas o dedos, busca las opciones cursivas finas en el conversor de letras para tatuajes.' },
      { question: '¿Son gratis las fuentes del conversor de letras para tatuajes?', answer: 'Sí, el conversor de letras para tatuajes genera caracteres Unicode de dominio público, por lo que puedes tatuarte cualquier diseño salido de este conversor de letras para tatuajes sin problemas de licencia.' },
      { question: '¿Puedo combinar estilos en el conversor de letras para tatuajes?', answer: 'Sí, puedes generar una palabra en un estilo y otra en otro usando el conversor de letras para tatuajes, y luego unirlas para crear una composición única.' }
    ]
  },
  goticas: {
    path: '/letras-goticas',
    title: 'Conversor de Letras Góticas (Dark & Blackletter)',
    heading: 'Conversor de Letras Góticas',
    description: 'Genera textos oscuros con el conversor de letras goticas. Ideal para nicks y bios darks, usa nuestro conversor de letras goticas gratis.',
    content: 'El estilo Blackletter nunca pasa de moda, y nuestro conversor de letras goticas lo trae a la era digital. Este conversor de letras goticas es esencial para crear una estética "dark", misteriosa o antigua en tus perfiles. Muy popular entre la comunidad gamer y metalera, el conversor de letras goticas transforma caracteres simples en símbolos Fraktur complejos. Si quieres imponer respeto en tu clan o biografía, utiliza el conversor de letras goticas. La legibilidad y el impacto visual son las prioridades de nuestro conversor de letras goticas especializado.',
    filter: (f) => f.pages.includes('goticas'),
    whyFeatures: [
      { title: 'Impacto Visual', description: 'El conversor de letras goticas genera textos Fraktur que captan la atención inmediatamente.', icon: 'shield' },
      { title: 'Perfecto para Gamers', description: 'Usa el conversor de letras goticas para crear nicks intimidantes en juegos competitivos.', icon: 'smartphone' },
      { title: 'Estética Dark', description: 'El conversor de letras goticas es ideal para perfiles con temática oscura, emo o alternativa.', icon: 'star' }
    ],
    howToSteps: [
      'Escribe tu nick en el conversor de letras goticas.',
      'Selecciona entre Fraktur normal o negrita en el conversor de letras goticas.',
      'Copia el resultado directamente del conversor de letras goticas.',
      'Pégalo en tu juego o red social favorita compatible con el conversor de letras goticas.'
    ],
    faqs: [
      { question: '¿Qué es el estilo Fraktur del conversor de letras goticas?', answer: 'Es un tipo de caligrafía alemana antigua. Nuestro conversor de letras goticas utiliza símbolos matemáticos Unicode que imitan este estilo. El conversor de letras goticas hace accesible esta tipografía histórica para la web.' },
      { question: '¿El conversor de letras goticas funciona en Instagram?', answer: 'Sí, Instagram soporta perfectamente los caracteres generados por el conversor de letras goticas. Puedes usar el conversor de letras goticas para tu nombre de perfil o descripción.' },
      { question: '¿Son difíciles de leer los textos del conversor de letras goticas?', answer: 'Tienen trazos complejos, pero el conversor de letras goticas prioriza versiones legibles. Aun así, recomendamos usar el conversor de letras goticas para palabras clave cortas.' }
    ]
  },
  graffiti: {
    path: '/letras-graffiti',
    title: 'Conversor de Letras Graffiti y Urbano',
    heading: 'Conversor de Letras Graffiti',
    description: 'Crea textos urbanos con el conversor de letras graffiti. Estilos burbuja y callejeros en este conversor de letras graffiti online.',
    content: 'Dale un toque callejero a tu presencia digital con el conversor de letras graffiti. Este estilo vibrante y rebelde es posible gracias a los caracteres de doble trazo y burbujas que ofrece nuestro conversor de letras graffiti. Ya sea para comentarios divertidos o títulos de videos, el conversor de letras graffiti asegura que tu mensaje destaque visualmente. La cultura urbana se encuentra con la tecnología en este conversor de letras graffiti. No te conformes con texto plano, usa el conversor de letras graffiti para expresar tu lado más creativo y moderno.',
    filter: (f) => f.pages.includes('graffiti'),
    whyFeatures: [
      { title: 'Estilo Urbano', description: 'El conversor de letras graffiti lleva el arte callejero directamente a tus textos digitales.', icon: 'palette' },
      { title: 'Destaca en Comentarios', description: 'Las fuentes del conversor de letras graffiti ocupan más espacio visual y llaman la atención.', icon: 'star' },
      { title: 'Diversión Pura', description: 'El conversor de letras graffiti es perfecto para mensajes informales y divertidos.', icon: 'heart' }
    ],
    howToSteps: [
      'Introduce tu texto para "graffitear" en el conversor de letras graffiti.',
      'Elige estilos de burbujas o doble trazo en el conversor de letras graffiti.',
      'Copia el arte generado por el conversor de letras graffiti.',
      'Pégalo en comentarios o foros compatibles con el conversor de letras graffiti.'
    ],
    faqs: [
      { question: '¿Qué son las letras Double Struck del conversor de letras graffiti?', answer: 'Son caracteres con contorno doble que simulan el estilo urbano. El conversor de letras graffiti los utiliza para imitar el arte callejero o universitario.' },
      { question: '¿El conversor de letras graffiti funciona en WhatsApp?', answer: 'Sí, los estilos de burbujas del conversor de letras graffiti se ven perfectos en chats. Sorprende a tus amigos usando el conversor de letras graffiti en tus mensajes.' },
      { question: '¿Puedo usar números en el conversor de letras graffiti?', answer: 'Sí, nuestro conversor de letras graffiti también transforma los números al estilo de doble trazo o burbuja, ideal para fechas.' }
    ]
  },
  amino: {
    path: '/letras-amino',
    title: 'Conversor de Letras Amino (Compatibles)',
    heading: 'Conversor de Letras Amino',
    description: 'El único conversor de letras amino optimizado. Crea blogs estéticos con fuentes seguras usando el conversor de letras amino.',
    content: 'La comunidad Amino valora la estética, y nuestro conversor de letras amino está diseñado específicamente para ello. A diferencia de generadores genéricos, este conversor de letras amino filtra los caracteres que suelen dar error en la app. Si quieres que tus wikis, blogs y perfiles luzcan profesionales, necesitas el conversor de letras amino. Evita los molestos cuadros vacíos y asegura la legibilidad con nuestra herramienta. El conversor de letras amino es el secreto de los usuarios más populares para decorar sus publicaciones y títulos.',
    filter: (f) => f.pages.includes('amino'),
    whyFeatures: [
      { title: '100% Compatible', description: 'El conversor de letras amino filtra solo las fuentes que se visualizan correctamente en la App.', icon: 'check' },
      { title: 'Blogs Estéticos', description: 'Usa el conversor de letras amino para crear títulos llamativos y separar secciones.', icon: 'palette' },
      { title: 'Nombres de Perfil', description: 'Haz que tu perfil destaque en la lista de miembros con el conversor de letras amino.', icon: 'star' }
    ],
    howToSteps: [
      'Escribe el título de tu blog en el conversor de letras amino.',
      'Elige un estilo decorativo seguro del conversor de letras amino.',
      'Copia el texto estilizado desde el conversor de letras amino.',
      'Abre la app y pega el diseño creado con el conversor de letras amino.'
    ],
    faqs: [
      { question: '¿Por qué usar este conversor de letras amino específico?', answer: 'Porque Amino en Android antiguos tiene problemas con ciertos Unicode. Este conversor de letras amino selecciona los rangos más seguros para garantizar que todos vean tu decoración.' },
      { question: '¿Cómo centrar texto del conversor de letras amino?', answer: 'Para centrar, usa el código [C] en la app. El texto generado por el conversor de letras amino funciona perfectamente dentro de esos códigos de formato.' },
      { question: '¿El conversor de letras amino sirve para títulos?', answer: 'Sí, las letras "Small Caps" del conversor de letras amino son las favoritas para títulos elegantes y limpios en la comunidad.' }
    ]
  },
  facebook: {
    path: '/letras-facebook',
    title: 'Conversor de Letras para Facebook (Anti-Ban)',
    heading: 'Conversor de Letras para Facebook',
    description: 'Mejora tus posts con el conversor de letras para facebook. Fuentes legibles y seguras en este conversor de letras para facebook.',
    content: 'Facebook es estricto con los formatos, pero nuestro conversor de letras para facebook te permite personalizar tus posts sin perder visibilidad. Este conversor de letras para facebook selecciona tipografías claras como Serif y Sans-Serif negrita que no confunden al algoritmo. Ya sea para anuncios, grupos o estados personales, el conversor de letras para facebook te ayuda a resaltar lo importante. No arriesgues el alcance de tu publicación con caracteres extraños; usa el conversor de letras para facebook para garantizar compatibilidad y estilo profesional.',
    filter: (f) => f.pages.includes('facebook'),
    whyFeatures: [
      { title: 'Anti-Spam', description: 'El conversor de letras para facebook evita caracteres que la plataforma marca como ilegibles.', icon: 'shield' },
      { title: 'Visibilidad Feed', description: 'El conversor de letras para facebook asegura que tus amigos vean el texto tal como lo diseñaste.', icon: 'check' },
      { title: 'Grupos y Páginas', description: 'Destaca tus anuncios con tipografías únicas del conversor de letras para facebook.', icon: 'star' }
    ],
    howToSteps: [
      'Escribe tu estado en el conversor de letras para facebook.',
      'Selecciona estilos legibles recomendados por el conversor de letras para facebook.',
      'Copia el texto generado por el conversor de letras para facebook.',
      'Publica en tu muro sin miedo a errores gracias al conversor de letras para facebook.'
    ],
    faqs: [
      { question: '¿Puedo cambiar mi nombre con el conversor de letras para facebook?', answer: 'Facebook exige nombres reales. Recomendamos usar el conversor de letras para facebook para "Apodos" o en la descripción, pero no en el nombre legal principal.' },
      { question: '¿El conversor de letras para facebook funciona en Messenger?', answer: 'Sí, puedes enviar mensajes estilizados con el conversor de letras para facebook a través de Messenger y se verán correctamente.' },
      { question: '¿Es seguro el conversor de letras para facebook para Ads?', answer: 'Sí, pero úsalo con moderación. El conversor de letras para facebook es genial para resaltar una palabra clave en tu anuncio (CTA).' }
    ]
  },
  tattoo: {
    path: '/letras-tattoo',
    title: 'Conversor de Letras Tattoo (Diseños Gratis)',
    heading: 'Conversor de Letras Tattoo',
    description: 'El mejor conversor de letras tattoo para inspirarte. Crea diseños únicos de piel con el conversor de letras tattoo.',
    content: 'Encontrar la fuente perfecta para tu piel es fácil con el conversor de letras tattoo. Esta herramienta especializada combina lo mejor de la tipografía clásica y moderna. Si buscas un conversor de letras tattoo que te ofrezca variedad y rapidez, has llegado al lugar correcto. Desde nombres minimalistas hasta frases complejas, el conversor de letras tattoo te permite experimentar sin coste alguno. Es la referencia visual ideal para llevar a tu estudio; el conversor de letras tattoo puentea la brecha entre tu idea y la aguja del artista.',
    filter: (f) => f.pages.includes('tattoo'),
    whyFeatures: [
      { title: 'Inspiración Artística', description: 'El conversor de letras tattoo combina estilos para crear diseños de tatuajes únicos.', icon: 'palette' },
      { title: 'Prueba Rápida', description: 'Ahorra tiempo probando docenas de fuentes en segundos con el conversor de letras tattoo.', icon: 'zap' },
      { title: 'Gratis', description: 'Diseña tu próximo tattoo usando el conversor de letras tattoo sin gastar en software.', icon: 'heart' }
    ],
    howToSteps: [
      'Piensa en la palabra clave y escríbela en el conversor de letras tattoo.',
      'Busca estilos "Old English" en el conversor de letras tattoo.',
      'Haz una captura del resultado del conversor de letras tattoo.',
      'Muestra el diseño del conversor de letras tattoo a tu tatuador.'
    ],
    faqs: [
      { question: '¿Qué estilo es mejor en el conversor de letras tattoo para zonas pequeñas?', answer: 'Para tatuajes pequeños, el conversor de letras tattoo recomienda fuentes Sans-Serif o Manuscritas simples para asegurar que la tinta no se expanda y lo haga ilegible.' },
      { question: '¿El conversor de letras tattoo sirve para fechas?', answer: 'Sí, el conversor de letras tattoo incluye estilos numéricos romanos y góticos perfectos para inmortalizar fechas importantes en tu piel.' },
      { question: '¿Es compatible el conversor de letras tattoo con stencils?', answer: 'Los tatuadores usan el resultado del conversor de letras tattoo como referencia visual perfecta para crear el stencil final.' }
    ]
  }
};

export const NAVIGATION_LINKS: NavLink[] = [
  { label: 'Inicio', path: '/' },
  { label: 'Cursivas', path: '/letras-cursivas' },
  { label: 'Góticas', path: '/letras-goticas' },
  { label: 'Tatuajes', path: '/letras-tatuajes' },
  { label: 'Graffiti', path: '/letras-graffiti' },
  { label: 'Amino', path: '/letras-amino' },
  { label: 'Facebook', path: '/letras-facebook' },
  { label: 'Tattoo', path: '/letras-tattoo' },
  { label: 'Blog', path: '/blog' },
];