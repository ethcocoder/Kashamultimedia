import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getPublished } from '../services/firestore';

export default function Blog() {
  const { t, lang } = useLanguage();
  const [posts, setPosts] = useState([]);

  useEffect(() => { getPublished('blog').then(setPosts).catch(() => {}); }, []);

  return (
    <section className="section">
      <div className="text-center anim-fade-up" style={{ marginBottom: 'clamp(32px, 5vw, 64px)' }}>
        <p className="label mb-3">Updates</p>
        <h1 className="heading-lg">{t('blogTitle')}</h1>
        <p className="text-sm text-[var(--gray-500)] mx-auto mt-4" style={{ maxWidth: '480px' }}>{t('blogSubtitle')}</p>
        <div className="divider" style={{ marginTop: 'clamp(20px, 3vw, 32px)' }} />
      </div>
      <div className="grid-auto">
        {posts.map((post, i) => (
          <article key={post.id} className="card overflow-hidden anim-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
            {post.imageUrl && <img src={post.imageUrl} alt="" className="w-full object-cover" style={{ height: 'clamp(140px, 20vw, 180px)' }} />}
            <div className="card-pad-sm">
              <h2 className="heading-sm mb-2">{post.title?.[lang] || post.title?.en || ''}</h2>
              <p className="text-sm text-[var(--gray-500)] line-clamp-3 leading-relaxed">{post.description?.[lang] || post.description?.en || ''}</p>
              {post.author && <p className="text-xs text-[var(--gray-700)] mt-3">{post.author}</p>}
            </div>
          </article>
        ))}
      </div>
      {posts.length === 0 && <p className="text-center text-[var(--gray-700)] py-16 text-sm">No posts yet.</p>}
    </section>
  );
}
