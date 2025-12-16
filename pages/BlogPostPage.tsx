import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPostBySlug } from '../data/blogPosts';
import { Calendar, User, ChevronLeft, Tag, Share2 } from 'lucide-react';

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

  // Structured Data for SEO (Article Schema)
  const structuredData = {
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
  };

  return (
    <article className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 bg-white min-h-screen font-sans">
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
        {/* Breadcrumb / Back */}
        <Link 
          to="/blog" 
          className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-primary-600 mb-8 transition-colors group tracking-wide uppercase"
        >
          <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
          Volver al Blog
        </Link>

        {/* Header */}
        <header className="mb-10 text-center sm:text-left">
          <div className="flex flex-wrap gap-2 mb-6 justify-center sm:justify-start">
            {post.tags.map(tag => (
              <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wide border border-primary-100">
                <Tag size={12} className="mr-1.5" />
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-slate-500 pb-8 border-b border-slate-100 justify-center sm:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center text-primary-700 border border-white shadow-sm">
                <User size={18} />
              </div>
              <div>
                <span className="block font-bold text-slate-900">{post.author}</span>
                <span className="text-xs text-slate-400">Editor Senior</span>
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-primary-500" />
              <time dateTime={post.date} className="font-medium">
                {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.imageUrl && (
          <div className="mb-12 rounded-3xl overflow-hidden shadow-xl shadow-primary-900/5 border border-slate-100 aspect-video relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              loading="eager"
            />
          </div>
        )}

        {/* Content */}
        <div 
          className="prose prose-slate prose-lg max-w-none 
            prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900 prose-headings:leading-tight
            prose-p:text-slate-600 prose-p:leading-8 prose-p:mb-6
            prose-a:text-primary-600 prose-a:font-bold prose-a:no-underline hover:prose-a:text-primary-700 hover:prose-a:underline hover:prose-a:decoration-2 hover:prose-a:decoration-primary-300
            prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8
            prose-li:text-slate-600 prose-li:marker:text-primary-500
            prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-slate-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:font-medium prose-blockquote:text-slate-700
            prose-strong:text-slate-900 prose-strong:font-bold"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Share / CTA Footer */}
        <div className="mt-16 pt-10 border-t border-slate-100">
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