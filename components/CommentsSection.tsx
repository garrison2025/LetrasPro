import React, { useState, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { USAGE_TIPS, Comment } from '../data/staticComments';
import { readStoredArray, writeStorage } from '../services/storage';

const FormattedText: React.FC<{ text: string }> = ({ text }) => (
  <p>{text.split(/\*\*(.*?)\*\*/g).map((part, index) => index % 2 === 1
    ? <strong key={index} className="text-primary-600 dark:text-primary-400">{part}</strong>
    : part)}</p>
);

const CommentsSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    setComments(readStoredArray('let_pro_user_comments', (value): value is Comment => {
      if (typeof value !== 'object' || value === null) return false;
      const item = value as Record<string, unknown>;
      return typeof item.id === 'string' && item.id.startsWith('u-')
        && typeof item.author === 'string' && typeof item.content === 'string'
        && typeof item.date === 'string';
    }).slice(0, 8));
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newComment.trim()) return;
    const note: Comment = {
      id: `u-${Date.now()}`, author: username.trim().slice(0, 80) || 'Anónimo',
      avatarColor: 'bg-primary-600', date: new Date().toLocaleDateString('es-ES'),
      content: newComment.trim().slice(0, 2000), likes: 0
    };
    const updated = [note, ...comments].slice(0, 8);
    setComments(updated);
    const saved = writeStorage('let_pro_user_comments', JSON.stringify(updated));
    setNotice(saved ? 'Nota guardada solo en este navegador.' : 'Nota visible en esta sesión. No se pudo guardar en este navegador.');
    setNewComment('');
  };

  return (
    <section className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 sm:p-10 border border-slate-100 dark:border-slate-700 shadow-sm mt-12 mb-12">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Consejos de uso</h2>
      <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-10">
        {USAGE_TIPS.map((tip, index) => <FormattedText key={index} text={tip} />)}
      </div>
      <div className="flex items-center gap-3 mb-3">
        <MessageSquare className="text-primary-600 dark:text-primary-400" aria-hidden="true" />
        <h3 className="text-xl font-black text-slate-900 dark:text-white">Tus notas</h3>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Se guardan solo en este navegador. No se publican ni se envían al sitio; otros visitantes no pueden verlas.</p>
      <form onSubmit={handleSubmit} className="mb-8 space-y-3">
        <label htmlFor="note-name" className="block text-sm font-bold text-slate-700 dark:text-slate-300">Tu nombre (opcional)</label>
        <input id="note-name" type="text" value={username} onChange={event => setUsername(event.target.value)} maxLength={80} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
        <label htmlFor="note-text" className="block text-sm font-bold text-slate-700 dark:text-slate-300">Nota personal</label>
        <textarea id="note-text" value={newComment} onChange={event => setNewComment(event.target.value)} maxLength={2000} rows={3} className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
        <button type="submit" disabled={!newComment.trim()} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 text-white font-bold disabled:opacity-50"><Send size={16} aria-hidden="true" /> Guardar nota</button>
      </form>
      {notice && <p role="status" className="text-sm text-slate-600 dark:text-slate-300 mb-4">{notice}</p>}
      <div className="space-y-4">
        {comments.map(comment => (
          <article key={comment.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 text-sm text-slate-600 dark:text-slate-300">
            <p className="font-bold mb-2">{comment.author} · {comment.date}</p>
            <FormattedText text={comment.content} />
          </article>
        ))}
      </div>
    </section>
  );
};

export default CommentsSection;
