import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageMetadata as Helmet } from '../components/PageMetadata';
import { downloadPng, downloadSvg, escapeSvg } from '../services/visualExport';
import { useFittedSvg } from '../hooks/useFittedSvg';

type Direction = 'arriba' | 'abajo';
const field = 'w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500';

function makeCurvedSvg(text: string, direction: Direction, curve: number, size: number, color: string, guide: boolean): string {
  const safeText = escapeSvg(text.trim() || 'TEXTO CURVO');
  const safeColor = /^#[0-9a-f]{6}$/i.test(color) ? color : '#7c3aed';
  const y = direction === 'arriba' ? 338 : 152;
  const control = direction === 'arriba' ? y - curve * 2 : y + curve * 2;
  const path = 'M 65 ' + y + ' Q 450 ' + control + ' 835 ' + y;
  const guidePath = guide ? '<path d="' + path + '" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="7 7"/>' : '';
  const fontSize = Math.min(size, 1180 / Math.max(10, Array.from(text).length * 0.9));
  return '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500" viewBox="0 0 900 500" role="img" aria-label="Texto decorativo curvo">' +
    '<defs><path id="curva" d="' + path + '"/></defs>' + guidePath +
    '<text font-family="Arial, Helvetica, sans-serif" font-size="' + fontSize + '" font-weight="800" fill="' + safeColor + '" letter-spacing="1">' +
    '<textPath href="#curva" startOffset="50%" text-anchor="middle">' + safeText + '</textPath></text></svg>';
}

