import type { Month } from "@/domain/calendar";
import type { CategoryId } from "@/domain/category";
import type { PracticeId, SpecialtyId } from "@/domain/farmer";
import type { ProductionProcessType } from "@/domain/production";
import type { Money, ProductAvailability, SaleUnit } from "@/domain/product";
import type { RegionId } from "@/domain/region";

export interface PhotoView {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

export interface FarmerSummary {
  readonly id: string;
  readonly slug: string;
  readonly farmName: string;
  readonly producerName: string;
  readonly tagline: string;
  readonly city: string;
  readonly regionId: RegionId;
  readonly specialtyIds: readonly SpecialtyId[];
  readonly categoryIds: readonly CategoryId[];
  readonly productCount: number;
  readonly hasAvailableProducts: boolean;
  readonly featured: boolean;
  readonly photo: PhotoView;
  readonly whatsappNumber: string | null;
  readonly searchText: string;
}

export type ProductionStageKey =
  | "soilPreparation"
  | "sowingOrPlanting"
  | "cropCare"
  | "irrigation"
  | "cropProtection"
  | "harvest"
  | "postHarvest"
  | "housing"
  | "feeding"
  | "animalHealth"
  | "collection"
  | "apiarySetup"
  | "colonyCare";

export interface ProductionStageView {
  readonly key: ProductionStageKey;
  readonly title: string;
  readonly description: string;
  readonly photo?: PhotoView;
}

export interface FarmerProfile extends FarmerSummary {
  readonly presentation: string;
  readonly story: string;
  readonly practiceIds: readonly PracticeId[];
  readonly commitments: readonly string[];
  readonly productionType: ProductionProcessType;
  readonly production: readonly ProductionStageView[];
  readonly gallery: readonly PhotoView[];
  readonly foundedYear: number;
  readonly areaHectares: number;
}

export interface ProductFarmerRef {
  readonly id: string;
  readonly slug: string;
  readonly farmName: string;
  readonly city: string;
  readonly regionId: RegionId;
  readonly whatsappNumber: string | null;
}

export interface ProductSummary {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly categoryId: CategoryId;
  readonly categorySlug: string;
  readonly categoryName: string;
  readonly farmer: ProductFarmerRef;
  readonly photo: PhotoView;
  readonly price: Money;
  readonly unit: SaleUnit;
  readonly availability: ProductAvailability;
  readonly listedAt: string;
  readonly popularity: number;
  readonly featured: boolean;
  readonly searchText: string;
}

export interface ProductDetail extends ProductSummary {
  readonly description: string;
  readonly gallery: readonly PhotoView[];
  readonly harvestMonths: readonly Month[];
}

export interface CategorySummary {
  readonly id: CategoryId;
  readonly slug: string;
  readonly name: string;
  readonly summary: string;
  readonly photo: PhotoView;
  readonly productCount: number;
}

export interface CategoryDetail extends CategorySummary {
  readonly introduction: string;
}

export interface Option<T extends string> {
  readonly value: T;
  readonly label: string;
}

export interface Paginated<T> {
  readonly items: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly pageCount: number;
  readonly pageSize: number;
}
