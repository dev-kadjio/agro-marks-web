import type { CategoryId } from "@/domain/category";
import type { SpecialtyId } from "@/domain/farmer";
import type { Locale } from "@/domain/locale";
import type { RegionId } from "@/domain/region";
import { groupProductsByFarmer, loadCatalogIndex, type CatalogDependencies } from "./catalog-index";
import type { FarmerFilterCriteria } from "./filtering/criteria";
import { filterFarmers } from "./filtering/farmer-filters";
import { paginate } from "./filtering/pagination";
import { localize } from "./localization";
import { toFarmerProfile, toFarmerSummary } from "./mappers";
import type { FarmerProfile, FarmerSummary, Option, Paginated } from "./view-models";

export const FARMERS_PAGE_SIZE = 9;

export interface FarmerFilterOptions {
  readonly regionIds: readonly RegionId[];
  readonly specialtyIds: readonly SpecialtyId[];
  readonly categories: readonly Option<CategoryId>[];
}

export interface FarmerService {
  listFarmers(locale: Locale): Promise<FarmerSummary[]>;
  searchFarmers(locale: Locale, criteria: FarmerFilterCriteria): Promise<Paginated<FarmerSummary>>;
  listFeaturedFarmers(locale: Locale, limit: number): Promise<FarmerSummary[]>;
  getFarmerProfile(locale: Locale, slug: string): Promise<FarmerProfile | null>;
  listSimilarFarmers(locale: Locale, slug: string, limit: number): Promise<FarmerSummary[]>;
  getFilterOptions(locale: Locale): Promise<FarmerFilterOptions>;
  listSlugs(): Promise<string[]>;
}

function similarityScore(reference: FarmerSummary, candidate: FarmerSummary): number {
  const sharedCategories = candidate.categoryIds.filter((id) => reference.categoryIds.includes(id)).length;
  const sharedSpecialties = candidate.specialtyIds.filter((id) => reference.specialtyIds.includes(id)).length;
  const sameRegion = candidate.regionId === reference.regionId ? 1 : 0;
  return sharedSpecialties * 3 + sharedCategories * 2 + sameRegion;
}

export function createFarmerService(deps: CatalogDependencies): FarmerService {
  async function summaries(locale: Locale): Promise<FarmerSummary[]> {
    const index = await loadCatalogIndex(deps);
    const productsByFarmer = groupProductsByFarmer(index.products);
    return [...index.farmersById.values()].map((farmer) =>
      toFarmerSummary(farmer, productsByFarmer.get(farmer.id) ?? [], locale),
    );
  }

  return {
    listFarmers: summaries,

    async searchFarmers(locale, criteria) {
      const results = filterFarmers(await summaries(locale), criteria, locale);
      return paginate(results, criteria.page, FARMERS_PAGE_SIZE);
    },

    async listFeaturedFarmers(locale, limit) {
      const all = await summaries(locale);
      return all.filter((farmer) => farmer.featured).slice(0, limit);
    },

    async getFarmerProfile(locale, slug) {
      const farmer = await deps.farmers.findBySlug(slug);
      if (!farmer) {
        return null;
      }
      const farmerProducts = await deps.products.findByFarmerId(farmer.id);
      return toFarmerProfile(farmer, farmerProducts, locale);
    },

    async listSimilarFarmers(locale, slug, limit) {
      const all = await summaries(locale);
      const reference = all.find((farmer) => farmer.slug === slug);
      if (!reference) {
        return [];
      }
      return all
        .filter((farmer) => farmer.slug !== slug)
        .map((farmer) => ({ farmer, score: similarityScore(reference, farmer) }))
        .sort((a, b) => b.score - a.score || a.farmer.farmName.localeCompare(b.farmer.farmName, locale))
        .slice(0, limit)
        .map((entry) => entry.farmer);
    },

    async getFilterOptions(locale) {
      const [all, categories] = await Promise.all([summaries(locale), deps.categories.findAll()]);
      const usedCategoryIds = new Set(all.flatMap((farmer) => farmer.categoryIds));
      return {
        regionIds: [...new Set(all.map((farmer) => farmer.regionId))],
        specialtyIds: [...new Set(all.flatMap((farmer) => farmer.specialtyIds))],
        categories: categories
          .filter((category) => usedCategoryIds.has(category.id))
          .map((category) => ({ value: category.id, label: localize(category.name, locale) })),
      };
    },

    async listSlugs() {
      const farmers = await deps.farmers.findAll();
      return farmers.map((farmer) => farmer.slug);
    },
  };
}
