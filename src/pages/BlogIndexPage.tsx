import React, { useEffect } from 'react';
import { BLOG_POSTS } from '../data/blogPosts';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';

const BlogIndexPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
            <BookOpen size={16} />
            Blog & Tutoriales
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-6">
            Recursos para <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">Creadores</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 font-light">
            Descubre guías, trucos y tendencias sobre tipografía digital, personalización de perfiles y diseño para redes sociales.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
            >
              <div className="p-8 flex-grow">
                {/* Tags */}
                <div className="flex gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="font-display font-bold text-2xl text-slate-900 mb-4 leading-tight group-hover:text-primary-600 transition-colors">
                  <a href={`/blog/${post.slug}`}>
                    {post.title}
                  </a>
                </h2>
                
                <p className="text-slate-500 mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Footer Meta */}
              <div className="px-8 pb-8 pt-0 mt-auto flex items-center justify-between border-t border-slate-50 pt-6">
                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
                
                <a 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300"
                  aria-label={`Leer ${post.title}`}
                >
                  <ArrowRight size={20} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogIndexPage;