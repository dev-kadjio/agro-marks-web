import { categories } from "@/data/categories";
import { farmers } from "@/data/farmers";
import { products } from "@/data/products";
import type { SlugCollection, SlugIndex } from "../contracts";

export function createSlugIndex(slugs: Readonly<Record<SlugCollection, readonly string[]>>): SlugIndex {
  const sets = {
    farmers: new Set(slugs.farmers),
    products: new Set(slugs.products),
    categories: new Set(slugs.categories),
  };
  return {
    has: (collection, slug) => sets[collection].has(slug),
  };
}

export function createMockSlugIndex(): SlugIndex {
  return createSlugIndex({
    farmers: farmers.map((farmer) => farmer.slug),
    products: products.map((product) => product.slug),
    categories: categories.map((category) => category.slug),
  });
}
