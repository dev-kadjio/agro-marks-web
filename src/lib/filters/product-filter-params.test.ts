import { describe, expect, it } from "vitest";
import { countActiveProductFilters, parseProductFilters, serializeProductFilters } from "./product-filter-params";

const farmers = new Set(["les-jardins-de-soa"]);

describe("product filter params", () => {
  it("parses valid parameters", () => {
    expect(
      parseProductFilters(
        { q: "tomates", category: "vegetables", farmer: "les-jardins-de-soa", region: "centre", min: "500", max: "7000", availability: "available", sort: "price-asc", page: "3" },
        farmers,
      ),
    ).toEqual({
      query: "tomates",
      categoryId: "vegetables",
      farmerSlug: "les-jardins-de-soa",
      regionId: "centre",
      minPrice: 500,
      maxPrice: 7000,
      availability: "available",
      sort: "price-asc",
      page: 3,
    });
  });

  it("ignores unknown farmers, malformed prices and invalid enums", () => {
    const criteria = parseProductFilters({ farmer: "ghost-farm", min: "12abc", max: "-3", category: "cars", availability: "soon" }, farmers);
    expect(criteria).toMatchObject({ farmerSlug: undefined, minPrice: undefined, maxPrice: undefined, categoryId: undefined, availability: undefined });
  });

  it("swaps an inverted price range", () => {
    expect(parseProductFilters({ min: "9000", max: "1000" }, farmers)).toMatchObject({ minPrice: 1000, maxPrice: 9000 });
  });

  it("can omit the category when it is fixed by the page", () => {
    const criteria = parseProductFilters({ category: "honey", q: "miel" }, farmers);
    expect(serializeProductFilters(criteria)).toBe("?q=miel&category=honey");
    expect(serializeProductFilters(criteria, { omitCategory: true })).toBe("?q=miel");
    expect(countActiveProductFilters(criteria, { omitCategory: true })).toBe(1);
  });

  it("round-trips through the URL", () => {
    const criteria = parseProductFilters({ region: "west", sort: "newest", page: "2", max: "2000" }, farmers);
    expect(parseProductFilters(Object.fromEntries(new URLSearchParams(serializeProductFilters(criteria))), farmers)).toEqual(criteria);
  });
});
