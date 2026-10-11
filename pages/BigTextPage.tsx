import React, { useState } from 'react';
import { PageMetadata as Helmet } from '../components/PageMetadata';
import { Copy, Type, Trash2 } from 'lucide-react';
import { generateBigText } from '../services/bigFonts';
import { truncateText } from '../services/text';
import Toast from '../components/Toast';
import { useClipboard } from '../hooks/useClipboard';

const BigTextPage: React.FC = () => {
  const [text, setText] = useState('');
  const { copy, toastProps } = useClipboard("¡Arte ASCII copiado!");

  // Simple ASCII generation for now, logic inside the page or simple service
  const result = generateBigText(text);

  const copyToClipboard = () => {
    if (!result) return;
    void copy(result);
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
             <label htmlFor="big-text-input" className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Tu Texto</label>
             <div className="flex gap-2">
               <input 
                 type="text" 
                 id="big-text-input" value={text}
                 onChange={(e) => setText(truncateText(e.target.value))}
                 placeholder="HOLA"
                 className="min-w-0 flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-lg font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                 maxLength={15}
               />
               <button aria-label="Borrar texto" onClick={() => setText('')} className="shrink-0 p-3 text-slate-600 dark:text-slate-300 hover:text-red-600 bg-slate-100 dark:bg-slate-700 rounded-xl transition-colors"><Trash2 size={20} /></button>
             </div>
             <p className="text-xs text-slate-400 mt-2 text-right">Máximo 15 caracteres. Admite letras, números y acentos; otros símbolos se conservan sin ampliar.</p>
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
                  title="Copiar" aria-label="Copiar arte ASCII"
               >
                 <Copy size={20} />
               </button>
             )}
          </div>
        </div>

        <section className="mt-12 prose prose-slate dark:prose-invert max-w-none" aria-labelledby="big-text-guide">
          <h2 id="big-text-guide">Cómo conservar la forma de las letras grandes</h2>
          <p>Escribe una palabra corta, como HOLA, y copia el bloque completo. El resultado contiene varias líneas de símbolos: no es una imagen ni una fuente instalada. Pégalo en un editor que conserve los saltos de línea y usa una tipografía monoespaciada, donde cada carácter ocupa el mismo ancho.</p>
          <figure>
            <figcaption>Ejemplo generado con la entrada HOLA</figcaption>
            <pre className="overflow-x-auto text-xs whitespace-pre" data-tool-example>{generateBigText('HOLA')}</pre>
          </figure>
          <h3>Acentos, números y límites</h3>
          <p>La entrada admite hasta 15 caracteres. Las letras se convierten a mayúsculas; las vocales acentuadas, la Ü y la Ñ añaden una fila para la marca. Los símbolos sin dibujo propio se conservan sin ampliar. Por ejemplo, compara ANO con AÑO antes de copiar para comprobar la tilde.</p>
          <h3>Si el dibujo se desordena al pegar</h3>
          <p>Comprueba si la aplicación elimina espacios, cambia de fuente o divide las líneas por falta de ancho. Prueba una palabra más corta y conserva todos los saltos. En Facebook o YouTube la vista final puede ser distinta de esta muestra; revisa el borrador y evita publicar un bloque que dificulte la lectura del resto del mensaje.</p>
          <p>Para letras decorativas de una sola línea, usa el <a href="/">conversor de letras bonitas</a>.</p>
        </section>
      </div>
      <Toast {...toastProps} />
    </div>
  );
};

export default BigTextPage;
