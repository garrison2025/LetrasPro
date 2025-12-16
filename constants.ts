import { PageConfig, NavLink } from './types';

export const PAGE_CONFIGS: Record<string, PageConfig> = {
  home: {
    path: '/',
    title: 'Conversor de Letras Bonitas (Copiar y Pegar)',
    heading: 'Conversor de Letras Bonitas',
    description: 'Transforma tu texto en fuentes únicas para Instagram, Twitter, Facebook y más. Escribe, copia y pega.',
    content: 'Bienvenido al mejor conversor de letras bonitas. Aquí encontrarás todas las variedades de estilos, desde cursivas elegantes hasta letras góticas impactantes. Utiliza nuestra herramienta para destacar en tus biografías y posts.',
    filter: () => true // Show all
  },
  cursivas: {
    path: '/letras-cursivas',
    title: 'Conversor de Letras Cursivas y Manuscritas',
    heading: 'Letras Cursivas',
    description: 'Generador de letras cursivas y caligrafía para tatuajes y redes sociales.',
    content: 'Las letras cursivas evocan elegancia y estilo personal. Son perfectas para mensajes románticos, invitaciones digitales o para diseñar tatuajes con nombres. Nuestra herramienta convierte tu texto normal en bellos caracteres de script.',
    filter: (f) => f.category === 'script'
  },
  tatuajes: {
    path: '/letras-tatuajes',
    title: 'Conversor de Letras para Tatuajes',
    heading: 'Letras para Tatuajes',
    description: 'Fuentes ideales para tatuajes: góticas, cursivas y estilos artísticos.',
    content: '¿Buscas inspiración para tu próximo tatuaje? Prueba nuestros estilos góticos y cursivos. Estos caracteres Unicode son visualmente impactantes y funcionan perfectamente para maquetas de diseño de texto en piel.',
    filter: (f) => f.category === 'gothic' || f.category === 'script'
  },
  goticas: {
    path: '/letras-goticas',
    title: 'Conversor de Letras Góticas (Blackletter)',
    heading: 'Letras Góticas',
    description: 'Genera texto gótico oscuro y antiguo. Perfecto para nicks de juegos y estética dark.',
    content: 'El estilo gótico (o Blackletter) es denso, oscuro y dramático. Muy utilizado en la cultura del rock, metal y en juegos MMORPG para nicks de clanes. Convierte tu nombre en algo legendario.',
    filter: (f) => f.category === 'gothic'
  },
  graffiti: {
    path: '/letras-graffiti',
    title: 'Conversor de Letras Graffiti y Burbujas',
    heading: 'Letras Graffiti',
    description: 'Estilos urbanos, letras en burbujas y doble trazo.',
    content: 'Dale un toque urbano a tus comentarios. Las letras de doble trazo (Double Struck) y las burbujas circulares destacan inmediatamente en el feed de cualquier red social.',
    filter: (f) => f.category === 'decorative'
  },
  amino: {
    path: '/letras-amino',
    title: 'Conversor de Letras para Amino',
    heading: 'Letras para Amino',
    description: 'Fuentes compatibles con la app Amino. Destaca en tus blogs y chats.',
    content: 'Amino tiene una comunidad vibrante. Usa estos estilos probados para decorar tus blogs, wikis y perfiles sin miedo a que aparezcan cuadros vacíos.',
    filter: (f) => f.category !== 'decorative' // Excluding heavy decoratives for better compatibility
  },
  facebook: {
    path: '/letras-facebook',
    title: 'Conversor de Letras para Facebook',
    heading: 'Letras para Facebook',
    description: 'Texto estilizado que funciona en posts y comentarios de Facebook.',
    content: 'Facebook a veces restringe ciertos caracteres Unicode. Esta selección prioriza la legibilidad y compatibilidad en el feed de noticias y comentarios.',
    filter: (f) => f.category === 'sans' || f.category === 'serif' || f.category === 'script'
  },
  tattoo: {
    path: '/letras-tattoo',
    title: 'Conversor de Letras Tattoo (Estilos Variados)',
    heading: 'Inspiración Tattoo',
    description: 'Variedad de fuentes para diseño de tatuajes y arte corporal.',
    content: 'Explora una mezcla de estilos agresivos y suaves perfectos para visualizar cómo quedaría una frase en tu piel.',
    filter: (f) => f.category === 'gothic' || f.category === 'other'
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
];