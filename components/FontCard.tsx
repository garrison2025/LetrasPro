import React, { useState } from 'react';
import { Copy, Check, Star, Instagram, MessageCircle } from 'lucide-react';
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

  const handleCopy = (e: React.MouseEvent) => {
    // Prevent triggering if clicking the favorite button
    if ((e.target as HTMLElement).closest('.favorite-btn')) return;

    navigator.clipboard.writeText(rawText).then(() => {
      setJustCopied(true);
      onCopy(); 
      setTimeout(() => setJustCopied(false), 500); 
    });
  };

  const contextClass = `font-ctx-${font.category}`;

  // Helper to render the text content
  const renderTextContent = () => (
    displaySegments.length > 0 ? (
      displaySegments.map((seg, i) => (
        seg.isFallback ? 
          <span key={i} className="fallback-char">{seg.content}</span> : 
          <span key={i}>{seg.content}</span>
      ))
    ) : (
      <span className="opacity-50 italic">Vista Previa...</span>
    )
  );

  // LIST VIEW (Default)
  const renderListView = () => (
    <div className="relative min-h-[3rem] flex items-center pr-2">
      <p className="text-xl sm:text-2xl text-slate-800 dark:text-slate-100 break-all font-medium leading-relaxed group-hover:text-primary-900 dark:group-hover:text-white transition-colors">
        {renderTextContent()}
      </p>
    </div>
  );

  // INSTAGRAM VIEW
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
        <div className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-tight">
          {renderTextContent()}
        </div>
        <div className="mt-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-md text-center text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
          Edit Profile
        </div>
      </div>
    </div>
  );

  // WHATSAPP VIEW
  const renderWhatsappView = () => (
    <div className="bg-[#e5ddd5] dark:bg-[#0b141a] rounded-xl p-4 border border-slate-200 dark:border-slate-700 mt-2 relative overflow-hidden">
      {/* Pattern Overlay simulation */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png')] bg-repeat bg-[length:50px_50px]"></div>
      
      <div className="relative flex justify-end">
        <div className="bg-[#dcf8c6] dark:bg-[#005c4b] rounded-lg rounded-tr-none px-3 py-2 shadow-sm max-w-[90%]">
          <p className="text-sm text-slate-800 dark:text-slate-100 break-all leading-relaxed">
            {renderTextContent()}
          </p>
          <div className="flex justify-end items-center gap-1 mt-1">
            <span className="text-[10px] text-slate-500 dark:text-slate-400">12:45 PM</span>
            <Check size={12} className="text-blue-500" />
            <Check size={12} className="text-blue-500 -ml-1.5" />
          </div>
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
            : 'border-slate-100 dark:border-slate-700 shadow-[0_2px_10px_-4px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1'
      } ${contextClass}`}
      onClick={handleCopy}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-bl-full -mr-10 -mt-10 transition-opacity pointer-events-none ${isFavorite ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
           <div className="flex items-center gap-2">
             <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 uppercase tracking-wide group-hover:bg-primary-50 dark:group-hover:bg-primary-900/40 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
               {font.name}
             </span>
             {isFavorite && (
               <span className="text-yellow-400">
                 <Star size={12} fill="currentColor" />
               </span>
             )}
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
                aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
             >
                <Star size={18} fill={isFavorite ? "currentColor" : "none"} strokeWidth={isFavorite ? 0 : 2} />
             </button>

             <div className={`
               flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300
               ${justCopied ? 'bg-green-500 text-white scale-110 shadow-lg shadow-green-500/30' : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 group-hover:bg-primary-500 group-hover:text-white dark:group-hover:text-white'}
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

export default FontCard;