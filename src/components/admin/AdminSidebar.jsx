import { useState, useRef } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard, Image, FileText, Star, Settings, Calendar, Home,
  ChevronsLeft, ChevronsRight, LogOut, X, Video, Users, Database
} from 'lucide-react';
import { useSidebar } from '../../contexts/SidebarContext';
import { useLanguage } from '../../contexts/LanguageContext';

const NAV_ITEMS = [
  { to: '/admin', icon: LayoutDashboard, labelKey: 'dashboard', end: true },
  { to: '/admin/blog', icon: FileText, labelKey: 'blogAdmin', accent: '#60a5fa' },
  { to: '/admin/gallery', icon: Image, labelKey: 'galleryAdmin', accent: '#4ade80' },
  { to: '/admin/services', icon: Database, labelKey: 'services', accent: '#C9A96E' },
  { to: '/admin/bookings', icon: Calendar, labelKey: 'bookings', accent: '#a78bfa' },
  { to: '/admin/testimonials', icon: Star, labelKey: 'testimonialsAdmin', accent: '#fbbf24' },
];

const BOTTOM_ITEMS = [
  { to: '/admin/home', icon: Home, labelKey: 'homePage' },
  { to: '/admin/settings', icon: Settings, labelKey: 'settings' },
];

export default function AdminSidebar() {
  const { collapsed, toggleCollapsed, mobileOpen, closeMobile } = useSidebar();
  const { t } = useLanguage();
  const location = useLocation();
  const [tooltip, setTooltip] = useState(null);

  const isActive = (item) =>
    item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          onClick={closeMobile}
          style={{
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.2s ease',
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar fixed top-0 left-0 h-full z-40 flex flex-col transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${collapsed ? 'w-[72px]' : 'w-[260px]'}
        `}
        style={{
          background: 'linear-gradient(180deg, rgba(10,15,30,0.97) 0%, rgba(8,12,24,0.99) 100%)',
          borderRight: '1px solid rgba(255,255,255,0.04)',
          boxShadow: '4px 0 40px rgba(0,0,0,0.35)',
        }}
      >
        {/* Inner glow line */}
        <div
          className="absolute top-0 right-0 w-[1px] h-full pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(201,169,110,0.25) 0%, rgba(201,169,110,0.04) 35%, transparent 55%)' }}
        />

        {/* ─── Logo ─── */}
        <div
          className="relative flex items-center justify-between"
          style={{ padding: collapsed ? '20px 0' : '20px 20px', minHeight: 72 }}
        >
          <Link
            to="/"
            className={`flex items-center gap-3 group ${collapsed ? 'justify-center w-full' : ''}`}
            onClick={closeMobile}
          >
            {/* Mobile close button */}
            <button
              onClick={(e) => { e.stopPropagation(); closeMobile(); }}
              className="lg:hidden absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-white/[0.06]"
              style={{ color: 'var(--gray-500)', padding: 0 }}
            >
              <X className="w-4 h-4" />
            </button>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(201,169,110,0.15)]"
              style={{
                background: 'linear-gradient(135deg, rgba(201,169,110,0.18) 0%, rgba(201,169,110,0.06) 100%)',
                border: '1px solid rgba(201,169,110,0.18)',
              }}
            >
              <img src="/logo.webp" alt="Kasha" className="w-full h-full object-contain" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <div className="font-[var(--font-display)] font-bold text-white text-[15px] leading-tight tracking-tight whitespace-nowrap transition-colors group-hover:text-[var(--gold)]">
                  Kasha Multimedia
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] mt-[2px] whitespace-nowrap" style={{ color: 'rgba(201,169,110,0.5)' }}>
                  Admin Panel
                </div>
              </div>
            )}
          </Link>
        </div>

        {/* ─── Nav ─── */}
        <nav className="flex-1 overflow-y-auto" style={{ padding: collapsed ? '8px 10px' : '4px 14px' }}>
          {/* Section label */}
          {!collapsed && (
            <div className="px-3 pt-2 pb-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--gray-700)' }}>
                Navigation
              </span>
            </div>
          )}

          <div className="space-y-[3px]">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              const Icon = item.icon;

              return (
                <div
                  key={item.to}
                  className="relative"
                  onMouseEnter={() => collapsed && setTooltip(item.labelKey)}
                  onMouseLeave={() => setTooltip(null)}
                >
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={closeMobile}
                    className={`admin-nav-item relative flex items-center transition-all duration-300 group
                      ${collapsed ? 'justify-center w-12 h-11 mx-auto rounded-xl' : 'gap-3 px-3 h-[42px] rounded-xl'}
                      ${active
                        ? 'text-[var(--gold)] bg-[rgba(201,169,110,0.08)]'
                        : 'text-white/35 hover:text-white/75 hover:bg-white/[0.03]'
                      }
                    `}
                    style={active ? {
                      background: item.accent
                        ? `linear-gradient(135deg, ${item.accent}12 0%, ${item.accent}04 100%)`
                        : 'linear-gradient(135deg, rgba(201,169,110,0.10) 0%, rgba(201,169,110,0.03) 100%)',
                      border: item.accent
                        ? `1px solid ${item.accent}18`
                        : '1px solid rgba(201,169,110,0.12)',
                    } : { border: '1px solid transparent' }}
                  >
                    {/* Icon */}
                    <div className="relative z-10 flex items-center justify-center shrink-0" style={{ width: 20, height: 20 }}>
                      <Icon
                        className="w-[18px] h-[18px] transition-all duration-300"
                        style={active ? { filter: `drop-shadow(0 0 6px ${item.accent || 'rgba(201,169,110,0.5)'})` } : {}}
                      />
                    </div>

                    {/* Label */}
                    {!collapsed && (
                      <span className={`relative z-10 text-[13px] text-white/70 truncate transition-colors duration-200 ${active ? 'font-semibold !text-[var(--gold)]' : 'font-medium'}`}>
                        {t(item.labelKey)}
                      </span>
                    )}

                    {/* Active right dot */}
                    {active && !collapsed && (
                      <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-l-full"
                        style={{
                          background: item.accent || 'var(--gold)',
                          boxShadow: `-2px 0 8px ${item.accent || 'rgba(201,169,110,0.3)'}`,
                        }}
                      />
                    )}

                    {/* Collapsed active dot */}
                    {active && collapsed && (
                      <div
                        className="absolute -right-[10px] top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-l-full"
                        style={{
                          background: item.accent || 'var(--gold)',
                          boxShadow: `-2px 0 8px ${item.accent || 'rgba(201,169,110,0.3)'}`,
                        }}
                      />
                    )}
                  </NavLink>

                  {/* Tooltip for collapsed */}
                  {collapsed && tooltip === item.labelKey && (
                    <div
                      className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg text-xs font-medium text-white whitespace-nowrap z-50 pointer-events-none"
                      style={{
                        background: 'rgba(20,25,40,0.95)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                        animation: 'fadeIn 0.15s ease',
                      }}
                    >
                      {t(item.labelKey)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-4 mx-3 h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, transparent 100%)' }} />

          {/* Bottom items */}
          <div className="space-y-[3px]">
            {BOTTOM_ITEMS.map((item) => {
              const active = isActive(item);
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeMobile}
                  className={`relative flex items-center transition-all duration-300 group
                    ${collapsed ? 'justify-center w-12 h-11 mx-auto rounded-xl' : 'gap-3 px-3 h-[42px] rounded-xl'}
                    ${active ? 'text-[var(--gold)]' : 'text-white/35 hover:text-white/75'}
                  `}
                  style={active ? {
                    background: 'linear-gradient(135deg, rgba(201,169,110,0.08) 0%, rgba(201,169,110,0.02) 100%)',
                    border: '1px solid rgba(201,169,110,0.10)',
                  } : { border: '1px solid transparent' }}
                >
                  {!active && (
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: 'rgba(255,255,255,0.03)' }} />
                  )}
                  <div className="relative z-10 flex items-center justify-center shrink-0" style={{ width: 20, height: 20 }}>
                    <Icon className="w-[18px] h-[18px]" />
                  </div>
                  {!collapsed && (
                    <span className={`relative z-10 text-[13px] truncate ${active ? 'font-semibold' : 'font-medium'}`}>
                      {t(item.labelKey)}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* ─── Footer ─── */}
        <div className="relative" style={{ padding: collapsed ? '12px 10px 16px' : '12px 14px 16px' }}>
          {/* Divider */}
          <div className="mb-3 mx-0 h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, transparent 100%)' }} />

          {/* Collapse toggle */}
          <button
            onClick={toggleCollapsed}
            className="hidden lg:flex w-full items-center gap-3 rounded-xl px-3 h-[40px] text-white/25 hover:text-white/55 hover:bg-white/[0.03] transition-all duration-200 group"
            style={collapsed ? { justifyContent: 'center', padding: 0 } : {}}
          >
            <div className="flex items-center justify-center shrink-0 transition-transform duration-200" style={{ width: 20, height: 20 }}>
              {collapsed ? (
                <ChevronsRight className="w-[18px] h-[18px] group-hover:translate-x-0.5 transition-transform" />
              ) : (
                <ChevronsLeft className="w-[18px] h-[18px] group-hover:-translate-x-0.5 transition-transform" />
              )}
            </div>
            {!collapsed && <span className="text-[12px] font-medium">Collapse</span>}
          </button>

          {/* Back to site */}
          {!collapsed && (
            <Link
              to="/"
              onClick={closeMobile}
              className="flex items-center gap-3 rounded-xl px-3 h-[40px] text-white/25 hover:text-white/55 hover:bg-white/[0.03] transition-all duration-200"
            >
              <div className="flex items-center justify-center shrink-0" style={{ width: 20, height: 20 }}>
                <LogOut className="w-[18px] h-[18px]" />
              </div>
              <span className="text-[12px] font-medium">Back to Site</span>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
