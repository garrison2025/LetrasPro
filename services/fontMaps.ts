import { FontStyle, TextSegment } from '../types';

const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const MAPS = {
  sansBold: '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵ｉｊ𝒌𝗹𝗺ｎ𝗼𝗽𝗾𝗿𝘀𝘁ｕｖｗｘｙｚＡ𝗕ＣＤＥＦＧＨＩＪＫＬＭＮＯＰ𝗤𝗥𝗦ＴＵＶＷ𝗫𝗬𝗭',
  sansItalic: '𝘢𝘣ｃ𝘥𝑒𝘧𝘨𝘩ɪ𝘫𝑘𝘭𝘮𝘯𝘰𝘱𝗊𝘳𝘴𝘵ｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  serifBold: '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝐀𝐁ＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  serifItalic: '𝑎𝑏𝑐ｄ𝑒ｆｇｈ𝑖𝑗𝑘ｌｍｎｏｐ𝑞ｒｓｔ𝑢𝑣ｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  scriptFine: '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏𝒜𝐵𝒞𝒟ＥＦＧＨＩＪＫＬＭＮＯＰＱＲ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵',
  scriptBold: '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩',
  fraktur: '𝔞𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ',
  frakturBold: '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅',
  monospace: '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱ＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  doubleStruck: '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙＱＲＳＴ𝕌𝕍𝕎𝕏𝕐ℤ',
  smallCaps: 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠｗｘｙｚ',
  tiny: 'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾᑫᴿˢᵀᵁⱽᵂˣʸᶻ',
  bubble: 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ',
  fullWidth: 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  specialSoft: 'αɓ૮∂εƒɠɦเʝҡℓɱɳσρҩ૨รƭµѵωϰყƶ',
  specialUrban: 'ąҍçժҽƒցհìʝҟӀʍղօքզɾʂէմѵա×վՀ',
  greek: 'αвсδεfghιjκlмηορqrsτυvωxyzΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'
};

const ACCENT_MAP: Record<string, string> = {
  'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
  'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
  'ñ': 'n', 'Ñ': 'N'
};

const COMBINERS = {
  tilde: '\u0303',
  acute: '\u0301'
};

const createMap = (source: string, target: string): Record<string, string> => {
  const map: Record<string, string> = {};
  const sChars = [...source];
  const tChars = [...target];
  sChars.forEach((c, i) => { if (tChars[i]) map[c] = tChars[i]; });
  return map;
};

const getCompForBase = (key: string): FontStyle['compatibility'] => {
  if (['sansBold', 'serifBold', 'sansItalic', 'serifItalic', 'monospace', 'fullWidth'].includes(key)) return 'high';
  if (['bubble', 'tiny'].includes(key)) return 'low';
  return 'medium';
};

const homeBases = Object.entries(MAPS).map(([key, val]) => ({
  id: key,
  name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
  cat: key.includes('script') || key.includes('special') ? 'script' : (key.includes('fraktur') ? 'gothic' : 'serif'),
  chars: val,
  comp: getCompForBase(key)
}));

export const FONTS: FontStyle[] = homeBases.map(b => ({
  id: `hm-${b.id}`,
  name: b.name,
  category: b.cat as any,
  map: createMap(lower + upper, b.chars),
  pages: ['home'],
  compatibility: b.comp,
  tags: b.cat === 'script' ? ['Elegante', 'Cute'] : (b.cat === 'gothic' ? ['Gaming', 'Dark'] : ['Classic'])
}));

// Nuevas fuentes específicas
FONTS.push({
  id: 'vaporwave-pro',
  name: 'Vaporwave Wide',
  category: 'vaporwave',
  map: createMap(lower + upper, MAPS.fullWidth),
  pages: ['home'],
  compatibility: 'high',
  tags: ['Aesthetic', 'Urbano']
});

FONTS.push({
  id: 'aesthetic-stars',
  name: 'Aesthetic Soft ✧',
  category: 'aesthetic',
  map: createMap(lower + upper, MAPS.specialSoft),
  pages: ['home', 'amino'],
  compatibility: 'medium',
  tags: ['Aesthetic', 'Cute']
});

FONTS.push({
  id: 'gaming-skull',
  name: 'Nick Gaming ☠',
  category: 'gaming',
  map: createMap(lower + upper, MAPS.frakturBold),
  pages: ['home', 'goticas'],
  compatibility: 'medium',
  tags: ['Gaming', 'Agresivo']
});

export const convertText = (text: string, map: Record<string, string>): string => {
  const normalized = text.normalize('NFC');
  return [...normalized].map(char => {
    if (map[char]) return map[char];
    // Intento de mapeo inteligente para español
    const baseChar = ACCENT_MAP[char];
    if (baseChar && map[baseChar]) {
      const combiner = char === 'ñ' || char === 'Ñ' ? COMBINERS.tilde : COMBINERS.acute;
      return map[baseChar] + combiner;
    }
    return char;
  }).join('');
};

export const getDisplaySegments = (text: string, map: Record<string, string>): TextSegment[] => {
  const segments: TextSegment[] = [];
  const normalized = text.normalize('NFC');
  
  for (const char of [...normalized]) {
    if (map[char]) {
      segments.push({ content: map[char], isFallback: false });
    } else {
      const baseChar = ACCENT_MAP[char];
      if (baseChar && map[baseChar]) {
        const combiner = char === 'ñ' || char === 'Ñ' ? COMBINERS.tilde : COMBINERS.acute;
        segments.push({ content: map[baseChar] + combiner, isFallback: false, isCombined: true });
      } else {
        segments.push({ content: char, isFallback: true });
      }
    }
  }
  return segments;
};