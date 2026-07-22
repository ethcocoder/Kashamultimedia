import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
  const { t, lang } = useLanguage();

  const pillars = [
    { title: t('pillar1'), desc: t('pillar1Desc'), icon: '🌿' },
    { title: t('pillar2'), desc: t('pillar2Desc'), icon: '💊' },
    { title: t('pillar3'), desc: t('pillar3Desc'), icon: '🌾' },
    { title: t('pillar4'), desc: t('pillar4Desc'), icon: '🎨' },
    { title: t('pillar5'), desc: t('pillar5Desc'), icon: '📚' },
    { title: t('pillar6'), desc: t('pillar6Desc'), icon: '🌌' },
  ];

  return (
    <div className="min-h-screen">
      {/* About Section */}
      <section className="section">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="label mb-3">{t('about')}</p>
            <h1 className="heading-lg mb-6">{t('aboutTitle')}</h1>
            <div className="divider mx-auto" />
          </div>

          <div className="space-y-8">
            <div className="card card-pad">
              <h2 className="heading-sm mb-4 text-[var(--gold)]">{t('aboutTitle')}</h2>
              <p className="text-[var(--gray-400)] leading-relaxed mb-4">
                {t('aboutText')}
              </p>
            </div>

            <div className="card card-pad">
              <h2 className="heading-sm mb-4 text-[var(--gold)]">{t('missionTitle')}</h2>
              <p className="text-[var(--gray-400)] leading-relaxed">
                {t('missionText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Domains Section */}
      <section className="section bg-[var(--black-elevated)]">
        <div className="text-center mb-12">
          <p className="label mb-3">{t('system')}</p>
          <h2 className="heading-lg mb-4">{t('pillarsTitle')}</h2>
          <p className="text-[var(--gray-500)] max-w-2xl mx-auto">
            {t('pillarsSubtitle')}
          </p>
          <div className="divider mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="card card-pad group hover:border-[var(--gold)]/50 transition-colors">
              <div className="text-4xl mb-4">{pillar.icon}</div>
              <h3 className="heading-sm mb-3 group-hover:text-[var(--gold)] transition-colors">
                {pillar.title}
              </h3>
              <p className="text-sm text-[var(--gray-500)] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="card relative overflow-hidden text-center" style={{ padding: 'clamp(32px, 5vw, 64px)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold-dim)] via-transparent to-transparent" />
          <div className="relative">
            <h2 className="heading-lg mb-3">{t('heroTitle')}</h2>
            <p className="text-sm text-[var(--gray-500)] mb-6 mx-auto max-w-md">
              {t('heroSubtitle')}
            </p>
            <a href="/#/system" className="btn-primary mx-auto">
              {t('learnMore')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
