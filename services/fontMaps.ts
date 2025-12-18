import { FontStyle, TextSegment } from '../types';

const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// 1. 基础 Unicode 映射表 (Base Maps)
const MAPS: Record<string, string> = {
  // --- SANS SERIF (Facebook Safe) ---
  sans: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  sansBold: '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵ｉｊ𝒌𝗹𝗺ｎ𝗼𝗽𝗾𝗿𝘀𝘁ｕｖｗｘｙｚＡ𝗕ＣＤＥＦＧＨＩＪＫＬＭＮＯＰ𝗤𝗥𝗦ＴＵＶＷ𝗫𝗬𝗭',
  sansItalic: '𝘢𝘣ｃ𝘥𝑒𝘧𝘨𝘩ɪ𝘫𝑘𝘭𝘮𝘯𝘰𝘱𝗊𝘳𝘴𝘵ｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  sansBoldItalic: '𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕',
  
  // --- SERIF (Tattoo / Formal) ---
  serifBold: '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝐀𝐁ＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  serifItalic: '𝑎𝑏𝑐ｄ𝑒ｆｇｈ𝑖𝑗𝑘ｌｍｎｏｐ𝑞ｒｓｔ𝑢𝑣ｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  serifBoldItalic: '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁',
  
  // --- SCRIPT (Cursivas / Tattoo) ---
  scriptFine: '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏𝒜𝐵𝒞𝒟ＥＦＧＨＩＪＫＬＭＮＯＰＱＲ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵',
  scriptBold: '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩',
  
  // --- GOTHIC (Goticas / Tattoo / Free Fire) ---
  fraktur: '𝔞𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ',
  frakturBold: '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅',
  
  // --- GRAFFITI / URBAN / BUBBLES ---
  bubble: 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ',
  bubbleBlack: '🅐𝑩𝑪𝑨𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁🅐𝑩𝑪𝑨𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁',
  square: '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉',
  squareBlack: '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉',
  wide: 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  
  // --- DECORATIVE / AESTHETIC ---
  smallCaps: 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠｗｘｙｚᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ',
  tiny: 'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾᑫᴿˢᵀᵁⱽᵂˣʸᶻ',
  monospace: '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱ＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  doubleStruck: '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙＱＲＳＴ𝕌𝕍𝕎𝕏𝕐ℤ',
  inverted: 'ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz∀ᗺƆᗡƎℲ⅁HIᗿK˥WNOԀΌᴚS⊥∩ΛMX⅄Z',
  
  // --- SPECIALTY ---
  greek: 'αвc∂єfɢнιjкℓмиσρqяѕтυνωχуzΑΒCDEFGHΙJKLMΝOPQRSTUVWΧΥZ',
  russian: 'аъcdэfɢнїjкlмиорqяsтцvшxчzАБCDЭFGHЇJКLМИОPQЯSТЦVШXЧZ',
  currency: '₳฿₵ĐɆ₣₲ⱧłJ₭Ⱡ₥₦Ø₱QⱤ₴₮ɄV₩ӾɎ♄₳฿₵ĐɆ₣₲ⱧłJ₭Ⱡ₥₦Ø₱QⱤ₴₮ɄV₩ӾɎ♄',
  parenthesized: '⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵',
  
  // --- BASE FOR MANUAL CREATIONS ---
  chicano: '𝓐𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩',
  heavySans: '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃ｗ𝗫𝘆𝘇'
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
  seagull: '\u033B',
  arrowBelow: '\u034E',
  tildeBelow: '\u0330'
};

