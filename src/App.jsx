import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './hooks/useAuth';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ui/ErrorBoundary';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/ui/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const System = lazy(() => import('./pages/System'));
const Integrations = lazy(() => import('./pages/Integrations'));
const Services = lazy(() => import('./pages/Services'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const Book = lazy(() => import('./pages/Book'));
const BookingSuccess = lazy(() => import('./pages/BookingSuccess'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Login = lazy(() => import('./pages/admin/Login'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminServices = lazy(() => import('./pages/admin/AdminServices'));
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery'));
const AdminBlog = lazy(() => import('./pages/admin/AdminBlog'));
const AdminTestimonials = lazy(() => import('./pages/admin/AdminTestimonials'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const AdminBookings = lazy(() => import('./pages/admin/AdminBookings'));
const AdminHomePage = lazy(() => import('./pages/admin/AdminHomePage'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center" style={{ minHeight: '40vh' }}>
      <div className="w-8 h-8 border-2 border-[var(--gold)]/30 border-t-[var(--gold)] rounded-full animate-spin" />
    </div>
  );
}

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="bg-pattern" />
      <Navbar />
      <main className="flex-1 relative z-10" style={{ paddingTop: 'var(--nav-height)' }}>
        <Suspense fallback={<PageLoader />}>{children}</Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <AuthProvider>
          <DarkModeProvider>
            <LanguageProvider>
              <ThemeProvider>
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    duration: 3000,
                    style: {
                      background: 'var(--black-elevated)',
                      color: 'var(--white)',
                      border: '1px solid var(--white-faint)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '13px',
                      padding: '12px 16px',
                    },
                    success: { iconTheme: { primary: 'var(--gold)', secondary: 'var(--black)' } },
                  }}
                />
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                      <Route index element={<Dashboard />} />
                      <Route path="services" element={<AdminServices />} />
                      <Route path="gallery" element={<AdminGallery />} />
                      <Route path="blog" element={<AdminBlog />} />
                      <Route path="testimonials" element={<AdminTestimonials />} />
                      <Route path="bookings" element={<AdminBookings />} />
                      <Route path="settings" element={<AdminSettings />} />
                      <Route path="home" element={<AdminHomePage />} />
                    </Route>
                    <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
                    <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
                    <Route path="/system" element={<PublicLayout><System /></PublicLayout>} />
                    <Route path="/integrations" element={<PublicLayout><Integrations /></PublicLayout>} />
                    <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
                    <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
                    <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
                    <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
                    <Route path="/book" element={<PublicLayout><Book /></PublicLayout>} />
                    <Route path="/booking-success" element={<PublicLayout><BookingSuccess /></PublicLayout>} />
                    <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
                  </Routes>
                </Suspense>
              </ThemeProvider>
            </LanguageProvider>
          </DarkModeProvider>
        </AuthProvider>
      </HashRouter>
    </ErrorBoundary>
  );
}
