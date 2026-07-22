import { useState, useEffect, useCallback } from 'react';
import {
  Home, Save, Loader2, Plus, Trash2, ArrowUp, ArrowDown, Eye, EyeOff,
  ChevronDown, ChevronRight, Image, Type, LayoutGrid, Megaphone, Sparkles, Star, Link as LinkIcon,
} from 'lucide-react';
import { getById, update } from '../../services/firestore';
import { useLanguage } from '../../contexts/LanguageContext';
import ImageUploader from '../../components/ui/ImageUploader';
import toast from 'react-hot-toast';

const DEFAULT_DATA = {
  hero: {
    heroImage: '',
    overlayOpacity: 70,
    title: { en: 'Premium Grooming Experience', am: 'ፕሪሚየም የፀጉር አገልግሎት' },
    subtitle: { en: 'Where style meets precision. Your look, our craft.', am: 'ቃላነት ከትክክለኛነት ጋር። የእርስዎ ቅርጿ፣ የእኛ ብረታ ብርታት።' },
    primaryCta: { text: { en: 'Book Now', am: 'ያስይዙ' }, link: '/book' },
    secondaryCta: { text: { en: 'View Gallery', am: 'ጋለሪ ይመልከቱ' }, link: '/gallery' },
  },
  heroStats: [
    { value: '5000+', label: { en: 'Services', am: 'አገልግሎቶች' } },
    { value: '4.9', label: { en: 'Style Expert', am: 'የስትይል ባለሙያ' } },
    { value: '8+', label: { en: 'Years', am: 'ዓመታት' } },
  ],
  sections: [
    { key: 'services', enabled: true, label: { en: 'Barbershop', am: 'የፀጉር ሱቅ' }, title: { en: 'Our Services', am: 'አገልግሎቶችን' }, subtitle: { en: 'From classic cuts to modern styles, we deliver excellence.', am: '' }, limit: 6 },
    { key: 'features', enabled: true, label: { en: 'Why Us', am: 'ለምን እኛ' }, title: { en: 'Why Choose Us', am: 'ለምን እኛን ይምረጡ' }, subtitle: { en: 'What makes us different from the rest.', am: '' } },
    { key: 'testimonials', enabled: true, label: { en: 'Testimonials', am: 'አስተያየቶች' }, title: { en: 'What Clients Say', am: 'ደንበኛ አስተያየቶች' }, subtitle: { en: 'Real reviews from our satisfied customers.', am: '' }, limit: 3 },
    { key: 'midCta', enabled: false, title: { en: 'Ready for a Fresh Look?', am: 'አዲስ ቅርጿ ይፈልጋሉ?' }, subtitle: { en: 'Walk in or book ahead — we got you.', am: '' }, buttonText: { en: 'Book Appointment', am: 'ቀጠሮ ያስይዙ' }, buttonLink: '/book' },
    { key: 'blog', enabled: true, label: { en: 'Blog', am: 'ብሎግ' }, title: { en: 'Style Tips & News', am: 'የስትይል ምክሮች እና ዜና' }, subtitle: { en: 'Stay updated with the latest grooming trends.', am: '' }, limit: 3 },
    { key: 'cta', enabled: true },
  ],
  features: [
    { icon: 'Sparkles', title: { en: 'Expert Barbers', am: 'ባለሙያ ቀርበኛዎች' }, description: { en: 'Our barbers are trained in the latest techniques and styles.', am: '' } },
    { icon: 'Scissors', title: { en: 'Premium Products', am: 'ፕሪሚየም ምርት' }, description: { en: 'We use only top-quality grooming products for every service.', am: '' } },
    { icon: 'User', title: { en: 'Personalized Service', am: 'ግልጽ አገልግሎት' }, description: { en: 'Every cut is tailored to your unique style and preference.', am: '' } },
  ],
  cta: {
    title: { en: 'Get In Touch', am: 'ያግኙን' },
    subtitle: { en: 'Book your appointment or just say hello.', am: 'ቀጠሮ ያስይዙ ወይም ሰላም ይብሉ።' },
    buttonText: { en: 'Book Now', am: 'ያስይዙ' },
    buttonLink: '/contact',
  },
};

