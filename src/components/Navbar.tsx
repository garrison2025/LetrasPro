import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sparkles, Moon, Sun, ChevronDown, ChevronRight, Zap, PenTool } from 'lucide-react';
import { NAVIGATION_LINKS } from '../constants';
import { NavLink as NavLinkType } from '../types';

interface NavbarProps {
  currentPath: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPath = '/' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial check
    if (document.documentElement.classList.contains('dark')) {
        setIsDark(true);
    }
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
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

  const toggleTheme = () => {
    if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        setIsDark(false);
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        setIsDark(true);
    }
  };

  const isCurrent = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const generators = NAVIGATION_LINKS.filter(l => l.group === 'generators');
  const tools = NAVIGATION_LINKS.filter(l => l.group === 'tools');

  const renderDropdown = (title: string, items: NavLinkType[], id: string, icon: React.ReactNode) => {
    const isActiveParent = items.some(item => isCurrent(item.path));
    const isOpenDropdown = activeDropdown === id;
    
    return (
      <div className="relative group">
        <button
          onClick={() => setActiveDropdown(isOpenDropdown ? null : id)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
            isActiveParent || isOpenDropdown
              ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          {icon}
          {title}
          <ChevronDown size={14} className={`transition-transform duration-200 ${isOpenDropdown ? 'rotate-180' : ''}`} />
        </button>

        {isOpenDropdown && (
          <div className="absolute top-full left-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-fade-in z-50">
            <div className="p-2 grid gap-1">
               {items.map(item => (
                 <a
                   key={item.path}
                   href={item.path}
                   className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                       isCurrent(item.path)
                         ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-bold'
                         : 'text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white font-medium'
                     }`}
                 >
                   <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50"></span>
                   {item.label}
                 </a>
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
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-slate-200/60 dark:border-slate-800 shadow-sm' 
          : 'bg-transparent border-b border-transparent'
      }`}
      ref={dropdownRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
              <div className="bg-gradient-to-tr from-primary-600 to-secondary-500 text-white p-2 rounded-xl shadow-lg shadow-primary-500/30 group-hover:scale-105 transition-transform duration-300">
                <Sparkles size={22} strokeWidth={2.5} className="fill-white/20" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-slate-800 dark:text-white">
                Letras<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">Pro</span>
              </span>
            </a>
          </div>
          
          <div className="hidden lg:flex items-center gap-2">
            <a href="/" className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${currentPath === '/' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
              Inicio
            </a>
            {renderDropdown('Generadores', generators, 'generators', <Zap size={16} />)}
            {renderDropdown('Herramientas', tools, 'tools', <PenTool size={16} />)}
            <a href="/blog" className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${isCurrent('/blog') ? 'text-primary-600 dark:text-primary-400' : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
              Blog
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2.5 rounded-full text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="flex items-center lg:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-xl text-slate-800 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 fixed w-full left-0 shadow-2xl h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-4 py-6 space-y-6">
            <a href="/" className="block px-4 py-3 rounded-xl text-base font-bold text-slate-700 dark:text-slate-300">Inicio</a>
            <div>
              <h3 className="px-4 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Generadores</h3>
              {generators.map(link => (
                  <a key={link.path} href={link.path} className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">{link.label}</a>
              ))}
            </div>
            <div>
               <h3 className="px-4 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Herramientas</h3>
               {tools.map(link => (
                   <a key={link.path} href={link.path} className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">{link.label}</a>
               ))}
            </div>
            <a href="/blog" className="block px-4 py-3 rounded-xl text-base font-bold text-slate-700 dark:text-slate-300">Blog</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;