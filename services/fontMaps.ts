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
  chicano: '𝓐𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩',
  heavySans: '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃ｗ𝗫𝘆𝘇',
  fraktur: '𝔞𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ',
  frakturBold: '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅',
  monospace: '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱ＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  doubleStruck: '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙＱＲＳＴ𝕌𝕍𝕎𝕏𝕐ℤ',
  smallCaps: 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠｗｘｙｚ',
  tiny: 'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾᑫᴿˢᵀᵁⱽᵂˣʸᶻ',
  bubble: 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ',
  fullWidth: 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
  lookalike: 'αвc∂єfɢнιjкℓмиσρqяѕтυνωχуz',
  block: '[̲̅a][̲̅b][̲̅c][̲̅d][̲̅e][̲̅f][̲̅g][̲̅h][̲̅i][̲̅j][̲̅k][̲̅l][̲̅m][̲̅n][̲̅o][̲̅p][̲̅q][̲̅r][̲̅s][̲̅t][̲̅u][̲̅v][̲̅w][̲̅x][̲̅y][̲̅z]',
  mirror: 'ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz∀ᗺƆᗡƎℲ⅁HIᗿK˥WNOԀΌᴚS⊥∩ΛMX⅄Z'
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

const getCategoryFromId = (id: string): FontStyle['category'] => {
  if (id.includes('sans')) return 'sans';
  if (id.includes('serif')) return 'serif';
  if (id.includes('script') || id.includes('look')) return 'script';
  if (id.includes('fraktur')) return 'gothic';
  if (id.includes('chicano')) return 'chicano';
  if (id.includes('heavy')) return 'heavy';
  if (id.includes('block')) return 'block';
  if (id.includes('mirror')) return 'mirror';
  if (id.includes('bubble')) return 'graffiti';
  if (id.includes('vaporwave')) return 'vaporwave';
  if (id.includes('tiny') || id.includes('smallCaps') || id.includes('monospace')) return 'aesthetic';
  if (id.includes('fullWidth')) return 'aesthetic';
  return 'decorative';
};

const getPagesForFont = (cat: string): string[] => {
  const p = ['home'];
  switch (cat) {
    case 'script':
      p.push('cursivas', 'tatuajes', 'tattoo', 'amino');
      break;
    case 'gothic':
      p.push('goticas', 'tatuajes', 'tattoo');
      break;
    case 'chicano':
      p.push('tatuajes', 'tattoo');
      break;
    case 'graffiti':
    case 'decorative':
      p.push('graffiti', 'amino');
      break;
    case 'block':
      p.push('graffiti', 'facebook');
      break;
    case 'heavy':
      p.push('facebook', 'graffiti');
      break;
    case 'sans':
    case 'serif':
      p.push('facebook');
      break;
    case 'aesthetic':
    case 'vaporwave':
      p.push('amino', 'facebook');
      break;
    case 'mirror':
      p.push('tools');
      break;
    default:
      break;
  }
  return p;
};

const createMap = (source: string, target: string): Record<string, string> => {
  const map: Record<string, string> = {};
  const sChars = [...source];
  const tChars = [...target];
  sChars.forEach((c, i) => { if (tChars[i]) map[c] = tChars[i]; });
  return map;
};

const createBlockMap = (pattern: string): Record<string, string> => {
  const map: Record<string, string> = {};
  const chars = lower + upper;
  [...chars].forEach(c => {
    map[c] = pattern.replace('a', c.toLowerCase());
  });
  return map;
};

const getCompForBase = (key: string): FontStyle['compatibility'] => {
  if (['sansBold', 'serifBold', 'sansItalic', 'serifItalic', 'monospace', 'fullWidth', 'doubleStruck', 'heavySans'].includes(key)) return 'high';
  if (['bubble', 'tiny', 'mirror', 'chicano'].includes(key)) return 'low';
  return 'medium';
};

const baseFontsData = Object.entries(MAPS).map(([key, val]) => {
  const cat = getCategoryFromId(key);
  return {
    id: key,
    name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
    cat: cat,
    chars: val,
    comp: getCompForBase(key)
  };
});

export const FONTS: FontStyle[] = baseFontsData.map(b => ({
  id: `pro-${b.id}`,
  name: b.name,
  category: b.cat,
  map: b.id === 'block' ? createBlockMap('[̲̅a]') : createMap(lower + upper, b.chars),
  pages: getPagesForFont(b.cat),
  compatibility: b.comp,
  tags: b.cat === 'script' ? ['Elegante', 'Cute'] : 
        (b.cat === 'chicano' ? ['Elegante', 'Tatuajes'] : 
        (b.cat === 'gothic' ? ['Gaming', 'Tatuajes'] : 
        (b.cat === 'heavy' ? ['Profesional', 'Urbano'] : 
        (b.cat === 'graffiti' ? ['Urbano', 'HipHop'] : ['Classic']))))
}));

// Nuevas variantes manuales
FONTS.push({
  id: 'pro-vaporwave-spaced',
  name: 'Vaporwave ✨',
  category: 'vaporwave',
  map: createMap(lower + upper, MAPS.fullWidth),
  pages: getPagesForFont('vaporwave'),
  compatibility: 'high',
  tags: ['Aesthetic', 'Urbano']
});

FONTS.push({
  id: 'pro-invisible-stacked',
  name: 'Stacked Symbols ░',
  category: 'decorative',
  map: createMap(lower + upper, MAPS.sansBold),
  pages: ['home', 'facebook', 'graffiti'],
  compatibility: 'medium',
  tags: ['Gaming', 'Urbano']
});

export const convertText = (text: string, map: Record<string, string>, isVaporwave: boolean = false): string => {
  const normalized = text.normalize('NFC');
  const result = [...normalized].map(char => {
    if (map[char]) return map[char];
    const baseChar = ACCENT_MAP[char];
    if (baseChar && map[baseChar]) {
      const combiner = char === 'ñ' || char === 'Ñ' ? COMBINERS.tilde : COMBINERS.acute;
      return map[baseChar] + combiner;
    }
    return char;
  }).join('');

  return isVaporwave ? result.split('').join(' ') : result;
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