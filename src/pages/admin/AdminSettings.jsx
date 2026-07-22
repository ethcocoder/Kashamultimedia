import { useState, useEffect } from 'react';
import { Settings, Save, Globe, Palette, Image, Phone, MapPin, Mail, Loader2 } from 'lucide-react';
import { getById, update } from '../../services/firestore';
import { useLanguage } from '../../contexts/LanguageContext';
import ImageUploader from '../../components/ui/ImageUploader';
import toast from 'react-hot-toast';

export default function AdminSettings() {
  const { t } = useLanguage();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    siteName: { en: '', am: '' },
    siteTagline: { en: '', am: '' },
    siteDescription: { en: '', am: '' },
    address: '', phone: '', email: '', website: '', telegram: '',
    heroImage: '', primaryColor: '#C9A96E', accentColor: '#D4B87A',
  });

  useEffect(() => { getById('settings', 'site').then((s) => s && setForm((p) => ({ ...p, ...s }))).catch(() => {}); }, []);

  const save = async () => {
    setSaving(true);
    try { await update('settings', 'site', form); toast.success('Saved!'); } catch { toast.error('Failed'); }
    setSaving(false);
  };

  return (
    <div className="admin-page-enter">
      <div className="flex items-center justify-between" style={{ marginBottom: 'clamp(20px, 3vw, 28px)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.15)' }}>
            <Settings className="w-5 h-5 text-[var(--gold)]" />
          </div>
          <div>
            <h1 className="font-[var(--font-display)] font-bold text-white" style={{ fontSize: 'clamp(18px, 2.5vw, 24px)' }}>{t('settings')}</h1>
            <p className="text-xs" style={{ color: 'var(--gray-500)' }}>Configure your barbershop</p>
          </div>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary !py-2.5 !px-4 !text-xs sm:!text-sm">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} <span className="hidden sm:inline">{t('saveChanges')}</span>
        </button>
      </div>

      <div className="space-y-5">
        {/* Site Info */}
        <div className="admin-glass p-5 sm:p-6">
          <h2 className="admin-section-title"><Globe className="w-4 h-4" /> Site Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="admin-label">{t('siteName')} (EN)</label><input value={form.siteName?.en || ''} onChange={(e) => setForm({ ...form, siteName: { ...form.siteName, en: e.target.value } })} className="admin-input" /></div>
              <div><label className="admin-label">{t('siteName')} (AM)</label><input value={form.siteName?.am || ''} onChange={(e) => setForm({ ...form, siteName: { ...form.siteName, am: e.target.value } })} className="admin-input" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="admin-label">{t('siteTagline')} (EN)</label><input value={form.siteTagline?.en || ''} onChange={(e) => setForm({ ...form, siteTagline: { ...form.siteTagline, en: e.target.value } })} className="admin-input" /></div>
              <div><label className="admin-label">{t('siteTagline')} (AM)</label><input value={form.siteTagline?.am || ''} onChange={(e) => setForm({ ...form, siteTagline: { ...form.siteTagline, am: e.target.value } })} className="admin-input" /></div>
            </div>
            <div><label className="admin-label">{t('siteDescription')}</label><textarea value={form.siteDescription?.en || ''} onChange={(e) => setForm({ ...form, siteDescription: { ...form.siteDescription, en: e.target.value } })} rows={3} className="admin-input resize-none" /></div>
          </div>
        </div>

        {/* Contact */}
        <div className="admin-glass p-5 sm:p-6">
          <h2 className="admin-section-title"><Phone className="w-4 h-4" /> {t('contactInfo')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="admin-label"><MapPin className="w-3 h-3 inline mr-1" />{t('address')}</label><input value={form.address || ''} onChange={(e) => setForm({ ...form, address: e.target.value })} className="admin-input" /></div>
            <div><label className="admin-label"><Phone className="w-3 h-3 inline mr-1" />{t('phone')}</label><input value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="admin-input" /></div>
            <div><label className="admin-label"><Mail className="w-3 h-3 inline mr-1" />{t('email')}</label><input value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} className="admin-input" /></div>
            <div><label className="admin-label"><Globe className="w-3 h-3 inline mr-1" />Website</label><input value={form.website || ''} onChange={(e) => setForm({ ...form, website: e.target.value })} className="admin-input" /></div>
          </div>
        </div>

        {/* Theme */}
        <div className="admin-glass p-5 sm:p-6">
          <h2 className="admin-section-title"><Palette className="w-4 h-4" /> Theme</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">{t('primaryColor')}</label>
              <div className="flex gap-3 items-center">
                <input type="color" value={form.primaryColor} onChange={(e) => setForm({ ...form, primaryColor: e.target.value })} className="w-10 h-10 rounded-xl border-0 cursor-pointer bg-transparent" style={{ boxShadow: '0 0 0 2px var(--white-faint)' }} />
                <input value={form.primaryColor} onChange={(e) => setForm({ ...form, primaryColor: e.target.value })} className="admin-input flex-1" />
              </div>
            </div>
            <div>
              <label className="admin-label">{t('accentColor')}</label>
              <div className="flex gap-3 items-center">
                <input type="color" value={form.accentColor} onChange={(e) => setForm({ ...form, accentColor: e.target.value })} className="w-10 h-10 rounded-xl border-0 cursor-pointer bg-transparent" style={{ boxShadow: '0 0 0 2px var(--white-faint)' }} />
                <input value={form.accentColor} onChange={(e) => setForm({ ...form, accentColor: e.target.value })} className="admin-input flex-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="admin-glass p-5 sm:p-6">
          <h2 className="admin-section-title"><Image className="w-4 h-4" /> {t('heroImage')}</h2>
          <ImageUploader value={form.heroImage} onChange={(url) => setForm({ ...form, heroImage: url })} path="hero" />
        </div>
      </div>
    </div>
  );
}
