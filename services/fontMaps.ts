import { FontStyle, TextSegment } from '../types';

// ==========================================
// 1. ALFABETOS BASE (UNICODE)
// ==========================================

const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

// Mapeos de caracteres
const bLower = '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳';
const bUpper = '𝐀𝐁𝐂𝐃𝐄ＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ';
const itLower = '𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧';
const itUpper = '𝐴𝐵ＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ';
const biLower = '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛';
const biUpper = '𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁';
const sanBlower = '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵ｉｊｋ𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃ｗｘｙｚ';
const sanBupper = '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟Ｍ𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭';
const sLower = '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏';
const sUpper = '𝒜𝐵𝒞𝒟𝐸𝐹𝒢ＨＩＪＫＬＭＮＯＰＱ𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵';
const sbLower = '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃';
const sbUpper = '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩';
const fLower = '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷';
const fUpper = '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ';
const fbLower = '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟';
const fbUpper = '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅';
const dsLower = '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫';
const dsUpper = '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ';
const scLower = 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ';
const monoLower = '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣';

// ==========================================
// 2. UTILIDADES DE CONSTRUCCIÓN
// ==========================================

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

const fontsList: FontStyle[] = [];

// ==========================================
// 3. COLECCIÓN: HOME (INICIO) - 96 ESTILOS
// ==========================================

