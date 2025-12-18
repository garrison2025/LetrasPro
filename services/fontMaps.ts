
import { FontStyle, TextSegment } from '../types';

const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';

// 1. BASE UNICODE MAPS
// Ensure ALL keys referenced in initFonts exist here to prevent crashes.
const MAPS: Record<string, string> = {
  // --- SANS SERIF ---
  sans: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  sansBold: '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵ｉｊ𝒌𝗹𝗺ｎ𝗼𝗽𝗾𝗿𝘀𝘁ｕｖｗｘｙｚＡ𝗕ＣＤＥＦＧＨＩＪＫＬＭＮＯＰ𝗤𝗥𝗦ＴＵＶＷ𝗫𝗬𝗭𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵',
  sansItalic: '𝘢𝘣ｃ𝘥𝑒𝘧𝘨𝘩ɪ𝘫𝑘𝘭𝘮𝘯𝘰𝘱𝗊𝘳𝘴𝘵ｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ0123456789',
  sansBoldItalic: '𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵',
  
  // --- SERIF ---
  serifBold: '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝐀𝐁ＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗',
  serifItalic: '𝑎𝑏𝑐ｄ𝑒ｆｇｈ𝑖𝑗𝑘ｌｍｎｏｐ𝑞ｒｓｔ𝑢𝑣ｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ0123456789',
  serifBoldItalic: '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗',
  
  // --- SCRIPT / CURSIVE ---
  scriptFine: '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏𝒜𝐵𝒞𝒟ＥＦＧＨＩＪＫＬＭＮＯＰＱＲ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵0123456789',
  scriptBold: '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝗺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩0123456789',
  handwriting: 'αвc∂єfɢнιjкℓмиσρqяѕтυνωχуz𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩0123456789',
  lovely: 'ꍏ♭☾◗€ƒ⍙hï♪k↳♔♫⊙ρq®ⓢ☂u☋ωx☿zkＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ0123456789',
  
  // --- GOTHIC ---
  fraktur: '𝔞𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ0123456789',
  frakturBold: '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅0123456789',
  
  // --- GRAFFITI / URBAN ---
  bubble: 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ⓪①②③④⑤⑥⑦⑧⑨',
  bubbleBlack: '🅐𝑩𝑪𝑨𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁🅐𝑩𝑪𝑨𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁⓿❶❷❸❹❺❻❼❽❾',
  square: '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉0123456789',
  squareBlack: '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉0123456789',
  wide: 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ０１２３４５６７８９',
  
  // --- AESTHETIC / OTHER ---
  smallCaps: 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠｗｘｙｚᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ0123456789',
  monospace: '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱ＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿',
  doubleStruck: '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙＱＲＳＴ𝕌𝕍𝕎𝕏𝕐ℤ𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡',
  inverted: 'ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz∀ᗺƆᗡƎℲ⅁HIᗿK˥WNOԀΌᴚS⊥∩ΛMX⅄Z0123456789',
  greek: 'αвc∂єfɢнιjкℓмиσρqяѕтυνωχуzΑΒCDEFGHΙJKLMΝOPQRSTUVWΧΥZ0123456789',
  russian: 'аъcdэfɢнїjкlмиорqяsтцvшxчzАБCDЭFGHЇJКLМИОPQЯSТЦVШXЧZ0123456789',
  
  // --- SPECIAL / NEW ---
  regional: '🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿0123456789', // Blue letters
  tagging: 'Ⱥƀ↻ժeƒǥhìʝƙꝆɱñøþqɾ$†uƲw×¥ƵȺƀ↻ժeƒǥhìʝƙꝆɱñøþqɾ$†uƲw×¥Ƶ0123456789', // Urban marker
  oldSchool: '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗', // Traditional Tattoo
  censored: '████████████████████████████████████████████████████0123456789',
  censoredLight: '▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒0123456789',
  chicano: '𝓐𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩0123456789',
  heavySans: '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃ｗ𝗫𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵',
  
  // Numbers specific (for tools)
  romans: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0ⅠⅡⅢⅣⅤⅥⅦⅧⅨ' // Mapped 0-9 to Roman
};

