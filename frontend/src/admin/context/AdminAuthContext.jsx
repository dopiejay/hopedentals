import { createContext, useContext, useState, useCallback } from 'react';
import { login as apiLogin } from '../api';

const AdminAuthContext = createContext(null);

const STORAGE_KEY = 'hope_admin_auth';

function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AdminAuthProvider({ children }) {
  const [auth, setAuth] = useState(loadStored);

  const login = useCallback(async (email, password) => {
    const result = await apiLogin(email, password);
    const next = { token: result.token, email: result.email };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setAuth(next);
    return next;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setAuth(null);
  }, []);

  return (
    <AdminAuthContext.Provider value={{ auth, login, logout, isAuthenticated: !!auth }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
