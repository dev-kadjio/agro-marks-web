import type { FarmerSummary } from "../view-models";
import type { FarmerFilterCriteria, FarmerSort } from "./criteria";
import { scoreMatch, tokenize } from "./text-search";

type FarmerCriteria = Omit<FarmerFilterCriteria, "page">;

interface Scored {
  readonly farmer: FarmerSummary;
  readonly score: number;
}

function matchesFacets(farmer: FarmerSummary, criteria: FarmerCriteria): boolean {
  if (criteria.regionId && farmer.regionId !== criteria.regionId) return false;
  if (criteria.specialtyId && !farmer.specialtyIds.includes(criteria.specialtyId)) return false;
  if (criteria.categoryId && !farmer.categoryIds.includes(criteria.categoryId)) return false;
  if (criteria.availableOnly && !farmer.hasAvailableProducts) return false;
  return true;
}

function compare(sort: FarmerSort, locale: string) {
  const collator = new Intl.Collator(locale, { sensitivity: "base" });
  return (a: Scored, b: Scored): number => {
    switch (sort) {
      case "name-asc":
        return collator.compare(a.farmer.farmName, b.farmer.farmName);
      case "name-desc":
        return collator.compare(b.farmer.farmName, a.farmer.farmName);
      case "relevance":
        return (
          b.score - a.score ||
          Number(b.farmer.featured) - Number(a.farmer.featured) ||
          collator.compare(a.farmer.farmName, b.farmer.farmName)
        );
    }
  };
}

export function filterFarmers(
  farmers: readonly FarmerSummary[],
  criteria: FarmerCriteria,
  locale: string,
): FarmerSummary[] {
  const tokens = criteria.query ? tokenize(criteria.query) : [];
  return farmers
    .filter((farmer) => matchesFacets(farmer, criteria))
    .map((farmer) => ({ farmer, score: scoreMatch(tokens, farmer.farmName, farmer.searchText) }))
    .filter((entry) => tokens.length === 0 || entry.score > 0)
    .sort(compare(criteria.sort, locale))
    .map((entry) => entry.farmer);
}
