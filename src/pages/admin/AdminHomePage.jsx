import { useState, useEffect } from 'react';
import { 
  Home, 
  Save, 
  Image as ImageIcon, 
  Layout, 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown,
  Eye,
  EyeOff,
  Video,
  Loader2
} from 'lucide-react';
import { getById, update, create } from '../../services/firestore';
import { useLanguage } from '../../contexts/LanguageContext';
import ImageUploader from '../../components/ui/ImageUploader';
import toast from 'react-hot-toast';

export default function AdminHomePage() {
  const { t, lang } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formLang, setFormLang] = useState('en');
  const [form, setForm] = useState({
    hero: {
      title: { en: 'Kasha Multimedia CMS', am: 'ካሻ ማልቲሚዲያ CMS' },
      subtitle: { en: 'Preserve and Share Ethiopia\'s Cultural Heritage', am: 'የኢትዮጵያን ባህላዊ ውርስ ለመጠበቅ እና ለመጋራት' },
      backgroundImage: '',
      videoUrl: ''
    },
    sections: [
      { id: 'about', title: { en: 'About Kasha', am: 'ስለ ካሻ' }, visible: true },
      { id: 'pillars', title: { en: 'Knowledge Domains', am: 'የእውቀት ዘርፎች' }, visible: true },
      { id: 'segments', title: { en: 'Recurring Segments', am: 'ተደጋጋሚ ክፍሎች' }, visible: true },
      { id: 'integrations', title: { en: 'Platform Integrations', am: 'መድረክ ውህደቶች' }, visible: true }
    ]
  });

  useEffect(() => {
    getById('settings', 'homePage').then((data) => {
      if (data) setForm((prev) => ({ ...prev, ...data }));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const exists = await getById('settings', 'homePage');
      if (exists) {
        await update('settings', 'homePage', form);
      } else {
        await create('settings', { id: 'homePage', ...form });
      }
      toast.success('Home page updated!');
    } catch {
      toast.error('Failed to update home page');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 text-[var(--gold)] animate-spin" />
    </div>
  );

  return (
    <div className="admin-page-enter space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.15)' }}>
            <Home className="w-5 h-5 text-[var(--gold)]" />
          </div>
          <div>
            <h1 className="font-[var(--font-display)] font-bold text-white text-xl">Home Page Builder</h1>
            <p className="text-xs mt-1" style={{ color: 'var(--gray-500)' }}>Manage your landing page content</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={formLang} 
            onChange={(e) => setFormLang(e.target.value)}
            className="admin-input !py-2 !text-xs w-24"
          >
            <option value="en">English</option>
            <option value="am">Amharic</option>
          </select>
          <button onClick={save} disabled={saving} className="btn-primary !py-2.5 !px-4 !text-sm flex items-center gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hero Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="admin-glass p-6 space-y-4">
            <h2 className="admin-section-title flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Hero Section
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="admin-label">Hero Title ({formLang.toUpperCase()})</label>
                <input 
                  value={form.hero.title[formLang] || ''} 
                  onChange={(e) => setForm({
                    ...form,
                    hero: {
                      ...form.hero,
                      title: { ...form.hero.title, [formLang]: e.target.value }
                    }
                  })}
                  className="admin-input" 
                />
              </div>
              
              <div>
                <label className="admin-label">Hero Subtitle ({formLang.toUpperCase()})</label>
                <textarea 
                  value={form.hero.subtitle[formLang] || ''} 
                  onChange={(e) => setForm({
                    ...form,
                    hero: {
                      ...form.hero,
                      subtitle: { ...form.hero.subtitle, [formLang]: e.target.value }
                    }
                  })}
                  rows={3}
                  className="admin-input resize-none" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Hero Background Image</label>
                  <ImageUploader 
                    value={form.hero.backgroundImage} 
                    onChange={(url) => setForm({
                      ...form,
                      hero: { ...form.hero, backgroundImage: url }
                    })}
                    path="hero"
                  />
                </div>
                <div>
                  <label className="admin-label">Hero Background Video (Optional)</label>
                  <ImageUploader 
                    value={form.hero.videoUrl} 
                    onChange={(url) => setForm({
                      ...form,
                      hero: { ...form.hero, videoUrl: url }
                    })}
                    path="hero/videos"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section Visibility */}
          <div className="admin-glass p-6 space-y-4">
            <h2 className="admin-section-title">Section Management</h2>
            <div className="space-y-2">
              {form.sections.map((section, index) => (
                <div key={section.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium text-white">{section.title[formLang]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        const newSections = [...form.sections];
                        newSections[index].visible = !newSections[index].visible;
                        setForm({ ...form, sections: newSections });
                      }}
                      className={`p-2 rounded-lg transition-colors ${section.visible ? 'text-[var(--gold)] bg-[var(--gold)]/10' : 'text-gray-500 bg-white/5'}`}
                    >
                      {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview / Sidebar */}
        <div className="space-y-6">
          <div className="admin-glass p-6">
            <h2 className="admin-section-title">Live Preview</h2>
            <div className="aspect-video rounded-xl overflow-hidden bg-black border border-white/10 relative">
              {form.hero.backgroundImage ? (
                <img src={form.hero.backgroundImage} alt="" className="w-full h-full object-cover opacity-50" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-700">
                  <ImageIcon className="w-12 h-12" />
                </div>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <h3 className="text-sm font-bold text-white mb-1">{form.hero.title[formLang]}</h3>
                <p className="text-[10px] text-gray-300 line-clamp-2">{form.hero.subtitle[formLang]}</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-500 mt-4 text-center italic">This is a simplified preview of the hero section.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
