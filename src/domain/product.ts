import type { Month } from "./calendar";
import type { ImageAsset } from "./media";
import type { ProducedItem } from "./produced-item";

export const currencies = ["XAF"] as const;

export type Currency = (typeof currencies)[number];

export interface Money {
  readonly amount: number;
  readonly currency: Currency;
}

export const saleUnits = [
  "kg",
  "bag-25kg",
  "bag-50kg",
  "bunch",
  "basket",
  "bundle",
  "crate",
  "tray-30",
  "jar-500g",
  "jar-1kg",
  "liter",
  "piece",
  "pack-250g",
  "pack-500g",
  "bucket-5l",
] as const;

export type SaleUnit = (typeof saleUnits)[number];

export type ProductAvailability =
  | { readonly status: "in-stock" }
  | { readonly status: "limited" }
  | { readonly status: "pre-order"; readonly expectedMonth: Month }
  | { readonly status: "out-of-season"; readonly nextSeasonMonth: Month };

export type AvailabilityStatus = ProductAvailability["status"];

export interface Product extends ProducedItem {
  readonly slug: string;
  readonly gallery: readonly ImageAsset[];
  readonly price: Money;
  readonly unit: SaleUnit;
  readonly availability: ProductAvailability;
  readonly listedAt: string;
  readonly popularity: number;
  readonly featured: boolean;
}

export function isCurrentlyAvailable(availability: ProductAvailability): boolean {
  return availability.status === "in-stock" || availability.status === "limited";
}
