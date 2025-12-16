import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PageConfig } from '../types';
import { FONTS, convertText, getDisplaySegments } from '../services/fontMaps';
import FontCard from '../components/FontCard';
import { Sparkles, Type, Star, ChevronDown, Loader2, Zap, Check, Heart, Shield, Smartphone, Palette, HelpCircle, ChevronRight, Home } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

interface GeneratorPageProps {
  config: PageConfig;
}

const ITEMS_PER_PAGE = 24;

// 3. 数据素材 (符号库)
const SYMBOLS = [
  '★', '⚡', '꧁', '꧂', '❤', '✈', '☠', '✔', '✘', // 热门
  '⚔', '☂', '✿', '❄', '✪', '✯', // 游戏
  '✦', '✨', '❥', '❣', 'ღ', // 特殊
  '♪', '♫', '♕', '♔', '®', '©' // 补充
];

const GeneratorPage: React.FC<GeneratorPageProps> = ({ config }) => {
  const [inputText, setInputText] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isTyping, setIsTyping] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // 引用 Textarea 以便控制光标
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Performance: Debounce input to prevent lagging when rendering 70+ items
  const debouncedText = useDebounce(inputText, 300);
  
  // Reset pagination when page changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
    window.scrollTo(0, 0);
  }, [config.path]);

  // Effect to track instant typing state for UI feedback
  useEffect(() => {
    if (inputText !== debouncedText) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [inputText, debouncedText]);

  // Performance: Memoize the filtered list so it doesn't recalculate unnecessarily
  const filteredFonts = useMemo(() => {
    return FONTS.filter(config.filter);
  }, [config.filter]);

  // Performance: Slice the array to only render visible items
  const visibleFonts = filteredFonts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredFonts.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredFonts.length));
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // --- 2. 交互逻辑 (插入符号核心函数) ---
  const insertSymbol = (symbol: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // 1. 获取光标位置
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = inputText;

    // 2. 拼接字符串：光标前 + 符号 + 光标后
    const newText = currentText.substring(0, start) + symbol + currentText.substring(end);
    
    // 3. 更新 React 状态 (触发预览更新)
    setInputText(newText);

    // 4. 焦点保持与光标修正 (防止键盘收起)
    // 使用 setTimeout 确保在 React 重新渲染后执行 DOM 操作
    setTimeout(() => {
      textarea.focus();
      // 将光标移动到插入符号的右侧
      const newCursorPos = start + symbol.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

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

  const placeholder = "Escribe tu texto aquí..."; // 西班牙语占位符
  const textToProcess = debouncedText || 'Vista Previa';

  // --- SEO & Schema Data ---
  const canonicalUrl = `https://conversordeletrasbonitas.org${config.path === '/' ? '' : config.path}`;
  const siteName = "Conversor de Letras Bonitas";
  
  // JSON-LD: WebApplication + FAQPage + BreadcrumbList
  const structuredData = [
    {
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
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Inicio",
          "item": "https://conversordeletrasbonitas.org/"
        },
        ...(config.path !== '/' ? [{
          "@type": "ListItem",
          "position": 2,
          "name": config.heading,
          "item": canonicalUrl
        }] : [])
      ]
    }
  ];

  if (config.faqs.length > 0) {
    structuredData.push({
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
    } as any);
  }

  return (
    <div className="flex flex-col pb-20">
      <Helmet>
        {/* Basic Metadata */}
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={config.title} />
        <meta property="og:description" content={config.description} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:image" content="https://conversordeletrasbonitas.org/og-image.svg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={config.title} />
        <meta property="twitter:description" content={config.description} />
        <meta property="twitter:image" content="https://conversordeletrasbonitas.org/og-image.svg" />

        {/* Structured Data JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <div className="relative pt-8 pb-24 lg:pt-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        
        {/* Decorative background for hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-primary-200/30 to-secondary-200/30 blur-3xl rounded-full -z-10" />

        {/* Breadcrumbs (Visual) */}
        <nav className="flex justify-center mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 p-2 bg-white/50 backdrop-blur-sm rounded-full border border-slate-100 shadow-sm">
            <li className="inline-flex items-center">
              <Link to="/" className="inline-flex items-center text-xs font-medium text-slate-500 hover:text-primary-600">
                <Home size={14} className="mr-1" />
                Inicio
              </Link>
            </li>
            {config.path !== '/' && (
              <li>
                <div className="flex items-center">
                  <ChevronRight size={14} className="text-slate-400" />
                  <span className="ml-1 text-xs font-medium text-slate-700 md:ml-2">{config.heading}</span>
                </div>
              </li>
            )}
          </ol>
        </nav>

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
        <div className="sticky top-20 z-30 mb-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden flex flex-col">
              
              {/* Textarea Section */}
              <div className="flex items-start">
                 <div className="hidden sm:flex items-center justify-center w-16 pt-6 pl-2 text-slate-400">
                    <Type size={28} />
                 </div>
                 <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={placeholder}
                  className="block w-full border-0 bg-transparent py-6 px-4 sm:pl-2 sm:pr-20 text-slate-900 placeholder:text-slate-400 focus:ring-0 text-xl sm:text-2xl font-medium min-h-[100px] resize-none leading-relaxed"
                  rows={2}
                />
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                   <div className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${isTyping ? 'bg-primary-100 text-primary-600' : 'bg-primary-50 text-primary-400'}`}>
                      {isTyping ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
                   </div>
                </div>
              </div>

              {/* Symbol Toolbar */}
              <div className="border-t border-slate-100 bg-slate-50/50 px-2 py-2">
                <div 
                  className="flex items-center gap-2 overflow-x-auto pb-1"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar for Firefox/IE
                >
                  <style>{`
                    /* Hide scrollbar for Chrome/Safari/Webkit */
                    .overflow-x-auto::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                  
                  <span className="text-xs font-bold text-slate-400 uppercase px-2 flex-shrink-0 select-none">
                    Símbolos:
                  </span>
                  
                  {SYMBOLS.map((symbol, index) => (
                    <button
                      key={index}
                      onClick={() => insertSymbol(symbol)}
                      className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-lg text-slate-700 shadow-sm hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 hover:scale-105 active:scale-95 transition-all duration-150 select-none"
                      type="button"
                      aria-label={`Insertar símbolo ${symbol}`}
                    >
                      {symbol}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-1 w-full bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-3 px-2">
            <p className="text-sm font-medium text-slate-500">
              Mostrando <span className="text-primary-600 font-bold">{visibleFonts.length}</span> de {filteredFonts.length} estilos
            </p>
            <p className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
               Haz clic para copiar
            </p>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {visibleFonts.map((font) => (
            <FontCard
              key={font.id}
              font={font}
              // Pass raw string for clipboard
              rawText={convertText(textToProcess, font.map)}
              // Pass segments for Display UI (Strategy B)
              displaySegments={debouncedText || !isTyping ? getDisplaySegments(textToProcess, font.map) : []}
            />
          ))}
          
          {visibleFonts.length === 0 && (
             <div className="col-span-full py-20 text-center">
               <div className="inline-block p-4 rounded-full bg-slate-100 mb-4">
                 <Sparkles className="text-slate-400" size={32} />
               </div>
               <p className="text-slate-500 text-lg">No hay estilos disponibles para esta categoría.</p>
             </div>
          )}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mb-20">
            <button 
              onClick={handleLoadMore}
              className="group flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-700 font-semibold rounded-full shadow-sm hover:shadow-md hover:border-primary-200 hover:text-primary-700 transition-all duration-300"
            >
              Cargar más estilos
              <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        )}

        {/* --- NEW CONTENT SECTIONS (Before SEO Article) --- */}
        
        {/* 1. ¿Por qué elegirnos? (Why) */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl text-slate-900 mb-3">¿Por qué usar esta herramienta?</h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {config.whyFeatures.map((feature, i) => (
               <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-300 text-center group">
                  <div className="w-14 h-14 mx-auto bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                     {getIconComponent(feature.icon)}
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{feature.description}</p>
               </div>
             ))}
          </div>
        </div>

        {/* 2. Cómo usar (How to) */}
        <div className="mb-20 relative overflow-hidden bg-slate-900 rounded-3xl p-8 sm:p-12 text-white">
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
                   <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center font-bold shadow-lg">
                     {i + 1}
                   </div>
                   <p className="mt-2 text-slate-100 font-medium leading-relaxed">
                     {step}
                   </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Preguntas Frecuentes (FAQ) */}
        <div className="mb-16 max-w-3xl mx-auto">
           <div className="text-center mb-10">
              <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Ayuda</span>
              <h2 className="font-display font-bold text-3xl text-slate-900 mt-2">Preguntas Frecuentes</h2>
           </div>
           
           <div className="space-y-4">
             {config.faqs.map((faq, i) => (
               <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary-200">
                  <button 
                    onClick={() => toggleFaq(i)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  >
                    <span className="font-bold text-slate-800 text-lg pr-4">{faq.question}</span>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center transition-transform duration-300 ${openFaqIndex === i ? 'rotate-90 bg-primary-50 text-primary-600' : 'text-slate-400'}`}>
                       <ChevronRight size={20} />
                    </div>
                  </button>
                  <div 
                    className={`px-5 text-slate-600 leading-relaxed overflow-hidden transition-all duration-300 ${openFaqIndex === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    {faq.answer}
                  </div>
               </div>
             ))}
           </div>
        </div>

        {/* Existing SEO Content Block (Retained as requested) */}
        <div className="border-t border-slate-200 pt-16">
          <article className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-primary-600">
            <h2 className="text-3xl mb-6">Sobre esta herramienta</h2>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
               <p className="leading-relaxed mb-6">{config.content}</p>
               
               <h3 className="text-xl mb-4 mt-8">¿Cómo funciona técnicamente?</h3>
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