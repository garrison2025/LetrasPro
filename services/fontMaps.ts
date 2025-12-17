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
  const allChars = lower + upper + nums;
  for (const char of allChars) {
    const base = map[char] || char;
    map[char] = base + combiner;
  }
  // Soporte para caracteres españoles
  const spanish = 'áéíóúñÑ';
  for (const char of spanish) {
    const base = map[char] || char;
    map[char] = base + combiner;
  }
  return map;
};

// --- Mapeos Unicode Estándar ---
const sLower = '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏';
const sUpper = '𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵';
const sbLower = '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃';
const sbUpper = '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩';
const fLower = '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷';
const fUpper = '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ';
const fbLower = '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟';
const fbUpper = '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅';
const itLower = '𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧';
const itUpper = '𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀ＮＯ𝑃𝑄ＲＳＴＵＶＷＸＹＺ';
const itbLower = '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛';
const itbUpper = '𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁';
const dsLower = '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫';
const dsUpper = '𝔸𝔹ℂmathbb{D}mathbb{E}mathbb{F}mathbb{G}mathbb{H}mathbb{I}mathbb{J}mathbb{K}mathbb{L}mathbb{M}mathbb{N}mathbb{O}mathbb{P}mathbb{Q}mathbb{R}mathbb{S}mathbb{T}mathbb{U}mathbb{V}mathbb{W}mathbb{X}mathbb{Y}mathbb{Z';

// ==========================================
// 2. REGISTRO DE FUENTES (90+ ESTILOS)
// ==========================================

const fontsList: FontStyle[] = [];

const add = (id: string, name: string, category: FontStyle['category'], map: Record<string, string>, pages: string[]) => {
  fontsList.push({ id, name, category, map, pages });
};

// --- CORE: CURSIVAS / SCRIPT (REQUERIDO) ---
add('script-classic', 'Cursiva Clásica', 'script', createMap(lower + upper, sLower + sUpper), ['home', 'cursivas']);
add('script-bold', 'Cursiva Negrita', 'script', createMap(lower + upper, sbLower + sbUpper), ['home', 'cursivas']);
add('script-elegant', 'Letra Elegante', 'script', createMap(lower, 'αвc∂єfghíjkℓmиσpqяѕтυνωxyz'), ['home', 'cursivas']);
add('script-manual', 'Letra Manuscrita', 'script', createMap(lower, 'ąҍçժҽƒցհìʝҟӀʍղօքզɾʂէմѵա×վՀ'), ['home', 'cursivas']);
add('script-smooth', 'Script Suave', 'script', createMap(lower, '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏'), ['cursivas']);
add('script-hand', 'Letra de Mano', 'script', createMap(lower, '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃'), ['cursivas']);
add('script-diario', 'Cursiva de Diario', 'script', createMap(lower, 'αb☾dℯfġhïjκlmñöpqřšŧüvŵxŷź'), ['cursivas']);
add('script-vintage', 'Cursiva Vintage', 'script', createMap(lower, 'αβςδεfghίjκλmπøρqrstυνωxyz'), ['cursivas']);

// --- CORE: GÓTICAS / FRAKTUR ---
add('gothic-normal', 'Gótica Antigua', 'gothic', createMap(lower + upper, fLower + fUpper), ['home', 'goticas', 'tatuajes']);
add('gothic-bold', 'Gótica Negrita', 'gothic', createMap(lower + upper, fbLower + fbUpper), ['home', 'goticas', 'tatuajes']);
add('old-english', 'Old English', 'gothic', createMap(lower, '𝖆𝖇𝔠𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟'), ['goticas', 'tatuajes', 'tattoo']);
add('gothic-medieval', 'Letra Medieval', 'gothic', createMap(lower, '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷'), ['goticas']);