const FEATURE_ICONS = ['Sparkles', 'Scissors', 'Paintbrush', 'User', 'Droplets', 'Brush', 'Star', 'Heart', 'Shield', 'Clock', 'Award', 'Zap'];

const SECTION_KEYS = {
  services: { en: 'Services Grid', am: 'የአገልግሎት ገጠር', icon: LayoutGrid },
  features: { en: 'Why Choose Us', am: 'ለምን እኛን', icon: Sparkles },
  testimonials: { en: 'Testimonials', am: 'አስተያየቶች', icon: Star },
  midCta: { en: 'Mid-Page CTA', am: 'መካከለኛ CTA', icon: Megaphone },
  blog: { en: 'Latest Blog', am: 'የብሎግ ልጥዶች', icon: Type },
  cta: { en: 'Bottom CTA', am: 'የታች CTA', icon: Megaphone },
};

function Collapsible({ title, icon: Icon, children, defaultOpen = false, badge }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="admin-glass overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 p-5 sm:p-6 text-left group hover:bg-white/[0.02] transition-colors">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.12)' }}>
          <Icon className="w-4 h-4 text-[var(--gold)]" />
        </div>
        <span className="flex-1 text-sm font-semibold text-white">{title}</span>
        {badge && <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[var(--gold)]/10 text-[var(--gold)]">{badge}</span>}
        {open ? <ChevronDown className="w-4 h-4 text-[var(--gray-500)]" /> : <ChevronRight className="w-4 h-4 text-[var(--gray-500)]" />}
      </button>
      {open && <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-[var(--white-faint)]" style={{ paddingTop: 16 }}>{children}</div>}
    </div>
  );
}

function BiInput({ label, value, onChange, placeholder, textarea }) {
  const Comp = textarea ? 'textarea' : 'input';
  return (
    <div>
      <label className="admin-label">{label}</label>
      <Comp
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="admin-input resize-none"
        placeholder={placeholder}
        {...(textarea ? { rows: 3 } : {})}
      />
    </div>
  );
}

function BiPair({ label, values, onChange, placeholders }) {
  return (
    <div>
      <p className="admin-label mb-2">{label}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <span className="text-[10px] font-medium uppercase tracking-wider mb-1 block" style={{ color: 'var(--gray-700)' }}>EN</span>
          <input value={values?.en || ''} onChange={(e) => onChange({ ...values, en: e.target.value })} className="admin-input" placeholder={placeholders?.[0]} />
        </div>
        <div>
          <span className="text-[10px] font-medium uppercase tracking-wider mb-1 block" style={{ color: 'var(--gray-700)' }}>AM</span>
          <input value={values?.am || ''} onChange={(e) => onChange({ ...values, am: e.target.value })} className="admin-input" placeholder={placeholders?.[1]} />
        </div>
      </div>
    </div>
  );
}

