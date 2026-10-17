import { categories } from "@/data/categories";
import { editorialImages } from "@/data/editorial";
import { farmers } from "@/data/farmers";
import { listPhotoCredits } from "@/data/photos";
import { products } from "@/data/products";
import type { Repositories } from "../contracts";
import {
  createInMemoryCategoryRepository,
  createInMemoryFarmerRepository,
  createInMemoryMediaRepository,
  createInMemoryProductRepository,
} from "./in-memory-repositories";

export function createMockRepositories(): Repositories {
  return {
    farmers: createInMemoryFarmerRepository(farmers),
    products: createInMemoryProductRepository(products),
    categories: createInMemoryCategoryRepository(categories),
    media: createInMemoryMediaRepository(listPhotoCredits(), editorialImages),
  };
}
