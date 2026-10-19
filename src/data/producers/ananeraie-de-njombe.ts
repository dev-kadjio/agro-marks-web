import type { Farmer } from "@/domain/producer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const ananeraieDeNjombe: Farmer = {
  id: "producer-12",
  slug: "ananeraie-de-njombe",
  type: "farmer",
  farmName: "Ananeraie de Njombé",
  producerName: "Grâce Moukouri",
  tagline: text(
    "Ananas pain de sucre et gingembre frais cultivés dans le Moungo.",
    "Sugarloaf pineapples and fresh ginger grown in the Moungo division.",
  ),
  presentation: text(
    "Grâce Moukouri cultive l'ananas pain de sucre en planches paillées et produit du gingembre frais en rotation sur les parcelles libérées après les récoltes.",
    "Grâce Moukouri grows sugarloaf pineapples on mulched beds and produces fresh ginger in rotation on plots freed up after harvest.",
  ),
  story: text(
    "Ancienne commerçante de fruits au marché de Njombé, Grâce a décidé de produire elle-même pour maîtriser la qualité et la maturité des ananas qu'elle vendait.",
    "A former fruit trader at Njombé market, Grâce decided to grow her own pineapples to control the quality and ripeness of what she sold.",
  ),
  location: { city: "Njombé", regionId: "littoral" },
  specialtyIds: ["pineapple", "fruit-orchards"],
  practiceIds: ["mulching", "crop-rotation", "manual-weeding"],
  commitments: [
    text("Ananas récoltés à maturité, sans mûrissement forcé déclaré.", "Pineapples harvested ripe, with no reported forced ripening."),
    text("Rotation entre ananas et gingembre.", "Rotation between pineapple and ginger."),
    text("Informations fictives à des fins de démonstration.", "Fictional information for demonstration purposes."),
  ],
  production: {
    type: "crop",
    steps: [
      step(
        "soilPreparation",
        text("Préparation des planches", "Preparing the beds"),
        text(
          "Le terrain est défriché manuellement puis organisé en planches légèrement surélevées pour faciliter le drainage.",
          "The land is cleared by hand and laid out in slightly raised beds to aid drainage.",
        ),
      ),
      step(
        "sowingOrPlanting",
        text("Plantation des rejets", "Planting suckers"),
        text(
          "Des rejets d'ananas triés par taille sont plantés en double ligne pour obtenir des récoltes homogènes. Le gingembre est planté à partir de morceaux de rhizome.",
          "Pineapple suckers sorted by size are planted in double rows for even harvests. Ginger is planted from pieces of rhizome.",
        ),
        photo("pineapple-plantation"),
      ),
      step(
        "cropCare",
        text("Paillage et désherbage", "Mulching and weeding"),
        text(
          "Les planches sont paillées avec des résidus végétaux et désherbées à la main pendant les premiers mois.",
          "Beds are mulched with plant residues and weeded by hand during the first months.",
        ),
      ),
      step(
        "harvest",
        text("Récolte", "Harvest"),
        text(
          "Les ananas sont récoltés environ quinze à dix-huit mois après plantation, lorsque la base du fruit commence à jaunir. Le gingembre est arraché après huit à dix mois.",
          "Pineapples are harvested about fifteen to eighteen months after planting, when the base of the fruit starts to turn yellow. Ginger is lifted after eight to ten months.",
        ),
      ),
      step(
        "postHarvest",
        text("Tri et conditionnement", "Sorting and packing"),
        text(
          "Les fruits sont triés par calibre et rangés en caisses avec leur couronne. Le gingembre est nettoyé, séché à l'air et vendu en sacs.",
          "Fruit is sorted by size and packed in crates with the crown on. Ginger is cleaned, air dried and sold in bags.",
        ),
        photo("pineapples-market"),
      ),
    ],
  },
  coverImage: photo("pineapple-plantation"),
  gallery: [photo("pineapples-market"), photo("ginger"), photo("penja-market")],
  foundedYear: 2013,
  areaHectares: 4.5,
  featured: false,
};
