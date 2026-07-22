import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Hero from '../components/home/Hero';
import ServicesGrid from '../components/home/ServicesGrid';
import FeaturesSection from '../components/home/FeaturesSection';
import { getLatest, getById } from '../services/firestore';

const DEFAULT_SECTIONS = [
  { key: 'features', enabled: true, label: { en: 'System', am: 'ስርዓት' }, title: { en: 'Core Capabilities', am: 'ዋና ችሎታዎች' }, subtitle: { en: 'Comprehensive platform for content management and distribution', am: 'ሙሉ ሙሉ ይዘት ሥራ እና ስርጭት መድረክ' } },
  { key: 'cta', enabled: true },
];

const DEFAULT_CTA = {
  title: { en: 'Explore the System', am: 'ስርዓቱን ይመልከቱ' },
  subtitle: { en: 'Learn about our comprehensive multimedia content management platform.', am: 'ስለ ሙሉ ሙሉ ሚዲያ ይዘት ሥራ መድረክ ይወቁ።' },
  buttonText: { en: 'View Documentation', am: 'ሰነዶችን ይመልከቱ' },
  buttonLink: '/system',
};

const DEFAULT_FEATURES = [
  { icon: 'Zap', title: { en: 'Multi-Channel Publishing', am: 'ብዙ-ቻናል ስርጭት' }, description: { en: 'Distribute content simultaneously to Radio, YouTube, and Telegram.', am: 'ይዘት ራዲዮ፣ ዩቲዩብ እና ቴሌግራም ላይ ይሰራጩ።' } },
  { icon: 'Globe', title: { en: 'Multi-Language Support', am: 'ብዙ-ቋንቋ ድጋፍ' }, description: { en: 'Amharic, Ethiopian languages, and Swahili content management.', am: 'አማርኛ፣ ሌሎች ኢትዮጵያ ቋንቋዎች እና ስዋሂሊ ይዘት ሥራ።' } },
  { icon: 'Shield', title: { en: 'Editorial Workflow', am: 'ኤዲቶሪያል ስራ ፍሰት' }, description: { en: 'Five-stage approval pipeline for quality assurance and compliance.', am: 'አምስት-ደረጃ ፅደት ፓይፕላይን ለ ጥራት ማረጋገጫ።' } },
];

