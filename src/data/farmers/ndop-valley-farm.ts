import type { Farmer } from "@/domain/farmer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const ndopValleyFarm: Farmer = {
  id: "farmer-11",
  slug: "ndop-valley-farm",
  farmName: "Ndop Valley Farm",
  producerName: "Emmanuel Tanyi",
  tagline: text(
    "Riz irrigué de la plaine de Ndop, haricots et maïs frais des hauts plateaux.",
    "Irrigated rice from the Ndop plain, beans and fresh maize from the highlands.",
  ),
  presentation: text(
    "Emmanuel Tanyi cultive du riz dans des casiers irrigués de la plaine de Ndop. Sur les terres plus hautes, il produit des haricots et du maïs consommé frais.",
    "Emmanuel Tanyi grows rice in irrigated paddies on the Ndop plain. On higher ground he grows beans and maize eaten fresh.",
  ),
  story: text(
    "Emmanuel a repris les rizières familiales et s'est associé à une petite unité de décorticage du village pour vendre un riz local trié, prêt à cuire.",
    "Emmanuel took over his family's paddies and partnered with a small village hulling unit to sell sorted, ready-to-cook local rice.",
  ),
  location: { city: "Ndop", regionId: "north-west" },
  specialtyIds: ["rice", "legumes", "cereals"],
  practiceIds: ["crop-rotation", "manual-weeding", "sun-drying"],
  commitments: [
    text("Riz trié à la main après décorticage.", "Rice hand-sorted after hulling."),
    text("Rotation des terres hautes entre haricots et maïs.", "Upland rotation between beans and maize."),
    text("Informations fictives à des fins de démonstration.", "Fictional information for demonstration purposes."),
  ],
  production: {
    type: "crop",
    soilPreparation: step(
      text("Préparation des casiers", "Preparing the paddies"),
      text(
        "Les casiers sont inondés puis travaillés pour obtenir une boue homogène. Les diguettes sont réparées avant chaque saison.",
        "Paddies are flooded and then worked into an even puddle. Small dykes are repaired before every season.",
      ),
    ),
    sowingOrPlanting: step(
      text("Pépinière et repiquage", "Nursery and transplanting"),
      text(
        "Le riz est semé en pépinière puis repiqué à la main après environ trois semaines, en lignes régulières.",
        "Rice is sown in a nursery and transplanted by hand after about three weeks in regular rows.",
      ),
      photo("rice-field-kousseri"),
    ),
    cropCare: step(
      text("Désherbage et niveau d'eau", "Weeding and water level"),
      text(
        "Deux désherbages manuels sont réalisés et la hauteur d'eau est ajustée selon le stade de la plante.",
        "Two rounds of hand weeding are done and the water depth is adjusted to the plant's growth stage.",
      ),
    ),
    irrigation: step(
      text("Irrigation gravitaire", "Gravity irrigation"),
      text(
        "L'eau est amenée par des canaux en terre depuis la rivière, avec un tour d'eau organisé entre les riziculteurs voisins.",
        "Water is brought in through earth canals from the river, with a rota organised among neighbouring rice growers.",
      ),
    ),
    cropProtection: step(
      text("Protection de la récolte", "Protecting the crop"),
      text(
        "À l'épiaison, les oiseaux granivores sont effarouchés plusieurs fois par jour.",
        "At heading, seed-eating birds are scared away several times a day.",
      ),
    ),
    harvest: step(
      text("Récolte", "Harvest"),
      text(
        "La récolte a lieu en octobre et novembre, à la faucille, lorsque les grains ont durci.",
        "Harvest takes place in October and November with a sickle once the grains have hardened.",
      ),
      photo("rice-harvest-waza"),
    ),
    postHarvest: step(
      text("Battage, décorticage et tri", "Threshing, hulling and sorting"),
      text(
        "Le paddy est battu, séché au soleil puis décortiqué dans une unité locale. Le riz est trié pour retirer les impuretés et ensaché.",
        "The paddy is threshed, sun dried and then hulled at a local mill. The rice is sorted to remove impurities and bagged.",
      ),
    ),
  },
  coverImage: photo("rice-harvest-waza"),
  gallery: [photo("rice-field-kousseri"), photo("red-beans"), photo("tea-farmers"), photo("maize-cobs")],
  foundedYear: 2006,
  areaHectares: 2,
  featured: false,
};
