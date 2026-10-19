import { categories } from "@/data/categories";
import { producers } from "@/data/producers";
import { products } from "@/data/products";
import type { SlugCollection, SlugIndex } from "../contracts";

export function createSlugIndex(slugs: Readonly<Record<SlugCollection, readonly string[]>>): SlugIndex {
  const sets = {
    producers: new Set(slugs.producers),
    products: new Set(slugs.products),
    categories: new Set(slugs.categories),
  };
  return {
    has: (collection, slug) => sets[collection].has(slug),
  };
}

export function createMockSlugIndex(): SlugIndex {
  return createSlugIndex({
    producers: producers.map((producer) => producer.slug),
    products: products.map((product) => product.slug),
    categories: categories.map((category) => category.slug),
  });
}
