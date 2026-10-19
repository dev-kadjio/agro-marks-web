import { describe, expect, it, vi } from "vitest";
import { createFavoritesStore, EMPTY_FAVORITES, FAVORITES_STORAGE_KEY } from "./favorites-store";

describe("favorites store", () => {
  it("starts empty and uses an empty server snapshot", () => {
    const store = createFavoritesStore(window.localStorage);
    expect(store.getSnapshot()).toEqual(EMPTY_FAVORITES);
    expect(store.getServerSnapshot()).toBe(EMPTY_FAVORITES);
  });

  it("toggles products and producers and persists them", () => {
    const store = createFavoritesStore(window.localStorage);
    store.toggle("product", "product-001");
    store.toggle("producer", "producer-01");
    expect(store.getSnapshot()).toEqual({ product: ["product-001"], producer: ["producer-01"] });
    expect(JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY) ?? "{}")).toEqual({ product: ["product-001"], producer: ["producer-01"] });
    store.toggle("product", "product-001");
    expect(store.getSnapshot().product).toEqual([]);
  });

  it("returns a stable snapshot reference while data is unchanged", () => {
    const store = createFavoritesStore(window.localStorage);
    store.toggle("product", "product-002");
    expect(store.getSnapshot()).toBe(store.getSnapshot());
  });

  it("notifies subscribers and clears", () => {
    const store = createFavoritesStore(window.localStorage);
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);
    store.toggle("producer", "producer-02");
    store.clear();
    expect(listener).toHaveBeenCalledTimes(2);
    expect(store.getSnapshot()).toEqual(EMPTY_FAVORITES);
    unsubscribe();
  });

  it("recovers from corrupted storage", () => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, "{not json");
    expect(createFavoritesStore(window.localStorage).getSnapshot()).toEqual(EMPTY_FAVORITES);
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify({ product: [42, "ok"], farmer: "nope" }));
    expect(createFavoritesStore(window.localStorage).getSnapshot()).toEqual(EMPTY_FAVORITES);
  });

  it("migrates favourites saved with the legacy farmer key", () => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify({ product: ["product-003"], farmer: ["farmer-04", "farmer-07"] }));
    const store = createFavoritesStore(window.localStorage);
    expect(store.getSnapshot()).toEqual({ product: ["product-003"], producer: ["producer-04", "producer-07"] });
    store.toggle("producer", "producer-04");
    expect(JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY) ?? "{}")).toEqual({ product: ["product-003"], producer: ["producer-07"] });
  });

  it("works without storage", () => {
    const store = createFavoritesStore(null);
    expect(store.available).toBe(false);
    store.toggle("product", "x");
    expect(store.getSnapshot()).toEqual(EMPTY_FAVORITES);
  });
});
