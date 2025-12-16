import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { FontStyle } from '../types';

interface FontCardProps {
  font: FontStyle;
  text: string;
}

const FontCard: React.FC<FontCardProps> = ({ font, text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_-4px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={handleCopy}
    >
      {/* Background decoration on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-bl-full -mr-10 -mt-10 transition-opacity opacity-0 group-hover:opacity-100 pointer-events-none" />

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
           <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-500 uppercase tracking-wide group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
             {font.name}
           </span>
           
           <div className={`
             flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300
             ${copied ? 'bg-green-500 text-white scale-110 shadow-lg shadow-green-500/30' : 'bg-slate-100 text-slate-400 group-hover:bg-primary-500 group-hover:text-white'}
           `}>
             {copied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.5} />}
           </div>
        </div>

        <div className="relative min-h-[3rem] flex items-center">
           <p className="text-xl sm:text-2xl text-slate-800 break-all font-medium leading-relaxed group-hover:text-primary-900 transition-colors">
             {text || <span className="text-slate-300 italic font-light">Vista Previa...</span>}
           </p>
        </div>
      </div>
      
      {/* Copied overlay feedback (Optional visual cue) */}
      <div className={`absolute inset-0 bg-primary-600/90 flex items-center justify-center backdrop-blur-sm transition-opacity duration-200 ${copied ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
         <div className="text-white font-bold text-lg flex flex-col items-center gap-2">
            <div className="bg-white text-primary-600 p-2 rounded-full">
              <Check size={24} strokeWidth={4} />
            </div>
            ¡Copiado!
         </div>
      </div>
    </div>
  );
};

export default FontCard;