import type { LocalizedText } from "./locale";
import type { ImageAsset } from "./media";

export interface ProductionStep {
  readonly title: LocalizedText;
  readonly description: LocalizedText;
  readonly image?: ImageAsset;
}

export interface CropProductionProcess {
  readonly type: "crop";
  readonly soilPreparation: ProductionStep;
  readonly sowingOrPlanting: ProductionStep;
  readonly cropCare: ProductionStep;
  readonly irrigation?: ProductionStep;
  readonly cropProtection?: ProductionStep;
  readonly harvest: ProductionStep;
  readonly postHarvest: ProductionStep;
}

export interface LivestockProductionProcess {
  readonly type: "livestock";
  readonly housing: ProductionStep;
  readonly feeding: ProductionStep;
  readonly animalHealth: ProductionStep;
  readonly collection: ProductionStep;
  readonly postHarvest: ProductionStep;
}

export interface BeekeepingProductionProcess {
  readonly type: "beekeeping";
  readonly apiarySetup: ProductionStep;
  readonly colonyCare: ProductionStep;
  readonly harvest: ProductionStep;
  readonly postHarvest: ProductionStep;
}

export type ProductionProcess =
  | CropProductionProcess
  | LivestockProductionProcess
  | BeekeepingProductionProcess;

export type ProductionProcessType = ProductionProcess["type"];
