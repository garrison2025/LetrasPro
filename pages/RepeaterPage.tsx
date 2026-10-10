import React, { useState } from 'react';
import { PageMetadata as Helmet } from '../components/PageMetadata';
import { Copy, Repeat, Trash2 } from 'lucide-react';
import Toast from '../components/Toast';
import { repeatText } from '../services/repeater';
import { truncateText } from '../services/text';
import { useClipboard } from '../hooks/useClipboard';

const RepeaterPage: React.FC = () => {
  const [text, setText] = useState('');
  const [count, setCount] = useState<number>(10);
  const [separator, setSeparator] = useState('newline');
  const [customSeparator, setCustomSeparator] = useState(' ');
  const [result, setResult] = useState('');
  const [generatedFrom, setGeneratedFrom] = useState('');
  const settings = JSON.stringify([text, count, separator, customSeparator]);
  const resultIsStale = Boolean(result) && generatedFrom !== settings;
  const [generationError, setGenerationError] = useState('');
  const { copy, toastProps } = useClipboard("¡Texto copiado al portapapeles!");

  const handleRepeat = () => {
    if (!text) return;
    
    
    let sep = '';
    switch (separator) {
      case 'newline': sep = '\n'; break;
      case 'space': sep = ' '; break;
      case 'comma': sep = ', '; break;
      case 'period': sep = '. '; break;
      case 'custom': sep = customSeparator; break;
    }

    try {
      setResult(repeatText(text, count, sep));
      setGenerationError('');
      setGeneratedFrom(settings);
    } catch (error) {
      setResult('');
      setGenerationError(error instanceof Error ? error.message : 'No se pudo generar el texto.');
    }
  };

  const copyToClipboard = () => {
    if (!result || resultIsStale) return;
    void copy(result);
  };

  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Repetidor de Textos para WhatsApp y Bromas - LetrasPro</title>
        <meta name="description" content="Repite un texto 100 o 1000 veces con un solo clic. Herramienta gratuita para bromas en WhatsApp, spam de texto y mensajes masivos." />
        <link rel="canonical" href="https://conversordeletrasbonitas.org/repetidor-de-texto" />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
            <Repeat size={16} /> Herramienta Viral
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
            Repetidor de Textos
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            ¿Quieres enviar el mismo mensaje 100 veces? Genera bloques de texto repetido para bromas de WhatsApp o comentarios de Instagram.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm h-fit">
            <div className="space-y-6">
              <div>
                <label htmlFor="repeat-text" className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Texto a repetir</label>
                <input 
                  type="text" 
                  id="repeat-text"  value={text}
                  onChange={(e) => setText(truncateText(e.target.value))}
                  placeholder="Ej: Te quiero ❤️"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="repeat-count" className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Repeticiones (Max 1000)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="1000"
                  id="repeat-count" value={count}
                  onChange={(e) => setCount(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <span className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Separador</span>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setSeparator('newline')} aria-pressed={separator === 'newline'}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border ${separator === 'newline' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:bg-slate-800'}`}
                  >
                    Nueva Línea
                  </button>
                  <button 
                    onClick={() => setSeparator('space')} aria-pressed={separator === 'space'}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border ${separator === 'space' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:bg-slate-800'}`}
                  >
                    Espacio
                  </button>
                  <button 
                    onClick={() => setSeparator('period')} aria-pressed={separator === 'period'}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border ${separator === 'period' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:bg-slate-800'}`}
                  >
                    Punto
                  </button>
                  <button 
                    onClick={() => setSeparator('custom')} aria-pressed={separator === 'custom'}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border ${separator === 'custom' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:bg-slate-800'}`}
                  >
                    Otro...
                  </button>
                </div>
                {separator === 'custom' && (
                  <input 
                    type="text" 
                    aria-label="Separador personalizado" maxLength={100} value={customSeparator}
                    onChange={(e) => setCustomSeparator(e.target.value)}
                    placeholder="Escribe el separador..."
                    className="mt-3 w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                )}
              </div>

              <button 
                onClick={handleRepeat}
                disabled={!text}
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
              >
                <Repeat size={20} /> Generar Texto
              </button>
            </div>
          </div>

          {/* Result */}
          <div className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-tr from-primary-500 to-secondary-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
             <div className="relative bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden h-full flex flex-col">
                <div className="bg-slate-50 dark:bg-slate-900 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                   <span className="text-sm font-bold text-slate-500 uppercase">Resultado</span>
                   {result && (
                     <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md font-medium">
                       {result.length} caracteres
                     </span>
                   )}
                </div>
                {resultIsStale && <p role="status" className="px-6 pt-4 text-sm text-amber-700 dark:text-amber-300">Has cambiado la entrada. Genera de nuevo antes de copiar.</p>}
                <textarea 
                  readOnly aria-label="Resultado del texto repetido"
                  value={result}
                  className="flex-grow w-full p-6 text-slate-600 dark:text-slate-300 resize-none outline-none text-sm leading-relaxed min-h-[300px] bg-white dark:bg-slate-800"
                  placeholder="El resultado aparecerá aquí..."
                />
                <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-100 flex gap-3">
                  <button 
                    onClick={copyToClipboard}
                    disabled={!result || resultIsStale}
                    className="flex-1 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Copy size={18} /> Copiar
                  </button>
                  <button 
                    aria-label="Borrar resultado" onClick={() => setResult('')}
                    disabled={!result}
                    className="px-4 py-3 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
             </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-24 prose prose-slate dark:prose-invert prose-lg max-w-none">
          <h2>¿Para qué sirve un repetidor de texto?</h2>
          <p>Esta herramienta es muy popular para:</p>
          <ul>
            <li><strong>Bromas de WhatsApp:</strong> Envía una columna interminable de texto a tus amigos.</li>
            <li><strong>Comentarios de Instagram:</strong> Llama la atención repitiendo un emoji o una palabra clave.</li>
            <li><strong>Pruebas de diseño:</strong> Genera texto de relleno (Lorem Ipsum) rápidamente.</li>
          </ul>
        </div>
      </div>
      <Toast {...toastProps} />
      <Toast message={generationError} isVisible={!!generationError} variant="error" onClose={() => setGenerationError('')} />
    </div>
  );
};

export default RepeaterPage;
