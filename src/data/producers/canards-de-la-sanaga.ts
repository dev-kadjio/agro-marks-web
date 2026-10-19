import type { Breeder } from "@/domain/producer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const canardsDeLaSanaga: Breeder = {
  id: "producer-22",
  slug: "canards-de-la-sanaga",
  type: "breeder",
  farmName: "Canards de la Sanaga",
  producerName: "Martine Ngo Biyong",
  tagline: text(
    "Canards de Barbarie élevés en semi-liberté autour d'une mare, près d'Édéa.",
    "Muscovy ducks raised free-range around a pond near Edéa.",
  ),
  presentation: text(
    "Martine Ngo Biyong élève environ deux cents canards de Barbarie sur une parcelle humide proche de la Sanaga. Les oiseaux passent la journée entre un parcours herbeux et une mare, et rentrent le soir dans un abri fermé.",
    "Martine Ngo Biyong keeps around two hundred Muscovy ducks on a damp plot near the Sanaga river. The birds spend the day between a grassy run and a pond, and go back to a closed shelter in the evening.",
  ),
  story: text(
    "Martine a commencé avec quelques canes offertes par sa grand-mère. Elle a aménagé une mare alimentée par les pluies et sélectionne chaque année ses meilleures reproductrices pour renouveler le troupeau.",
    "Martine started with a few ducks given to her by her grandmother. She dug a rain-fed pond and every year selects her best breeding females to renew the flock.",
  ),
  location: { city: "Édéa", regionId: "littoral" },
  specialtyIds: ["duck-farming", "poultry"],
  practiceIds: ["free-range", "on-farm-feed"],
  livestock: [
    {
      speciesId: "duck",
      description: text(
        "Environ 200 canards de Barbarie, dont une trentaine de canes reproductrices.",
        "Around 200 Muscovy ducks, including some thirty breeding females.",
      ),
    },
  ],
  commitments: [
    text("Accès quotidien à un parcours herbeux et à une mare.", "Daily access to a grassy run and a pond."),
    text("Couvaison naturelle par les canes de l'élevage.", "Eggs hatched naturally by the farm's own ducks."),
    text("Informations non vérifiées, présentées à titre de démonstration.", "Unverified information, presented for demonstration purposes."),
  ],
  production: {
    type: "livestock",
    steps: [
      step(
        "housing",
        text("Abri de nuit et mare", "Night shelter and pond"),
        text(
          "Un abri en bois sur pilotis protège les canards la nuit et des nids garnis de paille y accueillent les canes. La mare est curée en saison sèche et l'eau de boisson est changée chaque jour.",
          "A wooden shelter on stilts protects the ducks at night and houses straw-lined nests for the females. The pond is cleaned out in the dry season and drinking water is changed daily.",
        ),
        photo("ducks-foraging"),
      ),
      step(
        "husbandry",
        text("Semi-liberté", "Free-range system"),
        text(
          "Le matin, les canards sortent sur un parcours clôturé où ils pâturent l'herbe et cherchent des insectes, avant de rejoindre la mare aux heures chaudes.",
          "In the morning the ducks go out onto a fenced run where they graze and look for insects, then move to the pond during the hottest hours.",
        ),
        photo("ducks-water-cameroon"),
      ),
      step(
        "feeding",
        text("Alimentation", "Feeding"),
        text(
          "Le parcours est complété par une ration préparée à la ferme : maïs concassé, son de riz, tourteau et feuilles hachées. Les canetons reçoivent un aliment plus fin pendant leurs premières semaines.",
          "Foraging is topped up with a ration mixed on the farm: cracked maize, rice bran, oilseed cake and chopped leaves. Ducklings receive a finer feed during their first weeks.",
        ),
      ),
      step(
        "animalHealth",
        text("Santé et bien-être", "Health and welfare"),
        text(
          "L'éleveuse indique surveiller chaque jour la démarche et le plumage des canards, isoler les oiseaux affaiblis et demander conseil à un vétérinaire en cas de problème.",
          "The farmer reports checking the ducks' gait and plumage every day, isolating weak birds and asking a vet for advice if problems arise.",
        ),
      ),
      step(
        "reproduction",
        text("Couvaison et canetons", "Hatching and ducklings"),
        text(
          "Les canes couvent elles-mêmes leurs œufs pendant environ cinq semaines. Les canetons restent avec leur mère dans un enclos protégé pendant leurs premiers jours.",
          "The ducks sit on their own eggs for about five weeks. Ducklings stay with their mother in a protected pen for their first days.",
        ),
        photo("duck-ducklings"),
      ),
      step(
        "growth",
        text("Croissance", "Growth"),
        text(
          "Les jeunes canards sont élevés en semi-liberté pendant dix à douze semaines. Les meilleures canes sont gardées pour la reproduction.",
          "Young ducks are raised free-range for ten to twelve weeks. The best females are kept back for breeding.",
        ),
      ),
    ],
  },
  coverImage: photo("duck-ducklings"),
  gallery: [photo("ducks-water-cameroon"), photo("ducks-foraging"), photo("maize-cobs")],
  foundedYear: 2013,
  areaHectares: 1.5,
  featured: true,
};