const ACCENT_MAP: Record<string, string> = {
  'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
  'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
  'ñ': 'n', 'Ñ': 'N', 'ü': 'u', 'Ü': 'U'
};

const COMBINERS = {
  tilde: '\u0303',
  acute: '\u0301',
  underline: '\u0332',
  doubleUnderline: '\u0333',
  strikethrough: '\u0336',
  crosshatch: '\u0337',
  slash: '\u0338',
  seagull: '\u0338',
  arrowBelow: '\u034E',
  tildeBelow: '\u0330',
  wave: '\u0330', 
  dot: '\u0323'
};

const DECORATOR_CONFIG: Record<string, { prefix: string, suffix: string }> = {};

// Helper: Create Character Map with Safety Check
const createMap = (target: string | undefined): Record<string, string> => {
  const map: Record<string, string> = {};
  if (!target) return map; // Prevents whitespace screen if map is missing
  
  const sChars = [...(lower + upper + numbers)];
  const tChars = [...target]; 
  
  sChars.forEach((c, i) => { if (tChars[i]) map[c] = tChars[i]; });
  return map;
};

// Helper: Create Combiner Map
const createCombinerMap = (baseMapId: string, combinerChar: string): Record<string, string> => {
  const baseMap = createMap(MAPS[baseMapId] || MAPS.sans);
  const newMap: Record<string, string> = {};
  Object.keys(baseMap).forEach(k => {
    newMap[k] = baseMap[k] + combinerChar;
  });
  return newMap;
};

let generatedFonts: FontStyle[] = [];

// Helper function to add fonts
const addFont = (
  id: string, 
  name: string, 
  cat: FontStyle['category'], 
  mapData: Record<string, string>, 
  tags: string[] = [], 
  comp: FontStyle['compatibility'] = 'medium'
) => {
  const fullId = `pro-${id}`;
  generatedFonts.push({
    id: fullId,
    name,
    category: cat,
    map: mapData,
    pages: getPagesForCategory(cat, id),
    compatibility: comp,
    tags
  });
  return fullId;
};

// Complex Page Logic for new Categories
const getPagesForCategory = (cat: string, id: string): string[] => {
  const p = ['home'];
  const lowerId = id.toLowerCase();

  // --- CURSIVAS ---
  if (cat === 'script' || cat === 'coquette' || cat === 'nature' || lowerId.includes('italic') || lowerId.includes('hand') || lowerId.includes('cursive')) {
    p.push('cursivas');
  }

  // --- GOTICAS ---
  if (cat === 'gothic' || cat === 'belico' || lowerId.includes('goth') || lowerId.includes('fraktur') || lowerId.includes('dark') || lowerId.includes('metal')) {
    p.push('goticas');
  }

  // --- GRAFFITI ---
  if (cat === 'graffiti' || cat === 'block' || lowerId.includes('bubble') || lowerId.includes('square') || lowerId.includes('tag')) {
    p.push('graffiti');
  }

  // --- TATTOO ---
  if (cat === 'script' || cat === 'gothic' || cat === 'chicano' || lowerId.includes('tattoo') || lowerId.includes('roman')) {
    p.push('tatuajes', 'tattoo');
  }

  // --- FACEBOOK ---
  if (cat === 'facebook' || cat === 'sans' || cat === 'serif' || cat === 'belico' || lowerId.includes('regional')) {
    p.push('facebook');
  }
  
  // --- AMINO ---
  if (cat === 'amino' || cat === 'aesthetic' || cat === 'coquette' || lowerId.includes('spaced')) {
    p.push('amino');
  }
  
  return p;
};

