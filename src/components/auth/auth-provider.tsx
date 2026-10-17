"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { getBrowserStorage } from "@/components/favorites/favorites-store";
import { createAuthStore, selectCurrentAccount, type Account, type AuthStore } from "./auth-store";

interface AuthContextValue {
  readonly account: Account | null;
  readonly hydrated: boolean;
  readonly register: AuthStore["register"];
  readonly login: AuthStore["login"];
  readonly logout: AuthStore["logout"];
}

const AuthContext = createContext<AuthContextValue | null>(null);

const subscribeToNothing = () => () => {};

export function AuthProvider({ children, store: providedStore }: { children: ReactNode; store?: AuthStore }) {
  const [store] = useState(() => providedStore ?? createAuthStore(getBrowserStorage()));
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const hydrated = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      account: selectCurrentAccount(snapshot),
      hydrated,
      register: store.register,
      login: store.login,
      logout: store.logout,
    }),
    [snapshot, hydrated, store],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
