import React from 'react';
import { PageMetadata as Helmet } from '../components/PageMetadata';
import { Lock } from 'lucide-react';

const PrivacyPage: React.FC = () => {
const canonicalUrl = "https://conversordeletrasbonitas.org/politica-de-privacidad";

  return (
    <div className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Política de Privacidad - Conversor de Letras Bonitas</title>
        <meta name="description" content="Política de privacidad de ConversorDeLetrasBonitas.org. Descubre cómo protegemos tus datos y respetamos tu privacidad al usar nuestra herramienta." />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-sm dark:bg-slate-800 dark:border-slate-700">
        <div className="border-b border-slate-100 pb-8 mb-8 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4 text-primary-600">
            <Lock size={24} />
            <span className="font-bold uppercase tracking-wider text-sm">Legal</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 dark:text-white">Política de Privacidad</h1>
          <p className="text-slate-500 dark:text-slate-400">Última actualización: <strong>10 de octubre de 2026</strong></p>
        </div>

        <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-800 prose-a:text-primary-600 dark:prose-invert dark:prose-headings:text-white">
          <p>
            En <strong>ConversorDeLetrasBonitas.org</strong>, accesible desde https://conversordeletrasbonitas.org, una de nuestras principales prioridades es la privacidad de nuestros visitantes. Este documento de Política de Privacidad contiene tipos de información que se recopila y registra y cómo la utilizamos.
          </p>

          <h3>1. Información que recopilamos</h3>
          <p>
            ConversorDeLetrasBonitas.org es una herramienta del lado del cliente. Esto significa que:
          </p>
          <ul>
            <li><strong>No enviamos el texto que escribes a nuestros servidores:</strong> Todo el proceso de conversión de fuentes ocurre en tu propio navegador (Chrome, Safari, Firefox, etc.) utilizando JavaScript. El generador conserva una copia en el almacenamiento local de este navegador, junto con favoritos, historial, notas, valoraciones y tema, si el navegador lo permite. Puedes borrar el texto, favoritos y valoración en «Datos guardados en este navegador», el historial con «Borrar todo» y cada nota con «Eliminar nota». Para eliminar todos los datos y cachés, usa los ajustes de datos de sitios de tu navegador.</li>
            <li><strong>No solicitamos datos personales:</strong> No pedimos nombres, direcciones de correo electrónico ni números de teléfono para utilizar la herramienta básica.</li>
          </ul>

          <h3>2. Archivos de registro (Log Files)</h3>
          <p>
            ConversorDeLetrasBonitas.org sigue un procedimiento estándar de uso de archivos de registro. Estos archivos registran a los visitantes cuando visitan sitios web. La información recopilada incluye direcciones de protocolo de Internet (IP), tipo de navegador, proveedor de servicios de Internet (ISP), fecha y hora, páginas de referencia/salida y posiblemente el número de clics. Estos no están vinculados a ninguna información que sea personalmente identificable.
          </p>
          <p>
            Cuando el diagnóstico técnico está activado, enviamos a Cloudflare únicamente categorías fijas de fallo o rendimiento, y una versión técnica de publicación (visualización, navegador, operación, funcionamiento sin conexión o actualización) para contar errores y agrupar medidas aproximadas de velocidad, interacción y estabilidad visual. Las medidas se envían por intervalos, sin texto, rutas ni valores exactos. Los fallos del navegador distinguen scripts del sitio, externos o de origen desconocido; también contamos por separado los fallos recuperables al iniciar la página. Este envío no incluye el texto del conversor, direcciones de páginas, parámetros de búsqueda, mensajes de error, identificadores de usuario ni cookies. Las estadísticas distinguen el sitio público de las pruebas y se conservan durante tres meses en Cloudflare Analytics Engine. Cloudflare procesa por separado los datos de conexión necesarios para prestar su servicio. Un fallo en el envío del diagnóstico no impide utilizar la herramienta.
          </p>

          <h3>3. Cookies y Web Beacons</h3>
          <p>
            Como cualquier otro sitio web, utilizamos "cookies". Las preferencias de la herramienta se guardan con localStorage, no con cookies propias de cuenta. Los servicios externos de publicidad pueden utilizar cookies y tecnologías similares; puedes administrarlas desde tu navegador. La información se utiliza para optimizar la experiencia de los usuarios personalizando el contenido de nuestra página web según el tipo de navegador de los visitantes y/u otra información.
          </p>

          <h3>4. Servicios de publicidad</h3>
          <p>
            El sitio carga publicidad de Monetag mediante 5gvci.com y un script de effectivecpmnetwork.com. Estos servicios pueden procesar datos de conexión, cookies u otros identificadores según su configuración y sus propias políticas. Las fuentes se solicitan a Google Fonts y algunas imágenes a Unsplash; esas solicitudes también comunican datos de conexión al proveedor. Consulta las políticas del proveedor y los controles de privacidad de tu navegador.
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