const initFonts = () => {
  // 1. HOME & TOOLS (NEW)
  addFont('regional', 'Letras Azules', 'decorative', createMap(MAPS.regional), ['Destacado', 'FB'], 'high');
  addFont('censored', 'Texto Censurado', 'other', createMap(MAPS.censored), ['Misterio'], 'high');
  addFont('censored-light', 'Censurado Ligero', 'other', createMap(MAPS.censoredLight), ['Misterio'], 'high');
  addFont('roman-numerals', 'Números Romanos', 'number', createMap(MAPS.romans), ['Tatuaje', 'Fechas'], 'medium');
  addFont('sans', 'Normal Sans', 'sans', createMap(MAPS.sans), ['Básico'], 'high');
  addFont('sans-bold', 'Sans Bold', 'sans', createMap(MAPS.sansBold), ['Negrita', 'FB'], 'high');
  addFont('sans-italic', 'Sans Italic', 'sans', createMap(MAPS.sansItalic), ['Cursiva', 'FB'], 'high');
  addFont('wide', 'Vaporwave', 'vaporwave', createMap(MAPS.wide), ['Aesthetic'], 'high');

  // 2. CURSIVAS EXPANSION (Coquette, Princess, Boho, Signature)
  
  // Base Scripts
  addFont('script-fine', 'Script Fino', 'script', createMap(MAPS.scriptFine), ['Elegante'], 'medium');
  addFont('script-bold', 'Script Negrita', 'script', createMap(MAPS.scriptBold), ['Logos'], 'medium');
  addFont('lovely', 'Lovely', 'script', createMap(MAPS.lovely), ['Cute'], 'medium');
  addFont('handwriting', 'Manuscrito', 'script', createMap(MAPS.handwriting), ['Firma'], 'medium');

  // Coquette & Princess (Trending)
  const coquetteStyles = [
    { id: 'coq-bow1', name: 'Coquette Bow', pre: '🎀 ', suf: ' 🎀', map: MAPS.scriptBold },
    { id: 'coq-bow2', name: 'Coquette Soft', pre: '୨୧ ', suf: ' ୨୧', map: MAPS.scriptFine },
    { id: 'coq-ballet', name: 'Ballet Core', pre: '🩰 ', suf: ' 🩰', map: MAPS.scriptFine },
    { id: 'coq-swan', name: 'Swan Lake', pre: '🦢 ', suf: ' 🦢', map: MAPS.scriptBold },
    { id: 'prin-crown', name: 'Princess Crown', pre: '👑 ', suf: ' 👑', map: MAPS.scriptBold },
    { id: 'prin-castle', name: 'Disney Vibe', pre: '🏰 ', suf: ' 🏰', map: MAPS.scriptBold },
    { id: 'prin-sparkle', name: 'Fairy Dust', pre: '✨ ', suf: ' ✨', map: MAPS.scriptFine },
  ];
  coquetteStyles.forEach(s => {
    const fid = addFont(s.id, s.name, 'coquette', createMap(s.map), ['Cute', 'Viral'], 'medium');
    DECORATOR_CONFIG[fid] = { prefix: s.pre, suffix: s.suf };
  });

  // Boho & Nature
  const bohoStyles = [
    { id: 'boho-leaf', name: 'Boho Leaf', pre: '🌿 ', suf: ' 🌿', map: MAPS.scriptFine },
    { id: 'boho-moon', name: 'Moon Child', pre: '🌙 ', suf: ' 🌙', map: MAPS.scriptFine },
    { id: 'boho-mush', name: 'Mushroom', pre: '🍄 ', suf: ' 🍄', map: MAPS.lovely },
    { id: 'boho-sun', name: 'Sun Soul', pre: '🌞 ', suf: ' 🌞', map: MAPS.scriptBold },
  ];
  bohoStyles.forEach(s => {
    const fid = addFont(s.id, s.name, 'nature', createMap(s.map), ['Naturaleza'], 'medium');
    DECORATOR_CONFIG[fid] = { prefix: s.pre, suffix: s.suf };
  });

  // Signatures
  const sigStyles = [
    { id: 'sig-pen', name: 'Firma Realista', pre: '✍️ ', suf: '', map: MAPS.handwriting },
    { id: 'sig-feather', name: 'Pluma Antigua', pre: '🪶 ', suf: '', map: MAPS.serifItalic },
    { id: 'sig-swash', name: 'Swash Fancy', pre: '꧁ ', suf: ' ꧂', map: MAPS.scriptBold },
  ];
  sigStyles.forEach(s => {
    const fid = addFont(s.id, s.name, 'script', createMap(s.map), ['Firma'], 'medium');
    DECORATOR_CONFIG[fid] = { prefix: s.pre, suffix: s.suf };
  });

  // 3. GOTICAS & BELICO EXPANSION
  addFont('fraktur', 'Gothic Normal', 'gothic', createMap(MAPS.fraktur), ['Medieval'], 'medium');
  addFont('fraktur-bold', 'Gothic Bold', 'gothic', createMap(MAPS.frakturBold), ['Blackletter'], 'medium');
  addFont('goth-spaced', 'Gothic Spaced', 'gothic', createCombinerMap('frakturBold', ' '), ['Aesthetic'], 'medium');

  const belicoStyles = [
    { id: 'bel-mx', name: 'Bélico MX', pre: '📿 ', suf: ' 🤠', map: MAPS.frakturBold },
    { id: 'bel-money', name: 'Estilo Alucín', pre: '💸 ', suf: ' 🍀', map: MAPS.fraktur },
    { id: 'bel-demon', name: 'Demon Mode', pre: '👹 ', suf: ' 👹', map: MAPS.frakturBold },
    { id: 'bel-cross', name: 'Holy Goth', pre: '✞ ', suf: ' ✞', map: MAPS.frakturBold },
    { id: 'metal-heavy', name: 'Heavy Metal', pre: '🤘 ', suf: ' 🤘', map: MAPS.frakturBold }, // Simplified decoration
    { id: 'witch-moon', name: 'Witchy Vibe', pre: '🔮 ', suf: ' 🌑', map: MAPS.fraktur },
    { id: 'horror-blood', name: 'Horror', pre: '🩸 ', suf: ' 🩸', map: MAPS.frakturBold },
  ];
  belicoStyles.forEach(s => {
    const fid = addFont(s.id, s.name, 'belico', createMap(s.map), ['Bélico', 'Dark'], 'medium');
    DECORATOR_CONFIG[fid] = { prefix: s.pre, suffix: s.suf };
  });
  
  // Zalgo Lite
  addFont('zalgo-lite', 'Glitch Lite', 'gothic', createCombinerMap('fraktur', '\u0352'), ['Miedo'], 'low');

  // 4. GRAFFITI EXPANSION
  addFont('bubble', 'Bubble', 'graffiti', createMap(MAPS.bubble), ['Cute'], 'low');
  addFont('bubble-black', 'Bubble Dark', 'graffiti', createMap(MAPS.bubbleBlack), ['Urbano'], 'low');
  addFont('square', 'Square', 'block', createMap(MAPS.square), ['Bloques'], 'medium');
  addFont('square-black', 'Square Dark', 'block', createMap(MAPS.squareBlack), ['Negrita'], 'medium');
  addFont('tagging', 'Marker Tag', 'graffiti', createMap(MAPS.tagging), ['Street'], 'medium');

  const graffitiDecor = [
    { id: 'graf-spray', name: 'Spray Paint', pre: '🥫 ', suf: ' 💨', map: MAPS.bubbleBlack },
    { id: 'graf-wall', name: 'Brick Wall', pre: '🧱 ', suf: ' 🧱', map: MAPS.squareBlack },
    { id: 'graf-crown', name: 'King Tag', pre: '👑 ', suf: ' 👑', map: MAPS.bubble },
    { id: 'graf-fire', name: 'On Fire', pre: '🔥 ', suf: ' 🔥', map: MAPS.bubbleBlack },
  ];
  graffitiDecor.forEach(s => {
    const fid = addFont(s.id, s.name, 'graffiti', createMap(s.map), ['Urbano'], 'medium');
    DECORATOR_CONFIG[fid] = { prefix: s.pre, suffix: s.suf };
  });

  // 5. TATTOO EXPANSION
  addFont('chicano', 'Chicano', 'chicano', createMap(MAPS.chicano), ['Gangster'], 'low');
  addFont('old-school', 'Old School', 'serif', createMap(MAPS.oldSchool), ['Tradicional'], 'medium');
  addFont('typewriter', 'Typewriter', 'aesthetic', createMap(MAPS.monospace), ['Minimal'], 'high');
  
  const tattooDecor = [
    { id: 'tat-date', name: 'Fecha Romana', pre: '📅 ', suf: '', map: MAPS.romans }, // Maps numbers
    { id: 'tat-coord', name: 'Coordenadas', pre: '📍 ', suf: '', map: MAPS.sans },
    { id: 'tat-inf', name: 'Infinity', pre: '∞ ', suf: ' ∞', map: MAPS.scriptFine },
    { id: 'tat-unalome', name: 'Unalome', pre: '⸎ ', suf: ' ⸎', map: MAPS.sans },
    { id: 'tat-quote', name: 'Cita Texto', pre: '“', suf: '”', map: MAPS.serifItalic },
    { id: 'tat-angel', name: 'Angel Num', pre: '11:11 ', suf: ' 👼', map: MAPS.sansBold },
  ];
  tattooDecor.forEach(s => {
    const fid = addFont(s.id, s.name, 'tool', createMap(s.map), ['Tatuaje'], 'medium');
    DECORATOR_CONFIG[fid] = { prefix: s.pre, suffix: s.suf };
  });

  // 6. FACEBOOK / AMINO TOOLS
  addFont('fb-bold', 'Facebook Bold', 'facebook', createMap(MAPS.sansBold), ['Destacado'], 'high');
  addFont('fb-italic', 'Facebook Italic', 'facebook', createMap(MAPS.sansItalic), ['Destacado'], 'high');
  
  // Effects
  addFont('strike', 'Tachado', 'facebook', createCombinerMap('sans', COMBINERS.strikethrough), ['Efecto'], 'high');
  addFont('underline', 'Subrayado', 'facebook', createCombinerMap('sans', COMBINERS.underline), ['Efecto'], 'high');
  addFont('slash', 'Barrado', 'facebook', createCombinerMap('sans', COMBINERS.slash), ['Efecto'], 'high');

  // Amino Separators (Mock fonts)
  const aminoStyles = [
    { id: 'ami-star', name: 'Amino Stars', pre: '★ ', suf: ' ★', map: MAPS.sans },
    { id: 'ami-sparkle', name: 'Amino Sparkles', pre: '✨ ', suf: ' ✨', map: MAPS.smallCaps },
    { id: 'ami-line', name: 'Separador Línea', pre: '━━━ ', suf: ' ━━━', map: MAPS.sans },
    { id: 'ami-flower', name: 'Separador Floral', pre: '❀ ', suf: ' ❀', map: MAPS.monospace },
    { id: 'ami-deco', name: 'Título Deco', pre: '•°• ', suf: ' •°•', map: MAPS.sansBold },
    { id: 'ami-bracket', name: 'Corchetes', pre: '【 ', suf: ' 】', map: MAPS.parenthesized },
  ];
  aminoStyles.forEach(s => {
    const fid = addFont(s.id, s.name, 'amino', createMap(s.map), ['Aesthetic'], 'high');
    DECORATOR_CONFIG[fid] = { prefix: s.pre, suffix: s.suf };
  });
};

