import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState({
    primaryColor: '#3B82F6',
    accentColor: '#F59E0B',
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'theme'), (snap) => {
      if (snap.exists()) {
        setTheme(snap.data());
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme.primaryColor) root.style.setProperty('--color-primary', theme.primaryColor);
    if (theme.accentColor) root.style.setProperty('--color-accent', theme.accentColor);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
