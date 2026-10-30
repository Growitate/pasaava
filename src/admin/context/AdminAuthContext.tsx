import React, { createContext, useContext, useState, useEffect } from 'react';

const ADMIN_PASSWORD = 'PaSSava ###9900';
const SESSION_KEY = 'pasaava_admin_token';
const RATE_LIMIT_KEY = 'pasaava_admin_login_attempts';
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

interface LoginAttemptInfo {
  count: number;
  lockedUntil: number | null;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => { success: boolean; error?: string; remainingAttempts?: number };
  logout: () => void;
  lockoutSecondsRemaining: number;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const token = localStorage.getItem(SESSION_KEY);
      if (!token) return false;
      const parsed = JSON.parse(token);
      if (Date.now() > parsed.expiresAt) {
        localStorage.removeItem(SESSION_KEY);
        return false;
      }
      return true;
    } catch {
      return false;
    }
  });

  const [lockoutSecondsRemaining, setLockoutSecondsRemaining] = useState<number>(0);

  const getAttemptInfo = (): LoginAttemptInfo => {
    try {
      const raw = localStorage.getItem(RATE_LIMIT_KEY);
      if (!raw) return { count: 0, lockedUntil: null };
      return JSON.parse(raw);
    } catch {
      return { count: 0, lockedUntil: null };
    }
  };

  const checkLockout = () => {
    const info = getAttemptInfo();
    if (info.lockedUntil && info.lockedUntil > Date.now()) {
      setLockoutSecondsRemaining(Math.ceil((info.lockedUntil - Date.now()) / 1000));
      return true;
    }
    setLockoutSecondsRemaining(0);
    return false;
  };

  useEffect(() => {
    checkLockout();
    const interval = setInterval(() => {
      checkLockout();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const login = (password: string) => {
    const info = getAttemptInfo();

    // Check if locked
    if (info.lockedUntil && info.lockedUntil > Date.now()) {
      const seconds = Math.ceil((info.lockedUntil - Date.now()) / 1000);
      return {
        success: false,
        error: `Too many failed attempts. Security lockout active for ${seconds}s.`
      };
    }

    if (password === ADMIN_PASSWORD) {
      // Clear rate limit
      localStorage.removeItem(RATE_LIMIT_KEY);
      const session = {
        authenticated: true,
        expiresAt: Date.now() + SESSION_DURATION_MS
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setIsAuthenticated(true);
      return { success: true };
    } else {
      // Failed attempt
      const newCount = (info.count || 0) + 1;
      let lockedUntil: number | null = null;
      if (newCount >= MAX_ATTEMPTS) {
        lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
      }
      const updatedInfo: LoginAttemptInfo = {
        count: newCount,
        lockedUntil
      };
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(updatedInfo));
      checkLockout();

      const remaining = Math.max(0, MAX_ATTEMPTS - newCount);
      return {
        success: false,
        error:
          newCount >= MAX_ATTEMPTS
            ? 'Account locked for 15 minutes due to 5 consecutive failed attempts.'
            : `Incorrect password. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`,
        remainingAttempts: remaining
      };
    }
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        lockoutSecondsRemaining
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
