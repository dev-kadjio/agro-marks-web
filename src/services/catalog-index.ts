import type { Category, CategoryId } from "@/domain/category";
import type { Farmer } from "@/domain/farmer";
import type { Locale } from "@/domain/locale";
import type { Product } from "@/domain/product";
import type { CategoryRepository, FarmerRepository, ProductRepository } from "@/repositories/contracts";
import { toProductSummary } from "./mappers";
import type { ProductSummary } from "./view-models";

export interface CatalogDependencies {
  readonly farmers: FarmerRepository;
  readonly products: ProductRepository;
  readonly categories: CategoryRepository;
}

export interface CatalogIndex {
  readonly farmersById: ReadonlyMap<string, Farmer>;
  readonly categoriesById: ReadonlyMap<CategoryId, Category>;
  readonly products: readonly Product[];
}

export async function loadCatalogIndex(deps: CatalogDependencies): Promise<CatalogIndex> {
  const [farmers, categories, products] = await Promise.all([
    deps.farmers.findAll(),
    deps.categories.findAll(),
    deps.products.findAll(),
  ]);
  return {
    farmersById: new Map(farmers.map((farmer) => [farmer.id, farmer])),
    categoriesById: new Map(categories.map((category) => [category.id, category])),
    products,
  };
}

export function summarizeProducts(
  index: CatalogIndex,
  products: readonly Product[],
  locale: Locale,
): ProductSummary[] {
  return products.flatMap((product) => {
    const farmer = index.farmersById.get(product.farmerId);
    const category = index.categoriesById.get(product.categoryId);
    return farmer && category ? [toProductSummary(product, farmer, category, locale)] : [];
  });
}

export function groupProductsByFarmer(products: readonly Product[]): ReadonlyMap<string, readonly Product[]> {
  const groups = new Map<string, Product[]>();
  for (const product of products) {
    const group = groups.get(product.farmerId);
    if (group) {
      group.push(product);
    } else {
      groups.set(product.farmerId, [product]);
    }
  }
  return groups;
}
