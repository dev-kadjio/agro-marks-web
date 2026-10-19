import type { Breeder } from "@/domain/producer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const porcherieDesBamboutos: Breeder = {
  id: "producer-17",
  slug: "porcherie-des-bamboutos",
  type: "breeder",
  farmName: "Porcherie des Bamboutos",
  producerName: "Hervé Tchinda",
  tagline: text(
    "Élevage de porcs naisseur-engraisseur nourri avec une provende préparée sur place.",
    "Farrow-to-finish pig farm using feed mixed on site.",
  ),
  presentation: text(
    "Hervé Tchinda conduit un élevage de huit truies et d'un verrat dans des loges maçonnées à la sortie de Mbouda. Les porcelets nés sur la ferme y sont élevés jusqu'à l'âge adulte.",
    "Hervé Tchinda runs a unit of eight sows and one boar in brick pens on the outskirts of Mbouda. Piglets born on the farm are raised there to adulthood.",
  ),
  story: text(
    "Hervé a construit ses premières loges avec l'aide de sa famille. Il prépare lui-même l'aliment à partir de maïs et de drêches de brasserie, et cède le fumier composté aux maraîchers des environs.",
    "Hervé built his first pens with help from his family. He mixes the feed himself from maize and brewers' grains, and passes composted manure on to nearby market gardeners.",
  ),
  location: { city: "Mbouda", regionId: "west" },
  specialtyIds: ["pig-farming"],
  practiceIds: ["on-farm-feed", "composting"],
  livestock: [
    {
      speciesId: "pig",
      description: text(
        "Huit truies reproductrices, un verrat et leurs portées jusqu'à l'engraissement.",
        "Eight breeding sows, one boar and their litters through to finishing.",
      ),
    },
  ],
  commitments: [
    text("Nettoyage quotidien des loges et pédiluve à l'entrée de l'élevage.", "Pens cleaned daily and a footbath at the farm entrance."),
    text("Fumier composté et valorisé sur les parcelles voisines.", "Manure composted and used on neighbouring plots."),
    text("Pratiques déclarées par l'éleveur, non vérifiées par un organisme tiers.", "Practices reported by the farmer, not verified by a third party."),
  ],
  production: {
    type: "livestock",
    steps: [
      step(
        "housing",
        text("Loges et hygiène", "Pens and hygiene"),
        text(
          "Les loges ont un sol cimenté en légère pente pour faciliter l'écoulement. Elles sont raclées et lavées chaque matin, et l'accès à l'élevage est limité aux personnes de la ferme.",
          "The pens have a gently sloping concrete floor to help drainage. They are scraped and washed every morning, and access to the unit is limited to farm staff.",
        ),
        photo("pig-husbandry"),
      ),
      step(
        "feeding",
        text("Provende préparée à la ferme", "Feed mixed on the farm"),
        text(
          "La ration associe maïs concassé, son, tourteau de soja, drêches de brasserie et compléments minéraux. Les quantités sont ajustées selon l'âge et le stade des animaux.",
          "The ration combines cracked maize, bran, soybean meal, brewers' grains and mineral supplements. Quantities are adjusted to the age and stage of each animal.",
        ),
        photo("pig-feed-mixture"),
      ),
      step(
        "animalHealth",
        text("Prévention sanitaire", "Disease prevention"),
        text(
          "L'éleveur indique isoler tout nouvel animal pendant trois semaines, déparasiter les porcs régulièrement et consulter un vétérinaire au moindre signe de maladie.",
          "The farmer reports isolating any new animal for three weeks, deworming the pigs regularly and calling a vet at the first sign of illness.",
        ),
      ),
      step(
        "reproduction",
        text("Saillies et mises bas", "Mating and farrowing"),
        text(
          "Les truies sont saillies par le verrat de la ferme. Quelques jours avant la mise bas, elles rejoignent une loge de maternité équipée d'un coin chauffé pour les porcelets.",
          "The sows are mated with the farm's boar. A few days before farrowing they move into a farrowing pen with a heated corner for the piglets.",
        ),
        photo("pig-farming-cameroon"),
      ),
      step(
        "growth",
        text("Sevrage et engraissement", "Weaning and finishing"),
        text(
          "Les porcelets sont sevrés vers sept semaines, puis élevés par lots de même âge pendant six à sept mois.",
          "Piglets are weaned at around seven weeks, then raised in groups of the same age for six to seven months.",
        ),
      ),
    ],
  },
  coverImage: photo("pig-husbandry"),
  gallery: [photo("white-sow"), photo("pig-farming-cameroon"), photo("pig-feed-mixture"), photo("manure-compost")],
  foundedYear: 2015,
  areaHectares: 0.5,
  featured: false,
};