// Helper: Create Character Map
const createMap = (target: string): Record<string, string> => {
  const map: Record<string, string> = {};
  const sChars = [...(lower + upper)];
  const tChars = [...target];
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

  // --- LOGIC FOR CURSIVAS (>60 needed) ---
  if (cat === 'script' || lowerId.includes('italic') || lowerId.includes('hand') || lowerId.includes('cursive') || lowerId.includes('serif-italic')) {
    p.push('cursivas');
  }
  // Allow heavily decorated fonts in cursivas too if they feel elegant
  if (cat === 'decorative' && (lowerId.includes('love') || lowerId.includes('heart') || lowerId.includes('flower'))) {
    p.push('cursivas');
  }

  // --- LOGIC FOR GOTICAS ---
  if (cat === 'gothic' || lowerId.includes('fraktur') || lowerId.includes('old') || lowerId.includes('dark')) {
    p.push('goticas');
  }

  // --- LOGIC FOR GRAFFITI ---
  if (cat === 'graffiti' || cat === 'block' || lowerId.includes('bubble') || lowerId.includes('square')) {
    p.push('graffiti');
  }

  // --- LOGIC FOR TATTOOS ---
  if (cat === 'script' || cat === 'gothic' || cat === 'chicano' || cat === 'serif' || lowerId.includes('typewriter')) {
    p.push('tatuajes', 'tattoo');
  }

  // --- LOGIC FOR FACEBOOK ---
  if ((cat === 'sans' || cat === 'serif' || cat === 'block') && !lowerId.includes('decorated') && !lowerId.includes('emoji')) {
    p.push('facebook');
  }
  
  // --- LOGIC FOR AMINO ---
  if (cat === 'aesthetic' || cat === 'vaporwave' || cat === 'decorative' || lowerId.includes('small')) {
    p.push('amino');
  }

  return p;
};

