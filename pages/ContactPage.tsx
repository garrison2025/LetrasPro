import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canonicalUrl = "https://conversordeletrasbonitas.org/contacto";

  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Contacto - Conversor de Letras Bonitas</title>
        <meta name="description" content="Ponte en contacto con el equipo de ConversorDeLetrasBonitas.org. Envíanos tus dudas, sugerencias o reportes de errores." />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">Contáctanos</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            ¿Tienes alguna sugerencia para un nuevo estilo de letra? ¿Encontraste un error? Estamos aquí para escucharte.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info Card */}
          <div className="bg-primary-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold font-display mb-6">Información de Contacto</h3>
              <p className="text-primary-100 mb-10 leading-relaxed">
                Valoramos mucho el feedback de nuestra comunidad. Si tienes dudas sobre cómo usar el conversor o propuestas comerciales, escríbenos directamente.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-primary-200 font-medium uppercase tracking-wider">Email</p>
                    <a href="mailto:info@conversordeletrasbonitas.org" className="text-lg font-semibold hover:text-primary-200 transition-colors">
                      info@conversordeletrasbonitas.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-primary-200 font-medium uppercase tracking-wider">Soporte</p>
                    <p className="text-lg font-semibold">24/7 vía Email</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Placeholder / Direct Action */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center">
             <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 mb-6">
               <Send size={32} />
             </div>
             <h3 className="text-2xl font-bold text-slate-900 mb-4">Envíanos un mensaje directo</h3>
             <p className="text-slate-500 mb-8">
               Actualmente gestionamos todas las consultas a través de nuestro correo electrónico oficial para asegurar una respuesta rápida y personalizada.
             </p>
             <a 
               href="mailto:info@conversordeletrasbonitas.org"
               className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all hover:scale-105 shadow-lg shadow-slate-900/20"
             >
               <Mail size={20} />
               Abrir Correo
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;