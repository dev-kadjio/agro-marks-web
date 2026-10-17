import { describe, expect, it } from "vitest";
import { productSummary } from "../../../tests/fixtures/catalog";
import { defaultProductCriteria } from "./criteria";
import { filterProducts, matchesAvailability } from "./product-filters";

const otherFarmer = { id: "farmer-2", slug: "farm-2", farmName: "Ferme 2", city: "Garoua", regionId: "north", whatsappNumber: null } as const;

const products = [
  productSummary({ id: "carrots", name: "Carottes", price: { amount: 600, currency: "XAF" }, listedAt: "2026-03-01", popularity: 70 }),
  productSummary({
    id: "honey",
    name: "Miel clair",
    categoryId: "honey",
    price: { amount: 3500, currency: "XAF" },
    listedAt: "2026-05-01",
    popularity: 90,
    farmer: otherFarmer,
  }),
  productSummary({
    id: "mangoes",
    name: "Mangues",
    categoryId: "fruits",
    price: { amount: 500, currency: "XAF" },
    availability: { status: "out-of-season", nextSeasonMonth: 3 },
    listedAt: "2026-04-01",
    popularity: 95,
    farmer: otherFarmer,
  }),
  productSummary({
    id: "sorghum",
    name: "Sorgho",
    categoryId: "cereals-legumes",
    price: { amount: 15000, currency: "XAF" },
    availability: { status: "pre-order", expectedMonth: 11 },
    listedAt: "2026-08-01",
    popularity: 20,
    farmer: otherFarmer,
  }),
];

const ids = (list: readonly { id: string }[]) => list.map((item) => item.id);

describe("filterProducts", () => {
  it("combines farmer, region, price and availability filters", () => {
    const criteria = { ...defaultProductCriteria, farmerSlug: "farm-2", regionId: "north" as const, maxPrice: 5000, availability: "available" as const };
    expect(ids(filterProducts(products, criteria, "fr"))).toEqual(["honey"]);
  });

  it("filters by category", () => {
    expect(ids(filterProducts(products, { ...defaultProductCriteria, categoryId: "fruits" }, "fr"))).toEqual(["mangoes"]);
  });

  it("filters by price range", () => {
    expect(ids(filterProducts(products, { ...defaultProductCriteria, minPrice: 550, maxPrice: 4000, sort: "price-asc" }, "fr"))).toEqual([
      "carrots",
      "honey",
    ]);
  });

  it("sorts by price, name and newest", () => {
    expect(ids(filterProducts(products, { ...defaultProductCriteria, sort: "price-asc" }, "fr"))).toEqual(["mangoes", "carrots", "honey", "sorghum"]);
    expect(ids(filterProducts(products, { ...defaultProductCriteria, sort: "price-desc" }, "fr"))).toEqual(["sorghum", "honey", "carrots", "mangoes"]);
    expect(ids(filterProducts(products, { ...defaultProductCriteria, sort: "name-asc" }, "fr"))).toEqual(["carrots", "mangoes", "honey", "sorghum"]);
    expect(ids(filterProducts(products, { ...defaultProductCriteria, sort: "newest" }, "fr"))).toEqual(["sorghum", "honey", "mangoes", "carrots"]);
  });

  it("ranks available products before unavailable ones by relevance", () => {
    expect(ids(filterProducts(products, defaultProductCriteria, "fr"))).toEqual(["honey", "carrots", "mangoes", "sorghum"]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterProducts(products, { ...defaultProductCriteria, query: "chocolat" }, "fr")).toEqual([]);
  });

  it("matches availability groups", () => {
    expect(matchesAvailability({ status: "limited" }, "available")).toBe(true);
    expect(matchesAvailability({ status: "pre-order", expectedMonth: 1 }, "available")).toBe(false);
    expect(matchesAvailability({ status: "out-of-season", nextSeasonMonth: 1 }, "out-of-season")).toBe(true);
  });
});
