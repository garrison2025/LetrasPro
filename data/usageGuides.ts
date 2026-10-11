export const USAGE_GUIDES: Record<string, { example: string; guidance: string; workflow?: { title: string; steps: string[]; checks: string[] } }> = {
  '/': { example: 'María · Café · 2026', guidance: 'Compara varios estilos y copia un fragmento corto. Conserva nombres, fechas y datos importantes en texto normal para facilitar la lectura y la búsqueda.' },
  '/letras-para-instagram': {
    example: 'María | Diseño ✨', guidance: 'Prueba el texto en el campo de nombre visible o biografía, guarda y revisa el perfil desde otro dispositivo. El nombre de usuario puede tener reglas distintas y los caracteres decorados pueden ocupar más unidades.',
    workflow: {
      title: 'Una biografía con un solo acento visual',
      steps: ['Conserva María | Diseño como versión normal y convierte solo el nombre o el título.', 'Añade debajo tu actividad y los datos de contacto en texto normal.', 'Pega la composición en la biografía y comprueba el límite indicado por Instagram antes de guardar.'],
      checks: ['Si el campo de usuario rechaza el texto, prueba el nombre visible; no son el mismo campo.', 'Comprueba la tilde de María y que los enlaces sigan siendo reconocibles.', 'Si cuesta leer el perfil, reduce la decoración. El estilo no garantiza seguidores ni alcance.'],
    },
  },
  '/nicks-para-free-fire': { example: '꧁ Luna ꧂', guidance: 'Comprueba el nick en la vista previa del juego antes de confirmar un cambio de nombre. Si se rechaza, prueba menos símbolos o texto normal; no todos los caracteres se aceptan en todas las versiones.' },
  '/letras-para-whatsapp': { example: '¡Feliz cumpleaños, Ana! ✨', guidance: 'Unicode y el formato nativo de WhatsApp son métodos diferentes. Envía una prueba corta y confirma que el destinatario puede leerla; el aspecto puede cambiar entre dispositivos.' },
  '/letras-para-tiktok': {
    example: 'Luna · Arte y música', guidance: 'Prueba el estilo en el nombre visible o la descripción. El identificador de usuario puede rechazar caracteres que sí funcionan en otros campos. Ningún estilo garantiza más visualizaciones.',
    workflow: {
      title: 'Un nombre breve que se reconozca junto al vídeo',
      steps: ['Convierte Luna por separado y conserva Arte y música en texto normal.', 'Compara la versión corta con el nombre completo; comprueba que no se corte en la vista de perfil.', 'Prueba el nombre visible y revisa el resultado guardado antes de reutilizarlo en descripciones.'],
      checks: ['No presupongas que el identificador admite las mismas letras que el nombre visible.', 'Mantén las instrucciones y palabras necesarias para entender el vídeo en texto normal.', 'Si aparecen cuadros vacíos, elige un estilo más simple o vuelve al original.'],
    },
  },
  '/letras-para-discord': { example: 'Luna · Equipo Azul', guidance: 'Distingue entre el nombre visible, el apodo de servidor, los roles y los canales. Las reglas y permisos de cada servidor pueden impedir cambios; revisa la legibilidad en móvil.' },
  '/letras-cursivas': { example: 'María y José', guidance: 'Comprueba las tildes y la ñ después de pegar. Para invitaciones impresas, revisa el diseño final; el texto Unicode no sustituye un archivo de fuente.' },
  '/letras-tatuajes': {
    example: 'Familia · Siempre', guidance: 'Usa estas letras como referencia inicial para elegir una composición. Pide al artista un boceto adaptado al tamaño, la zona y la legibilidad; revisa cada letra antes de tatuar.',
    workflow: {
      title: 'Preparar una frase para conversar con el tatuador',
      steps: ['Escribe la frase completa y revisa su ortografía en texto normal antes de convertirla.', 'Compara Familia · Siempre en una versión gótica y otra cursiva; guarda ambas junto al original.', 'Lleva las referencias al estudio y solicita una composición al tamaño previsto, con el espaciado revisado por el artista.'],
      checks: ['En una frase larga, comprueba dónde dividir las líneas sin alterar su significado.', 'Revisa tildes, ñ y letras que se parezcan entre sí; una vista atractiva no confirma que todas se lean bien.', 'La imagen descargada no es una plantilla a escala ni predice cómo quedará o envejecerá el tatuaje.'],
    },
  },
  '/letras-tattoo': {
    example: 'M · J · 2026', guidance: 'Compara iniciales, números y combinaciones de estilos como un tablero de inspiración. Lleva varias referencias al estudio y deja que el artista prepare los trazos y el espaciado finales.',
    workflow: {
      title: 'Comparar iniciales y fechas sin cambiar su significado',
      steps: ['Prepara M · J · 2026 y comprueba el orden de las iniciales y los cuatro dígitos.', 'Compara M J, M · J y M / J: los separadores cambian la composición sin añadir letras.', 'Guarda dos variantes legibles y pide al artista que dibuje la unión entre iniciales y la separación de la fecha.'],
      checks: ['Revisa 0 y O, 1 e I por separado: el conversor no decide qué carácter querías escribir.', 'Los números no se convierten automáticamente a numeración romana.', 'Esta página comparte estilos con Letras para Tatuajes. Aquí la comparación se centra en iniciales y fechas; para frases completas, consulta esa guía.'],
    },
  },
  '/letras-goticas': { example: 'Noche · 2026', guidance: 'Algunos caracteres góticos se parecen entre sí. Revisa el nombre completo y evita este estilo para instrucciones, direcciones o información que deba leerse rápidamente.' },
  '/letras-graffiti': { example: 'Luna · Crew', guidance: 'Compara burbujas y bloques con un nombre corto. Para carteles o impresión, descarga una imagen y revisa el tamaño; el resultado no es una fuente vectorial.' },
  '/letras-amino': { example: 'Diario de Luna ✿', guidance: 'Prueba títulos y separadores dentro de un borrador de Amino. Mantén el cuerpo del texto legible y revisa que los símbolos no aparezcan como cuadros vacíos.' },
  '/letras-facebook': { example: 'Café de María · Novedades', guidance: 'Prueba un título breve en una publicación antes de usarlo en un nombre de perfil o página, que puede tener reglas adicionales. Mantén los datos de contacto en texto normal.' },
};