initFonts();

export const FONTS: FontStyle[] = generatedFonts;

export const convertText = (text: string, map: Record<string, string>, isVaporwave: boolean = false): string => {
  if (!text) return '';
  const normalized = text.normalize('NFC');
  
  // Lookup Decorators
  const fontDef = generatedFonts.find(f => f.map === map);
  const fontId = fontDef?.id || '';
  let prefix = '';
  let suffix = '';
  
  if (DECORATOR_CONFIG[fontId]) {
    prefix = DECORATOR_CONFIG[fontId].prefix;
    suffix = DECORATOR_CONFIG[fontId].suffix;
  }

  const mapped = [...normalized].map(char => {
    if (map[char]) return map[char];
    // Fallback logic for accents
    const baseChar = ACCENT_MAP[char];
    if (baseChar && map[baseChar]) {
      const combiner = (char === 'ñ' || char === 'Ñ') ? COMBINERS.tilde : COMBINERS.acute;
      return map[baseChar] + combiner;
    }
    return char;
  }).join('');

  const final = isVaporwave ? mapped.split('').join(' ') : mapped;
  return `${prefix}${final}${suffix}`;
};

export const getDisplaySegments = (text: string, map: Record<string, string>): TextSegment[] => {
  return [{ content: text, isFallback: false }];
};
