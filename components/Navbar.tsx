import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { NAVIGATION_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-white/80 backdrop-blur-lg border-b border-slate-200/60 shadow-sm' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
              <div className="bg-gradient-to-tr from-primary-600 to-secondary-500 text-white p-2 rounded-xl shadow-lg shadow-primary-500/30 group-hover:scale-105 transition-transform duration-300">
                <Sparkles size={22} strokeWidth={2.5} className="fill-white/20" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-slate-800">
                Letras<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">Pro</span>
              </span>
            </NavLink>
          </div>
          
          {/* Desktop Menu - Showing all links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAVIGATION_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 shadow-sm ring-1 ring-primary-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 absolute w-full left-0 shadow-2xl animate-fade-in max-h-[80vh] overflow-y-auto">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {NAVIGATION_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 pl-6 border-l-4 border-primary-500'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:pl-6'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;