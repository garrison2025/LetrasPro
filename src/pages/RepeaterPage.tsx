import React, { useState } from 'react';
import { Copy, Repeat, Trash2 } from 'lucide-react';
import Toast from '../components/Toast';

const RepeaterPage: React.FC = () => {
  const [text, setText] = useState('');
  const [count, setCount] = useState<number>(10);
  const [separator, setSeparator] = useState('newline');
  const [customSeparator, setCustomSeparator] = useState(' ');
  const [result, setResult] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleRepeat = () => {
    if (!text) return;
    const safeCount = Math.min(Math.max(1, count), 1000); 
    
    let sep = '';
    switch (separator) {
      case 'newline': sep = '\n'; break;
      case 'space': sep = ' '; break;
      case 'comma': sep = ', '; break;
      case 'period': sep = '. '; break;
      case 'custom': sep = customSeparator; break;
    }

    const repeated = Array(safeCount).fill(text).join(sep);
    setResult(repeated);
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setShowToast(true);
  };

  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
            <Repeat size={16} /> Herramienta Viral
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Repetidor de Textos
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            ¿Quieres enviar el mismo mensaje 100 veces? Genera bloques de texto repetido para bromas de WhatsApp o comentarios de Instagram.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm h-fit">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Texto a repetir</label>
                <input 
                  type="text" 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Ej: Te quiero ❤️"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Repeticiones (Max 1000)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="1000"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Separador</label>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setSeparator('newline')} className={`px-3 py-2 rounded-lg text-sm font-medium border ${separator === 'newline' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'}`}>Nueva Línea</button>
                  <button onClick={() => setSeparator('space')} className={`px-3 py-2 rounded-lg text-sm font-medium border ${separator === 'space' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'}`}>Espacio</button>
                  <button onClick={() => setSeparator('period')} className={`px-3 py-2 rounded-lg text-sm font-medium border ${separator === 'period' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'}`}>Punto</button>
                  <button onClick={() => setSeparator('custom')} className={`px-3 py-2 rounded-lg text-sm font-medium border ${separator === 'custom' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'}`}>Otro...</button>
                </div>
                {separator === 'custom' && (
                  <input type="text" value={customSeparator} onChange={(e) => setCustomSeparator(e.target.value)} placeholder="Escribe el separador..." className="mt-3 w-full px-4 py-2 rounded-lg border border-slate-200 text-sm" />
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

          <div className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-tr from-primary-500 to-secondary-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
             <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden h-full flex flex-col">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                   <span className="text-sm font-bold text-slate-500 uppercase">Resultado</span>
                   {result && (
                     <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md font-medium">
                       {result.length} caracteres
                     </span>
                   )}
                </div>
                <textarea 
                  readOnly
                  value={result}
                  className="flex-grow w-full p-6 text-slate-600 resize-none outline-none text-sm leading-relaxed min-h-[300px]"
                  placeholder="El resultado aparecerá aquí..."
                />
                <div className="p-4 bg-white border-t border-slate-100 flex gap-3">
                  <button onClick={copyToClipboard} disabled={!result} className="flex-1 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"><Copy size={18} /> Copiar</button>
                  <button onClick={() => setResult('')} disabled={!result} className="px-4 py-3 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors"><Trash2 size={20} /></button>
                </div>
             </div>
          </div>
        </div>
      </div>
      <Toast message="¡Texto copiado!" isVisible={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};

export default RepeaterPage;