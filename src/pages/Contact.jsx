import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Phone, Mail } from 'lucide-react';
import { getById } from '../services/firestore';
import toast from 'react-hot-toast';

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [site, setSite] = useState({});

  useEffect(() => { getById('settings', 'site').then((s) => s && setSite(s)).catch(() => {}); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success('Message sent!');
      setForm({ name: '', email: '', message: '' });
      setSending(false);
    }, 1000);
  };

  const Input = ({ label, ...props }) => (
    <div>
      <label className="admin-label">{label}</label>
      <input {...props} className="admin-input" />
    </div>
  );

  return (
    <section className="section">
      <div className="text-center anim-fade-up" style={{ marginBottom: 'clamp(32px, 5vw, 64px)' }}>
        <p className="label mb-3">Contact</p>
        <h1 className="heading-lg">{t('contactTitle')}</h1>
        <p className="text-sm text-[var(--gray-500)] mx-auto mt-4" style={{ maxWidth: '480px' }}>{t('contactSubtitle')}</p>
        <div className="divider" style={{ marginTop: 'clamp(20px, 3vw, 32px)' }} />
      </div>

      <div className="grid-auto" style={{ gap: 'clamp(16px, 3vw, 24px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))' }}>
        <form onSubmit={handleSubmit} className="card card-pad space-y-4 sm:space-y-5 anim-fade-up delay-1">
          <div className="grid-auto-sm">
            <Input label={t('yourName')} type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="John Doe" />
            <Input label={t('yourEmail')} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="john@example.com" />
          </div>
          <div>
            <label className="admin-label">{t('yourMessage')}</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} className="admin-input resize-none" placeholder="Tell us about your visit..." />
          </div>
          <button type="submit" disabled={sending} className="btn-primary disabled:opacity-40">
            {sending ? '...' : t('sendMessage')}
          </button>
        </form>

        <div className="space-y-4 anim-fade-up delay-2">
          <div className="card card-pad-sm space-y-4 sm:space-y-5">
            {[
              site.address && { icon: MapPin, label: t('address'), value: site.address },
              site.phone && { icon: Phone, label: t('phone'), value: site.phone },
              site.email && { icon: Mail, label: t('email'), value: site.email },
            ].filter(Boolean).map((item, i) => (
              <div key={i} className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[var(--gold-dim)] border border-[var(--gold-border)] flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-[var(--gold)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--gray-500)] uppercase tracking-wider mb-0.5">{item.label}</p>
                  <p className="text-sm text-[var(--gray-300)]">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="card overflow-hidden" style={{ height: 'clamp(160px, 25vw, 220px)' }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.7!3d9.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMDAuMCJOIDM4wrA0MicwMC4wIkU!5e0!3m2!1sen!2set" width="100%" height="100%" style={{ border: 0, opacity: 0.4 }} allowFullScreen loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
