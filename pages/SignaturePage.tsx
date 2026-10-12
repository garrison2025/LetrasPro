import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageMetadata as Helmet } from '../components/PageMetadata';
import { downloadPng, downloadSvg, escapeSvg } from '../services/visualExport';

type SignatureStyle = 'caligrafica' | 'clasica' | 'moderna' | 'marcada';
const fonts: Record<SignatureStyle, string> = {
  caligrafica: 'cursive',
  clasica: 'Georgia, serif',
  moderna: 'Trebuchet MS, sans-serif',
  marcada: 'Times New Roman, serif',
};
const styles: { id: SignatureStyle; name: string; detail: string }[] = [
  { id: 'caligrafica', name: 'Caligráfica', detail: 'Fluida y personal' },
  { id: 'clasica', name: 'Clásica', detail: 'Elegante y sobria' },
  { id: 'moderna', name: 'Moderna', detail: 'Clara y sencilla' },
  { id: 'marcada', name: 'Marcada', detail: 'Contraste destacado' },
];
const field = 'w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500';

function buildSignature(name: string, style: SignatureStyle, color: string, size: number, underline: boolean): string {
  const safeName = escapeSvg(name.trim() || 'Tu nombre');
  const safeColor = /^#[0-9a-f]{6}$/i.test(color) ? color : '#172554';
  const computedSize = Math.min(size, 1180 / Math.max(7, Array.from(name).length));
  const italic = style === 'clasica' || style === 'marcada' ? 'italic' : 'normal';
  const weight = style === 'marcada' ? '700' : '400';
  const stroke = underline ? '<path d="M170 286 C320 311 585 305 730 276" fill="none" stroke="' + safeColor + '" stroke-width="3" stroke-linecap="round"/>' : '';
  return '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="400" viewBox="0 0 900 400" role="img" aria-label="Firma artística tipográfica">' +
    '<text x="450" y="227" text-anchor="middle" font-family="' + fonts[style] + '" font-style="' + italic + '" font-weight="' + weight +
    '" font-size="' + computedSize + '" letter-spacing="1" fill="' + safeColor + '">' + safeName + '</text>' + stroke + '</svg>';
}