export default function Home() {
  const { t, lang } = useLanguage();
  const [testimonials, setTestimonials] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [cta, setCta] = useState(DEFAULT_CTA);
  const [features, setFeatures] = useState(DEFAULT_FEATURES);

  useEffect(() => {
    getLatest('testimonials', 3).then(setTestimonials).catch(() => {});
    getLatest('blog', 3).then(setBlogPosts).catch(() => {});
    getById('settings', 'homePage').then((d) => {
      if (d) {
        if (d.sections) setSections(d.sections);
        if (d.cta) setCta((prev) => ({ ...prev, ...d.cta }));
        if (d.features) setFeatures(d.features);
      }
    }).catch(() => {});
  }, []);

  const getSection = (key) => (sections || DEFAULT_SECTIONS).find((s) => s.key === key) || {};

  const renderSection = (key) => {
    const sec = getSection(key);
    switch (key) {
      case 'services':
        return <ServicesGrid key="services" section={sec} />;
      case 'features':
        return <FeaturesSection key="features" features={features} section={sec} />;
      case 'testimonials':
        return testimonials.length > 0 ? (
          <section key="testimonials" className="section">
            <div className="text-center" style={{ marginBottom: 'clamp(32px, 5vw, 64px)' }}>
              <p className="label mb-3">{sec.label?.[lang] || sec.label?.en || 'Testimonials'}</p>
              <h2 className="heading-lg">{sec.title?.[lang] || sec.title?.en || t('testimonialsTitle')}</h2>
              {(sec.subtitle?.[lang] || sec.subtitle?.en) && (
                <p className="text-sm text-[var(--gray-500)] mt-3 mx-auto" style={{ maxWidth: '480px' }}>
                  {sec.subtitle?.[lang] || sec.subtitle?.en}
                </p>
              )}
              <div className="divider" style={{ marginTop: 'clamp(20px, 3vw, 32px)' }} />
            </div>
            <div className="grid-auto">
              {testimonials.slice(0, sec.limit || 3).map((item) => (
                <div key={item.id} className="card card-pad">
                  <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <span key={i} className="text-[var(--gold)] text-sm">&#9733;</span>
                    ))}
                  </div>
                  <p className="text-[var(--gray-400)] leading-relaxed mb-5 italic" style={{ fontSize: 'clamp(13px, 1.4vw, 15px)' }}>
                    &ldquo;{item.quote?.[lang] || item.quote?.en || ''}&rdquo;
                  </p>
                  <div className="border-t border-[var(--white-faint)] pt-4">
                    <p className="text-sm font-medium text-[var(--white)]">{item.clientName?.[lang] || item.clientName?.en || ''}</p>
                    <p className="text-xs text-[var(--gray-500)]">{item.clientRole?.[lang] || item.clientRole?.en || ''}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null;
      case 'midCta':
        return (
          <section key="midCta" className="section">
            <div className="card relative overflow-hidden text-center" style={{ padding: 'clamp(32px, 5vw, 64px)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold-dim)] via-transparent to-transparent" />
              <div className="relative">
                <h2 className="heading-lg mb-3">{sec.title?.[lang] || sec.title?.en || 'Ready for a Fresh Look?'}</h2>
                {(sec.subtitle?.[lang] || sec.subtitle?.en) && (
                  <p className="text-sm text-[var(--gray-500)] mb-6 mx-auto" style={{ maxWidth: '400px' }}>
                    {sec.subtitle?.[lang] || sec.subtitle?.en}
                  </p>
                )}
                <Link to={sec.buttonLink || '/book'} className="btn-primary mx-auto">
                  {sec.buttonText?.[lang] || sec.buttonText?.en || t('bookNow')}
                </Link>
              </div>
            </div>
          </section>
        );
      case 'blog':
        return blogPosts.length > 0 ? (
          <section key="blog" className="section">
            <div className="text-center" style={{ marginBottom: 'clamp(32px, 5vw, 64px)' }}>
              <p className="label mb-3">{sec.label?.[lang] || sec.label?.en || 'Blog'}</p>
              <h2 className="heading-lg">{sec.title?.[lang] || sec.title?.en || t('blogTitle')}</h2>
              {(sec.subtitle?.[lang] || sec.subtitle?.en) && (
                <p className="text-sm text-[var(--gray-500)] mt-3 mx-auto" style={{ maxWidth: '480px' }}>
                  {sec.subtitle?.[lang] || sec.subtitle?.en}
                </p>
              )}
              <div className="divider" style={{ marginTop: 'clamp(20px, 3vw, 32px)' }} />
            </div>
            <div className="grid-auto">
              {blogPosts.slice(0, sec.limit || 3).map((post) => (
                <Link key={post.id} to="/blog" className="card overflow-hidden group">
                  {post.imageUrl && <img src={post.imageUrl} alt="" className="w-full object-cover" style={{ height: 'clamp(140px, 20vw, 180px)' }} />}
                  <div className="card-pad-sm">
                    <h3 className="heading-sm mb-2 group-hover:text-[var(--gold)] transition-colors">
                      {post.title?.[lang] || post.title?.en || ''}
                    </h3>
                    <p className="text-sm text-[var(--gray-500)] line-clamp-2">
                      {post.description?.[lang] || post.description?.en || ''}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null;
      case 'cta':
        return (
          <section key="cta" className="section text-center">
            <div className="card relative overflow-hidden" style={{ padding: 'clamp(32px, 6vw, 80px)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold-dim)] to-transparent" />
              <div className="relative">
                <p className="label mb-4">Ready?</p>
                <h2 className="heading-lg mb-3">{cta.title?.[lang] || cta.title?.en || t('contactTitle')}</h2>
                <p className="text-sm text-[var(--gray-500)] mb-6 sm:mb-8 mx-auto" style={{ maxWidth: '400px' }}>
                  {cta.subtitle?.[lang] || cta.subtitle?.en || t('contactSubtitle')}
                </p>
                <Link to={cta.buttonLink || '/contact'} className="btn-primary mx-auto">
                  {cta.buttonText?.[lang] || cta.buttonText?.en || t('bookNow')}
                </Link>
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  const enabledSections = (sections || DEFAULT_SECTIONS).filter((s) => s.enabled);

  return (
    <>
      <Hero />
      {enabledSections.map((s) => renderSection(s.key))}
    </>
  );
}
