import type { Farmer } from "@/domain/farmer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const champsDuLom: Farmer = {
  id: "farmer-13",
  slug: "les-champs-du-lom",
  farmName: "Les Champs du Lom",
  producerName: "Rose Mendouga",
  tagline: text(
    "Manioc, igname et patate douce cultivés en association près de Bertoua.",
    "Cassava, yam and sweet potato intercropped near Bertoua.",
  ),
  presentation: text(
    "Rose Mendouga produit des tubercules sur des parcelles en rotation avec des jachères. Elle vend aussi des feuilles de manioc très demandées pour la cuisine locale.",
    "Rose Mendouga grows tubers on plots rotated with fallows. She also sells cassava leaves, which are in high demand for local cooking.",
  ),
  story: text(
    "Rose a rejoint une coopérative de productrices de l'Est qui partage des boutures saines de manioc. Elle a ainsi renouvelé ses variétés et étalé ses récoltes.",
    "Rose joined a cooperative of women growers in the East that shares healthy cassava cuttings. This let her renew her varieties and spread her harvests.",
  ),
  location: { city: "Bertoua", regionId: "east" },
  specialtyIds: ["tubers", "plantain"],
  practiceIds: ["intercropping", "crop-rotation", "rain-fed"],
  commitments: [
    text("Boutures de manioc issues de pieds sains sélectionnés.", "Cassava cuttings from selected healthy plants."),
    text("Jachère de deux ans après chaque cycle de manioc.", "Two-year fallow after each cassava cycle."),
    text("Informations fictives à des fins de démonstration.", "Fictional information for demonstration purposes."),
  ],
  production: {
    type: "crop",
    soilPreparation: step(
      text("Ouverture des parcelles", "Opening the plots"),
      text(
        "Les parcelles en fin de jachère sont défrichées à la main et les buttes sont formées à la houe pour les ignames.",
        "Plots at the end of fallow are cleared by hand and mounds are formed with a hoe for yams.",
      ),
      photo("cassava-fallow"),
    ),
    sowingOrPlanting: step(
      text("Boutures et semenceaux", "Cuttings and seed pieces"),
      text(
        "Le manioc est planté en boutures inclinées, l'igname en semenceaux sur buttes et la patate douce en lianes, au début de la saison des pluies.",
        "Cassava is planted as slanted cuttings, yam as seed pieces on mounds and sweet potato as vine cuttings, at the start of the rainy season.",
      ),
      photo("cassava-leaves"),
    ),
    cropCare: step(
      text("Entretien", "Crop care"),
      text(
        "Deux à trois désherbages dans les premiers mois, puis tuteurage des lianes d'igname.",
        "Two to three weedings in the first months, then staking of the yam vines.",
      ),
    ),
    cropProtection: step(
      text("Santé des plants", "Plant health"),
      text(
        "Les pieds de manioc présentant des symptômes de mosaïque sont arrachés et ne sont pas utilisés comme boutures.",
        "Cassava plants showing mosaic symptoms are pulled up and not used for cuttings.",
      ),
    ),
    harvest: step(
      text("Récolte", "Harvest"),
      text(
        "Le manioc est récolté douze à dix-huit mois après plantation, au fur et à mesure des besoins. Les ignames sont arrachées d'août à décembre.",
        "Cassava is harvested twelve to eighteen months after planting, as needed. Yams are lifted from August to December.",
      ),
      photo("cassava-roots"),
    ),
    postHarvest: step(
      text("Tri et vente rapide", "Sorting and quick sale"),
      text(
        "Les racines de manioc se conservent peu : elles sont triées et vendues dans les deux jours. Les ignames sont stockées à l'ombre dans un abri ventilé.",
        "Cassava roots do not keep well: they are sorted and sold within two days. Yams are stored in the shade in a ventilated shelter.",
      ),
    ),
  },
  coverImage: photo("cassava-fallow"),
  gallery: [photo("cassava-cameroon"), photo("yam-tubers"), photo("sweet-potatoes"), photo("cassava-leaves")],
  foundedYear: 2010,
  areaHectares: 3,
  featured: false,
};
