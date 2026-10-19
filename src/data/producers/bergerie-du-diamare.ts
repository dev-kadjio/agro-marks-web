import type { Breeder } from "@/domain/producer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const bergerieDuDiamare: Breeder = {
  id: "producer-18",
  slug: "bergerie-du-diamare",
  type: "breeder",
  farmName: "Bergerie du Diamaré",
  producerName: "Aïssatou Moussa",
  tagline: text(
    "Moutons peuls et chèvres locales élevés au rythme des saisons sahéliennes.",
    "Fulani sheep and local goats raised to the rhythm of the Sahelian seasons.",
  ),
  presentation: text(
    "Aïssatou Moussa élève une cinquantaine de moutons peuls et une trentaine de chèvres à la périphérie de Maroua. Les animaux pâturent le matin et rentrent à l'enclos aux heures chaudes.",
    "Aïssatou Moussa keeps around fifty Fulani sheep and thirty goats on the outskirts of Maroua. The animals graze in the morning and come back to the pen during the hottest hours.",
  ),
  story: text(
    "Aïssatou a hérité de quelques brebis de sa mère. Elle stocke aujourd'hui les fanes d'arachide et de niébé récoltées par les cultivateurs voisins pour traverser la saison sèche sans vendre ses reproductrices.",
    "Aïssatou inherited a few ewes from her mother. Today she stores groundnut and cowpea haulms from neighbouring growers so that she can get through the dry season without parting with her breeding stock.",
  ),
  location: { city: "Maroua", regionId: "far-north" },
  specialtyIds: ["small-ruminants"],
  practiceIds: ["rotational-grazing", "fodder-crops"],
  livestock: [
    {
      speciesId: "sheep",
      description: text("Une cinquantaine de moutons peuls à poil ras.", "Around fifty short-haired Fulani sheep."),
    },
    {
      speciesId: "goat",
      description: text("Une trentaine de chèvres de race locale.", "Around thirty goats of a local breed."),
    },
  ],
  commitments: [
    text("Réserves de fourrage constituées avant chaque saison sèche.", "Fodder reserves built up before every dry season."),
    text("Abri ombragé disponible pendant les heures chaudes.", "Shade available during the hottest hours."),
    text("Données d'élevage fictives fournies pour la démonstration.", "Fictional farming data provided for the demonstration."),
  ],
  production: {
    type: "livestock",
    steps: [
      step(
        "housing",
        text("Enclos et abri", "Pen and shelter"),
        text(
          "Les animaux passent la nuit dans un enclos fermé par une haie d'épineux, avec un hangar en paille qui les protège du soleil et des pluies d'orage.",
          "The animals spend the night in a pen enclosed by a thorn hedge, with a thatched shelter that protects them from the sun and storm rains.",
        ),
      ),
      step(
        "husbandry",
        text("Conduite au pâturage", "Taking the flock to graze"),
        text(
          "Le troupeau sort tôt le matin vers les jachères et les bords de mayo, puis revient à l'enclos avant midi. Les parcours changent selon les saisons.",
          "The flock leaves early in the morning for fallow land and the banks of the seasonal river, then returns to the pen before noon. Routes change with the seasons.",
        ),
        photo("goats-cameroon-voa"),
      ),
      step(
        "feeding",
        text("Fourrages de saison sèche", "Dry-season fodder"),
        text(
          "Pendant la saison sèche, l'éleveuse distribue des fanes d'arachide et de niébé, du son de mil et des pierres à lécher. L'eau est apportée deux fois par jour.",
          "In the dry season the farmer feeds groundnut and cowpea haulms, millet bran and mineral licks. Water is brought twice a day.",
        ),
        photo("groundnut-field"),
      ),
      step(
        "animalHealth",
        text("Soins et surveillance", "Care and monitoring"),
        text(
          "Elle indique faire vacciner le troupeau lors des campagnes annuelles et traiter les animaux contre les parasites avant la saison des pluies.",
          "She reports having the flock vaccinated during the annual campaigns and treating the animals against parasites before the rainy season.",
        ),
      ),
      step(
        "reproduction",
        text("Agnelages et chevrotages", "Lambing and kidding"),
        text(
          "Les naissances sont regroupées après les premières pluies, lorsque le pâturage reverdit. Les jeunes restent avec leur mère jusqu'au sevrage.",
          "Births are grouped after the first rains, when the pasture turns green again. The young stay with their mothers until weaning.",
        ),
        photo("goat-cameroun-2"),
      ),
      step(
        "growth",
        text("Élevage des jeunes béliers", "Raising young rams"),
        text(
          "Une partie des jeunes béliers est gardée et mieux nourrie pendant plusieurs mois pour les fêtes de fin d'année et la Tabaski.",
          "Some of the young rams are kept back and given extra feed for several months ahead of the end-of-year festivities and Tabaski.",
        ),
      ),
    ],
  },
  coverImage: photo("goats-cameroon-voa"),
  gallery: [photo("goat-cameroun-2"), photo("groundnut-field"), photo("sorghum-field")],
  foundedYear: 2011,
  areaHectares: 3,
  featured: false,
};
