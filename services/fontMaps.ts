import { FontStyle, TextSegment } from '../types';

// ==========================================
// 1. BASE DEFINITIONS
// ==========================================

const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const normalMap = lower + upper + nums;

// Helper to create simple mapping dictionary
const createMap = (source: string, target: string): Record<string, string> => {
  const map: Record<string, string> = {};
  const targetChars = [...target]; // Handle surrogate pairs correctly
  for (let i = 0; i < source.length; i++) {
    if (targetChars[i]) map[source[i]] = targetChars[i];
  }
  return map;
};

// Helper to create combining diacritics maps (e.g., strikethrough, underline)
const createCombinerMap = (combiner: string): Record<string, string> => {
  const map: Record<string, string> = {};
  const allChars = lower + upper + nums;
  for (const char of allChars) {
    map[char] = char + combiner;
  }
  // Spanish specific overrides for combiners
  map['ñ'] = 'ñ' + combiner;
  map['Ñ'] = 'Ñ' + combiner;
  return map;
};

// ==========================================
// 2. UNICODE ALPHABETS DATA
// ==========================================

// --- SERIF (衬线体) ---
const serifBoldLower = '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳';
const serifBoldUpper = '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙';
const serifBoldNums = '𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗';
const serifItalicLower = '𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧';
const serifItalicUpper = '𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍';
const serifBoldItalicLower = '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛';
const serifBoldItalicUpper = '𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁';

// --- SANS (无衬线体) ---
const sansLower = 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ'; // Using Fullwidth as "Sans Normal" lookalike often
const sansUpper = 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ';
const sansNums = '０１２３４５６７８９';
const sansBoldLower = '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇';
const sansBoldUpper = '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭';
const sansBoldNums = '𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵';
const sansItalicLower = '𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻';
const sansItalicUpper = '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡';
const sansBoldItalicLower = '𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯';
const sansBoldItalicUpper = '𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕';

// --- SCRIPT (手写/连笔) ---
const scriptLower = '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏';
const scriptUpper = '𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵';
const scriptBoldLower = '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃';
const scriptBoldUpper = '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩';

// --- GOTHIC (哥特/黑体) ---
const frakturLower = '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷';
const frakturUpper = '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ';
const frakturBoldLower = '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟';
const frakturBoldUpper = '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅';

// --- DECORATIVE / ENCLOSED ---
const doubleStruckLower = '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫';
const doubleStruckUpper = '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ';
const doubleStruckNums = '𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡';
const circledLower = 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ';
const circledUpper = 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ';
const circledNums = '⓪①②③④⑤⑥⑦⑧⑨';
const circledBlackLower = 'Ⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝ'; // Mapping overlap fix handled in logic
const circledBlackUpper = '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩';
const circledBlackNums = '⓿❶❷❸❹❺❻❼❽❾';
const squaredLower = '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫'; // Fallback visual
const squaredUpper = '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉';
const squaredBlackUpper = '🅰🅱🅲🄳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉';
const parenthesizedLower = '⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵';
const parenthesizedNums = '⑴⑵⑶⑷⑸⑹⑺⑻⑼';

// --- SPECIAL / AESTHETIC ---
const monoLower = '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣';
const monoUpper = '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚬𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉';
const monoNums = '𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿';
const smallCaps = 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ'; 
const inverted = 'zʎxʍʌnʇsɹbdouɯlʞɾıɥƃɟǝpɔqɐ';
const invertedUpper = 'Z⅄XＭΛ∩⊥SᴚΌԀONW˥⋊ſIH⅁ℲƎ◖Ɔ𐐒∀';
const wideLower = 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ';
const wideUpper = 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ';

// Aesthetic Mixes (Custom Mappings)
const sorcererMap = createMap(lower, 'αвcdεғgнιנκlмиσpqяsтυνωxчz');
const cuteMap = createMap(lower, 'αb☾dℯfġhïjκlmñöpqřšŧüvŵxŷź');
const russianMap = createMap(lower, 'аъсdеfGнiјкlмиорqяsтцvшxуz');
const greekMap = createMap(lower, 'αвcdεfgнιjκlмиοpqяsтυνωxψz');
const currencyMap = createMap(lower, '₳฿₵ĐɆ₣₲ⱧłJ₭Ⱡ₥₦Ø₱QⱤ₴₮ɄV₩Ӿ¥Ⱬ');

// ==========================================
// 3. FONT CONFIGURATION
// ==========================================

