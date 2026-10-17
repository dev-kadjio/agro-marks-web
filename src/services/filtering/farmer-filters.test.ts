import { describe, expect, it } from "vitest";
import { farmerSummary } from "../../../tests/fixtures/catalog";
import { defaultFarmerCriteria } from "./criteria";
import { filterFarmers } from "./farmer-filters";

const farmers = [
  farmerSummary({ id: "a", farmName: "Ferme des Hauts", regionId: "west", specialtyIds: ["highland-vegetables"], categoryIds: ["vegetables"] }),
  farmerSummary({ id: "b", farmName: "Cacaoyère Obala", regionId: "centre", specialtyIds: ["cocoa"], categoryIds: ["cocoa-coffee"], featured: true }),
  farmerSummary({ id: "c", farmName: "Jardins de Soa", regionId: "centre", specialtyIds: ["leafy-vegetables"], categoryIds: ["vegetables"], hasAvailableProducts: false }),
];

const ids = (list: readonly { id: string }[]) => list.map((item) => item.id);

describe("filterFarmers", () => {
  it("combines region, category and availability filters", () => {
    expect(ids(filterFarmers(farmers, { ...defaultFarmerCriteria, regionId: "centre" }, "fr"))).toEqual(["b", "c"]);
    expect(ids(filterFarmers(farmers, { ...defaultFarmerCriteria, regionId: "centre", categoryId: "vegetables" }, "fr"))).toEqual(["c"]);
    expect(
      ids(filterFarmers(farmers, { ...defaultFarmerCriteria, regionId: "centre", categoryId: "vegetables", availableOnly: true }, "fr")),
    ).toEqual([]);
  });

  it("filters by specialty", () => {
    expect(ids(filterFarmers(farmers, { ...defaultFarmerCriteria, specialtyId: "cocoa" }, "fr"))).toEqual(["b"]);
  });

  it("searches by name regardless of accents", () => {
    expect(ids(filterFarmers(farmers, { ...defaultFarmerCriteria, query: "cacaoyere" }, "fr"))).toEqual(["b"]);
  });

  it("sorts by name in both directions", () => {
    expect(ids(filterFarmers(farmers, { ...defaultFarmerCriteria, sort: "name-asc" }, "fr"))).toEqual(["b", "a", "c"]);
    expect(ids(filterFarmers(farmers, { ...defaultFarmerCriteria, sort: "name-desc" }, "fr"))).toEqual(["c", "a", "b"]);
  });

  it("puts featured farmers first when sorting by relevance without a query", () => {
    expect(ids(filterFarmers(farmers, defaultFarmerCriteria, "fr"))[0]).toBe("b");
  });
});
