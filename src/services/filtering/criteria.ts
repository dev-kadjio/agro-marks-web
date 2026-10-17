import type { CategoryId } from "@/domain/category";
import type { SpecialtyId } from "@/domain/farmer";
import type { RegionId } from "@/domain/region";

export const farmerSortOptions = ["relevance", "name-asc", "name-desc"] as const;
export type FarmerSort = (typeof farmerSortOptions)[number];

export interface FarmerFilterCriteria {
  readonly query?: string;
  readonly regionId?: RegionId;
  readonly specialtyId?: SpecialtyId;
  readonly categoryId?: CategoryId;
  readonly availableOnly: boolean;
  readonly sort: FarmerSort;
  readonly page: number;
}

export const productSortOptions = ["relevance", "price-asc", "price-desc", "name-asc", "newest"] as const;
export type ProductSort = (typeof productSortOptions)[number];

export const availabilityFilterOptions = ["available", "pre-order", "out-of-season"] as const;
export type AvailabilityFilter = (typeof availabilityFilterOptions)[number];

export interface ProductFilterCriteria {
  readonly query?: string;
  readonly categoryId?: CategoryId;
  readonly farmerSlug?: string;
  readonly regionId?: RegionId;
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly availability?: AvailabilityFilter;
  readonly sort: ProductSort;
  readonly page: number;
}

export const defaultFarmerCriteria: FarmerFilterCriteria = {
  availableOnly: false,
  sort: "relevance",
  page: 1,
};

export const defaultProductCriteria: ProductFilterCriteria = {
  sort: "relevance",
  page: 1,
};