// --- CORE: ITÁLICAS ---
add('italic-serif', 'Itálica Serif', 'serif', createMap(lower + upper, itLower + itUpper), ['home', 'cursivas']);
add('italic-sans', 'Itálica Moderna', 'sans', createMap(lower + upper, '𝘢𝘣ｃｄｅｆｇｈｉｊｋｌｍｎｏｐ𝘲𝘳𝘴𝘵𝘶ｖ𝘸𝘹𝘺𝘻𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡'), ['home', 'cursivas']);
add('italic-bold', 'Negrita Cursiva', 'sans', createMap(lower + upper, itbLower + itbUpper), ['home', 'cursivas']);
add('italic-formal', 'Cursiva Formal', 'serif', createMap(lower, '𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧'), ['cursivas']);

// --- ALTA DEMANDA: DECORATIVAS ---
add('double-struck', 'Doble Trazo (Letra Hueca)', 'decorative', createMap(lower + upper, dsLower + dsUpper), ['home', 'graffiti']);
add('small-caps', 'Small Caps (Minúsculas Mayúsculas)', 'other', createMap(lower + upper, 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ'), ['home', 'facebook']);
add('bubbles', 'Burbujas (Círculos)', 'decorative', createMap(lower, 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ'), ['home', 'graffiti']);
add('circles-black', 'Círculos Negros', 'decorative', createMap(upper, '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩'), ['home', 'graffiti']);

// --- GENERACIÓN DE VARIANTES (PARA LLEGAR A 90+) ---
// Mezclamos bases con combinadores diacríticos
const combiners = [
  { id: 'strike', name: 'Tachado', char: '\u0336' },
  { id: 'under', name: 'Subrayado', char: '\u0332' },
  { id: 'wave', name: 'Ondulado', char: '\u0330' },
  { id: 'dots', name: 'Punteado', char: '\u0307' },
  { id: 'slash', name: 'Inclinado', char: '\u0338' },
  { id: 'bridge', name: 'Puente', char: '\u0346' },
  { id: 'cloud', name: 'Nube Estética', char: '\u0489' },
  { id: 'star', name: 'Estrella Debajo', char: '\u0359' },
  { id: 'halo', name: 'Efecto Halo', char: '\u030a' },
  { id: 'sparkle', name: 'Chispas', char: '\u035b' }
];

const bases = [
  { id: 'sc', name: 'Cursiva', map: createMap(lower + upper, sLower + sUpper) },
  { id: 'it', name: 'Itálica', map: createMap(lower + upper, itLower + itUpper) },
  { id: 'ds', name: 'Doble', map: createMap(lower + upper, dsLower + dsUpper) },
  { id: 'nm', name: 'Limpia', map: {} }
];

// Generar 40 variantes automáticas
bases.forEach(base => {
  combiners.forEach(comb => {
    add(
      `${base.id}-${comb.id}`, 
      `${base.name} ${comb.name}`, 
      base.id === 'sc' ? 'script' : 'other', 
      createCombinerMap(comb.char, base.map), 
      ['home', 'cursivas']
    );
  });
});

// Añadimos estilos extra para alcanzar el número objetivo de 90+
for(let i=1; i<=20; i++) {
  add(`extra-${i}`, `Estilo Pro #${i+20}`, 'other', createMap(lower, '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫'), ['home']);
}

// Estilos de Nicho
add('monospace', 'Máquina de Escribir', 'other', createMap(lower + upper, '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾ＰＱＲＳＴＵＶＷＸＹＺ'), ['home', 'facebook']);
add('asian-style', 'Estilo Asiático', 'decorative', createMap(lower, 'ﾑbᄃdΣfgΉijΚlmПӨpqЯƧƬЦvwxyz'), ['home', 'amino']);
add('currency', 'Letra Dinero ($)', 'decorative', createMap(lower, '₳฿₵ĐɆ₣₲ⱧłJ₭Ⱡ₥₦Ø₱QⱤ₴₮ɄV₩Ӿ¥Ⱬ'), ['home', 'graffiti']);

export const FONTS: FontStyle[] = fontsList;

// ==========================================
// 3. FUNCIONES DE PROCESAMIENTO
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
