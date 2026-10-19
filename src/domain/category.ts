import type { LocalizedText } from "./locale";
import type { ImageAsset } from "./media";
import type { ProducerType } from "./producer";

export const categoryIds = [
  "vegetables",
  "fruits",
  "food-crops",
  "cereals-legumes",
  "cash-crops",
  "spices-condiments",
  "poultry-farming",
  "cattle-farming",
  "pig-farming",
  "goat-sheep-farming",
  "fish-farming",
  "beekeeping",
] as const;

export type CategoryId = (typeof categoryIds)[number];

export interface Category {
  readonly id: CategoryId;
  readonly slug: string;
  readonly producerType: ProducerType;
  readonly name: LocalizedText;
  readonly summary: LocalizedText;
  readonly introduction: LocalizedText;
  readonly image: ImageAsset;
}
