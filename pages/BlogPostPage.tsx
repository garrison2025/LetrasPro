import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPostBySlug } from '../data/blogPosts';
import { Calendar, User, ChevronLeft, Tag, Share2, Home } from 'lucide-react';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const canonicalUrl = `https://conversordeletrasbonitas.org/blog/${post.slug}`;

  // Structured Data Array: Article Schema + Breadcrumb Schema
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.imageUrl ? [post.imageUrl] : [],
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "datePublished": post.date,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Inicio",
          "item": "https://conversordeletrasbonitas.org/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://conversordeletrasbonitas.org/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": canonicalUrl
        }
      ]
    }
  ];

  return (
    <article className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 min-h-screen font-sans transition-colors duration-300">
      <Helmet>
        <title>{post.title} - Blog LetrasPro</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={canonicalUrl} />
        {post.imageUrl && <meta property="og:image" content={post.imageUrl} />}
        
        {/* Schema */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb / Back Navigation - Improved Contrast */}
        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-8" aria-label="Breadcrumb">
           <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"><Home size={16} /></Link>
           <span className="text-slate-400 dark:text-slate-600">/</span>
           <Link to="/blog" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-bold">Blog</Link>
           <span className="text-slate-400 dark:text-slate-600">/</span>
           <span className="text-slate-900 dark:text-slate-200 truncate max-w-[200px] sm:max-w-xs font-medium">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-12 text-center sm:text-left">
          <div className="flex flex-wrap gap-2 mb-6 justify-center sm:justify-start">
            {post.tags.map(tag => (
              <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-bold uppercase tracking-wide border border-primary-100 dark:border-primary-800">
                <Tag size={12} className="mr-1.5" />
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-8 leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-slate-600 dark:text-slate-400 pb-8 border-b border-slate-100 dark:border-slate-800 justify-center sm:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 border border-white dark:border-slate-800 shadow-sm">
                <User size={20} />
              </div>
              <div className="text-left">
                <span className="block font-bold text-slate-900 dark:text-white text-base">{post.author}</span>
                <span className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wider font-bold">Equipo Editorial</span>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-slate-200 dark:bg-slate-700"></div>
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl">
              <Calendar size={18} className="text-primary-500" />
              <time dateTime={post.date} className="font-semibold text-slate-700 dark:text-slate-300">
                {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.imageUrl && (
          <div className="mb-16 rounded-3xl overflow-hidden shadow-xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-700 aspect-video relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img 
              src={post.imageUrl} 
              alt={post.title}
              width="1200"
              height="675"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              loading="eager"
            />
          </div>
        )}

        {/* Content - Darkened text colors for contrast */}
        <div 
          className="prose prose-slate dark:prose-invert prose-lg max-w-none 
            /* Spacing adjustments for Paragraphs */
            prose-p:text-slate-700 dark:prose-p:text-slate-400 prose-p:leading-8 prose-p:mb-8 prose-p:mt-0
            
            /* Custom Lead Paragraph Style (needs 'lead' class in HTML) */
            [&_.lead]:text-xl [&_.lead]:leading-relaxed [&_.lead]:text-slate-900 dark:[&_.lead]:text-slate-200 [&_.lead]:font-medium [&_.lead]:mb-12
            
            /* Headings Spacing */
            prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-headings:leading-tight
            prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-3xl
            prose-h3:mt-12 prose-h3:mb-4 prose-h3:text-2xl
            
            /* Links */
            prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:font-bold prose-a:no-underline hover:prose-a:text-primary-700 dark:hover:prose-a:text-primary-300 hover:prose-a:underline hover:prose-a:decoration-2 hover:prose-a:decoration-primary-300
            
            /* Images within content */
            prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-12
            
            /* Lists */
            prose-li:text-slate-700 dark:prose-li:text-slate-400 prose-li:mb-3 prose-ul:my-8 prose-ol:my-8 prose-ul:list-disc prose-ol:list-decimal
            
            /* Blockquotes */
            prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-800/50 prose-blockquote:py-8 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:my-12 prose-blockquote:not-italic prose-blockquote:shadow-sm prose-blockquote:text-slate-800 dark:prose-blockquote:text-slate-300
            
            /* Strong/Bold */
            prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-bold"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Share / CTA Footer */}
        <div className="mt-20 pt-12 border-t border-slate-100 dark:border-slate-800">
           <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl -ml-10 -mb-10"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary-300">
                   <Share2 size={32} />
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl mb-4">¡Comparte el conocimiento!</h3>
                <p className="text-slate-300 mb-8 max-w-lg mx-auto leading-relaxed">
                  Si este artículo te ayudó a mejorar tu perfil, compártelo con tus amigos o prueba nuestro generador ahora mismo.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/" 
                    className="inline-flex items-center justify-center bg-white text-slate-900 px-8 py-3.5 rounded-xl font-bold hover:bg-primary-50 transition-all transform hover:-translate-y-1 shadow-lg"
                  >
                    Ir al Generador
                  </Link>
                  <button 
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: post.title,
                          text: post.excerpt,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Enlace copiado al portapapeles');
                      }
                    }}
                    className="inline-flex items-center justify-center bg-transparent border border-white/30 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/10 transition-colors"
                  >
                    Compartir Artículo
                  </button>
                </div>
              </div>
           </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage;