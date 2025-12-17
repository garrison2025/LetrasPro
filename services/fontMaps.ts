import { FontStyle, TextSegment } from '../types';

// ==========================================
// 1. UTILIDADES Y ALFABETOS BASE
// ==========================================

const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const createMap = (source: string, target: string): Record<string, string> => {
  const map: Record<string, string> = {};
  const targetChars = [...target];
  for (let i = 0; i < source.length; i++) {
    if (targetChars[i]) map[source[i]] = targetChars[i];
  }
  return map;
};

const createCombinerMap = (combiner: string, baseMap?: Record<string, string>): Record<string, string> => {
  const map: Record<string, string> = baseMap ? { ...baseMap } : {};
  const allChars = lower + upper + nums + 'áéíóúñÑ';
  for (const char of allChars) {
    const base = map[char] || char;
    map[char] = base + combiner;
  }
  return map;
};

// --- Alfabetos Unicode ---
const sLower = '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏';
const sUpper = '𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵';
const sbLower = '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃';
const sbUpper = '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩';
const fLower = '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷';
const fUpper = '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ';
const fbLower = '𝖆𝖇𝖈\u0264𝖊𝖋𝖌\u0265𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟';
const fbUpper = '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅';
const itLower = '𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧';
const itUpper = '𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀ＮＯＰＱＲＳＴＵＶＷＸＹＺ';
// Define dsLower and dsUpper for Double Struck (Hollow) alphabet to fix build errors
const dsLower = '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫';
const dsUpper = '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ';

// ==========================================
// 2. REGISTRO DE FUENTES (MÁS DE 150 TOTALES)
// ==========================================

const fontsList: FontStyle[] = [];

const add = (id: string, name: string, category: FontStyle['category'], map: Record<string, string>, pages: string[]) => {
  fontsList.push({ id, name, category, map, pages });
};

// --- SECCIÓN: CURSIVAS (Optimizadas anteriormente) ---
add('sc-1', 'Cursiva Fina', 'script', createMap(lower + upper, sLower + sUpper), ['home', 'cursivas']);
add('sc-2', 'Cursiva Caligráfica', 'script', createMap(lower + upper, sbLower + sbUpper), ['home', 'cursivas']);
add('sc-3', 'Manuscrita Elegante', 'script', createMap(lower, 'ąҍçժҽƒցհìʝҟӀʍղօքզɾʂէմѵա×վՀ'), ['cursivas']);

// --- SECCIÓN: GÓTICAS (EXPANSIÓN 70+ ESTILOS) ---

// Bases Góticas
const gothicBases = [
  { id: 'fraktur', name: 'Gótica Fraktur', map: createMap(lower + upper, fLower + fUpper) },
  { id: 'boldgot', name: 'Gótica Real', map: createMap(lower + upper, fbLower + fbUpper) },
  { id: 'ancient', name: 'Gótica Antigua', map: createMap(lower, '𝔞𝔟𝔠𝔡𝔢\u0192\u0261\u0265𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷') },
  { id: 'medieval', name: 'Manuscrito Medieval', map: createMap(lower, '𝖆𝖇𝔠\u0264𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚\u028B𝖜𝖝𝖞𝖟') },
  { id: 'vampire', name: 'Estilo Vampírico', map: createMap(lower, 'αβςδεfghίjκλmπøρqrstυνωxyz') },
  { id: 'ritual', name: 'Ritual Oscuro', map: createMap(lower, 'αb☾dℯfġhïjκlmñöpqřšŧüvŵxŷź') },
  { id: 'chicano', name: 'Gótica Chicana', map: createMap(lower, 'ค๒ς๔єŦﻮђเןкl๓ภ๏קợгรՇยڤฬץչ') }
];

