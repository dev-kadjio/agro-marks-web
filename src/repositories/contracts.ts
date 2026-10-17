import type { Category, CategoryId } from "@/domain/category";
import type { Farmer } from "@/domain/farmer";
import type { EditorialSlot, ImageAsset, PhotoCredit } from "@/domain/media";
import type { Product } from "@/domain/product";

export interface FarmerRepository {
  findAll(): Promise<readonly Farmer[]>;
  findById(id: string): Promise<Farmer | null>;
  findBySlug(slug: string): Promise<Farmer | null>;
}

export interface ProductRepository {
  findAll(): Promise<readonly Product[]>;
  findBySlug(slug: string): Promise<Product | null>;
  findByFarmerId(farmerId: string): Promise<readonly Product[]>;
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

export const slugCollections = ["farmers", "products", "categories"] as const;

export type SlugCollection = (typeof slugCollections)[number];

export interface SlugIndex {
  has(collection: SlugCollection, slug: string): boolean;
}

export interface Repositories {
  readonly farmers: FarmerRepository;
  readonly products: ProductRepository;
  readonly categories: CategoryRepository;
  readonly media: MediaRepository;
}
