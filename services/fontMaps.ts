
import { FontStyle, TextSegment } from '../types';

const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';

// 1. 基础 Unicode 映射表 (Base Maps)
const MAPS: Record<string, string> = {
  // --- SANS SERIF (Facebook Safe) ---
  sans: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  sansBold: '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵ｉｊ𝒌𝗹𝗺ｎ𝗼𝗽𝗾𝗿𝘀𝘁ｕｖｗｘｙｚＡ𝗕ＣＤＥＦＧＨＩＪＫＬＭＮＯＰ𝗤𝗥𝗦ＴＵＶＷ𝗫𝗬𝗭𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵',
  sansItalic: '𝘢𝘣ｃ𝘥𝑒𝘧𝘨𝘩ɪ𝘫𝑘𝘭𝘮𝘯𝘰𝘱𝗊𝘳𝘴𝘵ｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ0123456789',
  sansBoldItalic: '𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵',
  
  // --- SERIF (Tattoo / Formal) ---
  serifBold: '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝐀𝐁ＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗',
  serifItalic: '𝑎𝑏𝑐ｄ𝑒ｆｇｈ𝑖𝑗𝑘ｌｍｎｏｐ𝑞ｒｓｔ𝑢𝑣ｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ0123456789',
  serifBoldItalic: '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗',
  
  // --- SCRIPT (Cursivas / Tattoo) ---
  scriptFine: '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏𝒜𝐵𝒞𝒟ＥＦＧＨＩＪＫＬＭＮＯＰＱＲ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵0123456789',
  scriptBold: '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝗺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩0123456789',
  scriptItalic: '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝗺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩0123456789', // Fallback for scriptItalic
  handwriting: 'αвc∂єfɢнιjкℓмиσρqяѕтυνωχуz𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩0123456789',
  lovely: 'ꍏ♭☾◗€ƒ⍙hï♪k↳♔♫⊙ρq®ⓢ☂u☋ωx☿zkＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ0123456789',
  
  // --- GOTHIC (Goticas / Tattoo / Free Fire) ---
  fraktur: '𝔞𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ0123456789',
  frakturBold: '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅0123456789',
  
  // --- GRAFFITI / URBAN / BUBBLES ---
  bubble: 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ⓪①②③④⑤⑥⑦⑧⑨',
  bubbleBlack: '🅐𝑩𝑪𝑨𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁🅐𝑩𝑪𝑨𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁⓿❶❷❸❹❺❻❼❽❾',
  square: '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉0123456789',
  squareBlack: '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉0123456789',
  wide: 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ０１２３４５６７８９',
  
  // --- DECORATIVE / AESTHETIC ---
  smallCaps: 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠｗｘｙｚᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ0123456789',
  tiny: 'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾᑫᴿˢᵀᵁⱽᵂˣʸᶻ⁰¹²³⁴⁵⁶⁷⁸⁹',
  monospace: '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱ＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿',
  doubleStruck: '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙＱＲＳＴ𝕌𝕍𝕎𝕏𝕐ℤ𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡',
  inverted: 'ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz∀ᗺƆᗡƎℲ⅁HIᗿK˥WNOԀΌᴚS⊥∩ΛMX⅄Z0123456789',
  
  // --- SPECIALTY ---
  greek: 'αвc∂єfɢнιjкℓмиσρqяѕтυνωχуzΑΒCDEFGHΙJKLMΝOPQRSTUVWΧΥZ0123456789',
  russian: 'аъcdэfɢнїjкlмиорqяsтцvшxчzАБCDЭFGHЇJКLМИОPQЯSТЦVШXЧZ0123456789',
  currency: '₳฿₵ĐɆ₣₲ⱧłJ₭Ⱡ₥₦Ø₱QⱤ₴₮ɄV₩ӾɎ♄₳฿₵ĐɆ₣₲ⱧłJ₭Ⱡ₥₦Ø₱QⱤ₴₮ɄV₩ӾɎ♄0123456789',
  parenthesized: '⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⑴⑵⑶⑷⑸⑹⑺⑻⑼',
  
  // --- NEW BASES (Fixed) ---
  regional: '🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿0123456789',
  tagging: 'Ⱥƀ↻ժeƒǥhìʝƙꝆɱñøþqɾ$†uƲw×¥ƵȺƀ↻ժeƒǥhìʝƙꝆɱñøþqɾ$†uƲw×¥Ƶ0123456789', 
  oldSchool: '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗',
  censored: '████████████████████████████████████████████████████0123456789',

  // --- BASE FOR MANUAL CREATIONS ---
  chicano: '𝓐𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩0123456789',
  heavySans: '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃ｗ𝗫𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵'
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
  wave: '\u0330', // Visual wave approximation
  dot: '\u0323'
};

// Global registry for decorator lookups to avoid huge switch statements
const DECORATOR_CONFIG: Record<string, { prefix: string, suffix: string }> = {};

// Helper: Create Character Map with Safety Check
const createMap = (target: string | undefined): Record<string, string> => {
  const map: Record<string, string> = {};
  if (!target) return map; // SAFETY CHECK TO PREVENT CRASH
  
  const sChars = [...(lower + upper + numbers)];
  const tChars = [...target]; // Handles surrogate pairs (emojis) correctly
  
  sChars.forEach((c, i) => { if (tChars[i]) map[c] = tChars[i]; });
  return map;
};

// Helper: Create Combiner Map (adds a symbol after every char)
const createCombinerMap = (baseMapId: string, combinerChar: string): Record<string, string> => {
  const baseMap = createMap(MAPS[baseMapId] || MAPS.sans);
  const newMap: Record<string, string> = {};
  Object.keys(baseMap).forEach(k => {
    newMap[k] = baseMap[k] + combinerChar;
  });
  return newMap;
};

// Registry
let generatedFonts: FontStyle[] = [];

// Helper function to add fonts safely
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
  return fullId; // Return full ID for registry sync
};

