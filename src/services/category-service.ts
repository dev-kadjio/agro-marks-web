import type { Locale } from "@/domain/locale";
import type { CategoryRepository, ProductRepository } from "@/repositories/contracts";
import { toCategoryDetail, toCategorySummary } from "./mappers";
import type { CategoryDetail, CategorySummary } from "./view-models";

export interface CategoryDependencies {
  readonly categories: CategoryRepository;
  readonly products: ProductRepository;
}

export interface CategoryService {
  listCategories(locale: Locale): Promise<CategorySummary[]>;
  getCategory(locale: Locale, slug: string): Promise<CategoryDetail | null>;
  listSlugs(): Promise<string[]>;
}

export function createCategoryService(deps: CategoryDependencies): CategoryService {
  return {
    async listCategories(locale) {
      const [categories, products] = await Promise.all([deps.categories.findAll(), deps.products.findAll()]);
      return categories.map((category) =>
        toCategorySummary(category, products.filter((product) => product.categoryId === category.id).length, locale),
      );
    },

    async getCategory(locale, slug) {
      const category = await deps.categories.findBySlug(slug);
      if (!category) {
        return null;
      }
      const products = await deps.products.findByCategoryId(category.id);
      return toCategoryDetail(category, products.length, locale);
    },

    async listSlugs() {
      const categories = await deps.categories.findAll();
      return categories.map((category) => category.slug);
    },
  };
}
