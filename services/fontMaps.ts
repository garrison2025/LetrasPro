import { FontStyle, TextSegment } from '../types';

// ==========================================
// 1. ALFABETOS BASE UNICODE (LIBRERÍA REAL)
// ==========================================

const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const MAPS = {
  sansBold: '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵ｉｊ𝒌𝗹𝗺ｎ𝗼𝗽𝗾𝗿𝘀𝘁ｕｖｗｘｙｚＡ𝗕ＣＤＥＦＧＨＩＪＫＬＭＮＯＰ𝗤𝗥𝗦ＴＵＶＷ𝗫𝗬𝗭',
  sansItalic: '𝘢𝘣ｃ𝘥𝑒𝘧𝘨𝘩ɪ𝘫𝑘𝘭𝘮𝘯𝘰𝘱𝗊𝘳𝘴𝘵ｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  sansBoldItalic: '𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞j𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐Ｖ𝙒𝙓𝙔𝙕',
  serifBold: '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝐀𝐁ＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  serifItalic: '𝑎𝑏𝑐ｄ𝑒ｆｇｈ𝑖𝑗𝑘ｌｍｎｏｐ𝑞ｒｓｔ𝑢𝑣ｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  serifBoldItalic: '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛𝑨𝑩𝑪𝑫ＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  scriptFine: '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏𝒜𝐵𝒞𝒟ＥＦＧＨＩＪＫＬＭＮＯＰＱＲ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵',
  scriptBold: '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩',
  fraktur: '𝔞𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ',
  frakturBold: '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅',
  monospace: '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱ＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  doubleStruck: '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙＱＲＳＴ𝕌𝕍𝕎𝕏𝕐ℤ',
  smallCaps: 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠｗｘｙｚ',
  tiny: 'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾᑫᴿˢᵀᵁⱽᵂˣʸᶻ',
  bubble: 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ',
  bubbleBlack: '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩',
  fullWidth: 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  specialSoft: 'αɓ૮∂εƒɠɦเʝҡℓɱɳσρҩ૨รƭµѵωϰყƶ',
  specialChic: 'αвc∂єfɢнιjкℓмиσρqяѕтυνωχуz',
  specialUrban: 'ąҍçժҽƒցհìʝҟӀʍղօքզɾʂէմѵա×վՀ',
  specialTag: 'ค๒ς๔єŦﻮђเןкl๓ภ๏קợгรՇยڤฬץչ',
  greek: 'αвсδεfghιjκlмηορqrsτυvωxyzΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ',
  squares: '🄰🄱🄲🄳🄴🄵🄿🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅿🅇🅈🅉',
  squaresBlack: '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🄾🆅🆆🆇🆈🆉'
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
  const allChars = lower + upper + '0123456789áéíóúñÑ';
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
  comp: FontStyle['compatibility'];
}

interface Decorator {
  id: string;
  name: string;
  char?: string;
  prefix?: string;
  suffix?: string;
  compBoost?: number; // Ajuste de compatibilidad (-1 low, 0 neutral)
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
      
      // Lógica de compatibilidad final
      let finalComp = b.comp;
      if (d.char && b.comp !== 'low') finalComp = 'medium'; // Combinar reduce compatibilidad
      if (d.id === 'u' || d.id === 's' || d.id === 'un') finalComp = 'low'; // Subrayados son low por naturaleza en Unicode

      res.push({
        id: `${prefix}-${b.id}-${d.id}`,
        name: isBaseOnly ? b.name : `${b.name} ${d.name}`,
        category: b.cat,
        map: finalMap,
        pages,
        compatibility: finalComp
      });
    });
  });
  return res;
};

// ==========================================
// 3. DEFINICIÓN DE DECORADORES POR PÁGINA
// ==========================================

const DECOS_HOME = [
  { id: 'none', name: 'Original' },
  { id: 'h', name: 'Aesthetic', char: '\u0324' },
  { id: 'u', name: 'Subrayado', char: '\u0332' },
  { id: 's', name: 'Tachado', char: '\u0336' },
  { id: 'st', name: 'con Estrella', char: ' \u2727' },
  { id: 'cr', name: 'con Corazón', char: ' \u2661' }
];

const DECOS_FACEBOOK = [
  { id: 'none', name: 'Classic' },
  { id: 'bold', name: 'Heavy', char: '\u0305' },
  { id: 'un', name: 'Focus', char: '\u0332' },
  { id: 'sp', name: 'Spark', char: ' \u2728' },
  { id: 'sq', name: 'Under', char: '\u0332\u0305' }
];

const DECOS_TATTOO = [
  { id: 'none', name: 'Clean Ink' },
  { id: 'dg', name: 'Dagger', char: ' 𓆩' },
  { id: 'cr', name: 'Cross', char: ' †' },
  { id: 'dw', name: 'Dotwork', char: ' ⁝' },
  { id: 'sk', name: 'Skull', char: ' ☠' },
  { id: 'st', name: 'Old School', char: ' ✧' }
];

const DECOS_AMINO = [
  { id: 'none', name: 'Minimal' },
  { id: 'love', name: 'Kawaii ♡', char: ' \u2661' },
  { id: 'magic', name: 'Magic ✧', char: ' ✧' },
  { id: 'soft', name: 'Dreamy', char: '\u0324' }
];

// ==========================================
// 4. DEFINICIÓN DE BASES POR PÁGINA
// ==========================================

const getCompForBase = (key: string): FontStyle['compatibility'] => {
  if (['sansBold', 'serifBold', 'sansItalic', 'serifItalic', 'monospace', 'fullWidth'].includes(key)) return 'high';
  if (['bubble', 'bubbleBlack', 'squares', 'squaresBlack', 'tiny'].includes(key)) return 'low';
  return 'medium';
};

