import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getPublished } from '../services/firestore';
import { Scissors, Paintbrush, Sparkles, User, Droplets, Brush } from 'lucide-react';

const iconMap = { Scissors, Paintbrush, Sparkles, User, Droplets, Brush };

export default function Services() {
  const { t, lang } = useLanguage();
  const [services, setServices] = useState([]);

  useEffect(() => { getPublished('services').then(setServices).catch(() => {}); }, []);

  return (
    <section className="section">
      <div className="text-center anim-fade-up" style={{ marginBottom: 'clamp(32px, 5vw, 64px)' }}>
        <p className="label mb-3">{t('barbershop')}</p>
        <h1 className="heading-lg">{t('servicesTitle')}</h1>
        <p className="text-sm text-[var(--gray-500)] mx-auto mt-4" style={{ maxWidth: '480px' }}>{t('servicesSubtitle')}</p>
        <div className="divider" style={{ marginTop: 'clamp(20px, 3vw, 32px)' }} />
      </div>
      <div className="grid-auto">
        {services.map((s, i) => {
          const Icon = iconMap[s.icon] || Scissors;
          return (
            <div key={s.id} className="card card-pad anim-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[var(--gold-dim)] border border-[var(--gold-border)] flex items-center justify-center" style={{ marginBottom: 'clamp(14px, 2vw, 20px)' }}>
                <Icon className="w-5 h-5 text-[var(--gold)]" />
              </div>
              <h3 className="heading-sm mb-2">{s.name?.[lang] || s.name?.en || ''}</h3>
              <p className="text-sm text-[var(--gray-500)] leading-relaxed line-clamp-3 mb-4 sm:mb-5">{s.description?.[lang] || s.description?.en || ''}</p>
              <div className="flex items-center justify-between border-t border-[var(--white-faint)] pt-4">
                {s.price && <span className="text-[var(--gold)] text-sm font-semibold">{s.price}</span>}
                {s.duration && <span className="text-xs text-[var(--gray-700)]">{s.duration} min</span>}
              </div>
            </div>
          );
        })}
      </div>
      {services.length === 0 && <p className="text-center text-[var(--gray-700)] py-16 text-sm">No services available yet.</p>}
    </section>
  );
}
