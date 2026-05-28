import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { router } from "expo-router";
import { getAuthToken, setAuthToken, clearAuthToken } from "./secure-store";

export interface CurrentUser {
  phone: string;
  entityType: "user" | "store";
}

export function decodeToken(token: string): CurrentUser | null {
  try {
    const raw = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(raw));
    if (Date.now() / 1000 > (payload.exp ?? 0)) return null;
    return {
      phone: payload.sub,
      entityType: (payload.entity_type as "user" | "store") ?? "user",
    };
  } catch {
    return null;
  }
}

interface AuthContextValue {
  user: CurrentUser | null;
  ready: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  openLogin: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getAuthToken().then((token) => {
      if (token) setUser(decodeToken(token));
      setReady(true);
    });
  }, []);

  const login = useCallback(async (token: string) => {
    await setAuthToken(token);
    setUser(decodeToken(token));
  }, []);

  const logout = useCallback(async () => {
    await clearAuthToken();
    setUser(null);
    router.replace("/(auth)/phone");
  }, []);

  const openLogin = useCallback(() => {
    router.push("/(auth)/phone");
  }, []);

  return (
    <AuthContext.Provider value={{ user, ready, login, logout, openLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
