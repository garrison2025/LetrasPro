import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PageConfig, TextCase } from '../types';
import { FONTS, convertText, getDisplaySegments } from '../services/fontMaps';
import { DECORATORS, applyDecoration } from '../services/decorators';
import { BIO_TEMPLATES } from '../data/bioTemplates';
import FontCard, { ViewMode } from '../components/FontCard';
import HistoryBar from '../components/HistoryBar';
import Toast from '../components/Toast';
import { Trash2, Search, LayoutList, Instagram, Wand2, Star, ShieldCheck, AlertCircle, Info, Hash, Type, MessageCircle, Zap, Palette, Smartphone, Check, ChevronDown } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

interface GeneratorPageProps {
  config: PageConfig;
}

const ITEMS_PER_PAGE = 24;
const INSTAGRAM_BIO_LIMIT = 150;

const QUICK_SYMBOLS = ['★', '✨', '⚡', '꧁', '꧂', '❤', '☠', '⚔', '✿', '❣', 'ღ', '♕', '➳', '➤', '•', '░', '【', '】'];
const TONES = ['Todos', 'Elegante', 'Gaming', 'Cute', 'Urbano', 'Aesthetic', 'Profesional', 'Tatuajes'];

const GeneratorPage: React.FC<GeneratorPageProps> = ({ config }) => {
  const location = useLocation();
  const [inputText, setInputText] = useState(() => {
    try { return localStorage.getItem('let_pro_input') || ''; } catch (e) { return ''; }
  });
  const [textCase, setTextCase] = useState<TextCase>('original');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTone, setActiveTone] = useState('Todos');
  const [showBioTemplates, setShowBioTemplates] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('let_pro_favs');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  const [history, setHistory] = useState<{fontName: string, text: string, timestamp: number}[]>(() => {
    try {
      const saved = localStorage.getItem('let_pro_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [activeDecorator, setActiveDecorator] = useState<string>('none');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [showToast, setShowToast] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const debouncedText = useDebounce(inputText, 300);
  
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
    window.scrollTo(0, 0);
  }, [config.path, location.pathname]);

  useEffect(() => {
    localStorage.setItem('let_pro_input', inputText);
    localStorage.setItem('let_pro_favs', JSON.stringify(favorites));
    localStorage.setItem('let_pro_history', JSON.stringify(history));
  }, [inputText, favorites, history]);

  const toggleFavorite = (fontId: string) => {
    setFavorites(prev => prev.includes(fontId) ? prev.filter(id => id !== fontId) : [...prev, fontId]);
  };

  const addToHistory = (fontName: string, text: string) => {
    setHistory(prev => [{ fontName, text, timestamp: Date.now() }, ...prev.filter(item => item.text !== text)].slice(0, 10));
    setShowToast(true);
  };

  const insertSymbol = (symbol: string) => {
    const start = textareaRef.current?.selectionStart || 0;
    const end = textareaRef.current?.selectionEnd || 0;
    const newText = inputText.substring(0, start) + symbol + inputText.substring(end);
    setInputText(newText);
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(start + symbol.length, start + symbol.length);
    }, 0);
  };

  const applyBioTemplate = (layout: string) => {
    const text = inputText || 'Tu Nombre';
    const filled = layout.replace('{text}', text);
    setInputText(filled);
    setShowBioTemplates(false);
  };

  const transformText = (text: string, mode: TextCase): string => {
    if (!text) return '';
    switch (mode) {
      case 'upper': return text.toUpperCase();
      case 'lower': return text.toLowerCase();
      case 'title': return text.replace(/\b\w/g, c => c.toUpperCase());
      default: return text;
    }
  };

  const filteredFonts = useMemo(() => {
    let result = FONTS.filter(config.filter);
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(f => f.name.toLowerCase().includes(q) || f.category.includes(q));
    }
    
    if (activeTone !== 'Todos') {
      result = result.filter(f => f.tags?.includes(activeTone));
    }

    return result.sort((a, b) => {
      const aFav = favorites.includes(a.id);
      const bFav = favorites.includes(b.id);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });
  }, [config.filter, favorites, searchQuery, activeTone]);

  const visibleFonts = filteredFonts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredFonts.length;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap': return <Zap size={24} />;
      case 'palette': return <Palette size={24} />;
      case 'smartphone': return <Smartphone size={24} />;
      case 'shield': return <ShieldCheck size={24} />;
      case 'star': return <Star size={24} />;
      case 'heart': return <Star size={24} />;
      default: return <Check size={24} />;
    }
  };

  return (
    <div className="flex flex-col pb-20 dark:bg-slate-900 transition-colors duration-300">
      <Helmet>
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
      </Helmet>

      <div className="pt-12 pb-20 px-4 text-center">
        <h1 className="text-4xl sm:text-7xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">
          {config.heading}
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400 font-medium">
          {config.description}
        </p>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 -mt-10 relative z-20">
        
        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <div className="flex gap-2 items-center text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 rounded-full">
                <Type size={14} /> Panel de Control
              </div>
              <div className="flex gap-2">
                {(['upper', 'lower', 'title'] as TextCase[]).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setTextCase(textCase === mode ? 'original' : mode)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${textCase === mode ? 'bg-primary-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-900 text-slate-500'}`}
                  >
                    {mode === 'upper' ? 'AB' : mode === 'lower' ? 'ab' : 'Ab'}
                  </button>
                ))}
                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                <button 
                  onClick={() => setShowBioTemplates(!showBioTemplates)}
                  className="flex items-center gap-2 px-4 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 rounded-xl text-[10px] font-black uppercase tracking-tighter hover:bg-primary-100 transition-colors"
                >
                  <Wand2 size={14} /> Plantillas
                </button>
              </div>
            </div>

            {showBioTemplates && (
              <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
                {BIO_TEMPLATES.map(bt => (
                  <button
                    key={bt.id}
                    onClick={() => applyBioTemplate(bt.layout)}
                    className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-3xl text-left hover:border-primary-400 hover:shadow-lg transition-all group"
                  >
                    <div className="text-[10px] font-black text-primary-500 uppercase mb-1">{bt.category}</div>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">{bt.name}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1 italic">{bt.layout.substring(0, 30)}...</div>
                  </button>
                ))}
              </div>
            )}

            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribe tu mensaje o nombre aquí..."
              className="w-full text-2xl sm:text-5xl font-black bg-transparent border-none focus:ring-0 placeholder:opacity-10 dark:text-white min-h-[140px] resize-none leading-tight"
            />
            
            <div className="flex flex-wrap items-center justify-between gap-6 mt-8 pt-8 border-t border-slate-50 dark:border-slate-700/50">
               <div className="flex flex-wrap gap-2">
                 {QUICK_SYMBOLS.map(s => (
                   <button 
                    key={s} 
                    onClick={() => insertSymbol(s)} 
                    className="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 transition-all text-base font-bold border border-transparent hover:border-primary-100"
                   >
                     {s}
                   </button>
                 ))}
               </div>
               <div className="flex items-center gap-6">
                 <div className="flex flex-col items-end">
                   <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                     <Instagram size={12} /> Instagram Bio
                   </div>
                   <div className="flex items-baseline gap-1">
                     <span className={`text-2xl font-black ${inputText.length > INSTAGRAM_BIO_LIMIT ? 'text-red-600' : 'text-slate-900 dark:text-white'}`}>
                       {inputText.length}
                     </span>
                     <span className="text-slate-300 dark:text-slate-600 font-bold">/ {INSTAGRAM_BIO_LIMIT}</span>
                   </div>
                 </div>
                 {inputText && (
                   <button onClick={() => setInputText('')} className="p-4 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-3xl hover:bg-red-100 transition-all active:scale-90">
                     <Trash2 size={24} />
                   </button>
                 )}
               </div>
            </div>
          </div>
          
          <div className="bg-slate-50/50 dark:bg-slate-900/30 p-5 border-t border-slate-100 dark:border-slate-700 flex flex-wrap gap-4 items-center">
             <div className="relative flex-grow max-sm:max-w-none max-w-sm">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Filtrar por nombre o estilo..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-3 bg-white dark:bg-slate-800 rounded-[1.5rem] border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:ring-2 focus:ring-primary-500 outline-none transition-all shadow-sm"
                />
             </div>
             
             <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-1">
                {TONES.map(t => (
                  <button
                    key={t}
                    onClick={() => setActiveTone(t)}
                    className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all whitespace-nowrap ${activeTone === t ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-primary-200 active:scale-95'}`}
                  >
                    {t}
                  </button>
                ))}
             </div>

             <div className="flex items-center gap-3 ml-auto">
                <div className="flex bg-white dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                   <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-600' : 'text-slate-400 hover:text-slate-600'}`} title="Vista de lista"><LayoutList size={20}/></button>
                   <button onClick={() => setViewMode('instagram')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'instagram' ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-600' : 'text-slate-400 hover:text-slate-600'}`} title="Vista Mockup Instagram"><Instagram size={20}/></button>
                   <button onClick={() => setViewMode('whatsapp')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'whatsapp' ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-600' : 'text-slate-400 hover:text-slate-600'}`} title="Vista Mockup WhatsApp"><MessageCircle size={20}/></button>
                </div>
             </div>
          </div>
        </div>

        <HistoryBar history={history} onClear={() => setHistory([])} onSelect={setInputText} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleFonts.map((font) => {
            const baseText = debouncedText || 'Vista Previa';
            const transformed = transformText(baseText, textCase);
            const mappedText = convertText(transformed, font.map, font.category === 'vaporwave');
            const finalRawText = applyDecoration(mappedText, activeDecorator);
            const segments = getDisplaySegments(finalRawText, {});
            
            return (
              <FontCard
                key={font.id}
                font={font}
                rawText={finalRawText}
                displaySegments={segments}
                isFavorite={favorites.includes(font.id)}
                viewMode={viewMode}
                onToggleFavorite={() => toggleFavorite(font.id)}
                onCopy={() => addToHistory(font.name, finalRawText)}
              />
            );
          })}
        </div>

        {hasMore && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => setVisibleCount(v => v + ITEMS_PER_PAGE)}
              className="px-16 py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-[2rem] hover:scale-105 transition-all shadow-2xl shadow-slate-900/10 active:scale-95 text-lg uppercase tracking-widest"
            >
              Explorar más estilos
            </button>
          </div>
        )}

        {/* SEO CONTENT SECTIONS */}
        <div className="mt-32 space-y-24">
          
          {/* Features Section */}
          <section>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">¿Por qué usar LetrasPro?</h2>
              <div className="w-20 h-1.5 bg-primary-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {config.whyFeatures.map((f, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-700 hover:scale-105 transition-transform">
                  <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 rounded-2xl flex items-center justify-center mb-6">
                    {getIcon(f.icon)}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">{f.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How to use section */}
          <section className="bg-slate-900 text-white rounded-[3rem] p-10 sm:p-20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                   <h2 className="text-4xl sm:text-6xl font-black mb-8 leading-tight">Cómo usar el Conversor <br/><span className="text-primary-400">Paso a Paso</span></h2>
                   <p className="text-slate-400 text-lg font-medium mb-12">{config.content}</p>
                </div>
                <div className="space-y-6">
                   {config.howToSteps.map((step, i) => (
                     <div key={i} className="flex gap-6 items-start">
                        <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-black flex-shrink-0">{i + 1}</div>
                        <p className="text-lg text-slate-200 font-bold">{step}</p>
                     </div>
                   ))}
                </div>
             </div>
          </section>

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto">
             <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">Preguntas Frecuentes</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Resolvemos tus dudas sobre el conversor de letras bonitas.</p>
            </div>
            <div className="space-y-4">
               {config.faqs.map((faq, i) => (
                 <div key={i} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden transition-all">
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    >
                      <span className="text-lg font-black text-slate-800 dark:text-white">{faq.question}</span>
                      <ChevronDown className={`text-primary-600 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-8 pb-8 animate-fade-in">
                        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                 </div>
               ))}
            </div>
          </section>

        </div>
      </div>

      <Toast message="¡Texto copiado al portapapeles!" isVisible={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};

export default GeneratorPage;