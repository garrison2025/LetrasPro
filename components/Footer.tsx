import React from 'react';
import { Link } from 'react-router-dom';
import { Type, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
               <div className="bg-primary-600 text-white p-1.5 rounded-lg">
                  <Type size={20} strokeWidth={2.5} />
               </div>
               <span className="font-display font-bold text-xl text-slate-900 dark:text-white">LetrasPro</span>
            </div>
            {/* Improved Contrast: slate-700 for text */}
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              La herramienta definitiva para creadores de contenido. Personaliza tus textos para Instagram, TikTok, Twitter y más con un solo clic.
            </p>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">Estilos Populares</h3>
            {/* IMPROVED CONTRAST: Changed text-slate-700/400 to text-slate-600/500 */}
            <ul className="space-y-3 text-sm font-medium text-slate-600 dark:text-slate-400">
              <li><Link to="/letras-cursivas" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Letras Cursivas</Link></li>
              <li><Link to="/letras-goticas" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Letras Góticas</Link></li>
              <li><Link to="/texto-invisible" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Texto Invisible</Link></li>
              <li><Link to="/letras-graffiti" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Graffiti & Burbujas</Link></li>
              <li><Link to="/letras-tatuajes" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Fuentes Tatuajes</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
             <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">Por Plataforma</h3>
             <ul className="space-y-3 text-sm font-medium text-slate-600 dark:text-slate-400 mb-6">
                <li><Link to="/letras-para-instagram" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Letras para Instagram</Link></li>
                <li><Link to="/nicks-para-free-fire" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Nicks para Free Fire</Link></li>
                <li><Link to="/letras-para-whatsapp" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Letras para WhatsApp</Link></li>
                <li><Link to="/letras-para-tiktok" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Letras para TikTok</Link></li>
                <li><Link to="/letras-para-discord" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Fuentes para Discord</Link></li>
             </ul>
          </div>

          <div className="md:col-span-2">
             <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">Legal</h3>
             <ul className="space-y-3 text-sm font-medium text-slate-600 dark:text-slate-400 mb-6">
                <li><Link to="/sobre-nosotros" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Sobre Nosotros</Link></li>
                <li><Link to="/contacto" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contacto</Link></li>
                <li><Link to="/politica-de-privacidad" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacidad</Link></li>
                <li><Link to="/terminos-y-condiciones" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Términos</Link></li>
             </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
           <p className="text-xs text-slate-500 dark:text-slate-500">© {new Date().getFullYear()} ConversorDeLetrasBonitas.org. Todos los derechos reservados.</p>
           <p className="text-xs text-slate-500 dark:text-slate-500 flex items-center gap-1">
              Diseñado con <Heart size={12} className="fill-red-400 text-red-400" /> para creadores
           </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;