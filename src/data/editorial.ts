import type { EditorialSlot, ImageAsset } from "@/domain/media";
import { text } from "./helpers";
import { photo } from "./photos";

export const editorialImages: Readonly<Record<EditorialSlot, ImageAsset>> = {
  hero: {
    src: "/images/editorial/agro-marks-hero.jpg",
    width: 1600,
    height: 1360,
    alt: text(
      "Illustration : pick-up chargés de récoltes et d'animaux d'élevage sur une piste, entre des maisons en bois et la forêt",
      "Illustration: pick-up trucks loaded with harvests and livestock on a dirt road between wooden houses and the forest",
    ),
  },
  practices: photo("hoe-field"),
  about: photo("harvest-display"),
};
