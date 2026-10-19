import type { Breeder } from "@/domain/producer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const ranchDeMeiganga: Breeder = {
  id: "producer-15",
  slug: "ranch-des-collines-de-meiganga",
  type: "breeder",
  farmName: "Ranch des collines de Meiganga",
  producerName: "Aminou Daouda",
  tagline: text(
    "Zébus Goudali conduits en pâturage tournant sur les plateaux de l'Adamaoua.",
    "Gudali zebu cattle grazed in rotation on the Adamawa plateaus.",
  ),
  presentation: text(
    "Aminou Daouda élève un troupeau d'environ cent vingt zébus Goudali et Mbororo rouges sur des parcelles clôturées autour de Meiganga. Le ranch produit des bovins de boucherie et un peu de lait, transformé en lait caillé pour les familles de la concession.",
    "Aminou Daouda keeps a herd of around one hundred and twenty Gudali and red Mbororo zebu on fenced paddocks around Meiganga. The ranch raises beef cattle and produces a little milk, made into soured milk for the families living on the compound.",
  ),
  story: text(
    "Issu d'une famille d'éleveurs transhumants, Aminou a choisi de sédentariser une partie du troupeau en 2005. Il a délimité des parcelles, planté des fourrages et aménagé des points d'eau pour limiter les longs déplacements en saison sèche.",
    "Born into a family of transhumant herders, Aminou chose to settle part of the herd in 2005. He divided the land into paddocks, planted fodder and set up watering points to limit long journeys during the dry season.",
  ),
  location: { city: "Meiganga", regionId: "adamawa" },
  specialtyIds: ["beef-cattle"],
  practiceIds: ["rotational-grazing", "fodder-crops"],
  livestock: [
    {
      speciesId: "cattle",
      description: text(
        "Environ 120 zébus Goudali et Mbororo rouges, dont une quarantaine de vaches reproductrices.",
        "Around 120 Gudali and red Mbororo zebu, including some forty breeding cows.",
      ),
    },
  ],
  commitments: [
    text("Rotation des animaux entre six parcelles pour laisser repousser l'herbe.", "Cattle are rotated between six paddocks so the grass can grow back."),
    text("Points d'eau aménagés pour éviter les longs trajets en saison sèche.", "Watering points set up to avoid long treks in the dry season."),
    text("Données d'élevage fictives fournies pour la démonstration.", "Fictional farming data provided for the demonstration."),
  ],
  production: {
    type: "livestock",
    steps: [
      step(
        "housing",
        text("Parcs de nuit et points d'eau", "Night pens and watering points"),
        text(
          "Les animaux passent la nuit dans des parcs en bois proches de la concession. Deux abreuvoirs alimentés par un forage et une mare aménagée desservent les parcelles.",
          "The cattle spend the night in wooden pens near the compound. Two troughs fed by a borehole and a managed pond supply water to the paddocks.",
        ),
        photo("zebu-herd-mbororo"),
      ),
      step(
        "husbandry",
        text("Pâturage tournant", "Rotational grazing"),
        text(
          "Le troupeau change de parcelle toutes les deux à trois semaines selon l'état de l'herbe. Les bouviers conduisent les animaux le matin et les ramènent avant la nuit.",
          "The herd moves to a new paddock every two to three weeks depending on the state of the grass. Herders take the cattle out in the morning and bring them back before nightfall.",
        ),
      ),
      step(
        "feeding",
        text("Alimentation au fil des saisons", "Feeding through the seasons"),
        text(
          "En saison des pluies, les zébus pâturent l'herbe naturelle et des parcelles de Brachiaria semées par l'éleveur. En saison sèche, la ration est complétée par du foin, des fanes d'arachide et des pierres à lécher.",
          "In the rainy season the zebu graze natural grass and Brachiaria plots sown by the rancher. In the dry season their diet is topped up with hay, groundnut haulms and mineral licks.",
        ),
        photo("zebu-cameroon"),
      ),
      step(
        "animalHealth",
        text("Santé et bien-être", "Health and welfare"),
        text(
          "L'éleveur indique déparasiter le troupeau deux fois par an et suivre les campagnes de vaccination organisées avec les services vétérinaires. Les animaux malades sont isolés dans un parc séparé.",
          "The rancher reports deworming the herd twice a year and following vaccination campaigns run with the veterinary services. Sick animals are kept apart in a separate pen.",
        ),
      ),
      step(
        "reproduction",
        text("Reproduction", "Breeding"),
        text(
          "Deux taureaux Goudali assurent la monte naturelle. Les vêlages sont regroupés en début de saison des pluies, lorsque l'herbe est abondante.",
          "Two Gudali bulls are used for natural mating. Calving is grouped at the start of the rainy season, when grass is plentiful.",
        ),
      ),
      step(
        "growth",
        text("Croissance des jeunes", "Raising young stock"),
        text(
          "Les veaux restent sous la mère jusqu'au sevrage, vers huit mois. Les jeunes mâles sont ensuite élevés au pâturage pendant deux à trois ans avant de quitter le ranch.",
          "Calves stay with their mothers until weaning at about eight months. Young males are then raised on pasture for two to three years before leaving the ranch.",
        ),
      ),
    ],
  },
  coverImage: photo("zebu-head-cameroon"),
  gallery: [photo("zebu-cameroon"), photo("zebu-herd-mbororo"), photo("mont-ngaoundere")],
  foundedYear: 2005,
  areaHectares: 85,
  featured: true,
};
