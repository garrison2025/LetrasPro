import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Send, User } from 'lucide-react';
import { STATIC_COMMENTS, Comment } from '../data/staticComments';

const CommentsSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(STATIC_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');

  // Load local user comments to merge with static ones
  useEffect(() => {
    const saved = localStorage.getItem('let_pro_user_comments');
    if (saved) {
      setComments([...JSON.parse(saved), ...STATIC_COMMENTS]);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const userComment: Comment = {
      id: `u-${Date.now()}`,
      author: username || 'Anónimo',
      avatarColor: 'bg-primary-600',
      date: 'Ahora mismo',
      content: newComment,
      likes: 0
    };

    const updated = [userComment, ...comments];
    setComments(updated);
    
    // Save only user comments locally to persist across reloads for THIS user
    const userComments = updated.filter(c => c.id.startsWith('u-'));
    localStorage.setItem('let_pro_user_comments', JSON.stringify(userComments));
    
    setNewComment('');
  };

  return (
    <section className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 sm:p-10 border border-slate-100 dark:border-slate-700 shadow-sm mt-12 mb-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-2xl text-primary-600 dark:text-primary-400">
          <MessageSquare size={24} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Comunidad</h2>
        <span className="text-sm font-bold text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">{comments.length}</span>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-10 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
             <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
               <User size={20} className="text-slate-400" />
             </div>
             <input 
               type="text" 
               placeholder="Tu nombre (opcional)"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               className="bg-transparent border-b-2 border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none px-2 py-2 text-sm font-bold text-slate-700 dark:text-slate-300 w-full sm:w-1/2 transition-colors"
             />
          </div>
          <div className="relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="¿Qué te pareció el conversor? ¡Deja tu opinión!"
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 outline-none resize-none min-h-[100px]"
            />
            <button 
              type="submit"
              disabled={!newComment.trim()}
              aria-label="Enviar comentario"
              className="absolute bottom-3 right-3 p-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary-600/20"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.slice(0, 8).map((comment) => (
          <article key={comment.id} className="flex gap-4 animate-fade-in">
            <div className={`w-10 h-10 rounded-full ${comment.avatarColor} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md`}>
              {comment.author.charAt(0).toUpperCase()}
            </div>
            <div className="flex-grow">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-black text-slate-900 dark:text-white text-sm">{comment.author}</span>
                <span className="text-xs font-bold text-slate-400">{comment.date}</span>
              </div>
              <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium bg-slate-50 dark:bg-slate-900/50 p-4 rounded-r-2xl rounded-bl-2xl">
                {/* Render with limited markdown support for bolding keywords */}
                <p dangerouslySetInnerHTML={{ 
                  __html: comment.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary-600 dark:text-primary-400">$1</strong>') 
                }} />
              </div>
              <div className="flex items-center gap-4 mt-2 ml-2">
                <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-primary-600 transition-colors group">
                  <ThumbsUp size={14} className="group-hover:scale-110 transition-transform" /> 
                  {comment.likes > 0 ? comment.likes : 'Útil'}
                </button>
                <button className="text-xs font-bold text-slate-400 hover:text-primary-600 transition-colors">
                  Responder
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CommentsSection;