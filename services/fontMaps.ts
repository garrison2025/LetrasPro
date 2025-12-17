import { FontStyle, TextSegment } from '../types';

// ==========================================
// 1. ALFABETOS BASE UNICODE (CENTRALIZADOS)
// ==========================================

const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const MAPS = {
  serifBold: '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝐀𝐁ＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  serifItalic: '𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧𝐴𝐵ＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  serifBoldItalic: '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛𝑨𝑩𝑪𝑫ＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  sansBold: '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵ｉｊ𝒌𝗹𝗺ｎ𝗼𝗽𝗾𝗿𝘀𝘁ｕ𝘃ｗｘｙｚＡ𝗕ＣＤＥＦＧＨＩＪＫＬＭＮＯＰ𝗤𝗥𝗦ＴＵＶＷ𝗫𝗬𝗭',
  sansItalic: '𝘢𝘣𝘤𝘥𝑒𝘧𝘨𝘩ɪ𝘫𝑘𝘭𝘮𝘯ｵ𝘱𝗊ｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  scriptFine: '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏𝒜𝐵𝒞𝒟ＥＦＧＨＩＪＫＬＭＮＯＰＱＲ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵',
  scriptBold: '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩',
  fraktur: '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ',
  frakturBold: '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅',
  monospace: '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱ＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  doubleStruck: '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙＱＲＳＴ𝕌𝕍𝕎𝕏𝕐ℤ',
  smallCaps: 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠｗｘｙｚ',
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
  const sChars = [...source];
  const tChars = [...target];
  for (let i = 0; i < sChars.length; i++) {
    if (tChars[i]) map[sChars[i]] = tChars[i];
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

const generateCollection = (prefix: string, bases: BaseStyle[], decos: Decorator[], pages: string[]): FontStyle[] => {
  const res: FontStyle[] = [];
  bases.forEach(b => {
    decos.forEach(d => {
      const isBaseOnly = d.id === 'none';
      const baseMap = createMap(lower + upper, b.chars);
      
      let finalMap = { ...baseMap };
      if (d.char) {
        finalMap = createCombinerMap(d.char, baseMap);
      }

      res.push({
        id: `${prefix}-${b.id}-${d.id}`,
        name: isBaseOnly ? b.name : `${b.name} ${d.name}`,
        category: b.cat,
        map: finalMap,
        pages
      });
    });
  });
  return res;
};

// ==========================================
// 3. DEFINICIÓN DE COLECCIONES
// ==========================================

const DECOS_ELEGANT = [
  { id: 'none', name: '', char: '' },
  { id: 'h', name: 'con Corazón', char: ' \u2665' },
  { id: 's', name: 'con Estrella', char: ' \u2727' },
  { id: 'dt', name: 'Punteada', char: '\u0323' },
  { id: 'un', name: 'Subrayada', char: '\u0332' }
];

const DECOS_URBAN = [
  { id: 'none', name: '', char: '' },
  { id: 'dr', name: 'Goteo', char: '\u0323' },
  { id: 'cr', name: 'Corona', char: '\u030a' },
  { id: 'fire', name: 'Fuego', char: ' \u{1F525}' }
];

const DECOS_DARK = [
  { id: 'none', name: '', char: '' },
  { id: 'cr', name: '† Cross', char: ' \u2020' },
  { id: 'sk', name: '☠ Skull', char: ' \u2620' },
  { id: 'dg', name: '𓆩 Dagger', char: '\u0338' }
];

const DECOS_TATTOO = [
  { id: 'none', name: 'Limpio', char: '' },
  { id: 'dg', name: 'Daga', char: ' 𓆩' },
  { id: 'cr', name: 'Cruz', char: ' †' },
  { id: 'dw', name: 'Dotwork', char: ' ⁝' },
  { id: 'sk', name: 'Skull', char: ' ☠' },
  { id: 'st', name: 'Star', char: ' ✧' }
];

const DECOS_FACEBOOK = [
  { id: 'none', name: 'Pro', char: '' },
  { id: 'un', name: 'Subrayado', char: '\u0332' },
  { id: 'st', name: 'Tachado', char: '\u0336' },
  { id: 'sp', name: 'Spark', char: ' \u2728' },
  { id: 'sq', name: 'Square', char: '\u0332\u0305' }
];

const DECOS_AMINO = [
  { id: 'none', name: 'Soft', char: '' },
  { id: 'heart', name: 'Aesthetic ♡', char: ' \u2661' },
  { id: 'star', name: 'Magic ✧', char: ' ✧' },
  { id: 'spr', name: '◌̥ Sparkle', char: '\u0324' }
];

// --- 3.1 HOME ---
const homeBases: BaseStyle[] = [
  { id: 'b', name: 'Negrita Pro', cat: 'serif', chars: MAPS.serifBold },
  { id: 'i', name: 'Itálica Soft', cat: 'serif', chars: MAPS.serifItalic },
  { id: 'scr', name: 'Cursiva Real', cat: 'script', chars: MAPS.scriptFine },
  { id: 'got', name: 'Gótica Medieval', cat: 'gothic', chars: MAPS.fraktur },
  { id: 'sc', name: 'Versalitas Pro', cat: 'other', chars: MAPS.smallCaps }
];
const homeFonts = generateCollection('hm', homeBases, DECOS_ELEGANT, ['home']);

// --- 3.2 CURSIVAS ---
const cursiveBases: BaseStyle[] = [
  { id: 'c1', name: 'Caligrafía Fina', cat: 'script', chars: MAPS.scriptFine },
  { id: 'c2', name: 'Caligrafía Bold', cat: 'script', chars: MAPS.scriptBold },
  { id: 'c3', name: 'Firma Chic', cat: 'script', chars: MAPS.specialChic },
  { id: 'c4', name: 'Manuscrita Real', cat: 'script', chars: MAPS.specialSoft }
];
const cursiveFonts = generateCollection('cur', cursiveBases, DECOS_ELEGANT, ['cursivas']);

// --- 3.3 GÓTICAS ---
const gothicBases: BaseStyle[] = [
  { id: 'g1', name: 'Gótica Fraktur', cat: 'gothic', chars: MAPS.fraktur },
  { id: 'g2', name: 'Gótica Blackletter', cat: 'gothic', chars: MAPS.frakturBold }
];
const gothicFonts = generateCollection('got', gothicBases, DECOS_DARK, ['goticas']);

// --- 3.4 GRAFFITI ---
const urbanBases: BaseStyle[] = [
  { id: 'tag', name: 'Firma Tag', cat: 'decorative', chars: MAPS.specialUrban },
  { id: 'urb', name: 'Urbano Pro', cat: 'decorative', chars: MAPS.specialTag },
  { id: 'bub', name: 'Burbuja Blanca', cat: 'decorative', chars: MAPS.bubble }
];
const urbanFonts = generateCollection('grf', urbanBases, DECOS_URBAN, ['graffiti']);

// --- 3.5 TATTOO ---
const tattooBases: BaseStyle[] = [
  { id: 'chic', name: 'Chicano Pro', cat: 'script', chars: MAPS.specialChic },
  { id: 'old', name: 'Old English Real', cat: 'gothic', chars: MAPS.frakturBold },
  { id: 'fine', name: 'Fine Line Tattoo', cat: 'script', chars: MAPS.scriptFine },
  { id: 'tribal', name: 'Tribal Ink Style', cat: 'decorative', chars: MAPS.specialUrban },
  { id: 'black', name: 'Blackletter Med', cat: 'gothic', chars: MAPS.fraktur },
  { id: 'trad', name: 'Traditional Block', cat: 'serif', chars: MAPS.serifBold },
  { id: 'mini', name: 'Minimalist Skin', cat: 'other', chars: MAPS.monospace },
  { id: 'inked', name: 'Cursive Inked', cat: 'script', chars: MAPS.scriptBold },
  { id: 'strong', name: 'Sans Strong Tattoo', cat: 'sans', chars: MAPS.sansBold },
  { id: 'soft', name: 'Soft Lettering', cat: 'script', chars: MAPS.specialSoft }
];
const tattooFonts = generateCollection('tat', tattooBases, DECOS_TATTOO, ['tattoo', 'tatuajes']);

// --- 3.6 FACEBOOK ---
const facebookBases: BaseStyle[] = [
  { id: 'sb', name: 'Sans Bold FB', cat: 'sans', chars: MAPS.sansBold },
  { id: 'srb', name: 'Serif Bold FB', cat: 'serif', chars: MAPS.serifBold },
  { id: 'si', name: 'Sans Italic FB', cat: 'sans', chars: MAPS.sansItalic },
  { id: 'sri', name: 'Serif Bold Italic', cat: 'serif', chars: MAPS.serifBoldItalic },
  { id: 'cap', name: 'Small Caps Pro', cat: 'other', chars: MAPS.smallCaps },
  { id: 'mono', name: 'Typewriter FB', cat: 'other', chars: MAPS.monospace },
  { id: 'dbl', name: 'Double Struck', cat: 'other', chars: MAPS.doubleStruck },
  { id: 'cur', name: 'Cursive Soft', cat: 'script', chars: MAPS.scriptFine },
  { id: 'bld', name: 'Bold Script FB', cat: 'script', chars: MAPS.scriptBold },
  { id: 'fld', name: 'Full Width Bold', cat: 'other', chars: MAPS.fullWidth }
];
const facebookFonts = generateCollection('fb', facebookBases, DECOS_FACEBOOK, ['facebook']);

// --- 3.7 AMINO (NUEVA COLECCIÓN - 40 ESTILOS) ---
const aminoBases: BaseStyle[] = [
  { id: 'sc', name: 'Versalitas Amino', cat: 'other', chars: MAPS.smallCaps },
  { id: 'srb', name: 'Negrita Estética', cat: 'serif', chars: MAPS.serifBold },
  { id: 'snb', name: 'Sans Impacto', cat: 'sans', chars: MAPS.sansBold },
  { id: 'scf', name: 'Script Elegante', cat: 'script', chars: MAPS.scriptFine },
  { id: 'scb', name: 'Script Bold Pro', cat: 'script', chars: MAPS.scriptBold },
  { id: 'mon', name: 'Máquina Escribir', cat: 'other', chars: MAPS.monospace },
  { id: 'dst', name: 'Contorno Pro', cat: 'other', chars: MAPS.doubleStruck },
  { id: 'sof', name: 'Soft Kawaii', cat: 'script', chars: MAPS.specialSoft },
  { id: 'chi', name: 'Estética Chic', cat: 'script', chars: MAPS.specialChic },
  { id: 'bub', name: 'Burbuja Amino', cat: 'decorative', chars: MAPS.bubble }
];
const aminoFonts = generateCollection('am', aminoBases, DECOS_AMINO, ['amino']);

// ==========================================
// 4. EXPORTACIÓN FINAL
// ==========================================

export const FONTS: FontStyle[] = [
  ...homeFonts,
  ...cursiveFonts,
  ...gothicFonts,
  ...urbanFonts,
  ...tattooFonts,
  ...facebookFonts,
  ...aminoFonts
];

// ==========================================
// 5. PROCESAMIENTO
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
