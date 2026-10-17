import type { Category, CategoryId } from "@/domain/category";
import type { Farmer } from "@/domain/farmer";
import type { EditorialSlot, ImageAsset, PhotoCredit } from "@/domain/media";
import type { Product } from "@/domain/product";
import type { CategoryRepository, FarmerRepository, MediaRepository, ProductRepository } from "../contracts";

export function createInMemoryFarmerRepository(farmers: readonly Farmer[]): FarmerRepository {
  return {
    async findAll() {
      return farmers;
    },
    async findById(id) {
      return farmers.find((farmer) => farmer.id === id) ?? null;
    },
    async findBySlug(slug) {
      return farmers.find((farmer) => farmer.slug === slug) ?? null;
    },
  };
}

export function createInMemoryProductRepository(products: readonly Product[]): ProductRepository {
  return {
    async findAll() {
      return products;
    },
    async findBySlug(slug) {
      return products.find((product) => product.slug === slug) ?? null;
    },
    async findByFarmerId(farmerId) {
      return products.filter((product) => product.farmerId === farmerId);
    },
    async findByCategoryId(categoryId: CategoryId) {
      return products.filter((product) => product.categoryId === categoryId);
    },
  };
}

export function createInMemoryCategoryRepository(categories: readonly Category[]): CategoryRepository {
  return {
    async findAll() {
      return categories;
    },
    async findById(id) {
      return categories.find((category) => category.id === id) ?? null;
    },
    async findBySlug(slug) {
      return categories.find((category) => category.slug === slug) ?? null;
    },
  };
}

export function createInMemoryMediaRepository(
  credits: readonly PhotoCredit[],
  editorial: Readonly<Partial<Record<EditorialSlot, ImageAsset>>>,
): MediaRepository {
  return {
    async listPhotoCredits() {
      return credits;
    },
    async findEditorialImage(slot) {
      return editorial[slot] ?? null;
    },
  };
}
