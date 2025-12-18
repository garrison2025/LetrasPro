import { PageConfig, NavLink } from './types';

export const PAGE_CONFIGS: Record<string, PageConfig> = {
  home: {
    path: '/',
    title: 'Conversor de Letras Bonitas (Copiar y Pegar) - Fuentes Pro 2025',
    heading: 'Conversor de Letras Bonitas',
    description: 'El mejor conversor de letras bonitas para Instagram, TikTok y WhatsApp. Transforma tu texto con nuestro conversor de letras bonitas gratuito.',
    content: 'Si buscas destacar en redes sociales, nuestro conversor de letras bonitas es la herramienta definitiva que estabas esperando. A diferencia de otros sitios, este conversor de letras bonitas utiliza tecnología Unicode avanzada para transformar tu texto plano en más de 140 estilos tipográficos únicos. Usar un conversor de letras bonitas profesional te garantiza que tus biografías, estados y mensajes sean legibles y estéticamente perfectos en cualquier dispositivo. Deja de usar fuentes aburridas; el conversor de letras bonitas es tu aliado para viralizar contenido.',
    filter: (f) => f.pages.includes('home'),
    whyFeatures: [
      { title: 'El Conversor de Letras Bonitas más completo', description: 'Nuestra base de datos supera a cualquier otro conversor de letras bonitas, ofreciendo alfabetos verificados para máxima compatibilidad.', icon: 'star' },
      { title: 'Optimización del Conversor de Letras Bonitas', description: 'Hemos programado este conversor de letras bonitas para respetar acentos y la letra ñ, algo que la competencia olvida.', icon: 'zap' },
      { title: 'Conversor de Letras Bonitas Gratuito', description: 'Accede a todas las funciones premium de nuestro conversor de letras bonitas sin pagar ni registrarte.', icon: 'check' }
    ],
    howToSteps: [
      'Escribe tu frase en la caja superior de nuestro conversor de letras bonitas.',
      'Desplázate hacia abajo para ver cómo el conversor de letras bonitas transforma tu texto en tiempo real.',
      'Elige el estilo que más te guste del conversor de letras bonitas.',
      'Haz clic en la tarjeta para copiar y pega el resultado donde quieras.'
    ],
    faqs: [
      { question: '¿Qué es un conversor de letras bonitas?', answer: 'Un conversor de letras bonitas es una herramienta digital que traduce caracteres normales a símbolos Unicode estéticos que imitan fuentes tipográficas.' },
      { question: '¿Es gratis este conversor de letras bonitas?', answer: 'Sí, nuestro conversor de letras bonitas es 100% gratuito y no tiene límites de uso diario.' },
      { question: '¿Dónde puedo usar el conversor de letras bonitas?', answer: 'Puedes usar el resultado de nuestro conversor de letras bonitas en Instagram, Facebook, TikTok, WhatsApp, Twitter y Nicks de juegos.' }
    ]
  },
  cursivas: {
    path: '/letras-cursivas',
    title: 'Conversor de Letras Cursivas - Generador de Escritura a Mano',
    heading: 'Conversor de Letras Cursivas',
    description: 'Transforma textos a manuscrita con el mejor conversor de letras cursivas. Ideal para invitaciones y nombres elegantes.',
    filter: (f) => f.pages.includes('cursivas') || f.category === 'script',
    content: 'La elegancia nunca pasa de moda, y nuestro conversor de letras cursivas está aquí para demostrarlo. Este conversor de letras cursivas se especializa en replicar trazos humanos, firmas y caligrafía antigua. Al utilizar un conversor de letras cursivas de alta calidad, aseguras que cada letra conecte visualmente con la siguiente, creando un flujo natural. Ya sea para un post romántico o una invitación formal, este conversor de letras cursivas ofrece variantes negritas, finas y decoradas que elevarán tu mensaje al siguiente nivel.',
    whyFeatures: [
      { title: 'Variedad en el Conversor de Letras Cursivas', description: 'Desde trazos finos hasta pinceladas gruesas, nuestro conversor de letras cursivas lo tiene todo.', icon: 'palette' },
      { title: 'Conversor de Letras Cursivas Legible', description: 'Priorizamos estilos en el conversor de letras cursivas que se entienden fácilmente en pantallas pequeñas.', icon: 'eye' },
      { title: 'Estilo Manuscrito Real', description: 'El algoritmo del conversor de letras cursivas simula la presión de una pluma real.', icon: 'pen-tool' }
    ],
    howToSteps: [
      'Introduce el nombre o frase en el conversor de letras cursivas.',
      'Explora las opciones de "Script" y "Handwriting" que genera el conversor de letras cursivas.',
      'Selecciona tu estilo favorito dentro del conversor de letras cursivas.',
      'Copia el texto cursivo y pégalo en tu biografía o diseño.'
    ],
    faqs: [
      { question: '¿Funciona el conversor de letras cursivas en Instagram?', answer: 'Sí, los caracteres generados por el conversor de letras cursivas son compatibles con la biografía y captions de Instagram.' },
      { question: '¿Tiene tildes el conversor de letras cursivas?', answer: 'Nuestro conversor de letras cursivas avanzado soporta la mayoría de caracteres acentuados del español.' }
    ]
  },
  tatuajes: {
    path: '/letras-tatuajes',
    title: 'Conversor de Letras para Tatuajes - Diseña tu Tattoo Gratis',
    heading: 'Conversor de Letras para Tatuajes',
    description: 'Diseña tu piel con el conversor de letras para tatuajes. Simula estilos Chicano, Gótico y Minimalista antes de tatuarte.',
    filter: (f) => f.pages.includes('tatuajes'),
    content: 'Antes de marcar tu piel permanentemente, utiliza nuestro conversor de letras para tatuajes para visualizar tu idea. Este conversor de letras para tatuajes es una herramienta esencial tanto para clientes como para artistas. Con el conversor de letras para tatuajes, puedes experimentar con estilos Chicanos, Old English y Fine Line sin dolor ni compromiso. Un buen conversor de letras tatuajes te ayuda a decidir el grosor y la legibilidad adecuada para la zona del cuerpo que elijas. No te tatúes sin probar primero tus opciones en el conversor de letras para tatuajes líder del mercado.',
    whyFeatures: [
      { title: 'Previsualiza con el Conversor de Letras Tatuajes', description: 'Evita arrepentimientos usando el conversor de letras para tatuajes para ver el diseño final.', icon: 'shield' },
      { title: 'Estilos Exclusivos del Conversor de Letras Tatuajes', description: 'Incluimos fuentes Chicanas y de caligrafía gángster en este conversor de letras para tatuajes.', icon: 'star' },
      { title: 'Inspiración para tu Conversor de Letras Tatuajes', description: 'Encuentra la fuente perfecta para nombres y fechas con el conversor de letras para tatuajes.', icon: 'heart' }
    ],
    howToSteps: [
      'Escribe la fecha o nombre en el conversor de letras para tatuajes.',
      'Filtra por estilos góticos o manuscritos dentro del conversor de letras tatuajes.',
      'Haz una captura de tu opción favorita del conversor de letras para tatuajes.',
      'Muestra el diseño generado por el conversor de letras para tatuajes a tu artista.'
    ],
    faqs: [
      { question: '¿Es preciso el conversor de letras para tatuajes?', answer: 'El conversor de letras para tatuajes utiliza fuentes basadas en estilos de tatuaje real para máxima precisión.' },
      { question: '¿Puedo usar el conversor de letras tatuajes para logos?', answer: 'Absolutamente, el conversor de letras para tatuajes genera diseños únicos perfectos para marcas personales.' }
    ]
  },
  goticas: {
    path: '/letras-goticas',
    title: 'Conversor de Letras Góticas - Fuentes Dark y Medievales',
    heading: 'Conversor de Letras Góticas',
    description: 'Crea nicks oscuros con el conversor de letras goticas. Estilos Fraktur, Medieval y Blackletter para gamers.',
    filter: (f) => f.pages.includes('goticas') || f.category === 'gothic',
    content: 'Impon respeto en el juego con nuestro conversor de letras goticas. El estilo gótico evoca poder, antigüedad y misterio, y este conversor de letras goticas te ofrece la colección más amplia de alfabetos oscuros. Ya sea para un Nick de Free Fire o un título de post, el conversor de letras goticas transforma texto aburrido en arte medieval. Nuestro conversor de letras goticas incluye variantes Fraktur bold (negrita) y outline (bordeada). Los clanes de eSports utilizan frecuentemente este conversor de letras goticas para unificar sus nombres y destacar en la tabla de clasificación.',
    whyFeatures: [
      { title: 'Impacto Visual del Conversor de Letras Goticas', description: 'Las fuentes generadas por el conversor de letras goticas son densas y llaman la atención inmediatamente.', icon: 'zap' },
      { title: 'Variedad en el Conversor de Letras Goticas', description: 'Ofrecemos estilos medievales clásicos y góticos modernos en este conversor de letras goticas.', icon: 'moon' },
      { title: 'Conversor de Letras Goticas para Gamers', description: 'Optimizado para nicks de juegos, el conversor de letras goticas asegura compatibilidad.', icon: 'gamepad' }
    ],
    howToSteps: [
      'Ingresa tu Nick o texto en el conversor de letras goticas.',
      'Elige entre gótica suave o intensa en el conversor de letras goticas.',
      'Copia el resultado del conversor de letras goticas.',
      'Pégalo en tu perfil de juego o red social para un look dark.'
    ],
    faqs: [
      { question: '¿Qué es el conversor de letras goticas?', answer: 'Es una herramienta que convierte texto normal en caracteres alfanuméricos de estilo Fraktur y Blackletter.' },
      { question: '¿Sirve el conversor de letras goticas para Free Fire?', answer: 'Sí, el conversor de letras goticas es ideal para crear nicks intimidantes en juegos Battle Royale.' }
    ]
  },
  graffiti: {
    path: '/letras-graffiti',
    title: 'Conversor de Letras Graffiti - Generador de Texto Urbano',
    heading: 'Conversor de Letras Graffiti',
    description: 'Estilo callejero con el conversor de letras graffiti. Burbujas, tags y spray para tus textos digitales.',
    filter: (f) => f.pages.includes('graffiti'),
    content: 'Lleva el arte de la calle a tu pantalla con el conversor de letras graffiti. Este generador captura la esencia del hip-hop y el arte urbano, permitiéndote crear textos estilo burbuja, tags y bloques. El conversor de letras graffiti es perfecto para destacar con un estilo rebelde y juvenil. A diferencia de fuentes rígidas, el conversor de letras graffiti ofrece formas redondeadas y dinámicas. Úsalo para títulos de vídeos, comentarios destacados o biografías con flow. Nuestro conversor de letras graffiti es la herramienta número uno para amantes de la cultura urbana.',
    whyFeatures: [
      { title: 'Estilo Urbano con el Conversor de Letras Graffiti', description: 'Auténticos estilos de burbuja y bloque disponibles en el conversor de letras graffiti.', icon: 'star' },
      { title: 'Conversor de Letras Graffiti Compatible', description: 'Los caracteres del conversor de letras graffiti funcionan en la mayoría de redes sociales.', icon: 'check' },
      { title: 'Creatividad en el Conversor de Letras Graffiti', description: 'Mezcla estilos para crear tu propio tag digital con el conversor de letras graffiti.', icon: 'palette' }
    ],
    howToSteps: [
      'Teclea tu texto urbano en el conversor de letras graffiti.',
      'Busca los estilos de burbuja o cuadrados en el conversor de letras graffiti.',
      'Selecciona y copia tu diseño del conversor de letras graffiti.',
      'Pega tu texto graffiti en comentarios o estados para destacar.'
    ],
    faqs: [
      { question: '¿Son legibles las fuentes del conversor de letras graffiti?', answer: 'Sí, el conversor de letras graffiti equilibra estilo y legibilidad para que todos entiendan tu mensaje.' },
      { question: '¿Es gratis el conversor de letras graffiti?', answer: 'Totalmente, disfruta de todos los estilos urbanos del conversor de letras graffiti sin costo.' }
    ]
  },
  amino: {
    path: '/letras-amino',
    title: 'Conversor de Letras Amino - Fuentes Aesthetic para Wikis',
    heading: 'Conversor de Letras Amino',
    description: 'Decora tus blogs y wikis con el conversor de letras amino. Estilos aesthetic verificados para la app Amino.',
    filter: (f) => f.pages.includes('amino'),
    content: 'La comunidad de Amino valora la estética por encima de todo, y nuestro conversor de letras amino está diseñado específicamente para ello. Hemos filtrado las fuentes que causan errores en la app para ofrecerte un conversor de letras amino 100% compatible. Crea títulos hermosos para tus blogs, biografías de rol y wikis con el conversor de letras amino. Desde estilos "small caps" hasta decoraciones vaporwave, este conversor de letras amino tiene todo lo que necesitas para ser un usuario destacado. No arruines tu post con cuadros vacíos; usa el conversor de letras amino seguro.',
    whyFeatures: [
      { title: 'Compatibilidad del Conversor de Letras Amino', description: 'Garantizamos que las fuentes del conversor de letras amino se ven bien en la app.', icon: 'smartphone' },
      { title: 'Estética Aesthetic en el Conversor de Letras Amino', description: 'Fuentes suaves y minimalistas ideales para el conversor de letras amino.', icon: 'heart' },
      { title: 'Organiza con el Conversor de Letras Amino', description: 'Usa distintos estilos del conversor de letras amino para jerarquizar tus blogs.', icon: 'list' }
    ],
    howToSteps: [
      'Escribe el título de tu blog en el conversor de letras amino.',
      'Elige una fuente aesthetic del conversor de letras amino.',
      'Copia el texto decorado del conversor de letras amino.',
      'Pégalo en tu Wiki o Bio de Amino para ganar seguidores.'
    ],
    faqs: [
      { question: '¿Por qué usar un conversor de letras amino?', answer: 'El conversor de letras amino ayuda a que tus publicaciones destaquen en el feed y sean más atractivas.' },
      { question: '¿Funciona el conversor de letras amino en Android?', answer: 'Sí, el conversor de letras amino está optimizado para Android e iOS.' }
    ]
  },
  facebook: {
    path: '/letras-facebook',
    title: 'Conversor de Letras para Facebook - Negritas y Formatos',
    heading: 'Conversor de Letras para Facebook',
    description: 'Cambia la fuente de tus posts con el conversor de letras para facebook. Negritas, itálicas y listas para aumentar el alcance.',
    content: 'Facebook no permite nativamente cambiar el formato del texto, pero nuestro conversor de letras para facebook rompe esa limitación. Utiliza el conversor de letras para facebook para escribir títulos en negrita, listas ordenadas y frases destacadas que detienen el scroll. El algoritmo de Facebook favorece el contenido que retiene la atención, y usar un conversor de letras para facebook es la mejor estrategia para lograrlo. Este conversor de letras para facebook ofrece estilos legibles y profesionales, perfectos para páginas de negocios y grupos. Potencia tus anuncios y estados con el conversor de letras para facebook.',
    filter: (f) => f.pages.includes('facebook'),
    whyFeatures: [
      { title: 'Aumenta Alcance con el Conversor de Letras para Facebook', description: 'Los posts formateados con el conversor de letras para facebook tienen mayor CTR.', icon: 'trending-up' },
      { title: 'Negritas Reales en el Conversor de Letras para Facebook', description: 'Consigue el efecto negrita en tus estados con el conversor de letras para facebook.', icon: 'bold' },
      { title: 'Conversor de Letras para Facebook Seguro', description: 'Caracteres seguros que no son marcados como spam gracias al conversor de letras para facebook.', icon: 'shield' }
    ],
    howToSteps: [
      'Redacta tu estado o anuncio en el conversor de letras para facebook.',
      'Selecciona el estilo negrita o serif en el conversor de letras para facebook.',
      'Copia el texto formateado del conversor de letras para facebook.',
      'Publica en tu muro o grupo y observa la reacción.'
    ],
    faqs: [
      { question: '¿Me pueden banear por usar el conversor de letras para facebook?', answer: 'No, el conversor de letras para facebook usa caracteres Unicode legítimos permitidos por la plataforma.' },
      { question: '¿Funciona el conversor de letras para facebook en móviles?', answer: 'Sí, el texto del conversor de letras para facebook es visible en la app móvil y escritorio.' }
    ]
  },
  tattoo: {
    path: '/letras-tattoo',
    title: 'Conversor de Letras Tattoo - Tipografías para Piel',
    heading: 'Conversor de Letras Tattoo',
    description: 'Encuentra la inspiración con el conversor de letras tattoo. Lettering profesional y estilos de tinta para tu próximo diseño.',
    filter: (f) => f.pages.includes('tattoo'),
    content: 'El arte del lettering en la piel requiere precisión, y el conversor de letras tattoo es tu mejor herramienta de bocetado. Este conversor de letras tattoo ofrece una selección curada de fuentes que funcionan bien con aguja y tinta. Desde caligrafía clásica hasta estilos tribales, el conversor de letras tattoo cubre todas las tendencias actuales. Muchos estudios recomiendan a sus clientes usar un conversor de letras tattoo para traer ideas claras. No dejes tu diseño al azar; visualiza, prueba y decide con el conversor de letras tattoo más fiable de la web. Tu piel merece el mejor diseño del conversor de letras tattoo.',
    whyFeatures: [
      { title: 'Diseño Profesional con el Conversor de Letras Tattoo', description: 'Fuentes seleccionadas por su aptitud para ser tatuadas en el conversor de letras tattoo.', icon: 'pen-tool' },
      { title: 'Visualización en el Conversor de Letras Tattoo', description: 'Imagina cómo quedará la frase con el conversor de letras tattoo.', icon: 'eye' },
      { title: 'Estilos Variados en el Conversor de Letras Tattoo', description: 'Encuentra desde minimalismo hasta barroco en el conversor de letras tattoo.', icon: 'layers' }
    ],
    howToSteps: [
      'Ingresa tu frase significativa en el conversor de letras tattoo.',
      'Navega por las opciones de lettering del conversor de letras tattoo.',
      'Guarda tus favoritas del conversor de letras tattoo.',
      'Consulta con tu tatuador mostrando el resultado del conversor de letras tattoo.'
    ],
    faqs: [
      { question: '¿Es útil el conversor de letras tattoo para tatuadores?', answer: 'Sí, muchos profesionales usan el conversor de letras tattoo como referencia rápida para clientes.' },
      { question: '¿Qué estilos tiene el conversor de letras tattoo?', answer: 'El conversor de letras tattoo incluye Chicano, Blackwork, Minimalista y Tradicional.' }
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