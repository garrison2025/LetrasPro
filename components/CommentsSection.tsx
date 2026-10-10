import React, { useState, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { USAGE_TIPS, Comment } from '../data/staticComments';
import { readStoredArray, writeStorage } from '../services/storage';

const FormattedText: React.FC<{ text: string }> = ({ text }) => (
  <p>{text.split(/\*\*(.*?)\*\*/g).map((part, index) => index % 2 === 1
    ? <strong key={index} className="text-primary-600 dark:text-primary-400">{part}</strong>
    : part)}</p>
);

const NOTE_PREFIX = 'let_pro_note_';
const LEGACY_NOTES_KEY = 'let_pro_user_comments';
const MAX_NOTES = 8;

const isNote = (value: unknown): value is Comment => {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Record<string, unknown>;
  return typeof item.id === 'string' && item.id.startsWith('u-')
    && typeof item.author === 'string' && typeof item.content === 'string'
    && typeof item.date === 'string';
};

function readNotes(): Comment[] | null {
  try {
    const notes = new Map(readStoredArray(LEGACY_NOTES_KEY, isNote).map(note => [note.id, note]));
    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index);
      if (!key?.startsWith(NOTE_PREFIX)) continue;
      const id = key.slice(NOTE_PREFIX.length);
      const stored = localStorage.getItem(key);
      if (stored === null) continue;
      try {
        const value: unknown = JSON.parse(stored);
        // A deletion marker also hides a legacy note without rewriting the shared array.
        if (value === null) notes.delete(id);
        else if (isNote(value) && value.id === id) notes.set(id, value);
      } catch { /* Ignore a damaged individual record without discarding other notes. */ }
    }
    return [...notes.values()].sort((a, b) => (Number(b.id.split('-')[1]) || 0) - (Number(a.id.split('-')[1]) || 0));
  } catch {
    return null;
  }
}

const CommentsSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const syncNotes = () => {
      const latest = readNotes();
      if (latest !== null) setComments(latest);
    };
    syncNotes();
    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === LEGACY_NOTES_KEY || event.key.startsWith(NOTE_PREFIX)) syncNotes();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newComment.trim()) return;
    const latest = readNotes();
    if (latest === null) {
      setNotice('No se pudo acceder a las notas guardadas. Tu texto sigue en el formulario.');
      return;
    }
    setComments(latest);
    if (latest.length >= MAX_NOTES) {
      setNotice('Tienes 8 o más notas. Elimina una antes de guardar otra. Tu texto sigue en el formulario.');
      return;
    }
    const note: Comment = {
      id: `u-${Date.now()}-${crypto.randomUUID()}`, author: username.trim().slice(0, 80) || 'Anónimo',
      avatarColor: 'bg-primary-600', date: new Date().toLocaleDateString('es-ES'),
      content: newComment.trim().slice(0, 2000), likes: 0
    };
    // Separate keys keep simultaneous saves from overwriting another page's records.
    if (!writeStorage(`${NOTE_PREFIX}${note.id}`, JSON.stringify(note))) {
      setNotice('No se pudo guardar la nota. Tu texto sigue en el formulario.');
      return;
    }
    setComments(readNotes() || [note, ...latest]);
    setNotice('Nota guardada solo en este navegador.');
    setNewComment('');
  };

  const deleteNote = (id: string) => {
    if (!writeStorage(`${NOTE_PREFIX}${id}`, 'null')) {
      setNotice('No se pudo eliminar la nota. Sigue guardada en este navegador.');
      return;
    }
    setComments(readNotes() || comments.filter(comment => comment.id !== id));
    setNotice('Nota eliminada de este navegador.');
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
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{comments.length} notas guardadas. Con 8 o más notas, elimina una antes de guardar otra. No se reemplazan automáticamente.</p>
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
            <button type="button" onClick={() => deleteNote(comment.id)} aria-label={`Eliminar nota de ${comment.author}`} className="mt-3 text-red-600 dark:text-red-400 underline">Eliminar nota</button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CommentsSection;
