import React, { useState } from 'react';
import { Copy, Check, Star } from 'lucide-react';
import { FontStyle, TextSegment } from '../types';

interface FontCardProps {
  font: FontStyle;
  rawText: string;
  displaySegments: TextSegment[];
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onCopy: () => void;
}

const FontCard: React.FC<FontCardProps> = ({ 
  font, 
  rawText, 
  displaySegments, 
  isFavorite, 
  onToggleFavorite, 
  onCopy 
}) => {
  const [justCopied, setJustCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    // Prevent triggering if clicking the favorite button
    if ((e.target as HTMLElement).closest('.favorite-btn')) return;

    navigator.clipboard.writeText(rawText).then(() => {
      setJustCopied(true);
      onCopy(); // Trigger parent toast
      setTimeout(() => setJustCopied(false), 2000);
    });
  };

  // Determine context class for CSS fallback logic
  const contextClass = `font-ctx-${font.category}`;

  return (
    <div 
      className={`group relative bg-white rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
        isFavorite 
          ? 'border-primary-200 shadow-md ring-1 ring-primary-100 order-first' 
          : 'border-slate-100 shadow-[0_2px_10px_-4px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]'
      } hover:-translate-y-1 ${contextClass}`}
      onClick={handleCopy}
    >
      {/* Background decoration on hover */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-bl-full -mr-10 -mt-10 transition-opacity pointer-events-none ${isFavorite ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
           <div className="flex items-center gap-2">
             <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-500 uppercase tracking-wide group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
               {font.name}
             </span>
             {isFavorite && (
               <span className="text-yellow-400">
                 <Star size={12} fill="currentColor" />
               </span>
             )}
           </div>
           
           <div className="flex items-center gap-2 z-10">
             {/* Favorite Button */}
             <button
                className={`favorite-btn p-2 rounded-full transition-colors ${
                  isFavorite 
                    ? 'text-yellow-400 hover:bg-yellow-50' 
                    : 'text-slate-300 hover:text-yellow-400 hover:bg-slate-50'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite();
                }}
                aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
             >
                <Star size={18} fill={isFavorite ? "currentColor" : "none"} strokeWidth={isFavorite ? 0 : 2} />
             </button>

             {/* Copy Indicator */}
             <div className={`
               flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300
               ${justCopied ? 'bg-green-500 text-white scale-110 shadow-lg shadow-green-500/30' : 'bg-slate-100 text-slate-400 group-hover:bg-primary-500 group-hover:text-white'}
             `}>
               {justCopied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.5} />}
             </div>
           </div>
        </div>

        <div className="relative min-h-[3rem] flex items-center pr-2">
           <p className="text-xl sm:text-2xl text-slate-800 break-all font-medium leading-relaxed group-hover:text-primary-900 transition-colors">
             {displaySegments.length > 0 ? (
               displaySegments.map((seg, i) => (
                 seg.isFallback ? 
                   <span key={i} className="fallback-char">{seg.content}</span> : 
                   <span key={i}>{seg.content}</span>
               ))
             ) : (
               <span className="text-slate-300 italic font-light">Vista Previa...</span>
             )}
           </p>
        </div>
      </div>
    </div>
  );
};

export default FontCard;