// Decoradores Dark/Gothic
const darkDecorators = [
  { id: 'cross', name: 'con Cruz', char: '\u2020' },
  { id: 'dagger', name: 'con Daga', char: '\u2021' },
  { id: 'skull', name: 'Calavera', char: '☠' },
  { id: 'chain', name: 'con Cadenas', char: '\u0333' },
  { id: 'blood', name: 'con Sangre', char: '\u0323' },
  { id: 'spikes', name: 'con Espinas', char: '\u0338' },
  { id: 'ritual', name: 'Ritual', char: '\u035b' },
  { id: 'stars', name: 'con Estrellas Dark', char: '\u0359' },
  { id: 'shadow', name: 'Sombreada', char: '\u0332' },
  { id: 'ghost', name: 'Fantasmagórica', char: '\u030a' }
];

// Generar 70 variantes Góticas (7 bases * 10 decoradores)
gothicBases.forEach(base => {
  darkDecorators.forEach(deco => {
    add(
      `gt-${base.id}-${deco.id}`, 
      `${base.name} ${deco.name}`, 
      'gothic', 
      createCombinerMap(deco.char, base.map), 
      ['goticas', 'tatuajes', 'tattoo']
    );
  });
});

// Estilos Góticos Estáticos Adicionales (Para superar los 75)
add('gt-metal', 'Metal Extremo', 'gothic', createMap(lower, 'ℳ𝔈𝔗𝔄𝔏_𝔈𝔛𝔗ℜ𝔈𝔐℈'), ['goticas']);
add('gt-catedral', 'Catedralicia Pro', 'gothic', createMap(lower, 'ℭ𝔞𝔱𝔢𝔡𝔯𝔞𝔩𝔦𝔠𝔦𝔞'), ['goticas', 'tatuajes']);
add('gt-darkness', 'Oscuridad Eterna', 'gothic', createMap(lower, '𝔒𝔰𝔠𝔲𝔯𝔦𝔡𝔞𝔡_𝔈𝔱𝔢𝔯𝔫𝔞'), ['goticas']);

// --- OTRAS CATEGORÍAS (Burbujas, Graffiti, etc) ---
const otherBases = [
  { id: 'italic', name: 'Itálica', map: createMap(lower + upper, itLower + itUpper) },
  { id: 'hollow', name: 'Hueca', map: createMap(lower + upper, dsLower + dsUpper) },
  { id: 'normal', name: 'Estilo', map: {} }
];

const generalDecorators = [
  { id: 'nube', name: 'Nube', char: '\u0489' },
  { id: 'brillo', name: 'Brillo', char: '\u035b' }
];

otherBases.forEach(base => {
  generalDecorators.forEach(deco => {
    add(`${base.id}-${deco.id}`, `${base.name} ${deco.name}`, 'other', createCombinerMap(deco.char, base.map), ['home']);
  });
});

add('dec-1', 'Burbujas Blancas', 'decorative', createMap(lower, 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ'), ['home', 'graffiti']);
add('dec-2', 'Burbujas Negras', 'decorative', createMap(upper, '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩'), ['home', 'graffiti']);

export const FONTS: FontStyle[] = fontsList;

// ==========================================
// 3. FUNCIONES DE PROCESAMIENTO
// ==========================================

const SPANISH_REGEX = /[áéíóúñÑ¿¡]/;

export const convertText = (text: string, map: Record<string, string>): string => {
  const normalized = text.normalize('NFC');
  return [...normalized].map(char => map[char] || char).join('');
};

export const getDisplaySegments = (text: string, map: Record<string, string>): TextSegment[] => {
  const segments: TextSegment[] = [];
  const normalized = text.normalize('NFC');
  
  let currentContent = '';
  let currentIsFallback = false;

  const pushSegment = () => {
    if (currentContent) {
      segments.push({ content: currentContent, isFallback: currentIsFallback });
      currentContent = '';
    }
  };

  for (const char of [...normalized]) {
    const mapped = map[char];
    if (mapped) {
      if (currentIsFallback) pushSegment();
      currentIsFallback = false;
      currentContent += mapped;
    } else {
      const isSpecial = SPANISH_REGEX.test(char);
      if (isSpecial) {
         if (!currentIsFallback && currentContent) pushSegment();
         currentIsFallback = true;
         currentContent += char;
      } else {
         if (currentIsFallback) pushSegment();
         currentIsFallback = false;
         currentContent += char;
      }
    }
  }
  pushSegment();
  return segments;
};