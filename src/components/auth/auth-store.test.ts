import { describe, expect, it } from "vitest";
import { AUTH_STORAGE_KEY, createAuthStore, EMPTY_AUTH, selectCurrentAccount } from "./auth-store";

const input = { name: "Awa Ndiaye", email: "awa@example.com", role: "consumer" as const, city: "Douala", password: "motdepasse", confirmPassword: "motdepasse" };

describe("auth store", () => {
  it("registers, signs in automatically and never stores the password in clear", async () => {
    const store = createAuthStore(window.localStorage);
    const result = await store.register(input);
    expect(result).toMatchObject({ ok: true, account: { name: "Awa Ndiaye", email: "awa@example.com", city: "Douala" } });
    expect(selectCurrentAccount(store.getSnapshot())?.email).toBe("awa@example.com");
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY) ?? "";
    expect(raw).not.toContain("motdepasse");
    expect(raw).toContain("sha256:");
  });

  it("refuses a duplicate email", async () => {
    const store = createAuthStore(window.localStorage);
    await store.register(input);
    expect(await store.register(input)).toEqual({ ok: false, error: "emailTaken" });
  });

  it("logs out and logs back in with the right password only", async () => {
    const store = createAuthStore(window.localStorage);
    await store.register(input);
    store.logout();
    expect(selectCurrentAccount(store.getSnapshot())).toBeNull();
    expect(await store.login({ email: "awa@example.com", password: "mauvais" })).toEqual({ ok: false, error: "invalidCredentials" });
    expect(await store.login({ email: "inconnu@example.com", password: "motdepasse" })).toEqual({ ok: false, error: "invalidCredentials" });
    expect(await store.login({ email: "awa@example.com", password: "motdepasse" })).toMatchObject({ ok: true });
    expect(selectCurrentAccount(store.getSnapshot())?.name).toBe("Awa Ndiaye");
  });

  it("ignores corrupted storage and reports missing storage", async () => {
    window.localStorage.setItem(AUTH_STORAGE_KEY, "{oops");
    expect(createAuthStore(window.localStorage).getSnapshot()).toEqual(EMPTY_AUTH);
    expect(await createAuthStore(null).register(input)).toEqual({ ok: false, error: "storageUnavailable" });
  });
});
