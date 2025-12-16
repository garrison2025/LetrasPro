import { PageConfig, NavLink } from './types';

export const PAGE_CONFIGS: Record<string, PageConfig> = {
  home: {
    path: '/',
    title: 'Conversor de Letras Bonitas (Copiar y Pegar)',
    heading: 'Conversor de Letras Bonitas',
    description: 'Transforma tu texto en fuentes únicas para Instagram, Twitter, Facebook y más. Escribe, copia y pega.',
    content: 'Bienvenido al mejor conversor de letras bonitas. Aquí encontrarás todas las variedades de estilos, desde cursivas elegantes hasta letras góticas impactantes. Utiliza nuestra herramienta para destacar en tus biografías y posts.',
    filter: (f) => f.pages.includes('home'),
    whyFeatures: [
      { title: '100% Gratis y Rápido', description: 'Nuestro conversor de letras bonitas es gratuito y genera resultados al instante.', icon: 'zap' },
      { title: 'Compatible Universal', description: 'Funciona en Instagram, TikTok, Facebook, Twitter y WhatsApp sin errores.', icon: 'smartphone' },
      { title: 'Variedad de Estilos', description: 'Más de 70 fuentes diferentes: cursivas, góticas, emojis y símbolos.', icon: 'palette' }
    ],
    howToSteps: [
      'Escribe tu frase o nombre en el cuadro de texto superior.',
      'Desplázate hacia abajo para ver todas las variedades de letras bonitas generadas.',
      'Haz clic en el estilo que más te guste para copiarlo automáticamente.',
      'Pégalo en tu biografía de Instagram, estado de WhatsApp o tweet.'
    ],
    faqs: [
      { question: '¿Qué es un conversor de letras bonitas?', answer: 'Es una herramienta que transforma texto normal en símbolos Unicode que parecen fuentes estilizadas. No cambia la fuente real, sino los caracteres, permitiendo usarlos en redes sociales.' },
      { question: '¿Funcionan estas letras en Instagram?', answer: 'Sí, absolutamente. Puedes usarlas en tu biografía (bio), comentarios, pies de foto e historias.' },
      { question: '¿Por qué veo cuadrados en lugar de letras?', answer: 'Si tu dispositivo es muy antiguo, es posible que no soporte algunos caracteres Unicode modernos. Sin embargo, la mayoría de nuestros estilos son compatibles con iOS y Android actuales.' }
    ]
  },
  cursivas: {
    path: '/letras-cursivas',
    title: 'Conversor de Letras Cursivas y Manuscritas',
    heading: 'Letras Cursivas',
    description: 'Generador de letras cursivas y caligrafía para tatuajes y redes sociales.',
    content: 'Las letras cursivas evocan elegancia y estilo personal. Son perfectas para mensajes románticos, invitaciones digitales o para diseñar tatuajes con nombres. Nuestra herramienta convierte tu texto normal en bellos caracteres de script.',
    filter: (f) => f.pages.includes('cursivas'),
    whyFeatures: [
      { title: 'Elegancia Instantánea', description: 'Transforma textos aburridos en caligrafía sofisticada en segundos.', icon: 'star' },
      { title: 'Ideal para Nombres', description: 'El estilo perfecto para destacar nombres propios en perfiles sociales.', icon: 'heart' },
      { title: 'Legibilidad Alta', description: 'Seleccionamos estilos cursivos que se ven bien incluso en pantallas pequeñas.', icon: 'check' }
    ],
    howToSteps: [
      'Introduce el texto que deseas convertir a cursiva.',
      'Observa las variantes: desde cursiva negrita hasta manuscrita delicada.',
      'Copia el resultado haciendo clic sobre la tarjeta.',
      'Úsalo en tus invitaciones, emails o biografía.'
    ],
    faqs: [
      { question: '¿Cuál es la diferencia entre cursiva normal y negrita?', answer: 'La cursiva negrita (Bold Script) tiene trazos más gruesos y destaca más en títulos, mientras que la cursiva normal es más sutil y elegante.' },
      { question: '¿Puedo usar letras cursivas en mi Nick de Free Fire?', answer: 'Sí, muchos jugadores usan nuestro conversor de letras cursivas para darle un toque exclusivo a sus nicks de juego.' },
      { question: '¿Sirve para tatuajes?', answer: '¡Por supuesto! Es una excelente manera de previsualizar cómo se vería un nombre o frase en estilo manuscrito antes de tatuarte.' }
    ]
  },
  tatuajes: {
    path: '/letras-tatuajes',
    title: 'Conversor de Letras para Tatuajes',
    heading: 'Letras para Tatuajes',
    description: 'Fuentes ideales para tatuajes: góticas, cursivas y estilos artísticos.',
    content: '¿Buscas inspiración para tu próximo tatuaje? Prueba nuestros estilos góticos y cursivos. Estos caracteres Unicode son visualmente impactantes y funcionan perfectamente para maquetas de diseño de texto en piel.',
    filter: (f) => f.pages.includes('tatuajes'),
    whyFeatures: [
      { title: 'Previsualización Real', description: 'Escribe tu idea y mira cómo queda en diferentes estilos tipográficos.', icon: 'palette' },
      { title: 'Estilos Clásicos', description: 'Incluye Chicano, Gótico y Script, los más populares en el mundo del tattoo.', icon: 'star' },
      { title: 'Sin Instalación', description: 'No necesitas descargar fuentes .ttf, solo copia y envía el diseño a tu tatuador.', icon: 'zap' }
    ],
    howToSteps: [
      'Escribe la frase, nombre o fecha que planeas tatuarte.',
      'Explora las categorías Góticas y Cursivas que ofrece la herramienta.',
      'Prueba añadir símbolos como ★ o ✝ usando nuestra barra de herramientas.',
      'Copia el diseño final y muéstraselo a tu artista del tatuaje.'
    ],
    faqs: [
      { question: '¿Cómo elegir la mejor letra para un tatuaje?', answer: 'Depende de la zona del cuerpo y el mensaje. Las cursivas son ideales para nombres, mientras que las góticas funcionan bien en espalda o pecho para frases con fuerza.' },
      { question: '¿Estas fuentes son gratis para tatuar?', answer: 'Sí, los estilos generados son de uso libre ya que son caracteres Unicode universales.' },
      { question: '¿Puedo combinar estilos?', answer: 'Sí, puedes generar una palabra en gótico y otra en cursiva, copiarlas por separado y unirlas.' }
    ]
  },
  goticas: {
    path: '/letras-goticas',
    title: 'Conversor de Letras Góticas (Blackletter)',
    heading: 'Letras Góticas',
    description: 'Genera texto gótico oscuro y antiguo. Perfecto para nicks de juegos y estética dark.',
    content: 'El estilo gótico (o Blackletter) es denso, oscuro y dramático. Muy utilizado en la cultura del rock, metal y en juegos MMORPG para nicks de clanes. Convierte tu nombre en algo legendario.',
    filter: (f) => f.pages.includes('goticas'),
    whyFeatures: [
      { title: 'Impacto Visual', description: 'Las letras góticas (Fraktur) captan la atención inmediatamente.', icon: 'shield' },
      { title: 'Perfecto para Gamers', description: 'El estilo favorito para clanes y nicks en juegos competitivos.', icon: 'smartphone' },
      { title: 'Estética Dark', description: 'Ideal para perfiles con temática oscura, emo o metalera.', icon: 'star' }
    ],
    howToSteps: [
      'Escribe tu apodo o frase en el campo de texto.',
      'Busca los estilos "Fraktur" o "Gótica" en la lista de resultados.',
      'Elige entre la versión normal o la versión negrita (Bold) para más intensidad.',
      'Copia y pega en tu perfil de juego o red social.'
    ],
    faqs: [
      { question: '¿Qué es la letra Fraktur?', answer: 'Es un tipo de letra gótica alemana. Nuestro conversor utiliza los caracteres Unicode matemáticos que imitan este estilo histórico.' },
      { question: '¿Se aceptan letras góticas en Instagram?', answer: 'Sí, Instagram permite caracteres Unicode góticos tanto en la biografía como en los nombres de perfil.' },
      { question: '¿Son difíciles de leer?', answer: 'Tienen trazos complejos, pero la mayoría de nuestros estilos góticos están optimizados para ser legibles en pantallas móviles.' }
    ]
  },
  graffiti: {
    path: '/letras-graffiti',
    title: 'Conversor de Letras Graffiti y Burbujas',
    heading: 'Letras Graffiti',
    description: 'Estilos urbanos, letras en burbujas y doble trazo.',
    content: 'Dale un toque urbano a tus comentarios. Las letras de doble trazo (Double Struck) y las burbujas circulares destacan inmediatamente en el feed de cualquier red social.',
    filter: (f) => f.pages.includes('graffiti'),
    whyFeatures: [
      { title: 'Estilo Urbano', description: 'Lleva el arte callejero a tus textos digitales.', icon: 'palette' },
      { title: 'Destaca en Comentarios', description: 'Las letras de burbuja ocupan más espacio visual y llaman la atención.', icon: 'star' },
      { title: 'Diversión Pura', description: 'Perfecto para mensajes informales y divertidos entre amigos.', icon: 'heart' }
    ],
    howToSteps: [
      'Introduce tu texto para "graffitear".',
      'Selecciona el estilo de burbujas (Circled) o doble trazo (Double Struck).',
      'Copia el resultado.',
      'Pégalo en comentarios de YouTube, TikTok o foros.'
    ],
    faqs: [
      { question: '¿Qué son las letras Double Struck?', answer: 'Son caracteres que simulan tener un contorno o estar escritos en negrita de pizarra, muy similares al estilo de letra de las universidades americanas o el graffiti básico.' },
      { question: '¿Funcionan las letras burbuja en WhatsApp?', answer: 'Sí, WhatsApp soporta perfectamente los caracteres encerrados en círculos o paréntesis.' },
      { question: '¿Puedo usar números graffiti?', answer: 'Sí, nuestro conversor también transforma los números al estilo de doble trazo o burbuja.' }
    ]
  },
  amino: {
    path: '/letras-amino',
    title: 'Conversor de Letras Amino',
    heading: 'Letras para Amino',
    description: 'Fuentes compatibles con la app Amino. Destaca en tus blogs y chats.',
    content: 'Amino tiene una comunidad vibrante. Usa estos estilos probados para decorar tus blogs, wikis y perfiles sin miedo a que aparezcan cuadros vacíos.',
    filter: (f) => f.pages.includes('amino'),
    whyFeatures: [
      { title: '100% Compatible', description: 'Filtramos solo las fuentes que se visualizan correctamente en la App Amino.', icon: 'check' },
      { title: 'Blogs Estéticos', description: 'Ideal para crear títulos llamativos y separar secciones en tus wikis.', icon: 'palette' },
      { title: 'Nombres de Perfil', description: 'Haz que tu perfil destaque en la lista de miembros de tu comunidad.', icon: 'star' }
    ],
    howToSteps: [
      'Escribe el título de tu blog o tu nuevo nombre de usuario.',
      'Elige un estilo decorativo (como Small Caps o Espaciado).',
      'Copia el texto estilizado.',
      'Abre la app Amino y edita tu blog o perfil para pegar el nuevo diseño.'
    ],
    faqs: [
      { question: '¿Por qué algunas letras no se ven en Amino?', answer: 'Amino a veces tiene problemas con ciertos rangos de Unicode en dispositivos Android antiguos. Esta página selecciona los más seguros.' },
      { question: '¿Cómo centrar texto en Amino?', answer: 'Para centrar, debes usar el código [C] al inicio de la línea en el editor de Amino. Nuestras letras estilizadas funcionan dentro de ese código.' },
      { question: '¿Sirve para títulos de blogs?', answer: 'Sí, las letras "Small Caps" (mayúsculas pequeñas) son las favoritas para títulos elegantes en Amino.' }
    ]
  },
  facebook: {
    path: '/letras-facebook',
    title: 'Conversor de Letras para Facebook',
    heading: 'Conversor de Letras para Facebook',
    description: 'Conversor de letras para Facebook. Texto estilizado que funciona en posts y comentarios.',
    content: 'Facebook a veces restringe ciertos caracteres Unicode. Este conversor de letras para Facebook selecciona automáticamente los estilos que garantizan la legibilidad y compatibilidad en el feed de noticias, grupos y comentarios.',
    filter: (f) => f.pages.includes('facebook'),
    whyFeatures: [
      { title: 'Anti-Ban', description: 'Evita caracteres extraños que Facebook podría marcar como spam.', icon: 'shield' },
      { title: 'Visibilidad Feed', description: 'Asegura que tus amigos vean el texto tal como lo diseñaste.', icon: 'check' },
      { title: 'Grupos y Páginas', description: 'Destaca tus anuncios o reglas de grupo con tipografías únicas.', icon: 'star' }
    ],
    howToSteps: [
      'Escribe tu estado o comentario en el conversor.',
      'Selecciona estilos legibles como Serif Negrita o Sans Itálica.',
      'Copia el texto generado.',
      'Ve a Facebook y pégalo en tu muro. ¡Verás que se mantiene el formato!'
    ],
    faqs: [
      { question: '¿Puedo cambiar la letra de mi nombre en Facebook?', answer: 'Facebook es estricto con los nombres reales. Recomendamos usar estas letras para "Apodos" (en la sección "Otros nombres") o en biografías y posts, no en el nombre principal.' },
      { question: '¿Funciona en Facebook Messenger?', answer: 'Sí, puedes enviar mensajes con letras bonitas a través de Messenger sin problemas.' },
      { question: '¿Es seguro usar este conversor para Facebook Ads?', answer: 'Se recomienda usarlo con moderación en publicidad para no afectar la legibilidad y el rendimiento del anuncio.' }
    ]
  },
  tattoo: {
    path: '/letras-tattoo',
    title: 'Conversor de Letras Tattoo',
    heading: 'Conversor de Letras Tattoo',
    description: 'Conversor de letras tattoo con variedad de fuentes para diseño de tatuajes y arte corporal.',
    content: 'Utiliza nuestro conversor de letras tattoo para explorar una mezcla de estilos agresivos, góticos y artísticos. Es la herramienta perfecta para visualizar frases y nombres antes de plasmarlos en tu piel.',
    filter: (f) => f.pages.includes('tattoo'),
    whyFeatures: [
      { title: 'Inspiración Artística', description: 'Combina estilos para crear diseños de tatuajes únicos.', icon: 'palette' },
      { title: 'Prueba Rápida', description: 'Ahorra tiempo probando docenas de fuentes en segundos.', icon: 'zap' },
      { title: 'Gratis', description: 'Diseña tu próximo tattoo sin gastar en software de diseño.', icon: 'heart' }
    ],
    howToSteps: [
      'Piensa en la palabra clave de tu tatuaje.',
      'Introdúcela en el generador.',
      'Busca estilos "Old English" o "Manuscritos".',
      'Haz una captura de pantalla o copia el texto para mostrárselo a tu tatuador.'
    ],
    faqs: [
      { question: '¿Qué estilo es mejor para tatuajes pequeños?', answer: 'Para tatuajes pequeños (fine line), recomendamos fuentes Sans-Serif o Manuscritas simples para asegurar que la tinta no se expanda con el tiempo y lo haga ilegible.' },
      { question: '¿Puedo usar esto para tatuajes de fechas?', answer: 'Sí, el conversor incluye estilos numéricos romanos y góticos perfectos para fechas importantes.' },
      { question: '¿Es compatible con máquinas de stencil?', answer: 'Los tatuadores suelen redibujar el diseño para el stencil, pero este conversor sirve como la referencia visual perfecta.' }
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
];