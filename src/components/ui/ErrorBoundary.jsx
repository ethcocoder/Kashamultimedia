import { Component } from 'react';
import { RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #060b18 0%, #0B1120 40%, #0a0f1c 100%)' }}>
          <div className="text-center px-6" style={{ maxWidth: '420px' }}>
            <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.15)' }}>
              <span className="text-2xl">!</span>
            </div>
            <h1 className="font-[var(--font-display)] font-bold text-white text-xl mb-3">Something went wrong</h1>
            <p className="text-sm mb-6" style={{ color: 'var(--gray-500)' }}>
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => window.location.reload()} className="btn-primary !py-2.5 !px-5 flex items-center gap-2">
                <RefreshCw className="w-4 h-4" /> Reload Page
              </button>
              <a href="/" className="btn-outline !py-2.5 !px-5 flex items-center gap-2">
                <Home className="w-4 h-4" /> Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