const initFonts = () => {
  // 1. BASE UNICODE FONTS
  addFont('sans', 'Normal Sans', 'sans', createMap(MAPS.sans), ['Básico'], 'high');
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

  // --- CURSIVAS MASSIVE EXPANSION (60+ VARIANTS) ---
  
  // 1. Variantes de Trazo (Line Variants)
  addFont('script-under', 'Script Subrayado', 'script', createCombinerMap('scriptFine', COMBINERS.underline), ['Decorado'], 'medium');
  addFont('script-double-u', 'Script Doble Línea', 'script', createCombinerMap('scriptBold', COMBINERS.doubleUnderline), ['Decorado'], 'medium');
  addFont('script-strike', 'Script Tachado', 'script', createCombinerMap('scriptFine', COMBINERS.strikethrough), ['Decorado'], 'medium');
  addFont('serif-italic-under', 'Italic Subrayado', 'serif', createCombinerMap('serifItalic', COMBINERS.underline), ['Formal'], 'high');

  // 2. Variantes Temáticas (Decorators)
  const cursiveStyles = [
    { id: 'wings1', name: 'Script Alas 1', pre: '꧁ ', suf: ' ꧂', map: MAPS.scriptBold },
    { id: 'wings2', name: 'Script Alas 2', pre: '༺ ', suf: ' ༻', map: MAPS.scriptFine },
    { id: 'wings3', name: 'Script Alas 3', pre: '࿐ ', suf: ' ࿐', map: MAPS.scriptBold },
    
    { id: 'stars1', name: 'Script Estrellas', pre: '★ ', suf: ' ★', map: MAPS.scriptBold },
    { id: 'stars2', name: 'Script Sparkle', pre: '✨ ', suf: ' ✨', map: MAPS.scriptFine },
    { id: 'stars3', name: 'Script Magic', pre: '✪ ', suf: ' ✪', map: MAPS.scriptBold },
    
    { id: 'hearts1', name: 'Script Love', pre: '❤ ', suf: ' ❤', map: MAPS.scriptBold },
    { id: 'hearts2', name: 'Script Cute', pre: '❥ ', suf: ' ❥', map: MAPS.scriptFine },
    { id: 'hearts3', name: 'Script Heart', pre: 'ღ ', suf: ' ღ', map: MAPS.scriptBold },
    
    { id: 'flower1', name: 'Script Floral', pre: '✿ ', suf: ' ✿', map: MAPS.scriptFine },
    { id: 'flower2', name: 'Script Rose', pre: '🌹 ', suf: ' 🌹', map: MAPS.scriptBold },
    { id: 'flower3', name: 'Script Nature', pre: '☘ ', suf: ' ☘', map: MAPS.scriptFine },
    { id: 'flower4', name: 'Script Cherry', pre: '🍒 ', suf: ' 🍒', map: MAPS.scriptBold },
    
    { id: 'royal1', name: 'Script Queen', pre: '♕ ', suf: ' ♕', map: MAPS.scriptBold },
    { id: 'royal2', name: 'Script King', pre: '♚ ', suf: ' ♚', map: MAPS.scriptBold },
    { id: 'royal3', name: 'Script Princess', pre: '♛ ', suf: ' ♛', map: MAPS.scriptFine },
    
    { id: 'arrow1', name: 'Script Arrow', pre: '➳ ', suf: ' ➳', map: MAPS.scriptFine },
    { id: 'arrow2', name: 'Script Bow', pre: '➶ ', suf: ' ➷', map: MAPS.scriptBold },
    
    { id: 'music1', name: 'Script Music', pre: '♫ ', suf: ' ♫', map: MAPS.scriptFine },
    { id: 'music2', name: 'Script Melody', pre: '♪ ', suf: ' ♪', map: MAPS.scriptBold },
    
    { id: 'fire', name: 'Script Fire', pre: '🔥 ', suf: ' 🔥', map: MAPS.scriptBold },
    { id: 'butterfly', name: 'Script Butterfly', pre: '🦋 ', suf: ' 🦋', map: MAPS.scriptFine },
    { id: 'bow', name: 'Script Bowtie', pre: '🎀 ', suf: ' 🎀', map: MAPS.scriptFine },
    { id: 'moon', name: 'Script Moon', pre: '☾ ', suf: ' ☽', map: MAPS.scriptFine },
    { id: 'sun', name: 'Script Sun', pre: '☀ ', suf: ' ☀', map: MAPS.scriptBold },
    { id: 'cloud', name: 'Script Cloud', pre: '☁ ', suf: ' ☁', map: MAPS.scriptFine },
    { id: 'zap', name: 'Script Zap', pre: '⚡ ', suf: ' ⚡', map: MAPS.scriptBold },
    { id: 'peace', name: 'Script Peace', pre: '☮ ', suf: ' ☮', map: MAPS.scriptFine },
    { id: 'infinity', name: 'Script Infinite', pre: '∞ ', suf: ' ∞', map: MAPS.scriptBold },
    { id: 'anchor', name: 'Script Anchor', pre: '⚓ ', suf: ' ⚓', map: MAPS.scriptBold },
    
    { id: 'bracket1', name: 'Script Bracket', pre: '【 ', suf: ' 】', map: MAPS.scriptBold },
    { id: 'bracket2', name: 'Script Corner', pre: '『 ', suf: ' 』', map: MAPS.scriptFine },
    { id: 'bracket3', name: 'Script Guillemet', pre: '« ', suf: ' »', map: MAPS.scriptBold },
    
    { id: 'line1', name: 'Script Lined', pre: '━ ', suf: ' ━', map: MAPS.scriptFine },
    { id: 'line2', name: 'Script Waved', pre: '〰 ', suf: ' 〰', map: MAPS.scriptBold },
    { id: 'line3', name: 'Script Dotted', pre: '• ', suf: ' •', map: MAPS.scriptFine },
    
    { id: 'wedding', name: 'Script Boda', pre: '💍 ', suf: ' 💍', map: MAPS.scriptFine },
    { id: 'diamond', name: 'Script Lujo', pre: '💎 ', suf: ' 💎', map: MAPS.scriptBold },
    { id: 'kiss', name: 'Script Kiss', pre: '💋 ', suf: ' 💋', map: MAPS.scriptFine },
    
    // Italic Variants (For variety in Cursivas page)
    { id: 'italic-star', name: 'Italic Star', pre: '★ ', suf: ' ★', map: MAPS.sansItalic },
    { id: 'italic-heart', name: 'Italic Heart', pre: '♥ ', suf: ' ♥', map: MAPS.sansBoldItalic },
    { id: 'italic-arrow', name: 'Italic Arrow', pre: '➤ ', suf: ' ◄', map: MAPS.serifItalic },
    { id: 'italic-bracket', name: 'Italic Bracket', pre: '「 ', suf: ' 」', map: MAPS.serifBoldItalic },
    { id: 'italic-flowers', name: 'Italic Floral', pre: '❀ ', suf: ' ❀', map: MAPS.serifItalic },
    { id: 'italic-sparkle', name: 'Italic Shine', pre: '✨ ', suf: ' ✨', map: MAPS.sansItalic },
  ];

  // Generate Cursive Variants
  cursiveStyles.forEach(s => {
    generatedFonts.push({
      id: `cursive-${s.id}`,
      name: s.name,
      category: 'script',
      map: createMap(s.map), // Map characters
      pages: ['home', 'cursivas', 'tatuajes', 'tattoo', 'facebook', 'amino'],
      compatibility: 'medium',
      tags: ['Decorado', 'Cursiva']
    });
  });

  // 3. Gothic Decorators (Preserving existing logic)
  const gothicDecorators = [
    { id: 'dark', name: 'Dark Gothic', pre: '☠ ', suf: ' ☠', map: MAPS.frakturBold },
    { id: 'sword', name: 'Sword Gothic', pre: '⚔ ', suf: ' ⚔', map: MAPS.fraktur },
    { id: 'bat', name: 'Bat Gothic', pre: '🦇 ', suf: ' 🦇', map: MAPS.frakturBold },
    { id: 'spider', name: 'Spider Gothic', pre: '🕷 ', suf: ' 🕷', map: MAPS.frakturBold },
    { id: 'chain', name: 'Chain Gothic', pre: '⛓ ', suf: ' ⛓', map: MAPS.fraktur },
    { id: 'cross', name: 'Holy Gothic', pre: '✞ ', suf: ' ✞', map: MAPS.frakturBold },
    { id: 'thunder', name: 'Storm Gothic', pre: '⚡ ', suf: ' ⚡', map: MAPS.fraktur },
    { id: 'star-g', name: 'Star Gothic', pre: '★ ', suf: ' ★', map: MAPS.fraktur }
  ];

  gothicDecorators.forEach(d => {
    generatedFonts.push({
      id: `gothic-${d.id}`,
      name: d.name,
      category: 'gothic',
      map: createMap(d.map),
      pages: ['home', 'goticas', 'tatuajes', 'tattoo', 'graffiti'],
      compatibility: 'medium',
      tags: ['Dark']
    });
  });

  // 4. Graffiti Decorators
  const graffitiDecorators = [
    { id: 'spray', name: 'Spray Tag', pre: '', suf: '', map: MAPS.bubbleBlack },
    { id: 'brick', name: 'Wall Text', pre: '🧱 ', suf: ' 🧱', map: MAPS.squareBlack },
    { id: 'cool', name: 'Cool Bubble', pre: '😎 ', suf: '', map: MAPS.bubble },
    { id: 'star-bub', name: 'Star Bubble', pre: '✪ ', suf: ' ✪', map: MAPS.bubble },
    { id: 'wide-br', name: 'Wide Bracket', pre: '【 ', suf: ' 】', map: MAPS.wide },
    { id: 'block-arr', name: 'Block Arrow', pre: '► ', suf: ' ◄', map: MAPS.squareBlack }
  ];

  graffitiDecorators.forEach(d => {
    generatedFonts.push({
      id: `graffiti-${d.id}`,
      name: d.name,
      category: 'graffiti',
      map: createMap(d.map),
      pages: ['home', 'graffiti', 'facebook', 'amino'],
      compatibility: 'medium',
      tags: ['Urbano']
    });
  });

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

  // Reverse lookup to find decorator config based on ID (simulated)
  // This is a mapping from ID to prefix/suffix to avoid storing it in FontStyle interface for now
  let prefix = '';
  let suffix = '';

  // Cursive Prefixes
  if (fontId.includes('wings1')) { prefix = '꧁ '; suffix = ' ꧂'; }
  else if (fontId.includes('wings2')) { prefix = '༺ '; suffix = ' ༻'; }
  else if (fontId.includes('wings3')) { prefix = '࿐ '; suffix = ' ࿐'; }
  else if (fontId.includes('stars1')) { prefix = '★ '; suffix = ' ★'; }
  else if (fontId.includes('stars2')) { prefix = '✨ '; suffix = ' ✨'; }
  else if (fontId.includes('stars3')) { prefix = '✪ '; suffix = ' ✪'; }
  else if (fontId.includes('hearts1')) { prefix = '❤ '; suffix = ' ❤'; }
  else if (fontId.includes('hearts2')) { prefix = '❥ '; suffix = ' ❥'; }
  else if (fontId.includes('hearts3')) { prefix = 'ღ '; suffix = ' ღ'; }
  else if (fontId.includes('flower1')) { prefix = '✿ '; suffix = ' ✿'; }
  else if (fontId.includes('flower2')) { prefix = '🌹 '; suffix = ' 🌹'; }
  else if (fontId.includes('flower3')) { prefix = '☘ '; suffix = ' ☘'; }
  else if (fontId.includes('flower4')) { prefix = '🍒 '; suffix = ' 🍒'; }
  else if (fontId.includes('royal1')) { prefix = '♕ '; suffix = ' ♕'; }
  else if (fontId.includes('royal2')) { prefix = '♚ '; suffix = ' ♚'; }
  else if (fontId.includes('royal3')) { prefix = '♛ '; suffix = ' ♛'; }
  else if (fontId.includes('arrow1')) { prefix = '➳ '; suffix = ' ➳'; }
  else if (fontId.includes('arrow2')) { prefix = '➶ '; suffix = ' ➷'; }
  else if (fontId.includes('music1')) { prefix = '♫ '; suffix = ' ♫'; }
  else if (fontId.includes('music2')) { prefix = '♪ '; suffix = ' ♪'; }
  else if (fontId.includes('fire')) { prefix = '🔥 '; suffix = ' 🔥'; }
  else if (fontId.includes('butterfly')) { prefix = '🦋 '; suffix = ' 🦋'; }
  else if (fontId.includes('bow')) { prefix = '🎀 '; suffix = ' 🎀'; }
  else if (fontId.includes('moon')) { prefix = '☾ '; suffix = ' ☽'; }
  else if (fontId.includes('sun')) { prefix = '☀ '; suffix = ' ☀'; }
  else if (fontId.includes('cloud')) { prefix = '☁ '; suffix = ' ☁'; }
  else if (fontId.includes('zap')) { prefix = '⚡ '; suffix = ' ⚡'; }
  else if (fontId.includes('peace')) { prefix = '☮ '; suffix = ' ☮'; }
  else if (fontId.includes('infinity')) { prefix = '∞ '; suffix = ' ∞'; }
  else if (fontId.includes('anchor')) { prefix = '⚓ '; suffix = ' ⚓'; }
  else if (fontId.includes('bracket1')) { prefix = '【 '; suffix = ' 】'; }
  else if (fontId.includes('bracket2')) { prefix = '『 '; suffix = ' 』'; }
  else if (fontId.includes('bracket3')) { prefix = '« '; suffix = ' »'; }
  else if (fontId.includes('line1')) { prefix = '━ '; suffix = ' ━'; }
  else if (fontId.includes('line2')) { prefix = '〰 '; suffix = ' 〰'; }
  else if (fontId.includes('line3')) { prefix = '• '; suffix = ' •'; }
  else if (fontId.includes('wedding')) { prefix = '💍 '; suffix = ' 💍'; }
  else if (fontId.includes('diamond')) { prefix = '💎 '; suffix = ' 💎'; }
  else if (fontId.includes('kiss')) { prefix = '💋 '; suffix = ' 💋'; }
  
  // Italic Prefixes
  else if (fontId.includes('italic-star')) { prefix = '★ '; suffix = ' ★'; }
  else if (fontId.includes('italic-heart')) { prefix = '♥ '; suffix = ' ♥'; }
  else if (fontId.includes('italic-arrow')) { prefix = '➤ '; suffix = ' ◄'; }
  else if (fontId.includes('italic-bracket')) { prefix = '「 '; suffix = ' 」'; }
  else if (fontId.includes('italic-flowers')) { prefix = '❀ '; suffix = ' ❀'; }
  else if (fontId.includes('italic-sparkle')) { prefix = '✨ '; suffix = ' ✨'; }
  
  // Gothic/Graffiti Prefixes
  else if (fontId.includes('dark')) { prefix = '☠ '; suffix = ' ☠'; }
  else if (fontId.includes('sword')) { prefix = '⚔ '; suffix = ' ⚔'; }
  else if (fontId.includes('bat')) { prefix = '🦇 '; suffix = ' 🦇'; }
  else if (fontId.includes('spider')) { prefix = '🕷 '; suffix = ' 🕷'; }
  else if (fontId.includes('chain')) { prefix = '⛓ '; suffix = ' ⛓'; }
  else if (fontId.includes('cross')) { prefix = '✞ '; suffix = ' ✞'; }
  else if (fontId.includes('thunder')) { prefix = '⚡ '; suffix = ' ⚡'; }
  else if (fontId.includes('brick')) { prefix = '🧱 '; suffix = ' 🧱'; }
  else if (fontId.includes('cool')) { prefix = '😎 '; suffix = ''; }
  
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