const homeBases = [
  { id: 'b', name: 'Negrita Pro', cat: 'serif', map: createMap(lower + upper, bLower + bUpper) },
  { id: 'i', name: 'Itálica Soft', cat: 'serif', map: createMap(lower + upper, itLower + itUpper) },
  { id: 'bi', name: 'Serif Bold Italic', cat: 'serif', map: createMap(lower + upper, biLower + biUpper) },
  { id: 'sb', name: 'Sans Bold', cat: 'sans', map: createMap(lower + upper, sanBlower + sanBupper) },
  { id: 'scr', name: 'Cursiva Real', cat: 'script', map: createMap(lower + upper, sLower + sUpper) },
  { id: 'scrb', name: 'Cursiva Gruesa', cat: 'script', map: createMap(lower + upper, sbLower + sbUpper) },
  { id: 'got', name: 'Gótica Medieval', cat: 'gothic', map: createMap(lower + upper, fLower + fUpper) },
  { id: 'gotb', name: 'Gótica Real', cat: 'gothic', map: createMap(lower + upper, fbLower + fbUpper) },
  { id: 'mono', name: 'Máquina de Escribir', cat: 'other', map: createMap(lower, monoLower) },
  { id: 'ds', name: 'Estilo Hueco', cat: 'other', map: createMap(lower + upper, dsLower + dsUpper) },
  { id: 'sc', name: 'Versalitas Pro', cat: 'other', map: createMap(lower, scLower) },
  { id: 'full', name: 'Ancho Completo', cat: 'other', map: createMap(lower, 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ') }
];

const homeDecos = [
  { id: 'none', n: '', c: '' },
  { id: 'h', n: 'con Corazón', c: ' \u2764' },
  { id: 's', n: 'con Estrella', c: ' \u2727' },
  { id: 'sp', n: 'Brillante', c: '\u035b' },
  { id: 'ar', n: 'Flecha', c: ' \u27bd' },
  { id: 'dt', n: 'Puntos', c: '\u0323' },
  { id: 'sl', n: 'Slash', c: '\u0338' },
  { id: 'un', n: 'Subrayado', c: '\u0332' }
];

homeBases.forEach(base => {
  homeDecos.forEach(deco => {
    fontsList.push({
      id: `hm-${base.id}-${deco.id}`,
      name: deco.id === 'none' ? base.name : `${base.name} ${deco.n}`,
      category: base.cat as FontStyle['category'],
      map: createCombinerMap(deco.c, base.map),
      pages: ['home']
    });
  });
});

// ==========================================
// 4. COLECCIÓN: CURSIVAS - 80 ESTILOS
// ==========================================

const cursiveBases = [
  { id: 'c1', name: 'Caligrafía Fina', map: createMap(lower + upper, sLower + sUpper) },
  { id: 'c2', name: 'Caligrafía Bold', map: createMap(lower + upper, sbLower + sbUpper) },
  { id: 'c3', name: 'Firma Artística', map: createMap(lower, 'αвc∂єfɢнιjкℓмиσρqяѕтυνωχуz') },
  { id: 'c4', name: 'Manuscrita Real', map: createMap(lower, 'αɓ૮∂εƒɠɦเʝҡℓɱɳσρҩ૨รƭµѵωϰყƶ') },
  { id: 'c5', name: 'Itálica Chic', map: createMap(lower + upper, itLower + itUpper) },
  { id: 'c6', name: 'Itálica Bold', map: createMap(lower + upper, biLower + biUpper) },
  { id: 'c7', name: 'Script de Diario', map: createMap(lower, '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃') },
  { id: 'c8', name: 'Pincel Japonés', map: createMap(lower, 'ﾑ乃c d乇ｷg んﾉﾌズﾚﾼ刀のｱゐ尺丂ｲひ√Wﾒﾘ乙') },
  { id: 'c9', name: 'Marcador Pro', map: createMap(lower, 'αвcdєfghíjkƖmnoρqrѕtuvwхчz') },
  { id: 'c10', name: 'Minimal Script', map: createMap(lower, '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫') }
];

const cursiveDecos = [
  { id: 'n', n: '', c: '' },
  { id: 'h', n: 'con Corazón', c: ' \u2665' },
  { id: 'sw', n: 'con Trazo', c: '\u0332' },
  { id: 'st', n: 'con Brillo', c: '\u2727 ' },
  { id: 'fl', n: 'Floral', c: ' \u2740' },
  { id: 'sp', n: 'Sparkle', c: '\u0324' },
  { id: 'dt', n: 'Punteada', c: '\u0323' },
  { id: 'un', n: 'Elegante', c: '\u0359' }
];

cursiveBases.forEach(base => {
  cursiveDecos.forEach(deco => {
    fontsList.push({
      id: `cur-${base.id}-${deco.id}`,
      name: deco.id === 'n' ? base.name : `${base.name} ${deco.n}`,
      category: 'script',
      map: createCombinerMap(deco.c, base.map),
      pages: ['cursivas']
    });
  });
});

// ==========================================
// 5. COLECCIÓN: GRAFFITI - 40+ ESTILOS
// ==========================================

const urbanBases = [
  { id: 'tag', name: 'Firma Tag', map: createMap(lower, 'ąҍçժҽƒցհìʝҟӀʍղօքզɾʂէմѵա×վՀ') },
  { id: 'urb', name: 'Urbano Pro', map: createMap(lower, 'ค๒ς๔єŦﻮђเןкl๓ภ๏קợгรՇยڤฬץչ') },
  { id: 'bub', name: 'Burbuja Blanca', map: createMap(lower, 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ') },
  { id: 'spr', name: 'Burbuja Spray', map: createMap(lower, '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩') }
];

const urbanDecos = [
  { id: 'n', n: '', c: '' },
  { id: 'dr', n: 'Goteo', c: '\u0323' },
  { id: 'cr', n: 'Corona', c: '\u030a' },
  { id: 'sub', n: 'Subrayado', c: '\u0332' },
  { id: 'wal', n: 'Muro', c: '\u0333' }
];

urbanBases.forEach(base => {
  urbanDecos.forEach(deco => {
    fontsList.push({
      id: `grf-${base.id}-${deco.id}`,
      name: deco.id === 'n' ? base.name : `${base.name} ${deco.n}`,
      category: 'decorative',
      map: createCombinerMap(deco.c, base.map),
      pages: ['graffiti']
    });
  });
});

// --- Otras categorías ---
fontsList.push({
  id: 'am-small',
  name: 'Títulos Amino',
  category: 'other',
  map: createMap(lower, scLower),
  pages: ['amino']
});

export const FONTS: FontStyle[] = fontsList;

// ==========================================
// 6. PROCESAMIENTO
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
