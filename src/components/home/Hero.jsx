import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getById } from '../../services/firestore';

const DEFAULT_HERO = {
  heroImage: '',
  overlayOpacity: 70,
  title: { en: 'Kasha Multimedia CMS', am: 'ካሻ ማልቲሚዲያ CMS' },
  subtitle: { en: 'Preserve and Share Ethiopia\'s Cultural Heritage Through Digital Broadcasting', am: 'የኢትዮጵያን ባህላዊ ውርስ በዲጂታል ስርጭት ለመጠበቅ እና ለመጋራት' },
  primaryCta: { text: { en: 'Learn More', am: 'ተጨማሪ ይወቁ' }, link: '/about' },
  secondaryCta: { text: { en: 'View Documentation', am: 'ሰነዶችን ይመልከቱ' }, link: '/documentation' },
};

const DEFAULT_STATS = [
  { value: '10', label: { en: 'Content Segments', am: 'ይዘት ክፍሎች' } },
  { value: '6', label: { en: 'Knowledge Domains', am: 'እውቀት ዘርፎች' } },
  { value: '3', label: { en: 'Distribution Channels', am: 'ስርጭት ቻናሎች' } },
];

export default function Hero() {
  const { t, lang } = useLanguage();
  const [site, setSite] = useState({});
  const [homePage, setHomePage] = useState({});

  useEffect(() => {
    getById('settings', 'site').then((s) => s && setSite(s)).catch(() => {});
    getById('settings', 'homePage').then((d) => d && setHomePage(d)).catch(() => {});
  }, []);

  const hero = { ...DEFAULT_HERO, ...(homePage.hero || {}) };
  const heroImg = hero.heroImage || site.heroImage || '/logo.webp';
  const name = site.siteName?.[lang] || 'Kasha';
  const title = hero.title?.[lang] || hero.title?.en || site.siteTagline?.[lang] || t('heroTitle');
  const subtitle = hero.subtitle?.[lang] || hero.subtitle?.en || site.siteDescription?.[lang] || t('heroSubtitle');
  const stats = homePage.heroStats || DEFAULT_STATS;
  const opacity = (hero.overlayOpacity || 70) / 100;
  const primaryText = hero.primaryCta?.text?.[lang] || hero.primaryCta?.text?.en || t('learnMore');
  const primaryLink = hero.primaryCta?.link || '/about';
  const secondaryText = hero.secondaryCta?.text?.[lang] || hero.secondaryCta?.text?.en || t('viewDocs');
  const secondaryLink = hero.secondaryCta?.link || '/documentation';

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, var(--black) 0%, rgba(9,9,9,${opacity}) 50%, var(--black) 100%)` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--black)] via-transparent to-[var(--black)]" />
      </div>

      <div className="relative z-10 mx-auto w-full" style={{ maxWidth: '1280px', padding: 'clamp(16px, 4vw, 80px)', paddingTop: 'clamp(100px, 15vw, 200px)', paddingBottom: 'clamp(64px, 10vw, 160px)' }}>
        <div style={{ maxWidth: 'min(100%, 700px)' }}>
          <div className="flex items-center gap-2.5 mb-6 sm:mb-8 anim-fade-up">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] anim-pulse" />
            <span className="label">{name}</span>
          </div>

          <h1 className="anim-fade-up delay-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 7vw, 5.5rem)', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
            <span className="text-gradient">{title}</span>
          </h1>

          <p className="text-[var(--gray-400)] leading-relaxed anim-fade-up delay-2" style={{ maxWidth: '520px', marginTop: 'clamp(16px, 2vw, 24px)', marginBottom: 'clamp(28px, 4vw, 48px)', fontSize: 'clamp(14px, 1.6vw, 18px)' }}>
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-3 anim-fade-up delay-3">
            <Link to={primaryLink} className="btn-primary">
              {primaryText}
              <ArrowRight className="w-4 h-4" />
            </Link>
            {secondaryText && (
              <Link to={secondaryLink} className="btn-outline">
                {secondaryText}
              </Link>
            )}
          </div>
        </div>

        {stats.length > 0 && (
          <div className="grid anim-fade-up delay-4" style={{ gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, maxWidth: '480px', marginTop: 'clamp(48px, 8vw, 100px)', gap: 'clamp(12px, 3vw, 24px)' }}>
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-[var(--font-display)] font-bold text-[var(--gold)]" style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)' }}>{s.value}</p>
                <p className="text-xs uppercase tracking-[0.15em] text-[var(--gray-500)] mt-1" style={{ fontSize: 'clamp(9px, 1.2vw, 12px)' }}>{s.label?.[lang] || s.label?.en || ''}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
