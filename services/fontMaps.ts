import { FontStyle, TextSegment } from '../types';

// Helper to generate maps
const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const createMap = (source: string, target: string): Record<string, string> => {
  const map: Record<string, string> = {};
  for (let i = 0; i < source.length; i++) {
    if (target[i]) map[source[i]] = target[i];
  }
  return map;
};

// --- Definitions of Unicode Alphabets ---

// 1. Script (Cursivas)
const scriptBoldLower = '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃';
const scriptBoldUpper = '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩';
const scriptLower = '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏';
const scriptUpper = '𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵';

// 2. Gothic (Fraktur/Blackletter)
const frakturBoldLower = '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟';
const frakturBoldUpper = '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅';
const frakturLower = '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷';
const frakturUpper = '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ';

// 3. Graffiti / Decorative
const doubleStruckLower = '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫';
const doubleStruckUpper = '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ';
const doubleStruckNums = '𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡';
const circledLower = 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ';
const circledUpper = 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ';
const circledBlackLower = 'Ⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝ'; 
const squaredLower = 'aɓcɗeƒɠɦiʝƙlɱɳoρqɾstuvwxyz'; 

// 4. Sans / Serif variations
const sansBoldLower = '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇';
const sansBoldUpper = '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭';
const sansItalicLower = '𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻';
const sansItalicUpper = '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡';
const serifBoldLower = '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳';
const serifBoldUpper = '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙';

// 5. Special / Other
const monoLower = '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣';
const monoUpper = '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚬𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉';
const smallCaps = 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ'; 
const inverted = 'zʎxʍʌnʇsɹbdouɯlʞɾıɥƃɟǝpɔqɐ';
const wideTextLower = 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ';
const wideTextUpper = 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ';

// Page IDs for strict filtering
const ALL_PAGES = ['home', 'cursivas', 'goticas', 'tatuajes', 'graffiti', 'amino', 'facebook', 'tattoo'];
const SCRIPT_PAGES = ['home', 'cursivas', 'tatuajes', 'tattoo', 'facebook', 'amino'];
const GOTHIC_PAGES = ['home', 'goticas', 'tatuajes', 'tattoo', 'amino'];
const DECO_PAGES = ['home', 'graffiti', 'amino'];
const CLEAN_PAGES = ['home', 'facebook', 'amino', 'tattoo'];

