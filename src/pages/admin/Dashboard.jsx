import { useState, useEffect } from 'react';
import { 
  FileText, 
  Image as ImageIcon, 
  Calendar, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Video,
  Settings
} from 'lucide-react';
import { getAll } from '../../services/firestore';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../hooks/useAuth';

export default function Dashboard() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    blog: 0,
    gallery: 0,
    bookings: 0,
    services: 0,
    pending: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [blog, gallery, bookings, services] = await Promise.all([
          getAll('blog'),
          getAll('gallery'),
          getAll('bookings'),
          getAll('services')
        ]);
        
        setStats({
          blog: blog.length,
          gallery: gallery.length,
          bookings: bookings.length,
          services: services.length,
          pending: bookings.filter(b => b.status === 'pending').length
        });
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const cards = [
    { label: 'Blog Posts', value: stats.blog, icon: FileText, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Gallery Items', value: stats.gallery, icon: ImageIcon, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Active Services', value: stats.services, icon: CheckCircle2, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Total Messages', value: stats.bookings, icon: Calendar, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white">Welcome back, {user?.displayName || 'Admin'}</h1>
        <p className="text-gray-400 text-sm">Here's what's happening with Kasha Multimedia CMS today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div key={i} className="bg-[#121212] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${card.bg}`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Live</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white mb-1">{loading ? '...' : card.value}</span>
              <span className="text-xs text-gray-500 font-medium">{card.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#121212] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">System Status</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-green-500 font-medium">Production Ready</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-[var(--gold)]" />
                <div>
                  <p className="text-sm font-medium text-white">Firebase Connectivity</p>
                  <p className="text-xs text-gray-500">Authentication & Database</p>
                </div>
              </div>
              <span className="text-xs font-bold text-green-500">CONNECTED</span>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <div className="flex items-center gap-3">
                <ImageIcon className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-white">Media Storage</p>
                  <p className="text-xs text-gray-500">Firebase Storage Bucket</p>
                </div>
              </div>
              <span className="text-xs font-bold text-green-500">ACTIVE</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <div className="flex items-center gap-3">
                <Video className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-sm font-medium text-white">Local Upload Server</p>
                  <p className="text-xs text-gray-500">public/upload/images</p>
                </div>
              </div>
              <span className="text-xs font-bold text-green-500">RUNNING</span>
            </div>
          </div>
        </div>

        <div className="bg-[#121212] border border-white/5 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            <button className="flex items-center gap-3 p-3 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 text-[var(--gold)] hover:bg-[var(--gold)]/20 transition-all text-sm font-medium">
              <FileText className="w-4 h-4" />
              Create New Post
            </button>
            <button className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-sm font-medium">
              <ImageIcon className="w-4 h-4" />
              Upload Media
            </button>
            <button className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-sm font-medium">
              <Settings className="w-4 h-4" />
              System Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
