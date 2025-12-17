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
// Script / Cursive
const sLower = '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏';
const sUpper = '𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵';
const sbLower = '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃';
const sbUpper = '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩';

// Fraktur / Gothic
const fLower = '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷';
const fUpper = '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ';
const fbLower = '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟';
const fbUpper = '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅';

// Serif & Sans Variants (High Compatibility)
const bLower = '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳';
const bUpper = '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘Ｚ';
const itLower = '𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧';
const itUpper = '𝐴𝐵𝐶𝐷𝐸𝐹𝐺ＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ';
const biLower = '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛';
const biUpper = '𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝒀𝑽𝑾𝑿𝒀𝒁';
const sanBlower = '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇';
const sanBupper = '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭';
const sanIlower = '𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝗊𝘳𝘴𝘵𝘶𝘷𝘸𝘅𝘺𝘻';
const sanIupper = '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡';

// Special Styles
const dsLower = '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫';
const dsUpper = '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ';
const scLower = 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ'; // Small Caps (approximation)
const scUpper = 'AʙCᴅEғGʜIᴊKʟMɴOᴘQʀSᴛUᴠWxYᴢ';
const monoLower = '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣';
const monoUpper = '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉';

// ==========================================
// 2. REGISTRO DE FUENTES
// ==========================================

const fontsList: FontStyle[] = [];

const add = (id: string, name: string, category: FontStyle['category'], map: Record<string, string>, pages: string[]) => {
  fontsList.push({ id, name, category, map, pages });
};

// --- COLECCIÓN PRINCIPAL (HOME 90+ ESTILOS) ---

const homeBases = [
  { id: 'sb', name: 'Negrita Elegante', cat: 'serif', map: createMap(lower + upper, bLower + bUpper) },
  { id: 'si', name: 'Itálica Soft', cat: 'serif', map: createMap(lower + upper, itLower + itUpper) },
  { id: 'sbi', name: 'Serif Bold Italic', cat: 'serif', map: createMap(lower + upper, biLower + biUpper) },
  { id: 'snub', name: 'Sans Bold Pro', cat: 'sans', map: createMap(lower + upper, sanBlower + sanBupper) },
  { id: 'snui', name: 'Sans Itálica', cat: 'sans', map: createMap(lower + upper, sanIlower + sanIupper) },
  { id: 'mono', name: 'Máquina de Escribir', cat: 'other', map: createMap(lower + upper, monoLower + monoUpper) },
  { id: 'sc', name: 'Versalitas Aesthetic', cat: 'other', map: createMap(lower + upper, scLower + scUpper) },
  { id: 'scr', name: 'Cursiva Fina', cat: 'script', map: createMap(lower + upper, sLower + sUpper) },
  { id: 'scrb', name: 'Cursiva Gruesa', cat: 'script', map: createMap(lower + upper, sbLower + sbUpper) },
  { id: 'got', name: 'Gótica Medieval', cat: 'gothic', map: createMap(lower + upper, fLower + fUpper) },
  { id: 'gotb', name: 'Gótica Real', cat: 'gothic', map: createMap(lower + upper, fbLower + fbUpper) },
  { id: 'ds', name: 'Estilo Hueco', cat: 'other', map: createMap(lower + upper, dsLower + dsUpper) }
];

const homeDecorators = [
  { id: 'none', name: '', char: '' },
  { id: 'heart', name: 'con Corazón', char: ' \u2764' },
  { id: 'star', name: 'con Estrellas', char: ' \u2727' },
  { id: 'spark', name: 'Brillo', char: '\u035b' },
  { id: 'arrow', name: 'Flecha Pro', char: ' \u27bd' },
  { id: 'dots', name: 'Punteado', char: '\u0323' },
  { id: 'slash', name: 'Corte', char: '\u0338' },
  { id: 'under', name: 'Marcado', char: '\u0332' }
];

// Generar 96 estilos (12 bases * 8 decoradores) para la página HOME
homeBases.forEach(base => {
  homeDecorators.forEach(deco => {
    const isBaseOnly = deco.id === 'none';
    add(
      `hm-${base.id}-${deco.id}`, 
      isBaseOnly ? base.name : `${base.name} ${deco.name}`, 
      base.cat as FontStyle['category'], 
      createCombinerMap(deco.char, base.map), 
      ['home']
    );
  });
});

// --- SECCIÓN: GRAFFITI (Urban Styles) ---
const safeGraffitiBases = [
  { id: 'tag', name: 'Firma Tag', map: createMap(lower, 'ąҍçժҽƒցհìʝҟӀʍղօքզɾʂէմѵա×վՀ') },
  { id: 'urban', name: 'Urbano Pro', map: createMap(lower, 'ค๒ς๔єŦﻮђเןкl๓ภ๏קợгรՇยڤฬץչ') }
];

safeGraffitiBases.forEach(base => {
  add(`grf-${base.id}`, base.name, 'decorative', base.map, ['graffiti']);
});

// Burbujas para Graffiti
add('grf-bubble', 'Burbuja Blanca', 'decorative', createMap(lower, 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ'), ['graffiti']);
add('grf-black', 'Burbuja Spray', 'decorative', createMap(lower, '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩'), ['graffiti']);

// --- SECCIÓN: OTROS (Amino, Facebook, etc) ---
add('am-small', 'Títulos Amino Small', 'other', createMap(lower + upper, scLower + scUpper), ['amino']);
add('fb-serif', 'Serif Legible FB', 'serif', createMap(lower + upper, bLower + bUpper), ['facebook']);

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
