// These answers describe our tool and recommended workflows, not platform guarantees.
export const GENERATOR_ANSWERS: Record<string, { question: string; answer: string; summary: string }> = {
  '/': {
    question: '¿Qué obtengo al convertir mi texto?',
    summary: 'Convierte texto en caracteres Unicode decorativos para copiar; no instala fuentes.',
    answer: 'El conversor devuelve texto con caracteres Unicode decorativos que puedes copiar y pegar. No instala una fuente ni cambia la tipografía de toda una aplicación. Escribe una frase, elige un estilo y comprueba el resultado en el lugar donde vas a publicarlo.',
  },
  '/letras-para-instagram': {
    question: '¿Cómo preparo letras para mi perfil de Instagram?',
    summary: 'Prepara una frase corta para tu perfil; comprueba el resultado antes de guardar.',
    answer: 'Convierte una frase corta y pruébala primero en el nombre visible o la biografía. Conserva una versión normal de tu nombre para que siga siendo reconocible. La vista previa de este sitio muestra el texto generado; no confirma que Instagram acepte todos sus caracteres.',
  },
  '/nicks-para-free-fire': {
    question: '¿Cómo elijo un nick antes de cambiarlo en Free Fire?',
    summary: 'Compara nicks antes de probarlos en el juego; no consulta su disponibilidad.',
    answer: 'Genera varias versiones de un nombre corto y copia tu favorita. Pégala en la vista previa del juego y revisa cada símbolo antes de confirmar. Este generador no comprueba la disponibilidad del nick ni puede aprobar un cambio de nombre dentro de Free Fire.',
  },
  '/letras-para-whatsapp': {
    question: '¿Qué diferencia hay entre estas letras y el formato de WhatsApp?',
    summary: 'Copia caracteres decorativos; son distintos del formato nativo de WhatsApp.',
    answer: 'Estas letras son caracteres que se copian junto con el mensaje. No activan los controles de formato de WhatsApp. Para mensajes largos, usa el estilo decorativo en una frase breve y conserva el resto en texto normal para facilitar la lectura.',
  },
  '/letras-para-tiktok': {
    question: '¿Cómo pruebo un estilo antes de usarlo en TikTok?',
    summary: 'Prepara texto para tu perfil; revisa su aceptación y lectura en TikTok.',
    answer: 'Convierte el nombre o una frase de la descripción y pega una versión corta en el campo de destino. Revisa el perfil guardado en móvil. La conversión solo prepara caracteres: no reserva un identificador, no valida las reglas de TikTok y no predice el alcance de una publicación.',
  },
  '/letras-para-discord': {
    question: '¿Cómo uso estas letras sin confundir los nombres en Discord?',
    summary: 'Compara un nombre breve y comprueba las reglas del servidor antes de usarlo.',
    answer: 'Elige un nombre breve y comprueba que cada letra se distingue después de pegarlo. Para un servidor, consulta sus reglas antes de cambiar un apodo o proponer un nombre de canal. La herramienta genera texto; no modifica permisos, roles ni ajustes de Discord.',
  },
  '/letras-cursivas': {
    question: '¿Estas letras cursivas son un archivo de fuente?',
    summary: 'Genera caracteres de aspecto cursivo para copiar; no entrega una fuente instalable.',
    answer: 'No. El resultado es texto Unicode que puedes copiar, con letras de aspecto cursivo cuando existe una equivalencia en el estilo elegido. Para maquetar un documento con una tipografía completa necesitas seleccionar una fuente en tu editor; este conversor no entrega archivos TTF u OTF.',
  },
  '/letras-tatuajes': {
    question: '¿El resultado está listo para tatuar?',
    summary: 'Compara frases como referencia visual para tu artista; no crea plantillas a escala.',
    answer: 'El texto convertido sirve como referencia visual para conversar con el artista. No es una plantilla de tatuaje preparada a escala. Comprueba la ortografía, lleva el texto original y pide un boceto que resuelva el tamaño, el espaciado y los trazos antes de aprobarlo.',
  },
  '/letras-tattoo': {
    question: '¿Cómo comparo iniciales y fechas para un tattoo?',
    summary: 'Compara iniciales y fechas como referencia; revisa cada letra y número.',
    answer: 'Escribe las iniciales o la fecha completa y compara varias combinaciones. Conserva el orden y el significado del texto original al copiarlo. Usa las muestras para elegir una dirección visual; el diseño final y su adaptación al cuerpo deben revisarse con el artista.',
  },
  '/letras-goticas': {
    question: '¿Cómo compruebo que un nombre gótico se entiende?',
    summary: 'Compara letras góticas y conserva una versión normal para revisar la lectura.',
    answer: 'Compara el resultado con el nombre original, letra por letra, y léelo al tamaño en que aparecerá. Si dos letras se confunden, cambia de estilo o conserva parte del texto normal. La muestra gótica es texto copiable; su dibujo exacto puede variar al pegarlo.',
  },
  '/letras-graffiti': {
    question: '¿Obtengo texto graffiti o un diseño vectorial?',
    summary: 'Genera texto con estilos graffiti para copiar o descargar como imagen PNG.',
    answer: 'La conversión produce texto copiable con estilos de bloques, burbujas y símbolos. La descarga de una tarjeta produce una imagen PNG, no un archivo vectorial ni una fuente instalable. Para imprimir, revisa la imagen al tamaño final y prepara el diseño en un editor si necesitas más resolución.',
  },
  '/letras-amino': {
    question: '¿Cómo preparo un título decorado para Amino?',
    summary: 'Prepara títulos para Amino; comprueba tildes y separadores en un borrador.',
    answer: 'Genera un título breve y pégalo en un borrador antes de publicarlo. Comprueba separadores, tildes y símbolos en la vista de lectura. Mantén los párrafos largos en texto normal y simplifica el estilo si aparecen caracteres vacíos o difíciles de reconocer.',
  },
  '/letras-facebook': {
    question: '¿Cómo reviso las letras antes de publicarlas en Facebook?',
    summary: 'Prepara una frase para Facebook y comprueba su lectura antes de publicarla.',
    answer: 'Prueba una frase en un borrador de publicación y comprueba cómo se lee en móvil. Mantén teléfonos, direcciones y datos esenciales en texto normal. El generador no verifica las políticas de nombres de Facebook ni garantiza que un estilo se admita en todos los campos.',
  },
};
