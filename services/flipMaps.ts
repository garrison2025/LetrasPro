const FLIP_MAP: Record<string, string> = {
  'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 
  'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 
  's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z', 
  'A': '∀', 'B': '𐐒', 'C': 'Ɔ', 'D': '◖', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': '⅁', 'H': 'H', 'I': 'I', 
  'J': 'ſ', 'K': '⋊', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Ό', 'R': 'ᴚ', 
  'S': 'S', 'T': '⊥', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z',
  '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6',
  ',': "'", '.': '˙', '?': '¿', '!': '¡', '"': '„', "'": ',', '`': ',', '(': ')', ')': '(', 
  '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<', '&': '⅋', '_': '‾'
};

export const flipText = (text: string, mode: 'upside-down' | 'mirror' | 'reverse'): string => {
  if (mode === 'reverse') {
    return text.split('').reverse().join('');
  }

  const chars = text.split('');
  
  if (mode === 'upside-down') {
    // Flip characters and reverse order
    return chars.map(c => FLIP_MAP[c] || c).reverse().join('');
  }
  
  // Mirror logic (simplified, mainly reversing but could use mirror specific chars if expanded)
  // For true visual mirroring, we usually use the same FLIP_MAP logic but without reversing, 
  // or a specific mirror map. Here we'll treat 'mirror' as simple reverse for now or distinct later.
  // Let's make 'mirror' basically behave like a visual flip.
  return chars.map(c => FLIP_MAP[c] || c).join('');
};