// Page Groups
const P_ALL = ['home', 'cursivas', 'goticas', 'tatuajes', 'graffiti', 'amino', 'facebook', 'tattoo'];
const P_SCRIPT = ['home', 'cursivas', 'tatuajes', 'tattoo', 'facebook', 'amino'];
const P_GOTHIC = ['home', 'goticas', 'tatuajes', 'tattoo', 'amino'];
const P_DECO = ['home', 'graffiti', 'amino'];
const P_CLEAN = ['home', 'facebook', 'amino', 'tattoo'];
const P_SOCIAL = ['home', 'facebook', 'amino'];

const fontsList: FontStyle[] = [];

// Helper to push font
const addFont = (id: string, name: string, category: FontStyle['category'], map: Record<string, string>, pages: string[]) => {
  fontsList.push({ id, name, category, map, pages });
};

// --- SERIF & SANS SERIES (20+) ---
addFont('serif-bold', 'Serif Negrita', 'serif', { ...createMap(lower, serifBoldLower), ...createMap(upper, serifBoldUpper), ...createMap(nums, serifBoldNums) }, P_CLEAN);
addFont('serif-italic', 'Serif Itálica', 'serif', { ...createMap(lower, serifItalicLower), ...createMap(upper, serifItalicUpper) }, P_CLEAN);
addFont('serif-bold-italic', 'Serif Negrita Itálica', 'serif', { ...createMap(lower, serifBoldItalicLower), ...createMap(upper, serifBoldItalicUpper) }, P_CLEAN);

addFont('sans-bold', 'Sans Negrita', 'sans', { ...createMap(lower, sansBoldLower), ...createMap(upper, sansBoldUpper), ...createMap(nums, sansBoldNums) }, P_CLEAN);
addFont('sans-italic', 'Sans Itálica', 'sans', { ...createMap(lower, sansItalicLower), ...createMap(upper, sansItalicUpper) }, P_CLEAN);
addFont('sans-bold-italic', 'Sans Negrita Itálica', 'sans', { ...createMap(lower, sansBoldItalicLower), ...createMap(upper, sansBoldItalicUpper) }, P_CLEAN);
addFont('wide-text', 'Vaporwave / Espaciado', 'other', { ...createMap(lower, wideLower), ...createMap(upper, wideUpper) }, P_DECO);

// --- SCRIPT SERIES (10+) ---
addFont('script-bold', 'Cursiva Negrita', 'script', { ...createMap(lower, scriptBoldLower), ...createMap(upper, scriptBoldUpper) }, P_SCRIPT);
addFont('script-normal', 'Cursiva Elegante', 'script', { ...createMap(lower, scriptLower), ...createMap(upper, scriptUpper) }, P_SCRIPT);
// Pseudo-script / Aesthetic Cursive
addFont('sorcerer', 'Hechicero', 'script', { ...sorcererMap, ...createMap(upper, 'ΑВСDΕFGHIJΚLΜΝΟΡQЯSΤυνWΧΥΖ') }, P_SCRIPT);
addFont('cute-script', 'Kawaii Script', 'script', { ...cuteMap }, P_SCRIPT);
addFont('flourish', 'Florituras', 'script', { ...createMap(lower, 'ąҍçժҽƒցհìʝҟӀʍղօքզɾʂէմѵա×վՀ') }, P_SCRIPT);

// --- GOTHIC SERIES (10+) ---
addFont('fraktur-bold', 'Gótica Negrita', 'gothic', { ...createMap(lower, frakturBoldLower), ...createMap(upper, frakturBoldUpper) }, P_GOTHIC);
addFont('fraktur-normal', 'Gótica Clásica', 'gothic', { ...createMap(lower, frakturLower), ...createMap(upper, frakturUpper) }, P_GOTHIC);
addFont('medieval', 'Medieval Mix', 'gothic', { ...createMap(lower, '𝖆𝖇𝔠𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟') }, P_GOTHIC);
addFont('dark-lord', 'Señor Oscuro', 'gothic', { ...createMap(lower, 'Թb☾ժeƒghïjklmñðpqɾs†uvwxyz') }, P_GOTHIC);

