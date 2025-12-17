import { FontStyle, TextSegment } from '../types';

// ==========================================
// 1. ALFABETOS BASE UNICODE (CENTRALIZADOS)
// ==========================================

const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const MAPS = {
  serifBold: '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇ＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  serifItalic: '𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧𝐴𝐵𝐶ＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  serifBoldItalic: '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰ＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  sansBold: '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝗅𝘆𝘇𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟ＭＮ𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭',
  sansItalic: '𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝑘𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡',
  scriptFine: '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻ＩＪＫＬＭＮＯＰＱ𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵',
  scriptBold: '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩',
  fraktur: '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ',
  frakturBold: '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅',
  monospace: '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉',
  doubleStruck: '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ',
  smallCaps: 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ',
  bubble: 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ',
  bubbleBlack: '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩',
  fullWidth: 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  specialUrban: 'ąҍçժҽƒցհìʝҟӀʍղօքզɾʂէմѵա×վՀ',
  specialTag: 'ค๒ς๔єŦﻮђเןкl๓ภ๏קợгรՇยڤฬץչ',
  specialChic: 'αвc∂єfɢнιjкℓмиσρqяѕтυνωχуz',
  specialSoft: 'αɓ૮∂εƒɠɦเʝҡℓɱɳσρҩ૨รƭµѵωϰყƶ'
};

// ==========================================
// 2. UTILIDADES DE CONSTRUCCIÓN
// ==========================================

const createMap = (source: string, target: string): Record<string, string> => {
  const map: Record<string, string> = {};
  const sourceChars = [...source];
  const targetChars = [...target];
  for (let i = 0; i < sourceChars.length; i++) {
    if (targetChars[i]) map[sourceChars[i]] = targetChars[i];
  }
  return map;
};

const createCombinerMap = (combiner: string, baseMap: Record<string, string>): Record<string, string> => {
  const map: Record<string, string> = { ...baseMap };
  const allChars = lower + upper + nums + 'áéíóúñÑ';
  for (const char of allChars) {
    const base = map[char] || char;
    map[char] = base + combiner;
  }
  return map;
};

// ==========================================
// 3. FÁBRICA DE COLECCIONES (STYLE FACTORY)
// ==========================================

interface BaseStyle {
  id: string;
  name: string;
  cat: FontStyle['category'];
  chars: string;
}

interface Decorator {
  id: string;
  name: string;
  char: string;
}

const generateCollection = (
  prefix: string,
  bases: BaseStyle[],
  decorators: Decorator[],
  pages: string[]
): FontStyle[] => {
  const collection: FontStyle[] = [];
  bases.forEach(base => {
    decorators.forEach(deco => {
      const isBaseOnly = deco.id === 'none';
      const baseMap = createMap(lower + upper, base.chars);
      collection.push({
        id: `${prefix}-${base.id}-${deco.id}`,
        name: isBaseOnly ? base.name : `${base.name} ${deco.name}`,
        category: base.cat,
        map: isBaseOnly ? baseMap : createCombinerMap(deco.char, baseMap),
        pages: pages
      });
    });
  });
  return collection;
};

// ==========================================
// 4. DEFINICIÓN DE COLECCIONES
// ==========================================

// --- DECORADORES ---
const DECOS_ELEGANT: Decorator[] = [
  { id: 'none', name: '', char: '' },
  { id: 'h', name: 'con Corazón', char: ' \u2665' },
  { id: 's', name: 'con Estrella', char: ' \u2727' },
  { id: 'sp', name: 'Sparkle', char: '\u0324' },
  { id: 'dt', name: 'Punteada', char: '\u0323' },
  { id: 'un', name: 'Subrayada', char: '\u0332' },
  { id: 'br', name: 'Brillante', char: '\u035b' },
  { id: 'fl', name: 'Floral', char: ' \u2740' }
];

const DECOS_URBAN: Decorator[] = [
  { id: 'none', name: '', char: '' },
  { id: 'dr', name: 'Goteo', char: '\u0323' },
  { id: 'cr', name: 'Corona', char: '\u030a' },
  { id: 'wal', name: 'Muro', char: '\u0333' }
];

