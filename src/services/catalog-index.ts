import type { Category, CategoryId } from "@/domain/category";
import type { Locale } from "@/domain/locale";
import type { Producer } from "@/domain/producer";
import type { Product } from "@/domain/product";
import type { CategoryRepository, ProducerRepository, ProductRepository } from "@/repositories/contracts";
import { toProductSummary } from "./mappers";
import type { ProductSummary } from "./view-models";

export interface CatalogDependencies {
  readonly producers: ProducerRepository;
  readonly products: ProductRepository;
  readonly categories: CategoryRepository;
}

export interface CatalogIndex {
  readonly producersById: ReadonlyMap<string, Producer>;
  readonly categoriesById: ReadonlyMap<CategoryId, Category>;
  readonly products: readonly Product[];
}

export async function loadCatalogIndex(deps: CatalogDependencies): Promise<CatalogIndex> {
  const [producers, categories, products] = await Promise.all([
    deps.producers.findAll(),
    deps.categories.findAll(),
    deps.products.findAll(),
  ]);
  return {
    producersById: new Map(producers.map((producer) => [producer.id, producer])),
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
    const producer = index.producersById.get(product.producerId);
    const category = index.categoriesById.get(product.categoryId);
    return producer && category ? [toProductSummary(product, producer, category, locale)] : [];
  });
}

export function groupByProducer<T extends { readonly producerId: string }>(items: readonly T[]): ReadonlyMap<string, readonly T[]> {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const group = groups.get(item.producerId);
    if (group) {
      group.push(item);
    } else {
      groups.set(item.producerId, [item]);
    }
  }
  return groups;
}
