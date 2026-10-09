export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    console.warn('LetrasPro: clipboard unavailable');
    return false;
  }
}
