import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Target, Shield, Zap } from 'lucide-react';

const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canonicalUrl = "https://conversordeletrasbonitas.org/sobre-nosotros";

  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Sobre Nosotros - Conversor de Letras Bonitas</title>
        <meta name="description" content="Conoce al equipo detrás de ConversorDeLetrasBonitas.org, nuestra misión y compromiso con las herramientas de texto gratuitas." />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary-600 font-bold uppercase tracking-wider text-sm bg-primary-50 px-3 py-1 rounded-full">Nuestra Historia</span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 mt-4 mb-6">Sobre Nosotros</h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Somos un equipo de apasionados por la tipografía y el desarrollo web, dedicados a hacer que tu presencia digital sea única.
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-slate prose-lg max-w-none bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-sm">
          <p>
            Bienvenido a <strong>ConversorDeLetrasBonitas.org</strong>. Fundada con la misión de democratizar el diseño de texto en redes sociales, nuestra plataforma se ha convertido en la herramienta de referencia para influencers, gamers y creadores de contenido de habla hispana.
          </p>
          
          <h3>Nuestra Misión</h3>
          <p>
            Creemos que la autoexpresión no debería tener límites técnicos. Las redes sociales como Instagram, TikTok o Facebook a menudo limitan las opciones de formato. Nuestra misión es romper esas barreras utilizando la tecnología Unicode, permitiéndote utilizar miles de estilos de fuentes diferentes sin necesidad de instalar nada.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-12 not-prose">
            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-4">
                <Target size={24} />
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">Precisión</h4>
              <p className="text-slate-500 text-sm">Desarrollamos algoritmos que aseguran la compatibilidad máxima en todos los dispositivos Android e iOS.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl">
               <div className="w-12 h-12 bg-secondary-100 text-secondary-600 rounded-xl flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">Comunidad</h4>
              <p className="text-slate-500 text-sm">Escuchamos a nuestros usuarios para añadir constantemente nuevos estilos como Graffiti, Gótico y Cursiva.</p>
            </div>
          </div>

          <h3>¿Quiénes Somos?</h3>
          <p>
            Detrás de este sitio web hay un equipo multidisciplinario de expertos en SEO, ingenieros frontend y diseñadores UX. Entendemos las frustraciones de los caracteres ilegibles o los "cuadros vacíos" en Android, y por eso hemos implementado filtros inteligentes que solo muestran fuentes seguras y legibles para cada plataforma específica (como Facebook o Amino).
          </p>
          
          <p>
            Nos comprometemos a mantener esta herramienta <strong>100% gratuita</strong> y accesible para todos, sin registros molestos ni descargas de software sospechoso.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;