import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, CheckCircle2, XCircle, Eye, Search, CalendarDays, Mail, FileText } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getAll, update } from '../../services/firestore';

export default function AdminBookings() {
  const { t } = useLanguage();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const load = async () => {
    try {
      const data = await getAll('bookings');
      setBookings(data.sort((a, b) => {
        const ta = a.createdAt?.seconds || 0;
        const tb = b.createdAt?.seconds || 0;
        return tb - ta;
      }));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await update('bookings', id, { status });
      setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
      if (selected?.id === id) setSelected((prev) => ({ ...prev, status }));
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = bookings.filter((b) => {
    if (filter === 'confirmed' && b.status !== 'confirmed') return false;
    if (filter === 'cancelled' && b.status !== 'cancelled') return false;
    if (filter === 'completed' && b.status !== 'completed') return false;
    if (search) {
      const s = search.toLowerCase();
      return (b.name || '').toLowerCase().includes(s) || (b.service || '').toLowerCase().includes(s) || (b.date || '').includes(s);
    }
    return true;
  });

  const statusBadge = (s) => {
    if (s === 'confirmed') return 'admin-badge admin-badge-green';
    if (s === 'completed') return 'admin-badge admin-badge-blue';
    return 'admin-badge admin-badge-red';
  };

  const counts = {
    all: bookings.length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  };

  return (
    <div className="admin-page-enter">
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 'clamp(20px, 3vw, 28px)' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{
              background: 'rgba(167,139,250,0.1)',
              border: '1px solid rgba(167,139,250,0.15)',
              boxShadow: '0 0 24px rgba(167,139,250,0.06)',
            }}
          >
            <Calendar className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1
              className="font-[var(--font-display)] font-bold text-white"
              style={{ fontSize: 'clamp(18px, 2.5vw, 24px)' }}
            >
              {t('bookings')}
            </h1>
            <p className="text-xs mt-0.5" style={{ color: 'var(--gray-500)' }}>
              {bookings.length} total bookings
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: 'clamp(20px, 3vw, 28px)' }}>
        <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: '14px' }}>
          {[
            { key: 'all', label: `All (${counts.all})` },
            { key: 'confirmed', label: `Confirmed (${counts.confirmed})` },
            { key: 'completed', label: `Completed (${counts.completed})` },
            { key: 'cancelled', label: `Cancelled (${counts.cancelled})` },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
              style={filter === f.key
                ? { background: 'rgba(201,169,110,0.12)', color: 'var(--gold)', border: '1px solid rgba(201,169,110,0.2)' }
                : { background: 'rgba(255,255,255,0.03)', color: 'var(--gray-500)', border: '1px solid rgba(255,255,255,0.05)' }
              }
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative" style={{ maxWidth: '300px' }}>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--gray-500)', zIndex: 1 }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bookings..."
            className="admin-input w-full"
            style={{ paddingLeft: '38px' }}
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Table / Cards */}
        <div className="lg:col-span-2">
          <div className="admin-glass overflow-hidden">
            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Service</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                    <th style={{ width: '100px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-12" style={{ color: 'var(--gray-500)' }}>
                        Loading bookings...
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-12" style={{ color: 'var(--gray-500)' }}>
                        No bookings found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((b) => (
                      <tr
                        key={b.id}
                        onClick={() => setSelected(b)}
                        className={`transition-all duration-200 ${
                          selected?.id === b.id
                            ? 'bg-[rgba(201,169,110,0.04)]'
                            : ''
                        }`}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200"
                              style={{ background: 'rgba(201,169,110,0.08)' }}
                            >
                              <User className="w-3.5 h-3.5 text-[var(--gold)]" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">{b.name}</p>
                              <p className="text-xs" style={{ color: 'var(--gray-500)' }}>{b.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-sm font-medium" style={{ color: 'var(--gray-300)' }}>
                          {b.service}
                        </td>
                        <td>
                          <p className="text-sm">{b.date}</p>
                          <p className="text-xs" style={{ color: 'var(--gray-500)' }}>{b.time}</p>
                        </td>
                        <td>
                          <span className={statusBadge(b.status)}>{b.status}</span>
                        </td>
                        <td>
                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => setSelected(b)}
                              className="admin-action-btn"
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {b.status === 'confirmed' && (
                              <>
                                <button
                                  onClick={() => updateStatus(b.id, 'completed')}
                                  className="admin-action-btn success"
                                  title="Mark completed"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => updateStatus(b.id, 'cancelled')}
                                  className="admin-action-btn danger"
                                  title="Cancel booking"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile card list */}
            <div className="sm:hidden">
              {loading ? (
                <div className="text-center py-12" style={{ color: 'var(--gray-500)' }}>
                  Loading bookings...
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-12" style={{ color: 'var(--gray-500)' }}>
                  No bookings found.
                </div>
              ) : (
                <div className="divide-y divide-[rgba(255,255,255,0.04)]">
                  {filtered.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setSelected(b)}
                      className="w-full text-left p-4 transition-all duration-200 hover:bg-[rgba(201,169,110,0.03)]"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: 'rgba(201,169,110,0.08)' }}
                          >
                            <User className="w-3 h-3 text-[var(--gold)]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{b.name}</p>
                            <p className="text-xs" style={{ color: 'var(--gray-500)' }}>{b.phone}</p>
                          </div>
                        </div>
                        <span className={statusBadge(b.status)}>{b.status}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs" style={{ color: 'var(--gray-500)' }}>
                        <span>{b.service}</span>
                        <span>{b.date} {b.time}</span>
                      </div>
                      {b.status === 'confirmed' && (
                        <div className="flex gap-2 mt-2.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => updateStatus(b.id, 'completed')}
                            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium admin-badge admin-badge-green hover:brightness-110 transition-all"
                          >
                            <CheckCircle2 className="w-3 h-3" /> Complete
                          </button>
                          <button
                            onClick={() => updateStatus(b.id, 'cancelled')}
                            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium admin-badge admin-badge-red hover:brightness-110 transition-all"
                          >
                            <XCircle className="w-3 h-3" /> Cancel
                          </button>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          {selected ? (
            <div
              className="admin-glass p-5 sm:p-6"
              style={{ position: 'sticky', top: '80px', animation: 'adminPageIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-[var(--font-display)] font-semibold text-sm">Booking Details</h2>
                <button
                  onClick={() => setSelected(null)}
                  className="text-xs px-2.5 py-1 rounded-lg hover:bg-white/5 transition-colors"
                  style={{ color: 'var(--gray-500)' }}
                >
                  Close
                </button>
              </div>

              {selected.confirmationImage && (
                <div
                  className="rounded-xl overflow-hidden mb-5 border"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <img src={selected.confirmationImage} alt="Booking" className="w-full block" />
                </div>
              )}

              <div className="space-y-3.5">
                {/* Client Card */}
                <div
                  className="p-3.5 rounded-xl transition-all duration-200 hover:translate-x-1"
                  style={{
                    background: 'rgba(201,169,110,0.04)',
                    border: '1px solid rgba(201,169,110,0.08)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <User className="w-3.5 h-3.5 text-[var(--gold)]" />
                    <span className="text-xs uppercase tracking-wider font-medium" style={{ color: 'var(--gold)' }}>
                      Client
                    </span>
                  </div>
                  <p className="text-sm font-semibold">{selected.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--gray-500)' }}>
                    {selected.phone}
                  </p>
                  {selected.email && (
                    <p className="text-xs" style={{ color: 'var(--gray-500)' }}>
                      {selected.email}
                    </p>
                  )}
                </div>

                {/* Schedule Card */}
                <div
                  className="p-3.5 rounded-xl transition-all duration-200 hover:translate-x-1"
                  style={{
                    background: 'rgba(96,165,250,0.04)',
                    border: '1px solid rgba(96,165,250,0.08)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-xs uppercase tracking-wider font-medium text-blue-400">
                      Schedule
                    </span>
                  </div>
                  <p className="text-sm font-semibold">{selected.service}</p>
                  <div className="flex gap-4 mt-1">
                    <p className="text-xs" style={{ color: 'var(--gray-500)' }}>{selected.date}</p>
                    <p className="text-xs" style={{ color: 'var(--gray-500)' }}>{selected.time}</p>
                  </div>
                  <p className="text-xs mt-1" style={{ color: 'var(--gray-500)' }}>
                    Barber: {selected.barber || 'Any Available'}
                  </p>
                </div>

                {/* Notes */}
                {selected.notes && (
                  <div
                    className="p-3.5 rounded-xl transition-all duration-200 hover:translate-x-1"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <FileText className="w-3.5 h-3.5" style={{ color: 'var(--gray-500)' }} />
                      <span className="text-xs uppercase tracking-wider font-medium" style={{ color: 'var(--gray-500)' }}>
                        Notes
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--gray-300)' }}>{selected.notes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2.5 pt-2">
                  {selected.status === 'confirmed' ? (
                    <>
                      <button
                        onClick={() => updateStatus(selected.id, 'completed')}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold admin-badge admin-badge-green hover:brightness-110 transition-all duration-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                      </button>
                      <button
                        onClick={() => updateStatus(selected.id, 'cancelled')}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold admin-badge admin-badge-red hover:brightness-110 transition-all duration-200"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => updateStatus(selected.id, 'confirmed')}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold admin-badge admin-badge-green hover:brightness-110 transition-all duration-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Re-confirm
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div
              className="admin-glass flex flex-col items-center justify-center py-16"
              style={{ position: 'sticky', top: '80px' }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
                style={{
                  background: 'rgba(167,139,250,0.08)',
                  border: '1px solid rgba(167,139,250,0.12)',
                }}
              >
                <Calendar className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--gray-500)' }}>
                Select a booking
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--gray-700)' }}>
                Click a row to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
