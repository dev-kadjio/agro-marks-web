"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import {
  createFavoritesStore,
  getBrowserStorage,
  type FavoriteKind,
  type FavoritesSnapshot,
  type FavoritesStore,
} from "./favorites-store";

interface FavoritesContextValue {
  readonly favorites: FavoritesSnapshot;
  readonly hydrated: boolean;
  readonly available: boolean;
  readonly count: number;
  isFavorite(kind: FavoriteKind, id: string): boolean;
  toggle(kind: FavoriteKind, id: string): void;
  clear(): void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const subscribeToNothing = () => () => {};

export function FavoritesProvider({ children, store: providedStore }: { children: ReactNode; store?: FavoritesStore }) {
  const [store] = useState(() => providedStore ?? createFavoritesStore(getBrowserStorage()));
  const favorites = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const hydrated = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      hydrated,
      available: hydrated ? store.available : true,
      count: favorites.product.length + favorites.producer.length,
      isFavorite: (kind, id) => favorites[kind].includes(id),
      toggle: store.toggle,
      clear: store.clear,
    }),
    [favorites, hydrated, store],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}
