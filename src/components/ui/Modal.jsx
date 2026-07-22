import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm anim-fade"
        onClick={(e) => e.target === overlayRef.current && onClose()}
      />
      <div
        className="rounded-2xl w-full mx-4 anim-scale relative z-10 max-h-[90vh] overflow-y-auto"
        style={{
          maxWidth: 'min(100%, 520px)',
          background: 'rgba(17, 17, 17, 0.95)',
          backdropFilter: 'blur(24px)',
          border: '1px solid var(--white-faint)',
        }}
      >
        <div className="flex items-center justify-between" style={{ padding: 'clamp(16px, 2.5vw, 24px)', borderBottom: '1px solid var(--white-faint)' }}>
          <h3 className="font-[var(--font-display)] font-semibold text-white" style={{ fontSize: 'clamp(14px, 1.8vw, 18px)' }}>{title}</h3>
          <button
            onClick={onClose}
            className="p-1 text-white/40 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div style={{ padding: 'clamp(16px, 2.5vw, 24px)' }}>{children}</div>
      </div>
    </div>
  );
}
