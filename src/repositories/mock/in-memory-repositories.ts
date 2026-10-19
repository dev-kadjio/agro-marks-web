import type { Category, CategoryId } from "@/domain/category";
import type { EditorialSlot, ImageAsset, PhotoCredit } from "@/domain/media";
import type { ProducedItem } from "@/domain/produced-item";
import type { Producer } from "@/domain/producer";
import type { Product } from "@/domain/product";
import type {
  CategoryRepository,
  MediaRepository,
  ProducedItemRepository,
  ProducerRepository,
  ProductRepository,
} from "../contracts";

export function createInMemoryProducerRepository(producers: readonly Producer[]): ProducerRepository {
  return {
    async findAll() {
      return producers;
    },
    async findById(id) {
      return producers.find((producer) => producer.id === id) ?? null;
    },
    async findBySlug(slug) {
      return producers.find((producer) => producer.slug === slug) ?? null;
    },
  };
}

export function createInMemoryProducedItemRepository(items: readonly ProducedItem[]): ProducedItemRepository {
  return {
    async findAll() {
      return items;
    },
    async findByProducerId(producerId) {
      return items.filter((item) => item.producerId === producerId);
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
    async findByProducerId(producerId) {
      return products.filter((product) => product.producerId === producerId);
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
