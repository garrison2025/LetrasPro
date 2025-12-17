import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define Base URL
const BASE_URL = 'https://conversordeletrasbonitas.org';

// Manual definition of paths to avoid TypeScript compilation issues in standalone script
// This mirrors the structure in constants.ts
const STATIC_PATHS = [
  '/', 
  '/letras-cursivas',
  '/letras-tatuajes',
  '/letras-goticas',
  '/letras-graffiti',
  '/letras-amino',
  '/letras-facebook',
  '/letras-tattoo',
  '/repetidor-de-texto',
  '/texto-invisible',
  '/texto-glitch',
  '/texto-al-reves',
  '/letras-grandes',
  '/blog',
  '/sobre-nosotros',
  '/contacto',
  '/politica-de-privacidad',
  '/terminos-y-condiciones'
];

// In a real scenario, we would also fetch blog posts to add dynamic slugs
// For now, we will hardcode the existing blog post slugs
const BLOG_SLUGS = [
  'guia-definitiva-conversor-letras-bonitas-instagram-facebook',
  'letras-para-tatuajes-guia-estilos-goticos-cursivos',
  'mejores-nicks-free-fire-pubg-graffiti'
];

const generateSitemap = () => {
  const currentDate = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add Static Pages
  STATIC_PATHS.forEach(route => {
    xml += `
  <url>
    <loc>${BASE_URL}${route === '/' ? '' : route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  });

  // Add Blog Posts
  BLOG_SLUGS.forEach(slug => {
    xml += `
  <url>
    <loc>${BASE_URL}/blog/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
  
  fs.writeFileSync(outputPath, xml);
  console.log(`✅ Sitemap generated at ${outputPath}`);
};

generateSitemap();