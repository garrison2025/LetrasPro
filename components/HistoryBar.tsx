import React from 'react';
import { History, Copy, X } from 'lucide-react';
import { FontStyle } from '../types';

interface HistoryItem {
  fontName: string;
  text: string;
  timestamp: number;
}

interface HistoryBarProps {
  history: HistoryItem[];
  onClear: () => void;
  onSelect: (text: string) => void;
}

const HistoryBar: React.FC<HistoryBarProps> = ({ history, onClear, onSelect }) => {
  if (history.length === 0) return null;

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2 text-slate-500">
          <History size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">Historial Reciente</span>
        </div>
        <button 
          onClick={onClear}
          className="text-xs text-red-400 hover:text-red-600 font-medium hover:underline flex items-center gap-1"
        >
          Borrar todo <X size={12} />
        </button>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {history.map((item, idx) => (
          <button
            key={`${item.timestamp}-${idx}`}
            onClick={() => onSelect(item.text)}
            className="flex-shrink-0 flex flex-col items-start bg-white border border-slate-200 rounded-xl p-3 min-w-[160px] max-w-[200px] hover:border-primary-300 hover:shadow-md transition-all group text-left"
          >
            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded mb-2 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
              {item.fontName}
            </span>
            <span className="text-sm text-slate-800 font-medium truncate w-full mb-1">
              {item.text}
            </span>
            <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-auto pt-2 w-full border-t border-slate-50">
              <Copy size={10} /> Copiar de nuevo
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryBar;