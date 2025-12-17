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

// Helper to extract slugs dynamically from the data file
const getBlogSlugs = () => {
  try {
    const dataPath = path.resolve(__dirname, '../data/blogPosts.ts');
    if (!fs.existsSync(dataPath)) {
      console.warn('⚠️ Warning: blogPosts.ts not found. Skipping dynamic blog slugs.');
      return [];
    }
    
    // Read the file content as string
    const content = fs.readFileSync(dataPath, 'utf-8');
    
    // Use regex to find all "slug: 'some-slug'" occurrences
    // Matches slug: '...' or slug: "..."
    const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
    const slugs = [];
    let match;
    
    while ((match = slugRegex.exec(content)) !== null) {
      if (match[1]) {
        slugs.push(match[1]);
      }
    }
    
    console.log(`📝 Found ${slugs.length} blog posts dynamically.`);
    return slugs;
  } catch (error) {
    console.error('❌ Error reading blog slugs:', error);
    return [];
  }
};

const generateSitemap = () => {
  const currentDate = new Date().toISOString();
  const blogSlugs = getBlogSlugs();

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
  blogSlugs.forEach(slug => {
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

  // Determine output directory from arguments, default to 'public'
  const targetDirName = process.argv[2] || 'public';
  const targetPath = path.resolve(__dirname, '..', targetDirName);

  // Ensure directory exists (Critical fix for CI/CD environments)
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  const outputPath = path.join(targetPath, 'sitemap.xml');
  
  fs.writeFileSync(outputPath, xml);
  console.log(`✅ Sitemap generated at ${outputPath}`);
};

generateSitemap();