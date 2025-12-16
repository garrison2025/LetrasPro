import React, { useEffect } from 'react';
import { FileText } from 'lucide-react';

const TermsPage: React.FC = () => {
  useEffect(() => {
    document.title = "Términos y Condiciones - Conversor de Letras Bonitas";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-sm">
        <div className="border-b border-slate-100 pb-8 mb-8">
           <div className="flex items-center gap-3 mb-4 text-primary-600">
            <FileText size={24} />
            <span className="font-bold uppercase tracking-wider text-sm">Legal</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Términos y Condiciones</h1>
          <p className="text-slate-500">Última actualización: <strong>16 de diciembre</strong></p>
        </div>

        <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-800">
          <p>
            Bienvenido a <strong>ConversorDeLetrasBonitas.org</strong>. Estos términos y condiciones describen las reglas y regulaciones para el uso de nuestro sitio web.
          </p>
          <p>
            Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando Conversor De Letras Bonitas si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.
          </p>

          <h3>1. Uso de la Herramienta</h3>
          <p>
            Se te concede una licencia limitada solo para fines de visualización y uso del material contenido en este sitio web. Nuestra herramienta de conversión de fuentes es de uso gratuito para fines personales y comerciales (por ejemplo, en tus redes sociales).
          </p>
          <ul>
            <li>No debes volver a publicar material de ConversorDeLetrasBonitas.org.</li>
            <li>No debes vender, alquilar ni sublicenciar material de ConversorDeLetrasBonitas.org.</li>
            <li>No debes reproducir, duplicar ni copiar material de ConversorDeLetrasBonitas.org con fines de crear un sitio competidor.</li>
          </ul>

          <h3>2. Descargo de Responsabilidad (Disclaimer)</h3>
          <p>
            Los materiales en el sitio web de ConversorDeLetrasBonitas.org se proporcionan "tal cual". No ofrecemos garantías, expresas o implícitas, y por la presente renunciamos y negamos todas las demás garantías, incluidas, entre otras, las garantías implícitas o condiciones de comerciabilidad, idoneidad para un propósito particular o no infracción de la propiedad intelectual u otra violación de derechos.
          </p>
          <p>
            Además, no garantizamos que el texto generado sea compatible con todas las aplicaciones o dispositivos. La compatibilidad de los caracteres Unicode depende enteramente del sistema operativo (Android/iOS) y la aplicación donde se pegue el contenido.
          </p>

          <h3>3. Limitaciones</h3>
          <p>
            En ningún caso ConversorDeLetrasBonitas.org o sus proveedores serán responsables de ningún daño (incluidos, entre otros, daños por pérdida de datos o beneficios, o debido a la interrupción del negocio) que surjan del uso o la imposibilidad de usar los materiales en el sitio web, incluso si nosotros o un representante autorizado hemos sido notificados oralmente o por escrito de la posibilidad de tal daño.
          </p>

          <h3>4. Enlaces a Terceros</h3>
          <p>
            Nuestro sitio web puede contener enlaces a sitios web de terceros que no son propiedad ni están controlados por nosotros. No tenemos control ni asumimos responsabilidad por el contenido, las políticas de privacidad o las prácticas de sitios web de terceros.
          </p>

          <h3>5. Modificaciones</h3>
          <p>
            ConversorDeLetrasBonitas.org puede revisar estos términos de servicio para su sitio web en cualquier momento sin previo aviso. Al utilizar este sitio web, aceptas estar sujeto a la versión actual de estos términos de servicio.
          </p>

          <h3>6. Ley Aplicable</h3>
          <p>
            Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes globales de internet y cualquier disputa estará sujeta a la jurisdicción exclusiva de los tribunales competentes.
          </p>
          
          <p className="mt-8 text-sm text-slate-400">
            Si tienes alguna duda sobre estos Términos, contáctanos en: <strong>info@conversordeletrasbonitas.org</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;