// --- DECORATIVE / GRAFFITI (15+) ---
addFont('double-struck', 'Graffiti Outline', 'decorative', { ...createMap(lower, doubleStruckLower), ...createMap(upper, doubleStruckUpper), ...createMap(nums, doubleStruckNums) }, P_DECO);
addFont('circled', 'Burbujas Blancas', 'decorative', { ...createMap(lower, circledLower), ...createMap(upper, circledUpper), ...createMap(nums, circledNums) }, P_DECO);
addFont('circled-black', 'Burbujas Negras', 'decorative', { ...createMap(lower, circledBlackLower), ...createMap(upper, circledBlackUpper), ...createMap(nums, circledBlackNums) }, P_DECO);
addFont('squared', 'Cuadrados Blancos', 'decorative', { ...createMap(upper, squaredUpper) }, P_DECO);
addFont('squared-black', 'Cuadrados Negros', 'decorative', { ...createMap(upper, squaredBlackUpper) }, P_DECO);
addFont('parenthesized', 'Paréntesis', 'decorative', { ...createMap(lower, parenthesizedLower), ...createMap(nums, parenthesizedNums) }, P_DECO);
addFont('love-deco', 'Love Letter', 'decorative', { ...createMap(lower, 'a♥b♥c♥d♥e♥f♥g♥h♥i♥j♥k♥l♥m♥n♥o♥p♥q♥r♥s♥t♥u♥v♥w♥x♥y♥z♥') }, P_DECO);
addFont('star-deco', 'Star Letter', 'decorative', { ...createMap(lower, 'a★b★c★d★e★f★g★h★i★j★k★l★m★n★o★p★q★r★s★t★u★v★w★x★y★z★') }, P_DECO);

// --- DIACRITIC EFFECTS (COMBINERS) (15+) ---
// These add symbols above, below, or through the text
addFont('strike-short', 'Tachado Corto', 'other', createCombinerMap('\u0335'), P_SOCIAL);
addFont('strike-long', 'Tachado Largo', 'other', createCombinerMap('\u0336'), P_SOCIAL);
addFont('underline', 'Subrayado', 'other', createCombinerMap('\u0332'), P_SOCIAL);
addFont('double-underline', 'Subrayado Doble', 'other', createCombinerMap('\u0333'), P_SOCIAL);
addFont('underline-wave', 'Olas', 'other', createCombinerMap('\u0330'), P_SOCIAL);
addFont('slash-through', 'Barra Inclinada', 'other', createCombinerMap('\u0338'), P_SOCIAL);
addFont('cross-above', 'Cruz Arriba', 'gothic', createCombinerMap('\u033d'), P_GOTHIC);
addFont('bridge-above', 'Puente', 'other', createCombinerMap('\u0346'), P_DECO);
addFont('seagull-above', 'Gaviota', 'other', createCombinerMap('\u033c'), P_DECO);
addFont('tilde-middle', 'Tilde Media', 'other', createCombinerMap('\u0334'), P_SOCIAL);
addFont('arrow-below', 'Flecha Abajo', 'other', createCombinerMap('\u034e'), P_DECO);
addFont('asterisk-below', 'Asterisco Abajo', 'other', createCombinerMap('\u0359'), P_DECO);
addFont('dot-above', 'Punteado', 'other', createCombinerMap('\u0307'), P_SOCIAL);
addFont('halo', 'Halo / Ángel', 'other', createCombinerMap('\u030a'), P_SOCIAL);
addFont('cloudy', 'Nubes', 'other', createCombinerMap('\u0489'), P_DECO);

// --- AESTHETIC / MIXED (20+) ---
addFont('monospace', 'Máquina de Escribir', 'other', { ...createMap(lower, monoLower), ...createMap(upper, monoUpper), ...createMap(nums, monoNums) }, P_CLEAN);
addFont('small-caps', 'Minúsculas Capitales', 'other', { ...createMap(lower, smallCaps), ...createMap(upper, smallCaps) }, P_CLEAN);
addFont('inverted', 'Invertido (Flip)', 'other', { ...createMap(lower, inverted), ...createMap(upper, invertedUpper) }, P_DECO);
addFont('currency', 'Dinero / Currency', 'decorative', currencyMap, P_DECO);
addFont('greek-mix', 'Griego Mix', 'other', greekMap, P_SOCIAL);
addFont('russian-mix', 'Ruso Mix', 'other', russianMap, P_SOCIAL);
addFont('asian-style', 'Estilo Asiático', 'decorative', createMap(lower, 'ﾑbᄃdΣfgΉijΚlmПӨpqЯƧƬЦvwxyz'), P_DECO);
addFont('runic', 'Rúnico', 'gothic', createMap(lower, 'ᚣᛒᚳᛚᛄᚪᚷᚻᛁᛡᛕᛚᛗᚿᛟᛈᛩᚱᛋᛏᚢᚡᚹᛪᚤᛎ'), P_GOTHIC);
addFont('wavy-text', 'Ondulado', 'other', createMap(lower, 'ค๒ς๔єŦﻮђเןкl๓ภ๏קợгรՇยڤฬץչ'), P_SOCIAL);
addFont('comic', 'Comic', 'other', createMap(lower, 'αbCdEfGhIjKlMnOpQrStUvWxYz'), P_SOCIAL);
addFont('bracket-tail', 'Cola de Pez', 'decorative', createMap(lower, 'ąҍçժҽƒցհìʝҟӀʍղօքզɾʂէմѵա×վՀ'), P_DECO);
addFont('thin-brackets', 'Corchetes Finos', 'decorative', createMap(lower, '【a】【b】【c】【d】【e】【f】【g】【h】【i】【j】【k】【l】【m】【n】【o】【p】【q】【r】【s】【t】【u】【v】【w】【x】【y】【z】'), P_DECO);
addFont('squares-brackets', 'Cajas', 'decorative', createMap(lower, '[[a]] [[b]] [[c]] [[d]] [[e]] [[f]] [[g]] [[h]] [[i]] [[j]] [[k]] [[l]] [[m]] [[n]] [[o]] [[p]] [[q]] [[r]] [[s]] [[t]] [[u]] [[v]] [[w]] [[x]] [[y]] [[z]]'), P_DECO);

