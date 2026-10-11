

 
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getCurrentUser, loginUser, logoutUser } from '@/features/auth/api/auth-api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  // true only while the app checks the saved token on first load
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }, []);

//   // Save a session. Used by login and by the OTP verify pages
//   // (register verify-otp, forgot-password verify) once they get a token.
  const setSession = useCallback(({ token: newToken, user: newUser } = {}) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
      setToken(newToken);
    }
    if (newUser) {
      setUser(newUser);
    }
  }, []);

  // Runs once when the site opens: if a token is saved, load the user
  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      if (!localStorage.getItem('token')) {
        setIsLoading(false);
        return;
      }
      try {
        const userData = await getCurrentUser(); // GET /auth/me
        if (!cancelled) setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        if (!cancelled) clearSession(); // invalid or expired token
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, [clearSession]);

  const login = useCallback(
    async (credentials) => {
      const data = await loginUser(credentials);
      setSession(data);
      // if the backend returns only a token, load the user once
      if (data.token && !data.user) {
        setUser(await getCurrentUser());
      }
      return data;
    },
    [setSession],
  );

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      clearSession();
    }
  }, [clearSession]);

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      isAuthenticated: !!token && !!user,
      login,
      logout,
      setSession,
      setUser,
    }),
    [user, token, isLoading, login, logout, setSession],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}

