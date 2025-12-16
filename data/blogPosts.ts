import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'como-cambiar-letra-biografia-instagram',
    title: 'Cómo cambiar la letra de tu biografía de Instagram (Guía 2024)',
    excerpt: 'Aprende paso a paso cómo personalizar tu perfil de Instagram utilizando fuentes estéticas, cursivas y negritas sin instalar aplicaciones extrañas.',
    date: '2024-03-15',
    author: 'Equipo LetrasPro',
    tags: ['Instagram', 'Tutorial', 'Tipografía'],
    content: `
      <p>Tener una biografía de Instagram que destaque es fundamental para captar la atención de nuevos seguidores. Por defecto, Instagram solo ofrece una fuente estándar, pero con herramientas como nuestro <strong>Conversor de Letras Bonitas</strong>, puedes romper esa limitación.</p>

      <h2>¿Por qué cambiar la fuente de tu bio?</h2>
      <p>Tu biografía es tu carta de presentación digital. Usar una tipografía diferente ayuda a:</p>
      <ul>
        <li><strong>Destacar palabras clave:</strong> Resalta tu profesión o hobby.</li>
        <li><strong>Mostrar personalidad:</strong> Usa letras góticas si eres alternativo o cursivas si eres elegante.</li>
        <li><strong>Separar visualmente la información:</strong> Hace que tu perfil sea más fácil de leer.</li>
      </ul>

      <h2>Paso a paso para cambiar la letra</h2>
      <ol>
        <li>Escribe tu frase en nuestro generador de fuentes en la página de inicio.</li>
        <li>Desplázate hacia abajo para ver los más de 70 estilos disponibles.</li>
        <li>Haz clic en el estilo que más te guste (se copiará automáticamente).</li>
        <li>Abre Instagram, ve a "Editar Perfil" y pega el texto en el campo de "Biografía" o "Nombre".</li>
      </ol>

      <p>¡Y listo! Recuerda no abusar de las fuentes extrañas para asegurar que todos puedan leer tu información importante.</p>
    `
  },
  {
    id: '2',
    slug: 'mejores-fuentes-tatuajes-hombres-mujeres',
    title: 'Las 5 mejores fuentes para tatuajes de frases y nombres',
    excerpt: 'Antes de marcar tu piel, descubre qué estilos tipográficos funcionan mejor para tatuajes. Desde caligrafía Chicano hasta minimalismo moderno.',
    date: '2024-03-10',
    author: 'Equipo LetrasPro',
    tags: ['Tatuajes', 'Diseño', 'Inspiración'],
    content: `
      <p>Elegir la tipografía correcta para un tatuaje es tan importante como el mensaje mismo. Una mala elección de fuente puede hacer que una frase hermosa sea ilegible con el paso del tiempo.</p>

      <h2>1. Estilo Chicano / Gótico</h2>
      <p>Clásico, fuerte y con historia. Las letras góticas (Blackletter) son perfectas para la espalda o el pecho. Son ideales para apellidos o palabras con mucho significado como "Familia" o "Respeto".</p>

      <h2>2. Script / Cursiva Fina</h2>
      <p>Las fuentes manuscritas finas son la tendencia número uno para tatuajes en muñecas, costillas y clavículas. Aportan elegancia y sutileza.</p>

      <h2>3. Máquina de Escribir (Typewriter)</h2>
      <p>Para los amantes de la literatura y lo vintage. Este estilo es muy legible y envejece muy bien en la piel.</p>

      <h2>Consejo Pro</h2>
      <p>Antes de ir al estudio, utiliza nuestra herramienta de <strong>Letras para Tatuajes</strong>. Escribe tu frase, prueba diferentes estilos y haz una captura de pantalla para mostrársela a tu tatuador. ¡Es gratis y te ahorrará arrepentimientos!</p>
    `
  },
  {
    id: '3',
    slug: 'letras-para-nick-free-fire-pubg',
    title: 'Nombres para Free Fire y PUBG: Cómo crear Nicks que den miedo',
    excerpt: 'Domina el lobby con un nombre único. Te enseñamos a combinar símbolos especiales y letras raras para crear el Nickname perfecto.',
    date: '2024-03-05',
    author: 'Equipo LetrasPro',
    tags: ['Gaming', 'Free Fire', 'Nicks'],
    content: `
      <p>En el mundo de los juegos competitivos, tu nombre es tu marca. Un nick escrito en texto plano "Juan123" no impone el mismo respeto que uno estilizado como "𝕵𝖚𝖆𝖓☠".</p>

      <h2>Símbolos más populares para Gamers</h2>
      <p>Para crear un nick profesional, necesitas combinar letras estilizadas con símbolos de "relleno". Aquí tienes los más usados:</p>
      <ul>
        <li><strong>Armas y peligro:</strong> ︻╦o╤—, ⚔, ☠</li>
        <li><strong>Decoraciones:</strong> ꧁, ꧂, ⚡</li>
        <li><strong>Caritas:</strong> (¬_¬), ¯\\_(ツ)_/¯</li>
      </ul>

      <h2>¿Cómo evitar el "Nombre Inválido"?</h2>
      <p>Muchos juegos tienen filtros que bloquean ciertos caracteres. Nuestro generador de <strong>Letras para Nicks</strong> está optimizado para utilizar caracteres Unicode que la mayoría de juegos móviles modernos (Free Fire, COD Mobile, PUBG) aceptan sin problemas.</p>
    `
  }
];

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return BLOG_POSTS.find(post => post.slug === slug);
};