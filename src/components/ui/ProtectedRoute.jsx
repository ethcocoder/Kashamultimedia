import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="w-8 h-8 text-[var(--gold)] animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-gray-400">You do not have permission to view this page.</p>
      </div>
    );
  }

  return children;
}
