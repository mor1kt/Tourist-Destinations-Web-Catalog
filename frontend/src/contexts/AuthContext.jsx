import { createContext, useCallback, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const storageKey = "user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return;
    try {
      setUser(JSON.parse(raw));
    } catch {
      setUser(null);
    }
  }, []);

  const setAuth = useCallback((payload) => {
    localStorage.setItem(storageKey, JSON.stringify(payload));
    setUser(payload);
  }, []);

  const clearAuth = useCallback(() => {
    localStorage.removeItem(storageKey);
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, setAuth, clearAuth }),
    [user, setAuth, clearAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
