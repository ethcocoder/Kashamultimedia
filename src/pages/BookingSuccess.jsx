import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Download, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function BookingSuccess() {
  const { state } = useLocation();
  const { t } = useLanguage();

  if (!state?.booking) return <Navigate to="/book" replace />;

  const { booking } = state;
  const shortId = (booking.id || 'XXXXXX').slice(0, 8).toUpperCase();

  const handleDownload = () => {
    const img = booking.confirmationImage;
    if (!img) return;
    if (img.startsWith('data:image')) {
      const a = document.createElement('a');
      a.href = img;
      a.download = `booking-${shortId}.png`;
      a.click();
    } else {
      const blob = new Blob([img], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `booking-${shortId}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div style={{ paddingTop: 'clamp(24px, 4vw, 48px)', paddingBottom: 'clamp(48px, 6vw, 96px)' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 32px)' }}>

        <div className="text-center" style={{ marginBottom: 'clamp(24px, 4vw, 40px)' }}>
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4" style={{ background: 'rgba(34,197,94,0.1)', border: '2px solid rgba(34,197,94,0.3)' }}>
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="heading-lg" style={{ marginBottom: '8px' }}>Booking Confirmed!</h1>
          <p className="text-sm text-[var(--gray-500)]">Your appointment has been successfully booked.</p>
        </div>

        {booking.confirmationImage && (
          <div className="card overflow-hidden" style={{ marginBottom: 'clamp(16px, 2vw, 24px)' }}>
            <img
              src={booking.confirmationImage}
              alt={`Booking ${shortId}`}
              className="w-full block"
              style={{ borderRadius: 'var(--radius-lg)' }}
            />
          </div>
        )}

        <div className="card card-pad" style={{ marginBottom: 'clamp(16px, 2vw, 24px)' }}>
          <div className="flex flex-col" style={{ gap: '14px' }}>
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--gray-500)' }}>Booking ID</span>
              <span className="font-semibold text-sm" style={{ color: 'var(--gold)' }}>{shortId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--gray-500)' }}>Service</span>
              <span className="text-sm font-semibold">{booking.service}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--gray-500)' }}>Date</span>
              <span className="text-sm">{booking.date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--gray-500)' }}>Time</span>
              <span className="text-sm">{booking.time}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--gray-500)' }}>Segment</span>
              <span className="text-sm">{booking.segment || 'Any Available'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--gray-500)' }}>Client</span>
              <span className="text-sm">{booking.name}</span>
            </div>
            {booking.phone && (
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--gray-500)' }}>Phone</span>
                <span className="text-sm">{booking.phone}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{ background: 'var(--gold)', color: 'var(--black)' }}
          >
            <Download className="w-4 h-4" />
            Download Image
          </button>
          <Link
            to="/book"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{ background: 'var(--gray-800)', border: '1px solid var(--white-faint)' }}
          >
            <Calendar className="w-4 h-4" />
            Book Another
          </Link>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs" style={{ color: 'var(--gray-500)' }}>
            <ArrowLeft className="w-3 h-3" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
