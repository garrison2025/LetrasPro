import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GeneratorPage from './pages/GeneratorPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import BlogIndexPage from './pages/BlogIndexPage';
import BlogPostPage from './pages/BlogPostPage';
import RepeaterPage from './pages/RepeaterPage';
import GlitchPage from './pages/GlitchPage';
import InvisibleTextPage from './pages/InvisibleTextPage'; // New
import FlipTextPage from './pages/FlipTextPage'; // New
import BigTextPage from './pages/BigTextPage'; // New
import NotFoundPage from './pages/NotFoundPage'; // New 404 Page
import { PAGE_CONFIGS } from './constants';
import { ThemeProvider } from './context/ThemeContext'; // New

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <div className="flex flex-col min-h-screen font-sans relative dark:bg-slate-900 transition-colors duration-300">
            {/* Animated Background Elements - Updated for Dark Mode */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-slate-50 dark:bg-slate-950">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/40 dark:bg-primary-900/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary-200/40 dark:bg-secondary-900/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-200/40 dark:bg-pink-900/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <Navbar />
            <main className="flex-grow z-10">
              <Routes>
                {/* Generator Pages */}
                <Route path="/" element={<GeneratorPage config={PAGE_CONFIGS.home} />} />
                <Route path="/letras-cursivas" element={<GeneratorPage config={PAGE_CONFIGS.cursivas} />} />
                <Route path="/letras-tatuajes" element={<GeneratorPage config={PAGE_CONFIGS.tatuajes} />} />
                <Route path="/letras-goticas" element={<GeneratorPage config={PAGE_CONFIGS.goticas} />} />
                <Route path="/letras-graffiti" element={<GeneratorPage config={PAGE_CONFIGS.graffiti} />} />
                <Route path="/letras-amino" element={<GeneratorPage config={PAGE_CONFIGS.amino} />} />
                <Route path="/letras-facebook" element={<GeneratorPage config={PAGE_CONFIGS.facebook} />} />
                <Route path="/letras-tattoo" element={<GeneratorPage config={PAGE_CONFIGS.tattoo} />} />
                
                {/* Tool Pages */}
                <Route path="/repetidor-de-texto" element={<RepeaterPage />} />
                <Route path="/texto-glitch" element={<GlitchPage />} />
                <Route path="/texto-invisible" element={<InvisibleTextPage />} />
                <Route path="/texto-al-reves" element={<FlipTextPage />} />
                <Route path="/letras-grandes" element={<BigTextPage />} />

                {/* Blog Pages */}
                <Route path="/blog" element={<BlogIndexPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />

                {/* Static Content Pages */}
                <Route path="/sobre-nosotros" element={<AboutPage />} />
                <Route path="/contacto" element={<ContactPage />} />
                <Route path="/politica-de-privacidad" element={<PrivacyPage />} />
                <Route path="/terminos-y-condiciones" element={<TermsPage />} />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;