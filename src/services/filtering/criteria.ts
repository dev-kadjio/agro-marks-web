import type { CategoryId } from "@/domain/category";
import type { ProducerType, SpecialtyId } from "@/domain/producer";
import type { RegionId } from "@/domain/region";

export const producerSortOptions = ["relevance", "name-asc", "name-desc"] as const;
export type ProducerSort = (typeof producerSortOptions)[number];

export interface ProducerFilterCriteria {
  readonly query?: string;
  readonly type?: ProducerType;
  readonly regionId?: RegionId;
  readonly city?: string;
  readonly specialtyId?: SpecialtyId;
  readonly categoryId?: CategoryId;
  readonly sort: ProducerSort;
  readonly page: number;
}

export const productSortOptions = ["relevance", "price-asc", "price-desc", "name-asc", "newest"] as const;
export type ProductSort = (typeof productSortOptions)[number];

export const availabilityFilterOptions = ["available", "pre-order", "out-of-season"] as const;
export type AvailabilityFilter = (typeof availabilityFilterOptions)[number];

export interface ProductFilterCriteria {
  readonly query?: string;
  readonly categoryId?: CategoryId;
  readonly producerSlug?: string;
  readonly regionId?: RegionId;
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly availability?: AvailabilityFilter;
  readonly sort: ProductSort;
  readonly page: number;
}

export const defaultProducerCriteria: ProducerFilterCriteria = {
  sort: "relevance",
  page: 1,
};

export const defaultProductCriteria: ProductFilterCriteria = {
  sort: "relevance",
  page: 1,
};
