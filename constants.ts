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
    filter: (f) => f.pages.includes('cursivas'),
    content: '¿Buscas elegancia? Nuestro conversor de letras cursivas ofrece 80 estilos únicos.',
    whyFeatures: [
      { title: '80+ Estilos Cursivos', description: 'La mayor biblioteca de caligrafías del mercado.', icon: 'palette' },
      { title: 'Elegancia Instantánea', description: 'Convierte textos planos en arte caligráfico.', icon: 'star' }
    ],
    howToSteps: ['Introduce tu frase.', 'Visualiza las 80+ opciones.', 'Copia y pega.'],
    faqs: [{ question: '¿Son compatibles?', answer: 'Sí, funcionan en todas las redes sociales modernas.' }]
  },
  goticas: {
    path: '/letras-goticas',
    title: 'Conversor de Letras Góticas Profesionales (80+ Estilos Dark)',
    heading: 'Conversor de Letras Góticas',
    description: 'Genera textos oscuros con nuestro conversor de letras goticas. Más de 80 fuentes góticas y dark.',
    filter: (f) => f.pages.includes('goticas'),
    content: 'El estilo gótico es eterno. 80 estilos únicos que incluyen Fraktur y Blackletter.',
    whyFeatures: [
      { title: '80+ Estilos Góticos', description: 'Fraktur, Blackletter y Medieval en un solo lugar.', icon: 'shield' },
      { title: 'Impacto Visual', description: 'Decoradores únicos de cruces y calaveras.', icon: 'star' }
    ],
    howToSteps: ['Escribe tu nick.', 'Selecciona variantes medievales.', 'Copia el resultado.'],
    faqs: [{ question: '¿Sirve para juegos?', answer: 'Sí, ideal para Free Fire y nicks de clanes.' }]
  },
  graffiti: {
    path: '/letras-graffiti',
    title: 'Conversor de Letras Graffiti y Urbano (40+ Estilos Murales)',
    heading: 'Conversor de Letras Graffiti',
    description: 'Crea textos urbanos con nuestro conversor de letras graffiti. Estilos burbuja y tags.',
    filter: (f) => f.pages.includes('graffiti'),
    content: 'Dale un toque rebelde con 40 estilos graffiti exclusivos.',
    whyFeatures: [
      { title: '40+ Estilos Graffiti', description: 'Burbuja, Tag y Wildstyle.', icon: 'palette' },
      { title: 'Efectos Murales', description: 'Decoradores únicos de goteo.', icon: 'zap' }
    ],
    howToSteps: ['Introduce tu texto.', 'Elige entre burbuja o tag.', 'Copia y pega.'],
    faqs: [{ question: '¿Son legibles?', answer: 'Sí, seleccionadas para máxima visibilidad en móviles.' }]
  },
  tatuajes: {
    path: '/letras-tatuajes',
    title: 'Conversor de Letras para Tatuajes Online (60+ Estilos Lettering)',
    heading: 'Conversor de Letras para Tatuajes',
    description: 'Diseña tu próximo tattoo con el conversor de letras para tatuajes. 60 estilos profesionales.',
    filter: (f) => f.pages.includes('tatuajes'),
    content: 'Visualiza tu próximo diseño con 60 variaciones artísticas especializadas.',
    whyFeatures: [
      { title: '60+ Estilos Tattoo', description: 'Chicano, Fine Line y Blackletter.', icon: 'palette' },
      { title: 'Decoradores Inked', description: 'Símbolos de dagas y cruces.', icon: 'star' }
    ],
    howToSteps: ['Introduce la frase.', 'Elige el estilo.', 'Captura o copia.'],
    faqs: [{ question: '¿Es gratis?', answer: 'Sí, 100% online y sin registros.' }]
  },
  tattoo: {
    path: '/letras-tattoo',
    title: 'Conversor de Letras Tattoo (60+ Estilos de Lettering)',
    heading: 'Conversor de Letras Tattoo',
    description: 'Encuentra la fuente perfecta en el conversor de letras tattoo. 60 diseños únicos.',
    filter: (f) => f.pages.includes('tattoo'),
    content: 'Explora 60 estilos que cubren todas las ramas del lettering.',
    whyFeatures: [
      { title: 'Catálogo de 60 Fuentes', description: 'Inspiradas en estudios reales.', icon: 'palette' },
      { title: 'Diseño Sin Límites', description: 'Símbolos de dotwork y dagas.', icon: 'zap' }
    ],
    howToSteps: ['Escribe tu texto.', 'Selecciona la base.', 'Copia el diseño.'],
    faqs: [{ question: '¿Funciona en Instagram?', answer: 'Sí, perfectamente compatible.' }]
  },
  facebook: {
    path: '/letras-facebook',
    title: 'Conversor de Letras para Facebook (60+ Estilos Legibles)',
    heading: 'Conversor de Letras para Facebook',
    description: 'Mejora tus posts con el conversor de letras para facebook. Más de 60 estilos de fuentes negritas, cursivas y subrayadas para destacar en el feed.',
    content: 'Personaliza tus posts y biografía con el conversor de letras para facebook más completo. Hemos seleccionado 60 estilos tipográficos diseñados específicamente para mantener la legibilidad en Facebook: desde negritas impactantes para títulos hasta cursivas elegantes y textos subrayados o tachados que no activan los filtros de spam. Ideal para perfiles profesionales y páginas de fans.',
    filter: (f) => f.pages.includes('facebook'),
    whyFeatures: [
      { title: '60+ Estilos FB', description: 'Negritas, versalitas y subrayados optimizados para el feed de noticias.', icon: 'palette' },
      { title: 'Anti-Spam Garantizado', description: 'Fuentes seleccionadas que no afectan el alcance orgánico de tus posts.', icon: 'shield' },
      { title: 'Legibilidad Total', description: 'Estilos limpios que se ven perfectamente en Facebook Lite y móvil.', icon: 'check' }
    ],
    howToSteps: [
      'Introduce tu actualización de estado o descripción de perfil.',
      'Explora las 60 variantes de negrita, itálica y subrayado.',
      'Añade un decorador de corchetes 【 】 para resaltar títulos.',
      'Copia y pega directamente en tu aplicación de Facebook.'
    ],
    faqs: [
      { question: '¿Por qué usar fuentes especiales en Facebook?', answer: 'Facebook no permite cambiar el estilo del texto de forma nativa. Nuestra herramienta permite usar negritas y cursivas reales mediante Unicode para que tus mensajes no pasen desapercibidos.' }
    ]
  },
  amino: {
    path: '/letras-amino',
    title: 'Conversor de Letras Amino (40+ Estilos Aesthetic compatibles)',
    heading: 'Conversor de Letras Amino',
    description: 'El único conversor de letras amino optimizado con más de 40 estilos estéticos. Crea wikis y blogs profesionales con fuentes compatibles con la App Amino.',
    content: 'La comunidad de Amino valora la estética por encima de todo. Por ello, nuestro conversor de letras amino ha sido actualizado con 40 estilos únicos que cubren desde las deseadas "Small Caps" para títulos hasta caligrafías "Soft" para biografías. Todas las fuentes han sido verificadas para asegurar que no se vean como cuadros vacíos en la aplicación móvil.',
    filter: (f) => f.pages.includes('amino'),
    whyFeatures: [
      { title: '40+ Estilos Amino', description: 'Versalitas, scripts suaves y contornos diseñados para la estética de la comunidad.', icon: 'palette' },
      { title: '100% Compatible', description: 'Filtramos los caracteres que suelen dar error en Amino para asegurar visibilidad.', icon: 'check' },
      { title: 'Aesthetic Real', description: 'Añade automáticamente corazones, destellos y símbolos minimalistas a tus textos.', icon: 'star' }
    ],
    howToSteps: [
      'Introduce el título de tu Blog o Wiki en el conversor de letras amino.',
      'Elige entre los 40 estilos estéticos disponibles.',
      'Copia el texto decorado con un solo clic.',
      'Pega en tu post de Amino y sorprende a tu comunidad.'
    ],
    faqs: [
      { question: '¿Por qué algunas letras no se ven en Amino?', answer: 'Amino utiliza un renderizado de texto específico. Nuestro conversor solo muestra los estilos que están verificados para funcionar correctamente en Android e iOS.' }
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
