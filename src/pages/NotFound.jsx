import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="section flex items-center justify-center" style={{ minHeight: '60vh' }}>
      <div className="text-center">
        <p className="font-[var(--font-display)] font-bold text-[var(--gold)]" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 1, opacity: 0.3 }}>404</p>
        <h1 className="font-[var(--font-display)] font-bold text-white text-xl sm:text-2xl mt-4 mb-3">Page Not Found</h1>
        <p className="text-sm mb-8 mx-auto" style={{ color: 'var(--gray-500)', maxWidth: '360px' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="btn-primary !py-2.5 !px-5 flex items-center gap-2">
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <button onClick={() => window.history.back()} className="btn-outline !py-2.5 !px-5 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
