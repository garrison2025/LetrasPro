
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
  
  // --- NEW BASES (EXPANSION) ---
  regional: '🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿0123456789', // Blue letters
  tagging: 'Ⱥƀ↻ժeƒǥhìʝƙꝆɱñøþqɾ$†uƲw×¥ƵȺƀ↻ժeƒǥhìʝƙꝆɱñøþqɾ$†uƲw×¥Ƶ0123456789', // Street marker style
  oldSchool: '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗', // Heavy Serif
  censored: '████████████████████████████████████████████████████0123456789', // Censored

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

// Helper: Create Character Map
const createMap = (target: string): Record<string, string> => {
  const map: Record<string, string> = {};
  const sChars = [...(lower + upper + numbers)];
  // Handle surrogate pairs for Regional Indicators
  const tChars = Array.from(target); 
  
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
  generatedFonts.push({
    id: `pro-${id}`,
    name,
    category: cat,
    map: mapData,
    pages: getPagesForCategory(cat, id),
    compatibility: comp,
    tags
  });
};

const getPagesForCategory = (cat: string, id: string): string[] => {
  const p = ['home'];
  const lowerId = id.toLowerCase();

  // --- SPECIAL COLLECTIONS ---
  if (lowerId.includes('regional') || lowerId.includes('blue') || lowerId.includes('censored')) {
    p.push('home');
  }

  // --- LOGIC FOR CURSIVAS ---
  if (cat === 'script' || lowerId.includes('italic') || lowerId.includes('hand') || lowerId.includes('cursive') || lowerId.includes('serif-italic')) {
    p.push('cursivas');
  }
  if ((cat === 'decorative' || cat === 'amino') && (lowerId.includes('cur-') || lowerId.includes('coquette') || lowerId.includes('love') || lowerId.includes('heart') || lowerId.includes('flower'))) {
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
  if (cat === 'aesthetic' && (lowerId.includes('vapor') || lowerId.includes('stencil'))) {
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
  
  // --- LOGIC FOR AMINO ---
  if (cat === 'amino' || lowerId.includes('ami-') || cat === 'aesthetic' || cat === 'vaporwave' || cat === 'decorative' || lowerId.includes('small') || lowerId.includes('spaced') || lowerId.includes('sep-')) {
    p.push('amino');
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
  
  // --- SPECIAL NUMBERS & SYMBOLS ---
  addFont('squared-num', 'Números Cuadrados', 'block', createMap(MAPS.square), ['Números'], 'medium');
  addFont('filled-num', 'Números Negros', 'block', createMap(MAPS.squareBlack), ['Números'], 'medium');
  addFont('bubble-num', 'Números Burbuja', 'graffiti', createMap(MAPS.bubble), ['Números'], 'medium');

  // --- CURSIVAS EXPANSION (COQUETTE & ROMANTIC) ---
  
  addFont('cur-handwriting', 'Handwriting Mix', 'script', createMap(MAPS.handwriting), ['Aesthetic', 'Raro'], 'medium');
  addFont('cur-lovely', 'Lovely Cursive', 'script', createMap(MAPS.lovely), ['Cute', 'Soft'], 'medium');

  // Combiners for Cursives
  addFont('cur-under', 'Script Subrayado', 'script', createCombinerMap('scriptFine', COMBINERS.underline), ['Elegante'], 'medium');
  addFont('cur-strike', 'Script Tachado', 'script', createCombinerMap('scriptFine', COMBINERS.strikethrough), ['Elegante'], 'medium');
  addFont('cur-wave', 'Script Ondulado', 'script', createCombinerMap('scriptFine', COMBINERS.wave), ['Elegante'], 'medium');

  // Coquette & Decorative Cursives
  const cursiveDecorators = [
    { id: 'coquette-bow1', name: 'Coquette Bow', pre: '🎀 ', suf: ' 🎀', map: MAPS.scriptFine },
    { id: 'coquette-bow2', name: 'Coquette Pink', pre: '🩰 ', suf: ' 🩰', map: MAPS.scriptBold },
    { id: 'coquette-swan', name: 'Swan Lake', pre: '🦢 ', suf: ' 🦢', map: MAPS.scriptFine },
    { id: 'coquette-cake', name: 'Sweet Cake', pre: '🍰 ', suf: ' 🍰', map: MAPS.scriptBold },
    { id: 'cur-signature', name: 'Firma Caótica', pre: '✍️ ', suf: ' ...', map: MAPS.handwriting },
    { id: 'boho-nature', name: 'Boho Nature', pre: '🌿 ', suf: ' 🌿', map: MAPS.scriptFine },
    { id: 'boho-mush', name: 'Mushroom Core', pre: '🍄 ', suf: ' 🍄', map: MAPS.lovely },
    { id: 'princess', name: 'Disney Princess', pre: '🏰 ', suf: ' 🏰', map: MAPS.scriptBold },
    { id: 'wings1', name: 'Alas Reales', pre: '꧁ ', suf: ' ꧂', map: MAPS.scriptBold },
    { id: 'wings2', name: 'Alas Finas', pre: '༺ ', suf: ' ༻', map: MAPS.scriptFine },
    { id: 'hearts1', name: 'Corazones Bold', pre: '❤ ', suf: ' ❤', map: MAPS.scriptBold },
    { id: 'flower1', name: 'Floral Fine', pre: '✿ ', suf: ' ✿', map: MAPS.scriptFine },
    { id: 'arrow1', name: 'Flecha Cupido', pre: '➳ ', suf: ' ➳', map: MAPS.scriptFine },
    { id: 'music1', name: 'Melodía Suave', pre: '♫ ', suf: ' ♫', map: MAPS.scriptFine },
    { id: 'butterfly1', name: 'Mariposa Blue', pre: '🦋 ', suf: ' 🦋', map: MAPS.scriptFine },
    { id: 'sparkle2', name: 'Destellos', pre: '❇ ', suf: ' ❇', map: MAPS.scriptFine },
    { id: 'feather', name: 'Pluma Escritura', pre: '🪶 ', suf: ' 🪶', map: MAPS.scriptItalic },
    { id: 'fairy', name: 'Hada Mágica', pre: '🧚 ', suf: ' 🧚', map: MAPS.scriptFine },
  ];

  cursiveDecorators.forEach(s => {
    const fullId = `cur-deco-${s.id}`;
    DECORATOR_CONFIG[fullId] = { prefix: s.pre, suffix: s.suf };
    addFont(s.id, s.name, 'script', createMap(s.map), ['Decorado', 'Cursiva'], 'medium');
  });

  // Spanish Specifics
  const spanishCursive = [
    { id: 'cur-span-excl', name: '¡Gritando!', pre: '¡ ', suf: ' !', map: MAPS.scriptBold },
    { id: 'cur-span-quest', name: '¿Pregunta?', pre: '¿ ', suf: ' ?', map: MAPS.scriptFine },
    { id: 'cur-span-quote', name: '«Cita»', pre: '« ', suf: ' »', map: MAPS.serifItalic },
    { id: 'cur-span-dash', name: '—Diálogo—', pre: '— ', suf: ' —', map: MAPS.scriptFine },
  ];

  spanishCursive.forEach(s => {
    const fullId = `cur-span-${s.id}`;
    DECORATOR_CONFIG[fullId] = { prefix: s.pre, suffix: s.suf };
    addFont(s.id, s.name, 'script', createMap(s.map), ['Español', 'Cursiva'], 'high');
  });

  // --- GOTHIC EXPANSION (BÉLICO & METAL) ---
  addFont('goth-spaced', 'Gothic Spaced', 'gothic', createCombinerMap('frakturBold', ' '), ['Aesthetic'], 'medium');
  addFont('metal-extreme', 'Heavy Metal', 'gothic', createCombinerMap('frakturBold', COMBINERS.crosshatch), ['Metal', 'Raro'], 'medium');

  const gothicDecorators = [
    { id: 'belico-mx', name: 'Estilo Bélico MX', pre: '🧿 ', suf: ' 📿', map: MAPS.frakturBold },
    { id: 'belico-money', name: 'Bélico Dinero', pre: '💸 ', suf: ' 💸', map: MAPS.frakturBold },
    { id: 'belico-lucky', name: 'Suerte Bélica', pre: '🍀 ', suf: ' 🍀', map: MAPS.fraktur },
    { id: 'belico-cowboy', name: 'Alucín', pre: '🤠 ', suf: ' 🤠', map: MAPS.frakturBold },
    { id: 'witchy-moon', name: 'Witchy Moon', pre: '🌑 ', suf: ' 🌒', map: MAPS.fraktur },
    { id: 'witchy-spell', name: 'Magic Spell', pre: '🔮 ', suf: ' 🔮', map: MAPS.fraktur },
    { id: 'horror-bleed', name: 'Horror Bleed', pre: '🩸 ', suf: ' 🩸', map: MAPS.frakturBold },
    { id: 'horror-ghost', name: 'Ghost Gothic', pre: '👻 ', suf: ' 👻', map: MAPS.fraktur },
    { id: 'goth-simple', name: 'Gothic Simple', pre: '', suf: '', map: MAPS.fraktur },
    { id: 'goth-brackets', name: 'Gothic Bracket', pre: '【 ', suf: ' 】', map: MAPS.frakturBold },
    { id: 'goth-lines', name: 'Gothic Lined', pre: '║ ', suf: ' ║', map: MAPS.fraktur },
    { id: 'goth-slash', name: 'Gothic Slash', pre: '// ', suf: ' //', map: MAPS.frakturBold },
    { id: 'goth-tribal', name: 'Tribal Gothic', pre: '༒ ', suf: ' ༒', map: MAPS.frakturBold },
    { id: 'goth-wings1', name: 'Gothic Wings', pre: '꧁ ', suf: ' ꧂', map: MAPS.fraktur },
    { id: 'goth-spanish', name: 'Gótico ES', pre: '¡ ', suf: ' !', map: MAPS.frakturBold },
    { id: 'goth-rock', name: 'Rock Gothic', pre: '🤘 ', suf: ' 🤘', map: MAPS.frakturBold }
  ];

  gothicDecorators.forEach(d => {
    const fullId = `gothic-${d.id}`;
    DECORATOR_CONFIG[fullId] = { prefix: d.pre, suffix: d.suf };
    addFont(d.id, d.name, 'gothic', createMap(d.map), ['Dark', 'Bélico'], 'medium');
  });
  
  addFont('zalgo-goth', 'Zalgo Gothic', 'gothic', createCombinerMap('fraktur', '\u0352'), ['Glitch', 'Miedo'], 'low');

  // --- TATTOO EXPANSION ---
  const tattooStyles = [
    { id: 'tat-coord', name: 'Coordenadas', pre: '📍 ', suf: " N 0°", map: MAPS.sans }, // Simulated coord
    { id: 'tat-roman', name: 'Fecha Romana (Sim)', pre: 'MCMLXXX', suf: '', map: MAPS.serifBold }, // Just simulates look
    { id: 'tat-fine-simple', name: 'Fine Line Simple', pre: '', suf: '', map: MAPS.sans },
    { id: 'tat-minimal-caps', name: 'Minimalist Caps', pre: '', suf: '', map: MAPS.smallCaps },
    { id: 'tat-typewriter', name: 'Typewriter Clean', pre: '', suf: '', map: MAPS.monospace },
    { id: 'tat-quote', name: 'Quote Tattoo', pre: '“', suf: '”', map: MAPS.serifItalic },
    { id: 'tat-infinity', name: 'Infinity Love', pre: '∞ ', suf: ' ∞', map: MAPS.scriptFine },
    { id: 'tat-heartbeat', name: 'Pulse Line', pre: 'ﮩ٨ـ', suf: 'ﮩ٨ـ', map: MAPS.scriptFine },
    { id: 'tat-unalome', name: 'Spiritual Unalome', pre: '⸎ ', suf: ' ⸎', map: MAPS.sans },
    { id: 'tat-constellation', name: 'Constellation', pre: '✨ ', suf: ' ✨', map: MAPS.sans },
    { id: 'tat-moon-phase', name: 'Moon Phase', pre: '☾ ', suf: ' ☽', map: MAPS.serifItalic },
    { id: 'tat-angel', name: 'Angel Number', pre: '11:11 ', suf: ' 👼', map: MAPS.sansBold },
    { id: 'tat-trad-anchor', name: 'Old School Anchor', pre: '⚓ ', suf: ' ⚓', map: MAPS.oldSchool },
    { id: 'tat-trad-rose', name: 'Traditional Rose', pre: '🌹 ', suf: ' 🌹', map: MAPS.oldSchool },
    { id: 'tat-chicano-2', name: 'Chicano Decor', pre: '⚜️ ', suf: ' ⚜️', map: MAPS.chicano },
    { id: 'tat-spanish-excl', name: 'Tatuaje Español', pre: '¡ ', suf: ' !', map: MAPS.scriptFine },
  ];

  tattooStyles.forEach(d => {
    const fullId = `tattoo-${d.id}`;
    DECORATOR_CONFIG[fullId] = { prefix: d.pre, suffix: d.suf };
    addFont(d.id, d.name, 'gothic', createMap(d.map), ['Tattoo', 'Ink'], 'medium');
  });
  
  addFont('tat-min-spaced-v2', 'Minimal Spaced', 'sans', createCombinerMap('sans', ' '), ['Minimal'], 'medium');

  // --- GRAFFITI / URBAN EXPANSION ---
  addFont('tag-marker', 'Tagging Marker', 'graffiti', createMap(MAPS.tagging), ['Street', 'Firma'], 'medium');
  addFont('vapor-kana', 'Vaporwave Kana', 'vaporwave', createCombinerMap('wide', ' '), ['Aesthetic', 'Japón'], 'high');

  const graffitiDecorators = [
    { id: 'graf-3d', name: 'Graffiti 3D Block', pre: '█ ', suf: ' █', map: MAPS.squareBlack },
    { id: 'graf-bubble', name: 'Bubble Gum', pre: '', suf: '', map: MAPS.bubble },
    { id: 'graf-dark', name: 'Dark Bubble', pre: '', suf: '', map: MAPS.bubbleBlack },
    { id: 'graf-skate', name: 'Skater Vibe', pre: '🛹 ', suf: ' ⚡', map: MAPS.tagging },
    { id: 'graf-spray', name: 'Spray Paint', pre: '🥫 ', suf: ' 💨', map: MAPS.bubbleBlack },
    { id: 'graf-train', name: 'Subway Art', pre: '🚇 ', suf: ' 🚇', map: MAPS.wide },
    { id: 'graf-city', name: 'City Life', pre: '🏙️ ', suf: ' 🏙️', map: MAPS.sansBold },
    { id: 'graf-king', name: 'King Crown', pre: '👑 ', suf: ' 👑', map: MAPS.bubble },
    { id: 'graf-fire', name: 'On Fire', pre: '🔥 ', suf: ' 🔥', map: MAPS.bubbleBlack },
    { id: 'graf-star', name: 'Star Power', pre: '✪ ', suf: ' ✪', map: MAPS.bubble },
    { id: 'graf-ghost', name: 'Ghost Tag', pre: '👻 ', suf: ' 👻', map: MAPS.sansBoldItalic },
    { id: 'graf-money', name: 'Rich Kid', pre: '💲 ', suf: ' 💲', map: MAPS.squareBlack },
    { id: 'graf-danger', name: 'Hazard', pre: '⚠️ ', suf: ' ⚠️', map: MAPS.square },
    { id: 'graf-invert', name: 'Upside Down', pre: '🙃 ', suf: '', map: MAPS.inverted },
    { id: 'graf-russian', name: 'Rusify Tag', pre: '☭ ', suf: '', map: MAPS.russian },
    { id: 'graf-greek', name: 'Greek Style', pre: '🏛️ ', suf: '', map: MAPS.greek },
  ];

  graffitiDecorators.forEach(d => {
    const fullId = `graffiti-${d.id}`;
    DECORATOR_CONFIG[fullId] = { prefix: d.pre, suffix: d.suf };
    addFont(d.id, d.name, 'graffiti', createMap(d.map), ['Urbano'], 'medium');
  });

  // --- FACEBOOK EXPANSION ---
  addFont('fb-strike', 'Tachado', 'facebook', createCombinerMap('sans', COMBINERS.strikethrough), ['Efecto', 'FB'], 'high');
  addFont('fb-underline', 'Subrayado', 'facebook', createCombinerMap('sans', COMBINERS.underline), ['Efecto', 'FB'], 'high');
  addFont('fb-double-under', 'Doble Subrayado', 'facebook', createCombinerMap('sans', COMBINERS.doubleUnderline), ['Efecto', 'FB'], 'medium');
  addFont('fb-slash', 'Barrado', 'facebook', createCombinerMap('sans', COMBINERS.slash), ['Efecto', 'FB'], 'high');
  
  addFont('fb-bold-strike', 'Negrita Tachada', 'facebook', createCombinerMap('sansBold', COMBINERS.strikethrough), ['Negrita', 'FB'], 'high');
  addFont('fb-bold-under', 'Negrita Subrayada', 'facebook', createCombinerMap('sansBold', COMBINERS.underline), ['Negrita', 'FB'], 'high');
  addFont('fb-italic-strike', 'Cursiva Tachada', 'facebook', createCombinerMap('sansItalic', COMBINERS.strikethrough), ['Cursiva', 'FB'], 'high');
  
  addFont('fb-spaced', 'Espaciado', 'facebook', createCombinerMap('sans', ' '), ['Aesthetic', 'FB'], 'high');
  addFont('fb-heavy-spaced', 'Heavy Spaced', 'facebook', createCombinerMap('heavySans', ' '), ['Impact', 'FB'], 'high');

  const fbDecorators = [
    { id: 'fb-fake-link', name: 'Falso Link Azul', pre: '🌐 http://', suf: '.com', map: MAPS.sansBold },
    { id: 'fb-chain', name: 'Encadenado', pre: '⛓️ ', suf: ' ⛓️', map: MAPS.bubble },
    { id: 'fb-arrow-emph', name: 'Flechas Énfasis', pre: '⬇️ ', suf: ' ⬇️', map: MAPS.sansBold },
    { id: 'fb-list-check', name: 'Lista Check', pre: '✅ ', suf: '', map: MAPS.sans },
    { id: 'fb-list-arrow', name: 'Lista Flecha', pre: '➤ ', suf: '', map: MAPS.sansBold },
    { id: 'fb-list-star', name: 'Lista Estrella', pre: '★ ', suf: '', map: MAPS.sans },
    { id: 'fb-head-brack', name: 'Header [ ]', pre: '[ ', suf: ' ]', map: MAPS.sansBold },
    { id: 'fb-head-line', name: 'Header ——', pre: '—— ', suf: ' ——', map: MAPS.sansBold },
    { id: 'fb-mood-happy', name: 'Estado Feliz', pre: '😊 ', suf: ' 😊', map: MAPS.sans },
    { id: 'fb-mood-fire', name: 'Estado Fuego', pre: '🔥 ', suf: ' 🔥', map: MAPS.sansBoldItalic },
    { id: 'fb-span-excl', name: '¡Gritando!', pre: '¡¡ ', suf: ' !!', map: MAPS.heavySans },
  ];

  fbDecorators.forEach(d => {
    const fullId = `facebook-${d.id}`;
    DECORATOR_CONFIG[fullId] = { prefix: d.pre, suffix: d.suf };
    addFont(d.id, d.name, 'facebook', createMap(d.map), ['Post', 'Estado'], 'high');
  });

  // --- AMINO EXPANSION ---
  
  // 1. Basics & Formatting for Amino
  addFont('ami-small', 'Amino Small Caps', 'amino', createMap(MAPS.smallCaps), ['Wiki', 'Header'], 'high');
  addFont('ami-typewriter', 'Amino Typewriter', 'amino', createMap(MAPS.monospace), ['Blog', 'Retro'], 'high');
  addFont('ami-spaced', 'Amino Spaced', 'amino', createCombinerMap('sans', ' '), ['Aesthetic', 'Soft'], 'high');
  
  // 2. Roleplay
  const aminoDecorators = [
    { id: 'ami-rp-act', name: 'Roleplay Action', pre: '* ', suf: ' *', map: MAPS.sansItalic },
    { id: 'ami-rp-whisper', name: 'Roleplay Whisper', pre: '- ', suf: ' -', map: MAPS.smallCaps },
    { id: 'ami-rp-yell', name: 'Roleplay Yell', pre: '!!! ', suf: ' !!!', map: MAPS.sansBold },
    { id: 'ami-sep-flower', name: 'Separador Floral', pre: '❀ ', suf: ' ❀', map: MAPS.sans },
    { id: 'ami-sep-star', name: 'Separador Estrellas', pre: '★ ', suf: ' ★', map: MAPS.sans },
    { id: 'ami-head-dec', name: 'Header Decorado', pre: '─── ❖ ', suf: ' ❖ ───', map: MAPS.smallCaps },
    { id: 'ami-head-kaomoji', name: 'Header Kaomoji', pre: '(★^O^★) ', suf: ' (★^O^★)', map: MAPS.sansBold },
    { id: 'ami-bracket', name: 'Amino [Brackets]', pre: '[ ', suf: ' ]', map: MAPS.monospace },
    { id: 'ami-sparkle', name: 'Amino Sparkles', pre: '✨ ', suf: ' ✨', map: MAPS.smallCaps },
    { id: 'ami-heart', name: 'Amino Love', pre: '♥ ', suf: ' ♥', map: MAPS.sansBold },
    { id: 'ami-cloud', name: 'Amino Cloud', pre: '☁️ ', suf: ' ☁️', map: MAPS.bubble },
    { id: 'ami-moon', name: 'Amino Moon', pre: '☾ ', suf: ' ☽', map: MAPS.smallCaps },
    { id: 'ami-wings1', name: 'Amino Wings', pre: '꧁ ', suf: ' ꧂', map: MAPS.sans },
    { id: 'ami-arrow', name: 'Amino Arrows', pre: '» ', suf: ' «', map: MAPS.sansBold },
    { id: 'ami-bunny', name: 'Amino Bunny', pre: '૮ ˶ᵔ ᵕ ᵔ˶ ა ', suf: '', map: MAPS.sans },
  ];

  aminoDecorators.forEach(d => {
    const fullId = `amino-${d.id}`;
    DECORATOR_CONFIG[fullId] = { prefix: d.pre, suffix: d.suf };
    addFont(d.id, d.name, 'amino', createMap(d.map), ['Aesthetic', 'Wiki'], 'high');
  });

  // 4. Stylized Amino
  addFont('ami-strike', 'Amino Tacha', 'amino', createCombinerMap('sans', COMBINERS.strikethrough), ['Blog', 'Edgy'], 'high');
  addFont('ami-under', 'Amino Subraya', 'amino', createCombinerMap('sans', COMBINERS.underline), ['Header', 'Wiki'], 'high');
  addFont('ami-slash', 'Amino Slash', 'amino', createCombinerMap('sans', COMBINERS.slash), ['Edgy', 'Wiki'], 'high');
  addFont('ami-glitch', 'Amino Glitch', 'amino', createCombinerMap('sans', '\u0310'), ['Glitch', 'Edgy'], 'medium');
  
  // Extra Combiners
  addFont('arrow-below', 'Arrow Below', 'sans', createCombinerMap('sansBold', COMBINERS.arrowBelow), ['Decorado'], 'high');
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
