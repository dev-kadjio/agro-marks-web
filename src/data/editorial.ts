import type { EditorialSlot, ImageAsset } from "@/domain/media";
import { photo } from "./photos";

export const editorialImages: Readonly<Record<EditorialSlot, ImageAsset>> = {
  hero: photo("sorting-produce"),
  practices: photo("hoe-field"),
  about: photo("harvest-display"),
};