// --- SPANISH & SYMBOLS (Additional) ---
// Adding specific fonts that treat accent marks creatively
const glitchMap = createMap(lower, 'a̶b̶c̶d̶e̶f̶g̶h̶i̶j̶k̶l̶m̶n̶o̶p̶q̶r̶s̶t̶u̶v̶w̶x̶y̶z̶');
addFont('glitch-light', 'Glitch Suave', 'other', glitchMap, P_DECO);

const happyMap = createMap(lower, 'a̾b̾c̾d̾e̾f̾g̾h̾i̾j̾k̾l̾m̾n̾o̾p̾q̾r̾s̾t̾u̾v̾w̾x̾y̾z̾');
addFont('happy-vibes', 'Happy Vibes', 'other', happyMap, P_SOCIAL);

const skyMap = createMap(lower, 'a͛b͛c͛d͛e͛f͛g͛h͛i͛j͛k͛l͛m͛n͛o͛p͛q͛r͛s͛t͛u͛v͛w͛x͛y͛z͛');
addFont('sky-high', 'Sky High', 'other', skyMap, P_SOCIAL);

const stinkMap = createMap(lower, 'a҈b҈c҈d҈e҈f҈g҈h҈i҈j҈k҈l҈m҈n҈o҈p҈q҈r҈s҈t҈u҈v҈w҈x҈y҈z҈');
addFont('sparkle-dust', 'Polvo de Estrellas', 'decorative', stinkMap, P_DECO);

const boxMap = createMap(lower, 'a⃣b⃣c⃣d⃣e⃣f⃣g⃣h⃣i⃣j⃣k⃣l⃣m⃣n⃣o⃣p⃣q⃣r⃣s⃣t⃣u⃣v⃣w⃣x⃣y⃣z⃣');
addFont('keycap', 'Teclado', 'decorative', boxMap, P_DECO);

const blueMap = createMap(lower, '🇦 🇧 🇨 🇩 🇪 🇫 🇬 🇭 🇮 🇯 🇰 🇱 🇲 🇳 🇴 🇵 🇶 🇷 🇸 🇹 🇺 🇻 🇼 🇽 🇾 🇿');
addFont('flags', 'Banderas (Azul)', 'decorative', blueMap, P_DECO);


// Export the consolidated list
export const FONTS: FontStyle[] = fontsList;

// ==========================================
// 4. UTILITY FUNCTIONS
// ==========================================

const SPANISH_REGEX = /[áéíóúñÑ¿¡]/;

/**
 * Enhanced conversion for clipboard copy.
 */
export const convertText = (text: string, map: Record<string, string>): string => {
  // Normalize potentially composed chars (like e + acute) to single char if possible
  const normalized = text.normalize('NFC');
  return [...normalized].map(char => map[char] || char).join('');
};

/**
 * Enhanced conversion for Display (UI).
 * Implements "Strategy B" to allow CSS styling of unmapped Spanish characters.
 */
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

  // We iterate using spread to handle surrogate pairs (emojis, rare symbols) correctly
  for (const char of [...normalized]) {
    const mapped = map[char];
    
    if (mapped) {
      if (currentIsFallback) pushSegment();
      currentIsFallback = false;
      currentContent += mapped;
    } else {
      // Check if it's a Spanish special char or other char that needs fallback
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
