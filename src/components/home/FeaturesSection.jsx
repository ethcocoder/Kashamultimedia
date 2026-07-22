import { Sparkles, Scissors, Paintbrush, User, Droplets, Brush, Star, Heart, Shield, Clock, Award, Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const iconMap = { Sparkles, Scissors, Paintbrush, User, Droplets, Brush, Star, Heart, Shield, Clock, Award, Zap };

export default function FeaturesSection({ features = [], section = {} }) {
  const { lang } = useLanguage();

  if (features.length === 0) return null;

  return (
    <section className="section">
      <div className="text-center" style={{ marginBottom: 'clamp(32px, 5vw, 64px)' }}>
        <p className="label mb-3">{section.label?.[lang] || section.label?.en || 'Why Us'}</p>
        <h2 className="heading-lg">{section.title?.[lang] || section.title?.en || 'Why Choose Us'}</h2>
        {section.subtitle?.[lang] || section.subtitle?.en ? (
          <p className="text-sm text-[var(--gray-500)] mt-3 mx-auto" style={{ maxWidth: '480px' }}>
            {section.subtitle?.[lang] || section.subtitle?.en}
          </p>
        ) : null}
        <div className="divider" style={{ marginTop: 'clamp(20px, 3vw, 32px)' }} />
      </div>

      <div className="grid-auto">
        {features.map((feat, i) => {
          const Icon = iconMap[feat.icon] || Sparkles;
          return (
            <div key={i} className="card card-pad group text-center">
              <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold-border)' }}>
                <Icon className="w-6 h-6 text-[var(--gold)]" />
              </div>
              <h3 className="heading-sm mb-2 text-[var(--white)]">
                {feat.title?.[lang] || feat.title?.en || ''}
              </h3>
              <p className="text-sm text-[var(--gray-500)] leading-relaxed">
                {feat.description?.[lang] || feat.description?.en || ''}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
