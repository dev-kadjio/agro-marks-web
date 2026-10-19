import type { Breeder } from "@/domain/producer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const plateauDeMfou: Breeder = {
  id: "producer-06",
  slug: "elevage-du-plateau-de-mfou",
  type: "breeder",
  farmName: "Élevage du plateau de Mfou",
  producerName: "Paul Essomba",
  tagline: text(
    "Poules pondeuses et poulets élevés au sol avec accès à un parcours extérieur.",
    "Laying hens and chickens raised on the ground with access to an outdoor run.",
  ),
  presentation: text(
    "Paul Essomba élève environ quatre cents poules pondeuses et des poulets de chair à croissance lente. Les animaux disposent d'un bâtiment ventilé et d'un parcours herbeux clôturé.",
    "Paul Essomba keeps around four hundred laying hens and slow-growing meat chickens. The birds have a ventilated house and a fenced grassy run.",
  ),
  story: text(
    "Technicien d'élevage de formation, Paul a lancé son élevage avec une centaine de poussins. Il fabrique une partie de l'aliment avec du maïs acheté à des producteurs de la région.",
    "A trained livestock technician, Paul started with a hundred chicks. He makes part of the feed with maize bought from growers in the region.",
  ),
  location: { city: "Mfou", regionId: "centre" },
  specialtyIds: ["poultry"],
  practiceIds: ["free-range", "on-farm-feed", "composting"],
  livestock: [
    {
      speciesId: "chicken",
      description: text(
        "Environ 400 poules pondeuses et une bande de poulets de chair à croissance lente.",
        "Around 400 laying hens and one flock of slow-growing meat chickens.",
      ),
    },
  ],
  commitments: [
    text("Accès quotidien des animaux au parcours extérieur.", "Birds have daily access to the outdoor run."),
    text("Ramassage des œufs deux fois par jour.", "Eggs are collected twice a day."),
    text("Données d'élevage fictives fournies pour la démonstration.", "Fictional farming data provided for the demonstration."),
  ],
  production: {
    type: "livestock",
    steps: [
      step(
        "housing",
        text("Logement des animaux", "Housing"),
        text(
          "Le bâtiment est orienté pour être ventilé naturellement et sa litière de copeaux est renouvelée régulièrement. Un parcours herbeux clôturé est ouvert chaque matin.",
          "The house is oriented for natural ventilation and its wood-shaving litter is renewed regularly. A fenced grassy run is opened every morning.",
        ),
        photo("hens-chicks-cameroon"),
      ),
      step(
        "feeding",
        text("Alimentation", "Feeding"),
        text(
          "L'aliment est composé de maïs, de son, de tourteau et de compléments minéraux, complété par la verdure du parcours. L'eau est changée deux fois par jour.",
          "Feed is made from maize, bran, oilseed cake and mineral supplements, complemented by greens from the run. Water is changed twice a day.",
        ),
        photo("maize-cobs"),
      ),
      step(
        "animalHealth",
        text("Suivi sanitaire", "Health monitoring"),
        text(
          "L'éleveur indique suivre un calendrier de vaccination établi avec un vétérinaire et nettoyer le bâtiment entre deux bandes.",
          "The farmer reports following a vaccination schedule set with a veterinarian and cleaning the house between flocks.",
        ),
      ),
      step(
        "collection",
        text("Ramassage des œufs", "Egg collection"),
        text(
          "Les œufs sont ramassés le matin et en fin d'après-midi dans des pondoirs garnis de paille.",
          "Eggs are collected in the morning and late afternoon from straw-lined nest boxes.",
        ),
      ),
      step(
        "postHarvest",
        text("Mirage, tri et conservation", "Candling, sorting and storage"),
        text(
          "Les œufs sont mirés, triés par taille et placés en plateaux alvéolés de trente. Ils sont stockés au frais, à l'abri du soleil.",
          "Eggs are candled, sorted by size and placed in trays of thirty. They are kept cool and out of the sun.",
        ),
        photo("eggs-basket"),
      ),
    ],
  },
  coverImage: photo("hens-chicks-cameroon"),
  gallery: [photo("eggs-basket"), photo("maize-cobs"), photo("manure-compost")],
  foundedYear: 2016,
  areaHectares: 0.8,
  featured: false,
};
