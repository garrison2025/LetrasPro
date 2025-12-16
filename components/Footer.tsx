import React from 'react';
import { Link } from 'react-router-dom';
import { Type, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
               <div className="bg-primary-600 text-white p-1.5 rounded-lg">
                  <Type size={20} strokeWidth={2.5} />
               </div>
               <span className="font-display font-bold text-xl text-slate-900">LetrasPro</span>
            </div>
            <p className="text-slate-500 leading-relaxed max-w-sm">
              La herramienta definitiva para creadores de contenido. Personaliza tus textos para Instagram, TikTok, Twitter y más con un solo clic.
            </p>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="font-bold text-slate-900 mb-6">Explorar Estilos</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-500">
              <li><Link to="/letras-cursivas" className="hover:text-primary-600 transition-colors">Letras Cursivas</Link></li>
              <li><Link to="/letras-goticas" className="hover:text-primary-600 transition-colors">Letras Góticas</Link></li>
              <li><Link to="/letras-tatuajes" className="hover:text-primary-600 transition-colors">Fuentes Tattoo</Link></li>
              <li><Link to="/letras-graffiti" className="hover:text-primary-600 transition-colors">Graffiti & Burbujas</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
             <h4 className="font-bold text-slate-900 mb-6">Compatible Con</h4>
             <div className="flex flex-wrap gap-2">
                {['Instagram', 'TikTok', 'Facebook', 'Twitter', 'WhatsApp', 'Discord', 'Free Fire'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-100">
                    {tag}
                  </span>
                ))}
             </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
           <p className="text-xs text-slate-400">© {new Date().getFullYear()} LetrasPro. Todos los derechos reservados.</p>
           <p className="text-xs text-slate-400 flex items-center gap-1">
              Diseñado con <Heart size={12} className="fill-red-400 text-red-400" /> para creadores
           </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;