import { useCallback, useState } from 'react';
import { copyText } from '../services/clipboard';

export function useClipboard(successMessage: string) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const onClose = useCallback(() => setStatus('idle'), []);
  const copy = async (text: string) => {
    if (!text) return false;
    const success = await copyText(text);
    setStatus(success ? 'success' : 'error');
    return success;
  };
  return {
    copy,
    toastProps: {
      message: status === 'error' ? 'No se pudo copiar. Selecciona el texto y cópialo manualmente.' : successMessage,
      isVisible: status !== 'idle',
      variant: status === 'error' ? 'error' as const : 'success' as const,
      onClose
    }
  };
}
