import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Video, LogIn, Loader2, ArrowRight, Home } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import toast from 'react-hot-toast';

export default function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-5 relative overflow-hidden">
      <div className="admin-login-bg" />
      <div className="admin-login-pattern" />

      {/* Decorative glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="admin-login-card" style={{ maxWidth: 'min(100%, 440px)', width: '100%' }}>
        <div className="admin-login-glow" />

        <div className="text-center" style={{ marginBottom: 'clamp(28px, 4vw, 40px)' }}>
          <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center transition-all duration-300" style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.15)' }}>
            <Video className="w-7 h-7 text-[var(--gold)]" />
          </div>
          <h1 className="font-[var(--font-display)] font-bold text-white" style={{ fontSize: 'clamp(20px, 3vw, 24px)' }}>Admin Login</h1>
          <p className="text-sm mt-1.5" style={{ color: 'var(--gray-500)' }}>Kasha Multimedia CMS Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="admin-label">{t('adminEmail')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="admin-input"
              placeholder="admin@kashamultimedia.com"
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              style={focused === 'email' ? { borderColor: 'var(--gold)', boxShadow: '0 0 0 3px rgba(201,169,110,0.1)' } : {}}
            />
          </div>
          <div>
            <label className="admin-label">{t('adminPassword')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="admin-input"
              onFocus={() => setFocused('pass')}
              onBlur={() => setFocused(null)}
              style={focused === 'pass' ? { borderColor: 'var(--gold)', boxShadow: '0 0 0 3px rgba(201,169,110,0.1)' } : {}}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary justify-center !py-3 !text-sm relative overflow-hidden group"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                <span>{t('login')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>
      </div>

      <Link to="/" className="flex items-center justify-center gap-2 mt-5 text-sm transition-colors" style={{ color: 'var(--gray-500)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-500)'}>
        <Home className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}
