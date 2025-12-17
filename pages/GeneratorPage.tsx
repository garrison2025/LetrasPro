import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PageConfig } from '../types';
import { PAGE_CONFIGS } from '../constants';
import { FONTS, convertText, getDisplaySegments } from '../services/fontMaps';
import { DECORATORS, applyDecoration } from '../services/decorators';
import { KAOMOJIS } from '../data/kaomojis'; // Import Kaomojis
import FontCard, { ViewMode } from '../components/FontCard';
import HistoryBar from '../components/HistoryBar';
import Toast from '../components/Toast';
import { Sparkles, Type, Star, ChevronDown, Loader2, Zap, Check, Heart, Shield, Smartphone, Palette, ChevronRight, Home, Trash2, ArrowUp, LayoutList, Instagram, MessageCircle, ArrowRightCircle, AlertCircle, Wand2, Smile, X } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

interface GeneratorPageProps {
  config: PageConfig;
}

const ITEMS_PER_PAGE = 24;
const INSTAGRAM_BIO_LIMIT = 150;

const SYMBOLS = [
  '★', '⚡', '꧂', '꧂', '❤', '✈', '☠', '✔', '✘', 
  '⚔', '☂', '✿', '❄', '✪', '✯', 
  '✦', '✨', '❥', '❣', 'ღ', 
  '♪', '♫', '♕', '♔', '®', '©' 
];

