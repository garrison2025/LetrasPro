import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageMetadata as Helmet } from '../components/PageMetadata';
import { downloadPng, downloadSvg, escapeSvg, printSvg } from '../services/visualExport';

const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789'.split('');
const inputClass = 'w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500';
const buttonClass = 'rounded-xl bg-violet-700 text-white font-semibold px-5 py-3 hover:bg-violet-800 disabled:opacity-50';

function buildTemplate(text: string, outlines: boolean, guides: boolean): string {
  const value = text.trim().toUpperCase() || 'A';
  const size = Math.max(40, Math.min(350, 960 / (value.length * 0.78)));
  const ink = outlines ? 'fill="white" stroke="#111827" stroke-width="2.8" paint-order="stroke"' : 'fill="#111827"';
  const lines = guides ? '<line x1="60" x2="734" y1="395" y2="395" stroke="#94a3b8" stroke-width="2" stroke-dasharray="12 12"/><line x1="60" x2="734" y1="735" y2="735" stroke="#94a3b8" stroke-width="2" stroke-dasharray="12 12"/>' : '';
  return '<svg xmlns="http://www.w3.org/2000/svg" width="794" height="1123" viewBox="0 0 794 1123" role="img" aria-label="Molde imprimible de letras">' +
    '<rect width="794" height="1123" fill="white"/>' + lines +
    '<text x="397" y="562" text-anchor="middle" dominant-baseline="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="' + size + '" ' + ink + '>' +
    escapeSvg(value) + '</text></svg>';
}

