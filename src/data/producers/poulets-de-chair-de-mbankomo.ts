import type { Breeder } from "@/domain/producer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const pouletsDeChairDeMbankomo: Breeder = {
  id: "producer-21",
  slug: "poulets-de-chair-de-mbankomo",
  type: "breeder",
  farmName: "Poulets de chair de Mbankomo",
  producerName: "Serge Owona",
  tagline: text(
    "Poulets de chair élevés en petites bandes dans un bâtiment ouvert, à l'ouest de Yaoundé.",
    "Broiler chickens raised in small flocks in an open-sided house west of Yaoundé.",
  ),
  presentation: text(
    "Serge Owona élève des poulets de chair par bandes de six cents oiseaux dans un bâtiment aux côtés grillagés, bien ventilé. Il démarre une nouvelle bande toutes les quatre semaines pour étaler son activité sur l'année.",
    "Serge Owona raises broiler chickens in flocks of six hundred birds in a well-ventilated house with wire-mesh sides. He starts a new flock every four weeks to spread his work over the year.",
  ),
  story: text(
    "Ancien employé d'une provenderie, Serge connaît bien l'alimentation des volailles. Il a construit son premier bâtiment en 2018 sur le terrain familial et a ajouté un second bâtiment trois ans plus tard.",
    "A former feed-mill employee, Serge knows poultry nutrition well. He built his first house on family land in 2018 and added a second one three years later.",
  ),
  location: { city: "Mbankomo", regionId: "centre" },
  specialtyIds: ["broiler-chickens", "poultry"],
  practiceIds: ["composting"],
  livestock: [
    {
      speciesId: "chicken",
      description: text(
        "Bandes successives d'environ 600 poulets de chair, avec deux bandes présentes en même temps.",
        "Successive flocks of about 600 broiler chickens, with two flocks on the farm at any one time.",
      ),
    },
  ],
  commitments: [
    text("Bâtiment nettoyé et laissé vide dix jours entre deux bandes.", "House cleaned and left empty for ten days between flocks."),
    text("Densité limitée pour laisser de l'espace aux oiseaux en fin d'élevage.", "Stocking density kept low so the birds have room at the end of the cycle."),
    text("Données d'élevage fictives fournies pour la démonstration.", "Fictional farming data provided for the demonstration."),
  ],
  production: {
    type: "livestock",
    steps: [
      step(
        "housing",
        text("Préparation du poulailler", "Preparing the poultry house"),
        text(
          "Avant chaque bande, le sol est raclé et lavé, les murs chaulés et une litière de copeaux étalée. Les côtés grillagés sont équipés de bâches que l'on baisse les nuits fraîches.",
          "Before each flock the floor is scraped and washed, the walls whitewashed and wood-shaving litter spread. The wire-mesh sides have tarpaulins that are lowered on cool nights.",
        ),
        photo("broiler-house-cameroon"),
      ),
      step(
        "husbandry",
        text("Élevage en bandes", "Raising birds in flocks"),
        text(
          "Les poussins d'un jour sont placés sous éleveuse pendant les deux premières semaines, puis répartis dans tout le bâtiment avec des mangeoires et des abreuvoirs en nombre suffisant.",
          "Day-old chicks are kept under a brooder for the first two weeks, then spread across the whole house with enough feeders and drinkers.",
        ),
      ),
      step(
        "feeding",
        text("Alimentation par phases", "Phase feeding"),
        text(
          "Un aliment démarrage est distribué les premières semaines, puis un aliment croissance et un aliment finition. L'eau propre est disponible en permanence.",
          "A starter feed is given in the first weeks, followed by a grower and a finisher feed. Clean water is available at all times.",
        ),
        photo("one-month-broilers"),
      ),
      step(
        "animalHealth",
        text("Santé et bien-être", "Health and welfare"),
        text(
          "L'éleveur indique suivre un programme de vaccination établi avec un vétérinaire, retirer chaque jour la litière humide et noter la mortalité dans un registre.",
          "The farmer reports following a vaccination programme set with a vet, removing wet litter every day and recording mortality in a logbook.",
        ),
      ),
      step(
        "growth",
        text("Croissance et fin de bande", "Growth and end of the flock"),
        text(
          "Les poulets sont élevés pendant six à sept semaines. La litière usagée est ensuite compostée avec des résidus de culture.",
          "The chickens are raised for six to seven weeks. The used litter is then composted with crop residues.",
        ),
        photo("poultry-farm-uyo"),
      ),
    ],
  },
  coverImage: photo("broiler-house-cameroon"),
  gallery: [photo("one-month-broilers"), photo("poultry-farm-uyo"), photo("manure-compost")],
  foundedYear: 2018,
  areaHectares: 0.4,
  featured: false,
};
