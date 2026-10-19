import type { CategoryId } from "@/domain/category";
import type { Locale } from "@/domain/locale";
import { producerTypes, type ProducerType, type SpecialtyId } from "@/domain/producer";
import type { RegionId } from "@/domain/region";
import type { CategoryRepository, ProducedItemRepository, ProducerRepository } from "@/repositories/contracts";
import { groupByProducer } from "./catalog-index";
import type { ProducerFilterCriteria } from "./filtering/criteria";
import { paginate } from "./filtering/pagination";
import { filterProducers } from "./filtering/producer-filters";
import { localize } from "./localization";
import { toProducerProfile, toProducerSummary } from "./mappers";
import type { FacetOption, FacetScope, Paginated, ProducerProfile, ProducerSummary } from "./view-models";

export const PRODUCERS_PAGE_SIZE = 9;

export interface FacetValue<T extends string> extends FacetScope {
  readonly value: T;
}

export interface ProducerFilterOptions {
  readonly types: readonly ProducerType[];
  readonly regions: readonly FacetValue<RegionId>[];
  readonly cities: readonly FacetValue<string>[];
  readonly specialties: readonly FacetValue<SpecialtyId>[];
  readonly categories: readonly FacetOption<CategoryId>[];
}

export interface ProducerDependencies {
  readonly producers: ProducerRepository;
  readonly producedItems: ProducedItemRepository;
  readonly categories: CategoryRepository;
}

export interface ProducerService {
  listProducers(locale: Locale): Promise<ProducerSummary[]>;
  searchProducers(locale: Locale, criteria: ProducerFilterCriteria): Promise<Paginated<ProducerSummary>>;
  listFeaturedProducers(locale: Locale, limit: number): Promise<ProducerSummary[]>;
  getProducerProfile(locale: Locale, slug: string): Promise<ProducerProfile | null>;
  listSimilarProducers(locale: Locale, slug: string, limit: number): Promise<ProducerSummary[]>;
  getFilterOptions(locale: Locale, scope?: { readonly categoryId?: CategoryId }): Promise<ProducerFilterOptions>;
  listSlugs(): Promise<string[]>;
}

function similarityScore(reference: ProducerSummary, candidate: ProducerSummary): number {
  const sharedCategories = candidate.categoryIds.filter((id) => reference.categoryIds.includes(id)).length;
  const sharedSpecialties = candidate.specialtyIds.filter((id) => reference.specialtyIds.includes(id)).length;
  const sameType = candidate.type === reference.type ? 1 : 0;
  const sameRegion = candidate.regionId === reference.regionId ? 1 : 0;
  return sharedSpecialties * 3 + sharedCategories * 2 + sameType * 2 + sameRegion;
}

function collectFacet<T extends string>(
  producers: readonly ProducerSummary[],
  valuesOf: (producer: ProducerSummary) => readonly T[],
): FacetValue<T>[] {
  const scopes = new Map<T, { types: Set<ProducerType>; regions: Set<RegionId> }>();
  for (const producer of producers) {
    for (const value of valuesOf(producer)) {
      const scope = scopes.get(value) ?? { types: new Set(), regions: new Set() };
      scope.types.add(producer.type);
      scope.regions.add(producer.regionId);
      scopes.set(value, scope);
    }
  }
  return [...scopes].map(([value, scope]) => ({
    value,
    producerTypes: producerTypes.filter((type) => scope.types.has(type)),
    regionIds: [...scope.regions],
  }));
}

export function createProducerService(deps: ProducerDependencies): ProducerService {
  async function summaries(locale: Locale): Promise<ProducerSummary[]> {
    const [producers, items] = await Promise.all([deps.producers.findAll(), deps.producedItems.findAll()]);
    const itemsByProducer = groupByProducer(items);
    return producers.map((producer) => toProducerSummary(producer, itemsByProducer.get(producer.id) ?? [], locale));
  }

  return {
    listProducers: summaries,

    async searchProducers(locale, criteria) {
      const results = filterProducers(await summaries(locale), criteria, locale);
      return paginate(results, criteria.page, PRODUCERS_PAGE_SIZE);
    },

    async listFeaturedProducers(locale, limit) {
      const all = await summaries(locale);
      return all.filter((producer) => producer.featured).slice(0, limit);
    },

    async getProducerProfile(locale, slug) {
      const producer = await deps.producers.findBySlug(slug);
      if (!producer) {
        return null;
      }
      const [items, categories] = await Promise.all([deps.producedItems.findByProducerId(producer.id), deps.categories.findAll()]);
      return toProducerProfile(producer, items, new Map(categories.map((category) => [category.id, category])), locale);
    },

    async listSimilarProducers(locale, slug, limit) {
      const all = await summaries(locale);
      const reference = all.find((producer) => producer.slug === slug);
      if (!reference) {
        return [];
      }
      return all
        .filter((producer) => producer.slug !== slug)
        .map((producer) => ({ producer, score: similarityScore(reference, producer) }))
        .sort((a, b) => b.score - a.score || a.producer.farmName.localeCompare(b.producer.farmName, locale))
        .slice(0, limit)
        .map((entry) => entry.producer);
    },

    async getFilterOptions(locale, scope) {
      const [all, categories] = await Promise.all([summaries(locale), deps.categories.findAll()]);
      const categoryId = scope?.categoryId;
      const scoped = categoryId ? all.filter((producer) => producer.categoryIds.includes(categoryId)) : all;
      const categoryFacets = new Map(collectFacet(scoped, (producer) => producer.categoryIds).map((facet) => [facet.value, facet]));
      return {
        types: producerTypes.filter((type) => scoped.some((producer) => producer.type === type)),
        regions: collectFacet(scoped, (producer) => [producer.regionId]),
        cities: collectFacet(scoped, (producer) => [producer.city]),
        specialties: collectFacet(scoped, (producer) => producer.specialtyIds),
        categories: categories.flatMap((category) => {
          const facet = categoryFacets.get(category.id);
          return facet ? [{ ...facet, label: localize(category.name, locale) }] : [];
        }),
      };
    },

    async listSlugs() {
      const producers = await deps.producers.findAll();
      return producers.map((producer) => producer.slug);
    },
  };
}
