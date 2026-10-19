import "server-only";
import { createMockRepositories } from "@/repositories/mock";
import { createCategoryService } from "./category-service";
import { createMediaService } from "./media-service";
import { createProducerService } from "./producer-service";
import { createProductService } from "./product-service";

const repositories = createMockRepositories();

export const producerService = createProducerService(repositories);
export const productService = createProductService(repositories);
export const categoryService = createCategoryService(repositories);
export const mediaService = createMediaService(repositories);
