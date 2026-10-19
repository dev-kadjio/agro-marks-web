import type { CategoryId } from "@/domain/category";
import type { Locale } from "@/domain/locale";
import type { CategoryRepository, ProducedItemRepository } from "@/repositories/contracts";
import { toCategoryDetail, toCategorySummary } from "./mappers";
import type { CategoryDetail, CategorySummary } from "./view-models";

export interface CategoryDependencies {
  readonly categories: CategoryRepository;
  readonly producedItems: ProducedItemRepository;
}

export interface CategoryService {
  listCategories(locale: Locale): Promise<CategorySummary[]>;
  getCategory(locale: Locale, slug: string): Promise<CategoryDetail | null>;
  listSlugs(): Promise<string[]>;
}

export function createCategoryService(deps: CategoryDependencies): CategoryService {
  async function producerCounts(): Promise<ReadonlyMap<CategoryId, number>> {
    const items = await deps.producedItems.findAll();
    const producersByCategory = new Map<CategoryId, Set<string>>();
    for (const item of items) {
      const producers = producersByCategory.get(item.categoryId) ?? new Set<string>();
      producers.add(item.producerId);
      producersByCategory.set(item.categoryId, producers);
    }
    return new Map([...producersByCategory].map(([categoryId, producers]) => [categoryId, producers.size]));
  }

  return {
    async listCategories(locale) {
      const [categories, counts] = await Promise.all([deps.categories.findAll(), producerCounts()]);
      return categories
        .map((category) => toCategorySummary(category, counts.get(category.id) ?? 0, locale))
        .filter((category) => category.producerCount > 0);
    },

    async getCategory(locale, slug) {
      const category = await deps.categories.findBySlug(slug);
      if (!category) {
        return null;
      }
      const counts = await producerCounts();
      return toCategoryDetail(category, counts.get(category.id) ?? 0, locale);
    },

    async listSlugs() {
      const categories = await deps.categories.findAll();
      return categories.map((category) => category.slug);
    },
  };
}