const GeneratorPage: React.FC<GeneratorPageProps> = ({ config }) => {
  // Input State
  const [inputText, setInputText] = useState(() => {
    try {
      return localStorage.getItem('let_pro_input') || '';
    } catch (e) {
      return '';
    }
  });

  // Favorites State
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('let_pro_favs');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // History State
  const [history, setHistory] = useState<{fontName: string, text: string, timestamp: number}[]>(() => {
    try {
      const saved = localStorage.getItem('let_pro_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // UI State
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [activeDecorator, setActiveDecorator] = useState<string>('none');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isTyping, setIsTyping] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Kaomoji Modal State
  const [isKaomojiOpen, setIsKaomojiOpen] = useState(false);
  const [activeKaomojiTab, setActiveKaomojiTab] = useState(KAOMOJIS[0].id);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const debouncedText = useDebounce(inputText, 300);
  
  // Effects
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
    window.scrollTo(0, 0);
  }, [config.path]);

  useEffect(() => {
    localStorage.setItem('let_pro_input', inputText);
  }, [inputText]);

  useEffect(() => {
    localStorage.setItem('let_pro_favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('let_pro_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (inputText !== debouncedText) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [inputText, debouncedText]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers
  const toggleFavorite = (fontId: string) => {
    setFavorites(prev => 
      prev.includes(fontId) 
        ? prev.filter(id => id !== fontId) 
        : [...prev, fontId]
    );
  };

  const addToHistory = (fontName: string, text: string) => {
    setHistory(prev => {
      const newItem = { fontName, text, timestamp: Date.now() };
      // Remove duplicate texts if exist, keep last 10
      const filtered = prev.filter(item => item.text !== text);
      return [newItem, ...filtered].slice(0, 10);
    });
    setShowToast(true);
  };

  const clearHistory = () => setHistory([]);

  const clearInput = () => {
    setInputText('');
    textareaRef.current?.focus();
  };

  const scrollToTop = () => {
    if (inputContainerRef.current) {
        const yOffset = -100; 
        const y = inputContainerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
        textareaRef.current?.focus();
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const insertSymbol = (symbol: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = inputText;

    const newText = currentText.substring(0, start) + symbol + currentText.substring(end);
    setInputText(newText);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + symbol.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, sortedFonts.length));
  };

  // Logic: Filter -> Sort (Favorites First) -> Slice
  const sortedFonts = useMemo(() => {
    const filtered = FONTS.filter(config.filter);
    return filtered.sort((a, b) => {
      const aFav = favorites.includes(a.id);
      const bFav = favorites.includes(b.id);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });
  }, [config.filter, favorites]);

  const visibleFonts = sortedFonts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedFonts.length;

  const relatedPages = useMemo(() => {
    return Object.values(PAGE_CONFIGS)
      .filter((page) => page.path !== config.path)
      .sort(() => 0.5 - Math.random()) // Shuffle for randomness (SEO Internal Linking Strategy)
      .slice(0, 3);
  }, [config.path]);

  // SEO: Internal Link Insertion Helper
  const getInternalLinkCard = (index: number) => {
    if (index === 11) { // After 12th item
        const targetPage = relatedPages[0];
        if (targetPage) return targetPage;
    }
    return null;
  };

  const placeholder = "Escribe tu texto aquí...";
  const textToProcess = debouncedText || 'Vista Previa';
  const charCount = inputText.length;
  const isOverLimit = charCount > INSTAGRAM_BIO_LIMIT;
  const isNearLimit = charCount > INSTAGRAM_BIO_LIMIT - 20;

  const canonicalUrl = `https://conversordeletrasbonitas.org${config.path === '/' ? '' : config.path}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": config.title,
      "url": canonicalUrl,
      "description": config.description,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://conversordeletrasbonitas.org/" },
        ...(config.path !== '/' ? [{ "@type": "ListItem", "position": 2, "name": config.heading, "item": canonicalUrl }] : [])
      ]
    }
  ];

  // Add HowTo Schema
  if (config.howToSteps.length > 0) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": `Cómo usar el ${config.heading}`,
      "step": config.howToSteps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "text": step
      }))
    } as any);
  }

  if (config.faqs.length > 0) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": config.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
      }))
    } as any);
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'zap': return <Zap size={24} />;
      case 'check': return <Check size={24} />;
      case 'heart': return <Heart size={24} />;
      case 'shield': return <Shield size={24} />;
      case 'smartphone': return <Smartphone size={24} />;
      case 'palette': return <Palette size={24} />;
      case 'star': default: return <Star size={24} />;
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
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* Hero */}
      <div className="relative pt-8 pb-24 lg:pt-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden dark:bg-slate-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-primary-200/30 to-secondary-200/30 dark:from-primary-900/20 dark:to-secondary-900/20 blur-3xl rounded-full -z-10" />
        <nav className="flex justify-center mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 p-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-100 dark:border-slate-700 shadow-sm">
            <li className="inline-flex items-center">
              <Link to="/" className="inline-flex items-center text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">
                <Home size={14} className="mr-1" /> Inicio
              </Link>
            </li>
            {config.path !== '/' && (
              <li>
                <div className="flex items-center">
                  <ChevronRight size={14} className="text-slate-400 dark:text-slate-600" />
                  <span className="ml-1 text-xs font-medium text-slate-700 dark:text-slate-300 md:ml-2">{config.heading}</span>
                </div>
              </li>
            )}
          </ol>
        </nav>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 text-primary-700 dark:text-primary-300 text-xs font-bold uppercase tracking-wide mb-6 shadow-sm">
          <Star size={12} className="fill-primary-700 dark:fill-primary-300" /> Herramienta Gratuita
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
          {config.heading.split(' ').map((word, i) => (
             i === 1 || i === 2 ? 
             <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">{word} </span> : 
             <span key={i}>{word} </span>
          ))}
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">{config.description}</p>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-12 relative z-20" ref={inputContainerRef}>
        
        {/* Sticky Input */}
        <div className="sticky top-20 z-30 mb-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden flex flex-col transition-colors duration-300">
              <div className="flex items-start">
                 <div className="hidden sm:flex items-center justify-center w-16 pt-6 pl-2 text-slate-400 dark:text-slate-500"><Type size={28} /></div>
                 <div className="relative flex-grow">
                   <textarea
                    ref={textareaRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={placeholder}
                    className="block w-full border-0 bg-transparent py-6 px-4 sm:pl-2 sm:pr-20 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-0 text-xl sm:text-2xl font-medium min-h-[100px] resize-none leading-relaxed"
                    rows={2}
                  />
                  
                  {/* Character Counter & Clear Button */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-3">
                     <span className={`text-xs font-bold px-2 py-1 rounded-md transition-colors ${
                       isOverLimit 
                         ? 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400' 
                         : isNearLimit 
                           ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400' 
                           : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
                     }`}>
                       {charCount} / {INSTAGRAM_BIO_LIMIT}
                       {isOverLimit && <AlertCircle size={12} className="inline ml-1 -mt-0.5" />}
                     </span>

                     {inputText.length > 0 && (
                       <button 
                         onClick={clearInput}
                         className="p-1.5 text-slate-300 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                         title="Borrar texto"
                       >
                         <Trash2 size={18} />
                       </button>
                    )}
                  </div>
                 </div>
                 
                 <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                   <div className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${isTyping ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-300' : 'bg-primary-50 text-primary-400 dark:bg-slate-800 dark:text-slate-500'}`}>
                      {isTyping ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
                   </div>
                </div>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 px-2 py-2">
                <div className="flex items-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  
                  {/* Kaomoji Button */}
                  <button 
                    onClick={() => setIsKaomojiOpen(!isKaomojiOpen)}
                    className={`flex-shrink-0 flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-bold transition-all ${isKaomojiOpen ? 'bg-primary-100 border-primary-300 text-primary-700 dark:bg-primary-900/40 dark:border-primary-700 dark:text-primary-300' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                  >
                    <Smile size={16} /> Kaomoji
                  </button>
                  
                  <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 flex-shrink-0"></div>

                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase px-2 flex-shrink-0 select-none">Símbolos:</span>
                  {SYMBOLS.map((symbol, index) => (
                    <button
                      key={index}
                      onClick={() => insertSymbol(symbol)}
                      className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-lg text-slate-700 dark:text-slate-300 shadow-sm hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:border-primary-200 dark:hover:border-primary-700 hover:text-primary-600 dark:hover:text-primary-300 hover:scale-105 active:scale-95 transition-all duration-150 select-none"
                    >
                      {symbol}
                    </button>
                  ))}
                </div>
                
                {/* Kaomoji Picker Panel */}
                {isKaomojiOpen && (
                  <div className="mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-4 animate-fade-in relative z-20">
                     <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-700 pb-2">
                       <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">Biblioteca de Kaomojis</h3>
                       <button onClick={() => setIsKaomojiOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X size={16} /></button>
                     </div>
                     <div className="flex gap-2 overflow-x-auto mb-3 pb-1 no-scrollbar">
                       {KAOMOJIS.map(cat => (
                         <button
                           key={cat.id}
                           onClick={() => setActiveKaomojiTab(cat.id)}
                           className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${activeKaomojiTab === cat.id ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
                         >
                           {cat.emoji} {cat.name}
                         </button>
                       ))}
                     </div>
                     <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-40 overflow-y-auto custom-scrollbar">
                        {KAOMOJIS.find(k => k.id === activeKaomojiTab)?.items.map((emoji, idx) => (
                          <button
                            key={idx}
                            onClick={() => { insertSymbol(emoji); setIsKaomojiOpen(false); }}
                            className="p-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-700/50 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300 rounded-lg text-center truncate border border-transparent hover:border-primary-200 dark:hover:border-primary-700 transition-all text-slate-700 dark:text-slate-300"
                            title={emoji}
                          >
                            {emoji}
                          </button>
                        ))}
                     </div>
                  </div>
                )}
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 bg-[length:200%_100%] animate-shimmer"></div>
            </div>
          </div>
          
          <div className="flex flex-col xl:flex-row justify-between items-center mt-4 gap-4 px-2">
            <div className="w-full xl:w-auto overflow-hidden">
               <HistoryBar history={history} onClear={clearHistory} onSelect={(t) => { setInputText(t); textareaRef.current?.focus(); }} />
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full xl:w-auto justify-end">
              {/* Decorator Toggle */}
              <div className="relative group z-20 flex-grow sm:flex-grow-0">
                 <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 shadow-sm">
                    <Wand2 size={16} className="text-primary-500 mr-2" />
                    <select 
                      value={activeDecorator}
                      onChange={(e) => setActiveDecorator(e.target.value)}
                      className="bg-transparent border-none text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-0 cursor-pointer py-1 pr-8"
                    >
                      {DECORATORS.map(d => (
                        <option key={d.id} value={d.id}>{d.name} {d.prefix}A{d.suffix}</option>
                      ))}
                    </select>
                 </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex-grow sm:flex-grow-0">
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    <LayoutList size={16} /> <span className="hidden sm:inline">Lista</span>
                  </button>
                  <button 
                    onClick={() => setViewMode('instagram')}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${viewMode === 'instagram' ? 'bg-gradient-to-tr from-yellow-500 to-purple-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    <Instagram size={16} /> <span className="hidden sm:inline">Bio</span>
                  </button>
                  <button 
                    onClick={() => setViewMode('whatsapp')}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${viewMode === 'whatsapp' ? 'bg-green-500 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    <MessageCircle size={16} /> <span className="hidden sm:inline">Chat</span>
                  </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {visibleFonts.map((font, index) => {
             const internalLink = getInternalLinkCard(index);
             // Apply font mapping first
             const mappedText = convertText(textToProcess, font.map);
             // Apply decoration second
             const finalRawText = applyDecoration(mappedText, activeDecorator);
             // Display segments
             const displaySegments = debouncedText || !isTyping ? getDisplaySegments(finalRawText, {}) : [];

             const card = (
               <FontCard
                 key={font.id}
                 font={font}
                 rawText={finalRawText}
                 displaySegments={displaySegments}
                 isFavorite={favorites.includes(font.id)}
                 viewMode={viewMode}
                 onToggleFavorite={() => toggleFavorite(font.id)}
                 onCopy={() => addToHistory(font.name, finalRawText)}
               />
             );

             // Inject Internal Link Card for SEO
             if (internalLink) {
                return (
                  <React.Fragment key={font.id}>
                    {card}
                    <Link to={internalLink.path} className="col-span-1 md:col-span-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-6 flex items-center justify-between text-white shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all">
                       <div>
                         <span className="text-primary-100 text-xs font-bold uppercase tracking-wider mb-1 block">Explora más estilos</span>
                         <h3 className="font-display font-bold text-2xl">{internalLink.heading}</h3>
                         <p className="text-primary-100 text-sm mt-1">Descubre nuevas fuentes para tu perfil</p>
                       </div>
                       <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                         <ArrowRightCircle size={32} />
                       </div>
                    </Link>
                  </React.Fragment>
                );
             }
             return card;
          })}
          
          {visibleFonts.length === 0 && (
             <div className="col-span-full py-20 text-center">
               <div className="inline-block p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4"><Sparkles className="text-slate-400 dark:text-slate-500" size={32} /></div>
               <p className="text-slate-500 dark:text-slate-400 text-lg">No hay estilos disponibles para esta categoría.</p>
             </div>
          )}
        </div>

        {hasMore && (
          <div className="flex justify-center mb-20">
            <button onClick={handleLoadMore} className="group flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-full shadow-sm hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300">
              Cargar más estilos <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        )}

        {/* Info Sections */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl text-slate-900 dark:text-white mb-3">¿Por qué usar esta herramienta?</h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {config.whyFeatures.map((feature, i) => (
               <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-shadow duration-300 text-center group">
                  <div className="w-14 h-14 mx-auto bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6 group-hover:scale-110 transition-transform duration-300">{getIconComponent(feature.icon)}</div>
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{feature.description}</p>
               </div>
             ))}
          </div>
        </div>

        <div className="mb-20 relative overflow-hidden bg-slate-900 dark:bg-black rounded-3xl p-8 sm:p-12 text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500/20 rounded-full blur-3xl -ml-10 -mb-10"></div>
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl mb-3">Cómo usar el generador</h2>
              <p className="text-slate-300">Sigue estos simples pasos para transformar tu texto</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {config.howToSteps.map((step, i) => (
                <div key={i} className="relative bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/15 transition-colors">
                   <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center font-bold shadow-lg">{i + 1}</div>
                   <p className="mt-2 text-slate-100 font-medium leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-16 max-w-3xl mx-auto">
           <div className="text-center mb-10">
              <span className="text-primary-600 dark:text-primary-400 font-bold uppercase tracking-wider text-sm">Ayuda</span>
              <h2 className="font-display font-bold text-3xl text-slate-900 dark:text-white mt-2">Preguntas Frecuentes</h2>
           </div>
           <div className="space-y-4">
             {config.faqs.map((faq, i) => (
               <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary-200 dark:hover:border-primary-700">
                  <button onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left focus:outline-none">
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-lg pr-4">{faq.question}</span>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center transition-transform duration-300 ${openFaqIndex === i ? 'rotate-90 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300' : 'text-slate-400 dark:text-slate-500'}`}><ChevronRight size={20} /></div>
                  </button>
                  <div className={`px-5 text-slate-600 dark:text-slate-400 leading-relaxed overflow-hidden transition-all duration-300 ${openFaqIndex === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>{faq.answer}</div>
               </div>
             ))}
           </div>
        </div>
        
        <div className="mb-20 border-t border-slate-100 dark:border-slate-800 pt-16">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl text-slate-900 dark:text-white mb-3">También te puede interesar</h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
             {relatedPages.map((page) => (
               <Link key={page.path} to={page.path} className="group block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-300">
                 <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 rounded-lg group-hover:bg-primary-600 group-hover:text-white transition-colors"><Sparkles size={20} /></div>
                    <ChevronRight size={20} className="text-slate-300 dark:text-slate-600 group-hover:text-primary-500 group-hover:translate-x-1 transition-transform" />
                 </div>
                 <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">{page.heading}</h3>
                 <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{page.description}</p>
               </Link>
             ))}
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-16">
          <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-a:text-primary-600 dark:prose-a:text-primary-400">
            <h2 className="text-3xl mb-6">Sobre esta herramienta</h2>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
               <p className="leading-relaxed mb-6">{config.content}</p>
               <h3 className="text-xl mb-4 mt-8">¿Cómo funciona técnicamente?</h3>
               <p className="mb-4">Este conversor no cambia la "fuente" (font-family) en el sentido tradicional de CSS. Lo que hace es mapear cada letra que escribes a un símbolo Unicode que se parece a esa letra pero con un estilo diferente (negrita, cursiva, gótica, etc.).</p>
               <h3 className="text-xl mb-4 mt-8">¿Dónde puedo usar estas letras?</h3>
               <div className="grid sm:grid-cols-2 gap-4 not-prose">
                  {['Instagram Bio & Posts', 'TikTok Profiles', 'Facebook Status', 'Twitter / X', 'Game Nicknames', 'WhatsApp Messages'].map((item) => (
                    <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 font-medium"><div className="w-2 h-2 rounded-full bg-primary-500"></div>{item}</div>
                  ))}
               </div>
            </div>
          </article>
        </div>
      </div>

      <Toast message="¡Texto copiado al portapapeles!" isVisible={showToast} onClose={() => setShowToast(false)} />

      {/* Back to Top FAB */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl shadow-slate-900/20 dark:shadow-white/10 z-40 transition-all duration-300 hover:scale-110 hover:bg-primary-600 dark:hover:bg-primary-400 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
        aria-label="Volver arriba"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default GeneratorPage;