import React, { useState } from 'react';
import { Copy, EyeOff, Info } from 'lucide-react';
import Toast from '../components/Toast';

const InvisibleTextPage: React.FC = () => {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = (char: string) => {
    navigator.clipboard.writeText(char);
    setShowToast(true);
  };

  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 dark:bg-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
            <EyeOff size={16} /> Carácter Oculto
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
            Texto Invisible
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Copia caracteres vacíos para enviar mensajes en blanco en WhatsApp o ponerte un nick invisible en Free Fire.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Main Card */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl text-center">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Espacio Invisible (Recomendado)</h3>
            
            <div className="bg-slate-100 dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 mb-6 relative group">
               <span className="text-slate-400 italic select-none">
                 ( El texto invisible está aquí )
               </span>
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-xl">
                 <span className="font-bold text-slate-900 dark:text-white">U+3164</span>
               </div>
            </div>

            <button 
              onClick={() => handleCopy('\u3164')}
              className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary-600/20 flex items-center justify-center gap-2"
            >
              <Copy size={20} /> Copiar Carácter
            </button>
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">Funciona en: Free Fire, WhatsApp, Facebook</p>
          </div>

          {/* Other Options */}
          <div className="space-y-4">
            {[
              { label: 'Espacio Pequeño (Zero Width)', char: '\u200B', desc: 'Para ocultar enlaces o trucos de formato' },
              { label: 'Espacio Braille (Pattern Blank)', char: '\u2800', desc: 'Alternativa si el primero no funciona' },
              { label: 'Espacio Largo', char: '\u3000', desc: 'Espacio ideográfico japonés' }
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">{item.label}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                </div>
                <button 
                  onClick={() => handleCopy(item.char)}
                  className="p-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900 dark:hover:text-primary-300 rounded-xl transition-colors"
                >
                  <Copy size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-6 rounded-2xl flex gap-4">
           <Info className="flex-shrink-0 text-blue-600 dark:text-blue-400" />
           <div className="text-sm text-blue-800 dark:text-blue-200">
             <p className="font-bold mb-1">¿Cómo usar en Free Fire?</p>
             <p>Para tener un nombre con espacio, copia el carácter "U+3164". Luego pégalo en el cuadro de cambio de nombre. Puedes combinarlo: "Juan[ESPACIO]Pro".</p>
           </div>
        </div>
      </div>
      <Toast message="¡Copiado al portapapeles!" isVisible={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};

export default InvisibleTextPage;