// --- HOME BASES (24 BASES) ---
const homeBases: BaseStyle[] = Object.entries(MAPS).map(([key, val]) => ({
  id: key,
  name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
  cat: key.includes('script') || key.includes('special') ? 'script' : (key.includes('fraktur') ? 'gothic' : 'serif'),
  chars: val,
  comp: getCompForBase(key)
}));

// --- FACEBOOK BASES ---
const facebookBases: BaseStyle[] = [
  { id: 'sb', name: 'Negrita Sans', cat: 'sans', chars: MAPS.sansBold, comp: 'high' },
  { id: 'srb', name: 'Negrita Serif', cat: 'serif', chars: MAPS.serifBold, comp: 'high' },
  { id: 'si', name: 'Itálica Pro', cat: 'sans', chars: MAPS.sansItalic, comp: 'high' },
  { id: 'sc', name: 'Versalitas FB', cat: 'other', chars: MAPS.smallCaps, comp: 'medium' },
  { id: 'mono', name: 'Máquina FB', cat: 'other', chars: MAPS.monospace, comp: 'high' },
  { id: 'db', name: 'Contorno FB', cat: 'other', chars: MAPS.doubleStruck, comp: 'medium' },
  { id: 'fld', name: 'Ancho Total', cat: 'other', chars: MAPS.fullWidth, comp: 'high' },
  { id: 'tn', name: 'Diminuta FB', cat: 'other', chars: MAPS.tiny, comp: 'low' },
  { id: 'bs', name: 'Cursiva Bold', cat: 'script', chars: MAPS.scriptBold, comp: 'medium' },
  { id: 'grk', name: 'Estilo Griego', cat: 'other', chars: MAPS.greek, comp: 'medium' }
];

// --- AMINO BASES ---
const aminoBases: BaseStyle[] = [
  { id: 'sc', name: 'Small Caps Amino', cat: 'other', chars: MAPS.smallCaps, comp: 'medium' },
  { id: 'sf', name: 'Script Amino', cat: 'script', chars: MAPS.scriptFine, comp: 'medium' },
  { id: 'soft', name: 'Soft Aesthetic', cat: 'script', chars: MAPS.specialSoft, comp: 'medium' },
  { id: 'chic', name: 'Chic Aesthetic', cat: 'script', chars: MAPS.specialChic, comp: 'medium' },
  { id: 'bub', name: 'Bubble Amino', cat: 'decorative', chars: MAPS.bubble, comp: 'low' },
  { id: 'mon', name: 'Typewriter', cat: 'other', chars: MAPS.monospace, comp: 'high' },
  { id: 'dst', name: 'Outline', cat: 'other', chars: MAPS.doubleStruck, comp: 'medium' },
  { id: 'tn', name: 'Tiny Amino', cat: 'other', chars: MAPS.tiny, comp: 'low' },
  { id: 'grk', name: 'Greek Soft', cat: 'other', chars: MAPS.greek, comp: 'medium' },
  { id: 'sri', name: 'Itálica Serif', cat: 'serif', chars: MAPS.serifItalic, comp: 'high' }
];

// --- TATTOO BASES ---
const tattooBases: BaseStyle[] = [
  { id: 'old', name: 'Old English Pro', cat: 'gothic', chars: MAPS.frakturBold, comp: 'medium' },
  { id: 'chic', name: 'Chicano Lettering', cat: 'script', chars: MAPS.specialChic, comp: 'medium' },
  { id: 'fine', name: 'Fine Line Tattoo', cat: 'script', chars: MAPS.scriptFine, comp: 'medium' },
  { id: 'got', name: 'Gótica Medieval', cat: 'gothic', chars: MAPS.fraktur, comp: 'medium' },
  { id: 'urb', name: 'Urban Ink', cat: 'decorative', chars: MAPS.specialUrban, comp: 'medium' },
  { id: 'tag', name: 'Handstyle Tag', cat: 'decorative', chars: MAPS.specialTag, comp: 'medium' },
  { id: 'trad', name: 'Traditional Block', cat: 'serif', chars: MAPS.serifBold, comp: 'high' },
  { id: 'soft', name: 'Script Inked', cat: 'script', chars: MAPS.specialSoft, comp: 'medium' },
  { id: 'mono', name: 'Minimalist Dot', cat: 'other', chars: MAPS.monospace, comp: 'high' },
  { id: 'dst', name: 'Tribal Double', cat: 'other', chars: MAPS.doubleStruck, comp: 'medium' }
];

// ==========================================
// 5. GENERACIÓN FINAL DE COLECCIONES
// ==========================================

const homeFonts = generateCollection('hm', homeBases, DECOS_HOME, ['home']);
const facebookFonts = generateCollection('fb', facebookBases, DECOS_FACEBOOK, ['facebook']);
const aminoFonts = generateCollection('am', aminoBases, DECOS_AMINO, ['amino']);
const tattooFonts = generateCollection('tat', tattooBases, DECOS_TATTOO, ['tattoo', 'tatuajes']);

const extraCursive = generateCollection('exc', homeBases.filter(b => b.cat === 'script'), DECOS_HOME, ['cursivas']);
const extraGothic = generateCollection('exg', homeBases.filter(b => b.cat === 'gothic'), DECOS_HOME, ['goticas']);

export const FONTS: FontStyle[] = [
  ...homeFonts,
  ...facebookFonts,
  ...aminoFonts,
  ...tattooFonts,
  ...extraCursive,
  ...extraGothic
];

// ==========================================
// 6. PROCESAMIENTO (SPANISH FALLBACK)
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