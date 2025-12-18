import React, { useState, useRef } from 'react';
import { Copy, Check, Star, Download, ShieldCheck, AlertCircle, AlertTriangle } from 'lucide-react';
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

      const lines = rawText.split('\n');
      const fontSize = 54;
      ctx.font = `900 ${fontSize}px sans-serif`;
      
      const maxLineWidth = Math.max(...lines.map(l => ctx.measureText(l).width));
      
      canvas.width = maxLineWidth + 160;
      canvas.height = (lines.length * (fontSize * 1.6)) + 120;

      // Fondo Gradiente
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#f8fafc');
      grad.addColorStop(1, '#f1f5f9');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Texto
      ctx.fillStyle = '#0f172a'; // Slate 900
      ctx.font = `900 ${fontSize}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      lines.forEach((line, i) => {
        ctx.fillText(line, canvas.width / 2, (canvas.height / 2) - ((lines.length - 1) * fontSize * 0.8) + (i * fontSize * 1.6));
      });

      // Branding
      ctx.fillStyle = '#8b5cf6';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('LetrasPro.org', canvas.width / 2, canvas.height - 40);

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
          className={`${seg.isFallback ? 'fallback-char opacity-40' : ''} ${seg.isCombined ? 'text-primary-600 dark:text-primary-400 font-black' : ''} relative group/seg`}
        >
          {seg.content}
          {seg.isCombined && (
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1.5 rounded-xl opacity-0 group-hover/seg:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-2xl pointer-events-none font-bold">
              Modo Español Smart ✨
            </span>
          )}
        </span>
      ))
    ) : (
      <span className="opacity-20 italic font-light">Escribe algo...</span>
    )
  );

  const renderInstagramView = () => (
    <div className="bg-slate-50 dark:bg-black/20 rounded-[2rem] p-7 border border-slate-100 dark:border-slate-700/50 mt-4 w-full animate-fade-in shadow-inner">
       <div className="flex items-center gap-5 mb-6">
         <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[3px] shadow-xl">
           <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 p-[3px]">
             <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-700"></div>
           </div>
         </div>
         <div className="flex-1 flex justify-between text-slate-900 dark:text-white px-2">
           <div className="text-center"><div className="font-black text-lg tracking-tighter">142</div><div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Posts</div></div>
           <div className="text-center"><div className="font-black text-lg tracking-tighter">12k</div><div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Fans</div></div>
           <div className="text-center"><div className="font-black text-lg tracking-tighter">450</div><div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Follow</div></div>
         </div>
       </div>
       <div className="space-y-1">
         <div className="font-black text-sm text-slate-900 dark:text-white">Perfil Profesional</div>
         <div className="text-slate-500 dark:text-slate-400 text-[11px] mb-3 font-bold">Digital Creator / Influencer</div>
         <div className="text-slate-800 dark:text-slate-200 text-sm whitespace-pre-wrap leading-tight font-bold tracking-tight">
           {renderTextContent()}
         </div>
       </div>
    </div>
  );

  const renderWhatsAppView = () => (
    <div className="bg-[#e5ddd5] dark:bg-slate-900 rounded-[2rem] p-6 mt-4 w-full animate-fade-in relative overflow-hidden shadow-inner border border-slate-200 dark:border-slate-800">
       <div className="absolute inset-0 opacity-10 pointer-events-none pattern-bg"></div>
       <div className="relative z-10 flex flex-col gap-3">
         <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none shadow-md max-w-[85%] relative border border-slate-100 dark:border-slate-700">
            <div className="text-slate-800 dark:text-slate-200 text-sm font-bold leading-relaxed break-words">
              {renderTextContent()}
            </div>
            <div className="text-[9px] text-slate-400 text-right mt-1 font-black">12:45 PM ✓✓</div>
         </div>
       </div>
    </div>
  );

  return (
    <div 
      className={`group relative bg-white dark:bg-slate-800 rounded-[3rem] border transition-all duration-700 cursor-pointer overflow-hidden content-visibility-auto contain-content ${
        justCopied
          ? 'border-green-500 ring-8 ring-green-100 dark:ring-green-900/40 shadow-2xl scale-[1.03]' 
          : isFavorite 
            ? 'border-primary-200 dark:border-primary-700 shadow-2xl ring-2 ring-primary-100 dark:ring-primary-900/20' 
            : 'border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl hover:-translate-y-3'
      }`}
      onClick={handleCopy}
    >
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
           <div className="flex flex-wrap items-center gap-2">
             <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] shadow-sm">
               {font.name}
             </span>
             {font.compatibility === 'high' ? (
               <div className="flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-[9px] font-black uppercase" title="Alta Compatibilidad">
                 <ShieldCheck size={14} /> Safe
               </div>
             ) : font.compatibility === 'medium' ? (
               <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-full text-[9px] font-black uppercase" title="Compatibilidad Media">
                 <AlertCircle size={14} /> Mid
               </div>
             ) : (
               <div className="flex items-center gap-1 px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-[9px] font-black uppercase" title="Baja Compatibilidad">
                 <AlertTriangle size={14} /> Beta
               </div>
             )}
           </div>
           
           <div className="flex items-center gap-3 z-10">
             <button
                onClick={handleDownloadImage}
                disabled={isGeneratingImg}
                className="p-3 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-2xl transition-all active:scale-90 shadow-sm"
                title="Descargar PNG Pro"
                aria-label={`Descargar imagen de estilo ${font.name}`}
             >
                <Download size={20} />
             </button>
             <button
                className={`p-3 rounded-2xl transition-all active:scale-90 shadow-sm ${
                  isFavorite ? 'text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' : 'text-slate-300 hover:text-yellow-400 hover:bg-slate-50'
                }`}
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
                aria-label={isFavorite ? `Quitar ${font.name} de favoritos` : `Añadir ${font.name} a favoritos`}
             >
                <Star size={20} fill={isFavorite ? "currentColor" : "none"} />
             </button>
             <div className={`p-3 rounded-2xl transition-all ${justCopied ? 'text-green-500 bg-green-50 scale-125 shadow-xl' : 'text-slate-300'}`}>
               {justCopied ? <Check size={20} strokeWidth={4} /> : <Copy size={20} />}
             </div>
           </div>
        </div>

        <div className="min-h-[5rem] flex items-center">
           <div className="w-full">
             {viewMode === 'list' && (
               <p className="text-2xl sm:text-4xl text-slate-900 dark:text-slate-100 break-words font-black leading-tight tracking-tighter">
                 {renderTextContent()}
               </p>
             )}
             {viewMode === 'instagram' && renderInstagramView()}
             {viewMode === 'whatsapp' && renderWhatsAppView()}
           </div>
        </div>
        
        <div className="mt-6 flex gap-1 items-center">
          {font.tags?.map(t => (
            <span key={t} className="text-[8px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest px-2 py-0.5 border border-slate-100 dark:border-slate-700 rounded-md">#{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FontCard);