export default function CurvedTextPage() {
  const [text, setText] = useState('MI TEXTO CURVO');
  const [direction, setDirection] = useState<Direction>('arriba');
  const [curve, setCurve] = useState(135);
  const [size, setSize] = useState(65);
  const [color, setColor] = useState('#7c3aed');
  const [guide, setGuide] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const source = useMemo(() => makeCurvedSvg(text, direction, curve, size, color, guide), [text, direction, curve, size, color, guide]);
  const { previewRef, svg, fittedSize, measured } = useFittedSvg(source, 710);
  const filename = 'texto-curvo-' + (text || 'titulo');
  const exportPng = async () => {
    setBusy(true); setError('');
    try { await downloadPng(svg, filename, 900, 500); }
    catch (e) { setError(e instanceof Error ? e.message : 'No se pudo crear el PNG.'); }
    finally { setBusy(false); }
  };
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-20 text-slate-900 dark:text-white">
    <Helmet>
      <title>Generador de Texto Curvo Online Gratis | PNG y SVG</title>
      <meta name="description" content="Crea texto curvo, arqueado o en semicírculo online. Ajusta la curva, el tamaño y el color, previsualiza y descarga tu diseño en PNG transparente o SVG." />
      <link rel="canonical" href="https://conversordeletrasbonitas.org/generador-de-texto-curvo" />
    </Helmet>
    <div className="mb-8">
      <p className="text-violet-700 dark:text-violet-300 text-sm font-bold mb-2">Texto creativo • Exportación gratuita</p>
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">Generador de Texto Curvo</h1>
      <p className="max-w-3xl text-lg text-slate-700 dark:text-slate-300">Escribe un título y convierte tu texto en un arco hacia arriba o hacia abajo. Cambia la curvatura, el color y el tamaño para diseños de insignias, invitaciones y encabezados.</p>
    </div>
    <div className="grid lg:grid-cols-[350px_minmax(0,1fr)] gap-6 items-start">
      <section aria-label="Editar texto curvo" className="p-5 sm:p-6 bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-sm space-y-5">
        <div><label htmlFor="curve-text" className="block font-bold text-sm mb-2">Texto para curvar</label><input id="curve-text" className={field} maxLength={42} value={text} onChange={e => setText(e.target.value)} placeholder="Mi título" /></div>
        <fieldset><legend className="font-bold text-sm mb-2">Dirección de la curva</legend><div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => setDirection('arriba')} aria-pressed={direction === 'arriba'} className={'rounded-xl border px-3 py-3 font-semibold ' + (direction === 'arriba' ? 'bg-violet-100 text-violet-900 border-violet-600' : 'bg-slate-50 dark:bg-slate-700 dark:border-slate-600')}>Arco superior</button>
          <button type="button" onClick={() => setDirection('abajo')} aria-pressed={direction === 'abajo'} className={'rounded-xl border px-3 py-3 font-semibold ' + (direction === 'abajo' ? 'bg-violet-100 text-violet-900 border-violet-600' : 'bg-slate-50 dark:bg-slate-700 dark:border-slate-600')}>Arco inferior</button>
        </div></fieldset>
        <div><label htmlFor="curve-angle" className="block font-bold text-sm mb-2">Curvatura: {curve}</label><input id="curve-angle" className="w-full accent-violet-700" type="range" min="0" max="180" step="5" value={curve} onChange={e => setCurve(Number(e.target.value))} /></div>
        <div><label htmlFor="curve-size" className="block font-bold text-sm mb-2">Tamaño: {size}px<span className="font-normal" role="status">{measured && fittedSize < size - 0.1 ? ` · ajustado a ${Number(fittedSize.toFixed(1))}px` : ''}</span></label><input id="curve-size" className="w-full accent-violet-700" type="range" min="24" max="90" step="1" value={size} onChange={e => setSize(Number(e.target.value))} /></div>
        <div className="flex items-center gap-4"><label htmlFor="curve-color" className="font-bold text-sm">Color</label><input id="curve-color" type="color" className="w-14 h-11 cursor-pointer" value={color} onChange={e => setColor(e.target.value)} /></div>
        <label className="flex gap-3 items-center text-sm font-medium"><input type="checkbox" className="size-5 accent-violet-700" checked={guide} onChange={e => setGuide(e.target.checked)} /> Mostrar línea guía en el diseño</label>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" disabled={busy} onClick={() => void exportPng()} className="rounded-xl bg-violet-700 text-white font-bold px-4 py-3 disabled:opacity-50">{busy ? 'Exportando…' : 'Descargar PNG'}</button>
          <button type="button" onClick={() => downloadSvg(svg, filename)} className="rounded-xl bg-slate-900 text-white font-bold px-4 py-3">Descargar SVG</button>
        </div>
        {error && <p role="alert" className="text-sm text-red-700 dark:text-red-300">{error}</p>}
      </section>
      <section aria-label="Vista previa del texto curvo" className="p-5 sm:p-7 bg-slate-100 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl">
        <h2 className="font-bold mb-3">Vista previa en tiempo real</h2>
        <div className="rounded-xl bg-white min-h-44 overflow-hidden" style={{ backgroundImage: 'linear-gradient(90deg,#f1f5f9 1px,transparent 1px),linear-gradient(#f1f5f9 1px,transparent 1px)', backgroundSize: '20px 20px' }}><div ref={previewRef} className="graphic-preview w-full" dangerouslySetInnerHTML={{ __html: svg }} /></div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-4">El PNG se guarda sin fondo. Si quieres seguir editando la curva, descarga el SVG para usarlo en un editor vectorial.</p>
      </section>
    </div>
    <section className="prose prose-slate dark:prose-invert max-w-3xl mt-12">
      <h2>Cómo escribir texto arqueado</h2>
      <p>Introduce una palabra o frase, elige arco superior o inferior y mueve el control de curvatura. El texto se coloca sobre un trazado vectorial real; no es un truco con caracteres Unicode ni una captura de pantalla.</p>
      <h2>Texto curvo para logotipos y carteles</h2>
      <p>Los arcos son útiles en invitaciones, etiquetas y proyectos personales. Prueba títulos cortos para mejorar la legibilidad; con frases largas, el generador reduce automáticamente el tamaño de letra para evitar que se salga del diseño.</p>
      <h2>Preguntas frecuentes</h2>
      <h3>¿Puedo descargar el texto con fondo transparente?</h3><p>Sí. El archivo PNG es transparente y el SVG permite adaptar el tamaño sin perder calidad.</p>
      <h3>¿El texto curvo se puede copiar a Instagram?</h3><p>Este generador produce una imagen SVG o PNG. Si necesitas caracteres que se puedan pegar como texto, usa el <Link to="/">conversor de letras bonitas</Link>.</p>
      <p>Otros recursos: <Link to="/generador-de-firmas-bonitas">firmas bonitas</Link> y <Link to="/moldes-de-letras-para-imprimir">moldes para imprimir</Link>.</p>
    </section>
  </div>;
}