export default function PrintableLettersPage() {
  const [mode, setMode] = useState<'letter' | 'word'>('letter');
  const [letter, setLetter] = useState('A');
  const [word, setWord] = useState('HOLA');
  const [outlines, setOutlines] = useState(true);
  const [guides, setGuides] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const text = mode === 'letter' ? letter : word;
  const svg = useMemo(() => buildTemplate(text, outlines, guides), [text, outlines, guides]);
  const filename = 'molde-letras-' + (text || 'a');

  const savePng = async () => {
    setBusy(true); setError('');
    try { await downloadPng(svg, filename, 794, 1123); }
    catch (e) { setError(e instanceof Error ? e.message : 'No se pudo exportar PNG.'); }
    finally { setBusy(false); }
  };

  return <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-20 text-slate-900 dark:text-white">
    <Helmet>
      <title>Moldes de Letras para Imprimir Gratis A-Z y Nombres | LetrasPro</title>
      <meta name="description" content="Crea moldes de letras para imprimir gratis. Elige letras grandes A-Z, números o tu nombre, con contorno para recortar y descarga SVG, PNG o imprime en A4." />
      <link rel="canonical" href="https://conversordeletrasbonitas.org/moldes-de-letras-para-imprimir" />
    </Helmet>
    <div className="mb-8">
      <p className="text-violet-700 dark:text-violet-300 font-bold text-sm mb-2">Imprimibles • Gratis y sin registro</p>
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">Moldes de Letras para Imprimir</h1>
      <p className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl">Crea un molde de una letra, un número o una palabra personalizada. Elige el contorno hueco para recortar, calcar o colorear y descarga el archivo sin marcas de agua.</p>
    </div>
    <div className="grid lg:grid-cols-[350px_minmax(0,1fr)] gap-6 items-start">
      <section aria-label="Personaliza el molde" className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
        <div>
          <label htmlFor="molde-mode" className="block mb-2 text-sm font-bold">Tipo de molde</label>
          <select id="molde-mode" className={inputClass} value={mode} onChange={e => setMode(e.target.value as 'letter' | 'word')}>
            <option value="letter">Letra o número grande</option><option value="word">Nombre o palabra</option>
          </select>
        </div>
        {mode === 'letter' ? <div>
          <label htmlFor="molde-letter" className="block mb-2 text-sm font-bold">Selecciona una letra</label>
          <select id="molde-letter" className={inputClass} value={letter} onChange={e => setLetter(e.target.value)}>
            {alphabet.map(char => <option key={char} value={char}>{char}</option>)}
          </select>
          <div className="flex flex-wrap gap-1 mt-3" aria-label="Abecedario de acceso rápido">{alphabet.slice(0, 27).map(char => <button key={char} type="button" onClick={() => setLetter(char)} aria-pressed={char === letter} className={'w-9 h-9 rounded-md text-sm font-bold border ' + (char === letter ? 'bg-violet-700 text-white' : 'bg-slate-50 dark:bg-slate-700 dark:border-slate-600')}>{char}</button>)}</div>
        </div> : <div>
          <label htmlFor="molde-word" className="block mb-2 text-sm font-bold">Tu nombre o palabra (máx. 24 caracteres)</label>
          <input id="molde-word" className={inputClass} value={word} maxLength={24} onChange={e => setWord(e.target.value)} placeholder="Ej. FELIZ CUMPLE" />
        </div>}
        <label className="flex items-center gap-3 text-sm font-medium"><input type="checkbox" checked={outlines} onChange={e => setOutlines(e.target.checked)} className="size-5 accent-violet-700" /> Letras huecas para colorear</label>
        <label className="flex items-center gap-3 text-sm font-medium"><input type="checkbox" checked={guides} onChange={e => setGuides(e.target.checked)} className="size-5 accent-violet-700" /> Mostrar líneas de guía</label>
        <div className="grid grid-cols-2 gap-2">
          <button className={buttonClass} type="button" onClick={() => { setError(''); if (!printSvg(svg)) setError('Activa las ventanas emergentes para imprimir. También puedes guardar SVG.'); }}>Imprimir A4 / PDF</button>
          <button className={buttonClass} type="button" onClick={() => downloadSvg(svg, filename)}>Descargar SVG</button>
          <button className={buttonClass + ' col-span-2'} type="button" disabled={busy} onClick={() => void savePng()}>{busy ? 'Generando…' : 'Descargar PNG'}</button>
        </div>
        {error && <p role="alert" className="text-red-700 dark:text-red-300 text-sm">{error}</p>}
        <p className="text-xs text-slate-600 dark:text-slate-400">Los moldes se generan directamente en tu navegador. Para obtener un PDF, elige «Guardar como PDF» en el cuadro de impresión.</p>
      </section>
      <section aria-label="Vista previa del molde A4" className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-3 sm:p-5 border border-slate-200 dark:border-slate-700">
        <h2 className="font-bold mb-3">Vista previa · Hoja A4</h2>
        <div className="graphic-preview max-w-[540px] mx-auto aspect-[794/1123] bg-white shadow-xl" dangerouslySetInnerHTML={{ __html: svg }} />
      </section>
    </div>
    <section className="prose prose-slate dark:prose-invert max-w-3xl mt-12">
      <h2>Cómo crear moldes de letras grandes</h2>
      <p>Selecciona una letra del abecedario, incluyendo Ñ, o escribe un nombre corto. El modo hueco produce letras de contorno para recortar en cartulina, usar en goma EVA o colorear. Puedes descargar SVG para editarlo en un programa de diseño, PNG para insertar en documentos o imprimir directamente.</p>
      <h2>Consejos para imprimir sin perder calidad</h2>
      <p>Usa una escala del 100 % para conservar las proporciones de la hoja. Si necesitas un tamaño exacto en centímetros, comprueba las opciones de escala de tu impresora antes de cortar el molde. Los nombres largos reducen su tamaño automáticamente para caber en la página.</p>
      <h2>Preguntas frecuentes</h2>
      <h3>¿Puedo crear moldes con la letra Ñ?</h3><p>Sí. El selector incluye todas las letras habituales del abecedario español, incluida la Ñ, y los números del 0 al 9.</p>
      <h3>¿Cómo guardo el molde en PDF?</h3><p>Usa el botón Imprimir A4 / PDF y selecciona «Guardar como PDF» en el diálogo de impresión de tu navegador.</p>
      <h3>¿Los archivos tienen marca de agua?</h3><p>No. Los diseños se generan localmente y no llevan marcas de agua.</p>
      <p>También puedes crear una <Link to="/generador-de-firmas-bonitas">firma bonita</Link>, probar nuestro <Link to="/generador-de-texto-curvo">generador de texto curvo</Link> o usar el <Link to="/">conversor de letras bonitas</Link> para texto que se pueda copiar.</p>
    </section>
  </div>;
}
