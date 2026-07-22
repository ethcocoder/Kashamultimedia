import { useState, useEffect } from 'react';
import {
  Scissors, Image, FileText, Star, Calendar, ArrowUpRight, Sparkles, Home,
  TrendingUp, Clock, Users, Activity, BarChart3, Plus, Bell, CheckCircle2,
} from 'lucide-react';
import { getAll } from '../../services/firestore';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { t, lang } = useLanguage();
  const [counts, setCounts] = useState({ services: 0, gallery: 0, blog: 0, testimonials: 0, bookings: 0 });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAll('services'), getAll('gallery'), getAll('blog'), getAll('testimonials'), getAll('bookings')])
      .then(([s, g, b, te, bk]) => {
        setCounts({ services: s.length, gallery: g.length, blog: b.length, testimonials: te.length, bookings: bk.length });
        setRecentBookings(bk.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)).slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stats = [
    { icon: Scissors, color: '#C9A96E', label: t('totalServices'), value: counts.services, to: '/admin/services', gradient: 'linear-gradient(135deg, rgba(201,169,110,0.15) 0%, rgba(201,169,110,0.03) 100%)' },
    { icon: Calendar, color: '#a78bfa', label: t('bookings'), value: counts.bookings, to: '/admin/bookings', gradient: 'linear-gradient(135deg, rgba(167,139,250,0.15) 0%, rgba(167,139,250,0.03) 100%)' },
    { icon: Image, color: '#4ade80', label: t('totalGallery'), value: counts.gallery, to: '/admin/gallery', gradient: 'linear-gradient(135deg, rgba(74,222,128,0.15) 0%, rgba(74,222,128,0.03) 100%)' },
    { icon: FileText, color: '#60a5fa', label: t('totalBlog'), value: counts.blog, to: '/admin/blog', gradient: 'linear-gradient(135deg, rgba(96,165,250,0.15) 0%, rgba(96,165,250,0.03) 100%)' },
    { icon: Star, color: '#fbbf24', label: t('totalTestimonials'), value: counts.testimonials, to: '/admin/testimonials', gradient: 'linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(251,191,36,0.03) 100%)' },
  ];

  const quickActions = [
    { to: '/admin/home', label: t('homePage'), icon: Home, color: '#C9A96E' },
    { to: '/admin/services', label: t('services'), icon: Scissors, color: '#C9A96E' },
    { to: '/admin/bookings', label: t('bookings'), icon: Calendar, color: '#a78bfa' },
    { to: '/admin/gallery', label: t('galleryAdmin'), icon: Image, color: '#4ade80' },
    { to: '/admin/blog', label: t('blogAdmin'), icon: FileText, color: '#60a5fa' },
    { to: '/admin/testimonials', label: t('testimonialsAdmin'), icon: Star, color: '#fbbf24' },
  ];

  const statusColor = (s) => {
    if (s === 'confirmed') return 'admin-badge-green';
    if (s === 'completed') return 'admin-badge-blue';
    return 'admin-badge-red';
  };

  return (
    <div className="admin-page-enter">
      {/* Header with System Status */}
      <div className="flex items-center justify-between mb-7 sm:mb-8">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(201,169,110,0.18) 0%, rgba(201,169,110,0.06) 100%)',
              border: '1px solid rgba(201,169,110,0.2)',
              boxShadow: '0 0 32px rgba(201,169,110,0.08)',
            }}
          >
            <Sparkles className="w-6 h-6 text-[var(--gold)]" />
          </div>
          <div>
            <h1
              className="font-[var(--font-display)] font-bold text-white"
              style={{ fontSize: 'clamp(20px, 2.5vw, 26px)' }}
            >
              {t('dashboard')}
            </h1>
            <p className="text-xs mt-0.5" style={{ color: 'var(--gray-500)' }}>
              Welcome back to your barbershop admin
            </p>
          </div>
        </div>

        {/* System Status */}
        <div
          className="admin-glass px-4 py-2.5 rounded-xl flex items-center gap-2.5"
          style={{ border: '1px solid rgba(74,222,128,0.15)' }}
        >
          <div className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: '0 0 8px rgba(74,222,128,0.5)' }} />
          <span className="text-xs font-medium" style={{ color: 'var(--gray-300)' }}>System Online</span>
        </div>
      </div>

      {/* Stat Cards - Enhanced */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
        style={{ marginBottom: 'clamp(28px, 3.5vw, 40px)' }}
      >
        {stats.map((s, i) => (
          <Link
            key={s.to}
            to={s.to}
            className="admin-stat-card group relative flex flex-col overflow-hidden"
            style={{
              minHeight: 'clamp(110px, 12vw, 130px)',
              animation: `fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s forwards`,
              opacity: 0,
            }}
          >
            {/* Gradient overlay on hover */}
            <div
              className="absolute inset-0 rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: s.gradient }}
            />

            {/* Animated border glow */}
            <div
              className="absolute inset-0 rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                border: `1px solid ${s.color}20`,
                boxShadow: `0 0 24px ${s.color}10`,
              }}
            />

            <div className="relative z-10 flex flex-col justify-between flex-1 p-1">
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(201,169,110,0.2)]"
                  style={{
                    background: `${s.color}15`,
                    border: `1px solid ${s.color}20`,
                    boxShadow: `0 0 12px ${s.color}08`,
                  }}
                >
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <ArrowUpRight
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0"
                  style={{ color: 'var(--gray-500)' }}
                />
              </div>
              <div>
                <p
                  className="text-[10px] font-medium uppercase tracking-wider mb-1"
                  style={{ color: 'var(--gray-500)' }}
                >
                  {s.label}
                </p>
                <p
                  className="admin-stat-number"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 1.9rem)',
                    lineHeight: 1.1,
                  }}
                >
                  {s.value}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions + Recent Bookings */}
      <div
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5"
        style={{ marginBottom: 'clamp(28px, 3.5vw, 40px)' }}
      >
        {/* Quick Actions - Enhanced */}
        <div className="lg:col-span-2 admin-glass p-5 sm:p-6">
          <h2 className="admin-section-title">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {quickActions.map((a, i) => (
              <Link
                key={a.to}
                to={a.to}
                className="group flex items-center gap-3 p-3.5 sm:p-4 rounded-xl transition-all duration-300 hover:translate-y-[-2px]"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  animation: `fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.03}s forwards`,
                  opacity: 0,
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_16px_rgba(201,169,110,0.15)]"
                  style={{
                    background: `${a.color}10`,
                    border: `1px solid ${a.color}15`,
                  }}
                >
                  <a.icon className="w-5 h-5" style={{ color: a.color }} />
                </div>
                <span
                  className="text-sm font-medium truncate transition-colors duration-200 group-hover:text-[var(--gold)]"
                  style={{ color: 'var(--gray-300)' }}
                >
                  {a.label}
                </span>
                <ArrowUpRight
                  className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0 ml-auto"
                  style={{ color: 'var(--gray-600)' }}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Bookings - Enhanced */}
        <div className="admin-glass p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="admin-section-title mb-0">Recent Bookings</h2>
            <Link
              to="/admin/bookings"
              className="text-xs text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors font-medium"
            >
              View all
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="h-12 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }} />
                </div>
              ))}
            </div>
          ) : recentBookings.length > 0 ? (
            <div className="space-y-2">
              {recentBookings.map((b, i) => (
                <Link
                  key={b.id}
                  to="/admin/bookings"
                  className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-white/[0.03] hover:translate-x-1 group"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(201,169,110,0.08)',
                      border: '1px solid rgba(201,169,110,0.12)',
                    }}
                  >
                    <Users className="w-4 h-4 text-[var(--gold)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--white)' }}>
                      {b.name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--gray-500)' }}>
                      {b.service} · {b.date}
                    </p>
                  </div>
                  <span className={`admin-badge ${statusColor(b.status)}`}>{b.status}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--gray-700)' }} />
              <p className="text-xs" style={{ color: 'var(--gray-500)' }}>No bookings yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards - Enhanced */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div
          className="admin-glass p-4 flex items-center gap-3 group hover:translate-y-[-2px] transition-all duration-300"
          style={{ animation: 'fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.1s forwards', opacity: 0 }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
            style={{
              background: 'rgba(74,222,128,0.08)',
              border: '1px solid rgba(74,222,128,0.12)',
              boxShadow: '0 0 16px rgba(74,222,128,0.06)',
            }}
          >
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-white">{counts.gallery}</p>
            <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--gray-500)' }}>
              Gallery Images
            </p>
          </div>
        </div>
        <div
          className="admin-glass p-4 flex items-center gap-3 group hover:translate-y-[-2px] transition-all duration-300"
          style={{ animation: 'fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.15s forwards', opacity: 0 }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
            style={{
              background: 'rgba(96,165,250,0.08)',
              border: '1px solid rgba(96,165,250,0.12)',
              boxShadow: '0 0 16px rgba(96,165,250,0.06)',
            }}
          >
            <FileText className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-white">{counts.blog}</p>
            <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--gray-500)' }}>
              Blog Posts
            </p>
          </div>
        </div>
        <div
          className="admin-glass p-4 flex items-center gap-3 group hover:translate-y-[-2px] transition-all duration-300"
          style={{ animation: 'fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.2s forwards', opacity: 0 }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
            style={{
              background: 'rgba(251,191,36,0.08)',
              border: '1px solid rgba(251,191,36,0.12)',
              boxShadow: '0 0 16px rgba(251,191,36,0.06)',
            }}
          >
            <Star className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-white">{counts.testimonials}</p>
            <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--gray-500)' }}>
              Reviews
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
