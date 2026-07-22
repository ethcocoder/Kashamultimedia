import { Menu, Bell, LogOut, ChevronRight, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useSidebar } from '../../contexts/SidebarContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../hooks/useAuth';
import LanguageToggle from './LanguageToggle';

const ROUTE_MAP = {
  '/admin': { label: 'Dashboard', color: 'var(--gold)' },
  '/admin/bookings': { label: 'Bookings', color: '#a78bfa' },
  '/admin/services': { label: 'Services', color: '#C9A96E' },
  '/admin/gallery': { label: 'Gallery', color: '#4ade80' },
  '/admin/blog': { label: 'Blog', color: '#60a5fa' },
  '/admin/testimonials': { label: 'Testimonials', color: '#fbbf24' },
  '/admin/settings': { label: 'Settings', color: '#60a5fa' },
  '/admin/home': { label: 'Home Page', color: '#C9A96E' },
};

export default function AdminTopBar() {
  const { toggleMobile } = useSidebar();
  const { lang, setLang } = useLanguage();
  const { logout, user } = useAuth();
  const location = useLocation();

  const current = ROUTE_MAP[location.pathname] || { label: 'Page', color: 'var(--gray-400)' };

  return (
    <header
      className="admin-topbar sticky top-0 z-20"
      style={{
        background: 'rgba(8, 13, 28, 0.72)',
        backdropFilter: 'blur(20px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ padding: '0 clamp(16px, 3vw, 32px)', height: 56 }}
      >
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMobile}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl transition-all hover:bg-white/[0.06]"
            style={{ color: 'var(--gray-500)' }}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumbs */}
          <nav className="hidden sm:flex items-center gap-1.5 text-[12px]">
            <span className="font-medium" style={{ color: 'var(--gray-600)' }}>Admin</span>
            <ChevronRight className="w-3 h-3" style={{ color: 'var(--gray-700)' }} />
            <span
              className="font-semibold"
              style={{ color: current.color }}
            >
              {current.label}
            </span>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <LanguageToggle value={lang} onChange={setLang} />

          {/* Notification bell */}
          <button
            className="relative w-9 h-9 flex items-center justify-center rounded-xl transition-all hover:bg-white/[0.06]"
            style={{ color: 'var(--gray-500)' }}
          >
            <Bell className="w-[18px] h-[18px]" />
            <span
              className="absolute top-2 right-2 w-2 h-2 rounded-full"
              style={{
                background: 'var(--gold)',
                boxShadow: '0 0 8px rgba(201,169,110,0.5)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
          </button>

          {/* User Profile */}
          <div className="hidden sm:flex items-center gap-2">
            <User className="w-4 h-4 text-[var(--gold)]" />
            <span className="text-xs font-medium text-white">{user?.email || 'Admin'}</span>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-9 h-9 flex items-center justify-center rounded-xl transition-all hover:bg-red-500/10 hover:text-red-400"
            style={{ color: 'var(--gray-500)' }}
            title="Logout"
          >
            <LogOut className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </header>
  );
}
