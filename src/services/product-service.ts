import type { Month } from "@/domain/calendar";
import type { CategoryId } from "@/domain/category";
import type { Locale } from "@/domain/locale";
import { isCurrentlyAvailable } from "@/domain/product";
import type { RegionId } from "@/domain/region";
import { loadCatalogIndex, summarizeProducts, type CatalogDependencies } from "./catalog-index";
import type { ProductFilterCriteria } from "./filtering/criteria";
import { paginate } from "./filtering/pagination";
import { filterProducts } from "./filtering/product-filters";
import { localize } from "./localization";
import { toProductDetail } from "./mappers";
import type { Option, Paginated, ProductDetail, ProductSummary } from "./view-models";

export const PRODUCTS_PAGE_SIZE = 12;

export interface ProductFilterOptions {
  readonly categories: readonly Option<CategoryId>[];
  readonly farmers: readonly Option<string>[];
  readonly regionIds: readonly RegionId[];
  readonly priceRange: { readonly min: number; readonly max: number };
}

export interface ProductService {
  searchProducts(locale: Locale, criteria: ProductFilterCriteria): Promise<Paginated<ProductSummary>>;
  getProduct(locale: Locale, slug: string): Promise<ProductDetail | null>;
  listFeaturedProducts(locale: Locale, limit: number): Promise<ProductSummary[]>;
  listPopularProducts(locale: Locale, limit: number, excludeIds?: readonly string[]): Promise<ProductSummary[]>;
  listSeasonalProducts(locale: Locale, month: Month, limit: number): Promise<ProductSummary[]>;
  listFarmerProducts(locale: Locale, farmerId: string): Promise<ProductSummary[]>;
  listSimilarProducts(locale: Locale, slug: string, limit: number): Promise<ProductSummary[]>;
  listAllProducts(locale: Locale): Promise<ProductSummary[]>;
  getFilterOptions(locale: Locale, scope?: { categoryId?: CategoryId }): Promise<ProductFilterOptions>;
  listSlugs(): Promise<string[]>;
}

export function createProductService(deps: CatalogDependencies): ProductService {
  async function summaries(locale: Locale): Promise<ProductSummary[]> {
    const index = await loadCatalogIndex(deps);
    return summarizeProducts(index, index.products, locale);
  }

  return {
    async searchProducts(locale, criteria) {
      const results = filterProducts(await summaries(locale), criteria, locale);
      return paginate(results, criteria.page, PRODUCTS_PAGE_SIZE);
    },

    async getProduct(locale, slug) {
      const product = await deps.products.findBySlug(slug);
      if (!product) {
        return null;
      }
      const [farmer, category] = await Promise.all([
        deps.farmers.findById(product.farmerId),
        deps.categories.findById(product.categoryId),
      ]);
      return farmer && category ? toProductDetail(product, farmer, category, locale) : null;
    },

    async listFeaturedProducts(locale, limit) {
      const all = await summaries(locale);
      return all
        .filter((product) => product.featured)
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, limit);
    },

    async listPopularProducts(locale, limit, excludeIds = []) {
      const all = await summaries(locale);
      return all
        .filter((product) => isCurrentlyAvailable(product.availability) && !excludeIds.includes(product.id))
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, limit);
    },

    async listSeasonalProducts(locale, month, limit) {
      const index = await loadCatalogIndex(deps);
      const seasonal = index.products.filter(
        (product) =>
          product.harvestMonths.length > 0 &&
          product.harvestMonths.length < 12 &&
          product.harvestMonths.includes(month) &&
          isCurrentlyAvailable(product.availability),
      );
      return summarizeProducts(index, seasonal, locale)
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, limit);
    },

    async listFarmerProducts(locale, farmerId) {
      const index = await loadCatalogIndex(deps);
      const farmerProducts = await deps.products.findByFarmerId(farmerId);
      return summarizeProducts(index, farmerProducts, locale);
    },

    async listSimilarProducts(locale, slug, limit) {
      const all = await summaries(locale);
      const reference = all.find((product) => product.slug === slug);
      if (!reference) {
        return [];
      }
      return all
        .filter((product) => product.slug !== slug && product.categoryId === reference.categoryId)
        .sort(
          (a, b) =>
            Number(b.farmer.id === reference.farmer.id) - Number(a.farmer.id === reference.farmer.id) ||
            b.popularity - a.popularity,
        )
        .slice(0, limit);
    },

    listAllProducts: summaries,

    async getFilterOptions(locale, scope) {
      const index = await loadCatalogIndex(deps);
      const scoped = scope?.categoryId
        ? index.products.filter((product) => product.categoryId === scope.categoryId)
        : index.products;
      const farmerIds = new Set(scoped.map((product) => product.farmerId));
      const categoryIds = new Set(scoped.map((product) => product.categoryId));
      const farmers = [...index.farmersById.values()].filter((farmer) => farmerIds.has(farmer.id));
      const prices = scoped.map((product) => product.price.amount);
      return {
        categories: [...index.categoriesById.values()]
          .filter((category) => categoryIds.has(category.id))
          .map((category) => ({ value: category.id, label: localize(category.name, locale) })),
        farmers: farmers
          .map((farmer) => ({ value: farmer.slug, label: farmer.farmName }))
          .sort((a, b) => a.label.localeCompare(b.label, locale)),
        regionIds: [...new Set(farmers.map((farmer) => farmer.location.regionId))],
        priceRange: {
          min: prices.length > 0 ? Math.min(...prices) : 0,
          max: prices.length > 0 ? Math.max(...prices) : 0,
        },
      };
    },

    async listSlugs() {
      const products = await deps.products.findAll();
      return products.map((product) => product.slug);
    },
  };
}
