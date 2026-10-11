import React, { useState, useEffect } from 'react';
import { PageMetadata as Helmet } from '../components/PageMetadata';
import { Copy, RefreshCw, AlertTriangle } from 'lucide-react';
import { generateZalgo } from '../services/zalgo';
import Toast from '../components/Toast';
import { truncateText } from '../services/text';
import { useClipboard } from '../hooks/useClipboard';

const GlitchPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [upLevel, setUpLevel] = useState(10);
  const [midLevel, setMidLevel] = useState(5);
  const [downLevel, setDownLevel] = useState(10);
  const [result, setResult] = useState('');
  const { copy, toastProps } = useClipboard("¡Texto glitch copiado!");

  useEffect(() => {
    if (!input) {
      setResult('');
      return;
    }
    const glitch = generateZalgo(input, upLevel, midLevel, downLevel);
    setResult(glitch);
  }, [input, upLevel, midLevel, downLevel]);

  const copyToClipboard = () => {
    if (!result) return;
    void copy(result);
  };

  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-950 min-h-screen text-white selection:bg-red-500 selection:text-white">
      <Helmet>
        <title>Generador de Texto Glitch y Zalgo (Maldito) - LetrasPro</title>
        <meta name="description" content="Crea texto distorsionado, glitch y estilo Zalgo. Perfecto para nicks de terror, Halloween y comentarios creepy." />
        <link rel="canonical" href="https://conversordeletrasbonitas.org/texto-glitch" />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-900/30 text-red-400 border border-red-500/30 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
            <AlertTriangle size={16} /> Modo Terror
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white mb-6 tracking-tight" style={{ textShadow: '2px 0 red, -2px 0 cyan' }}>
            Texto Glitch / Zalgo
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Transforma texto normal en una pesadilla visual. Ajusta el nivel de caos y distorsión.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          
          {/* Controls */}
          <div className="md:col-span-5 space-y-8 bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
            <div>
               <label htmlFor="GlitchPage-input" className="block text-sm font-bold text-slate-400 mb-2">Escribe aquí</label>
               <textarea 
                  id="GlitchPage-input" aria-label="Texto para efecto glitch"  value={input}
                  onChange={(e) => setInput(truncateText(e.target.value))}
                  placeholder="He comes..."
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all placeholder:text-slate-600"
               />
            </div>

            <div className="space-y-6">
               <div>
                 <div className="flex justify-between mb-2">
                   <label className="text-xs font-bold uppercase text-slate-500">Caos Superior (Arriba)</label>
                   <span className="text-xs font-mono text-red-400">{upLevel}%</span>
                 </div>
                 <input 
                   type="range" min="0" max="60" aria-label="Caos superior" value={upLevel}
                   onChange={(e) => setUpLevel(parseInt(e.target.value))}
                   className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                 />
               </div>
               
               <div>
                 <div className="flex justify-between mb-2">
                   <label className="text-xs font-bold uppercase text-slate-500">Caos Medio (Superpuesto)</label>
                   <span className="text-xs font-mono text-red-400">{midLevel}%</span>
                 </div>
                 <input 
                   type="range" min="0" max="20" aria-label="Caos medio" value={midLevel}
                   onChange={(e) => setMidLevel(parseInt(e.target.value))}
                   className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                 />
               </div>

               <div>
                 <div className="flex justify-between mb-2">
                   <label className="text-xs font-bold uppercase text-slate-500">Caos Inferior (Abajo)</label>
                   <span className="text-xs font-mono text-red-400">{downLevel}%</span>
                 </div>
                 <input 
                   type="range" min="0" max="60" aria-label="Caos inferior" value={downLevel}
                   onChange={(e) => setDownLevel(parseInt(e.target.value))}
                   className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                 />
               </div>
            </div>

            <button 
              onClick={() => {
                // Trigger re-render with new random seed effectively
                const glitch = generateZalgo(input, upLevel, midLevel, downLevel);
                setResult(glitch);
              }}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} /> Regenerar Caos
            </button>
          </div>

          {/* Output */}
          <div className="md:col-span-7">
             <div className="relative h-full min-h-[400px] bg-black rounded-3xl border border-red-900/30 shadow-[0_0_50px_rgba(220,38,38,0.1)] overflow-hidden flex flex-col">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
                
                <div className="flex-grow p-8 flex items-center justify-center overflow-auto custom-scrollbar">
                   <p className="text-center text-3xl md:text-5xl font-bold text-slate-200 break-all leading-relaxed tracking-wider">
                     {result || <span className="text-slate-800 italic text-xl">El vacío espera...</span>}
                   </p>
                </div>

                <div className="p-6 bg-slate-900/50 border-t border-slate-800/50 backdrop-blur-sm">
                   <button 
                    onClick={copyToClipboard}
                    disabled={!result}
                    className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-900/40 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100"
                   >
                     <Copy size={20} /> Copiar Texto Maldito
                   </button>
                </div>
             </div>
          </div>

        </div>
        
        <div className="mt-20 border-t border-slate-800 pt-12">
           <h2 className="text-2xl font-bold text-slate-200 mb-4">¿Qué es el Texto Zalgo?</h2>
           <p className="text-slate-400 leading-relaxed mb-4">
             El texto Zalgo es una forma de arte digital que utiliza "caracteres combinados" de Unicode. Estos son símbolos especiales diseñados para apilarse verticalmente encima o debajo de una letra. Al apilar muchos de ellos, se crea ese efecto de "ruido" o "glitch" que parece estar rompiendo la página web.
           </p>
           <h3 className="text-xl font-bold text-slate-200 mt-8 mb-3">Prueba breve: de texto normal a distorsionado</h3>
           <p className="text-slate-400 leading-relaxed mb-4">Escribe Noche. Coloca los tres controles en 0 para obtener Noche sin marcas añadidas. Después sube solo Caos Superior y pulsa Regenerar Caos: pueden aparecer marcas por encima de las letras. Si no aparecen, regenera o aumenta la intensidad. Activa Caos Inferior o Medio por separado para reconocer su efecto.</p>
           <p className="text-slate-400 leading-relaxed mb-4">Los valores de los controles indican intensidad, no una medición de compatibilidad. El generador elige marcas al azar; al regenerar puedes obtener otra combinación, incluso con los mismos valores. No necesitas llevar todos los controles al máximo para crear un título de terror.</p>
           <h3 className="text-xl font-bold text-slate-200 mt-8 mb-3">Si se corta el resultado o cuesta leerlo</h3>
           <p className="text-slate-400 leading-relaxed mb-4">Reduce primero las marcas superiores e inferiores y prueba una palabra corta. Algunas aplicaciones recortan la altura de la línea, eliminan marcas o rechazan nombres demasiado largos. Copia una muestra en un borrador y revísala antes de publicar; esta vista previa no confirma la aceptación de otra plataforma.</p>
           <p className="text-slate-400 leading-relaxed">Conserva el texto original para poder editarlo. Evita el efecto en direcciones, instrucciones o párrafos largos: los caracteres combinados pueden dificultar la búsqueda y la lectura asistida. Consulta la explicación técnica de <a className="text-red-300 underline" href="https://www.unicode.org/faq/char_combmark.html" target="_blank" rel="noopener noreferrer">Unicode sobre caracteres combinados</a>.</p>
        </div>
      </div>
      <Toast {...toastProps} />
    </div>
  );
};

export default GlitchPage;