const getPagesForCategory = (cat: string, id: string): string[] => {
  const p = ['home'];
  const lowerId = id.toLowerCase();

  // --- LOGIC FOR CURSIVAS ---
  if (cat === 'script' || lowerId.includes('italic') || lowerId.includes('hand') || lowerId.includes('cursive') || lowerId.includes('serif-italic')) {
    p.push('cursivas');
  }
  if ((cat === 'decorative' || cat === 'aesthetic') && (lowerId.includes('love') || lowerId.includes('heart') || lowerId.includes('flower') || lowerId.includes('coquette') || lowerId.includes('boho') || lowerId.includes('princess'))) {
    p.push('cursivas');
  }

  // --- LOGIC FOR GOTICAS ---
  if (cat === 'gothic' || lowerId.includes('goth') || lowerId.includes('fraktur') || lowerId.includes('medieval') || lowerId.includes('dark') || lowerId.includes('vampire') || lowerId.includes('demon')) {
    p.push('goticas');
  }
  if (lowerId.includes('double-struck') || lowerId.includes('heavy') || lowerId.includes('zalgo') || lowerId.includes('belico') || lowerId.includes('metal')) {
    p.push('goticas');
  }

  // --- LOGIC FOR GRAFFITI ---
  if (cat === 'graffiti' || cat === 'block' || lowerId.includes('bubble') || lowerId.includes('square') || lowerId.includes('graf') || lowerId.includes('wide') || lowerId.includes('urban') || lowerId.includes('tag')) {
    p.push('graffiti');
  }
  if (cat === 'aesthetic' && (lowerId.includes('mono') || lowerId.includes('stencil'))) {
     p.push('graffiti');
  }

  // --- LOGIC FOR TATTOOS ---
  if (cat === 'script' || cat === 'gothic' || cat === 'chicano' || cat === 'serif' || lowerId.includes('typewriter') || lowerId.includes('tat-') || lowerId.includes('tattoo')) {
    p.push('tatuajes', 'tattoo');
  }

  // --- LOGIC FOR FACEBOOK ---
  if (cat === 'facebook' || lowerId.includes('fb-') || cat === 'sans' || cat === 'serif' || cat === 'block' || lowerId.includes('bold') || lowerId.includes('italic') || lowerId.includes('heavy') || lowerId.includes('wide')) {
    if (!lowerId.includes('decorated') && !lowerId.includes('emoji')) {
      p.push('facebook');
    }
  }
  if (cat === 'script' || cat === 'aesthetic') {
    p.push('facebook');
  }
  
  // --- LOGIC FOR AMINO ---
  if (cat === 'amino' || lowerId.includes('ami-') || cat === 'aesthetic' || cat === 'vaporwave' || cat === 'decorative' || lowerId.includes('small') || lowerId.includes('spaced')) {
    p.push('amino');
  }
  
  // --- LOGIC FOR TOOLS ---
  if (lowerId.includes('regional') || lowerId.includes('censored')) {
    p.push('home');
  }

  return p;
};

