import { describe, expect, it } from "vitest";
import { defaultProducerCriteria } from "@/services/filtering/criteria";
import { optionsInScope, pruneOutOfScope, type ProducerFacetOptions } from "./facet-scope";

const options: ProducerFacetOptions = {
  regions: [
    { value: "centre", label: "Centre", producerTypes: ["farmer", "breeder"], regionIds: ["centre"] },
    { value: "west", label: "Ouest", producerTypes: ["farmer"], regionIds: ["west"] },
  ],
  cities: [
    { value: "Mfou", label: "Mfou", producerTypes: ["breeder"], regionIds: ["centre"] },
    { value: "Obala", label: "Obala", producerTypes: ["farmer"], regionIds: ["centre"] },
    { value: "Dschang", label: "Dschang", producerTypes: ["farmer"], regionIds: ["west"] },
  ],
  specialties: [
    { value: "cocoa", label: "Cacao", producerTypes: ["farmer"], regionIds: ["centre"] },
    { value: "poultry", label: "Aviculture", producerTypes: ["breeder"], regionIds: ["centre"] },
  ],
  categories: [
    { value: "cash-crops", label: "Cultures de rente", producerTypes: ["farmer"], regionIds: ["centre"] },
    { value: "poultry-farming", label: "Volailles", producerTypes: ["breeder"], regionIds: ["centre"] },
  ],
};

const values = (list: readonly { value: string }[]) => list.map((option) => option.value);

describe("facet scope", () => {
  it("keeps every option when no type or region is selected", () => {
    expect(values(optionsInScope(options.cities, {}))).toEqual(["Mfou", "Obala", "Dschang"]);
  });

  it("narrows options to the selected type and region", () => {
    expect(values(optionsInScope(options.specialties, { type: "breeder" }))).toEqual(["poultry"]);
    expect(values(optionsInScope(options.cities, { type: "farmer", regionId: "centre" }))).toEqual(["Obala"]);
    expect(values(optionsInScope(options.regions, { type: "breeder" }))).toEqual(["centre"]);
  });

  it("clears selections that no longer match the producer type", () => {
    const criteria = { ...defaultProducerCriteria, query: "ferme", specialtyId: "cocoa" as const, categoryId: "cash-crops" as const, city: "Obala" };
    expect(pruneOutOfScope({ ...criteria, type: "breeder" }, options)).toEqual({
      ...criteria,
      type: "breeder",
      regionId: undefined,
      specialtyId: undefined,
      categoryId: undefined,
      city: undefined,
    });
    expect(pruneOutOfScope({ ...criteria, type: "farmer" }, options)).toEqual({ ...criteria, type: "farmer", regionId: undefined });
  });

  it("clears the town when the region changes", () => {
    expect(pruneOutOfScope({ ...defaultProducerCriteria, city: "Dschang", regionId: "centre" }, options)).toMatchObject({
      regionId: "centre",
      city: undefined,
    });
  });
});
