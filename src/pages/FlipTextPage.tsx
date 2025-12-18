import React, { useState } from 'react';
import { Copy, RefreshCcw, ArrowRightLeft, ArrowDownUp, Trash2 } from 'lucide-react';
import { flipText } from '../services/flipMaps';
import Toast from '../components/Toast';

const FlipTextPage: React.FC = () => {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'upside-down' | 'reverse'>('upside-down');
  const [showToast, setShowToast] = useState(false);

  const result = flipText(text, mode);

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setShowToast(true);
  };

  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 dark:bg-slate-900 min-h-screen transition-colors duration-300">
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
             onClick={() => setMode('upside-down')}
             className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${mode === 'upside-down' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-white text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'}`}
           >
             <ArrowDownUp size={18} /> Boca Abajo
           </button>
           <button 
             onClick={() => setMode('reverse')}
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
                   <button onClick={() => setText('')} className="text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                 )}
              </div>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
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
                readOnly
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
      </div>
      <Toast message="¡Texto volteado copiado!" isVisible={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};

export default FlipTextPage;