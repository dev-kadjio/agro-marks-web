import { z } from "zod";

export type FavoriteKind = "product" | "producer";

export interface FavoritesSnapshot {
  readonly product: readonly string[];
  readonly producer: readonly string[];
}

export interface FavoritesStore {
  subscribe(listener: () => void): () => void;
  getSnapshot(): FavoritesSnapshot;
  getServerSnapshot(): FavoritesSnapshot;
  toggle(kind: FavoriteKind, id: string): void;
  clear(): void;
  readonly available: boolean;
}

export const FAVORITES_STORAGE_KEY = "agro-marks:favorites:v1";

export const EMPTY_FAVORITES: FavoritesSnapshot = Object.freeze({ product: [], producer: [] });

const idList = z.array(z.string().min(1).max(120)).max(500).catch([]);

const snapshotSchema = z
  .object({ product: idList, producer: idList, farmer: idList })
  .catch({ product: [], producer: [], farmer: [] });

function migrateLegacyProducerId(id: string): string {
  return id.replace(/^farmer-/, "producer-");
}

function parseSnapshot(raw: string | null): FavoritesSnapshot {
  if (!raw) {
    return EMPTY_FAVORITES;
  }
  try {
    const parsed = snapshotSchema.parse(JSON.parse(raw));
    return {
      product: [...new Set(parsed.product)],
      producer: [...new Set([...parsed.producer, ...parsed.farmer.map(migrateLegacyProducerId)])],
    };
  } catch {
    return EMPTY_FAVORITES;
  }
}

export function getBrowserStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const probe = "__agro-marks-probe__";
    window.localStorage.setItem(probe, probe);
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch {
    return null;
  }
}

export function createFavoritesStore(storage: Storage | null, key: string = FAVORITES_STORAGE_KEY): FavoritesStore {
  const listeners = new Set<() => void>();
  let cache: { raw: string | null; snapshot: FavoritesSnapshot } = { raw: null, snapshot: EMPTY_FAVORITES };

  function read(): string | null {
    try {
      return storage?.getItem(key) ?? null;
    } catch {
      return null;
    }
  }

  function getSnapshot(): FavoritesSnapshot {
    const raw = read();
    if (raw !== cache.raw) {
      cache = { raw, snapshot: parseSnapshot(raw) };
    }
    return cache.snapshot;
  }

  function write(next: FavoritesSnapshot): void {
    try {
      storage?.setItem(key, JSON.stringify(next));
    } catch {
      return;
    }
    listeners.forEach((listener) => listener());
  }

  function onStorage(event: StorageEvent): void {
    if (event.key === key || event.key === null) {
      listeners.forEach((listener) => listener());
    }
  }

  return {
    available: storage !== null,
    subscribe(listener) {
      listeners.add(listener);
      if (listeners.size === 1 && typeof window !== "undefined") {
        window.addEventListener("storage", onStorage);
      }
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0 && typeof window !== "undefined") {
          window.removeEventListener("storage", onStorage);
        }
      };
    },
    getSnapshot,
    getServerSnapshot: () => EMPTY_FAVORITES,
    toggle(kind, id) {
      const current = getSnapshot();
      const ids = current[kind];
      const nextIds = ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id];
      write({ ...current, [kind]: nextIds });
    },
    clear() {
      write(EMPTY_FAVORITES);
    },
  };
}
