import type { LocalizedText } from "./locale";
import type { ImageAsset } from "./media";
import type { ProductionProcess } from "./production";
import type { Location } from "./region";

export const specialtyIds = [
  "market-gardening",
  "highland-vegetables",
  "leafy-vegetables",
  "arabica-coffee",
  "pepper",
  "cocoa",
  "plantain",
  "tubers",
  "fruit-orchards",
  "pineapple",
  "avocado",
  "rice",
  "cereals",
  "legumes",
  "onions",
  "beekeeping",
  "poultry",
] as const;

export type SpecialtyId = (typeof specialtyIds)[number];

export const practiceIds = [
  "agroforestry",
  "crop-rotation",
  "intercropping",
  "composting",
  "mulching",
  "rain-fed",
  "drip-irrigation",
  "manual-weeding",
  "integrated-pest-management",
  "free-range",
  "seed-saving",
  "sun-drying",
] as const;

export type PracticeId = (typeof practiceIds)[number];

export interface Farmer {
  readonly id: string;
  readonly slug: string;
  readonly farmName: string;
  readonly producerName: string;
  readonly tagline: LocalizedText;
  readonly presentation: LocalizedText;
  readonly story: LocalizedText;
  readonly location: Location;
  readonly specialtyIds: readonly SpecialtyId[];
  readonly practiceIds: readonly PracticeId[];
  readonly commitments: readonly LocalizedText[];
  readonly production: ProductionProcess;
  readonly coverImage: ImageAsset;
  readonly gallery: readonly ImageAsset[];
  readonly foundedYear: number;
  readonly areaHectares: number;
  readonly featured: boolean;
  readonly whatsappNumber?: string;
}