// --- 4.1 COLECCIÓN HOME (96 ESTILOS) ---
const homeBases: BaseStyle[] = [
  { id: 'b', name: 'Negrita Pro', cat: 'serif', chars: MAPS.serifBold },
  { id: 'i', name: 'Itálica Soft', cat: 'serif', chars: MAPS.serifItalic },
  { id: 'bi', name: 'Serif Bold Italic', cat: 'serif', chars: MAPS.serifBoldItalic },
  { id: 'sb', name: 'Sans Bold', cat: 'sans', chars: MAPS.sansBold },
  { id: 'scr', name: 'Cursiva Real', cat: 'script', chars: MAPS.scriptFine },
  { id: 'scrb', name: 'Cursiva Gruesa', cat: 'script', chars: MAPS.scriptBold },
  { id: 'got', name: 'Gótica Medieval', cat: 'gothic', chars: MAPS.fraktur },
  { id: 'gotb', name: 'Gótica Real', cat: 'gothic', chars: MAPS.frakturBold },
  { id: 'ds', name: 'Estilo Hueco', cat: 'other', chars: MAPS.doubleStruck },
  { id: 'mono', name: 'Máquina de Escribir', cat: 'other', chars: MAPS.monospace },
  { id: 'sc', name: 'Versalitas Pro', cat: 'other', chars: MAPS.smallCaps },
  { id: 'fw', name: 'Ancho Completo', cat: 'other', chars: MAPS.fullWidth }
];
const homeFonts = generateCollection('hm', homeBases, DECOS_ELEGANT, ['home']);

// --- 4.2 COLECCIÓN CURSIVAS (80 ESTILOS ÚNICOS) ---
const cursiveBases: BaseStyle[] = [
  { id: 'c1', name: 'Caligrafía Fina', cat: 'script', chars: MAPS.scriptFine },
  { id: 'c2', name: 'Caligrafía Bold', cat: 'script', chars: MAPS.scriptBold },
  { id: 'c3', name: 'Firma Chic', cat: 'script', chars: MAPS.specialChic },
  { id: 'c4', name: 'Manuscrita Real', cat: 'script', chars: MAPS.specialSoft },
  { id: 'c5', name: 'Itálica Premium', cat: 'script', chars: MAPS.serifItalic },
  { id: 'c6', name: 'Itálica Gruesa', cat: 'script', chars: MAPS.serifBoldItalic },
  { id: 'c7', name: 'Script Minimal', cat: 'script', chars: MAPS.sansItalic },
  { id: 'c8', name: 'Pincel Japonés', cat: 'script', chars: 'ﾑ乃c d乇ｷg んﾉﾌズﾚﾼ刀のｱゐ尺丂ｲひ√Wﾒﾘ乙' },
  { id: 'c9', name: 'Marcador Pro', cat: 'script', chars: 'αвcdєfghíjkƖmnoρqrѕtuvwхчz' },
  { id: 'c10', name: 'Cero Gravedad', cat: 'script', chars: MAPS.doubleStruck }
];
const cursiveFonts = generateCollection('cur', cursiveBases, DECOS_ELEGANT, ['cursivas']);

// --- 4.3 COLECCIÓN GRAFFITI (40 ESTILOS) ---
const urbanBases: BaseStyle[] = [
  { id: 'tag', name: 'Firma Tag', cat: 'decorative', chars: MAPS.specialUrban },
  { id: 'urb', name: 'Urbano Pro', cat: 'decorative', chars: MAPS.specialTag },
  { id: 'bub', name: 'Burbuja Blanca', cat: 'decorative', chars: MAPS.bubble },
  { id: 'spr', name: 'Burbuja Spray', cat: 'decorative', chars: MAPS.bubbleBlack },
  { id: 'block', name: 'Bloque Calle', cat: 'decorative', chars: MAPS.fullWidth },
  { id: 'old', name: 'Old School', cat: 'decorative', chars: MAPS.fraktur },
  { id: 'chicano', name: 'Chicano Stylist', cat: 'decorative', chars: MAPS.frakturBold },
  { id: 'modern', name: 'Modern Tag', cat: 'decorative', chars: MAPS.sansBold },
  { id: 'wild', name: 'Wild Style', cat: 'decorative', chars: MAPS.doubleStruck },
  { id: 'dark', name: 'Gótico Urbano', cat: 'decorative', chars: MAPS.monospace }
];
const urbanFonts = generateCollection('grf', urbanBases, DECOS_URBAN, ['graffiti']);

// ==========================================
// 5. EXPORTACIÓN FINAL (UNIFICADA)
// ==========================================

export const FONTS: FontStyle[] = [
  ...homeFonts,
  ...cursiveFonts,
  ...urbanFonts,
  // Otros estilos estáticos si se necesitan
  { id: 'am-titles', name: 'Títulos Amino', category: 'other', map: createMap(lower, MAPS.smallCaps), pages: ['amino'] }
];

// ==========================================
// 6. PROCESAMIENTO DE TEXTO
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
