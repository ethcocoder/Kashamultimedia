import { useState, useEffect, useMemo } from 'react';
import { Plus, Pencil, Trash2, Scissors, Clock, DollarSign, Tag, Search, LayoutGrid, List, ToggleLeft, ToggleRight, Copy } from 'lucide-react';
import { getAll, create, update, remove } from '../../services/firestore';
import { useLanguage } from '../../contexts/LanguageContext';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import LanguageToggle from '../../components/admin/LanguageToggle';
import toast from 'react-hot-toast';

const iconOptions = ['Scissors', 'Paintbrush', 'Sparkles', 'User', 'Droplets', 'Brush'];

export default function AdminServices() {
  const { t, lang } = useLanguage();
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formLang, setFormLang] = useState('en');
  const [form, setForm] = useState({ name: { en: '', am: '' }, description: { en: '', am: '' }, price: '', duration: '', icon: 'Scissors', status: 'published' });
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [confirmDel, setConfirmDel] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => getAll('services').then(setItems).catch(() => {});
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (filter === 'published' && item.status !== 'published') return false;
      if (filter === 'draft' && item.status !== 'draft') return false;
      if (search) {
        const s = search.toLowerCase();
        const name = (item.name?.en || '').toLowerCase() + (item.name?.am || '').toLowerCase();
        const desc = (item.description?.en || '').toLowerCase() + (item.description?.am || '').toLowerCase();
        return name.includes(s) || desc.includes(s) || (item.price || '').toLowerCase().includes(s);
      }
      return true;
    });
  }, [items, search, filter]);

  const counts = { all: items.length, published: items.filter((i) => i.status === 'published').length, draft: items.filter((i) => i.status === 'draft').length };

  const reset = () => { setForm({ name: { en: '', am: '' }, description: { en: '', am: '' }, price: '', duration: '', icon: 'Scissors', status: 'published' }); };
  const openNew = () => { setEditing(null); reset(); setFormLang('en'); setOpen(true); };
  const openEdit = (item) => { setEditing(item); setForm({ ...item, name: item.name || { en: '', am: '' }, description: item.description || { en: '', am: '' } }); setFormLang('en'); setOpen(true); };

  const save = async () => {
    setSaving(true);
    try {
      if (editing) { await update('services', editing.id, form); toast.success('Updated!'); }
      else { await create('services', form); toast.success('Created!'); }
      setOpen(false); load();
    } catch { toast.error('Failed'); }
    setSaving(false);
  };

  const del = async (id) => { await remove('services', id); toast.success('Deleted!'); load(); };

  const toggleStatus = async (item) => {
    const newStatus = item.status === 'published' ? 'draft' : 'published';
    await update('services', item.id, { status: newStatus });
    setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, status: newStatus } : i));
    toast.success(`Marked as ${newStatus}`);
  };

  const duplicate = async (item) => {
    const { id, createdAt, updatedAt, ...rest } = item;
    await create('services', { ...rest, name: { ...rest.name, en: (rest.name?.en || '') + ' (copy)' } });
    toast.success('Duplicated!');
    load();
  };

  return (
    <div className="admin-page-enter">
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 'clamp(20px, 3vw, 28px)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.15)' }}>
            <Scissors className="w-5 h-5 text-[var(--gold)]" />
          </div>
          <div>
            <h1 className="font-[var(--font-display)] font-bold text-white" style={{ fontSize: 'clamp(18px, 2.5vw, 24px)' }}>{t('services')}</h1>
            <p className="text-xs" style={{ color: 'var(--gray-500)' }}>{counts.published} published · {counts.draft} drafts</p>
          </div>
        </div>
        <button onClick={openNew} className="btn-primary !py-2.5 !px-4 !text-xs sm:!text-sm">
          <Plus className="w-4 h-4" /> <span className="hidden sm:inline">{t('addNew')}</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="relative flex-1" style={{ maxWidth: '320px' }}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--gray-500)', zIndex: 1 }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search services..." className="admin-input w-full !pl-9" />
        </div>
        <div className="flex items-center gap-1.5">
          {[{ key: 'all', label: `All (${counts.all})` }, { key: 'published', label: `Published (${counts.published})` }, { key: 'draft', label: `Drafts (${counts.draft})` }].map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all" style={filter === f.key ? { background: 'rgba(201,169,110,0.12)', color: 'var(--gold)', border: '1px solid rgba(201,169,110,0.2)' } : { background: 'rgba(255,255,255,0.03)', color: 'var(--gray-500)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <button onClick={() => setViewMode('list')} className="p-1.5 rounded-lg transition-colors" style={{ background: viewMode === 'list' ? 'rgba(201,169,110,0.1)' : 'transparent', color: viewMode === 'list' ? 'var(--gold)' : 'var(--gray-500)' }}><List className="w-4 h-4" /></button>
          <button onClick={() => setViewMode('grid')} className="p-1.5 rounded-lg transition-colors" style={{ background: viewMode === 'grid' ? 'rgba(201,169,110,0.1)' : 'transparent', color: viewMode === 'grid' ? 'var(--gold)' : 'var(--gray-500)' }}><LayoutGrid className="w-4 h-4" /></button>
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-2">
          {filtered.map((item, i) => (
            <div key={item.id} className="admin-list-item group" style={{ animationDelay: `${i * 0.03}s`, animation: 'fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards', opacity: 0 }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.12)' }}>
                <Scissors className="w-4 h-4 text-[var(--gold)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate" style={{ color: 'var(--white)' }}>{item.name?.[lang] || item.name?.en || ''}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--gray-500)' }}><DollarSign className="w-3 h-3" /> {item.price}</span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--gray-500)' }}><Clock className="w-3 h-3" /> {item.duration} min</span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => toggleStatus(item)} className="p-1.5 rounded-lg transition-all hover:bg-white/[0.06]" title={`Toggle ${item.status === 'published' ? 'draft' : 'published'}`}>
                  {item.status === 'published' ? <ToggleRight className="w-5 h-5 text-green-400" /> : <ToggleLeft className="w-5 h-5 text-[var(--gray-700)]" />}
                </button>
                <button onClick={() => openEdit(item)} className="admin-action-btn primary"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => duplicate(item)} className="admin-action-btn" title="Duplicate"><Copy className="w-4 h-4" /></button>
                <button onClick={() => setConfirmDel(item)} className="admin-action-btn danger"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((item, i) => (
            <div key={item.id} className="admin-glass p-4 group" style={{ animation: `fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s forwards`, opacity: 0 }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.12)' }}>
                  <Scissors className="w-5 h-5 text-[var(--gold)]" />
                </div>
                <button onClick={() => toggleStatus(item)}>
                  {item.status === 'published' ? <ToggleRight className="w-5 h-5 text-green-400" /> : <ToggleLeft className="w-5 h-5 text-[var(--gray-700)]" />}
                </button>
              </div>
              <h3 className="font-semibold text-sm mb-1 truncate" style={{ color: 'var(--white)' }}>{item.name?.[lang] || item.name?.en || ''}</h3>
              <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--gray-500)' }}>{item.description?.[lang] || item.description?.en || ''}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[var(--gold)]">{item.price}</span>
                  <span className="text-xs" style={{ color: 'var(--gray-500)' }}>{item.duration}m</span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(item)} className="admin-action-btn primary"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => duplicate(item)} className="admin-action-btn"><Copy className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setConfirmDel(item)} className="admin-action-btn danger"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="admin-empty">
          <div className="admin-empty-icon"><Scissors className="w-7 h-7" /></div>
          <p className="admin-empty-title">{search || filter !== 'all' ? 'No matching services' : 'No services yet'}</p>
          <p className="admin-empty-desc">{search || filter !== 'all' ? 'Try adjusting your filters.' : 'Add your first service to get started.'}</p>
        </div>
      )}

      <ConfirmDialog open={!!confirmDel} onClose={() => setConfirmDel(null)} onConfirm={() => del(confirmDel?.id)} title="Delete Service?" message={`Are you sure you want to delete "${confirmDel?.name?.[lang] || confirmDel?.name?.en || ''}"? This cannot be undone.`} danger />

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? t('edit') : t('addNew')}>
        <div className="space-y-4">
          <LanguageToggle value={formLang} onChange={setFormLang} />
          <div><label className="admin-label">Name ({formLang === 'en' ? 'EN' : 'AM'})</label><input value={form.name?.[formLang] || ''} onChange={(e) => setForm({ ...form, name: { ...form.name, [formLang]: e.target.value } })} className="admin-input" autoFocus /></div>
          <div><label className="admin-label">Description</label><textarea value={form.description?.[formLang] || ''} onChange={(e) => setForm({ ...form, description: { ...form.description, [formLang]: e.target.value } })} rows={3} className="admin-input resize-none" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="admin-label">{t('servicePrice')}</label><input value={form.price || ''} onChange={(e) => setForm({ ...form, price: e.target.value })} className="admin-input" placeholder="500 ETB" /></div>
            <div><label className="admin-label">{t('serviceDuration')}</label><input type="number" value={form.duration || ''} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="admin-input" placeholder="30" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="admin-label">{t('serviceIcon')}</label><select value={form.icon || 'Scissors'} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="admin-input">{iconOptions.map((ic) => <option key={ic} value={ic}>{ic}</option>)}</select></div>
            <div><label className="admin-label">{t('status')}</label><select value={form.status || 'published'} onChange={(e) => setForm({ ...form, status: e.target.value })} className="admin-input"><option value="published">{t('published')}</option><option value="draft">{t('draft')}</option></select></div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving} className="flex-1 btn-primary justify-center !py-2.5">{saving ? 'Saving...' : t('saveChanges')}</button>
            <button onClick={() => setOpen(false)} className="btn-outline !py-2.5">{t('cancel')}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
