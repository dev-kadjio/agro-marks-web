import type { LocalizedText } from "./locale";
import type { ImageAsset } from "./media";

export const categoryIds = [
  "vegetables",
  "fruits",
  "tubers-plantains",
  "cereals-legumes",
  "cocoa-coffee",
  "spices-condiments",
  "honey",
  "eggs-poultry",
] as const;

export type CategoryId = (typeof categoryIds)[number];

export interface Category {
  readonly id: CategoryId;
  readonly slug: string;
  readonly name: LocalizedText;
  readonly summary: LocalizedText;
  readonly introduction: LocalizedText;
  readonly image: ImageAsset;
}
