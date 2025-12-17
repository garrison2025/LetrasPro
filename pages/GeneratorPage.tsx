import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PageConfig } from '../types';
import { PAGE_CONFIGS } from '../constants';
import { FONTS, convertText, getDisplaySegments } from '../services/fontMaps';
import { DECORATORS, applyDecoration } from '../services/decorators';
import { KAOMOJIS } from '../data/kaomojis';
import FontCard, { ViewMode } from '../components/FontCard';
import HistoryBar from '../components/HistoryBar';
import Toast from '../components/Toast';
import { Sparkles, Type, Star, ChevronDown, Loader2, Zap, Check, Heart, Shield, Smartphone, Palette, ChevronRight, Home, Trash2, ArrowUp, LayoutList, Instagram, MessageCircle, ArrowRightCircle, AlertCircle, Wand2, Smile, X, Info, Search, Filter } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

interface GeneratorPageProps {
  config: PageConfig;
}

const ITEMS_PER_PAGE = 24;
const INSTAGRAM_BIO_LIMIT = 150;

const SYMBOLS = ['★', '⚡', '꧂', '❤', '✈', '☠', '✔', '⚔', '✿', '✨', '❣', 'ღ', '♕', '©'];

const TONES = ['Todos', 'Elegante', 'Gaming', 'Cute', 'Urbano', 'Aesthetic'];

const GeneratorPage: React.FC<GeneratorPageProps> = ({ config }) => {
  const location = useLocation();
  const [inputText, setInputText] = useState(() => {
    try { return localStorage.getItem('let_pro_input') || ''; } catch (e) { return ''; }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTone, setActiveTone] = useState('Todos');

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
  const [isTyping, setIsTyping] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isKaomojiOpen, setIsKaomojiOpen] = useState(false);
  const [activeKaomojiTab, setActiveKaomojiTab] = useState(KAOMOJIS[0].id);
  
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

  useEffect(() => {
    setIsTyping(inputText !== debouncedText);
  }, [inputText, debouncedText]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <div className="flex flex-col pb-20 dark:bg-slate-900 transition-colors duration-300">
      <Helmet>
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
      </Helmet>

      {/* Hero Section */}
      <div className="pt-12 pb-20 px-4 text-center">
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">
          {config.heading}
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400">{config.description}</p>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 -mt-10 relative z-20">
        
        {/* Main Input Area */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden mb-8">
          <div className="p-6">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribe tu frase aquí..."
              className="w-full text-2xl sm:text-3xl font-bold bg-transparent border-none focus:ring-0 placeholder:opacity-30 dark:text-white min-h-[120px] resize-none"
            />
            <div className="flex items-center justify-between mt-4">
               <div className="flex gap-2">
                 {SYMBOLS.map(s => (
                   <button key={s} onClick={() => insertSymbol(s)} className="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-xl hover:bg-primary-50 transition-colors text-lg">{s}</button>
                 ))}
               </div>
               <div className="flex items-center gap-4">
                 <span className={`text-xs font-black ${inputText.length > INSTAGRAM_BIO_LIMIT ? 'text-red-500' : 'text-slate-400'}`}>
                   {inputText.length} / {INSTAGRAM_BIO_LIMIT}
                 </span>
                 {inputText && <button onClick={() => setInputText('')} className="text-slate-400 hover:text-red-500"><Trash2 size={20} /></button>}
               </div>
            </div>
          </div>
          
          {/* Quick Filters / Search */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border-t border-slate-100 dark:border-slate-700 flex flex-wrap gap-4 items-center">
             <div className="relative flex-grow max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Buscar estilo..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-primary-500 transition-all"
                />
             </div>
             
             <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {TONES.map(t => (
                  <button
                    key={t}
                    onClick={() => setActiveTone(t)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeTone === t ? 'bg-primary-600 text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                  >
                    {t}
                  </button>
                ))}
             </div>

             <div className="flex items-center gap-2 ml-auto">
                <select 
                  value={activeDecorator}
                  onChange={(e) => setActiveDecorator(e.target.value)}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold p-2 focus:ring-0"
                >
                  {DECORATORS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
                <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                   <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-slate-200 dark:bg-slate-700' : ''}`}><LayoutList size={14}/></button>
                   <button onClick={() => setViewMode('instagram')} className={`p-1.5 rounded-lg ${viewMode === 'instagram' ? 'bg-slate-200 dark:bg-slate-700' : ''}`}><Instagram size={14}/></button>
                </div>
             </div>
          </div>
        </div>

        <HistoryBar history={history} onClear={() => setHistory([])} onSelect={setInputText} />

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleFonts.map((font) => {
            const mappedText = convertText(debouncedText || 'Vista Previa', font.map);
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
          <div className="mt-12 text-center">
            <button 
              onClick={() => setVisibleCount(v => v + ITEMS_PER_PAGE)}
              className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl hover:scale-105 transition-transform"
            >
              Cargar más estilos
            </button>
          </div>
        )}
      </div>

      <Toast message="¡Texto copiado!" isVisible={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};

export default GeneratorPage;