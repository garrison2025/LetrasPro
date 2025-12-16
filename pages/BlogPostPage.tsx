import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPostBySlug } from '../data/blogPosts';
import { Calendar, User, ChevronLeft, Tag } from 'lucide-react';

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
    <article className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
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
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary-600 mb-8 transition-colors group"
        >
          <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
          Volver al Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wide">
                <Tag size={12} className="mr-1.5" />
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-slate-500 pb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <User size={16} />
              </div>
              <span className="font-medium text-slate-700">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.imageUrl && (
          <div className="mb-12 rounded-3xl overflow-hidden shadow-lg border border-slate-100 aspect-video">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              loading="eager"
            />
          </div>
        )}

        {/* Content */}
        <div 
          className="prose prose-slate prose-lg max-w-none 
            prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900 
            prose-a:text-primary-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline 
            prose-img:rounded-2xl prose-strong:text-slate-900 prose-li:marker:text-primary-500"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Share / CTA Footer */}
        <div className="mt-16 pt-8 border-t border-slate-100 bg-slate-50 rounded-2xl p-8 text-center">
          <h3 className="font-display font-bold text-2xl text-slate-900 mb-3">¿Te ha gustado este artículo?</h3>
          <p className="text-slate-600 mb-6">Prueba ahora mismo nuestro generador y pon en práctica lo aprendido.</p>
          <Link 
            to="/" 
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-full font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
          >
            Ir al Generador
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage;