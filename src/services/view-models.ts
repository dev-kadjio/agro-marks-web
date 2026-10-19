import type { Month } from "@/domain/calendar";
import type { CategoryId } from "@/domain/category";
import type { PracticeId, ProducerType, SpeciesId, SpecialtyId } from "@/domain/producer";
import type { ProductionProcessType, ProductionStageId } from "@/domain/production";
import type { Money, ProductAvailability, SaleUnit } from "@/domain/product";
import type { RegionId } from "@/domain/region";

export interface PhotoView {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

export interface ProducerSummary {
  readonly id: string;
  readonly slug: string;
  readonly type: ProducerType;
  readonly farmName: string;
  readonly producerName: string;
  readonly tagline: string;
  readonly city: string;
  readonly regionId: RegionId;
  readonly specialtyIds: readonly SpecialtyId[];
  readonly categoryIds: readonly CategoryId[];
  readonly featured: boolean;
  readonly photo: PhotoView;
  readonly whatsappNumber: string | null;
  readonly searchText: string;
}

export interface ProductionStageView {
  readonly key: ProductionStageId;
  readonly title: string;
  readonly description: string;
  readonly photo?: PhotoView;
}

export interface ProductionView {
  readonly type: ProductionProcessType;
  readonly stages: readonly ProductionStageView[];
}

export interface LivestockView {
  readonly speciesId: SpeciesId;
  readonly description: string;
}

export interface ProducedItemView {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly categoryId: CategoryId;
  readonly categoryName: string;
  readonly photo: PhotoView;
  readonly harvestMonths: readonly Month[];
}

export interface ProducerProfile extends ProducerSummary {
  readonly presentation: string;
  readonly story: string;
  readonly practiceIds: readonly PracticeId[];
  readonly commitments: readonly string[];
  readonly production: ProductionView;
  readonly livestock: readonly LivestockView[];
  readonly outputs: readonly ProducedItemView[];
  readonly gallery: readonly PhotoView[];
  readonly foundedYear: number;
  readonly areaHectares: number;
}

export interface ProductProducerRef {
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
  readonly producer: ProductProducerRef;
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
  readonly producerType: ProducerType;
  readonly name: string;
  readonly summary: string;
  readonly photo: PhotoView;
  readonly producerCount: number;
}

export interface CategoryDetail extends CategorySummary {
  readonly introduction: string;
}

export interface Option<T extends string> {
  readonly value: T;
  readonly label: string;
}

export interface FacetScope {
  readonly producerTypes: readonly ProducerType[];
  readonly regionIds: readonly RegionId[];
}

export interface FacetOption<T extends string> extends Option<T>, FacetScope {}

export interface Paginated<T> {
  readonly items: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly pageCount: number;
  readonly pageSize: number;
}
