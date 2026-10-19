import type { ProducerSummary } from "../view-models";
import type { ProducerFilterCriteria, ProducerSort } from "./criteria";
import { scoreMatch, tokenize } from "./text-search";

type ProducerCriteria = Omit<ProducerFilterCriteria, "page">;

interface Scored {
  readonly producer: ProducerSummary;
  readonly score: number;
}

export function matchesProducerFacets(producer: ProducerSummary, criteria: ProducerCriteria): boolean {
  if (criteria.type && producer.type !== criteria.type) return false;
  if (criteria.regionId && producer.regionId !== criteria.regionId) return false;
  if (criteria.city && producer.city !== criteria.city) return false;
  if (criteria.specialtyId && !producer.specialtyIds.includes(criteria.specialtyId)) return false;
  if (criteria.categoryId && !producer.categoryIds.includes(criteria.categoryId)) return false;
  return true;
}

function compare(sort: ProducerSort, locale: string) {
  const collator = new Intl.Collator(locale, { sensitivity: "base" });
  return (a: Scored, b: Scored): number => {
    switch (sort) {
      case "name-asc":
        return collator.compare(a.producer.farmName, b.producer.farmName);
      case "name-desc":
        return collator.compare(b.producer.farmName, a.producer.farmName);
      case "relevance":
        return (
          b.score - a.score ||
          Number(b.producer.featured) - Number(a.producer.featured) ||
          collator.compare(a.producer.farmName, b.producer.farmName)
        );
    }
  };
}

export function filterProducers(
  producers: readonly ProducerSummary[],
  criteria: ProducerCriteria,
  locale: string,
): ProducerSummary[] {
  const tokens = criteria.query ? tokenize(criteria.query) : [];
  return producers
    .filter((producer) => matchesProducerFacets(producer, criteria))
    .map((producer) => ({ producer, score: scoreMatch(tokens, producer.farmName, producer.searchText) }))
    .filter((entry) => tokens.length === 0 || entry.score > 0)
    .sort(compare(criteria.sort, locale))
    .map((entry) => entry.producer);
}
