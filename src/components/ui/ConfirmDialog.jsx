import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';

export default function ConfirmDialog({ open, onClose, onConfirm, title, message, danger }) {
  return (
    <Modal open={open} onClose={onClose} title="">
      <div className="text-center">
        <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: danger ? 'rgba(239,68,68,0.1)' : 'rgba(201,169,110,0.1)', border: `1px solid ${danger ? 'rgba(239,68,68,0.15)' : 'rgba(201,169,110,0.15)'}` }}>
          <AlertTriangle className="w-5 h-5" style={{ color: danger ? '#f87171' : 'var(--gold)' }} />
        </div>
        <h3 className="font-[var(--font-display)] font-semibold text-white mb-2" style={{ fontSize: '16px' }}>{title}</h3>
        <p className="text-sm mb-6" style={{ color: 'var(--gray-500)' }}>{message}</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 btn-outline !py-2.5">Cancel</button>
          <button onClick={() => { onConfirm(); onClose(); }} className={`flex-1 !py-2.5 rounded-xl text-sm font-semibold transition-all ${danger ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30' : 'btn-primary'}`}>
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}
