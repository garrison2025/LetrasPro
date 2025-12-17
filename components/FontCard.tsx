import React, { useState, useRef } from 'react';
import { Copy, Check, Star, ImageIcon, ShieldCheck, AlertCircle, Download } from 'lucide-react';
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
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopy = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;

    navigator.clipboard.writeText(rawText).then(() => {
      setJustCopied(true);
      onCopy(); 
      setTimeout(() => setJustCopied(false), 800); 
    });
  };

  const handleDownloadImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsGeneratingImg(true);
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Medir texto
      ctx.font = '40px sans-serif';
      const textWidth = ctx.measureText(rawText).width;
      
      canvas.width = textWidth + 80;
      canvas.height = 120;

      // Fondo transparente
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Estilo de texto
      ctx.fillStyle = '#1e293b'; // Slate 800
      ctx.font = '40px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(rawText, canvas.width / 2, canvas.height / 2);

      const link = document.createElement('a');
      link.download = `letras-pro-${font.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Error al generar imagen:', err);
    } finally {
      setIsGeneratingImg(false);
    }
  };

  const renderTextContent = () => (
    displaySegments.length > 0 ? (
      displaySegments.map((seg, i) => (
        <span 
          key={i} 
          className={`${seg.isFallback ? 'fallback-char opacity-50' : ''} ${seg.isCombined ? 'text-primary-600 dark:text-primary-400' : ''} relative group/seg`}
        >
          {seg.content}
          {seg.isCombined && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover/seg:opacity-100 transition-opacity whitespace-nowrap z-50">
              Estilo Smart Ñ
            </span>
          )}
        </span>
      ))
    ) : (
      <span className="opacity-30 italic">Escribe algo...</span>
    )
  );

  return (
    <div 
      ref={cardRef}
      className={`group relative bg-white dark:bg-slate-800 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
        justCopied
          ? 'border-green-500 ring-4 ring-green-100 dark:ring-green-900/40 shadow-xl' 
          : isFavorite 
            ? 'border-primary-200 dark:border-primary-700 shadow-md ring-1 ring-primary-100 dark:ring-primary-900/20' 
            : 'border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1.5'
      }`}
      onClick={handleCopy}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
           <div className="flex flex-wrap items-center gap-1.5">
             <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-black bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 uppercase tracking-tighter">
               {font.name}
             </span>
             {font.compatibility === 'high' ? (
               <ShieldCheck size={14} className="text-green-500" title="Alta compatibilidad" />
             ) : (
               <AlertCircle size={14} className="text-amber-500" title="Compatibilidad media" />
             )}
             {font.tags?.map(t => (
               <span key={t} className="text-[9px] font-bold text-primary-400 dark:text-primary-600">#{t}</span>
             ))}
           </div>
           
           <div className="flex items-center gap-1 z-10">
             <button
                onClick={handleDownloadImage}
                disabled={isGeneratingImg}
                className="p-1.5 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-colors"
                title="Descargar como PNG"
             >
                <Download size={16} />
             </button>
             <button
                className={`p-1.5 rounded-lg transition-colors ${
                  isFavorite ? 'text-yellow-400' : 'text-slate-300 hover:text-yellow-400'
                }`}
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
             >
                <Star size={16} fill={isFavorite ? "currentColor" : "none"} />
             </button>
             <div className={`p-1.5 rounded-lg transition-all ${justCopied ? 'text-green-500 scale-125' : 'text-slate-300'}`}>
               {justCopied ? <Check size={16} strokeWidth={3} /> : <Copy size={16} />}
             </div>
           </div>
        </div>

        <div className="min-h-[4rem] flex items-center">
           <p className="text-xl sm:text-2xl text-slate-800 dark:text-slate-100 break-all font-medium leading-relaxed">
             {renderTextContent()}
           </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FontCard);