import { categories } from "@/data/categories";
import { editorialImages } from "@/data/editorial";
import { listPhotoCredits } from "@/data/photos";
import { producedItems } from "@/data/productions";
import { producers } from "@/data/producers";
import { products } from "@/data/products";
import type { Repositories } from "../contracts";
import {
  createInMemoryCategoryRepository,
  createInMemoryMediaRepository,
  createInMemoryProducedItemRepository,
  createInMemoryProducerRepository,
  createInMemoryProductRepository,
} from "./in-memory-repositories";

export function createMockRepositories(): Repositories {
  return {
    producers: createInMemoryProducerRepository(producers),
    producedItems: createInMemoryProducedItemRepository(producedItems),
    products: createInMemoryProductRepository(products),
    categories: createInMemoryCategoryRepository(categories),
    media: createInMemoryMediaRepository(listPhotoCredits(), editorialImages),
  };
}
