import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GeneratorPage from './pages/GeneratorPage';
import { PAGE_CONFIGS } from './constants';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans relative">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-slate-50">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <Navbar />
        <main className="flex-grow z-10">
          <Routes>
            <Route path="/" element={<GeneratorPage config={PAGE_CONFIGS.home} />} />
            <Route path="/letras-cursivas" element={<GeneratorPage config={PAGE_CONFIGS.cursivas} />} />
            <Route path="/letras-tatuajes" element={<GeneratorPage config={PAGE_CONFIGS.tatuajes} />} />
            <Route path="/letras-goticas" element={<GeneratorPage config={PAGE_CONFIGS.goticas} />} />
            <Route path="/letras-graffiti" element={<GeneratorPage config={PAGE_CONFIGS.graffiti} />} />
            <Route path="/letras-amino" element={<GeneratorPage config={PAGE_CONFIGS.amino} />} />
            <Route path="/letras-facebook" element={<GeneratorPage config={PAGE_CONFIGS.facebook} />} />
            <Route path="/letras-tattoo" element={<GeneratorPage config={PAGE_CONFIGS.tattoo} />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;