const initFonts = () => {
  // 1. BASE UNICODE FONTS
  addFont('sans', 'Normal Sans', 'sans', createMap(MAPS.sans), ['Básico'], 'high');
  addFont('regional', 'Letras Azules', 'decorative', createMap(MAPS.regional), ['Destacado', 'FB'], 'high');
  addFont('censored', 'Texto Censurado', 'other', createMap(MAPS.censored), ['Misterio'], 'high');

  addFont('sans-bold', 'Sans Bold', 'sans', createMap(MAPS.sansBold), ['Negrita', 'FB'], 'high');
  addFont('sans-italic', 'Sans Italic', 'sans', createMap(MAPS.sansItalic), ['Cursiva', 'FB'], 'high');
  addFont('sans-bold-italic', 'Sans Bold Italic', 'sans', createMap(MAPS.sansBoldItalic), ['Negrita', 'Cursiva'], 'high');
  
  addFont('serif-bold', 'Serif Bold', 'serif', createMap(MAPS.serifBold), ['Elegante', 'Tatuaje'], 'high');
  addFont('serif-italic', 'Serif Italic', 'serif', createMap(MAPS.serifItalic), ['Elegante', 'Cartas'], 'high');
  addFont('serif-bold-italic', 'Serif Bold Italic', 'serif', createMap(MAPS.serifBoldItalic), ['Lujo'], 'high');

  addFont('script-fine', 'Cursive Fine', 'script', createMap(MAPS.scriptFine), ['Firma', 'Boda'], 'medium');
  addFont('script-bold', 'Cursive Bold', 'script', createMap(MAPS.scriptBold), ['Logos', 'Instagram'], 'medium');
  addFont('chicano', 'Chicano Style', 'chicano', createMap(MAPS.chicano), ['Gangster', 'Tatuaje'], 'low');
  
  // New Bases for Cursivas Expansion
  addFont('handwriting', 'Handwriting Mix', 'script', createMap(MAPS.handwriting), ['Firma', 'Raro'], 'medium');
  addFont('lovely', 'Lovely Cursive', 'script', createMap(MAPS.lovely), ['Decorado', 'Cute'], 'medium');

  addFont('fraktur', 'Gothic Normal', 'gothic', createMap(MAPS.fraktur), ['Medieval'], 'medium');
  addFont('fraktur-bold', 'Gothic Bold', 'gothic', createMap(MAPS.frakturBold), ['Blackletter'], 'medium');
  
  addFont('monospace', 'Typewriter', 'aesthetic', createMap(MAPS.monospace), ['Retro'], 'high');
  addFont('double-struck', 'Double Struck', 'aesthetic', createMap(MAPS.doubleStruck), ['Universitario'], 'high');
  addFont('small-caps', 'Small Caps', 'aesthetic', createMap(MAPS.smallCaps), ['Minúsculas'], 'high');
  addFont('bubble', 'Bubble', 'graffiti', createMap(MAPS.bubble), ['Cute'], 'low');
  addFont('bubble-black', 'Bubble Dark', 'graffiti', createMap(MAPS.bubbleBlack), ['Urbano'], 'low');
  addFont('square', 'Square', 'block', createMap(MAPS.square), ['Bloques'], 'medium');
  addFont('square-black', 'Square Dark', 'block', createMap(MAPS.squareBlack), ['Negrita'], 'medium');
  addFont('heavy-sans', 'Heavy Bold', 'heavy', createMap(MAPS.heavySans), ['Impact'], 'high');
  addFont('wide', 'Vaporwave', 'vaporwave', createMap(MAPS.wide), ['Aesthetic'], 'high');
  
  // New Bases from first request
  addFont('tagging', 'Tagging Marker', 'graffiti', createMap(MAPS.tagging), ['Street'], 'medium');
  addFont('old-school', 'Old School Serif', 'serif', createMap(MAPS.oldSchool), ['Tatuaje'], 'medium');

  // --- CURSIVAS MASSIVE EXPANSION (60+ STYLES) ---
  
  // 1. Effects
  addFont('script-under', 'Cursiva Subrayada', 'script', createCombinerMap('scriptFine', COMBINERS.underline), ['Elegante'], 'medium');
  addFont('script-bold-under', 'Bold Cursiva Sub.', 'script', createCombinerMap('scriptBold', COMBINERS.underline), ['Elegante'], 'medium');
  addFont('script-strike', 'Cursiva Tachada', 'script', createCombinerMap('scriptFine', COMBINERS.strikethrough), ['Elegante'], 'medium');
  addFont('script-wave', 'Cursiva Ondulada', 'script', createCombinerMap('scriptFine', COMBINERS.wave), ['Elegante'], 'medium');

  // 2. Coquette & Aesthetic (Trending)
  const coquetteStyles = [
    { id: 'coq-bow1', name: 'Coquette Bow 1', pre: '🎀 ', suf: ' 🎀', map: MAPS.scriptBold },
    { id: 'coq-bow2', name: 'Coquette Bow 2', pre: '୨୧ ', suf: ' ୨୧', map: MAPS.scriptFine },
    { id: 'coq-ballet', name: 'Ballet Core', pre: '🩰 ', suf: ' 🩰', map: MAPS.scriptFine },
    { id: 'coq-swan', name: 'Swan Lake', pre: '🦢 ', suf: ' 🦢', map: MAPS.scriptBold },
    { id: 'coq-cake', name: 'Sweet Cake', pre: '🍰 ', suf: ' 🍰', map: MAPS.lovely },
    { id: 'coq-cherry', name: 'Cherry Bomb', pre: '🍒 ', suf: ' 🍒', map: MAPS.scriptFine },
    { id: 'coq-mirror', name: 'Mirror Mirror', pre: '🪞 ', suf: ' 🪞', map: MAPS.scriptFine },
    { id: 'coq-lotion', name: 'Skincare Vibes', pre: '🧴 ', suf: ' 🧴', map: MAPS.scriptBold },
    { id: 'coq-teddy', name: 'Teddy Bear', pre: '🧸 ', suf: ' 🧸', map: MAPS.handwriting },
    { id: 'coq-heart', name: 'Heart Locket', pre: '🏩 ', suf: ' 🏩', map: MAPS.scriptFine },
  ];

  coquetteStyles.forEach(s => {
    const fullId = addFont(s.id, s.name, 'script', createMap(s.map), ['Coquette', 'Cute'], 'medium');
    DECORATOR_CONFIG[fullId] = { prefix: s.pre, suffix: s.suf };
  });

  // 3. Boho / Nature / Naturaleza
  const bohoStyles = [
    { id: 'boho-leaf1', name: 'Boho Leaf 1', pre: '🌿 ', suf: ' 🌿', map: MAPS.scriptFine },
    { id: 'boho-leaf2', name: 'Boho Leaf 2', pre: '🍃 ', suf: ' 🍃', map: MAPS.scriptBold },
    { id: 'boho-mush', name: 'Mushroom Core', pre: '🍄 ', suf: ' 🍄', map: MAPS.lovely },
    { id: 'boho-sun', name: 'Sun Soul', pre: '🌞 ', suf: ' 🌞', map: MAPS.scriptBold },
    { id: 'boho-moon', name: 'Moon Child', pre: '🌙 ', suf: ' 🌙', map: MAPS.scriptFine },
    { id: 'boho-cactus', name: 'Desert Vibe', pre: '🌵 ', suf: ' 🌵', map: MAPS.handwriting },
    { id: 'boho-flower1', name: 'Flower Power', pre: '🌻 ', suf: ' 🌻', map: MAPS.scriptBold },
    { id: 'boho-flower2', name: 'Rose Garden', pre: '🌹 ', suf: ' 🌹', map: MAPS.scriptFine },
    { id: 'boho-maple', name: 'Autumn Vibes', pre: '🍂 ', suf: ' 🍂', map: MAPS.scriptFine },
    { id: 'boho-crystal', name: 'Crystal Energy', pre: '🔮 ', suf: ' 🔮', map: MAPS.scriptBold },
  ];

  bohoStyles.forEach(s => {
    const fullId = addFont(s.id, s.name, 'script', createMap(s.map), ['Boho', 'Naturaleza'], 'medium');
    DECORATOR_CONFIG[fullId] = { prefix: s.pre, suffix: s.suf };
  });

  // 4. Princess / Disney Vibe
  const princessStyles = [
    { id: 'prin-crown1', name: 'Princess Crown', pre: '👑 ', suf: ' 👑', map: MAPS.scriptBold },
    { id: 'prin-castle', name: 'Magic Castle', pre: '🏰 ', suf: ' 🏰', map: MAPS.scriptBold },
    { id: 'prin-sparkle', name: 'Fairy Dust', pre: '✨ ', suf: ' ✨', map: MAPS.scriptFine },
    { id: 'prin-unicorn', name: 'Unicorn Dream', pre: '🦄 ', suf: ' 🦄', map: MAPS.lovely },
    { id: 'prin-ring', name: 'Diamond Ring', pre: '💍 ', suf: ' 💍', map: MAPS.scriptFine },
    { id: 'prin-gem', name: 'Royal Gem', pre: '💎 ', suf: ' 💎', map: MAPS.scriptBold },
    { id: 'prin-tiara', name: 'Queen Tiara', pre: '♕ ', suf: ' ♕', map: MAPS.scriptBold },
    { id: 'prin-wand', name: 'Magic Wand', pre: '🪄 ', suf: ' 🪄', map: MAPS.scriptFine },
  ];

  princessStyles.forEach(s => {
    const fullId = addFont(s.id, s.name, 'script', createMap(s.map), ['Princess', 'Disney'], 'medium');
    DECORATOR_CONFIG[fullId] = { prefix: s.pre, suffix: s.suf };
  });

  // 5. Firma Realista & Signature
  const signatureStyles = [
    { id: 'sig-pen', name: 'Firma Realista', pre: '✍️ ', suf: '', map: MAPS.handwriting },
    { id: 'sig-feather', name: 'Pluma Antigua', pre: '🪶 ', suf: '', map: MAPS.scriptItalic },
    { id: 'sig-end', name: 'Firma Final', pre: '', suf: ' ✍️', map: MAPS.scriptFine },
    { id: 'sig-swash1', name: 'Swash Simple', pre: '༺ ', suf: ' ༻', map: MAPS.scriptFine },
    { id: 'sig-swash2', name: 'Swash Fancy', pre: '꧁ ', suf: ' ꧂', map: MAPS.scriptBold },
    { id: 'sig-swash3', name: 'Swash Wind', pre: '࿐ ', suf: ' ࿐', map: MAPS.handwriting },
  ];

  signatureStyles.forEach(s => {
    const fullId = addFont(s.id, s.name, 'script', createMap(s.map), ['Firma', 'Elegante'], 'medium');
    DECORATOR_CONFIG[fullId] = { prefix: s.pre, suffix: s.suf };
  });

  // 6. General Decorative Cursives (Love, Stars, etc.)
  const decoStyles = [
    { id: 'love-1', name: 'Love Script 1', pre: '❤ ', suf: ' ❤', map: MAPS.scriptBold },
    { id: 'love-2', name: 'Love Script 2', pre: '❥ ', suf: ' ❥', map: MAPS.scriptFine },
    { id: 'love-3', name: 'Love Script 3', pre: 'ღ ', suf: ' ღ', map: MAPS.lovely },
    { id: 'star-1', name: 'Star Script 1', pre: '★ ', suf: ' ★', map: MAPS.scriptBold },
    { id: 'star-2', name: 'Star Script 2', pre: '☆ ', suf: ' ☆', map: MAPS.scriptFine },
    { id: 'star-3', name: 'Star Script 3', pre: '💫 ', suf: ' 💫', map: MAPS.scriptItalic },
    { id: 'music-1', name: 'Music Script 1', pre: '♫ ', suf: ' ♫', map: MAPS.scriptFine },
    { id: 'music-2', name: 'Music Script 2', pre: '♪ ', suf: ' ♯', map: MAPS.scriptBold },
    { id: 'arrow-1', name: 'Arrow Script 1', pre: '➳ ', suf: ' ➳', map: MAPS.scriptFine },
    { id: 'arrow-2', name: 'Arrow Script 2', pre: '➜ ', suf: '', map: MAPS.serifItalic },
    { id: 'fire-1', name: 'Fire Script', pre: '🔥 ', suf: ' 🔥', map: MAPS.scriptBold },
    { id: 'bracket-1', name: 'Bracket Script', pre: '【 ', suf: ' 】', map: MAPS.scriptBold },
    { id: 'line-1', name: 'Lined Script', pre: '━ ', suf: ' ━', map: MAPS.scriptFine },
    { id: 'cloud-1', name: 'Cloud Script', pre: '☁️ ', suf: ' ☁️', map: MAPS.scriptFine },
    { id: 'angel-1', name: 'Angel Script', pre: '👼 ', suf: ' 👼', map: MAPS.scriptFine },
    { id: 'butterfly-1', name: 'Butterfly Script', pre: '🦋 ', suf: ' 🦋', map: MAPS.scriptFine },
  ];

  decoStyles.forEach(s => {
    const fullId = addFont(s.id, s.name, 'script', createMap(s.map), ['Decorado', 'Cursiva'], 'medium');
    DECORATOR_CONFIG[fullId] = { prefix: s.pre, suffix: s.suf };
  });

  // --- GOTHIC EXPANSION ---
  addFont('goth-spaced', 'Gothic Spaced', 'gothic', createCombinerMap('frakturBold', ' '), ['Aesthetic'], 'medium');

  const gothicDecorators = [
    { id: 'goth-simple', name: 'Gothic Simple', pre: '', suf: '', map: MAPS.fraktur },
    { id: 'goth-bold', name: 'Gothic Bold', pre: '', suf: '', map: MAPS.frakturBold },
    { id: 'goth-old', name: 'Old English', pre: '', suf: '', map: MAPS.frakturBold },
    { id: 'goth-brackets', name: 'Gothic Bracket', pre: '【 ', suf: ' 】', map: MAPS.frakturBold },
    { id: 'goth-corner', name: 'Gothic Corner', pre: '『 ', suf: ' 』', map: MAPS.fraktur },
    { id: 'goth-lines', name: 'Gothic Lined', pre: '║ ', suf: ' ║', map: MAPS.fraktur },
    { id: 'goth-slash', name: 'Gothic Slash', pre: '// ', suf: ' //', map: MAPS.frakturBold },
    { id: 'goth-decorative', name: 'Gothic Decor', pre: '✧ ', suf: ' ✧', map: MAPS.fraktur },
    { id: 'goth-dark', name: 'Dark Soul', pre: '☠ ', suf: ' ☠', map: MAPS.frakturBold },
    { id: 'goth-demon', name: 'Demon Gothic', pre: '👹 ', suf: ' 👹', map: MAPS.frakturBold },
    { id: 'goth-vampire', name: 'Vampire', pre: '🧛 ', suf: ' 🧛', map: MAPS.fraktur },
    { id: 'goth-blood', name: 'Blood Gothic', pre: '🩸 ', suf: ' 🩸', map: MAPS.frakturBold },
    { id: 'goth-cemetery', name: 'Cemetery', pre: '⚰️ ', suf: ' ⚰️', map: MAPS.fraktur },
    { id: 'goth-ghost', name: 'Ghost Gothic', pre: '👻 ', suf: ' 👻', map: MAPS.fraktur },
    { id: 'goth-spider', name: 'Spider Web', pre: '🕸️ ', suf: ' 🕷', map: MAPS.frakturBold },
    { id: 'goth-bat', name: 'Vampire Bat', pre: '🦇 ', suf: ' 🦇', map: MAPS.frakturBold },
    { id: 'goth-sword', name: 'Sword Master', pre: '⚔ ', suf: ' ⚔', map: MAPS.fraktur },
    { id: 'goth-shield', name: 'Shield Gothic', pre: '🛡️ ', suf: ' 🛡️', map: MAPS.frakturBold },
    { id: 'goth-chain', name: 'Chained Text', pre: '⛓ ', suf: ' ⛓', map: MAPS.fraktur },
    { id: 'goth-crown', name: 'King Gothic', pre: '♔ ', suf: ' ♔', map: MAPS.frakturBold },
    { id: 'goth-dragon', name: 'Dragon Born', pre: '🐉 ', suf: ' 🐉', map: MAPS.frakturBold },
    { id: 'goth-magic', name: 'Magic Spell', pre: '🔮 ', suf: ' 🔮', map: MAPS.fraktur },
    { id: 'goth-fleur', name: 'Fleur de Lis', pre: '⚜ ', suf: ' ⚜', map: MAPS.frakturBold },
    { id: 'goth-sad', name: 'Sad Gothic', pre: '💔 ', suf: ' 💔', map: MAPS.fraktur },
    { id: 'goth-heart', name: 'Black Heart', pre: '🖤 ', suf: ' 🖤', map: MAPS.frakturBold },
    { id: 'goth-cross', name: 'Holy Cross', pre: '✞ ', suf: ' ✞', map: MAPS.frakturBold },
    { id: 'goth-inv-cross', name: 'Unholy Cross', pre: '⸸ ', suf: ' ⸸', map: MAPS.frakturBold },
    { id: 'goth-rose', name: 'Black Rose', pre: '🥀 ', suf: ' 🥀', map: MAPS.fraktur },
    { id: 'goth-moon', name: 'Moon Phase', pre: '☾ ', suf: ' ☽', map: MAPS.fraktur },
    { id: 'goth-fire', name: 'Hell Fire', pre: '🔥 ', suf: ' 🔥', map: MAPS.frakturBold },
    { id: 'goth-tribal', name: 'Tribal Gothic', pre: '༒ ', suf: ' ༒', map: MAPS.frakturBold },
    { id: 'goth-wings1', name: 'Gothic Wings', pre: '꧁ ', suf: ' ꧂', map: MAPS.fraktur },
    { id: 'goth-wings2', name: 'Dark Wings', pre: '༺ ', suf: ' ༻', map: MAPS.frakturBold },
    { id: 'goth-stars', name: 'Gothic Stars', pre: '★ ', suf: ' ★', map: MAPS.frakturBold },
    { id: 'goth-sparkle', name: 'Dark Sparkle', pre: '❇ ', suf: ' ❇', map: MAPS.fraktur },
    { id: 'goth-spanish', name: 'Gótico ES', pre: '¡ ', suf: ' !', map: MAPS.frakturBold },
    { id: 'goth-question', name: 'Mystery', pre: '¿ ', suf: ' ?', map: MAPS.fraktur },
    { id: 'goth-rock', name: 'Rock Gothic', pre: '🤘 ', suf: ' 🤘', map: MAPS.frakturBold }
  ];

  gothicDecorators.forEach(d => {
    const fullId = addFont(d.id, d.name, 'gothic', createMap(d.map), ['Dark', 'Medieval'], 'medium');
    DECORATOR_CONFIG[fullId] = { prefix: d.pre, suffix: d.suf };
  });
  
  addFont('zalgo-goth', 'Zalgo Gothic', 'gothic', createCombinerMap('fraktur', '\u0352'), ['Glitch', 'Miedo'], 'low');

  // --- TATTOO EXPANSION ---
  const tattooStyles = [
    { id: 'tat-fine-simple', name: 'Fine Line Simple', pre: '', suf: '', map: MAPS.sans },
    { id: 'tat-fine-spaced', name: 'Fine Line Spaced', pre: '', suf: '', map: MAPS.sans },
    { id: 'tat-minimal-caps', name: 'Minimalist Caps', pre: '', suf: '', map: MAPS.smallCaps },
    { id: 'tat-typewriter', name: 'Typewriter Ink', pre: '', suf: '', map: MAPS.monospace },
    { id: 'tat-quote', name: 'Quote Tattoo', pre: '“', suf: '”', map: MAPS.serifItalic },
    { id: 'tat-coord', name: 'Coordinates', pre: '📍 ', suf: '', map: MAPS.sans },
    { id: 'tat-date', name: 'Roman Date', pre: '📅 ', suf: '', map: MAPS.serifBold },
    { id: 'tat-infinity', name: 'Infinity Love', pre: '∞ ', suf: ' ∞', map: MAPS.scriptFine },
    { id: 'tat-heartbeat', name: 'Pulse Line', pre: 'ﮩ٨ـ', suf: 'ﮩ٨ـ', map: MAPS.scriptFine },
    { id: 'tat-unalome', name: 'Spiritual Unalome', pre: '⸎ ', suf: ' ⸎', map: MAPS.sans },
    { id: 'tat-constellation', name: 'Constellation', pre: '✨ ', suf: ' ✨', map: MAPS.sans },
    { id: 'tat-moon-phase', name: 'Moon Phase', pre: '☾ ', suf: ' ☽', map: MAPS.serifItalic },
    { id: 'tat-angel', name: 'Angel Number', pre: '11:11 ', suf: ' 👼', map: MAPS.sansBold },
    { id: 'tat-butterfly-ink', name: 'Butterfly Effect', pre: '🦋 ', suf: '', map: MAPS.scriptFine },
    { id: 'tat-star-ink', name: 'Star Ink', pre: '★ ', suf: '', map: MAPS.monospace },
    { id: 'tat-trad-anchor', name: 'Old School Anchor', pre: '⚓ ', suf: ' ⚓', map: MAPS.oldSchool },
    { id: 'tat-trad-swallow', name: 'Traditional Bird', pre: '🐦 ', suf: ' 🐦', map: MAPS.oldSchool },
    { id: 'tat-trad-lucky', name: 'Lucky Dice', pre: '🎲 ', suf: ' 🎲', map: MAPS.oldSchool },
    { id: 'tat-trad-rose', name: 'Traditional Rose', pre: '🌹 ', suf: ' 🌹', map: MAPS.oldSchool },
    { id: 'tat-trad-dagger', name: 'Dagger Tattoo', pre: '🗡 ', suf: ' 🗡', map: MAPS.oldSchool },
    { id: 'tat-trad-heart', name: 'Mom Heart', pre: '♥ ', suf: ' ♥', map: MAPS.oldSchool },
    { id: 'tat-trad-diamond', name: 'Diamond Ink', pre: '💎 ', suf: ' 💎', map: MAPS.oldSchool },
    { id: 'tat-chicano-smile', name: 'Smile Now', pre: '🎭 ', suf: '', map: MAPS.chicano },
    { id: 'tat-chicano-pray', name: 'Blessed Hands', pre: '🙏 ', suf: '', map: MAPS.chicano },
    { id: 'tat-chicano-13', name: 'Street 13', pre: '13 ', suf: '', map: MAPS.chicano },
    { id: 'tat-match-lock', name: 'Lock & Key', pre: '🔒 ', suf: ' 🔑', map: MAPS.scriptBold },
    { id: 'tat-match-king', name: 'King & Queen', pre: '♔ ', suf: ' ♕', map: MAPS.frakturBold },
    { id: 'tat-spanish-excl', name: 'Tatuaje Español', pre: '¡ ', suf: ' !', map: MAPS.scriptFine },
    { id: 'tat-spanish-quest', name: 'Pregunta', pre: '¿ ', suf: ' ?', map: MAPS.scriptFine },
  ];

  tattooStyles.forEach(d => {
    const fullId = addFont(d.id, d.name, 'gothic', createMap(d.map), ['Tattoo', 'Ink'], 'medium');
    DECORATOR_CONFIG[fullId] = { prefix: d.pre, suffix: d.suf };
  });
  
  addFont('tat-min-spaced-v2', 'Minimal Spaced', 'sans', createCombinerMap('sans', ' '), ['Minimal'], 'medium');

  // --- GRAFFITI / URBAN EXPANSION ---
  const graffitiDecorators = [
    { id: 'graf-bubble', name: 'Bubble Gum', pre: '', suf: '', map: MAPS.bubble },
    { id: 'graf-dark', name: 'Dark Bubble', pre: '', suf: '', map: MAPS.bubbleBlack },
    { id: 'graf-square', name: 'Square Box', pre: '', suf: '', map: MAPS.square },
    { id: 'graf-solid', name: 'Solid Block', pre: '', suf: '', map: MAPS.squareBlack },
    { id: 'graf-wide', name: 'Wide Tag', pre: '', suf: '', map: MAPS.wide },
    { id: 'graf-stencil', name: 'Stencil Font', pre: '', suf: '', map: MAPS.doubleStruck },
    { id: 'graf-spray', name: 'Spray Paint', pre: '🥫 ', suf: ' 💨', map: MAPS.bubbleBlack },
    { id: 'graf-wall', name: 'Brick Wall', pre: '🧱 ', suf: ' 🧱', map: MAPS.squareBlack },
    { id: 'graf-train', name: 'Subway Art', pre: '🚇 ', suf: ' 🚇', map: MAPS.wide },
    { id: 'graf-city', name: 'City Life', pre: '🏙️ ', suf: ' 🏙️', map: MAPS.sansBold },
    { id: 'graf-skate', name: 'Skater Tag', pre: '🛹 ', suf: ' 🛹', map: MAPS.scriptBold },
    { id: 'graf-king', name: 'King Crown', pre: '👑 ', suf: ' 👑', map: MAPS.bubble },
    { id: 'graf-fresh', name: 'Fresh Style', pre: '✨ ', suf: ' ✨', map: MAPS.wide },
    { id: 'graf-cool', name: 'Cool Vibe', pre: '😎 ', suf: ' 😎', map: MAPS.bubble },
    { id: 'graf-boom', name: 'Boom Box', pre: '📻 ', suf: ' 🎵', map: MAPS.monospace },
    { id: 'graf-fire', name: 'On Fire', pre: '🔥 ', suf: ' 🔥', map: MAPS.bubbleBlack },
    { id: 'graf-star', name: 'Star Power', pre: '✪ ', suf: ' ✪', map: MAPS.bubble },
    { id: 'graf-heart', name: 'Love Tag', pre: '♥ ', suf: ' ♥', map: MAPS.bubble },
    { id: 'graf-cloud', name: 'Cloud 9', pre: '☁️ ', suf: ' ☁️', map: MAPS.bubble },
    { id: 'graf-ghost', name: 'Ghost Tag', pre: '👻 ', suf: ' 👻', map: MAPS.sansBoldItalic },
    { id: 'graf-alien', name: 'Alien Area', pre: '👽 ', suf: ' 👽', map: MAPS.wide },
    { id: 'graf-chain', name: 'Chained', pre: '⛓️ ', suf: ' ⛓️', map: MAPS.squareBlack },
    { id: 'graf-danger', name: 'Hazard', pre: '⚠️ ', suf: ' ⚠️', map: MAPS.square },
    { id: 'graf-money', name: 'Rich Kid', pre: '💲 ', suf: ' 💲', map: MAPS.squareBlack },
    { id: 'graf-lightning', name: 'High Voltage', pre: '⚡ ', suf: ' ⚡', map: MAPS.sansBoldItalic },
    { id: 'graf-bracket', name: 'Bracketed', pre: '【 ', suf: ' 】', map: MAPS.wide },
    { id: 'graf-corner', name: 'Cornered', pre: '『 ', suf: ' 』', map: MAPS.square },
    { id: 'graf-arrow', name: 'Arrow Flow', pre: '► ', suf: ' ◄', map: MAPS.squareBlack },
    { id: 'graf-lines', name: 'Lined Up', pre: '║ ', suf: ' ║', map: MAPS.monospace },
    { id: 'graf-slash', name: 'Slasher', pre: '// ', suf: ' //', map: MAPS.wide },
    { id: 'graf-invert', name: 'Upside Down', pre: '🙃 ', suf: '', map: MAPS.inverted },
    { id: 'graf-russian', name: 'Cyrillic Tag', pre: '☭ ', suf: '', map: MAPS.russian },
    { id: 'graf-greek', name: 'Greek Style', pre: '🏛️ ', suf: '', map: MAPS.greek },
  ];

  graffitiDecorators.forEach(d => {
    const fullId = addFont(d.id, d.name, 'graffiti', createMap(d.map), ['Urbano'], 'medium');
    DECORATOR_CONFIG[fullId] = { prefix: d.pre, suffix: d.suf };
  });

  // --- FACEBOOK EXPANSION ---
  addFont('fb-strike', 'Tachado', 'facebook', createCombinerMap('sans', COMBINERS.strikethrough), ['Efecto', 'FB'], 'high');
  addFont('fb-underline', 'Subrayado', 'facebook', createCombinerMap('sans', COMBINERS.underline), ['Efecto', 'FB'], 'high');
  addFont('fb-double-under', 'Doble Subrayado', 'facebook', createCombinerMap('sans', COMBINERS.doubleUnderline), ['Efecto', 'FB'], 'medium');
  addFont('fb-dot-under', 'Punteado', 'facebook', createCombinerMap('sans', COMBINERS.dot), ['Efecto', 'FB'], 'medium');
  addFont('fb-slash', 'Barrado', 'facebook', createCombinerMap('sans', COMBINERS.slash), ['Efecto', 'FB'], 'high');
  addFont('fb-crosshatch', 'Cruzado', 'facebook', createCombinerMap('sans', COMBINERS.crosshatch), ['Efecto', 'FB'], 'medium');
  addFont('fb-wave', 'Ondulado', 'facebook', createCombinerMap('sans', COMBINERS.wave), ['Efecto', 'FB'], 'medium');
  addFont('fb-arrow-below', 'Flecha Abajo', 'facebook', createCombinerMap('sans', COMBINERS.arrowBelow), ['Efecto', 'FB'], 'medium');
  
  addFont('fb-bold-strike', 'Negrita Tachada', 'facebook', createCombinerMap('sansBold', COMBINERS.strikethrough), ['Negrita', 'FB'], 'high');
  addFont('fb-bold-under', 'Negrita Subrayada', 'facebook', createCombinerMap('sansBold', COMBINERS.underline), ['Negrita', 'FB'], 'high');
  addFont('fb-italic-strike', 'Cursiva Tachada', 'facebook', createCombinerMap('sansItalic', COMBINERS.strikethrough), ['Cursiva', 'FB'], 'high');
  addFont('fb-italic-under', 'Cursiva Subrayada', 'facebook', createCombinerMap('sansItalic', COMBINERS.underline), ['Cursiva', 'FB'], 'high');
  addFont('fb-serif-strike', 'Serif Tachado', 'facebook', createCombinerMap('serifBold', COMBINERS.strikethrough), ['Elegante', 'FB'], 'high');
  
  addFont('fb-spaced', 'Espaciado', 'facebook', createCombinerMap('sans', ' '), ['Aesthetic', 'FB'], 'high');
  addFont('fb-heavy-spaced', 'Heavy Spaced', 'facebook', createCombinerMap('heavySans', ' '), ['Impact', 'FB'], 'high');

  const fbDecorators = [
    { id: 'fb-list-check', name: 'Lista Check', pre: '✓ ', suf: '', map: MAPS.sans },
    { id: 'fb-list-arrow', name: 'Lista Flecha', pre: '➢ ', suf: '', map: MAPS.sansBold },
    { id: 'fb-list-star', name: 'Lista Estrella', pre: '★ ', suf: '', map: MAPS.sans },
    { id: 'fb-list-dot', name: 'Lista Punto', pre: '• ', suf: '', map: MAPS.sansBold },
    { id: 'fb-list-heart', name: 'Lista Corazón', pre: '♥ ', suf: '', map: MAPS.sans },
    { id: 'fb-list-diam', name: 'Lista Diamante', pre: '❖ ', suf: '', map: MAPS.sans },
    { id: 'fb-list-tri', name: 'Lista Triángulo', pre: '► ', suf: '', map: MAPS.sansBold },
    { id: 'fb-head-brack', name: 'Header [ ]', pre: '[ ', suf: ' ]', map: MAPS.sansBold },
    { id: 'fb-head-paren', name: 'Header ( )', pre: '( ', suf: ' )', map: MAPS.sansBold },
    { id: 'fb-head-curly', name: 'Header { }', pre: '{ ', suf: ' }', map: MAPS.monospace },
    { id: 'fb-head-angle', name: 'Header « »', pre: '« ', suf: ' »', map: MAPS.serifBold },
    { id: 'fb-head-line', name: 'Header ——', pre: '—— ', suf: ' ——', map: MAPS.sansBold },
    { id: 'fb-head-star', name: 'Header ⭐', pre: '⭐ ', suf: ' ⭐', map: MAPS.sansBold },
    { id: 'fb-head-block', name: 'Header Block', pre: '█ ', suf: ' █', map: MAPS.sansBold },
    { id: 'fb-mood-happy', name: 'Estado Feliz', pre: '😊 ', suf: ' 😊', map: MAPS.sans },
    { id: 'fb-mood-fire', name: 'Estado Fuego', pre: '🔥 ', suf: ' 🔥', map: MAPS.sansBoldItalic },
    { id: 'fb-mood-alert', name: 'Estado Alerta', pre: '⚠️ ', suf: ' ⚠️', map: MAPS.heavySans },
    { id: 'fb-mood-love', name: 'Estado Love', pre: '💖 ', suf: ' 💖', map: MAPS.scriptBold },
    { id: 'fb-mood-music', name: 'Estado Música', pre: '🎵 ', suf: ' 🎵', map: MAPS.sansItalic },
    { id: 'fb-aes-sparkle', name: 'FB Aesthetic 1', pre: '✨ ', suf: ' ✨', map: MAPS.smallCaps },
    { id: 'fb-aes-flower', name: 'FB Aesthetic 2', pre: '🌸 ', suf: ' 🌸', map: MAPS.serifItalic },
    { id: 'fb-aes-cloud', name: 'FB Aesthetic 3', pre: '☁️ ', suf: ' ☁️', map: MAPS.bubble },
    { id: 'fb-aes-moon', name: 'FB Aesthetic 4', pre: '🌙 ', suf: ' 🌙', map: MAPS.wide },
    { id: 'fb-span-excl', name: '¡Gritando!', pre: '¡¡ ', suf: ' !!', map: MAPS.heavySans },
    { id: 'fb-span-quest', name: '¿Pregunta?', pre: '¿¿ ', suf: ' ??', map: MAPS.sansBoldItalic },
  ];

  fbDecorators.forEach(d => {
    const fullId = addFont(d.id, d.name, 'facebook', createMap(d.map), ['Post', 'Estado'], 'high');
    DECORATOR_CONFIG[fullId] = { prefix: d.pre, suffix: d.suf };
  });

  // --- AMINO EXPANSION ---
  
  // 1. Basics & Formatting for Amino Blogs/Wikis
  addFont('ami-small', 'Amino Small Caps', 'amino', createMap(MAPS.smallCaps), ['Wiki', 'Header'], 'high');
  addFont('ami-typewriter', 'Amino Typewriter', 'amino', createMap(MAPS.monospace), ['Blog', 'Retro'], 'high');
  addFont('ami-spaced', 'Amino Spaced', 'amino', createCombinerMap('sans', ' '), ['Aesthetic', 'Soft'], 'high');
  addFont('ami-spaced-bold', 'Amino Bold Spaced', 'amino', createCombinerMap('sansBold', ' '), ['Aesthetic', 'Header'], 'high');

  // 2. Boxed & Enclosed
  addFont('ami-square', 'Amino Box', 'amino', createMap(MAPS.square), ['Wiki', 'Bloque'], 'medium');
  addFont('ami-bubble', 'Amino Bubble', 'amino', createMap(MAPS.bubble), ['Cute', 'Redondo'], 'medium');
  addFont('ami-bracket', 'Amino [Brackets]', 'amino', createMap(MAPS.parenthesized), ['Wiki'], 'high');

  // 3. Aesthetic Decorators
  const aminoDecorators = [
    { id: 'ami-star', name: 'Amino Stars', pre: '★ ', suf: ' ★', map: MAPS.sans },
    { id: 'ami-sparkle', name: 'Amino Sparkles', pre: '✨ ', suf: ' ✨', map: MAPS.smallCaps },
    { id: 'ami-heart', name: 'Amino Love', pre: '♥ ', suf: ' ♥', map: MAPS.sansBold },
    { id: 'ami-flower', name: 'Amino Floral', pre: '✿ ', suf: ' ✿', map: MAPS.monospace },
    { id: 'ami-cherry', name: 'Amino Cherry', pre: '🍒 ', suf: ' 🍒', map: MAPS.sans },
    { id: 'ami-cloud', name: 'Amino Cloud', pre: '☁️ ', suf: ' ☁️', map: MAPS.bubble },
    { id: 'ami-moon', name: 'Amino Moon', pre: '☾ ', suf: ' ☽', map: MAPS.smallCaps },
    { id: 'ami-wings1', name: 'Amino Wings', pre: '꧁ ', suf: ' ꧂', map: MAPS.sans },
    { id: 'ami-arrow', name: 'Amino Arrows', pre: '» ', suf: ' «', map: MAPS.sansBold },
    { id: 'ami-line', name: 'Amino Lined', pre: '━ ', suf: ' ━', map: MAPS.sans },
    { id: 'ami-wave', name: 'Amino Waves', pre: '〰 ', suf: ' 〰', map: MAPS.sans },
    { id: 'ami-bow', name: 'Amino Bow', pre: '🎀 ', suf: ' 🎀', map: MAPS.scriptFine },
    { id: 'ami-bunny', name: 'Amino Bunny', pre: '૮ ˶ᵔ ᵕ ᵔ˶ ა ', suf: '', map: MAPS.sans },
    { id: 'ami-bear', name: 'Amino Bear', pre: 'ʕ•ᴥ•ʔ ', suf: '', map: MAPS.monospace },
    { id: 'ami-cat', name: 'Amino Cat', pre: '🐱 ', suf: ' 🐱', map: MAPS.sans },
    { id: 'ami-music', name: 'Amino Music', pre: '♫ ', suf: ' ♫', map: MAPS.sansItalic },
    { id: 'ami-header-1', name: 'Amino Header ///', pre: '/// ', suf: ' ///', map: MAPS.heavySans },
    { id: 'ami-header-2', name: 'Amino Header [ ]', pre: '[ ', suf: ' ]', map: MAPS.wide },
    { id: 'ami-span-excl', name: 'Amino ¡Grito!', pre: '¡¡ ', suf: ' !!', map: MAPS.heavySans },
    { id: 'ami-span-quest', name: 'Amino ¿Duda?', pre: '¿¿ ', suf: ' ??', map: MAPS.sansItalic },
  ];

  aminoDecorators.forEach(d => {
    const fullId = addFont(d.id, d.name, 'amino', createMap(d.map), ['Aesthetic', 'Wiki'], 'high');
    DECORATOR_CONFIG[fullId] = { prefix: d.pre, suffix: d.suf };
  });

  // 4. Stylized Amino
  addFont('ami-strike', 'Amino Tacha', 'amino', createCombinerMap('sans', COMBINERS.strikethrough), ['Blog', 'Edgy'], 'high');
  addFont('ami-under', 'Amino Subraya', 'amino', createCombinerMap('sans', COMBINERS.underline), ['Header', 'Wiki'], 'high');
  addFont('ami-slash', 'Amino Slash', 'amino', createCombinerMap('sans', COMBINERS.slash), ['Edgy', 'Wiki'], 'high');
  addFont('ami-glitch', 'Amino Glitch', 'amino', createCombinerMap('sans', '\u0310'), ['Glitch', 'Edgy'], 'medium');

  // Extra Combiners
  addFont('arrow-below', 'Arrow Below', 'sans', createCombinerMap('sansBold', COMBINERS.arrowBelow), ['Decorado'], 'high');
  addFont('seagull', 'Seagull Text', 'sans', createCombinerMap('serifBold', COMBINERS.seagull), ['Decorado'], 'high');
  addFont('tilde-below', 'Tilde Below', 'sans', createCombinerMap('sans', COMBINERS.tildeBelow), ['Decorado'], 'high');
  addFont('zalgo-lite', 'Glitch Lite', 'gothic', createCombinerMap('sans', '\u0310'), ['Glitch'], 'low');
};

initFonts();

export const FONTS: FontStyle[] = generatedFonts;

export const convertText = (text: string, map: Record<string, string>, isVaporwave: boolean = false): string => {
  const normalized = text.normalize('NFC');
  
  // Find font definition to apply decorators
  const fontDef = generatedFonts.find(f => f.map === map);
  const fontId = fontDef?.id || '';

  // Efficient Lookup using Registry
  let prefix = '';
  let suffix = '';
  
  if (DECORATOR_CONFIG[fontId]) {
    prefix = DECORATOR_CONFIG[fontId].prefix;
    suffix = DECORATOR_CONFIG[fontId].suffix;
  }
  
  // Fallback for non-registered legacy decorators (if any exist)
  else if (fontId.includes('italic-star')) { prefix = '★ '; suffix = ' ★'; }
  else if (fontId.includes('italic-heart')) { prefix = '♥ '; suffix = ' ♥'; }

  const mapped = [...normalized].map(char => {
    if (map[char]) return map[char];
    const baseChar = ACCENT_MAP[char];
    if (baseChar && map[baseChar]) {
      const combiner = char === 'ñ' || char === 'Ñ' ? COMBINERS.tilde : COMBINERS.acute;
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
