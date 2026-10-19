import { describe, expect, it } from "vitest";
import { countActiveProducerFilters, parseProducerFilters, serializeProducerFilters } from "./producer-filter-params";

const cities = new Set(["Obala", "Ngaoundéré"]);

describe("producer filter params", () => {
  it("parses valid parameters", () => {
    expect(
      parseProducerFilters(
        { q: " cacao ", type: "farmer", region: "centre", city: "Obala", specialty: "cocoa", category: "cash-crops", sort: "name-asc", page: "2" },
        cities,
      ),
    ).toEqual({
      query: "cacao",
      type: "farmer",
      regionId: "centre",
      city: "Obala",
      specialtyId: "cocoa",
      categoryId: "cash-crops",
      sort: "name-asc",
      page: 2,
    });
  });

  it("drops invalid values instead of failing", () => {
    expect(parseProducerFilters({ type: "fisherman", region: "mars", city: "Paris", specialty: "<script>", sort: "random", page: "-4" }, cities)).toEqual({
      query: undefined,
      type: undefined,
      regionId: undefined,
      city: undefined,
      specialtyId: undefined,
      categoryId: undefined,
      sort: "relevance",
      page: 1,
    });
  });

  it("uses the first value of repeated parameters", () => {
    expect(parseProducerFilters({ region: ["west", "east"], type: ["breeder", "farmer"] }, cities)).toMatchObject({ regionId: "west", type: "breeder" });
  });

  it("serializes only non-default values and round-trips", () => {
    const criteria = parseProducerFilters({ q: "miel", type: "breeder", region: "adamawa", city: "Ngaoundéré", page: "1" }, cities);
    const query = serializeProducerFilters(criteria);
    expect(query).toBe("?q=miel&type=breeder&region=adamawa&city=Ngaound%C3%A9r%C3%A9");
    expect(parseProducerFilters(Object.fromEntries(new URLSearchParams(query)), cities)).toEqual(criteria);
    expect(serializeProducerFilters(parseProducerFilters({}, cities))).toBe("");
  });

  it("can omit the category when it is fixed by the page", () => {
    const criteria = parseProducerFilters({ category: "beekeeping", q: "miel" }, cities);
    expect(serializeProducerFilters(criteria, { omitCategory: true })).toBe("?q=miel");
    expect(countActiveProducerFilters(criteria, { omitCategory: true })).toBe(1);
  });

  it("counts active filters, including the producer type", () => {
    expect(countActiveProducerFilters(parseProducerFilters({ q: "a", type: "breeder", sort: "name-asc" }, cities))).toBe(2);
  });
});
