import React, { useEffect, useState } from 'react';
import { registerSW } from 'virtual:pwa-register';
import { reportDiagnostic } from '../services/diagnostics';

// Mounted outside StrictMode so a development effect replay cannot register twice.
const UpdateNotice: React.FC = () => {
  const [update, setUpdate] = useState<null | (() => Promise<void>)>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    const updateSW = registerSW({
      immediate: true,
      async onNeedRefresh() {
        try {
          const response = await fetch('/app-version.json', { cache: 'no-store', credentials: 'omit', signal: AbortSignal.timeout(5000) });
          const version = response.ok ? await response.json() : null;
          // An imported ad worker may change without a new application release.
          if (version?.release === import.meta.env.VITE_APP_RELEASE) return;
        } catch { /* Keep a known waiting update available when the version check fails. */ }
        if (active) setUpdate(() => () => updateSW(true));
      },
      onRegisterError() {
        reportDiagnostic('offline');
      },
    });
    return () => { active = false; };
  }, []);

  if (!update) return null;

  const applyUpdate = async () => {
    setBusy(true);
    setFailed(false);
    try {
      await update();
    } catch {
      setFailed(true);
      reportDiagnostic('update');
    } finally {
      setBusy(false);
    }
  };

  return (
    <aside aria-label="Actualización de la aplicación" className="fixed bottom-4 left-4 right-4 sm:left-auto sm:w-96 z-50 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-800 dark:text-white">
      <p role="status" className="text-sm mb-3">
        {failed ? 'No se pudo actualizar. Puedes intentarlo de nuevo.' : 'Hay una nueva versión disponible. Actualiza cuando termines de editar.'}
      </p>
      <div className="flex gap-3">
        <button type="button" onClick={applyUpdate} disabled={busy} className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50">
          {busy ? 'Actualizando…' : 'Actualizar'}
        </button>
        <button type="button" onClick={() => setUpdate(null)} disabled={busy} className="rounded-lg px-4 py-2 text-sm font-bold disabled:opacity-50">Más tarde</button>
      </div>
    </aside>
  );
};

export default UpdateNotice;
