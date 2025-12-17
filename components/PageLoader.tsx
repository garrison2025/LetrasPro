import React from 'react';
import { Loader2 } from 'lucide-react';

const PageLoader: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="absolute inset-0 bg-primary-200/50 rounded-full blur-xl animate-pulse"></div>
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin relative z-10" />
      </div>
      <span className="text-slate-400 font-medium animate-pulse">Cargando contenido...</span>
    </div>
  );
};

export default PageLoader;