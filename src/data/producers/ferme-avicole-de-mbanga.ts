import type { Breeder } from "@/domain/producer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const fermeAvicoleDeMbanga: Breeder = {
  id: "producer-20",
  slug: "ferme-avicole-de-mbanga",
  type: "breeder",
  farmName: "Ferme avicole de Mbanga",
  producerName: "Ernestine Ekwalla",
  tagline: text(
    "Poulets de chair élevés au sol par bandes successives dans le Moungo.",
    "Broiler chickens raised on the floor in successive flocks in the Moungo division.",
  ),
  presentation: text(
    "Ernestine Ekwalla élève des poulets de chair par bandes d'environ mille cinq cents oiseaux dans deux bâtiments ventilés. Chaque bande est suivie dans un registre, de l'arrivée des poussins à la fin de l'élevage.",
    "Ernestine Ekwalla raises broiler chickens in flocks of about one thousand five hundred birds in two ventilated houses. Each flock is tracked in a logbook, from the arrival of the chicks to the end of the cycle.",
  ),
  story: text(
    "Comptable de formation, Ernestine a repris le petit poulailler de son oncle en 2019. Elle a agrandi l'élevage et noue des liens avec les maraîchers voisins, à qui elle cède la litière compostée.",
    "An accountant by training, Ernestine took over her uncle's small poultry house in 2019. She has expanded the farm and works with nearby market gardeners, who receive the composted litter.",
  ),
  location: { city: "Mbanga", regionId: "littoral" },
  specialtyIds: ["broiler-chickens", "poultry"],
  practiceIds: ["composting"],
  livestock: [
    {
      speciesId: "chicken",
      description: text(
        "Bandes successives d'environ 1 500 poulets de chair.",
        "Successive flocks of about 1,500 broiler chickens.",
      ),
    },
  ],
  commitments: [
    text("Vide sanitaire de deux semaines entre deux bandes.", "Two-week empty period between flocks."),
    text("Registre d'élevage tenu pour chaque bande.", "A logbook kept for every flock."),
    text("Pratiques déclarées par l'éleveuse, non vérifiées par un organisme tiers.", "Practices reported by the farmer, not verified by a third party."),
  ],
  production: {
    type: "livestock",
    steps: [
      step(
        "housing",
        text("Préparation du bâtiment", "Preparing the poultry house"),
        text(
          "Après chaque bande, le bâtiment est vidé, lavé et désinfecté, puis laissé vide deux semaines. Une litière de copeaux propre est étalée et la zone des poussins est chauffée avant leur arrivée.",
          "After each flock the house is emptied, washed and disinfected, then left empty for two weeks. Clean wood-shaving litter is spread and the brooding area is warmed before the chicks arrive.",
        ),
        photo("poultry-farm-moungo"),
      ),
      step(
        "husbandry",
        text("Élevage au sol par bandes", "Floor rearing in flocks"),
        text(
          "Les poussins d'un jour arrivent en une seule fois. Ils restent les premiers jours dans un cercle chauffé, puis disposent progressivement de toute la surface du bâtiment.",
          "Day-old chicks arrive all at once. They spend the first days in a heated ring and are then gradually given the whole floor of the house.",
        ),
      ),
      step(
        "feeding",
        text("Alimentation", "Feeding"),
        text(
          "Les oiseaux reçoivent un aliment de démarrage puis un aliment de croissance-finition, avec de l'eau propre à volonté. Les mangeoires sont relevées au fur et à mesure de la croissance.",
          "The birds receive a starter feed followed by a grower-finisher feed, with clean water available at all times. Feeders are raised as the birds grow.",
        ),
        photo("maize-store"),
      ),
      step(
        "animalHealth",
        text("Santé et bien-être", "Health and welfare"),
        text(
          "L'éleveuse indique suivre le programme de vaccination conseillé par son vétérinaire, limiter l'accès aux bâtiments et surveiller la température et la ventilation plusieurs fois par jour.",
          "The farmer reports following the vaccination programme recommended by her vet, restricting access to the houses and checking temperature and ventilation several times a day.",
        ),
      ),
      step(
        "growth",
        text("Croissance et fin de bande", "Growth and end of the flock"),
        text(
          "Les poulets sont élevés pendant six à sept semaines. La litière usagée est ensuite compostée avant d'être cédée aux maraîchers voisins.",
          "The chickens are raised for six to seven weeks. The used litter is then composted before going to nearby market gardeners.",
        ),
        photo("manure-compost"),
      ),
    ],
  },
  coverImage: photo("poultry-farm-moungo"),
  gallery: [photo("hens-chicks-cameroon"), photo("maize-store"), photo("manure-compost")],
  foundedYear: 2019,
  areaHectares: 0.6,
  featured: false,
};
