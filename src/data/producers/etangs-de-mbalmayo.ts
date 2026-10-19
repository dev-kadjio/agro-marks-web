import type { Breeder } from "@/domain/producer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const etangsDeMbalmayo: Breeder = {
  id: "producer-19",
  slug: "pisciculture-des-etangs-de-mbalmayo",
  type: "breeder",
  farmName: "Pisciculture des étangs de Mbalmayo",
  producerName: "Rose Ngono",
  tagline: text(
    "Tilapias et silures élevés en étangs et en bacs près des rives du Nyong.",
    "Tilapia and catfish raised in ponds and tanks near the banks of the Nyong.",
  ),
  presentation: text(
    "Rose Ngono élève des tilapias du Nil dans deux étangs en terre alimentés par un ruisseau, et des silures dans des bacs hors-sol. Les poissons sont pêchés par lots, environ deux fois par an.",
    "Rose Ngono raises Nile tilapia in two earthen ponds fed by a stream, and catfish in above-ground tanks. Fish are harvested in batches, about twice a year.",
  ),
  story: text(
    "Ancienne institutrice, Rose a creusé son premier étang sur une parcelle familiale inondable. Elle a ensuite installé des bacs pour les silures, plus faciles à surveiller pendant la saison sèche.",
    "A former schoolteacher, Rose dug her first pond on a family plot that floods easily. She later added tanks for catfish, which are easier to monitor during the dry season.",
  ),
  location: { city: "Mbalmayo", regionId: "centre" },
  specialtyIds: ["fish-farming"],
  practiceIds: ["water-quality-monitoring", "composting"],
  livestock: [
    {
      speciesId: "tilapia",
      description: text("Tilapias du Nil élevés dans deux étangs en terre.", "Nile tilapia raised in two earthen ponds."),
    },
    {
      speciesId: "catfish",
      description: text("Silures (Clarias) élevés dans quatre bacs hors-sol.", "Clarias catfish raised in four above-ground tanks."),
    },
  ],
  commitments: [
    text("Contrôle quotidien de la couleur et du niveau de l'eau.", "Daily checks on water colour and level."),
    text("Vase des étangs réutilisée comme amendement pour le potager.", "Pond silt reused to enrich the vegetable garden."),
    text("Informations non vérifiées, présentées à titre de démonstration.", "Unverified information, presented for demonstration purposes."),
  ],
  production: {
    type: "aquaculture",
    steps: [
      step(
        "pondPreparation",
        text("Préparation des étangs", "Preparing the ponds"),
        text(
          "Entre deux cycles, les étangs sont vidangés et laissés à sec quelques semaines. Le fond est chaulé puis fertilisé avec du compost pour favoriser le plancton dont se nourrissent les jeunes poissons.",
          "Between cycles the ponds are drained and left dry for a few weeks. The bottom is limed and then fertilised with compost to encourage the plankton that young fish feed on.",
        ),
        photo("makeshift-fish-ponds"),
      ),
      step(
        "stocking",
        text("Empoissonnement", "Stocking"),
        text(
          "Les alevins de tilapia et de silure proviennent d'une écloserie de la région. Ils sont acclimatés dans leur sachet avant d'être relâchés dans les étangs et les bacs.",
          "Tilapia and catfish fingerlings come from a hatchery in the region. They are acclimatised in their bags before being released into the ponds and tanks.",
        ),
        photo("tilapia-fingerlings"),
      ),
      step(
        "feeding",
        text("Nourrissage", "Feeding"),
        text(
          "Les poissons reçoivent deux repas par jour : des granulés flottants complétés par du son de riz. Les quantités sont réduites quand l'eau est fraîche ou que les poissons mangent moins.",
          "The fish are fed twice a day with floating pellets topped up with rice bran. Rations are reduced when the water is cool or the fish eat less.",
        ),
      ),
      step(
        "waterQuality",
        text("Suivi de l'eau et des poissons", "Monitoring water and fish"),
        text(
          "La piscicultrice observe chaque jour la couleur de l'eau et le comportement des poissons. Une partie de l'eau des bacs est renouvelée chaque semaine.",
          "The fish farmer checks the colour of the water and the behaviour of the fish every day. Part of the water in the tanks is renewed every week.",
        ),
        photo("fish-ponds"),
      ),
      step(
        "harvest",
        text("Pêche", "Harvest"),
        text(
          "Après cinq à six mois, l'étang est partiellement vidangé et les poissons sont récoltés à la senne. Les silures des bacs sont pêchés à l'épuisette.",
          "After five to six months the pond is partly drained and the fish are harvested with a seine net. Catfish in the tanks are caught with a hand net.",
        ),
        photo("catfish-harvest"),
      ),
      step(
        "postHarvest",
        text("Tri et fumage", "Sorting and smoking"),
        text(
          "Les poissons sont triés par taille. Une partie est fumée au four traditionnel pour une meilleure conservation.",
          "The fish are sorted by size. Some are smoked in a traditional oven so they keep longer.",
        ),
      ),
    ],
  },
  coverImage: photo("fish-ponds"),
  gallery: [photo("tilapia-fingerlings"), photo("makeshift-fish-ponds"), photo("catfish-harvest")],
  foundedYear: 2012,
  areaHectares: 1.2,
  featured: true,
};
