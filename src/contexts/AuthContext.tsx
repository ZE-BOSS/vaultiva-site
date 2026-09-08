import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { authApi, usersApi, configureApi, ApiError, type User } from '../api';

const TOKEN_KEY = 'vaultiva.token';
const USER_KEY = 'vaultiva.user';

interface AuthContextType {
  user: User | null;
  token: string | null;
  /** True until the persisted session has been read back. */
  initialising: boolean;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (contact: string) => Promise<{ contact: string; delivered: boolean }>;
  completeProfile: (contact: string, data: Record<string, unknown>) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

/**
 * Real authentication against the Vaultiva backend.
 *
 * This previously simulated a network call and accepted a single hard-coded
 * demo@vaultivas.com / password pair, storing a fabricated user in localStorage.
 * It now mirrors the mobile AuthProvider so both clients behave identically.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [initialising, setInitialising] = useState(true);

  // Requests read the token synchronously, so state alone would be a render behind.
  const tokenRef = useRef<string | null>(null);

  const clearSession = useCallback(() => {
    tokenRef.current = null;
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }, []);

  useEffect(() => {
    configureApi(
      () => tokenRef.current,
      () => clearSession(),
    );
  }, [clearSession]);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem(TOKEN_KEY);
      const savedUser = localStorage.getItem(USER_KEY);
      if (savedToken) {
        tokenRef.current = savedToken;
        setToken(savedToken);
        if (savedUser) setUser(JSON.parse(savedUser) as User);
      }
    } catch {
      clearSession();
    } finally {
      setInitialising(false);
    }
  }, [clearSession]);

  const persist = useCallback((nextToken: string, nextUser: User) => {
    tokenRef.current = nextToken;
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem(TOKEN_KEY, nextToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
  }, []);

  const login = useCallback(
    async (identifier: string, password: string) => {
      const res = await authApi.login(identifier, password);
      persist(res.access_token, res.user);
    },
    [persist],
  );

  /**
   * Step one of signup. Returns the contact the code was addressed to, and
   * whether it was actually delivered — a provider failure still returns 201,
   * because the code is stored and can be resent.
   */
  const register = useCallback(async (contact: string) => {
    const trimmed = contact.trim();
    const res = await authApi.register(
      trimmed.includes('@') ? { email: trimmed } : { phone: trimmed },
    );
    return { contact: res.contact, delivered: res.delivered !== false };
  }, []);

  const completeProfile = useCallback(
    async (contact: string, data: Record<string, unknown>) => {
      const res = await authApi.completeProfile(contact, data);
      persist(res.access_token, res.user);
    },
    [persist],
  );

  const refreshUser = useCallback(async () => {
    if (!tokenRef.current) return;
    try {
      const fresh = await usersApi.profile();
      setUser(fresh);
      localStorage.setItem(USER_KEY, JSON.stringify(fresh));
    } catch (err) {
      if (!(err instanceof ApiError && err.isAuthError)) throw err;
    }
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      token,
      initialising,
      isAuthenticated: Boolean(token),
      login,
      register,
      completeProfile,
      logout: clearSession,
      refreshUser,
    }),
    [user, token, initialising, login, register, completeProfile, clearSession, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
