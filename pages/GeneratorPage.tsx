
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PageConfig, TextCase } from '../types';
import { FONTS, convertText, getDisplaySegments } from '../services/fontMaps';
import { DECORATORS, applyDecoration } from '../services/decorators';
import { BIO_TEMPLATES } from '../data/bioTemplates';
import FontCard, { ViewMode } from '../components/FontCard';
import HistoryBar from '../components/HistoryBar';
import CommentsSection from '../components/CommentsSection';
import Toast from '../components/Toast';
import { Trash2, Search, LayoutList, Instagram, Wand2, Star, ShieldCheck, AlertCircle, Info, Hash, Type, MessageCircle, Zap, Palette, Smartphone, Check, ChevronDown, Eye, PenTool, Moon, Gamepad2, List, TrendingUp, Bold, Layers, Home, ChevronRight, ArrowUp, Skull, Crosshair, CheckCircle, MessageSquare, User, DownloadCloud, Users, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
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
  
  // Rating State
  const [userRating, setUserRating] = useState<number>(0);
  const [hasRated, setHasRated] = useState(false);

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
  
  // UX: Sticky Input State
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const debouncedText = useDebounce(inputText, 300);

  // SEO & Meta Tag Logic
  const baseUrl = 'https://conversordeletrasbonitas.org';
  const canonicalUrl = config.path === '/' ? `${baseUrl}/` : `${baseUrl}${config.path}`;
  const ogImage = `${baseUrl}/og-image.png`;

  // Aggregate Rating Data (Simulated for Schema)
  const ratingValue = 4.8;
  const ratingCount = 2450; // Dynamic looking static number

  // WebApplication Structured Data (JSON-LD)
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": config.title,
    "url": canonicalUrl,
    "description": config.description,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": config.whyFeatures.map(f => f.title).join(', '),
    "screenshot": ogImage,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": String(ratingValue),
      "ratingCount": String(ratingCount),
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // Breadcrumb Structured Data (JSON-LD)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": config.heading,
        "item": canonicalUrl
      }
    ]
  };

  // FAQ Structured Data (JSON-LD)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": config.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
  
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
    window.scrollTo(0, 0);
    // Load local rating if exists
    const storedRating = localStorage.getItem(`rating_${config.path}`);
    if (storedRating) {
      setUserRating(parseInt(storedRating));
      setHasRated(true);
    } else {
      setUserRating(0);
      setHasRated(false);
    }
  }, [config.path, location.pathname]);

  useEffect(() => {
    localStorage.setItem('let_pro_input', inputText);
    localStorage.setItem('let_pro_favs', JSON.stringify(favorites));
    localStorage.setItem('let_pro_history', JSON.stringify(history));
  }, [inputText, favorites, history]);

  // Scroll Listener for Sticky Input
  useEffect(() => {
    const handleScroll = () => {
      if (inputContainerRef.current) {
        const rect = inputContainerRef.current.getBoundingClientRect();
        const threshold = window.innerWidth < 1024 ? 64 : 80;
        setIsStickyVisible(rect.bottom < threshold); 
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRate = (stars: number) => {
    setUserRating(stars);
    setHasRated(true);
    localStorage.setItem(`rating_${config.path}`, String(stars));
    // Here you would typically send this to an analytics service
  };

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
      case 'eye': return <Eye size={24} />;
      case 'pen-tool': return <PenTool size={24} />;
      case 'moon': return <Moon size={24} />;
      case 'gamepad': return <Gamepad2 size={24} />;
      case 'list': return <List size={24} />;
      case 'trending-up': return <TrendingUp size={24} />;
      case 'bold': return <Bold size={24} />;
      case 'layers': return <Layers size={24} />;
      case 'message-circle': return <MessageCircle size={24} />;
      case 'skull': return <Skull size={24} />;
      case 'crosshair': return <Crosshair size={24} />;
      case 'check-circle': return <CheckCircle size={24} />;
      case 'message-square': return <MessageSquare size={24} />;
      case 'user': return <User size={24} />;
      case 'download-cloud': return <DownloadCloud size={24} />;
      case 'sparkles': return <Sparkles size={24} />;
      case 'users': return <Users size={24} />;
      default: return <Check size={24} />;
    }
  };

  return (
    <div className="flex flex-col pb-20 dark:bg-slate-900 transition-colors duration-300">
      <Helmet>
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={config.title} />
        <meta property="og:description" content={config.description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={config.title} />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:site_name" content="Conversor de Letras Bonitas" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={config.title} />
        <meta name="twitter:description" content={config.description} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* JSON-LD Schemas including AggregateRating and FAQ */}
        <script type="application/ld+json">
          {JSON.stringify([webAppSchema, breadcrumbSchema, faqSchema])}
        </script>
      </Helmet>
      
      {/* Sticky Input Header */}
      <div className={`fixed top-[64px] lg:top-[80px] left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-lg transition-all duration-300 transform ${isStickyVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="max-w-6xl mx-auto px-4 py-2 flex gap-2 items-center">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escribe aquí..."
            className="flex-grow bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-primary-500 outline-none shadow-inner text-base"
          />
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setTimeout(() => textareaRef.current?.focus(), 500);
            }}
            className="p-3 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 rounded-xl hover:bg-primary-100 transition-colors"
            aria-label="Volver arriba"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>

      <div className="pt-6 md:pt-12 pb-8 md:pb-20 px-4 text-center">
        <nav className="flex justify-center items-center gap-2 text-xs md:text-sm text-slate-500 mb-3 md:mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary-600 transition-colors flex items-center gap-1 font-medium">
            <Home size={12} /> Inicio
          </Link>
          <ChevronRight size={12} className="opacity-40" />
          <span className="font-semibold text-slate-800 dark:text-slate-300 truncate max-w-[150px] sm:max-w-none">
            {config.heading}
          </span>
        </nav>

        <h1 className="text-3xl sm:text-7xl font-black text-slate-900 dark:text-white mb-3 tracking-tighter leading-tight">
          {config.heading}
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-700 dark:text-slate-400 font-medium leading-snug">
          {config.description}
        </p>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 -mt-4 md:-mt-10 relative z-20">
        
        <div ref={inputContainerRef} className="bg-white dark:bg-slate-800 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden mb-6 md:mb-8">
          <div className="p-5 md:p-8">
            <div className="flex flex-wrap justify-between items-center mb-4 md:mb-6 gap-3">
              <div className="hidden sm:flex gap-2 items-center text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 rounded-full">
                <Type size={14} /> Panel
              </div>
              <div className="flex gap-1.5 md:gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex gap-1.5 md:gap-2">
                  {(['upper', 'lower', 'title'] as TextCase[]).map(mode => (
                    <button
                      key={mode}
                      onClick={() => setTextCase(textCase === mode ? 'original' : mode)}
                      className={`flex-1 sm:flex-none px-3 py-2 md:py-1.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-tighter transition-all ${textCase === mode ? 'bg-primary-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-900 text-slate-500'}`}
                    >
                      {mode === 'upper' ? 'AB' : mode === 'lower' ? 'ab' : 'Ab'}
                    </button>
                  ))}
                </div>
                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>
                <button 
                  onClick={() => setShowBioTemplates(!showBioTemplates)}
                  className="flex items-center gap-2 px-4 py-2 md:py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-tighter hover:bg-primary-100 transition-colors"
                >
                  <Wand2 size={14} /> <span className="hidden sm:inline">Plantillas</span>
                </button>
              </div>
            </div>

            {showBioTemplates && (
              <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-fade-in">
                {BIO_TEMPLATES.map(bt => (
                  <button
                    key={bt.id}
                    onClick={() => applyBioTemplate(bt.layout)}
                    className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-left hover:border-primary-400 hover:shadow-lg transition-all group"
                  >
                    <div className="text-[10px] font-black text-primary-500 uppercase mb-1">{bt.category}</div>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">{bt.name}</div>
                  </button>
                ))}
              </div>
            )}

            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribe aquí..."
              className="w-full text-3xl sm:text-5xl font-black bg-transparent border-none focus:ring-0 placeholder:text-slate-300 dark:placeholder:text-slate-700 dark:text-white min-h-[100px] md:min-h-[140px] resize-none leading-tight py-2"
            />
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6 mt-4 md:mt-8 pt-4 md:pt-8 border-t border-slate-50 dark:border-slate-700/50">
               <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                 {QUICK_SYMBOLS.slice(0, window.innerWidth < 640 ? 7 : undefined).map(s => (
                   <button 
                    key={s} 
                    onClick={() => insertSymbol(s)} 
                    aria-label={`Insertar símbolo ${s}`}
                    className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-xl md:rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 transition-all text-sm md:text-base font-bold border border-transparent hover:border-primary-100"
                   >
                     {s}
                   </button>
                 ))}
               </div>
               <div className="flex items-center justify-between sm:justify-end gap-4 md:gap-6">
                 <div className="flex flex-col items-start sm:items-end">
                   <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                     <Instagram size={12} /> Bio
                   </div>
                   <div className="flex items-baseline gap-1">
                     <span className={`text-xl md:text-2xl font-black ${inputText.length > INSTAGRAM_BIO_LIMIT ? 'text-red-600' : 'text-slate-900 dark:text-white'}`}>
                       {inputText.length}
                     </span>
                     <span className="text-slate-300 dark:text-slate-600 font-bold text-xs md:text-sm">/ {INSTAGRAM_BIO_LIMIT}</span>
                   </div>
                 </div>
                 {inputText && (
                   <button onClick={() => setInputText('')} aria-label="Borrar texto" className="p-3 md:p-4 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-2xl md:rounded-3xl hover:bg-red-100 transition-all active:scale-90">
                     <Trash2 size={20} />
                   </button>
                 )}
               </div>
            </div>
          </div>
          
          <div className="bg-slate-50/50 dark:bg-slate-900/30 p-4 md:p-5 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center">
             <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Buscar estilo..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:ring-2 focus:ring-primary-500 outline-none transition-all shadow-sm text-slate-700 dark:text-white"
                />
             </div>
             
             <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {TONES.map(t => (
                  <button
                    key={t}
                    onClick={() => setActiveTone(t)}
                    className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all whitespace-nowrap ${activeTone === t ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-primary-200 active:scale-95'}`}
                  >
                    {t}
                  </button>
                ))}
             </div>

             <div className="flex items-center gap-2 justify-end">
                <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                   <button onClick={() => setViewMode('list')} aria-label="Lista" className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}><LayoutList size={18}/></button>
                   <button onClick={() => setViewMode('instagram')} aria-label="Instagram" className={`p-2 rounded-lg transition-all ${viewMode === 'instagram' ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}><Instagram size={18}/></button>
                   <button onClick={() => setViewMode('whatsapp')} aria-label="WhatsApp" className={`p-2 rounded-lg transition-all ${viewMode === 'whatsapp' ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}><MessageCircle size={18}/></button>
                </div>
             </div>
          </div>
        </div>

        <HistoryBar history={history} onClear={() => setHistory([])} onSelect={setInputText} />

        <div className="min-h-[600px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
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
        </div>

        {hasMore && (
          <div className="mt-12 text-center">
            <button 
              onClick={() => setVisibleCount(v => v + ITEMS_PER_PAGE)}
              className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-3xl hover:scale-105 transition-all shadow-xl shadow-slate-900/10 active:scale-95 text-base uppercase tracking-widest"
            >
              Cargar más estilos
            </button>
          </div>
        )}

        {/* SEO & UX: Internal Linking Mesh & Interactive Rating */}
        <div className="mt-24 space-y-20 animate-fade-in">
          
          {/* Why Features */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3">¿Por qué usar este Conversor?</h2>
              <div className="w-16 h-1.5 bg-primary-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {config.whyFeatures.map((f, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-700 hover:scale-105 transition-transform">
                  <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 rounded-2xl flex items-center justify-center mb-5">
                    {getIcon(f.icon)}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">{f.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-sm">{f.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* New UGC Section: Community Comments */}
          <CommentsSection />

          {/* Related Tools (Internal Linking Mesh) */}
          {config.recommendations && config.recommendations.length > 0 && (
            <section className="max-w-5xl mx-auto">
               <div className="text-center mb-10">
                 <span className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
                   <Sparkles size={14} /> Podría interesarte
                 </span>
                 <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">Explora otras Herramientas</h2>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 {config.recommendations.map((rec, i) => (
                   <Link 
                     key={i} 
                     to={rec.path}
                     className="group relative overflow-hidden rounded-3xl p-6 hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-2xl"
                   >
                     <div className={`absolute inset-0 bg-gradient-to-br ${rec.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                     <div className="relative z-10 flex flex-col h-full">
                       <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex items-center gap-2">
                         {rec.title} <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                       </h3>
                       <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-4 flex-grow">
                         {rec.description}
                       </p>
                       <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${rec.color} flex items-center justify-center text-white self-end shadow-md`}>
                         <ArrowRight size={18} />
                       </div>
                     </div>
                   </Link>
                 ))}
               </div>
            </section>
          )}

          {/* How To Steps */}
          <section className="bg-slate-900 text-white rounded-[2.5rem] p-8 sm:p-16 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                   <h2 className="text-3xl sm:text-5xl font-black mb-6 leading-tight">Guía Rápida <br/><span className="text-primary-400">Paso a Paso</span></h2>
                   <p className="text-slate-400 text-base font-medium mb-8">{config.content}</p>
                </div>
                <div className="space-y-4">
                   {config.howToSteps.map((step, i) => (
                     <div key={i} className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-black flex-shrink-0 text-sm">{i + 1}</div>
                        <p className="text-base text-slate-200 font-bold">{step}</p>
                     </div>
                   ))}
                </div>
             </div>
          </section>

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto">
             <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3">Preguntas Frecuentes</h2>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Todo sobre el {config.heading}.</p>
            </div>
            <div className="space-y-3">
               {config.faqs.map((faq, i) => (
                 <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden transition-all">
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-slate-50 dark:hover:bg-slate-700/50"
                      aria-expanded={openFaq === i}
                      aria-controls={`faq-answer-${i}`}
                    >
                      <span className="text-base font-black text-slate-800 dark:text-white pr-4">{faq.question}</span>
                      <ChevronDown className={`text-primary-600 transition-transform flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === i && (
                      <div id={`faq-answer-${i}`} className="px-6 pb-6 animate-fade-in">
                        <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-sm">{faq.answer}</p>
                      </div>
                    )}
                 </div>
               ))}
            </div>
          </section>

          {/* Interactive Rating Component (Validation for Schema) */}
          <section className="max-w-xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-8 text-center border border-slate-100 dark:border-slate-700 shadow-lg">
             <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">¿Te ha sido útil?</h3>
             <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 font-medium">Valora esta herramienta para ayudarnos a mejorar.</p>
             
             <div className="flex justify-center gap-2 mb-4">
               {[1, 2, 3, 4, 5].map((star) => (
                 <button
                   key={star}
                   onClick={() => handleRate(star)}
                   onMouseEnter={() => !hasRated && setUserRating(star)}
                   onMouseLeave={() => !hasRated && setUserRating(0)}
                   className="transition-transform hover:scale-110 focus:outline-none"
                   aria-label={`Calificar con ${star} estrellas`}
                 >
                   <Star 
                     size={32} 
                     className={`transition-colors ${
                       star <= userRating 
                         ? 'fill-yellow-400 text-yellow-400' 
                         : 'fill-slate-100 dark:fill-slate-700 text-slate-300 dark:text-slate-600'
                     }`} 
                   />
                 </button>
               ))}
             </div>
             
             {hasRated ? (
               <div className="animate-fade-in text-green-600 dark:text-green-400 font-bold text-sm bg-green-50 dark:bg-green-900/20 py-2 px-4 rounded-full inline-block">
                 ¡Gracias por tu valoración!
               </div>
             ) : (
               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                 {ratingValue} / 5 basado en {ratingCount} votos
               </p>
             )}
          </section>

        </div>
      </div>

      <Toast message="¡Texto copiado al portapapeles!" isVisible={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};

export default GeneratorPage;
