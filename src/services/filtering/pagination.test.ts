import { describe, expect, it } from "vitest";
import { paginate } from "./pagination";

const items = Array.from({ length: 25 }, (_, index) => index + 1);

describe("paginate", () => {
  it("returns the requested page", () => {
    const result = paginate(items, 2, 10);
    expect(result.items).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    expect(result).toMatchObject({ page: 2, pageCount: 3, total: 25 });
  });

  it("clamps out-of-range pages", () => {
    expect(paginate(items, 99, 10).page).toBe(3);
    expect(paginate(items, 0, 10).page).toBe(1);
  });

  it("handles empty lists", () => {
    expect(paginate([], 1, 10)).toMatchObject({ items: [], page: 1, pageCount: 1, total: 0 });
  });
});
