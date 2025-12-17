import React, { useState } from 'react';
import { Copy, Check, Star, Download, Image as ImageIcon, ShieldCheck, AlertCircle } from 'lucide-react';
import { FontStyle, TextSegment } from '../types';

export type ViewMode = 'list' | 'instagram' | 'whatsapp';

interface FontCardProps {
  font: FontStyle;
  rawText: string;
  displaySegments: TextSegment[];
  isFavorite: boolean;
  viewMode: ViewMode;
  onToggleFavorite: () => void;
  onCopy: () => void;
}

const FontCard: React.FC<FontCardProps> = ({ 
  font, 
  rawText, 
  displaySegments, 
  isFavorite, 
  viewMode,
  onToggleFavorite, 
  onCopy 
}) => {
  const [justCopied, setJustCopied] = useState(false);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;

    navigator.clipboard.writeText(rawText).then(() => {
      setJustCopied(true);
      onCopy(); 
      setTimeout(() => setJustCopied(false), 500); 
    });
  };

  const handleDownloadImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsGeneratingImg(true);
    // ... (logic image remains the same)
    setIsGeneratingImg(false);
  };

  const contextClass = `font-ctx-${font.category}`;

  const renderTextContent = () => (
    displaySegments.length > 0 ? (
      displaySegments.map((seg, i) => (
        seg.isFallback ? 
          <span key={i} className="fallback-char group/fb relative inline-block">
            {seg.content}
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/fb:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
              Modo seguro (Ñ/Tilde)
            </span>
          </span> : 
          <span key={i}>{seg.content}</span>
      ))
    ) : (
      <span className="opacity-50 italic">Vista Previa...</span>
    )
  );

  const renderCompatibilityBadge = () => {
    if (font.compatibility === 'high') {
      return (
        <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded-md" title="Alta compatibilidad en Android/iOS">
          <ShieldCheck size={12} /> SAFE
        </div>
      );
    }
    if (font.compatibility === 'low') {
      return (
        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded-md" title="Puede fallar en dispositivos antiguos">
          <AlertCircle size={12} /> BETA
        </div>
      );
    }
    return null;
  };

  const renderListView = () => (
    <div className="relative min-h-[3rem] flex items-center pr-2">
      <p 
        className="text-xl sm:text-2xl text-slate-800 dark:text-slate-100 break-all font-medium leading-relaxed group-hover:text-primary-900 dark:group-hover:text-white transition-colors"
        role="img" 
        aria-label={rawText}
      >
        {renderTextContent()}
      </p>
    </div>
  );

  const renderInstagramView = () => (
    <div className="bg-slate-50 dark:bg-black/20 rounded-xl p-4 border border-slate-100 dark:border-slate-700 mt-2 w-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
          <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 p-[2px]">
            <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-700"></div>
          </div>
        </div>
        <div className="flex-1 flex justify-around text-center text-slate-900 dark:text-white">
          <div><div className="font-bold text-sm">124</div><div className="text-[10px] text-slate-500">Posts</div></div>
          <div><div className="font-bold text-sm">2.5k</div><div className="text-[10px] text-slate-500">Followers</div></div>
          <div><div className="font-bold text-sm">340</div><div className="text-[10px] text-slate-500">Following</div></div>
        </div>
      </div>
      <div className="text-sm">
        <div className="font-bold mb-1 text-slate-900 dark:text-white">Tu Nombre</div>
        <div 
          className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-tight"
          role="img" 
          aria-label={rawText}
        >
          {renderTextContent()}
        </div>
      </div>
    </div>
  );

  const renderWhatsappView = () => (
    <div className="bg-[#e5ddd5] dark:bg-[#0b141a] rounded-xl p-4 border border-slate-200 dark:border-slate-700 mt-2 relative overflow-hidden">
      <div className="relative flex justify-end">
        <div className="bg-[#dcf8c6] dark:bg-[#005c4b] rounded-lg rounded-tr-none px-3 py-2 shadow-sm max-w-[90%]">
          <p 
            className="text-sm text-slate-800 dark:text-slate-100 break-all leading-relaxed"
            role="img" 
            aria-label={rawText}
          >
            {renderTextContent()}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className={`group relative bg-white dark:bg-slate-800 rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
        justCopied
          ? 'border-green-500 ring-2 ring-green-100 dark:ring-green-900 shadow-md scale-[1.02]' 
          : isFavorite 
            ? 'border-primary-200 dark:border-primary-700 shadow-md ring-1 ring-primary-100 dark:ring-primary-900 order-first' 
            : 'border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg hover:-translate-y-1'
      } ${contextClass}`}
      onClick={handleCopy}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
           <div className="flex items-center gap-2">
             <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 uppercase tracking-wide group-hover:bg-primary-50 dark:group-hover:bg-primary-900/40 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
               {font.name}
             </span>
             {renderCompatibilityBadge()}
           </div>
           
           <div className="flex items-center gap-2 z-10">
             <button
                className={`favorite-btn p-2 rounded-full transition-colors ${
                  isFavorite 
                    ? 'text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20' 
                    : 'text-slate-300 dark:text-slate-600 hover:text-yellow-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite();
                }}
             >
                <Star size={18} fill={isFavorite ? "currentColor" : "none"} strokeWidth={isFavorite ? 0 : 2} />
             </button>

             <div className={`
               flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300
               ${justCopied ? 'bg-green-500 text-white scale-110' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}
             `}>
               {justCopied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.5} />}
             </div>
           </div>
        </div>

        {viewMode === 'list' && renderListView()}
        {viewMode === 'instagram' && renderInstagramView()}
        {viewMode === 'whatsapp' && renderWhatsappView()}

      </div>
    </div>
  );
};

export default React.memo(FontCard);