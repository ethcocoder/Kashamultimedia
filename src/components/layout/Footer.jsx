import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Scissors, ArrowUp, Send, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useState, useEffect, useCallback, useRef } from 'react';
import { getLatest, getById } from '../../services/firestore';
import toast from 'react-hot-toast';

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function MagneticSocial({ icon: Icon, href, label }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.setProperty('--tx', `${x * 0.2}px`);
    el.style.setProperty('--ty', `${y * 0.2 - 2}px`);
    el.style.setProperty('--mx', `${(x / rect.width + 0.5) * 100}%`);
    el.style.setProperty('--my', `${(y / rect.height + 0.5) * 100}%`);
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--tx', '0px');
    el.style.setProperty('--ty', '-2px');
  };

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener"
      className="social-link"
      title={label}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Icon className="w-4 h-4" />
    </a>
  );
}

function LiveStatus() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const day = now.getDay();
      const h = now.getHours();
      const m = now.getMinutes();
      const time = h + m / 60;
      if (day === 0) return setIsOpen(false);
      if (day === 6) return setIsOpen(time >= 10 && time < 18);
      setIsOpen(time >= 9 && time < 20);
    };
    check();
    const id = setInterval(check, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-2">
      <span className={`status-dot ${isOpen ? 'open' : 'closed'}`} />
      <span style={{ fontSize: 'clamp(11px, 1.1vw, 12px)' }} className={isOpen ? 'text-green-400' : 'text-red-400'}>
        {isOpen ? (t('open') || 'Open Now') : (t('closed') || 'Closed')}
      </span>
    </span>
  );
}

