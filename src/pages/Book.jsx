import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Play, User, Phone, Mail, FileText, AlertCircle, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getAll, getBookingsByDate, createBooking, update as updateBooking } from '../services/firestore';
import { createBookingImage, svgToPngDataUrl } from '../utils/bookingImage';

const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
];

const SECTION_GAP = 'clamp(24px, 4vw, 40px)';

function SectionHeader({ icon: Icon, title, step }) {
  return (
    <div className="flex items-center gap-3" style={{ marginBottom: 'clamp(12px, 2vw, 16px)' }}>
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.15)' }}
      >
        <span className="text-xs font-bold" style={{ color: 'var(--gold)' }}>{step}</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" style={{ color: 'var(--gold)' }} />
        <h3 className="font-[var(--font-display)] font-semibold text-sm" style={{ color: 'var(--white)' }}>{title}</h3>
      </div>
    </div>
  );
}

function FieldLabel({ icon: Icon, children, required }) {
  return (
    <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--gray-400)' }}>
      <Icon className="w-3.5 h-3.5" style={{ color: 'var(--gold)', opacity: 0.7 }} />
      {children}
      {required && <span style={{ color: 'var(--gold)' }}>*</span>}
    </label>
  );
}

export default function Book() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkingSlot, setCheckingSlot] = useState(false);
  const [slotTaken, setSlotTaken] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    service: '',
    date: '',
    time: '',
    segment: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  useEffect(() => {
    getAll('services').then(setServices).catch(() => {});
  }, []);

  const today = new Date().toISOString().split('T')[0];

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSlotTaken(false);
    setError('');
  };

  useEffect(() => {
    if (!form.date || !form.time) return;
    let active = true;
    setCheckingSlot(true);
    setSlotTaken(false);
    getBookingsByDate(form.date)
      .then((bookings) => {
        if (!active) return;
        const taken = bookings.some((b) => b.time === form.time && b.status !== 'cancelled');
        setSlotTaken(taken);
        setCheckingSlot(false);
      })
      .catch(() => setCheckingSlot(false));
    return () => { active = false; };
  }, [form.date, form.time]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.service || !form.date || !form.time || !form.name || !form.phone) {
      setError('Please fill in all required fields.');
      return;
    }

    if (slotTaken) {
      setError('This time slot is already booked. Please choose another.');
      return;
    }

    setLoading(true);
    try {
      const bookingData = {
        service: form.service,
        date: form.date,
        time: form.time,
        segment: form.segment || 'Any Available',
        name: form.name,
        phone: form.phone,
        email: form.email,
        notes: form.notes,
        status: 'confirmed',
      };

      let imageDataUrl = null;
      try {
        imageDataUrl = await svgToPngDataUrl(generateBookingSVGLocal(bookingData));
      } catch {
        imageDataUrl = generateBookingSVGLocal(bookingData);
      }

      const docId = await createBooking(bookingData, imageDataUrl);

      const bookingWithId = { ...bookingData, id: docId };
      let finalImage = imageDataUrl;
      try {
        finalImage = await createBookingImage(bookingWithId);
      } catch { /* keep previous */ }

      try {
        await updateBooking('bookings', docId, { confirmationImage: finalImage });
      } catch { /* non-critical */ }

      navigate('/booking-success', {
        state: { booking: { ...bookingData, id: docId, confirmationImage: finalImage } },
      });
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const selectedService = services.find((s) => (s.name?.[lang] || s.name?.en || '') === form.service);

  return (
    <div style={{ paddingTop: 'clamp(24px, 4vw, 48px)', paddingBottom: 'clamp(48px, 6vw, 96px)' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 32px)' }}>

        {/* Header */}
        <div className="text-center" style={{ marginBottom: 'clamp(28px, 5vw, 52px)' }}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] anim-pulse" />
            <div className="label">{t('bookNow')}</div>
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] anim-pulse" />
          </div>
          <h1 className="heading-lg" style={{ marginBottom: 'clamp(8px, 1.5vw, 14px)' }}>{t('bookNow')}</h1>
          <p className="text-sm text-[var(--gray-500)] mx-auto" style={{ maxWidth: '420px' }}>
            Choose a content segment, pick a broadcast date and time, and we'll confirm your participation.
          </p>
          <div className="divider" style={{ marginTop: 'clamp(16px, 2.5vw, 24px)' }} />
        </div>

        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl mb-6" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(239,68,68,0.12)' }}>
              <AlertCircle className="w-4 h-4 text-red-400" />
            </div>
            <span className="text-red-400 text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

            {/* Left: Form */}
            <div className="flex-1 min-w-0 flex flex-col" style={{ gap: SECTION_GAP }}>

              {/* Section 1: Service */}
              <div className="card card-pad">
                <SectionHeader icon={Play} title="Select Segment" step="1" />
                <div>
                  <select
                    value={form.service}
                    onChange={(e) => update('service', e.target.value)}
                    className="admin-input w-full"
                    required
                  >
                    <option value="">Choose a service...</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.name?.[lang] || s.name?.en || ''}>{s.name?.[lang] || s.name?.en || ''} — {s.price}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Section 2: Date & Time */}
              <div className="card card-pad">
                <SectionHeader icon={Calendar} title="Pick Date & Time" step="2" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel icon={Calendar} required>Date</FieldLabel>
                    <input
                      type="date"
                      value={form.date}
                      min={today}
                      onChange={(e) => update('date', e.target.value)}
                      className="admin-input w-full"
                      required
                    />
                  </div>
                  <div>
                    <FieldLabel icon={Clock} required>Time</FieldLabel>
                    <select
                      value={form.time}
                      onChange={(e) => update('time', e.target.value)}
                      className="admin-input w-full"
                      required
                    >
                      <option value="">Select time</option>
                      {TIME_SLOTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Slot status */}
                {checkingSlot && form.date && form.time && (
                  <div className="flex items-center gap-2.5 mt-3 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--white-faint)' }}>
                    <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'var(--gold)' }} />
                    <span className="text-sm" style={{ color: 'var(--gray-400)' }}>Checking availability...</span>
                  </div>
                )}
                {slotTaken && !checkingSlot && (
                  <div className="flex items-center gap-2.5 mt-3 p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)' }}>
                    <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ background: 'rgba(239,68,68,0.12)' }}>
                      <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                    </div>
                    <span className="text-sm" style={{ color: '#f87171' }}>This slot is taken. Pick another time.</span>
                  </div>
                )}
                {!slotTaken && !checkingSlot && form.date && form.time && (
                  <div className="flex items-center gap-2.5 mt-3 p-3 rounded-lg" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.12)' }}>
                    <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ background: 'rgba(34,197,94,0.12)' }}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <span className="text-sm" style={{ color: '#4ade80' }}>Slot available!</span>
                  </div>
                )}
              </div>

              {/* Section 3: Your Details */}
              <div className="card card-pad">
                <SectionHeader icon={User} title="Your Details" step="3" />
                <div className="flex flex-col" style={{ gap: 'clamp(12px, 2vw, 16px)' }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel icon={User} required>Full Name</FieldLabel>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        className="admin-input w-full"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <FieldLabel icon={Phone} required>Phone</FieldLabel>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className="admin-input w-full"
                        placeholder="+251 9XX XXX XXX"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <FieldLabel icon={Mail}>Email</FieldLabel>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className="admin-input w-full"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Preferences */}
              <div className="card card-pad">
                <SectionHeader icon={Sparkles} title="Preferences" step="4" />
                <div className="flex flex-col" style={{ gap: 'clamp(12px, 2vw, 16px)' }}>
                  <div>
                    <FieldLabel icon={Play}>Preferred Segment</FieldLabel>
                    <input
                      type="text"
                      value={form.segment}
                      onChange={(e) => update('segment', e.target.value)}
                      className="admin-input w-full"
                      placeholder="Any available"
                    />
                  </div>
                  <div>
                    <FieldLabel icon={FileText}>Notes</FieldLabel>
                    <textarea
                      value={form.notes}
                      onChange={(e) => update('notes', e.target.value)}
                      className="admin-input w-full"
                      rows={3}
                      placeholder="Any special requests..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit — visible on mobile */}
              <button
                type="submit"
                disabled={loading || slotTaken || checkingSlot}
                className="lg:hidden w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm transition-all btn-primary justify-center"
                style={{
                  opacity: (loading || slotTaken || checkingSlot) ? 0.5 : 1,
                  cursor: (loading || slotTaken || checkingSlot) ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                ) : (
                  <><CheckCircle2 className="w-4 h-4" /> Confirm Booking</>
                )}
              </button>
            </div>

            {/* Right: Sidebar Summary */}
            <div className="hidden lg:block w-[280px] shrink-0">
              <div className="sticky" style={{ top: 'calc(var(--nav-height) + 24px)' }}>
                <div className="card card-pad" style={{ borderColor: 'var(--gold-border)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4" style={{ color: 'var(--gold)' }} />
                    <h3 className="font-[var(--font-display)] font-semibold text-sm" style={{ color: 'var(--white)' }}>Booking Summary</h3>
                  </div>

                  <div className="flex flex-col" style={{ gap: '14px' }}>
                    <div className="flex justify-between items-start">
                      <span className="text-xs" style={{ color: 'var(--gray-500)' }}>Service</span>
                      <span className="text-sm font-medium text-right" style={{ color: form.service ? 'var(--white)' : 'var(--gray-700)' }}>
                        {selectedService ? (selectedService.name?.[lang] || selectedService.name?.en || '') : '—'}
                      </span>
                    </div>
                    {selectedService?.price && (
                      <div className="flex justify-between items-center">
                        <span className="text-xs" style={{ color: 'var(--gray-500)' }}>Price</span>
                        <span className="text-sm font-bold" style={{ color: 'var(--gold)' }}>{selectedService.price}</span>
                      </div>
                    )}
                    {selectedService?.duration && (
                      <div className="flex justify-between items-center">
                        <span className="text-xs" style={{ color: 'var(--gray-500)' }}>Duration</span>
                        <span className="text-sm" style={{ color: 'var(--gray-300)' }}>{selectedService.duration} min</span>
                      </div>
                    )}

                    <div className="h-[1px]" style={{ background: 'var(--white-faint)' }} />

                    <div className="flex justify-between items-center">
                      <span className="text-xs" style={{ color: 'var(--gray-500)' }}>Date</span>
                      <span className="text-sm" style={{ color: form.date ? 'var(--white)' : 'var(--gray-700)' }}>
                        {form.date || '—'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs" style={{ color: 'var(--gray-500)' }}>Time</span>
                      <span className="text-sm" style={{ color: form.time ? 'var(--white)' : 'var(--gray-700)' }}>
                        {form.time || '—'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs" style={{ color: 'var(--gray-500)' }}>Segment</span>
                      <span className="text-sm" style={{ color: form.segment ? 'var(--white)' : 'var(--gray-700)' }}>
                        {form.segment || 'Any Available'}
                      </span>
                    </div>

                    <div className="h-[1px]" style={{ background: 'var(--white-faint)' }} />

                    <div className="flex justify-between items-center">
                      <span className="text-xs" style={{ color: 'var(--gray-500)' }}>Client</span>
                      <span className="text-sm" style={{ color: form.name ? 'var(--white)' : 'var(--gray-700)' }}>
                        {form.name || '—'}
                      </span>
                    </div>
                    {form.phone && (
                      <div className="flex justify-between items-center">
                        <span className="text-xs" style={{ color: 'var(--gray-500)' }}>Phone</span>
                        <span className="text-sm" style={{ color: 'var(--gray-300)' }}>{form.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Desktop Submit */}
                  <button
                    type="submit"
                    disabled={loading || slotTaken || checkingSlot}
                    className="w-full mt-6 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all btn-primary"
                    style={{
                      opacity: (loading || slotTaken || checkingSlot) ? 0.5 : 1,
                      cursor: (loading || slotTaken || checkingSlot) ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                    ) : (
                      <><CheckCircle2 className="w-4 h-4" /> Confirm Booking</>
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

function generateBookingSVGLocal(booking) {
  const { id, service, date, time, name, segment } = booking;
  const shortId = (id || 'XXXXXX').slice(0, 8).toUpperCase();
  const displaySegment = segment || 'Any Available';
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="500" height="340" viewBox="0 0 500 340">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#090909"/>
          <stop offset="100%" stop-color="#111111"/>
        </linearGradient>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#C9A96E"/>
          <stop offset="100%" stop-color="#D4B87A"/>
        </linearGradient>
      </defs>
      <rect width="500" height="340" rx="16" fill="url(#bg)" stroke="#C9A96E" stroke-width="1.5" opacity="0.95"/>
      <rect x="1" y="1" width="498" height="60" rx="15" fill="url(#gold)" opacity="0.12"/>
      <text x="250" y="28" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="3" fill="#C9A96E">KASHA MULTIMEDIA</text>
      <text x="250" y="48" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" letter-spacing="1.5" fill="#888888">BOOKING CONFIRMATION</text>
      <line x1="40" y1="72" x2="460" y2="72" stroke="#C9A96E" stroke-width="0.5" opacity="0.3"/>
      <text x="40" y="100" font-family="Arial, sans-serif" font-size="10" fill="#888888" letter-spacing="1">BOOKING ID</text>
      <text x="40" y="118" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#C9A96E">${shortId}</text>
      <text x="280" y="100" font-family="Arial, sans-serif" font-size="10" fill="#888888" letter-spacing="1">SEGMENT</text>
      <text x="280" y="118" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#f5f5f5">${service || 'Content'}</text>
      <text x="40" y="155" font-family="Arial, sans-serif" font-size="10" fill="#888888" letter-spacing="1">DATE</text>
      <text x="40" y="173" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#f5f5f5">${date || 'N/A'}</text>
      <text x="200" y="155" font-family="Arial, sans-serif" font-size="10" fill="#888888" letter-spacing="1">TIME</text>
      <text x="200" y="173" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#f5f5f5">${time || 'N/A'}</text>
      <text x="360" y="155" font-family="Arial, sans-serif" font-size="10" fill="#888888" letter-spacing="1">SEGMENT</text>
      <text x="360" y="173" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#f5f5f5">${displaySegment}</text>
      <text x="40" y="210" font-family="Arial, sans-serif" font-size="10" fill="#888888" letter-spacing="1">CLIENT</text>
      <text x="40" y="228" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#f5f5f5">${name || 'Guest'}</text>
      <line x1="40" y1="245" x2="460" y2="245" stroke="#C9A96E" stroke-width="0.5" opacity="0.3"/>
      <rect x="160" y="255" width="180" height="42" rx="8" fill="url(#gold)" opacity="0.15" stroke="#C9A96E" stroke-width="0.8"/>
      <text x="250" y="281" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="800" fill="#C9A96E" letter-spacing="4">CONFIRMED</text>
      <text x="250" y="325" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" fill="#555555" letter-spacing="1">Kasha Multimedia • Rooted in Heritage, Built to Broadcast</text>
    </svg>`;
}
