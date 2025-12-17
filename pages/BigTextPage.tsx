import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Copy, Type, Trash2 } from 'lucide-react';
import { generateBigText } from '../services/bigFonts';
import Toast from '../components/Toast';

const BigTextPage: React.FC = () => {
  const [text, setText] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Simple ASCII generation for now, logic inside the page or simple service
  const result = generateBigText(text);

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setShowToast(true);
  };

  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <Helmet>
        <title>Letras Grandes ASCII (Big Text Art) - LetrasPro</title>
        <meta name="description" content="Generador de letras gigantes hechas con símbolos. Crea carteles ASCII grandes para copiar y pegar en comentarios de Facebook o YouTube." />
        <link rel="canonical" href="https://conversordeletrasbonitas.org/letras-grandes" />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
           <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
            <Type size={16} /> Arte ASCII
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
            Letras Gigantes
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Convierte tu texto en arte ASCII gigante. Perfecto para destacar en comentarios de YouTube, Facebook o Reddit.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
             <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Tu Texto</label>
             <div className="flex gap-2">
               <input 
                 type="text" 
                 value={text}
                 onChange={(e) => setText(e.target.value)}
                 placeholder="HOLA"
                 className="flex-grow px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-lg font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                 maxLength={15}
               />
               <button onClick={() => setText('')} className="p-3 text-slate-400 hover:text-red-500 bg-slate-100 dark:bg-slate-700 rounded-xl transition-colors"><Trash2 size={20} /></button>
             </div>
             <p className="text-xs text-slate-400 mt-2 text-right">Máximo 15 caracteres para evitar rupturas de línea</p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 overflow-x-auto border border-slate-800 shadow-2xl relative group min-h-[200px] flex items-center justify-center">
             {text ? (
               <pre className="font-mono text-xs sm:text-sm md:text-base text-green-400 leading-none whitespace-pre select-all text-center">
                 {result}
               </pre>
             ) : (
               <span className="text-slate-600 italic font-mono">...el arte aparecerá aquí...</span>
             )}
             
             {text && (
               <button 
                  onClick={copyToClipboard}
                  className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition-colors"
                  title="Copiar"
               >
                 <Copy size={20} />
               </button>
             )}
          </div>
        </div>

      </div>
      <Toast message="¡Arte ASCII copiado!" isVisible={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};

export default BigTextPage;