export default function AdminHomePage() {
  const { t, lang } = useLanguage();
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState(DEFAULT_DATA);

  useEffect(() => {
    getById('settings', 'homePage').then((d) => {
      if (d) {
        setData((prev) => ({
          hero: { ...prev.hero, ...(d.hero || {}) },
          heroStats: d.heroStats || prev.heroStats,
          sections: d.sections || prev.sections,
          features: d.features || prev.features,
          cta: { ...prev.cta, ...(d.cta || {}) },
        }));
      }
    }).catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await update('settings', 'homePage', data);
      toast.success('Home page settings saved!');
    } catch {
      toast.error('Failed to save');
    }
    setSaving(false);
  };

  const setHero = (field, value) => setData((p) => ({ ...p, hero: { ...p.hero, [field]: value } }));
  const setHeroBi = (field, langKey, value) => setData((p) => ({ ...p, hero: { ...p.hero, [field]: { ...p.hero[field], [langKey]: value } } }));
  const setHeroCta = (ctaKey, field, value) => setData((p) => ({ ...p, hero: { ...p.hero, [ctaKey]: { ...p.hero[ctaKey], [field]: value } } }));
  const setHeroCtaBi = (ctaKey, langKey, value) => setData((p) => ({ ...p, hero: { ...p.hero, [ctaKey]: { ...p.hero[ctaKey], text: { ...p.hero[ctaKey].text, [langKey]: value } } } }));

  const setSection = (index, field, value) => {
    const s = [...data.sections];
    s[index] = { ...s[index], [field]: value };
    setData({ ...data, sections: s });
  };
  const setSectionBi = (index, field, langKey, value) => {
    const s = [...data.sections];
    s[index] = { ...s[index], [field]: { ...s[index][field], [langKey]: value } };
    setData({ ...data, sections: s });
  };
  const moveSection = (i, dir) => {
    const s = [...data.sections];
    const ni = i + dir;
    if (ni < 0 || ni >= s.length) return;
    [s[i], s[ni]] = [s[ni], s[i]];
    setData({ ...data, sections: s });
  };
  const toggleSection = (i) => {
    const s = [...data.sections];
    s[i] = { ...s[i], enabled: !s[i].enabled };
    setData({ ...data, sections: s });
  };

  const setFeature = (i, field, value) => {
    const f = [...data.features];
    f[i] = { ...f[i], [field]: value };
    setData({ ...data, features: f });
  };
  const setFeatureBi = (i, field, langKey, value) => {
    const f = [...data.features];
    f[i] = { ...f[i], [field]: { ...f[i][field], [langKey]: value } };
    setData({ ...data, features: f });
  };
  const addFeature = () => {
    setData({ ...data, features: [...data.features, { icon: 'Sparkles', title: { en: '', am: '' }, description: { en: '', am: '' } }] });
  };
  const removeFeature = (i) => {
    setData({ ...data, features: data.features.filter((_, idx) => idx !== i) });
  };

  const setStat = (i, field, value) => {
    const s = [...data.heroStats];
    s[i] = { ...s[i], [field]: value };
    setData({ ...data, heroStats: s });
  };
  const setStatLabel = (i, langKey, value) => {
    const s = [...data.heroStats];
    s[i] = { ...s[i], label: { ...s[i].label, [langKey]: value } };
    setData({ ...data, heroStats: s });
  };
  const addStat = () => setData({ ...data, heroStats: [...data.heroStats, { value: '', label: { en: '', am: '' } }] });
  const removeStat = (i) => setData({ ...data, heroStats: data.heroStats.filter((_, idx) => idx !== i) });

  const setCta = (field, value) => setData((p) => ({ ...p, cta: { ...p.cta, [field]: value } }));
  const setCtaBi = (field, langKey, value) => setData((p) => ({ ...p, cta: { ...p.cta, [field]: { ...p.cta[field], [langKey]: value } } }));

  const sectionCount = data.sections.filter((s) => s.enabled).length;

  return (
    <div className="admin-page-enter">
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 'clamp(20px, 3vw, 28px)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.15)' }}>
            <Home className="w-5 h-5 text-[var(--gold)]" />
          </div>
          <div>
            <h1 className="font-[var(--font-display)] font-bold text-white" style={{ fontSize: 'clamp(18px, 2.5vw, 24px)' }}>Home Page Builder</h1>
            <p className="text-xs" style={{ color: 'var(--gray-500)' }}>{sectionCount} sections active · Full control over content & layout</p>
          </div>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary !py-2.5 !px-4 !text-xs sm:!text-sm">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} <span className="hidden sm:inline">{t('saveChanges')}</span>
        </button>
      </div>

      <div className="space-y-4">
        {/* ═══ HERO SECTION ═══ */}
        <Collapsible title="Hero Section" icon={Image} defaultOpen badge="Background + CTA">
          <div className="space-y-5">
            <div>
              <label className="admin-label">Background Image</label>
              <ImageUploader value={data.hero.heroImage} onChange={(url) => setHero('heroImage', url)} path="hero" />
            </div>
            <div>
              <label className="admin-label">Overlay Opacity: {data.hero.overlayOpacity}%</label>
              <input type="range" min="0" max="100" value={data.hero.overlayOpacity} onChange={(e) => setHero('overlayOpacity', parseInt(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, var(--gold) ${data.hero.overlayOpacity}%, var(--gray-800) ${data.hero.overlayOpacity}%)` }} />
            </div>
            <BiPair label="Hero Title" values={data.hero.title} onChange={(v) => setHero('title', v)} placeholders={['Premium Grooming Experience', '...']} />
            <BiPair label="Hero Subtitle" values={data.hero.subtitle} onChange={(v) => setHero('subtitle', v)} placeholders={['Where style meets precision...', '...']} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-3 text-[var(--gold)]">Primary Button</p>
                <div className="space-y-3">
                  <BiPair label="Text" values={data.hero.primaryCta.text} onChange={(v) => setHeroCta('primaryCta', 'text', v)} placeholders={['Book Now', '']} />
                  <div><label className="admin-label"><LinkIcon className="w-3 h-3 inline mr-1" />Link</label><input value={data.hero.primaryCta.link} onChange={(e) => setHeroCta('primaryCta', 'link', e.target.value)} className="admin-input" placeholder="/book" /></div>
                </div>
              </div>
              <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--gray-500)' }}>Secondary Button</p>
                <div className="space-y-3">
                  <BiPair label="Text" values={data.hero.secondaryCta.text} onChange={(v) => setHeroCta('secondaryCta', 'text', v)} placeholders={['View Gallery', '']} />
                  <div><label className="admin-label"><LinkIcon className="w-3 h-3 inline mr-1" />Link</label><input value={data.hero.secondaryCta.link} onChange={(e) => setHeroCta('secondaryCta', 'link', e.target.value)} className="admin-input" placeholder="/gallery" /></div>
                </div>
              </div>
            </div>
          </div>
        </Collapsible>

        {/* ═══ HERO STATS ═══ */}
        <Collapsible title="Hero Statistics" icon={Sparkles} badge={`${data.heroStats.length} stats`}>
          <div className="space-y-3">
            {data.heroStats.map((stat, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div><label className="admin-label">Value</label><input value={stat.value} onChange={(e) => setStat(i, 'value', e.target.value)} className="admin-input" placeholder="5000+" /></div>
                  <div><label className="admin-label">Label (EN)</label><input value={stat.label?.en || ''} onChange={(e) => setStatLabel(i, 'en', e.target.value)} className="admin-input" /></div>
                  <div><label className="admin-label">Label (AM)</label><input value={stat.label?.am || ''} onChange={(e) => setStatLabel(i, 'am', e.target.value)} className="admin-input" /></div>
                </div>
                <button onClick={() => removeStat(i)} className="admin-action-btn danger mt-6"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            {data.heroStats.length < 6 && (
              <button onClick={addStat} className="flex items-center gap-2 text-xs font-medium text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors">
                <Plus className="w-3.5 h-3.5" /> Add Stat
              </button>
            )}
          </div>
        </Collapsible>

        {/* ═══ PAGE SECTIONS ═══ */}
        <Collapsible title="Page Sections" icon={LayoutGrid} defaultOpen badge={`${sectionCount} active`}>
          <div className="space-y-2">
            {data.sections.map((section, i) => {
              const meta = SECTION_KEYS[section.key];
              const SecIcon = meta?.icon || LayoutGrid;
              return (
                <div key={section.key} className="rounded-xl transition-all" style={{ background: section.enabled ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)', border: `1px solid ${section.enabled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)'}`, opacity: section.enabled ? 1 : 0.5 }}>
                  <div className="flex items-center gap-3 p-3">
                    <SecIcon className="w-4 h-4 shrink-0" style={{ color: section.enabled ? 'var(--gold)' : 'var(--gray-700)' }} />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium truncate block" style={{ color: section.enabled ? 'var(--white)' : 'var(--gray-500)' }}>
                        {meta?.en || section.key}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <button onClick={() => moveSection(i, -1)} disabled={i === 0} className="p-1.5 rounded-lg transition-colors hover:bg-white/[0.06] disabled:opacity-20" style={{ color: 'var(--gray-500)' }}><ArrowUp className="w-3.5 h-3.5" /></button>
                      <button onClick={() => moveSection(i, 1)} disabled={i === data.sections.length - 1} className="p-1.5 rounded-lg transition-colors hover:bg-white/[0.06] disabled:opacity-20" style={{ color: 'var(--gray-500)' }}><ArrowDown className="w-3.5 h-3.5" /></button>
                      <button onClick={() => toggleSection(i)} className="p-1.5 rounded-lg transition-colors hover:bg-white/[0.06]" style={{ color: section.enabled ? '#4ade80' : 'var(--gray-700)' }}>
                        {section.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Inline section settings when enabled */}
                  {section.enabled && section.key !== 'cta' && section.key !== 'midCta' && (
                    <div className="px-3 pb-3 pt-0 space-y-3 border-t border-[var(--white-faint)]" style={{ marginTop: 0, paddingTop: 12 }}>
                      <BiPair label="Label" values={section.label} onChange={(v) => setSectionBi(i, 'label', null, v)} placeholders={['', '']} />
                      <BiPair label="Title" values={section.title} onChange={(v) => setSectionBi(i, 'title', null, v)} placeholders={['', '']} />
                      <BiPair label="Subtitle" values={section.subtitle} onChange={(v) => setSectionBi(i, 'subtitle', null, v)} placeholders={['', '']} />
                      {section.key !== 'features' && (
                        <div>
                          <label className="admin-label">Items to show</label>
                          <input type="number" min="1" max="12" value={section.limit || 6} onChange={(e) => setSection(i, 'limit', parseInt(e.target.value) || 6)} className="admin-input w-24" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mid-CTA inline settings */}
                  {section.enabled && section.key === 'midCta' && (
                    <div className="px-3 pb-3 pt-0 space-y-3 border-t border-[var(--white-faint)]" style={{ marginTop: 0, paddingTop: 12 }}>
                      <BiPair label="Title" values={section.title} onChange={(v) => setSectionBi(i, 'title', null, v)} placeholders={['Ready for a Fresh Look?', '']} />
                      <BiPair label="Subtitle" values={section.subtitle} onChange={(v) => setSectionBi(i, 'subtitle', null, v)} placeholders={['Walk in or book ahead.', '']} />
                      <BiPair label="Button Text" values={section.buttonText} onChange={(v) => setSectionBi(i, 'buttonText', null, v)} placeholders={['Book Appointment', '']} />
                      <div><label className="admin-label"><LinkIcon className="w-3 h-3 inline mr-1" />Button Link</label><input value={section.buttonLink || ''} onChange={(e) => setSection(i, 'buttonLink', e.target.value)} className="admin-input" placeholder="/book" /></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Collapsible>

        {/* ═══ FEATURES / WHY CHOOSE US ═══ */}
        {data.sections.find((s) => s.key === 'features')?.enabled && (
          <Collapsible title="Why Choose Us — Features" icon={Sparkles} badge={`${data.features.length} items`}>
            <div className="space-y-3">
              {data.features.map((feat, i) => (
                <div key={i} className="p-3 rounded-xl space-y-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <label className="admin-label mb-0">Icon</label>
                      <select value={feat.icon} onChange={(e) => setFeature(i, 'icon', e.target.value)} className="admin-input !py-1.5 !text-xs w-32">
                        {FEATURE_ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                      </select>
                    </div>
                    <button onClick={() => removeFeature(i)} className="admin-action-btn danger"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <BiPair label="Title" values={feat.title} onChange={(v) => setFeatureBi(i, 'title', null, v)} placeholders={['Expert Barbers', '']} />
                  <BiPair label="Description" values={feat.description} onChange={(v) => setFeatureBi(i, 'description', null, v)} placeholders={['Our barbers are trained...', '']} />
                </div>
              ))}
              {data.features.length < 8 && (
                <button onClick={addFeature} className="flex items-center gap-2 text-xs font-medium text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Add Feature
                </button>
              )}
            </div>
          </Collapsible>
        )}

        {/* ═══ BOTTOM CTA ═══ */}
        {data.sections.find((s) => s.key === 'cta')?.enabled && (
          <Collapsible title="Bottom CTA Section" icon={Megaphone}>
            <div className="space-y-4">
              <BiPair label="Title" values={data.cta.title} onChange={(v) => setCta('title', v)} placeholders={['Get In Touch', '']} />
              <BiPair label="Subtitle" values={data.cta.subtitle} onChange={(v) => setCta('subtitle', v)} placeholders={['Book your appointment...', '']} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <BiPair label="Button Text" values={data.cta.buttonText} onChange={(v) => setCta('buttonText', v)} placeholders={['Book Now', '']} />
                <div><label className="admin-label"><LinkIcon className="w-3 h-3 inline mr-1" />Button Link</label><input value={data.cta.buttonLink || ''} onChange={(e) => setCta('buttonLink', e.target.value)} className="admin-input" placeholder="/contact" /></div>
              </div>
            </div>
          </Collapsible>
        )}
      </div>
    </div>
  );
}
