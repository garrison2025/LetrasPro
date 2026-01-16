
export interface Comment {
  id: string;
  author: string;
  avatarColor: string; // Tailwind color class
  date: string;
  content: string;
  likes: number;
}

// Strategically written comments to include Long-Tail Keywords
export const STATIC_COMMENTS: Comment[] = [
  {
    id: 'c1',
    author: 'Santiago_FF',
    avatarColor: 'bg-red-500',
    date: 'Hace 2 horas',
    content: 'Increíble herramienta. Usé el **conversor de letras góticas** para mi nick de Free Fire y quedó insano. Recomiendo mezclarlo con los símbolos de armas.',
    likes: 124
  },
  {
    id: 'c2',
    author: 'Valery.Ig',
    avatarColor: 'bg-pink-500',
    date: 'Hace 5 horas',
    content: 'Por fin encuentro unas **letras para Instagram** que no se rompen en la biografía. El estilo "Aesthetic" se ve hermoso en mi perfil de maquillaje. ✨',
    likes: 89
  },
  {
    id: 'c3',
    author: 'DarkSoul',
    avatarColor: 'bg-slate-700',
    date: 'Hace 1 día',
    content: 'El generador de **texto glitch** es el mejor. Lo usé para trollear en un grupo de WhatsApp y todos pensaron que se les había roto el celular 😂',
    likes: 256
  },
  {
    id: 'c4',
    author: 'Mariana_Arts',
    avatarColor: 'bg-purple-500',
    date: 'Hace 1 día',
    content: 'Me encanta que tengan tantas opciones de **letras cursivas**. Las uso para los títulos de mis apuntes digitales y se ven súper profesionales.',
    likes: 45
  },
  {
    id: 'c5',
    author: 'ProGamer77',
    avatarColor: 'bg-orange-500',
    date: 'Hace 2 días',
    content: 'Gracias por los **nicks para Free Fire**. Copié el estilo invisible y ahora nadie me ve en la sala. 10/10 esta página.',
    likes: 112
  },
  {
    id: 'c6',
    author: 'LuisaM',
    avatarColor: 'bg-blue-500',
    date: 'Hace 3 días',
    content: '¿Alguien sabe cómo poner **letras azules** en Facebook? Edit: Ya vi la opción en la lista, funciona perfecto en los comentarios.',
    likes: 34
  }
];
