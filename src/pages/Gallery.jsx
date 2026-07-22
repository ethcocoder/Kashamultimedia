import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getPublished } from '../services/firestore';
import { X } from 'lucide-react';

export default function Gallery() {
  const { t, lang } = useLanguage();
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => { getPublished('gallery').then(setItems).catch(() => {}); }, []);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <section className="section">
      <div className="text-center anim-fade-up" style={{ marginBottom: 'clamp(32px, 5vw, 64px)' }}>
        <p className="label mb-3">Portfolio</p>
        <h1 className="heading-lg">{t('galleryTitle')}</h1>
        <p className="text-sm text-[var(--gray-500)] mx-auto mt-4" style={{ maxWidth: '480px' }}>{t('gallerySubtitle')}</p>
        <div className="divider" style={{ marginTop: 'clamp(20px, 3vw, 32px)' }} />
      </div>
      <div className="grid-auto-xs">
        {items.map((item, i) => (
          <button key={item.id} onClick={() => setSelected(item)} className="card overflow-hidden anim-fade-up text-left" style={{ animationDelay: `${i * 0.04}s` }}>
            <img src={item.imageUrl} alt={item.title?.[lang] || ''} className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500" />
            {item.title && (
              <div style={{ padding: 'clamp(8px, 1.5vw, 12px)' }}>
                <p className="text-xs text-[var(--gray-500)] truncate">{item.title?.[lang] || item.title?.en || ''}</p>
              </div>
            )}
          </button>
        ))}
      </div>
      {items.length === 0 && <p className="text-center text-[var(--gray-700)] py-16 text-sm">No gallery items yet.</p>}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-pointer" onClick={() => setSelected(null)}>
          <img src={selected.imageUrl} alt="" className="max-w-full max-h-[90vh] rounded-xl anim-scale object-contain" />
          <button className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-[var(--black-card)] border border-[var(--white-faint)] flex items-center justify-center text-[var(--gray-400)] hover:text-[var(--white)] transition-colors" onClick={() => setSelected(null)}>
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
}
