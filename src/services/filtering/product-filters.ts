import { isCurrentlyAvailable, type ProductAvailability } from "@/domain/product";
import type { ProductSummary } from "../view-models";
import type { AvailabilityFilter, ProductFilterCriteria, ProductSort } from "./criteria";
import { scoreMatch, tokenize } from "./text-search";

type ProductCriteria = Omit<ProductFilterCriteria, "page">;

interface Scored {
  readonly product: ProductSummary;
  readonly score: number;
}

export function matchesAvailability(availability: ProductAvailability, filter: AvailabilityFilter): boolean {
  switch (filter) {
    case "available":
      return isCurrentlyAvailable(availability);
    case "pre-order":
      return availability.status === "pre-order";
    case "out-of-season":
      return availability.status === "out-of-season";
  }
}

function matchesFacets(product: ProductSummary, criteria: ProductCriteria): boolean {
  if (criteria.categoryId && product.categoryId !== criteria.categoryId) return false;
  if (criteria.producerSlug && product.producer.slug !== criteria.producerSlug) return false;
  if (criteria.regionId && product.producer.regionId !== criteria.regionId) return false;
  if (criteria.minPrice !== undefined && product.price.amount < criteria.minPrice) return false;
  if (criteria.maxPrice !== undefined && product.price.amount > criteria.maxPrice) return false;
  if (criteria.availability && !matchesAvailability(product.availability, criteria.availability)) return false;
  return true;
}

function compare(sort: ProductSort, locale: string) {
  const collator = new Intl.Collator(locale, { sensitivity: "base" });
  const byName = (a: Scored, b: Scored) => collator.compare(a.product.name, b.product.name);
  return (a: Scored, b: Scored): number => {
    switch (sort) {
      case "price-asc":
        return a.product.price.amount - b.product.price.amount || byName(a, b);
      case "price-desc":
        return b.product.price.amount - a.product.price.amount || byName(a, b);
      case "name-asc":
        return byName(a, b);
      case "newest":
        return b.product.listedAt.localeCompare(a.product.listedAt) || byName(a, b);
      case "relevance":
        return (
          b.score - a.score ||
          Number(isCurrentlyAvailable(b.product.availability)) - Number(isCurrentlyAvailable(a.product.availability)) ||
          b.product.popularity - a.product.popularity ||
          byName(a, b)
        );
    }
  };
}

export function filterProducts(
  products: readonly ProductSummary[],
  criteria: ProductCriteria,
  locale: string,
): ProductSummary[] {
  const tokens = criteria.query ? tokenize(criteria.query) : [];
  return products
    .filter((product) => matchesFacets(product, criteria))
    .map((product) => ({ product, score: scoreMatch(tokens, product.name, product.searchText) }))
    .filter((entry) => tokens.length === 0 || entry.score > 0)
    .sort(compare(criteria.sort, locale))
    .map((entry) => entry.product);
}
