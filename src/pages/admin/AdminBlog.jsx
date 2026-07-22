import { useState, useEffect, useMemo } from 'react';
import { Plus, Pencil, Trash2, FileText, User, Tag, Search, LayoutGrid, List, ToggleLeft, ToggleRight, Copy, Calendar } from 'lucide-react';
import { getAll, create, update, remove } from '../../services/firestore';
import { useLanguage } from '../../contexts/LanguageContext';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import ImageUploader from '../../components/ui/ImageUploader';
import LanguageToggle from '../../components/admin/LanguageToggle';
import toast from 'react-hot-toast';

export default function AdminBlog() {
  const { t, lang } = useLanguage();
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formLang, setFormLang] = useState('en');
  const [form, setForm] = useState({ title: { en: '', am: '' }, description: { en: '', am: '' }, content: { en: '', am: '' }, imageUrl: '', author: '', status: 'published' });
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [confirmDel, setConfirmDel] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => getAll('blog').then(setItems).catch(() => {});
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (filter === 'published' && item.status !== 'published') return false;
      if (filter === 'draft' && item.status !== 'draft') return false;
      if (search) {
        const s = search.toLowerCase();
        const title = (item.title?.en || '').toLowerCase() + (item.title?.am || '').toLowerCase();
        return title.includes(s) || (item.author || '').toLowerCase().includes(s);
      }
      return true;
    });
  }, [items, search, filter]);

  const counts = { all: items.length, published: items.filter((i) => i.status === 'published').length, draft: items.filter((i) => i.status === 'draft').length };

  const openNew = () => { setEditing(null); setForm({ title: { en: '', am: '' }, description: { en: '', am: '' }, content: { en: '', am: '' }, imageUrl: '', author: '', status: 'published' }); setFormLang('en'); setOpen(true); };
  const openEdit = (item) => { setEditing(item); setForm({ ...item, title: item.title || { en: '', am: '' }, description: item.description || { en: '', am: '' }, content: item.content || { en: '', am: '' } }); setFormLang('en'); setOpen(true); };

  const save = async () => {
    setSaving(true);
    try {
      if (editing) { await update('blog', editing.id, form); toast.success('Updated!'); }
      else { await create('blog', form); toast.success('Created!'); }
      setOpen(false); load();
    } catch { toast.error('Failed'); }
    setSaving(false);
  };

  const del = async (id) => { await remove('blog', id); toast.success('Deleted!'); load(); };

  const toggleStatus = async (item) => {
    const newStatus = item.status === 'published' ? 'draft' : 'published';
    await update('blog', item.id, { status: newStatus });
    setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, status: newStatus } : i));
    toast.success(`Marked as ${newStatus}`);
  };

  const duplicate = async (item) => {
    const { id, createdAt, updatedAt, ...rest } = item;
    await create('blog', { ...rest, title: { ...rest.title, en: (rest.title?.en || '') + ' (copy)' } });
    toast.success('Duplicated!');
    load();
  };

  const formatDate = (ts) => {
    if (!ts?.seconds) return '';
    const d = new Date(ts.seconds * 1000);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="admin-page-enter">
      <div className="flex items-center justify-between" style={{ marginBottom: 'clamp(20px, 3vw, 28px)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.15)' }}>
            <FileText className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h1 className="font-[var(--font-display)] font-bold text-white" style={{ fontSize: 'clamp(18px, 2.5vw, 24px)' }}>{t('blogAdmin')}</h1>
            <p className="text-xs" style={{ color: 'var(--gray-500)' }}>{counts.published} published · {counts.draft} drafts</p>
          </div>
        </div>
        <button onClick={openNew} className="btn-primary !py-2.5 !px-4 !text-xs sm:!text-sm"><Plus className="w-4 h-4" /> <span className="hidden sm:inline">{t('addNew')}</span></button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="relative flex-1" style={{ maxWidth: '320px' }}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--gray-500)', zIndex: 1 }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts..." className="admin-input w-full !pl-9" />
        </div>
        <div className="flex items-center gap-1.5">
          {[{ key: 'all', label: `All (${counts.all})` }, { key: 'published', label: `Published (${counts.published})` }, { key: 'draft', label: `Drafts (${counts.draft})` }].map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all" style={filter === f.key ? { background: 'rgba(96,165,250,0.12)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.2)' } : { background: 'rgba(255,255,255,0.03)', color: 'var(--gray-500)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <button onClick={() => setViewMode('list')} className="p-1.5 rounded-lg transition-colors" style={{ background: viewMode === 'list' ? 'rgba(96,165,250,0.1)' : 'transparent', color: viewMode === 'list' ? '#60a5fa' : 'var(--gray-500)' }}><List className="w-4 h-4" /></button>
          <button onClick={() => setViewMode('grid')} className="p-1.5 rounded-lg transition-colors" style={{ background: viewMode === 'grid' ? 'rgba(96,165,250,0.1)' : 'transparent', color: viewMode === 'grid' ? '#60a5fa' : 'var(--gray-500)' }}><LayoutGrid className="w-4 h-4" /></button>
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-2">
          {filtered.map((item, i) => (
            <div key={item.id} className="admin-list-item group" style={{ animationDelay: `${i * 0.03}s`, animation: 'fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards', opacity: 0 }}>
              {item.imageUrl ? (
                <img src={item.imageUrl} alt="" className="w-10 h-10 rounded-xl object-cover shrink-0" />
              ) : (
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.12)' }}>
                  <FileText className="w-4 h-4 text-blue-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate" style={{ color: 'var(--white)' }}>{item.title?.[lang] || item.title?.en || ''}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  {item.author && <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--gray-500)' }}><User className="w-3 h-3" /> {item.author}</span>}
                  {item.createdAt?.seconds && <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--gray-700)' }}><Calendar className="w-3 h-3" /> {formatDate(item.createdAt)}</span>}
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
            <div key={item.id} className="admin-glass overflow-hidden group" style={{ animation: `fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s forwards`, opacity: 0 }}>
              {item.imageUrl && <img src={item.imageUrl} alt="" className="w-full h-40 object-cover" />}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`admin-badge ${item.status === 'published' ? 'admin-badge-green' : 'admin-badge-amber'}`}>{item.status}</span>
                  <button onClick={() => toggleStatus(item)}>
                    {item.status === 'published' ? <ToggleRight className="w-5 h-5 text-green-400" /> : <ToggleLeft className="w-5 h-5 text-[var(--gray-700)]" />}
                  </button>
                </div>
                <h3 className="font-semibold text-sm mb-1 line-clamp-2" style={{ color: 'var(--white)' }}>{item.title?.[lang] || item.title?.en || ''}</h3>
                <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--gray-500)' }}>{item.description?.[lang] || item.description?.en || ''}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: 'var(--gray-700)' }}>{item.author || 'Unknown'}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(item)} className="admin-action-btn primary"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => duplicate(item)} className="admin-action-btn"><Copy className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setConfirmDel(item)} className="admin-action-btn danger"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="admin-empty">
          <div className="admin-empty-icon"><FileText className="w-7 h-7" /></div>
          <p className="admin-empty-title">{search || filter !== 'all' ? 'No matching posts' : 'No posts yet'}</p>
          <p className="admin-empty-desc">{search || filter !== 'all' ? 'Try adjusting your filters.' : 'Write your first blog post to share with clients.'}</p>
        </div>
      )}

      <ConfirmDialog open={!!confirmDel} onClose={() => setConfirmDel(null)} onConfirm={() => del(confirmDel?.id)} title="Delete Post?" message={`Are you sure you want to delete "${confirmDel?.title?.[lang] || confirmDel?.title?.en || ''}"? This cannot be undone.`} danger />

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? t('edit') : t('addNew')}>
        <div className="space-y-4">
          <LanguageToggle value={formLang} onChange={setFormLang} />
          <div><label className="admin-label">{t('title')}</label><input value={form.title?.[formLang] || ''} onChange={(e) => setForm({ ...form, title: { ...form.title, [formLang]: e.target.value } })} className="admin-input" autoFocus /></div>
          <div><label className="admin-label">{t('description')}</label><textarea value={form.description?.[formLang] || ''} onChange={(e) => setForm({ ...form, description: { ...form.description, [formLang]: e.target.value } })} rows={2} className="admin-input resize-none" /></div>
          <div><label className="admin-label">{t('content')}</label><textarea value={form.content?.[formLang] || ''} onChange={(e) => setForm({ ...form, content: { ...form.content, [formLang]: e.target.value } })} rows={6} className="admin-input resize-none" style={{ fontFamily: 'monospace' }} /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="admin-label">{t('author')}</label><input value={form.author || ''} onChange={(e) => setForm({ ...form, author: e.target.value })} className="admin-input" /></div>
            <div><label className="admin-label">{t('status')}</label><select value={form.status || 'published'} onChange={(e) => setForm({ ...form, status: e.target.value })} className="admin-input"><option value="published">{t('published')}</option><option value="draft">{t('draft')}</option></select></div>
          </div>
          <div><label className="admin-label">{t('uploadImage')}</label><ImageUploader value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} path="blog" /></div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving} className="flex-1 btn-primary justify-center !py-2.5">{saving ? 'Saving...' : t('saveChanges')}</button>
            <button onClick={() => setOpen(false)} className="btn-outline !py-2.5">{t('cancel')}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
