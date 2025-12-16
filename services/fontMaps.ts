import { FontStyle } from '../types';

// Helper to generate simple shift maps or custom maps
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

// 1. Cursivas (Script)
const scriptBoldLower = '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃';
const scriptBoldUpper = '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩';
const scriptLower = '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏';
const scriptUpper = '𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵';

// 2. Goticas (Fraktur/Blackletter)
const frakturBoldLower = '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟';
const frakturBoldUpper = '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅';
const frakturLower = '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷';
const frakturUpper = '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ';

// 3. Double Struck (Graffiti/Bubble base)
const doubleStruckLower = '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫';
const doubleStruckUpper = '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ';
const doubleStruckNums = '𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡';

// 4. Sans Serif (Bonitas standard)
const sansBoldLower = '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇';
const sansBoldUpper = '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭';
const sansItalicLower = '𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻';
const sansItalicUpper = '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡';

// 5. Monospace (Typewriter)
const monoLower = '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣';
const monoUpper = '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚬𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉';

// 6. Circled (Bubble)
const circledLower = 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ';
const circledUpper = 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ';

// 7. Small Caps
const smallCaps = 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ'; // Approximation

export const FONTS: FontStyle[] = [
  {
    id: 'script-bold',
    name: 'Cursiva Negrita',
    category: 'script',
    map: { ...createMap(lower, scriptBoldLower), ...createMap(upper, scriptBoldUpper) }
  },
  {
    id: 'script-normal',
    name: 'Cursiva Elegante',
    category: 'script',
    map: { ...createMap(lower, scriptLower), ...createMap(upper, scriptUpper) }
  },
  {
    id: 'fraktur-bold',
    name: 'Gótica Negrita',
    category: 'gothic',
    map: { ...createMap(lower, frakturBoldLower), ...createMap(upper, frakturBoldUpper) }
  },
  {
    id: 'fraktur-normal',
    name: 'Gótica Clásica',
    category: 'gothic',
    map: { ...createMap(lower, frakturLower), ...createMap(upper, frakturUpper) }
  },
  {
    id: 'double-struck',
    name: 'Graffiti / Outline',
    category: 'decorative',
    map: { ...createMap(lower, doubleStruckLower), ...createMap(upper, doubleStruckUpper), ...createMap(nums, doubleStruckNums) }
  },
  {
    id: 'circled',
    name: 'Burbujas',
    category: 'decorative',
    map: { ...createMap(lower, circledLower), ...createMap(upper, circledUpper) }
  },
  {
    id: 'sans-bold',
    name: 'Negrita Sans',
    category: 'sans',
    map: { ...createMap(lower, sansBoldLower), ...createMap(upper, sansBoldUpper) }
  },
  {
    id: 'sans-italic',
    name: 'Itálica Sans',
    category: 'sans',
    map: { ...createMap(lower, sansItalicLower), ...createMap(upper, sansItalicUpper) }
  },
  {
    id: 'monospace',
    name: 'Máquina de Escribir',
    category: 'other',
    map: { ...createMap(lower, monoLower), ...createMap(upper, monoUpper) }
  },
  {
    id: 'small-caps',
    name: 'Minúsculas Capitales',
    category: 'other',
    map: { ...createMap(lower, smallCaps), ...createMap(upper, smallCaps) } // Simplified mapping
  }
];

export const convertText = (text: string, map: Record<string, string>): string => {
  return text.split('').map(char => map[char] || char).join('');
};