export default function Footer() {
  const { t, lang } = useLanguage();
  const [services, setServices] = useState([]);
  const [site, setSite] = useState({});
  const [email, setEmail] = useState('');
  const [showTop, setShowTop] = useState(false);

  const [brandRef, brandVisible] = useReveal();
  const [linksRef, linksVisible] = useReveal();
  const [hoursRef, hoursVisible] = useReveal();
  const [tickerRef, tickerVisible] = useReveal(0.3);

  useEffect(() => {
    getLatest('services', 5).then(setServices).catch(() => {});
    getById('settings', 'site').then((s) => s && setSite(s)).catch(() => {});
  }, []);

  const handleScroll = useCallback(() => setShowTop(window.scrollY > 400), []);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleSubscribe = (e) => { e.preventDefault(); if (!email.trim()) return; toast.success('Thanks for subscribing!'); setEmail(''); };

  const name = site.siteName?.[lang] || 'Woreda 4 Barber';

  const socials = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ];

  const quickLinks = [
    { to: '/about', label: t('aboutUs') },
    { to: '/services', label: t('ourServices') },
    { to: '/gallery', label: t('gallery') },
    { to: '/blog', label: t('blog') },
    { to: '/contact', label: t('contact') },
  ];

  const tickerServices = services.length > 0
    ? [...services.map((s) => s.name?.[lang] || s.name?.en || 'Service'), ...services.map((s) => s.name?.[lang] || s.name?.en || 'Service')]
    : ['Haircut', 'Beard Trim', 'Hot Towel Shave', 'Hair Design', 'Kids Cut', 'Haircut', 'Beard Trim', 'Hot Towel Shave', 'Hair Design', 'Kids Cut'];

  return (
    <>
      <footer className="relative">
        {/* Service ticker */}
        <div ref={tickerRef} className={`footer-reveal ${tickerVisible ? 'visible' : ''}`} style={{ borderTop: '1px solid var(--white-faint)', borderBottom: '1px solid var(--white-faint)', background: 'rgba(201,169,110,0.02)' }}>
          <div className="mx-auto ticker-wrap" style={{ padding: 'clamp(10px, 1.5vw, 14px) 0', maxWidth: '1280px' }}>
            <div className="ticker-track">
              {tickerServices.map((s, i) => (
                <span key={i} className="flex items-center gap-3">
                  <span className="ticker-item">{s}</span>
                  <span className="ticker-dot" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-glow" />

        {/* Main */}
        <div className="relative footer-noise border-t border-[var(--white-faint)]" style={{ background: 'linear-gradient(180deg, var(--black) 0%, rgba(7,7,7,1) 100%)' }}>
          <div className="relative z-10 mx-auto" style={{ maxWidth: '1280px', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 4vw, 80px)' }}>

            {/* Top: brand + newsletter */}
            <div ref={brandRef} className={`footer-reveal ${brandVisible ? 'visible' : ''} flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-16 mb-12 lg:mb-16`}>
              <div className="max-w-sm">
                <Link to="/" className="inline-flex items-center gap-2.5 mb-5 group">
                  <div className="w-11 h-11 rounded-xl bg-[var(--gold-dim)] border border-[var(--gold-border)] flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--gold)] group-hover:border-[var(--gold)] group-hover:shadow-[0_0_30px_rgba(201,169,110,0.2)]">
                    <Scissors className="w-5 h-5 text-[var(--gold)] transition-all duration-300 group-hover:text-[var(--black)]" />
                  </div>
                  <div className="leading-none">
                    <span className="font-[var(--font-display)] font-bold text-[var(--white)] text-[16px] tracking-tight block transition-colors group-hover:text-[var(--gold)]">{name}</span>
                    <span className="block text-[9px] uppercase tracking-[0.25em] text-[var(--gray-500)] mt-[2px]">Barbershop</span>
                  </div>
                </Link>
                <p className="text-[var(--gray-500)] leading-relaxed mb-5" style={{ fontSize: 'clamp(12px, 1.2vw, 13px)' }}>
                  Premium grooming experience where style meets precision. Crafted for the modern gentleman.
                </p>
                <div className="flex items-center gap-2.5">
                  {socials.map((s) => (
                    <MagneticSocial key={s.label} icon={s.icon} href={s.href} label={s.label} />
                  ))}
                </div>
              </div>

              <div className="lg:max-w-sm lg:w-full">
                <h4 className="label mb-3">Stay Updated</h4>
                <p className="text-[var(--gray-500)] mb-4" style={{ fontSize: 'clamp(12px, 1.2vw, 13px)' }}>
                  Get tips, exclusive offers, and updates delivered to your inbox.
                </p>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="newsletter-input" required />
                  <button type="submit" className="newsletter-btn flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{t('subscribe') || 'Subscribe'}</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Links grid */}
            <div ref={linksRef} className={`footer-reveal ${linksVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
              <div className="grid-auto-sm" style={{ gap: 'clamp(24px, 4vw, 48px)' }}>
                {/* Quick Links */}
                <div>
                  <h4 className="label mb-4 sm:mb-5">{t('quickLinks')}</h4>
                  <div className="space-y-2.5">
                    {quickLinks.map((l) => (
                      <Link key={l.to} to={l.to} className="footer-link block">{l.label}</Link>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h4 className="label mb-4 sm:mb-5">{t('servicesWeOffer')}</h4>
                  <div className="space-y-2.5">
                    {services.length > 0 ? services.map((s) => (
                      <Link key={s.id} to="/services" className="footer-link block">{s.name?.[lang] || s.name?.en || 'Service'}</Link>
                    )) : (
                      <p className="text-[var(--gray-700)]" style={{ fontSize: 'clamp(11px, 1.1vw, 12px)' }}>Loading...</p>
                    )}
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <h4 className="label mb-4 sm:mb-5">{t('contactInfo')}</h4>
                  <div className="space-y-3.5">
                    {site.address && (
                      <a href={`https://maps.google.com/?q=${encodeURIComponent(site.address)}`} target="_blank" rel="noopener" className="flex items-start gap-3 group">
                        <div className="w-8 h-8 rounded-lg bg-[var(--gold-dim)] border border-[var(--gold-border)] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-[var(--gold)] group-hover:border-[var(--gold)] group-hover:shadow-[0_0_16px_rgba(201,169,110,0.2)]">
                          <MapPin className="w-3.5 h-3.5 text-[var(--gold)] transition-colors group-hover:text-[var(--black)]" />
                        </div>
                        <span className="text-[var(--gray-500)] group-hover:text-[var(--gold)] transition-colors pt-1.5" style={{ fontSize: 'clamp(12px, 1.2vw, 13px)' }}>{site.address}</span>
                      </a>
                    )}
                    {site.phone && (
                      <a href={`tel:${site.phone}`} className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-lg bg-[var(--gold-dim)] border border-[var(--gold-border)] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-[var(--gold)] group-hover:border-[var(--gold)] group-hover:shadow-[0_0_16px_rgba(201,169,110,0.2)]">
                          <Phone className="w-3.5 h-3.5 text-[var(--gold)] transition-colors group-hover:text-[var(--black)]" />
                        </div>
                        <span className="text-[var(--gray-500)] group-hover:text-[var(--gold)] transition-colors" style={{ fontSize: 'clamp(12px, 1.2vw, 13px)' }}>{site.phone}</span>
                      </a>
                    )}
                    {site.email && (
                      <a href={`mailto:${site.email}`} className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-lg bg-[var(--gold-dim)] border border-[var(--gold-border)] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-[var(--gold)] group-hover:border-[var(--gold)] group-hover:shadow-[0_0_16px_rgba(201,169,110,0.2)]">
                          <Mail className="w-3.5 h-3.5 text-[var(--gold)] transition-colors group-hover:text-[var(--black)]" />
                        </div>
                        <span className="text-[var(--gray-500)] group-hover:text-[var(--gold)] transition-colors" style={{ fontSize: 'clamp(12px, 1.2vw, 13px)' }}>{site.email}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Hours + Status */}
                <div ref={hoursRef} className={`footer-reveal ${hoursVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.25s' }}>
                  <h4 className="label mb-4 sm:mb-5">{t('openingHours') || 'Opening Hours'}</h4>
                  <div className="mb-3">
                    <LiveStatus />
                  </div>
                  <div className="space-y-2 mb-5">
                    <div className="flex justify-between" style={{ fontSize: 'clamp(12px, 1.2vw, 13px)' }}>
                      <span className="text-[var(--gray-500)]">{t('mondayFri') || 'Mon - Fri'}</span>
                      <span className="text-[var(--gray-300)]">9:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between" style={{ fontSize: 'clamp(12px, 1.2vw, 13px)' }}>
                      <span className="text-[var(--gray-500)]">{t('saturday') || 'Saturday'}</span>
                      <span className="text-[var(--gray-300)]">10:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between" style={{ fontSize: 'clamp(12px, 1.2vw, 13px)' }}>
                      <span className="text-[var(--gray-500)]">{t('sunday') || 'Sunday'}</span>
                      <span className="text-red-400/60">{t('closed') || 'Closed'}</span>
                    </div>
                  </div>
                  <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--gold-border)] text-[var(--gold)] text-[12px] font-semibold hover:bg-[var(--gold)] hover:text-[var(--black)] hover:shadow-[0_4px_20px_rgba(201,169,110,0.25)] transition-all duration-300">
                    {t('bookNow')}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-10 border-t border-[var(--white-faint)]" style={{ background: 'rgba(0,0,0,0.25)' }}>
            <div className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-3" style={{ maxWidth: '1280px', padding: 'clamp(16px, 2vw, 20px) clamp(16px, 4vw, 80px)' }}>
              <p className="text-[var(--gray-700)] text-center sm:text-left" style={{ fontSize: 'clamp(10px, 1vw, 12px)' }}>
                &copy; {new Date().getFullYear()} {name}. {t('copyright')}
              </p>
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
                <Link to="/login" className="text-[var(--gray-700)] hover:text-[var(--gray-500)] transition-colors" style={{ fontSize: 'clamp(10px, 1vw, 12px)' }}>{t('login')}</Link>
                <a href="#" className="text-[var(--gray-700)] hover:text-[var(--gray-500)] transition-colors" style={{ fontSize: 'clamp(10px, 1vw, 12px)' }}>Privacy</a>
                <a href="#" className="text-[var(--gray-700)] hover:text-[var(--gray-500)] transition-colors" style={{ fontSize: 'clamp(10px, 1vw, 12px)' }}>Terms</a>
                <p className="text-[var(--gray-700)] hidden sm:block" style={{ fontSize: 'clamp(10px, 1vw, 12px)' }}>{t('madeBy')}</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <button onClick={scrollToTop} className={`back-to-top ${showTop ? 'visible' : ''}`} aria-label="Back to top">
        <ArrowUp className="w-5 h-5" />
      </button>
    </>
  );
}
