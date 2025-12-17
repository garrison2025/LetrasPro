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

// --- Alfabetos Unicode Caligráficos ---
const sLower = '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏';
const sUpper = '𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵';
const sbLower = '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃';
const sbUpper = '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩';
const itLower = '𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧';
const itUpper = '𝐴𝐵𝐶𝐷𝐸𝐹𝐺ＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ';
const biLower = '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛';
const biUpper = '𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁';
const ssLower = '𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓';
const ssUpper = '𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹';
const bLower = '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳';
const bUpper = '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘Ｚ';

// ==========================================
// 2. REGISTRO DE FUENTES
// ==========================================

const fontsList: FontStyle[] = [];

const add = (id: string, name: string, category: FontStyle['category'], map: Record<string, string>, pages: string[]) => {
  fontsList.push({ id, name, category, map, pages });
};

// --- COLECCIÓN HOME (Generada previamente) ---
const homeBases = [
  { id: 'sb', name: 'Negrita Elegante', cat: 'serif', map: createMap(lower + upper, bLower + bUpper) },
  { id: 'si', name: 'Itálica Soft', cat: 'serif', map: createMap(lower + upper, itLower + itUpper) },
  { id: 'scr', name: 'Cursiva Fina', cat: 'script', map: createMap(lower + upper, sLower + sUpper) }
];
homeBases.forEach(base => {
  add(`hm-${base.id}`, base.name, base.cat as FontStyle['category'], base.map, ['home']);
});

// --- SECCIÓN: CURSIVAS (80+ ESTILOS ÚNICOS) ---

const cursiveBases = [
  { id: 'fine', name: 'Cursiva Fina', map: createMap(lower + upper, sLower + sUpper) },
  { id: 'bold', name: 'Cursiva Gruesa', map: createMap(lower + upper, sbLower + sbUpper) },
  { id: 'soft', name: 'Itálica Chic', map: createMap(lower + upper, itLower + itUpper) },
  { id: 'strong', name: 'Itálica Bold', map: createMap(lower + upper, biLower + biUpper) },
  { id: 'sign', name: 'Firma Real', map: createMap(lower, 'αвc∂єfɢнιjкℓмиσρqяѕтυνωχуz') },
  { id: 'casual', name: 'Manuscrita Casual', map: createMap(lower, 'αɓ૮∂εƒɠɦเʝҡℓɱɳσρҩ૨รƭµѵωϰყƶ') },
  { id: 'hand', name: 'Escritura a Mano', map: createMap(lower, '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃') },
  { id: 'minimal', name: 'Minimalista Itálica', map: createMap(lower + upper, ssLower + ssUpper) },
  { id: 'elegant', name: 'Caligrafía de Boda', map: createMap(lower, '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏') },
  { id: 'marker', name: 'Trazo de Rotulador', map: createMap(lower, 'αвcdєfghíjkƖmnoρqrѕtuvwхчz') }
];

const cursiveDecorators = [
  { id: 'none', name: '', char: '' },
  { id: 'heart', name: 'con Corazón', char: ' \u2665' },
  { id: 'spark', name: 'Aesthetic', char: '\u0324' },
  { id: 'swash', name: 'con Trazo', char: '\u0332' },
  { id: 'stars', name: 'con Brillo', char: '\u2727 ' },
  { id: 'flower', name: 'Floral', char: ' \u2740' },
  { id: 'dot', name: 'Punteada', char: '\u0323' },
  { id: 'under', name: 'Elegante', char: '\u0359' }
];

// Generar 80 variantes únicas (10 bases * 8 decoradores)
cursiveBases.forEach(base => {
  cursiveDecorators.forEach(deco => {
    const isBaseOnly = deco.id === 'none';
    add(
      `cur-${base.id}-${deco.id}`, 
      isBaseOnly ? base.name : `${base.name} ${deco.id === 'none' ? '' : deco.name}`, 
      'script', 
      createCombinerMap(deco.char, base.map), 
      ['cursivas']
    );
  });
});

// --- SECCIÓN: GRAFFITI (Urban Styles) ---
add('grf-tag', 'Firma Tag', 'decorative', createMap(lower, 'ąҍçժҽƒցհìʝҟӀʍղօքզɾʂէմѵա×վՀ'), ['graffiti']);
add('grf-bubble', 'Burbuja Blanca', 'decorative', createMap(lower, 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ'), ['graffiti']);

export const FONTS: FontStyle[] = fontsList;

// ==========================================
// 3. PROCESAMIENTO
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
