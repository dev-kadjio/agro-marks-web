import type { Farmer } from "@/domain/producer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const cafeierDeFoumbot: Farmer = {
  id: "producer-02",
  slug: "domaine-cafeier-de-foumbot",
  type: "farmer",
  farmName: "Domaine caféier de Foumbot",
  producerName: "Abdou Njoya",
  tagline: text(
    "Café arabica cultivé sous ombrage sur les sols volcaniques du Noun.",
    "Shade-grown arabica coffee on the volcanic soils of the Noun division.",
  ),
  presentation: text(
    "Abdou Njoya entretient une caféière familiale associée à des bananiers, des avocatiers et des haricots. Il transforme lui-même une partie de sa récolte en café vert lavé et en café torréfié.",
    "Abdou Njoya looks after a family coffee farm intercropped with banana trees, avocado trees and beans. He processes part of his harvest himself into washed green coffee and roasted coffee.",
  ),
  story: text(
    "Les premiers caféiers ont été plantés par le grand-père d'Abdou. Après plusieurs années de prix bas, la famille a choisi de remplacer progressivement les vieux arbres et de vendre une partie du café en direct pour mieux valoriser le travail de tri.",
    "The first coffee trees were planted by Abdou's grandfather. After several years of low prices, the family chose to gradually replace the old trees and sell part of the coffee directly to get more value from the sorting work.",
  ),
  location: { city: "Foumbot", regionId: "west" },
  specialtyIds: ["arabica-coffee", "legumes"],
  practiceIds: ["agroforestry", "intercropping", "manual-weeding", "sun-drying"],
  commitments: [
    text("Cueillette sélective des cerises mûres uniquement.", "Selective picking of ripe cherries only."),
    text("Ombrage maintenu par des arbres fruitiers.", "Shade maintained with fruit trees."),
    text("Aucune certification n'est revendiquée dans cette démonstration.", "No certification is claimed in this demonstration."),
  ],
  production: {
    type: "crop",
    steps: [
      step(
        "soilPreparation",
        text("Préparation des trous de plantation", "Preparing planting holes"),
        text(
          "Les trous de plantation sont creusés plusieurs semaines avant la mise en place des plants et remplis de terre de surface mélangée à de la pulpe de café compostée.",
          "Planting holes are dug several weeks before planting and filled with topsoil mixed with composted coffee pulp.",
        ),
        photo("hoe-field"),
      ),
      step(
        "sowingOrPlanting",
        text("Plantation sous ombrage", "Planting under shade"),
        text(
          "Les jeunes caféiers issus de pépinière sont plantés au début de la saison des pluies, entre des bananiers qui apportent un ombrage temporaire.",
          "Young coffee trees raised in a nursery are planted at the start of the rainy season between banana plants that provide temporary shade.",
        ),
      ),
      step(
        "cropCare",
        text("Taille et entretien", "Pruning and upkeep"),
        text(
          "Taille annuelle après la récolte, recépage des arbres âgés et désherbage manuel. Des haricots sont semés dans les interlignes pendant la première saison des pluies.",
          "Annual pruning after harvest, rejuvenation of old trees and hand weeding. Beans are sown between the rows during the first rainy season.",
        ),
      ),
      step(
        "cropProtection",
        text("Surveillance sanitaire", "Health monitoring"),
        text(
          "Le producteur ramasse les cerises tombées au sol pour limiter le scolyte et surveille l'apparition de la rouille sur les feuilles.",
          "The grower collects fallen cherries to limit coffee berry borer and watches for leaf rust.",
        ),
      ),
      step(
        "harvest",
        text("Cueillette sélective", "Selective picking"),
        text(
          "D'octobre à janvier, plusieurs passages sont effectués pour ne cueillir que les cerises rouges.",
          "From October to January, several passes are made so that only red cherries are picked.",
        ),
        photo("coffee-cherries"),
      ),
      step(
        "postHarvest",
        text("Traitement par voie humide et tri", "Wet processing and sorting"),
        text(
          "Les cerises sont dépulpées le jour même, fermentées une trentaine d'heures, lavées puis séchées sur claies pendant deux à trois semaines. Les grains défectueux sont retirés à la main et le café est stocké en sacs de jute sur palettes.",
          "Cherries are pulped the same day, fermented for around thirty hours, washed and then dried on raised beds for two to three weeks. Defective beans are removed by hand and the coffee is stored in jute bags on pallets.",
        ),
        photo("coffee-sorting"),
      ),
    ],
  },
  coverImage: photo("coffee-cherries"),
  gallery: [photo("green-coffee"), photo("coffee-sorting"), photo("roasted-coffee"), photo("red-beans")],
  foundedYear: 1998,
  areaHectares: 4,
  featured: true,
};
