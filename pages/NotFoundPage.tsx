import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, Search, FileQuestion } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    // Optional: Log 404 event to analytics here
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
      <Helmet>
        <title>404 - Página no encontrada</title>
        {/* Crucial for SEO: Tells Google not to index this error page */}
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <FileQuestion size={48} className="text-slate-400 dark:text-slate-500" />
      </div>

      <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white mb-4">
        404
      </h1>
      <p className="text-xl text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-10">
        Ups, parece que la página que buscas no existe o ha sido movida.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/" 
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
        >
          <Home size={20} />
          Volver al Inicio
        </Link>
        <Link 
          to="/letras-cursivas" 
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <Search size={20} />
          Ver Generadores
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;