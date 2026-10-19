import type { Category, CategoryId } from "@/domain/category";
import type { EditorialSlot, ImageAsset, PhotoCredit } from "@/domain/media";
import type { ProducedItem } from "@/domain/produced-item";
import type { Producer } from "@/domain/producer";
import type { Product } from "@/domain/product";

export interface ProducerRepository {
  findAll(): Promise<readonly Producer[]>;
  findById(id: string): Promise<Producer | null>;
  findBySlug(slug: string): Promise<Producer | null>;
}

export interface ProducedItemRepository {
  findAll(): Promise<readonly ProducedItem[]>;
  findByProducerId(producerId: string): Promise<readonly ProducedItem[]>;
}

export interface ProductRepository {
  findAll(): Promise<readonly Product[]>;
  findBySlug(slug: string): Promise<Product | null>;
  findByProducerId(producerId: string): Promise<readonly Product[]>;
  findByCategoryId(categoryId: CategoryId): Promise<readonly Product[]>;
}

export interface CategoryRepository {
  findAll(): Promise<readonly Category[]>;
  findById(id: CategoryId): Promise<Category | null>;
  findBySlug(slug: string): Promise<Category | null>;
}

export interface MediaRepository {
  listPhotoCredits(): Promise<readonly PhotoCredit[]>;
  findEditorialImage(slot: EditorialSlot): Promise<ImageAsset | null>;
}

export const slugCollections = ["producers", "products", "categories"] as const;

export type SlugCollection = (typeof slugCollections)[number];

export interface SlugIndex {
  has(collection: SlugCollection, slug: string): boolean;
}

export interface Repositories {
  readonly producers: ProducerRepository;
  readonly producedItems: ProducedItemRepository;
  readonly products: ProductRepository;
  readonly categories: CategoryRepository;
  readonly media: MediaRepository;
}
