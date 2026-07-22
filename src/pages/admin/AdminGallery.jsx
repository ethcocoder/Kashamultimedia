import { useState, useEffect, useMemo } from 'react';
import { Plus, Pencil, Trash2, Image, Search, Eye, ExternalLink } from 'lucide-react';
import { getAll, create, update, remove } from '../../services/firestore';
import { useLanguage } from '../../contexts/LanguageContext';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import ImageUploader from '../../components/ui/ImageUploader';
import LanguageToggle from '../../components/admin/LanguageToggle';
import toast from 'react-hot-toast';

export default function AdminGallery() {
  const { t, lang } = useLanguage();
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formLang, setFormLang] = useState('en');
  const [form, setForm] = useState({ title: { en: '', am: '' }, imageUrl: '', status: 'published' });
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [preview, setPreview] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => getAll('gallery').then(setItems).catch(() => {});
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (filter === 'published' && item.status !== 'published') return false;
      if (filter === 'draft' && item.status !== 'draft') return false;
      if (search) {
        const s = search.toLowerCase();
        const title = (item.title?.en || '').toLowerCase() + (item.title?.am || '').toLowerCase();
        return title.includes(s);
      }
      return true;
    });
  }, [items, search, filter]);

  const counts = { all: items.length, published: items.filter((i) => i.status === 'published').length, draft: items.filter((i) => i.status === 'draft').length };

  const openNew = () => { setEditing(null); setForm({ title: { en: '', am: '' }, imageUrl: '', status: 'published' }); setFormLang('en'); setOpen(true); };
  const openEdit = (item) => { setEditing(item); setForm({ ...item, title: item.title || { en: '', am: '' } }); setFormLang('en'); setOpen(true); };

  const save = async () => {
    setSaving(true);
    try {
      if (editing) { await update('gallery', editing.id, form); toast.success('Updated!'); }
      else { await create('gallery', form); toast.success('Created!'); }
      setOpen(false); load();
    } catch { toast.error('Failed'); }
    setSaving(false);
  };

  const del = async (id) => { await remove('gallery', id); toast.success('Deleted!'); load(); };

  return (
    <div className="admin-page-enter">
      <div className="flex items-center justify-between" style={{ marginBottom: 'clamp(20px, 3vw, 28px)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.15)' }}>
            <Image className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h1 className="font-[var(--font-display)] font-bold text-white" style={{ fontSize: 'clamp(18px, 2.5vw, 24px)' }}>{t('galleryAdmin')}</h1>
            <p className="text-xs" style={{ color: 'var(--gray-500)' }}>{counts.published} published · {counts.draft} drafts</p>
          </div>
        </div>
        <button onClick={openNew} className="btn-primary !py-2.5 !px-4 !text-xs sm:!text-sm"><Plus className="w-4 h-4" /> <span className="hidden sm:inline">{t('addNew')}</span></button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="relative flex-1" style={{ maxWidth: '320px' }}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--gray-500)', zIndex: 1 }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search gallery..." className="admin-input w-full !pl-9" />
        </div>
        <div className="flex items-center gap-1.5">
          {[{ key: 'all', label: `All (${counts.all})` }, { key: 'published', label: `Published (${counts.published})` }, { key: 'draft', label: `Drafts (${counts.draft})` }].map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all" style={filter === f.key ? { background: 'rgba(74,222,128,0.12)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' } : { background: 'rgba(255,255,255,0.03)', color: 'var(--gray-500)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
        {filtered.map((item, i) => (
          <div key={item.id} className="admin-gallery-item group relative" style={{ animation: `fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s forwards`, opacity: 0 }}>
            <img src={item.imageUrl} alt="" className="w-full aspect-square object-cover" />
            <div className="admin-gallery-overlay">
              <div className="flex items-center gap-1.5 w-full justify-end">
                <button onClick={(e) => { e.stopPropagation(); setPreview(item); }} className="admin-action-btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }} title="Preview"><Eye className="w-4 h-4" /></button>
                <button onClick={(e) => { e.stopPropagation(); openEdit(item); }} className="admin-action-btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}><Pencil className="w-4 h-4" /></button>
                <button onClick={(e) => { e.stopPropagation(); setConfirmDel(item); }} className="admin-action-btn" style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171' }}><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            {(item.title?.[lang] || item.title?.en) && (
              <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-xs font-medium text-white truncate">{item.title?.[lang] || item.title?.en}</p>
              </div>
            )}
            {item.status === 'draft' && (
              <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">Draft</div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full admin-empty">
            <div className="admin-empty-icon"><Image className="w-7 h-7" /></div>
            <p className="admin-empty-title">{search || filter !== 'all' ? 'No matching images' : 'No images yet'}</p>
            <p className="admin-empty-desc">{search || filter !== 'all' ? 'Try adjusting your filters.' : 'Upload your first gallery image.'}</p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {preview && (
        <Modal open={!!preview} onClose={() => setPreview(null)} title={preview.title?.[lang] || preview.title?.en || 'Image Preview'}>
          <div>
            <img src={preview.imageUrl} alt="" className="w-full rounded-xl mb-4" />
            <div className="flex gap-2">
              <a href={preview.imageUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 btn-outline !py-2.5 text-sm"><ExternalLink className="w-4 h-4" /> Open Full Size</a>
              <button onClick={() => { setPreview(null); openEdit(preview); }} className="flex-1 flex items-center justify-center gap-2 btn-primary !py-2.5 text-sm"><Pencil className="w-4 h-4" /> Edit</button>
            </div>
          </div>
        </Modal>
      )}

      <ConfirmDialog open={!!confirmDel} onClose={() => setConfirmDel(null)} onConfirm={() => del(confirmDel?.id)} title="Delete Image?" message="Are you sure you want to delete this image? This cannot be undone." danger />

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? t('edit') : t('addNew')}>
        <div className="space-y-4">
          <LanguageToggle value={formLang} onChange={setFormLang} />
          <div><label className="admin-label">{t('title')} ({formLang === 'en' ? 'EN' : 'AM'})</label><input value={form.title?.[formLang] || ''} onChange={(e) => setForm({ ...form, title: { ...form.title, [formLang]: e.target.value } })} className="admin-input" autoFocus /></div>
          <div><label className="admin-label">{t('uploadImage')}</label><ImageUploader value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} path="gallery" /></div>
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