export const FONTS: FontStyle[] = [
  {
    id: 'script-bold',
    name: 'Cursiva Negrita',
    category: 'script',
    map: { ...createMap(lower, scriptBoldLower), ...createMap(upper, scriptBoldUpper) },
    pages: SCRIPT_PAGES
  },
  {
    id: 'script-normal',
    name: 'Cursiva Elegante',
    category: 'script',
    map: { ...createMap(lower, scriptLower), ...createMap(upper, scriptUpper) },
    pages: SCRIPT_PAGES
  },
  {
    id: 'fraktur-bold',
    name: 'Gótica Negrita',
    category: 'gothic',
    map: { ...createMap(lower, frakturBoldLower), ...createMap(upper, frakturBoldUpper) },
    pages: GOTHIC_PAGES
  },
  {
    id: 'fraktur-normal',
    name: 'Gótica Clásica',
    category: 'gothic',
    map: { ...createMap(lower, frakturLower), ...createMap(upper, frakturUpper) },
    pages: GOTHIC_PAGES
  },
  {
    id: 'double-struck',
    name: 'Graffiti / Outline',
    category: 'decorative',
    map: { ...createMap(lower, doubleStruckLower), ...createMap(upper, doubleStruckUpper), ...createMap(nums, doubleStruckNums) },
    pages: DECO_PAGES
  },
  {
    id: 'circled',
    name: 'Burbujas',
    category: 'decorative',
    map: { ...createMap(lower, circledLower), ...createMap(upper, circledUpper) },
    pages: ['home', 'graffiti', 'amino', 'facebook']
  },
  {
    id: 'sans-bold',
    name: 'Negrita Sans',
    category: 'sans',
    map: { ...createMap(lower, sansBoldLower), ...createMap(upper, sansBoldUpper) },
    pages: CLEAN_PAGES
  },
  {
    id: 'sans-italic',
    name: 'Itálica Sans',
    category: 'sans',
    map: { ...createMap(lower, sansItalicLower), ...createMap(upper, sansItalicUpper) },
    pages: CLEAN_PAGES
  },
  {
    id: 'serif-bold',
    name: 'Negrita Serif',
    category: 'serif',
    map: { ...createMap(lower, serifBoldLower), ...createMap(upper, serifBoldUpper) },
    pages: ['home', 'facebook', 'amino', 'tatuajes', 'tattoo']
  },
  {
    id: 'monospace',
    name: 'Máquina de Escribir',
    category: 'other',
    map: { ...createMap(lower, monoLower), ...createMap(upper, monoUpper) },
    pages: ['home', 'amino', 'facebook', 'graffiti']
  },
  {
    id: 'small-caps',
    name: 'Minúsculas Capitales',
    category: 'other',
    map: { ...createMap(lower, smallCaps), ...createMap(upper, smallCaps) },
    pages: ['home', 'amino', 'facebook', 'tatuajes', 'tattoo']
  },
  {
    id: 'wide-text',
    name: 'Espaciado (Vaporwave)',
    category: 'other',
    map: { ...createMap(lower, wideTextLower), ...createMap(upper, wideTextUpper) },
    pages: ['home', 'amino', 'graffiti']
  },
  {
    id: 'inverted',
    name: 'Invertido',
    category: 'other',
    map: { ...createMap(lower, inverted), ...createMap(upper, inverted) },
    pages: ['home', 'graffiti']
  },
  {
    id: 'special-mix',
    name: 'Graffiti Mix',
    category: 'decorative',
    map: { ...createMap(lower, squaredLower) },
    pages: ['home', 'graffiti']
  }
];

// Spanish special characters that need fallback handling if not mapped
const SPANISH_REGEX = /[áéíóúñÑ¿¡]/;

/**
 * Standard conversion for clipboard copy.
 * Tries to map. If map not found, returns original char.
 */
export const convertText = (text: string, map: Record<string, string>): string => {
  return text.split('').map(char => map[char] || char).join('');
};

/**
 * Enhanced conversion for Display (UI).
 * Returns segments separating mapped characters from fallback characters.
 * Implements "Strategy B" to allow CSS styling of unmapped Spanish characters.
 */
export const getDisplaySegments = (text: string, map: Record<string, string>): TextSegment[] => {
  const segments: TextSegment[] = [];
  
  // Optimization: join consecutive types to reduce DOM nodes
  let currentContent = '';
  let currentIsFallback = false;

  const pushSegment = () => {
    if (currentContent) {
      segments.push({ content: currentContent, isFallback: currentIsFallback });
      currentContent = '';
    }
  };

  for (const char of text) {
    const mapped = map[char];
    
    if (mapped) {
      // It is a mapped fancy char
      if (currentIsFallback) pushSegment();
      currentIsFallback = false;
      currentContent += mapped;
    } else {
      // It is NOT mapped
      // Check if it's a Spanish special char or other char that needs fallback
      // Regular spaces and punctuation usually don't need fallback class unless essential
      const isSpecial = SPANISH_REGEX.test(char);
      
      if (isSpecial) {
         if (!currentIsFallback && currentContent) pushSegment();
         currentIsFallback = true;
         currentContent += char;
      } else {
         // Regular unmapped char (numbers, punctuation, spaces) - treat as standard text
         if (currentIsFallback) pushSegment();
         currentIsFallback = false;
         currentContent += char;
      }
    }
  }
  
  pushSegment();
  return segments;
};