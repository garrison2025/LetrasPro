import React, { useState, useEffect, useMemo, useRef, useCallback, useDeferredValue } from 'react';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PageConfig, TextCase, FontStyle } from '../types';
import { FONTS, convertText, getDisplaySegments } from '../services/fontMaps';
import { applyDecoration } from '../services/decorators';
import { BIO_TEMPLATES } from '../data/bioTemplates';
import { USAGE_GUIDES } from '../data/usageGuides';
import { GENERATOR_ANSWERS } from '../data/generatorAnswers';
import { ORGANIZATION_ID, WEBSITE_ID } from '../data/siteIdentity';
import FontCard, { ViewMode } from '../components/FontCard';
import HistoryBar from '../components/HistoryBar';
import CommentsSection from '../components/CommentsSection';
import Toast from '../components/Toast';
import { Trash2, Search, LayoutList, Instagram, Wand2, Star, ShieldCheck, AlertCircle, Info, Hash, Type, MessageCircle, Zap, Palette, Smartphone, Check, ChevronDown, Eye, PenTool, Moon, Gamepad2, List, TrendingUp, Bold, Layers, Home, ChevronRight, ArrowUp, Skull, Crosshair, CheckCircle, MessageSquare, User, DownloadCloud, Users, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { useDynamicDate } from '../hooks/useDynamicDate';
import { MAX_INPUT_LENGTH, splitCharacters, truncateText } from '../services/text';
import { TONES, matchesTone } from '../services/fontFilters';
import { readStorage, readStoredArray, writeStorage } from '../services/storage';

interface GeneratorPageProps {
  config: PageConfig;
}

const ITEMS_PER_PAGE = 24;
const INSTAGRAM_BIO_LIMIT = 150;

const QUICK_SYMBOLS = ['★', '✨', '⚡', '꧁', '꧂', '❤', '☠', '⚔', '✿', '❣', 'ღ', '♕', '➳', '➤', '•', '░', '【', '】'];

// Keep each font's conversion when the list is reordered or extended.
const FontPreview = React.memo(({ font, originalText, ...props }: Omit<React.ComponentProps<typeof FontCard>, 'rawText' | 'displaySegments'>) => {
  const preview = useMemo(() => {
    const rawText = applyDecoration(convertText(originalText, font.map, font.category === 'vaporwave'), 'none');
    return { rawText, displaySegments: getDisplaySegments(rawText, font.map) };
  }, [font, originalText]);
  return <FontCard font={font} originalText={originalText} {...preview} {...props} />;
});

const GeneratorPage: React.FC<GeneratorPageProps> = ({ config }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { month, year, fullDate } = useDynamicDate(); // Dynamic Date Hook
  
  const [inputText, setInputText] = useState('');
  const [textCase, setTextCase] = useState<TextCase>('original');
  
  // UX: Initialize search query from URL if present (SEO friendly search results)
  const [searchQuery, setSearchQuery] = useState('');
  
  const [activeTone, setActiveTone] = useState('Todos');
  const [showBioTemplates, setShowBioTemplates] = useState(false);
  const [showAllSymbols, setShowAllSymbols] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Rating State
  const [userRating, setUserRating] = useState<number>(0);
  const [hasRated, setHasRated] = useState(false);
  const [ratingSaved, setRatingSaved] = useState(true);
  const [storageFailures, setStorageFailures] = useState<Record<string, boolean>>({});

  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<{fontName: string, text: string, timestamp: number}[]>([]);
  const [browserReady, setBrowserReady] = useState(false);

  useEffect(() => {
    setInputText(truncateText(readStorage('let_pro_input') || ''));
    setFavorites(readStoredArray('let_pro_favs', (value): value is string => typeof value === 'string')
      .filter(id => FONTS.some(font => font.id === id)).slice(0, FONTS.length));
    setHistory(readStoredArray('let_pro_history', (value): value is {fontName: string, text: string, timestamp: number} => {
      if (typeof value !== 'object' || value === null) return false;
      const item = value as Record<string, unknown>;
      return typeof item.fontName === 'string' && typeof item.text === 'string' && item.text.length <= MAX_INPUT_LENGTH * 30
        && typeof item.timestamp === 'number' && Number.isFinite(item.timestamp);
    }).slice(0, 10));
    setBrowserReady(true);
  }, []);

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const activeDecorator = 'none';
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [showToast, setShowToast] = useState(false);
  
  // UX: Sticky Input State
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const debouncedText = useDebounce(inputText, 300);
  const characterCount = useMemo(() => splitCharacters(inputText).length, [inputText]);

  // SEO & Meta Tag Logic
  const baseUrl = 'https://conversordeletrasbonitas.org';
  const canonicalUrl = config.path === '/' ? `${baseUrl}/` : `${baseUrl}${config.path}`;
  const ogImage = `${baseUrl}/og-image.png`;
  const usageGuide = USAGE_GUIDES[config.path];
  const answer = GENERATOR_ANSWERS[config.path];
  const exampleFont = useMemo(() => FONTS.find(font => config.filter(font)
    && font.map.A && font.map.A !== 'A' && /\p{L}/u.test(font.map.A)) || FONTS.find(config.filter), [config.filter]);

  // Keep the homepage title concise; preserve other pages' date formatting.
  const dynamicTitle = useMemo(() => {
    if (config.path === '/') return config.title;
    let t = config.title;
    if (t.includes('2025')) {
      t = t.replace('2025', `${month} ${year}`);
    } else {
      t = `${t} (${month} ${year})`;
    }
    return t;
  }, [config.path, config.title, month, year]);

  const dynamicDescription = config.description.replace('2025', year);


  // WebApplication Structured Data (JSON-LD)
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${canonicalUrl}#application`,
    "name": config.heading,
    "url": canonicalUrl,
    "description": dynamicDescription,
    "inLanguage": "es",
    "publisher": { "@id": ORGANIZATION_ID },
    "mainEntityOfPage": { "@id": `${canonicalUrl}#webpage` },
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "dateModified": fullDate,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": config.whyFeatures.map(f => f.title).join(', '),
    "screenshot": ogImage
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

  // HowTo Structured Data (JSON-LD)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `Cómo usar el ${config.heading}`,
    "description": `Guía paso a paso para usar el ${config.heading.toLowerCase()} y copiar fuentes personalizadas.`,
    "step": config.howToSteps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": `Paso ${index + 1}`,
      "text": step
    }))
  };
  
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
    setActiveTone('Todos');
    setRatingSaved(true);
    const storedRating = Number(readStorage(`rating_${config.path}`));
    if (Number.isInteger(storedRating) && storedRating >= 1 && storedRating <= 5) {
      setUserRating(storedRating);
      setHasRated(true);
    } else {
      setUserRating(0);
      setHasRated(false);
    }
  }, [config.path, location.pathname]);

  // The URL is the source of search state, including back/forward navigation.
  useEffect(() => {
    setSearchQuery(truncateText(searchParams.get('q') || '', 100));
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchParams]);

  const updateSearchQuery = (value: string) => {
    const query = truncateText(value, 100);
    setSearchQuery(query);
    setVisibleCount(ITEMS_PER_PAGE);
    const next = new URLSearchParams(searchParams);
    if (query) next.set('q', query); else next.delete('q');
    setSearchParams(next, { replace: true });
  };

  const recordStorage = (key: string, saved: boolean) => {
    setStorageFailures(previous => previous[key] === !saved ? previous : { ...previous, [key]: !saved });
  };

  useEffect(() => {
    if (!browserReady) return;
    recordStorage('input', writeStorage('let_pro_input', inputText));
  }, [browserReady, inputText]);

  useEffect(() => {
    if (!browserReady) return;
    recordStorage('favorites', writeStorage('let_pro_favs', JSON.stringify(favorites)));
  }, [browserReady, favorites]);

  useEffect(() => {
    if (!browserReady) return;
    recordStorage('history', writeStorage('let_pro_history', JSON.stringify(history)));
  }, [browserReady, history]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'function' && inputContainerRef.current) {
      let observer: IntersectionObserver;
      const observeInput = () => {
        observer?.disconnect();
        const threshold = window.innerWidth < 1024 ? …8239 tokens truncated…ark:text-slate-400 text-sm mb-6 font-medium">Tu valoración se guarda solo en este navegador; no se envía ni se suma a votos públicos.</p>
             
             <div className="flex justify-center gap-2 mb-4">
               {[1, 2, 3, 4, 5].map((star) => (
                 <button
                   key={star}
                   onClick={() => handleRate(star)}
                   onMouseEnter={() => !hasRated && setUserRating(star)}
                   onMouseLeave={() => !hasRated && setUserRating(0)}
                   className="transition-transform hover:scale-110 focus:outline-none"
                   aria-label={`Calificar con ${star} estrellas`}
                   aria-pressed={hasRated && star === userRating}
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
                 {ratingSaved ? 'Tu valoración personal está guardada en este navegador.' : 'Tu valoración está disponible solo en esta sesión; no se pudo guardar.'}
               </div>
             ) : (
               <p className="text-xs text-slate-600 dark:text-slate-300 font-bold uppercase tracking-widest">
                 Sin valoración personal
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
