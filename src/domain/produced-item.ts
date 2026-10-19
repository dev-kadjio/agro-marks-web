import type { Month } from "./calendar";
import type { CategoryId } from "./category";
import type { LocalizedText } from "./locale";
import type { ImageAsset } from "./media";

export interface ProducedItem {
  readonly id: string;
  readonly name: LocalizedText;
  readonly description: LocalizedText;
  readonly categoryId: CategoryId;
  readonly producerId: string;
  readonly image: ImageAsset;
  readonly harvestMonths: readonly Month[];
}
