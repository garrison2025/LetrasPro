import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define Base URL
const BASE_URL = 'https://conversordeletrasbonitas.org';

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

const getBlogSlugs = () => {
  try {
    const dataPath = path.resolve(__dirname, '../data/blogPosts.ts');
    if (!fs.existsSync(dataPath)) return [];
    const content = fs.readFileSync(dataPath, 'utf-8');
    const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
    const slugs = [];
    let match;
    while ((match = slugRegex.exec(content)) !== null) {
      if (match[1]) slugs.push(match[1]);
    }
    return slugs;
  } catch (error) {
    console.error('❌ Error reading blog slugs:', error);
    return [];
  }
};

const generateFiles = () => {
  // 1. Setup paths
  const targetDirName = process.argv[2] || 'public';
  const targetPath = path.resolve(__dirname, '..', targetDirName);
  
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  const currentDate = new Date().toISOString();
  const blogSlugs = getBlogSlugs();

  // 2. Generate Sitemap
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  STATIC_PATHS.forEach(route => {
    sitemap += `
  <url>
    <loc>${BASE_URL}${route === '/' ? '' : route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  });

  blogSlugs.forEach(slug => {
    sitemap += `
  <url>
    <loc>${BASE_URL}/blog/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  fs.writeFileSync(path.join(targetPath, 'sitemap.xml'), sitemap);
  console.log(`✅ Sitemap generated at ${path.join(targetPath, 'sitemap.xml')}`);

  // 3. Generate Robots.txt (CRITICAL FOR CLOUDFLARE)
  // Generating it here ensures it physically exists in 'dist' after build
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://conversordeletrasbonitas.org/sitemap.xml`;

  fs.writeFileSync(path.join(targetPath, 'robots.txt'), robotsTxt);
  console.log(`✅ Robots.txt generated at ${path.join(targetPath, 'robots.txt')}`);
};

generateFiles();