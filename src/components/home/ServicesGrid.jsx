import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { getPublished } from '../../services/firestore';
import { Scissors, Paintbrush, Sparkles, User, Droplets, Brush } from 'lucide-react';

const iconMap = { Scissors, Paintbrush, Sparkles, User, Droplets, Brush };

export default function ServicesGrid({ section = {} }) {
  const { t, lang } = useLanguage();
  const [services, setServices] = useState([]);

  useEffect(() => {
    getPublished('services').then(setServices).catch(() => {});
  }, []);

  if (services.length === 0) return null;

  const limit = section.limit || 6;
  const displayServices = services.slice(0, limit);
  const hasMore = services.length > limit;

  return (
    <section className="section">
      <div className="text-center" style={{ marginBottom: 'clamp(32px, 5vw, 64px)' }}>
        <p className="label mb-3">{section.label?.[lang] || section.label?.en || t('barbershop')}</p>
        <h2 className="heading-lg">{section.title?.[lang] || section.title?.en || t('servicesTitle')}</h2>
        {(section.subtitle?.[lang] || section.subtitle?.en) && (
          <p className="text-sm text-[var(--gray-500)] mt-3 mx-auto" style={{ maxWidth: '480px' }}>
            {section.subtitle?.[lang] || section.subtitle?.en}
          </p>
        )}
        <div className="divider" style={{ marginTop: 'clamp(20px, 3vw, 32px)' }} />
      </div>

      <div className="grid-auto">
        {displayServices.map((s, i) => {
          const Icon = iconMap[s.icon] || Scissors;
          return (
            <Link key={s.id} to="/services" className="card card-pad group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[var(--gold-dim)] border border-[var(--gold-border)] flex items-center justify-center" style={{ marginBottom: 'clamp(14px, 2vw, 20px)' }}>
                <Icon className="w-5 h-5 text-[var(--gold)]" />
              </div>
              <h3 className="heading-sm mb-2 text-[var(--white)]">
                {s.name?.[lang] || s.name?.en || ''}
              </h3>
              <p className="text-sm text-[var(--gray-500)] line-clamp-2 leading-relaxed mb-4">
                {s.description?.[lang] || s.description?.en || ''}
              </p>
              {s.price && (
                <span className="text-[var(--gold)] text-sm font-semibold">{s.price}</span>
              )}
            </Link>
          );
        })}
      </div>

      {hasMore && (
        <div className="text-center" style={{ marginTop: 'clamp(20px, 3vw, 40px)' }}>
          <Link to="/services" className="label text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors">
            {t('showMore')} &rarr;
          </Link>
        </div>
      )}
    </section>
  );
}
