import React, { useEffect } from 'react';
import { Lock } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  useEffect(() => {
    document.title = "Política de Privacidad - Conversor de Letras Bonitas";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-sm">
        <div className="border-b border-slate-100 pb-8 mb-8">
          <div className="flex items-center gap-3 mb-4 text-primary-600">
            <Lock size={24} />
            <span className="font-bold uppercase tracking-wider text-sm">Legal</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Política de Privacidad</h1>
          <p className="text-slate-500">Última actualización: <strong>16 de diciembre</strong></p>
        </div>

        <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-800 prose-a:text-primary-600">
          <p>
            En <strong>ConversorDeLetrasBonitas.org</strong>, accesible desde https://conversordeletrasbonitas.org, una de nuestras principales prioridades es la privacidad de nuestros visitantes. Este documento de Política de Privacidad contiene tipos de información que se recopila y registra y cómo la utilizamos.
          </p>

          <h3>1. Información que recopilamos</h3>
          <p>
            ConversorDeLetrasBonitas.org es una herramienta del lado del cliente. Esto significa que:
          </p>
          <ul>
            <li><strong>No almacenamos el texto que escribes:</strong> Todo el proceso de conversión de fuentes ocurre en tu propio navegador (Chrome, Safari, Firefox, etc.) utilizando JavaScript. El texto que introduces en el generador nunca se envía a nuestros servidores.</li>
            <li><strong>No solicitamos datos personales:</strong> No pedimos nombres, direcciones de correo electrónico ni números de teléfono para utilizar la herramienta básica.</li>
          </ul>

          <h3>2. Archivos de registro (Log Files)</h3>
          <p>
            ConversorDeLetrasBonitas.org sigue un procedimiento estándar de uso de archivos de registro. Estos archivos registran a los visitantes cuando visitan sitios web. La información recopilada incluye direcciones de protocolo de Internet (IP), tipo de navegador, proveedor de servicios de Internet (ISP), fecha y hora, páginas de referencia/salida y posiblemente el número de clics. Estos no están vinculados a ninguna información que sea personalmente identificable.
          </p>

          <h3>3. Cookies y Web Beacons</h3>
          <p>
            Como cualquier otro sitio web, utilizamos "cookies". Estas cookies se utilizan para almacenar información, incluidas las preferencias de los visitantes y las páginas del sitio web a las que el visitante accedió o visitó. La información se utiliza para optimizar la experiencia de los usuarios personalizando el contenido de nuestra página web según el tipo de navegador de los visitantes y/u otra información.
          </p>

          <h3>4. Cookie de Google DoubleClick DART</h3>
          <p>
            Google es uno de los proveedores externos en nuestro sitio. También utiliza cookies, conocidas como cookies DART, para publicar anuncios a los visitantes de nuestro sitio en función de su visita a conversordeletrasbonitas.org y otros sitios en Internet. Sin embargo, los visitantes pueden optar por rechazar el uso de cookies DART visitando la Política de privacidad de la red de contenido y anuncios de Google.
          </p>

          <h3>5. Políticas de privacidad de terceros</h3>
          <p>
            La Política de Privacidad de ConversorDeLetrasBonitas.org no se aplica a otros anunciantes o sitios web. Por lo tanto, le recomendamos que consulte las respectivas Políticas de Privacidad de estos servidores de anuncios de terceros para obtener información más detallada.
          </p>

          <h3>6. Consentimiento</h3>
          <p>
            Al utilizar nuestro sitio web, usted acepta nuestra Política de Privacidad y acepta sus términos. Si tiene preguntas adicionales o requiere más información sobre nuestra Política de Privacidad, no dude en contactarnos a través del correo electrónico: <strong>info@conversordeletrasbonitas.org</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;