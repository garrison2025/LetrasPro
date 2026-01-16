
import { PageConfig, NavLink } from './types';

export const PAGE_CONFIGS: Record<string, PageConfig> = {
  home: {
    path: '/',
    title: 'Conversor de Letras Bonitas y Chidas - Copiar y Pegar 2025',
    heading: 'Conversor de Letras Bonitas',
    description: 'El mejor conversor de letras bonitas y chidas para Instagram, TikTok, Free Fire y WhatsApp. Transforma tu texto en fuentes perronas y estéticas.',
    content: 'Si buscas destacar en redes sociales, nuestro conversor de letras bonitas (y chidas) es la herramienta definitiva. A diferencia de otros sitios, este generador de fuentes utiliza Unicode para transformar tu nick o biografía en más de 140 estilos únicos. Ya sea que busques letras para Instagram, nicks para Free Fire o estados de WhatsApp, aquí encontrarás tipografías legibles y estéticas. Deja de usar fuentes aburridas; usa nuestro conversor para crear letras perronas y viralizar tu contenido.',
    filter: (f) => f.pages.includes('home'),
    whyFeatures: [
      { title: 'Letras Chidas y Bonitas', description: 'La base de datos más grande de fuentes estéticas, cursivas y símbolos para destacar en LATAM.', icon: 'star' },
      { title: 'Optimizado para Nicks', description: 'Nuestras letras funcionan perfecto en Free Fire, PUBG, Fortnite y perfiles de Instagram.', icon: 'zap' },
      { title: 'Conversor 100% Gratuito', description: 'Sin registros. Copia y pega letras perronas para tus estados y biografías al instante.', icon: 'check' }
    ],
    howToSteps: [
      'Escribe tu frase o nick en la caja superior.',
      'Explora cientos de estilos de letras chidas que se generan automáticamente.',
      'Elige el estilo que más te guste (cursiva, gótica, aesthetic...).',
      'Toca la tarjeta para copiar y pégalo en Instagram, WhatsApp o tu juego favorito.'
    ],
    faqs: [
      { question: '¿Qué es un conversor de letras chidas?', answer: 'Es una herramienta que transforma texto normal en símbolos Unicode que parecen fuentes tipográficas únicas y estéticas.' },
      { question: '¿Sirve para Nicks de Free Fire?', answer: '¡Sí! Muchos de nuestros estilos (como góticas y con símbolos) son perfectos para crear nicks veteranos y perrones.' },
      { question: '¿Puedo usar estas letras en Instagram?', answer: 'Totalmente. Puedes pegarlas en tu biografía (bio), historias, comentarios y captions sin problemas.' }
    ]
  },
  instagram: {
    path: '/letras-para-instagram',
    title: 'Letras para Instagram - Conversor de Fuentes para Bio y Stories',
    heading: 'Letras para Instagram',
    description: 'Generador de letras bonitas para Instagram. Copia y pega fuentes aesthetic, cursivas y símbolos en tu biografía, fotos y comentarios.',
    filter: (f) => f.tags?.includes('Instagram') || f.category === 'aesthetic' || f.category === 'script' || f.category === 'serif' || f.category === 'decorative',
    content: 'Tu biografía de Instagram es tu carta de presentación digital. Usar la fuente predeterminada es aburrido y no destaca. Con nuestro generador de letras para Instagram, puedes transformar tu nombre y biografía con estilos aesthetic, cursivas elegantes o negritas que captan la atención al instante. Estas fuentes son perfectas para resaltar palabras clave en tus captions (descripciones) o para darle un toque único a tus Stories sin necesidad de usar la herramienta de texto de la app.',
    whyFeatures: [
      { title: 'Biografías Aesthetic', description: 'Crea un perfil único que atraiga nuevos seguidores al primer vistazo.', icon: 'star' },
      { title: 'Comentarios Destacados', description: 'Haz que tus comentarios resalten entre miles usando negritas o estilos burbuja.', icon: 'message-circle' },
      { title: 'Stories Originales', description: 'Pega textos con diseños que no están disponibles en el editor nativo de Instagram.', icon: 'smartphone' }
    ],
    howToSteps: [
      'Escribe tu nombre o la frase para tu biografía.',
      'Filtra por estilos "Aesthetic", "Cursiva" o "Negrita".',
      'Copia tu favorito y ve a "Editar Perfil" en Instagram.',
      'Pega el texto en el campo de Nombre o Biografía y guarda.'
    ],
    faqs: [
      { question: '¿Me pueden banear de Instagram por usar esto?', answer: 'No, Instagram permite caracteres Unicode en la biografía y comentarios sin problemas.' },
      { question: '¿Cómo poner negritas en Instagram?', answer: 'Usa nuestro estilo "Sans Bold" o "Serif Bold", cópialo y pégalo en tu descripción.' }
    ]
  },
  freefire: {
    path: '/nicks-para-free-fire',
    title: 'Generador de Nicks para Free Fire - Letras y Símbolos Veteranos',
    heading: 'Nicks para Free Fire',
    description: 'Crea nicks para Free Fire que den miedo. Generador de letras insanas, símbolos de armas, coronas y estilos veteranos para tu nombre.',
    filter: (f) => f.tags?.includes('Free Fire') || f.category === 'gothic' || f.category === 'gaming' || f.tags?.includes('Miedo') || f.category === 'graffiti',
    content: 'En el campo de batalla, tu nombre lo es todo. Nuestro generador de nicks para Free Fire está diseñado para jugadores que quieren imponer respeto. Ofrecemos estilos de letras "insanas", góticas y veteranas que usan los pro players. Además, puedes combinar tu nick con símbolos de armas (M4, AK), coronas de rey, o caras de miedo. No uses un nombre simple; crea una identidad visual que tus enemigos recuerden cuando vean la killcam.',
    whyFeatures: [
      { title: 'Estilos Insanos', description: 'Fuentes agresivas y góticas ideales para clanes competitivos.', icon: 'skull' },
      { title: 'Símbolos de Armas', description: 'Complementa tu nick con símbolos de rifles, espadas y escudos.', icon: 'crosshair' },
      { title: 'Compatible 100%', description: 'Nuestros caracteres están probados para no aparecer como "signo de interrogación" en el juego.', icon: 'check-circle' }
    ],
    howToSteps: [
      'Escribe tu apodo o tag de clan.',
      'Elige una fuente gótica o con símbolos especiales.',
      'Agrega decoración extra como alas ꧁ ꧂ o armas.',
      'Usa tu tarjeta de cambio de nombre en Free Fire y pégalo.'
    ],
    faqs: [
      { question: '¿Cómo hacer un nick invisible?', answer: 'Usa nuestra herramienta de "Texto Invisible" en el menú para copiar el espacio en blanco (U+3164).' },
      { question: '¿Qué símbolos permite Free Fire?', answer: 'Soporta la mayoría de Unicode, pero recomendamos usar los de nuestra lista verificada para evitar errores.' }
    ]
  },
  whatsapp: {
    path: '/letras-para-whatsapp',
    title: 'Letras para WhatsApp - Cambiar Tipo de Letra y Fuentes',
    heading: 'Letras para WhatsApp',
    description: 'Cambia la letra de WhatsApp en tus chats y estados. Escribe en negrita, cursiva, tachado o con estilo de máquina de escribir.',
    filter: (f) => f.tags?.includes('WhatsApp') || f.compatibility === 'high' || f.category === 'sans' || f.category === 'serif' || f.category === 'monospace',
    content: '¿Cansado de la misma letra de siempre en tus chats? Con este conversor de letras para WhatsApp puedes ir más allá de las opciones básicas de la app. Sorprende a tus contactos enviando mensajes en fuentes góticas, letras azules, estilo máquina de escribir o caracteres invertidos. Es perfecto para felicitar cumpleaños de forma original, destacar anuncios en grupos o simplemente hacer bromas. También funciona perfecto para tu "Info" (Estado) de perfil.',
    whyFeatures: [
      { title: 'Más que Negritas', description: 'Accede a estilos que WhatsApp no tiene nativamente, como gótico o burbujas.', icon: 'message-square' },
      { title: 'Estados Únicos', description: 'Haz que tu Info de perfil destaque en la lista de contactos.', icon: 'user' },
      { title: 'Sin Instalar Apps', description: 'Funciona online sin necesidad de descargar teclados extraños.', icon: 'download-cloud' }
    ],
    howToSteps: [
      'Escribe tu mensaje en el cuadro de texto.',
      'Selecciona un estilo legible como "Monospace" o "Negrita Serif".',
      'Copia el resultado.',
      'Pégalo directamente en tu chat de WhatsApp o Estado.'
    ],
    faqs: [
      { question: '¿El destinatario necesita instalar algo?', answer: 'No, ellos verán la fuente tal cual la envías porque son caracteres universales.' },
      { question: '¿Cómo escribir en azul en WhatsApp?', answer: 'Busca el estilo "Letras Azules" (Regional) en nuestro generador.' }
    ]
  },
  tiktok: {
    path: '/letras-para-tiktok',
    title: 'Letras para TikTok - Fuentes Bonitas para Nombres y Perfiles',
    heading: 'Letras para TikTok',
    description: 'Personaliza tu nombre de TikTok con letras bonitas y aesthetic. Destaca en los comentarios y en tu descripción con fuentes únicas.',
    filter: (f) => f.category === 'aesthetic' || f.category === 'script' || f.tags?.includes('Cute') || f.category === 'decorative' || f.category === 'vaporwave',
    content: 'TikTok es una plataforma visual, y tu perfil no debe ser la excepción. Usar letras bonitas para TikTok en tu nombre de usuario (Nick) y descripción te ayuda a construir una marca personal sólida. Los estilos "Aesthetic", "Vaporwave" y "Manuscrito" son tendencia y pueden ayudarte a ganar seguidores al hacer tu perfil más atractivo. Además, comentar en videos virales con fuentes llamativas aumenta la probabilidad de que tu comentario reciba likes y suba al top.',
    whyFeatures: [
      { title: 'Nombres Aesthetic', description: 'Fuentes suaves y decorativas que encajan con la estética "Clean Girl" o "Dark".', icon: 'sparkles' },
      { title: 'Destaca en Comentarios', description: 'Usa fuentes en negrita o mayúsculas separadas para llamar la atención del creador.', icon: 'trending-up' },
      { title: 'Bios Organizadas', description: 'Usa distintos tipos de letra para separar secciones en tu biografía.', icon: 'list' }
    ],
    howToSteps: [
      'Ingresa tu nuevo nombre de usuario o descripción.',
      'Busca estilos "Aesthetic" o "Small Caps".',
      'Copia el texto.',
      'Ve a "Editar perfil" en TikTok y pega tu nuevo diseño.'
    ],
    faqs: [
      { question: '¿TikTok permite cambiar la fuente del nombre?', answer: 'Sí, puedes usar caracteres Unicode en tu nombre de perfil y descripción.' },
      { question: '¿Qué estilo es el más viral?', answer: 'Los estilos "Small Caps" (Minúsculas pequeñas) y "Serif Italic" son muy populares ahora.' }
    ]
  },
  discord: {
    path: '/letras-para-discord',
    title: 'Fuentes para Discord - Letras para Nicks y Chat',
    heading: 'Fuentes para Discord',
    description: 'Generador de letras para Discord. Personaliza tu nick del servidor, roles y mensajes con fuentes góticas, glitch y raras.',
    filter: (f) => f.category === 'gothic' || f.category === 'block' || f.tags?.includes('Glitch') || f.category === 'vaporwave' || f.category === 'gaming',
    content: 'Discord permite mucho formato con Markdown, pero está limitado a negritas y cursivas básicas. Con nuestro generador de fuentes para Discord, puedes usar estilos que Markdown no soporta, como letras góticas, texto glitch (Zalgo) o fuentes de ancho completo (Vaporwave). Esto es ideal para personalizar tu Nickname en cada servidor, crear nombres de Roles llamativos si eres administrador, o enviar mensajes que nadie pueda ignorar en el chat general.',
    whyFeatures: [
      { title: 'Nicks por Servidor', description: 'Ponte un nombre diferente y estilizado en cada comunidad.', icon: 'users' },
      { title: 'Nombres de Roles', description: 'Admin, Mods y VIPs lucen mejor con fuentes decoradas y símbolos.', icon: 'shield' },
      { title: 'Texto Glitch', description: 'Perfecto para servidores de temática oscura, terror o gaming.', icon: 'zap' }
    ],
    howToSteps: [
      'Escribe tu nick o mensaje.',
      'Elige un estilo agresivo, gótico o glitch.',
      'Copia el resultado.',
      'En Discord, ve a "Editar perfil del servidor" o pégalo en el chat.'
    ],
    faqs: [
      { question: '¿Funciona en los canales de texto?', answer: 'Sí, funciona en cualquier canal de texto, MD y en tu perfil.' },
      { question: '¿Puedo usarlo para nombres de canales?', answer: 'Sí, pero recomendamos usar fuentes legibles y minúsculas para los canales.' }
    ]
  },
  cursivas: {
    path: '/letras-cursivas',
    title: 'Conversor de Letras Cursivas - Generador de Escritura Elegante',
    heading: 'Conversor de Letras Cursivas',
    description: 'Transforma textos a manuscrita con el mejor conversor de letras cursivas. Ideal para nombres, tatuajes y biografías elegantes.',
    filter: (f) => f.pages.includes('cursivas') || f.category === 'script',
    content: 'La elegancia nunca pasa de moda. Nuestro conversor de letras cursivas es perfecto para quienes buscan un toque sofisticado y "aesthetic". Este generador se especializa en replicar trazos humanos, firmas y caligrafía antigua. Es la herramienta favorita para crear nombres para invitaciones, tatuajes delicados o biografías de Instagram con clase. Ofrecemos variantes negritas, finas y decoradas (estilo coquette) para que tus palabras fluyan con naturalidad.',
    whyFeatures: [
      { title: 'Estilos Manuscritos Reales', description: 'Desde trazos finos hasta pinceladas gruesas, simula la escritura a mano real.', icon: 'palette' },
      { title: 'Ideal para Nombres', description: 'Crea diseños de nombres hermosos para perfiles o bocetos de tatuajes.', icon: 'eye' },
      { title: 'Variedad Coquette', description: 'Incluimos estilos con lazos y decoraciones tiernas muy en tendencia.', icon: 'pen-tool' }
    ],
    howToSteps: [
      'Escribe tu nombre o frase en el conversor.',
      'Busca entre las opciones "Script", "Handwriting" y "Cursiva".',
      'Selecciona tu estilo favorito (negrita o fina).',
      'Copia el texto cursivo y pégalo donde quieras decorar.'
    ],
    faqs: [
      { question: '¿Funcionan las letras cursivas en Instagram?', answer: 'Sí, son compatibles con la biografía y captions de Instagram, así como en TikTok.' },
      { question: '¿Tienen tildes estas letras?', answer: 'Nuestro conversor avanzado soporta la mayoría de caracteres acentuados y la letra ñ.' }
    ]
  },
  tatuajes: {
    path: '/letras-tatuajes',
    title: 'Conversor de Letras para Tatuajes - Diseños Chicanos y Góticos',
    heading: 'Letras para Tatuajes',
    description: 'Diseña tu piel con el conversor de letras para tatuajes. Simula estilos Chicano, Gótico y Minimalista (Fine Line) gratis.',
    filter: (f) => f.pages.includes('tatuajes'),
    content: 'Antes de marcar tu piel, visualiza tu idea. Este conversor de letras para tatuajes es esencial para encontrar la tipografía perfecta. Puedes experimentar con estilos Chicanos (cholos), Old English (Góticas), y Fine Line (Minimalistas) sin dolor. Es ideal para probar cómo se vería un nombre, una fecha en números romanos o una frase inspiradora. No te tatúes sin probar primero tus opciones en el mejor simulador de fuentes para tattoo.',
    whyFeatures: [
      { title: 'Previsualización de Tatuajes', description: 'Evita arrepentimientos viendo cómo queda el diseño antes de ir al estudio.', icon: 'shield' },
      { title: 'Estilos Exclusivos', description: 'Incluimos fuentes Chicanas, Gángster y de Caligrafía Fina.', icon: 'star' },
      { title: 'Inspiración Infinita', description: 'Encuentra la fuente perfecta para nombres de hijos o fechas especiales.', icon: 'heart' }
    ],
    howToSteps: [
      'Escribe la fecha, nombre o frase a tatuar.',
      'Filtra por estilos góticos, chicanos o manuscritos.',
      'Haz una captura de tu opción favorita o descarga la imagen.',
      'Muestra el diseño a tu tatuador como referencia.'
    ],
    faqs: [
      { question: '¿Son precisas estas fuentes para tatuar?', answer: 'Son referencias excelentes. Tu tatuador podrá usarlas para crear la plantilla final.' },
      { question: '¿Qué estilos de tatuaje tienen?', answer: 'Tenemos Chicano, Blackwork, Minimalista, Tradicional y Gótico.' }
    ]
  },
  goticas: {
    path: '/letras-goticas',
    title: 'Conversor de Letras Góticas - Nicks para Free Fire y Dark',
    heading: 'Conversor de Letras Góticas',
    description: 'Crea nicks oscuros y perrones. Estilos Fraktur, Medieval y Blackletter ideales para Free Fire y perfiles Dark.',
    filter: (f) => f.pages.includes('goticas') || f.category === 'gothic',
    content: 'Impon respeto en el lobby con nuestro conversor de letras góticas. El estilo gótico (o Blackletter) evoca poder, antigüedad y misterio. Es la opción #1 para crear Nicks de Free Fire, PUBG o COD Mobile que intimiden. Este generador incluye variantes Fraktur bold, outline y estilos con decoraciones de "barrio". Los clanes competitivos usan estas letras para unificar sus nombres y destacar en la tabla de clasificación con un look agresivo y veterano.',
    whyFeatures: [
      { title: 'Nicks para Free Fire', description: 'Crea nombres veteranos que imponen respeto en el juego.', icon: 'zap' },
      { title: 'Estilos Dark y Únicos', description: 'Fuentes medievales, vampíricas y oscuras para perfiles alternativos.', icon: 'moon' },
      { title: 'Compatibilidad Gamer', description: 'Caracteres probados en los chats y perfiles de los juegos más populares.', icon: 'gamepad' }
    ],
    howToSteps: [
      'Ingresa tu Nick o Tag de Clan en el conversor.',
      'Elige entre gótica suave, intensa o decorada.',
      'Copia el resultado y pégalo en tu perfil de juego.',
      'Combínalo con símbolos para un efecto más "Pro".'
    ],
    faqs: [
      { question: '¿Sirven estas letras para Free Fire?', answer: 'Sí, son las más usadas por jugadores profesionales y veteranos para sus nicks.' },
      { question: '¿Qué es el estilo Fraktur?', answer: 'Es un tipo de letra gótica alemana muy popular por su estética densa y antigua.' }
    ]
  },
  graffiti: {
    path: '/letras-graffiti',
    title: 'Conversor de Letras Graffiti - Texto Urbano y Burbujas',
    heading: 'Conversor de Letras Graffiti',
    description: 'Estilo callejero y urbano. Genera letras de burbujas, tags y spray para tus textos digitales y nicks.',
    filter: (f) => f.pages.includes('graffiti'),
    content: 'Lleva el arte de la calle a tu pantalla. Este conversor de letras graffiti captura la esencia del hip-hop y el arte urbano. Crea textos estilo burbuja, tags callejeros y bloques cuadrados. Es perfecto para destacar con un estilo rebelde, juvenil y "de barrio". A diferencia de fuentes rígidas, aquí encontrarás formas redondeadas y dinámicas. Úsalo para títulos de YouTube, comentarios destacados o biografías con mucho flow.',
    whyFeatures: [
      { title: 'Flow Urbano', description: 'Auténticos estilos de burbuja, tags y bloques callejeros.', icon: 'star' },
      { title: 'Alta Visibilidad', description: 'Las letras burbuja destacan mucho en comentarios y chats.', icon: 'check' },
      { title: 'Creatividad Total', description: 'Mezcla estilos para crear tu propio tag digital único.', icon: 'palette' }
    ],
    howToSteps: [
      'Teclea tu texto o nick urbano.',
      'Busca los estilos de burbuja (bubbles) o cuadrados.',
      'Selecciona y copia tu diseño favorito.',
      'Pégalo en comentarios o estados para llamar la atención.'
    ],
    faqs: [
      { question: '¿Se leen bien estas letras?', answer: 'Sí, las letras burbuja son muy legibles y llamativas en fondo blanco o negro.' },
      { question: '¿Es gratis usar estos estilos?', answer: 'Totalmente, disfruta de todos los estilos urbanos sin costo.' }
    ]
  },
  amino: {
    path: '/letras-amino',
    title: 'Conversor de Letras Amino - Fuentes Aesthetic para Wikis',
    heading: 'Conversor de Letras Amino',
    description: 'Decora tus blogs y wikis con letras aesthetic. Estilos verificados para la app Amino y perfiles soft.',
    filter: (f) => f.pages.includes('amino'),
    content: 'La comunidad de Amino ama la estética. Nuestro conversor de letras Amino está diseñado específicamente para crear blogs, wikis y biografías hermosas y ordenadas. Hemos filtrado las fuentes para asegurar compatibilidad y evitar errores. Crea títulos "aesthetic", separadores y decoraciones soft. Desde estilos "small caps" (letras pequeñas) hasta decoraciones vaporwave, aquí tienes todo para que tu perfil se vea profesional y curado.',
    whyFeatures: [
      { title: '100% Compatible con Amino', description: 'Fuentes probadas para que no salgan cuadros vacíos en la app.', icon: 'smartphone' },
      { title: 'Estética Aesthetic / Soft', description: 'Fuentes suaves y minimalistas ideales para decorar blogs.', icon: 'heart' },
      { title: 'Organización Visual', description: 'Usa distintos estilos para jerarquizar títulos en tus wikis.', icon: 'list' }
    ],
    howToSteps: [
      'Escribe el título de tu blog o wiki.',
      'Elige una fuente aesthetic o small caps.',
      'Copia el texto decorado.',
      'Pégalo en tu Wiki o Bio de Amino para ganar seguidores.'
    ],
    faqs: [
      { question: '¿Por qué usar letras diferentes en Amino?', answer: 'Ayuda a que tus publicaciones destaquen en el feed y sean más fáciles de leer.' },
      { question: '¿Funciona en Android e iOS?', answer: 'Sí, está optimizado para ambos sistemas operativos.' }
    ]
  },
  facebook: {
    path: '/letras-facebook',
    title: 'Conversor de Letras para Facebook - Negritas y Listas',
    heading: 'Letras para Facebook',
    description: 'Cambia la fuente de tus posts en Facebook. Negritas, itálicas y formatos para aumentar el alcance y ventas.',
    content: 'Facebook no deja poner negritas nativamente, pero con nuestro conversor de letras para Facebook puedes hacerlo. Escribir títulos en negrita, listas ordenadas y frases destacadas detiene el scroll y aumenta la lectura. El algoritmo favorece el contenido que retiene la atención. Esta herramienta es vital para Community Managers, vendedores y grupos que quieren destacar sus anuncios y estados. Usa estilos legibles y profesionales.',
    filter: (f) => f.pages.includes('facebook'),
    whyFeatures: [
      { title: 'Más Alcance y Clics', description: 'Los posts con negritas tienen mayor CTR (tasa de clics).', icon: 'trending-up' },
      { title: 'Negritas Reales', description: 'Consigue el efecto negrita (bold) en tus estados y comentarios.', icon: 'bold' },
      { title: 'Anti-Spam', description: 'Caracteres seguros que no son marcados como spam por Facebook.', icon: 'shield' }
    ],
    howToSteps: [
      'Redacta tu estado o anuncio de venta.',
      'Selecciona el estilo negrita (sans o serif).',
      'Copia el texto formateado.',
      'Publica en tu muro o grupo y observa cómo suben las interacciones.'
    ],
    faqs: [
      { question: '¿Me pueden banear por usar esto?', answer: 'No, son caracteres Unicode legítimos, no es un hack.' },
      { question: '¿Se ve en celulares?', answer: 'Sí, el texto es visible en la app móvil, Lite y escritorio.' }
    ]
  },
  tattoo: {
    path: '/letras-tattoo',
    title: 'Conversor de Letras Tattoo - Tipografías para Piel',
    heading: 'Conversor de Letras Tattoo',
    description: 'Inspiración para tu próximo tatuaje. Lettering profesional, chicano y estilos de tinta para probar.',
    filter: (f) => f.pages.includes('tattoo'),
    content: 'El arte del lettering en la piel requiere precisión. Este conversor de letras tattoo es tu herramienta de bocetado gratuita. Ofrecemos una selección curada de fuentes que funcionan bien con aguja y tinta. Desde caligrafía clásica hasta estilos tribales y chicanos, cubrimos todas las tendencias. Úsalo para visualizar nombres de seres queridos o fechas importantes antes de ir al estudio. Tu piel merece el mejor diseño posible.',
    whyFeatures: [
      { title: 'Diseño Profesional', description: 'Fuentes seleccionadas por su aptitud para ser tatuadas.', icon: 'pen-tool' },
      { title: 'Visualización Previa', description: 'Imagina cómo quedará la frase antes de marcarte.', icon: 'eye' },
      { title: 'Estilos Variados', description: 'Encuentra desde minimalismo hasta barroco y gótico.', icon: 'layers' }
    ],
    howToSteps: [
      'Ingresa tu frase significativa o fecha.',
      'Navega por las opciones de lettering.',
      'Guarda tus favoritas o descarga la imagen.',
      'Consulta con tu tatuador mostrando el resultado.'
    ],
    faqs: [
      { question: '¿Es útil para tatuadores?', answer: 'Sí, muchos profesionales lo usan como referencia rápida para clientes.' },
      { question: '¿Qué estilos incluye?', answer: 'Chicano, Blackwork, Minimalista, Tradicional y Manuscrito.' }
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
