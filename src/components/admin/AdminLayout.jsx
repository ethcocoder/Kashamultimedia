import { Outlet } from 'react-router-dom';
import { SidebarProvider, useSidebar } from '../../contexts/SidebarContext';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';
import { useDevice } from '../../hooks/useDevice';

function AdminContent() {
  const { collapsed } = useSidebar();
  const { lg } = useDevice();

  return (
    <div className="admin-shell min-h-screen flex" style={{ background: 'linear-gradient(135deg, #060b18 0%, #0B1120 40%, #0a0f1c 100%)' }}>
      <AdminSidebar />

      {/* Main wrapper with gutter */}
      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ marginLeft: lg ? (collapsed ? 72 : 260) : 0 }}
      >
        <AdminTopBar />

        <main className="flex-1 overflow-y-auto relative">
          {/* Ambient corner glow */}
          <div
            className="fixed pointer-events-none"
            style={{
              top: '-120px',
              right: '-120px',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201,169,110,0.03) 0%, transparent 70%)',
              filter: 'blur(60px)',
              zIndex: 0,
            }}
          />
          <div
            className="fixed pointer-events-none"
            style={{
              bottom: '-100px',
              left: '30%',
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(96,165,250,0.02) 0%, transparent 70%)',
              filter: 'blur(60px)',
              zIndex: 0,
            }}
          />

          <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-7">
            <div className="max-w-[1400px] mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AdminContent />
    </SidebarProvider>
  );
}
