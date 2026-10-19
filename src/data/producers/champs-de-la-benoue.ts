import type { Farmer } from "@/domain/producer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const champsDeLaBenoue: Farmer = {
  id: "producer-08",
  slug: "champs-de-la-benoue",
  type: "farmer",
  farmName: "Champs de la Bénoué",
  producerName: "Aïssatou Moussa",
  tagline: text(
    "Céréales et légumineuses pluviales cultivées en association dans la plaine de Garoua.",
    "Rain-fed cereals and legumes intercropped in the Garoua plain.",
  ),
  presentation: text(
    "Aïssatou Moussa cultive du maïs, du sorgho, des arachides et du niébé en associant céréales et légumineuses. Quelques manguiers en bordure de champ complètent la production.",
    "Aïssatou Moussa grows maize, sorghum, groundnuts and cowpea by intercropping cereals and legumes. A few mango trees along the field edges round out production.",
  ),
  story: text(
    "Membre d'un groupement de productrices, Aïssatou a commencé à conserver ses propres semences d'arachide et de niébé pour réduire ses achats. Le séchage et le vannage sont réalisés avec les femmes du groupement.",
    "As a member of a women growers' group, Aïssatou started saving her own groundnut and cowpea seed to reduce purchases. Drying and winnowing are done with the women of the group.",
  ),
  location: { city: "Garoua", regionId: "north" },
  specialtyIds: ["cereals", "legumes"],
  practiceIds: ["crop-rotation", "intercropping", "rain-fed", "seed-saving", "sun-drying"],
  commitments: [
    text("Rotation annuelle entre céréales et légumineuses.", "Annual rotation between cereals and legumes."),
    text("Semences d'arachide et de niébé conservées à la ferme.", "Groundnut and cowpea seed saved on the farm."),
    text("Informations fictives à des fins de démonstration.", "Fictional information for demonstration purposes."),
  ],
  production: {
    type: "crop",
    steps: [
      step(
        "soilPreparation",
        text("Labour et préparation", "Ploughing and preparation"),
        text(
          "Le labour est réalisé en traction animale dès les premières pluies de mai ou juin. Les résidus de la saison précédente sont enfouis.",
          "Ploughing is done with draught animals as soon as the first rains arrive in May or June. Residues from the previous season are worked in.",
        ),
      ),
      step(
        "sowingOrPlanting",
        text("Semis associés", "Intercropped sowing"),
        text(
          "Le maïs et le sorgho sont semés en lignes, avec du niébé entre les rangs. Les arachides occupent les parcelles où des céréales étaient cultivées l'année précédente.",
          "Maize and sorghum are sown in rows with cowpea between them. Groundnuts go on plots that grew cereals the previous year.",
        ),
        photo("groundnut-field"),
      ),
      step(
        "cropCare",
        text("Sarclages", "Weeding"),
        text(
          "Deux sarclages manuels sont effectués pendant la saison des pluies, suivis d'un buttage du maïs.",
          "Two rounds of hand weeding are carried out during the rainy season, followed by earthing up the maize.",
        ),
      ),
      step(
        "cropProtection",
        text("Protection des cultures", "Crop protection"),
        text(
          "La rotation et l'association limitent la pression des ravageurs. Les semences sont triées à la main avant chaque saison.",
          "Rotation and intercropping limit pest pressure. Seed is sorted by hand before every season.",
        ),
      ),
      step(
        "harvest",
        text("Récolte", "Harvest"),
        text(
          "Le maïs et l'arachide sont récoltés de septembre à octobre, le sorgho et le niébé jusqu'en novembre.",
          "Maize and groundnuts are harvested in September and October, sorghum and cowpea through November.",
        ),
        photo("sorghum-field"),
      ),
      step(
        "postHarvest",
        text("Séchage, battage et stockage", "Drying, threshing and storage"),
        text(
          "Les récoltes sèchent au soleil sur des bâches, puis sont battues, vannées et triées. Les grains sont stockés en sacs dans un magasin ventilé et surélevé.",
          "Harvests dry in the sun on tarpaulins, then are threshed, winnowed and sorted. Grain is stored in bags in a ventilated, raised store.",
        ),
        photo("maize-sundrying"),
      ),
    ],
  },
  coverImage: photo("groundnut-field"),
  gallery: [photo("groundnuts"), photo("cowpea"), photo("maize-store"), photo("mangoes")],
  foundedYear: 2012,
  areaHectares: 5,
  featured: false,
};
