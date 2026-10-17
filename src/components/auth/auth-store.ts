import { z } from "zod";
import { accountRoles, type LoginInput, type RegisterInput } from "@/lib/validation/auth";

export interface Account {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: (typeof accountRoles)[number];
  readonly city?: string;
  readonly createdAt: string;
}

interface StoredAccount extends Account {
  readonly passwordHash: string;
}

export interface AuthSnapshot {
  readonly accounts: readonly StoredAccount[];
  readonly sessionAccountId: string | null;
}

export type AuthResult =
  | { readonly ok: true; readonly account: Account }
  | { readonly ok: false; readonly error: "emailTaken" | "invalidCredentials" | "storageUnavailable" };

export interface AuthStore {
  subscribe(listener: () => void): () => void;
  getSnapshot(): AuthSnapshot;
  getServerSnapshot(): AuthSnapshot;
  register(input: RegisterInput): Promise<AuthResult>;
  login(input: LoginInput): Promise<AuthResult>;
  logout(): void;
  readonly available: boolean;
}

export const AUTH_STORAGE_KEY = "agro-marks:auth:v1";

export const EMPTY_AUTH: AuthSnapshot = Object.freeze({ accounts: [], sessionAccountId: null });

const storedAccountSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().min(3),
  role: z.enum(accountRoles),
  city: z.string().optional(),
  createdAt: z.string(),
  passwordHash: z.string().min(1),
});

const snapshotSchema = z.object({
  accounts: z.array(storedAccountSchema).max(50),
  sessionAccountId: z.string().nullable(),
});

function parseSnapshot(raw: string | null): AuthSnapshot {
  if (!raw) return EMPTY_AUTH;
  try {
    const parsed = snapshotSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : EMPTY_AUTH;
  } catch {
    return EMPTY_AUTH;
  }
}

function fnv1a(value: string): string {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return `fnv1a:${hash.toString(16)}`;
}

export async function hashPassword(email: string, password: string): Promise<string> {
  const input = `agro-marks:${email}:${password}`;
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) return fnv1a(input);
  const digest = await subtle.digest("SHA-256", new TextEncoder().encode(input));
  return `sha256:${[...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}

function toPublicAccount({ passwordHash, ...account }: StoredAccount): Account {
  void passwordHash;
  return account;
}

export function selectCurrentAccount(snapshot: AuthSnapshot): Account | null {
  const account = snapshot.accounts.find((candidate) => candidate.id === snapshot.sessionAccountId);
  return account ? toPublicAccount(account) : null;
}

export function createAuthStore(storage: Storage | null, key: string = AUTH_STORAGE_KEY): AuthStore {
  const listeners = new Set<() => void>();
  let cache: { raw: string | null; snapshot: AuthSnapshot } = { raw: null, snapshot: EMPTY_AUTH };

  function read(): string | null {
    try {
      return storage?.getItem(key) ?? null;
    } catch {
      return null;
    }
  }

  function getSnapshot(): AuthSnapshot {
    const raw = read();
    if (raw !== cache.raw) cache = { raw, snapshot: parseSnapshot(raw) };
    return cache.snapshot;
  }

  function write(next: AuthSnapshot): boolean {
    try {
      storage?.setItem(key, JSON.stringify(next));
    } catch {
      return false;
    }
    listeners.forEach((listener) => listener());
    return storage !== null;
  }

  function onStorage(event: StorageEvent): void {
    if (event.key === key || event.key === null) listeners.forEach((listener) => listener());
  }

  return {
    available: storage !== null,
    subscribe(listener) {
      listeners.add(listener);
      if (listeners.size === 1 && typeof window !== "undefined") window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0 && typeof window !== "undefined") window.removeEventListener("storage", onStorage);
      };
    },
    getSnapshot,
    getServerSnapshot: () => EMPTY_AUTH,
    async register(input) {
      const current = getSnapshot();
      if (current.accounts.some((account) => account.email === input.email)) {
        return { ok: false, error: "emailTaken" };
      }
      const account: StoredAccount = {
        id: globalThis.crypto?.randomUUID?.() ?? `account-${Date.now()}`,
        name: input.name,
        email: input.email,
        role: input.role,
        ...(input.city ? { city: input.city } : {}),
        createdAt: new Date().toISOString(),
        passwordHash: await hashPassword(input.email, input.password),
      };
      const saved = write({ accounts: [...current.accounts, account], sessionAccountId: account.id });
      return saved ? { ok: true, account: toPublicAccount(account) } : { ok: false, error: "storageUnavailable" };
    },
    async login(input) {
      const current = getSnapshot();
      const account = current.accounts.find((candidate) => candidate.email === input.email);
      if (!account || account.passwordHash !== (await hashPassword(input.email, input.password))) {
        return { ok: false, error: "invalidCredentials" };
      }
      const saved = write({ ...current, sessionAccountId: account.id });
      return saved ? { ok: true, account: toPublicAccount(account) } : { ok: false, error: "storageUnavailable" };
    },
    logout() {
      write({ ...getSnapshot(), sessionAccountId: null });
    },
  };
}
