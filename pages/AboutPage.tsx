import React from 'react';
import { PageMetadata as Helmet } from '../components/PageMetadata';
import { Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
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
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 mt-4 mb-6 dark:text-white">Sobre Nosotros</h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto dark:text-slate-300">
            Somos un equipo de apasionados por la tipografía y el desarrollo web, dedicados a hacer que tu presencia digital sea única.
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-slate prose-lg max-w-none bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:prose-invert">
          <p>
            Bienvenido a <strong>ConversorDeLetrasBonitas.org</strong>. Fundada con la misión de democratizar el diseño de texto en redes sociales, nuestra plataforma se ha convertido en la herramienta de referencia para influencers, gamers y creadores de contenido de habla hispana.
          </p>
          
          <h3>Nuestra Misión</h3>
          <p>
            Creemos que la autoexpresión no debería tener límites técnicos. Las redes sociales como Instagram, TikTok o Facebook a menudo limitan las opciones de formato. Nuestra misión es romper esas barreras utilizando la tecnología Unicode, permitiéndote utilizar una colección de estilos de fuentes diferentes sin necesidad de instalar nada.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-12 not-prose">
            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl dark:bg-slate-900">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-4">
                <Target size={24} />
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-2 dark:text-white">Precisión</h4>
              <p className="text-slate-500 text-sm dark:text-slate-400">Desarrollamos conversiones Unicode para Android e iOS. El resultado depende de la aplicación, la fuente y el dispositivo; pruébalo antes de publicarlo.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl dark:bg-slate-900">
               <div className="w-12 h-12 bg-secondary-100 text-secondary-600 rounded-xl flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-2 dark:text-white">Comunidad</h4>
              <p className="text-slate-500 text-sm dark:text-slate-400">Escuchamos a nuestros usuarios para añadir constantemente nuevos estilos como Graffiti, Gótico y Cursiva.</p>
            </div>
          </div>

          <h3>¿Quiénes Somos?</h3>
          <p>
            Detrás de este sitio web hay un equipo multidisciplinario de expertos en SEO, ingenieros frontend y diseñadores UX. Entendemos las frustraciones de los caracteres ilegibles o los "cuadros vacíos" en Android, y por eso hemos implementado filtros orientativos para explorar fuentes en cada plataforma específica (como Facebook o Amino), sin garantizar su aceptación o legibilidad en todos los casos.
          </p>
          
          <p>
            Nos comprometemos a mantener esta herramienta <strong>100% gratuita</strong> y accesible para todos, sin registros molestos ni descargas de software sospechoso.
          </p>
          <section id="equipo-editorial" className="scroll-mt-24">
            <h2>Equipo LetrasPro: cómo preparamos las guías</h2>
            <p>LetrasPro es el nombre de este proyecto, publicado en ConversorDeLetrasBonitas.org. Las guías del blog se firman como Equipo LetrasPro. Puedes consultar este criterio editorial y enviarnos correcciones desde la <Link to="/contacto">página de contacto</Link>.</p>
            <p>Los ejemplos de los generadores se calculan con la misma conversión que utiliza la herramienta. Separamos esos resultados de las recomendaciones de uso y de las explicaciones técnicas de terceros. Para la relación entre caracteres y fuentes, nuestra referencia es la <a href="https://www.unicode.org/faq/font_keyboard.html">documentación del Consorcio Unicode</a>.</p>
            <p>Antes de publicar cambios comprobamos las conversiones, los casos con tildes y emoji, las páginas generadas y los metadatos. Las recomendaciones por plataforma son orientativas: no tenemos una integración que valide nombres o garantice su aceptación en Instagram, TikTok, Facebook, WhatsApp, Discord, Amino o Free Fire.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
