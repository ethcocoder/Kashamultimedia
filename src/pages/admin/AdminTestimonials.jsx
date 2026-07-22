import { useState, useEffect, useMemo } from 'react';
import { Plus, Pencil, Trash2, Star, Quote, Search, ToggleLeft, ToggleRight, Copy } from 'lucide-react';
import { getAll, create, update, remove } from '../../services/firestore';
import { useLanguage } from '../../contexts/LanguageContext';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import LanguageToggle from '../../components/admin/LanguageToggle';
import toast from 'react-hot-toast';

export default function AdminTestimonials() {
  const { t, lang } = useLanguage();
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formLang, setFormLang] = useState('en');
  const [form, setForm] = useState({ clientName: { en: '', am: '' }, clientRole: { en: '', am: '' }, quote: { en: '', am: '' }, rating: 5, status: 'published' });
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [confirmDel, setConfirmDel] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => getAll('testimonials').then(setItems).catch(() => {});
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (filter === 'published' && item.status !== 'published') return false;
      if (filter === 'draft' && item.status !== 'draft') return false;
      if (search) {
        const s = search.toLowerCase();
        const name = (item.clientName?.en || '').toLowerCase() + (item.clientName?.am || '').toLowerCase();
        const quote = (item.quote?.en || '').toLowerCase() + (item.quote?.am || '').toLowerCase();
        return name.includes(s) || quote.includes(s);
      }
      return true;
    });
  }, [items, search, filter]);

  const counts = { all: items.length, published: items.filter((i) => i.status === 'published').length, draft: items.filter((i) => i.status === 'draft').length };

  const openNew = () => { setEditing(null); setForm({ clientName: { en: '', am: '' }, clientRole: { en: '', am: '' }, quote: { en: '', am: '' }, rating: 5, status: 'published' }); setFormLang('en'); setOpen(true); };
  const openEdit = (item) => { setEditing(item); setForm({ ...item, clientName: item.clientName || { en: '', am: '' }, clientRole: item.clientRole || { en: '', am: '' }, quote: item.quote || { en: '', am: '' } }); setFormLang('en'); setOpen(true); };

  const save = async () => {
    setSaving(true);
    try {
      if (editing) { await update('testimonials', editing.id, form); toast.success('Updated!'); }
      else { await create('testimonials', form); toast.success('Created!'); }
      setOpen(false); load();
    } catch { toast.error('Failed'); }
    setSaving(false);
  };

  const del = async (id) => { await remove('testimonials', id); toast.success('Deleted!'); load(); };

  const toggleStatus = async (item) => {
    const newStatus = item.status === 'published' ? 'draft' : 'published';
    await update('testimonials', item.id, { status: newStatus });
    setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, status: newStatus } : i));
    toast.success(`Marked as ${newStatus}`);
  };

  const duplicate = async (item) => {
    const { id, createdAt, updatedAt, ...rest } = item;
    await create('testimonials', { ...rest, clientName: { ...rest.clientName, en: (rest.clientName?.en || '') + ' (copy)' } });
    toast.success('Duplicated!');
    load();
  };

  return (
    <div className="admin-page-enter">
      <div className="flex items-center justify-between" style={{ marginBottom: 'clamp(20px, 3vw, 28px)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.15)' }}>
            <Star className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="font-[var(--font-display)] font-bold text-white" style={{ fontSize: 'clamp(18px, 2.5vw, 24px)' }}>{t('testimonialsAdmin')}</h1>
            <p className="text-xs" style={{ color: 'var(--gray-500)' }}>{counts.published} published · {counts.draft} drafts</p>
          </div>
        </div>
        <button onClick={openNew} className="btn-primary !py-2.5 !px-4 !text-xs sm:!text-sm"><Plus className="w-4 h-4" /> <span className="hidden sm:inline">{t('addNew')}</span></button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="relative flex-1" style={{ maxWidth: '320px' }}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--gray-500)', zIndex: 1 }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search testimonials..." className="admin-input w-full !pl-9" />
        </div>
        <div className="flex items-center gap-1.5">
          {[{ key: 'all', label: `All (${counts.all})` }, { key: 'published', label: `Published (${counts.published})` }, { key: 'draft', label: `Drafts (${counts.draft})` }].map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all" style={filter === f.key ? { background: 'rgba(251,191,36,0.12)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)' } : { background: 'rgba(255,255,255,0.03)', color: 'var(--gray-500)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="admin-glass p-3 text-center">
          <p className="text-lg font-bold text-[var(--gold)]">{counts.all}</p>
          <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--gray-500)' }}>Total</p>
        </div>
        <div className="admin-glass p-3 text-center">
          <p className="text-lg font-bold text-green-400">{counts.published}</p>
          <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--gray-500)' }}>Published</p>
        </div>
        <div className="admin-glass p-3 text-center">
          <p className="text-lg font-bold" style={{ color: 'var(--gray-500)' }}>{counts.draft}</p>
          <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--gray-500)' }}>Drafts</p>
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((item, i) => (
          <div key={item.id} className="admin-list-item group" style={{ animationDelay: `${i * 0.03}s`, animation: 'fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards', opacity: 0 }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.12)' }}>
              <Quote className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate" style={{ color: 'var(--white)' }}>{item.clientName?.[lang] || item.clientName?.en || ''}</p>
              <p className="text-xs truncate mt-0.5" style={{ color: 'var(--gray-500)' }}>{item.quote?.[lang]?.slice(0, 80) || item.quote?.en?.slice(0, 80) || ''}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: item.rating || 5 }).map((_, j) => (
                  <Star key={j} className="w-3 h-3 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <button onClick={() => toggleStatus(item)} className="p-1.5 rounded-lg transition-all hover:bg-white/[0.06]">
                {item.status === 'published' ? <ToggleRight className="w-5 h-5 text-green-400" /> : <ToggleLeft className="w-5 h-5 text-[var(--gray-700)]" />}
              </button>
              <button onClick={() => openEdit(item)} className="admin-action-btn primary"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => duplicate(item)} className="admin-action-btn" title="Duplicate"><Copy className="w-4 h-4" /></button>
              <button onClick={() => setConfirmDel(item)} className="admin-action-btn danger"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="admin-empty">
            <div className="admin-empty-icon"><Star className="w-7 h-7" /></div>
            <p className="admin-empty-title">{search || filter !== 'all' ? 'No matching testimonials' : 'No testimonials yet'}</p>
            <p className="admin-empty-desc">{search || filter !== 'all' ? 'Try adjusting your filters.' : 'Add client reviews to build trust.'}</p>
          </div>
        )}
      </div>

      <ConfirmDialog open={!!confirmDel} onClose={() => setConfirmDel(null)} onConfirm={() => del(confirmDel?.id)} title="Delete Testimonial?" message={`Delete review by "${confirmDel?.clientName?.[lang] || confirmDel?.clientName?.en || ''}"? This cannot be undone.`} danger />

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? t('edit') : t('addNew')}>
        <div className="space-y-4">
          <LanguageToggle value={formLang} onChange={setFormLang} />
          <div><label className="admin-label">{t('clientName')}</label><input value={form.clientName?.[formLang] || ''} onChange={(e) => setForm({ ...form, clientName: { ...form.clientName, [formLang]: e.target.value } })} className="admin-input" autoFocus /></div>
          <div><label className="admin-label">{t('clientRole')}</label><input value={form.clientRole?.[formLang] || ''} onChange={(e) => setForm({ ...form, clientRole: { ...form.clientRole, [formLang]: e.target.value } })} className="admin-input" placeholder="Regular Customer" /></div>
          <div><label className="admin-label">{t('quote')}</label><textarea value={form.quote?.[formLang] || ''} onChange={(e) => setForm({ ...form, quote: { ...form.quote, [formLang]: e.target.value } })} rows={3} className="admin-input resize-none" /></div>
          <div>
            <label className="admin-label">{t('rating')}</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button key={r} type="button" onClick={() => setForm({ ...form, rating: r })} className="p-0.5 transition-transform hover:scale-125">
                    <Star className={`w-6 h-6 ${r <= (form.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-[var(--gray-700)]'}`} />
                  </button>
                ))}
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--gray-500)' }}>{form.rating}/5</span>
            </div>
          </div>
          <div><label className="admin-label">{t('status')}</label><select value={form.status || 'published'} onChange={(e) => setForm({ ...form, status: e.target.value })} className="admin-input"><option value="published">{t('published')}</option><option value="draft">{t('draft')}</option></select></div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving} className="flex-1 btn-primary justify-center !py-2.5">{saving ? 'Saving...' : t('saveChanges')}</button>
            <button onClick={() => setOpen(false)} className="btn-outline !py-2.5">{t('cancel')}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
