import React, { useState, useEffect, useRef } from 'react';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, Moon, Sun, ChevronDown, ChevronRight, Zap, PenTool } from 'lucide-react';
import { NAVIGATION_LINKS } from '../constants';
import { useTheme } from '../context/ThemeContext';
import { NavLink } from '../types';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Close dropdown on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown and mobile menu on route change
  useEffect(() => {
    setActiveDropdown(null);
    setIsOpen(false);
  }, [location]);

  const generators = NAVIGATION_LINKS.filter(l => l.group === 'generators');
  const tools = NAVIGATION_LINKS.filter(l => l.group === 'tools');
  const others = NAVIGATION_LINKS.filter(l => !l.group); // Inicio, Blog

  const renderDropdown = (title: string, items: NavLink[], id: string, icon: React.ReactNode) => {
    const isActive = items.some(item => item.path === location.pathname);
    const isOpen = activeDropdown === id;
    
    return (
      <div className="relative group">
        <button
          onClick={() => setActiveDropdown(isOpen ? null : id)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label={`Abrir menú de ${title}`}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
            isActive || isOpen
              ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          {icon}
          {title}
          <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-fade-in z-50">
            <div className="p-2 grid gap-1">
               {items.map(item => (
                 <RouterNavLink
                   key={item.path}
                   to={item.path}
                   className={({ isActive }) =>
                     `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                       isActive
                         ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-bold'
                         : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white font-medium'
                     }`
                   }
                 >
                   <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50"></span>
                   {item.label}
                 </RouterNavLink>
               ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200/60 dark:border-slate-800 shadow-sm' 
          : 'bg-transparent border-b border-transparent'
      }`}
      ref={dropdownRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <RouterNavLink to="/" className="flex-shrink-0 flex items-center gap-2 group" onClick={() => setIsOpen(false)} aria-label="Volver al inicio">
              <div className="bg-gradient-to-tr from-primary-600 to-secondary-500 text-white p-2 rounded-xl shadow-lg shadow-primary-500/30 group-hover:scale-105 transition-transform duration-300">
                <Sparkles size={22} strokeWidth={2.5} className="fill-white/20" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-slate-800 dark:text-white">
                Letras<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">Pro</span>
              </span>
            </RouterNavLink>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2">
            <RouterNavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`
              }
            >
              Inicio
            </RouterNavLink>

            {renderDropdown('Generadores', generators, 'generators', <Zap size={16} />)}
            {renderDropdown('Herramientas', tools, 'tools', <PenTool size={16} />)}

            <RouterNavLink
              to="/blog"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`
              }
            >
              Blog
            </RouterNavLink>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900"
              aria-label={theme === 'light' ? "Activar modo oscuro" : "Activar modo claro"}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors"
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 fixed w-full left-0 shadow-2xl animate-fade-in h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-4 py-6 space-y-6">
            
            {/* Main Links */}
            <div className="space-y-1">
               <RouterNavLink
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-base font-bold ${
                      isActive ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-300' : 'text-slate-700 dark:text-slate-300'
                    }`
                  }
               >
                 Inicio
               </RouterNavLink>
            </div>

            {/* Generators Section */}
            <div>
              <h3 className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Generadores de Fuentes</h3>
              <div className="grid grid-cols-1 gap-1">
                {generators.map((link) => (
                  <RouterNavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-300'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`
                    }
                  >
                    {link.label}
                    {location.pathname === link.path && <ChevronRight size={16} />}
                  </RouterNavLink>
                ))}
              </div>
            </div>

            {/* Tools Section */}
            <div>
              <h3 className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Herramientas Útiles</h3>
              <div className="grid grid-cols-1 gap-1">
                {tools.map((link) => (
                  <RouterNavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-secondary-50 dark:bg-secondary-900/20 text-secondary-600 dark:text-secondary-300'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`
                    }
                  >
                    {link.label}
                    {location.pathname === link.path && <ChevronRight size={16} />}
                  </RouterNavLink>
                ))}
              </div>
            </div>

             {/* Blog Link */}
             <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
               <RouterNavLink
                  to="/blog"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-base font-bold ${
                      isActive ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-300' : 'text-slate-700 dark:text-slate-300'
                    }`
                  }
               >
                 Blog & Tutoriales
               </RouterNavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;