import { describe, expect, it } from "vitest";
import { producerSummary } from "../../../tests/fixtures/catalog";
import { defaultProducerCriteria } from "./criteria";
import { filterProducers } from "./producer-filters";

const producers = [
  producerSummary({ id: "a", farmName: "Ferme des Hauts", regionId: "west", city: "Dschang", specialtyIds: ["highland-vegetables"], categoryIds: ["vegetables"] }),
  producerSummary({ id: "b", farmName: "Cacaoyère Obala", regionId: "centre", city: "Obala", specialtyIds: ["cocoa"], categoryIds: ["cash-crops"], featured: true }),
  producerSummary({ id: "c", farmName: "Jardins de Soa", regionId: "centre", city: "Soa", specialtyIds: ["leafy-vegetables"], categoryIds: ["vegetables"] }),
  producerSummary({
    id: "d",
    type: "breeder",
    farmName: "Élevage de Mfou",
    regionId: "centre",
    city: "Mfou",
    specialtyIds: ["poultry"],
    categoryIds: ["poultry-farming"],
    searchText: "elevage de mfou poules oeufs",
  }),
  producerSummary({
    id: "e",
    type: "breeder",
    farmName: "Porcherie des Bamboutos",
    regionId: "west",
    city: "Mbouda",
    specialtyIds: ["pig-farming"],
    categoryIds: ["pig-farming"],
  }),
];

const ids = (list: readonly { id: string }[]) => list.map((item) => item.id);

describe("filterProducers", () => {
  it("returns farmers and breeders together by default", () => {
    expect(ids(filterProducers(producers, defaultProducerCriteria, "fr")).sort()).toEqual(["a", "b", "c", "d", "e"]);
  });

  it("filters by producer type", () => {
    expect(ids(filterProducers(producers, { ...defaultProducerCriteria, type: "breeder" }, "fr")).sort()).toEqual(["d", "e"]);
    expect(ids(filterProducers(producers, { ...defaultProducerCriteria, type: "farmer" }, "fr")).sort()).toEqual(["a", "b", "c"]);
  });

  it("combines type, region, city and category filters", () => {
    expect(ids(filterProducers(producers, { ...defaultProducerCriteria, type: "breeder", regionId: "centre" }, "fr"))).toEqual(["d"]);
    expect(ids(filterProducers(producers, { ...defaultProducerCriteria, type: "farmer", regionId: "centre" }, "fr"))).toEqual(["b", "c"]);
    expect(ids(filterProducers(producers, { ...defaultProducerCriteria, regionId: "centre", categoryId: "vegetables" }, "fr"))).toEqual(["c"]);
    expect(ids(filterProducers(producers, { ...defaultProducerCriteria, regionId: "west", city: "Mbouda" }, "fr"))).toEqual(["e"]);
    expect(ids(filterProducers(producers, { ...defaultProducerCriteria, type: "farmer", city: "Mbouda" }, "fr"))).toEqual([]);
  });

  it("combines the type filter with the text search", () => {
    expect(ids(filterProducers(producers, { ...defaultProducerCriteria, query: "oeufs" }, "fr"))).toEqual(["d"]);
    expect(ids(filterProducers(producers, { ...defaultProducerCriteria, type: "farmer", query: "oeufs" }, "fr"))).toEqual([]);
  });

  it("filters by specialty", () => {
    expect(ids(filterProducers(producers, { ...defaultProducerCriteria, specialtyId: "cocoa" }, "fr"))).toEqual(["b"]);
  });

  it("searches by name regardless of accents", () => {
    expect(ids(filterProducers(producers, { ...defaultProducerCriteria, query: "cacaoyere" }, "fr"))).toEqual(["b"]);
  });

  it("sorts by name in both directions", () => {
    expect(ids(filterProducers(producers, { ...defaultProducerCriteria, sort: "name-asc" }, "fr"))).toEqual(["b", "d", "a", "c", "e"]);
    expect(ids(filterProducers(producers, { ...defaultProducerCriteria, sort: "name-desc" }, "fr"))).toEqual(["e", "c", "a", "d", "b"]);
  });

  it("puts featured producers first when sorting by relevance without a query", () => {
    expect(ids(filterProducers(producers, defaultProducerCriteria, "fr"))[0]).toBe("b");
  });
});
