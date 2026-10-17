import { describe, expect, it } from "vitest";
import { countActiveFarmerFilters, parseFarmerFilters, serializeFarmerFilters } from "./farmer-filter-params";

describe("farmer filter params", () => {
  it("parses valid parameters", () => {
    expect(
      parseFarmerFilters({ q: " cacao ", region: "centre", specialty: "cocoa", category: "cocoa-coffee", available: "1", sort: "name-asc", page: "2" }),
    ).toEqual({
      query: "cacao",
      regionId: "centre",
      specialtyId: "cocoa",
      categoryId: "cocoa-coffee",
      availableOnly: true,
      sort: "name-asc",
      page: 2,
    });
  });

  it("drops invalid values instead of failing", () => {
    expect(parseFarmerFilters({ region: "mars", specialty: "<script>", sort: "random", page: "-4", available: "yes" })).toEqual({
      query: undefined,
      regionId: undefined,
      specialtyId: undefined,
      categoryId: undefined,
      availableOnly: false,
      sort: "relevance",
      page: 1,
    });
  });

  it("uses the first value of repeated parameters", () => {
    expect(parseFarmerFilters({ region: ["west", "east"] }).regionId).toBe("west");
  });

  it("serializes only non-default values and round-trips", () => {
    const criteria = parseFarmerFilters({ q: "miel", region: "adamawa", page: "1" });
    const query = serializeFarmerFilters(criteria);
    expect(query).toBe("?q=miel&region=adamawa");
    expect(parseFarmerFilters(Object.fromEntries(new URLSearchParams(query)))).toEqual(criteria);
    expect(serializeFarmerFilters(parseFarmerFilters({}))).toBe("");
  });

  it("counts active filters", () => {
    expect(countActiveFarmerFilters(parseFarmerFilters({ q: "a", available: "1", sort: "name-asc" }))).toBe(2);
  });
});
