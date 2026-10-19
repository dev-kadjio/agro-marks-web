import type { LocalizedText } from "./locale";
import type { ImageAsset } from "./media";
import type { AnimalProductionProcess, CropProductionProcess } from "./production";
import type { Location } from "./region";

export const producerTypes = ["farmer", "breeder"] as const;

export type ProducerType = (typeof producerTypes)[number];

export function isProducerType(value: unknown): value is ProducerType {
  return typeof value === "string" && (producerTypes as readonly string[]).includes(value);
}

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
  "broiler-chickens",
  "duck-farming",
  "beef-cattle",
  "dairy",
  "pig-farming",
  "small-ruminants",
  "fish-farming",
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
  "rotational-grazing",
  "fodder-crops",
  "on-farm-feed",
  "water-quality-monitoring",
] as const;

export type PracticeId = (typeof practiceIds)[number];

export const speciesIds = ["chicken", "duck", "cattle", "pig", "goat", "sheep", "tilapia", "catfish", "honeybee"] as const;

export type SpeciesId = (typeof speciesIds)[number];

export interface LivestockGroup {
  readonly speciesId: SpeciesId;
  readonly description: LocalizedText;
}

interface ProducerBase {
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
  readonly coverImage: ImageAsset;
  readonly gallery: readonly ImageAsset[];
  readonly foundedYear: number;
  readonly areaHectares: number;
  readonly featured: boolean;
  readonly whatsappNumber?: string;
}

export interface Farmer extends ProducerBase {
  readonly type: "farmer";
  readonly production: CropProductionProcess;
}

export interface Breeder extends ProducerBase {
  readonly type: "breeder";
  readonly livestock: readonly LivestockGroup[];
  readonly production: AnimalProductionProcess;
}

export type Producer = Farmer | Breeder;
