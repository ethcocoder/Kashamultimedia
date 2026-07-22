import { useState, useEffect, useRef, useCallback, useLayoutEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, CalendarDays, Phone, ArrowRight, X } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useLanguage } from '../../contexts/LanguageContext';

function KashaLogo() {
  return (
    <img src="/logo.webp" alt="Kasha Multimedia" className="w-full h-full object-contain" />
  );
}

export default function Navbar() {
  const { dark, toggleDark } = useDarkMode();
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef(null);
  const linksContainerRef = useRef(null);
  const linkRefs = useRef({});
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (y / docHeight) * 100 : 0;
      setScrolled(y > 30);
      setScrollProgress(Math.min(progress, 100));
      if (y < 80) {
        setHidden(false);
      } else if (y > lastScrollY.current + 5) {
        setHidden(true);
        setMobileOpen(false);
      } else if (y < lastScrollY.current - 5) {
        setHidden(false);
      }
      lastScrollY.current = y;
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    if (!navRef.current) return;
    document.documentElement.style.setProperty('--nav-height', `${navRef.current.offsetHeight}px`);
  }, [mobileOpen]);

  const links = useMemo(() => [
    { to: '/', label: t('home') },
    { to: '/about', label: t('about') },
    { to: '/system', label: t('system') },
    { to: '/integrations', label: t('integrations') },
    { to: '/contact', label: t('contact') },
  ], [t]);

  const pathname = location.pathname;
  const isActive = useCallback((path) => path === '/' ? pathname === '/' : pathname.startsWith(path), [pathname]);

  const updatePill = useCallback(() => {
    const activeKey = links.find((l) => isActive(l.to))?.to;
    const el = activeKey ? linkRefs.current[activeKey] : null;
    const container = linksContainerRef.current;
    if (!el || !container) {
      setPillStyle((p) => ({ ...p, opacity: 0 }));
      return;
    }
    const cRect = container.getBoundingClientRect();
    const lRect = el.getBoundingClientRect();
    setPillStyle({
      left: lRect.left - cRect.left,
      width: lRect.width,
      opacity: 1,
    });
  }, [links, isActive]);

  useLayoutEffect(() => {
    updatePill();
    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [updatePill]);

  const glassOpacity = Math.min(scrollY / 300, 1);

  const getTimeGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return t('goodMorning') || 'Good Morning';
    if (h < 17) return t('goodAfternoon') || 'Good Afternoon';
    return t('goodEvening') || 'Good Evening';
  };

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: hidden && !mobileOpen ? 'translateY(-100%)' : 'translateY(0)' }}
      >
        <div
          className="transition-all duration-700"
          style={{
            background: `rgba(9, 9, 9, ${0.35 + glassOpacity * 0.58})`,
            backdropFilter: `blur(${8 + glassOpacity * 18}px) saturate(${1 + glassOpacity * 0.5})`,
            WebkitBackdropFilter: `blur(${8 + glassOpacity * 18}px) saturate(${1 + glassOpacity * 0.5})`,
            borderBottom: scrolled ? '1px solid rgba(245, 245, 245, 0.06)' : '1px solid transparent',
            boxShadow: scrolled ? `0 4px 40px rgba(0,0,0,${0.15 + glassOpacity * 0.2})` : 'none',
          }}
        >
          <nav className="mx-auto flex items-center justify-between" style={{ maxWidth: '1280px', padding: '0 clamp(16px, 3vw, 32px)', height: 'clamp(56px, 7vw, 68px)' }}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="relative w-9 h-9 rounded-xl bg-[var(--gold-dim)] border border-[var(--gold-border)] flex items-center justify-center text-[var(--gold)] transition-all duration-300 group-hover:bg-[var(--gold)] group-hover:border-[var(--gold)] group-hover:shadow-[0_0_24px_rgba(201,169,110,0.25)]">
                <KashaLogo />
              </div>
              <div className="hidden sm:block leading-none">
                <span className="font-[var(--font-display)] font-bold text-[var(--white)] text-[15px] tracking-tight block transition-colors duration-300 group-hover:text-[var(--gold)]">Kasha Multimedia</span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-[var(--gray-500)] mt-[1px]">Rooted in Heritage</span>
              </div>
            </Link>

            {/* Desktop Nav with sliding pill */}
            <div ref={linksContainerRef} className="hidden lg:flex items-center relative">
              <div className="nav-pill" style={{ left: pillStyle.left, width: pillStyle.width, opacity: pillStyle.opacity }} />
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  ref={(el) => { linkRefs.current[l.to] = el; }}
                  className={`nav-link ${isActive(l.to) ? 'active' : ''}`}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
              {/* Language Pill */}
              <div className="lang-pill">
                <div
                  className="lang-pill-slider"
                  style={{
                    left: lang === 'en' ? '3px' : '37px',
                    width: '33px',
                  }}
                />
                <span
                  className={`lang-pill-option ${lang === 'en' ? 'active' : ''}`}
                  onClick={() => lang !== 'en' && setLang('en')}
                >
                  En
                </span>
                <span
                  className={`lang-pill-option ${lang === 'am' ? 'active' : ''}`}
                  onClick={() => lang !== 'am' && setLang('am')}
                >
                  አማ
                </span>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleDark}
                className="theme-toggle"
                title={dark ? 'Switch to light' : 'Switch to dark'}
              >
                <div className="theme-toggle-knob">
                  {dark ? (
                    <Moon className="w-[10px] h-[10px] text-[var(--gold)]" />
                  ) : (
                    <Sun className="w-[10px] h-[10px] text-[var(--black)]" />
                  )}
                </div>
              </button>

              {/* Learn More Button */}
              <Link
                to="/about"
                className="hidden sm:inline-flex book-btn"
              >
                <span className="book-btn-pulse" />
                <span className="btn-icon">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                {t('learnMore')}
                <span className="btn-arrow">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-[var(--gray-500)] hover:text-[var(--white)] hover:bg-[rgba(245,245,245,0.05)] transition-all duration-200 ${mobileOpen ? 'hamburger-open' : ''}`}
                aria-label="Menu"
              >
                <div className="flex flex-col items-center justify-center w-4 h-4 gap-[5px]">
                  <span className="hamburger-line block w-4 h-[1.5px] bg-current rounded-full" />
                  <span className="hamburger-line block w-4 h-[1.5px] bg-current rounded-full" />
                  <span className="hamburger-line block w-4 h-[1.5px] bg-current rounded-full" />
                </div>
              </button>
            </div>
          </nav>

          {/* Scroll progress */}
          {scrolled && <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />}
        </div>
      </header>

      {/* Full-screen mobile menu */}
      {mobileOpen && (
        <div className="mobile-overlay lg:hidden">
          {/* Close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-0 right-0 m-5 w-10 h-10 rounded-xl flex items-center justify-center text-[var(--gray-500)] hover:text-[var(--white)] hover:bg-[rgba(245,245,245,0.05)] transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Greeting */}
          <p
            className="label mb-2"
            style={{ opacity: 0, animation: 'mobileOverlayLinkIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards', animationDelay: '0.05s' }}
          >
            {getTimeGreeting()}
          </p>

          {/* Nav links */}
          <nav className="flex flex-col items-center gap-1">
            {links.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                className={`mobile-overlay-link ${isActive(l.to) ? 'active' : ''}`}
                style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="mobile-overlay-footer" style={{ animationDelay: `${0.1 + links.length * 0.06 + 0.1}s` }}>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[var(--gold)] text-[var(--black)] text-[14px] font-semibold transition-all hover:shadow-[0_4px_24px_rgba(201,169,110,0.35)] active:scale-[0.97]"
            >
              {t('learnMore')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center justify-center gap-3 mt-5">
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleDark}
                className="theme-toggle"
                title={dark ? 'Switch to light' : 'Switch to dark'}
              >
                <div className="theme-toggle-knob">
                  {dark ? (
                    <Moon className="w-[10px] h-[10px] text-[var(--gold)]" />
                  ) : (
                    <Sun className="w-[10px] h-[10px] text-[var(--black)]" />
                  )}
                </div>
              </button>

              {/* Mobile Language Pill */}
              <div className="lang-pill">
                <div
                  className="lang-pill-slider"
                  style={{
                    left: lang === 'en' ? '3px' : '37px',
                    width: '33px',
                  }}
                />
                <span
                  className={`lang-pill-option ${lang === 'en' ? 'active' : ''}`}
                  onClick={() => lang !== 'en' && setLang('en')}
                >
                  En
                </span>
                <span
                  className={`lang-pill-option ${lang === 'am' ? 'active' : ''}`}
                  onClick={() => lang !== 'am' && setLang('am')}
                >
                  አማ
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
