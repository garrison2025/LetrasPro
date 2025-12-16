import React, { useState, useEffect } from 'react';
import { PageConfig } from '../types';
import { FONTS, convertText } from '../services/fontMaps';
import FontCard from '../components/FontCard';
import { Sparkles, Type, Star } from 'lucide-react';

interface GeneratorPageProps {
  config: PageConfig;
}

const GeneratorPage: React.FC<GeneratorPageProps> = ({ config }) => {
  const [inputText, setInputText] = useState('');
  const placeholder = "Escribe aquí para transformar...";

  useEffect(() => {
    document.title = config.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', config.description);
    }
    window.scrollTo(0, 0);
  }, [config]);

  const filteredFonts = FONTS.filter(config.filter);

  return (
    <div className="flex flex-col pb-20">
      {/* Hero Section */}
      <div className="relative pt-12 pb-24 lg:pt-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        
        {/* Decorative background for hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-primary-200/30 to-secondary-200/30 blur-3xl rounded-full -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wide mb-6 shadow-sm">
          <Star size={12} className="fill-primary-700" />
          Herramienta Gratuita
        </div>
        
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
          {config.heading.split(' ').map((word, i) => (
             i === 1 || i === 2 ? 
             <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">{word} </span> : 
             <span key={i}>{word} </span>
          ))}
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed font-light">
          {config.description}
        </p>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        
        {/* Sticky Input Area - Floating Glass Effect */}
        <div className="sticky top-24 z-30 mb-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden">
              <div className="flex items-start">
                 <div className="hidden sm:flex items-center justify-center w-16 h-full py-6 pl-2 text-slate-400">
                    <Type size={28} />
                 </div>
                 <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={placeholder}
                  className="block w-full border-0 bg-transparent py-6 px-4 sm:pl-2 sm:pr-20 text-slate-900 placeholder:text-slate-400 focus:ring-0 text-xl sm:text-2xl font-medium min-h-[100px] resize-none leading-relaxed"
                  rows={2}
                />
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                   <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      <Sparkles size={20} className="animate-pulse" />
                   </div>
                </div>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-3 px-2">
            <p className="text-sm font-medium text-slate-500">
              <span className="text-primary-600 font-bold">{filteredFonts.length}</span> estilos disponibles
            </p>
            <p className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
               Haz clic para copiar
            </p>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {filteredFonts.map((font) => (
            <FontCard
              key={font.id}
              font={font}
              text={convertText(inputText || 'Vista Previa', font.map)}
            />
          ))}
          
          {filteredFonts.length === 0 && (
             <div className="col-span-full py-20 text-center">
               <div className="inline-block p-4 rounded-full bg-slate-100 mb-4">
                 <Sparkles className="text-slate-400" size={32} />
               </div>
               <p className="text-slate-500 text-lg">No hay estilos disponibles para esta categoría.</p>
             </div>
          )}
        </div>

        {/* SEO Content Block - Clean Design */}
        <div className="border-t border-slate-200 pt-16">
          <article className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-primary-600">
            <h2 className="text-3xl mb-6">Sobre esta herramienta</h2>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
               <p className="leading-relaxed mb-6">{config.content}</p>
               
               <h3 className="text-xl mb-4 mt-8">¿Cómo funciona?</h3>
               <p className="mb-4">
                Este conversor no cambia la "fuente" (font-family) en el sentido tradicional de CSS. 
                Lo que hace es mapear cada letra que escribes a un símbolo Unicode que se parece a esa letra pero con un estilo diferente (negrita, cursiva, gótica, etc.).
               </p>
               
               <h3 className="text-xl mb-4 mt-8">¿Dónde puedo usar estas letras?</h3>
               <div className="grid sm:grid-cols-2 gap-4 not-prose">
                  {['Instagram Bio & Posts', 'TikTok Profiles', 'Facebook Status', 'Twitter / X', 'Game Nicknames', 'WhatsApp Messages'].map((item) => (
                    <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 text-slate-700 font-medium">
                       <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                       {item}
                    </div>
                  ))}
               </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default GeneratorPage;