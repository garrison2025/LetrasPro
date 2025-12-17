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
  const allChars = lower + upper + nums + 'áéíóúñÑ';
  for (const char of allChars) {
    const base = map[char] || char;
    map[char] = base + combiner;
  }
  return map;
};

// --- Mapeos Unicode ---
const sLower = '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏';
const sUpper = '𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵';
const sbLower = '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃';
const sbUpper = '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩';
const fLower = '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷';
const fUpper = '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ';
const fbLower = '𝖆𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟';
const fbUpper = '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅';
const itLower = '𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧';
const itUpper = '𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀ＮＯＰＱＲＳＴＵＶＷＸＹＺ';
const itbLower = '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛';
const itbUpper = '𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁';
const dsLower = '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫';
const dsUpper = '𝔸𝔹ℂmathbb{D}mathbb{E}mathbb{F}mathbb{G}mathbb{H}mathbb{I}mathbb{J}mathbb{K}mathbb{L}mathbb{M}mathbb{N}mathbb{O}mathbb{P}mathbb{Q}mathbb{R}mathbb{S}mathbb{T}mathbb{U}mathbb{V}mathbb{W}mathbb{X}mathbb{Y}mathbb{Z';
const monoLower = '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣';
const monoUpper = '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉';

// ==========================================
// 2. REGISTRO DE FUENTES (100+ ESTILOS)
// ==========================================

const fontsList: FontStyle[] = [];

const add = (id: string, name: string, category: FontStyle['category'], map: Record<string, string>, pages: string[]) => {
  fontsList.push({ id, name, category, map, pages });
};

// --- CORE CURSIVAS (SCRIPT) ---
add('sc-1', 'Cursiva Fina', 'script', createMap(lower + upper, sLower + sUpper), ['home', 'cursivas']);
add('sc-2', 'Cursiva Caligráfica', 'script', createMap(lower + upper, sbLower + sbUpper), ['home', 'cursivas']);
add('sc-3', 'Letra de Diario', 'script', createMap(lower, 'αвc∂єfghíjkℓmиσpqяѕтυνωxyz'), ['cursivas']);
add('sc-4', 'Manuscrita Elegante', 'script', createMap(lower, 'ąҍçժҽƒցհìʝҟӀʍղօքզɾʂէմѵա×վՀ'), ['cursivas']);
add('sc-5', 'Script Estético', 'script', createMap(lower, 'ค๒ς๔єŦﻮђเןкl๓ภ๏קợгรՇยڤฬץչ'), ['cursivas']);
add('sc-6', 'Caligrafía Pro', 'script', createMap(lower, 'αb☾dℯfġhïjκlmñöpqřšŧüvŵxŷź'), ['cursivas']);
add('sc-7', 'Cursiva Vintage', 'script', createMap(lower, 'αβςδεfghίjκλmπøρqrstυνωxyz'), ['cursivas']);
add('sc-8', 'Script Minimalista', 'script', createMap(lower, '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏'), ['cursivas']);
add('sc-9', 'Manuscrita Cursiva', 'script', createMap(lower, '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃'), ['cursivas']);

// --- CORE ITÁLICAS ---
add('it-1', 'Itálica Serif', 'serif', createMap(lower + upper, itLower + itUpper), ['home', 'cursivas']);
add('it-2', 'Itálica Negrita', 'serif', createMap(lower + upper, itbLower + itbUpper), ['home', 'cursivas']);
add('it-3', 'Itálica Moderna', 'sans', createMap(lower, '𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹ｙ𝘻'), ['cursivas']);
add('it-4', 'Itálica Sans Bold', 'sans', createMap(lower, '𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯'), ['cursivas']);

// --- CORE GÓTICAS (TATUAJES) ---
add('gt-1', 'Gótica Antigua', 'gothic', createMap(lower + upper, fLower + fUpper), ['home', 'goticas', 'tatuajes']);
add('gt-2', 'Gótica Real', 'gothic', createMap(lower + upper, fbLower + fbUpper), ['home', 'goticas', 'tatuajes']);
add('gt-3', 'Old English Pro', 'gothic', createMap(lower, '𝖆𝖇𝔠𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟'), ['goticas', 'tatuajes']);
add('gt-4', 'Medieval Oscura', 'gothic', createMap(lower, '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷'), ['goticas']);

// --- GENERADOR DE VARIANTES (MULTIPLICADOR PARA LLEGAR A 100+) ---
const baseMaps = [
  { id: 'script', name: 'Cursiva', map: createMap(lower + upper, sLower + sUpper) },
  { id: 'boldscript', name: 'Manuscrita', map: createMap(lower + upper, sbLower + sbUpper) },
  { id: 'italic', name: 'Itálica', map: createMap(lower + upper, itLower + itUpper) },
  { id: 'bolditalic', name: 'Negrita Itálica', map: createMap(lower + upper, itbLower + itbUpper) },
  { id: 'hollow', name: 'Letra Hueca', map: createMap(lower + upper, dsLower + dsUpper) },
  { id: 'mono', name: 'Máquina', map: createMap(lower + upper, monoLower + monoUpper) },
  { id: 'normal', name: 'Estilo', map: {} }
];

const decorators = [
  { id: 'tach', name: 'Tachada', char: '\u0336' },
  { id: 'sub', name: 'Subrayada', char: '\u0332' },
  { id: 'onda', name: 'Ondulada', char: '\u0330' },
  { id: 'brillo', name: 'con Brillo', char: '\u035b' },
  { id: 'nube', name: 'Aesthetic Nube', char: '\u0489' },
  { id: 'halo', name: 'con Halo', char: '\u030a' },
  { id: 'puntos', name: 'con Puntos', char: '\u0307' },
  { id: 'slash', name: 'Cruzada', char: '\u0338' },
  { id: 'bridge', name: 'con Puente', char: '\u0346' },
  { id: 'star', name: 'con Estrella', char: '\u0359' },
];

// Generar 70 variantes únicas (7 bases * 10 decoradores)
baseStyles: for (const base of baseMaps) {
  for (const deco of decorators) {
    const cat = base.id.includes('script') ? 'script' : 'other';
    add(
      `${base.id}-${deco.id}`, 
      `${base.name} ${deco.name}`, 
      cat, 
      createCombinerMap(deco.char, base.map), 
      ['home', 'cursivas']
    );
  }
}

// --- DECORATIVAS EXTRAS ---
add('dec-1', 'Burbujas Blancas', 'decorative', createMap(lower, 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ'), ['home', 'graffiti']);
add('dec-2', 'Burbujas Negras', 'decorative', createMap(upper, '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩'), ['home', 'graffiti']);
add('dec-3', 'Cuadrados', 'decorative', createMap(upper, '🄰🄱正🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉'), ['home', 'graffiti']);
add('dec-4', 'Moneda ($)', 'decorative', createMap(lower, '₳฿₵ĐɆ₣₲ⱧłJ₭Ⱡ₥₦Ø₱QⱤ₴₮ɄV₩Ӿ¥Ⱬ'), ['home']);
add('dec-5', 'Runas Mágicas', 'other', createMap(lower, 'ᚣᛒᚳᛚᛄᚪᚷᚻᛁᛡᛕᛚᛗᚿᛟᛈᛩᚱᛋᛏᚢᚡᚹᛪᚤᛎ'), ['home', 'amino']);
add('dec-6', 'Small Caps Pro', 'other', createMap(lower + upper, 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ'), ['home', 'facebook']);
add('dec-7', 'Letra Diminuta', 'other', createMap(lower, 'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻ'), ['home', 'facebook']);

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