export default function SignaturePage() {
  const [name, setName] = useState('Sofía Morales');
  const [style, setStyle] = useState<SignatureStyle>('caligrafica');
  const [color, setColor] = useState('#172554');
  const [size, setSize] = useState(96);
  const [underline, setUnderline] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const svg = useMemo(() => buildSignature(name, style, color, size, underline), [name, style, color, size, underline]);
  const filename = 'firma-bonita-' + (name || 'mi-nombre');
  const savePng = async () => {
    setBusy(true); setError('');
    try { await downloadPng(svg, filename, 900, 400); }
    catch (e) { setError(e instanceof Error ? e.message : 'No se pudo descargar PNG.'); }
    finally { setBusy(false); }
  };

  return <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-20 text-slate-900 dark:text-white">
    <Helmet>
      <title>Generador de Firmas Bonitas con tu Nombre Gratis | LetrasPro</title>
      <meta name="description" content="Diseña firmas bonitas con tu nombre. Elige un estilo caligráfico, tamaño y color, previsualiza y descarga tu firma artística en PNG transparente o SVG." />
      <link rel="canonical" href="https://conversordeletrasbonitas.org/generador-de-firmas-bonitas" />
    </Helmet>
    <div className="mb-8">
      <p className="text-violet-700 dark:text-violet-300 text-sm font-bold mb-2">Diseño personal • Sin registro</p>
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">Generador de Firmas Bonitas</h1>
      <p className="max-w-3xl text-lg text-slate-700 dark:text-slate-300">Escribe tu nombre, prueba distintas firmas tipográficas y descarga un diseño para tus proyectos creativos, invitaciones o marcas de agua.</p>
    </div>
    <div className="grid lg:grid-cols-[350px_1fr] gap-6 items-start">
      <section aria-label="Editor de firma bonita" className="p-5 sm:p-6 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl shadow-sm space-y-5">
        <div><label htmlFor="firma-name" className="block text-sm font-bold mb-2">Tu nombre</label><input id="firma-name" className={field} maxLength={48} value={name} onChange={e => setName(e.target.value)} /></div>
        <fieldset><legend className="text-sm font-bold mb-2">Estilo de la firma</legend>
          <div className="grid grid-cols-2 gap-2">{styles.map(item => <button key={item.id} type="button" onClick={() => setStyle(item.id)} aria-pressed={style === item.id} className={'rounded-xl border p-3 text-left ' + (style === item.id ? 'bg-violet-100 text-violet-900 border-violet-600' : 'bg-slate-50 dark:bg-slate-700 dark:border-slate-600')}>
            <strong className="text-sm block">{item.name}</strong><span className="text-xs">{item.detail}</span>
          </button>)}</div>
        </fieldset>
        <div className="flex items-center gap-4"><label htmlFor="firma-color" className="text-sm font-bold">Color de tinta</label><input id="firma-color" type="color" className="w-14 h-11 rounded-lg cursor-pointer" value={color} onChange={e => setColor(e.target.value)} /></div>
        <div><label htmlFor="firma-size" className="text-sm font-bold block mb-2">Tamaño: {size}px</label><input id="firma-size" className="w-full accent-violet-700" type="range" min="48" max="150" step="2" value={size} onChange={e => setSize(Number(e.target.value))} /></div>
        <label className="flex gap-3 text-sm items-center font-medium"><input className="size-5 accent-violet-700" type="checkbox" checked={underline} onChange={e => setUnderline(e.target.checked)} /> Añadir trazo debajo</label>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="flex-1 rounded-xl bg-violet-700 text-white font-bold py-3 px-4 hover:bg-violet-800 disabled:opacity-50" disabled={busy} onClick={() => void savePng()}>{busy ? 'Exportando…' : 'Descargar PNG'}</button>
          <button type="button" className="flex-1 rounded-xl bg-slate-900 text-white font-bold py-3 px-4" onClick={() => downloadSvg(svg, filename)}>Descargar SVG</button>
        </div>
        {error && <p className="text-red-700 dark:text-red-300 text-sm" role="alert">{error}</p>}
      </section>
      <section className="p-5 sm:p-7 bg-slate-100 dark:bg-slate-800 rounded-2xl border dark:border-slate-700">
        <h2 className="font-bold mb-3">Vista previa de tu firma</h2>
        <div className="relative rounded-xl bg-white min-h-44 flex items-center justify-center overflow-hidden" style={{ backgroundImage: 'linear-gradient(90deg,#f1f5f9 1px,transparent 1px),linear-gradient(#f1f5f9 1px,transparent 1px)', backgroundSize: '20px 20px' }}>
          <div className="w-full" dangerouslySetInnerHTML={{ __html: svg }} />
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-4">El PNG se exporta con fondo transparente. El aspecto de la tipografía puede variar según las fuentes instaladas en tu dispositivo.</p>
      </section>
    </div>
    <section className="prose prose-slate dark:prose-invert max-w-3xl mt-12">
      <h2>Cómo hacer una firma bonita con tu nombre</h2>
      <p>Escribe el nombre que quieras decorar y elige una firma caligráfica, clásica, moderna o marcada. Ajusta el color y el tamaño, comprueba la vista previa y descarga PNG para presentaciones o SVG para trabajar en programas de diseño.</p>
      <h2>Firmas artísticas y firmas legales</h2>
      <p>Este generador crea un diseño tipográfico decorativo. No verifica identidades, no crea una firma electrónica certificada y no sustituye los requisitos de un servicio de firma legal.</p>
      <h2>Preguntas frecuentes</h2>
      <h3>¿La firma PNG tiene fondo transparente?</h3><p>Sí, el archivo PNG no añade fondo blanco, lo que facilita colocarlo encima de otros diseños.</p>
      <h3>¿Puedo usar acentos y la letra Ñ?</h3><p>Sí, el campo acepta nombres y apellidos con caracteres españoles. La apariencia final depende de la fuente disponible en el dispositivo.</p>
      <p>Prueba también los <Link to="/moldes-de-letras-para-imprimir">moldes de letras imprimibles</Link>, el <Link to="/generador-de-texto-curvo">texto curvo</Link> y el <Link to="/">conversor de letras bonitas</Link>.</p>
    </section>
  </div>;
}
