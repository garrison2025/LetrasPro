export function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage may be disabled or full; the current session remains usable.
  }
}

export function readStoredArray<T>(key: string, isValid: (value: unknown) => value is T): T[] {
  try {
    const value: unknown = JSON.parse(readStorage(key) || '[]');
    return Array.isArray(value) ? value.filter(isValid) : [];
  } catch {
    return [];
  }
}
