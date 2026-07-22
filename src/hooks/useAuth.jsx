import { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('viewer'); // 'viewer', 'editor', 'admin'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        // Check custom claims for admin role
        if (u.customUserClaims && u.customUserClaims.admin) {
          setRole('admin');
        } else {
          // Fallback: check Firestore profile if custom claims aren't available yet
          try {
            const userDoc = await getDoc(doc(db, 'users', u.uid));
            if (userDoc.exists() && userDoc.data().role === 'admin') {
              setRole('admin');
            } else {
              setRole('editor'); // Default authenticated role
            }
          } catch (error) {
            console.error('Error fetching user role:', error);
            setRole('editor');
          }
        }
      } else {
        setUser(null);
        setRole('viewer');
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  const isAdmin = () => role === 'admin';

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
