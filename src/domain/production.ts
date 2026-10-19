import type { LocalizedText } from "./locale";
import type { ImageAsset } from "./media";

export const productionStages = {
  crop: ["soilPreparation", "sowingOrPlanting", "cropCare", "irrigation", "cropProtection", "harvest", "postHarvest"],
  livestock: ["housing", "husbandry", "feeding", "animalHealth", "growth", "reproduction", "collection", "postHarvest"],
  beekeeping: ["apiarySetup", "colonyCare", "harvest", "postHarvest"],
  aquaculture: ["pondPreparation", "stocking", "feeding", "waterQuality", "harvest", "postHarvest"],
} as const;

export type ProductionProcessType = keyof typeof productionStages;

export type ProductionStageId<T extends ProductionProcessType = ProductionProcessType> = (typeof productionStages)[T][number];

export interface ProductionStep<S extends string = ProductionStageId> {
  readonly stage: S;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
  readonly image?: ImageAsset;
}

export type ProductionProcessOf<T extends ProductionProcessType> = {
  readonly type: T;
  readonly steps: readonly ProductionStep<ProductionStageId<T>>[];
};

export type ProductionProcess = { [T in ProductionProcessType]: ProductionProcessOf<T> }[ProductionProcessType];

export type CropProductionProcess = ProductionProcessOf<"crop">;

export type AnimalProductionProcess = Extract<ProductionProcess, { readonly type: "livestock" | "beekeeping" | "aquaculture" }>;
