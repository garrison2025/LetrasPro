import React, { useState } from 'react';
import { PageMetadata as Helmet } from '../components/PageMetadata';
import { Copy, RefreshCcw, ArrowRightLeft, ArrowDownUp, Trash2 } from 'lucide-react';
import { flipText } from '../services/flipMaps';
import Toast from '../components/Toast';
import { truncateText } from '../services/text';
import { useClipboard } from '../hooks/useClipboard';

const FlipTextPage: React.FC = () => {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'upside-down' | 'reverse'>('upside-down');
  const { copy, toastProps } = useClipboard("¡Texto volteado copiado!");

  const result = flipText(text, mode);

  const copyToClipboard = () => {
    if (!result) return;
    void copy(result);
  };

  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <Helmet>
        <title>Texto al Revés y Volteado (Flip Text) - LetrasPro</title>
        <meta name="description" content="Escribe al revés o voltea tus textos boca abajo (uʍop ǝpısdn). Generador de letras invertidas para Facebook y Twitter." />
        <link rel="canonical" href="https://conversordeletrasbonitas.org/texto-al-reves" />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
            <RefreshCcw size={16} /> Girar Texto
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
            Texto al Revés
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            ¡oןoɥ Girar tus textos nunca fue tan divertido. Escribe mensajes secretos o bromas para tus amigos.
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
           <button 
             onClick={() => setMode('upside-down')} aria-pressed={mode === 'upside-down'}
             className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${mode === 'upside-down' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-white text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'}`}
           >
             <ArrowDownUp size={18} /> Boca Abajo
           </button>
           <button 
             onClick={() => setMode('reverse')} aria-pressed={mode === 'reverse'}
             className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${mode === 'reverse' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-white text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'}`}
           >
             <ArrowRightLeft size={18} /> Espejo / Invertir
           </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
           {/* Input */}
           <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col h-64 md:h-80 transition-colors duration-300">
              <div className="flex justify-between items-center mb-4">
                 <span className="text-sm font-bold text-slate-400 uppercase">Escribe aquí</span>
                 {text && (
                   <button aria-label="Borrar texto" onClick={() => setText('')} className="text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                 )}
              </div>
              <textarea 
                id="FlipTextPage-input" aria-label="Texto a invertir"  value={text}
                onChange={(e) => setText(truncateText(e.target.value))}
                className="flex-grow w-full resize-none outline-none text-lg text-slate-800 dark:text-white bg-transparent placeholder:text-slate-300 dark:placeholder:text-slate-600"
                placeholder="Escribe algo aquí..."
              />
           </div>

           {/* Output */}
           <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-slate-800 dark:to-slate-800 p-6 rounded-3xl border border-primary-100 dark:border-slate-700 shadow-inner flex flex-col h-64 md:h-80 transition-colors duration-300 relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                 <span className="text-sm font-bold text-primary-600 dark:text-primary-400 uppercase">Resultado</span>
              </div>
              <textarea 
                readOnly aria-label="Texto convertido"
                value={result}
                className="flex-grow w-full resize-none outline-none text-lg font-medium text-slate-800 dark:text-white bg-transparent"
                placeholder="¡oןoɥ"
              />
              <button 
                onClick={copyToClipboard}
                disabled={!result}
                className="absolute bottom-6 right-6 px-6 py-3 bg-slate-900 dark:bg-primary-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50 disabled:scale-100"
              >
                <Copy size={18} /> Copiar
              </button>
           </div>
        </div>
        <section className="mt-12 prose prose-slate dark:prose-invert max-w-none" aria-labelledby="flip-guide">
          <h2 id="flip-guide">Invertir el orden y poner boca abajo son dos resultados distintos</h2>
          <p>Escribe hola y cambia entre los dos botones. Espejo / Invertir cambia el orden de los caracteres; no crea un reflejo gráfico de cada letra. Boca Abajo también sustituye las letras que tienen una equivalencia visual en el conversor.</p>
          <dl data-tool-example>
            <dt>Original</dt><dd>hola</dd>
            <dt>Espejo / Invertir</dt><dd>{flipText('hola', 'reverse')}</dd>
            <dt>Boca Abajo</dt><dd>{flipText('hola', 'upside-down')}</dd>
          </dl>
          <h3>Cómo copiar sin perder el sentido</h3>
          <ol>
            <li>Elige el modo y comprueba la frase completa en Resultado.</li>
            <li>Copia una muestra corta y pégala en un borrador de la aplicación de destino.</li>
            <li>Conserva el texto original si necesitas recuperar nombres, fechas o instrucciones.</li>
          </ol>
          <p>Los acentos, emojis y signos sin equivalencia pueden conservar su orientación original. El resultado no cifra ni protege un mensaje: cualquiera puede volver a ordenar el texto. Para información importante, acompaña la versión decorativa con texto normal.</p>
          <p>Si aparecen cuadros vacíos, utiliza Espejo / Invertir o reduce los símbolos. También puedes comparar <a href="/letras-cursivas">letras cursivas</a> sin invertir la frase.</p>
        </section>
      </div>
      <Toast {...toastProps} />
    </div>
  );
};

export default FlipTextPage;
