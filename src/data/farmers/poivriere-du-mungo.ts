import type { Farmer } from "@/domain/farmer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const poivriereDuMungo: Farmer = {
  id: "farmer-03",
  slug: "poivriere-de-la-vallee-du-mungo",
  farmName: "Poivrière de la vallée du Mungo",
  producerName: "Jean-Paul Ekwalla",
  tagline: text(
    "Poivre cultivé sur tuteurs dans la plaine de Penja, transformé sur place.",
    "Pepper grown on stakes in the Penja plain and processed on site.",
  ),
  presentation: text(
    "Jean-Paul Ekwalla cultive des lianes de poivrier sur des tuteurs vivants, entre des bananiers. Il produit du poivre vert frais en saison, ainsi que du poivre noir et du poivre blanc séchés.",
    "Jean-Paul Ekwalla grows pepper vines on living stakes between banana plants. He produces fresh green pepper in season, as well as dried black and white pepper.",
  ),
  story: text(
    "Ancien employé d'une bananeraie, Jean-Paul a planté ses premières boutures de poivrier sur un terrain hérité de son père. Il a appris la transformation du poivre blanc auprès d'autres producteurs de la vallée.",
    "A former banana plantation worker, Jean-Paul planted his first pepper cuttings on land inherited from his father. He learned how to process white pepper from other growers in the valley.",
  ),
  location: { city: "Penja", regionId: "littoral" },
  specialtyIds: ["pepper", "fruit-orchards"],
  practiceIds: ["intercropping", "mulching", "manual-weeding", "sun-drying"],
  commitments: [
    text("Cueillette manuelle des grappes à maturité.", "Hand picking of clusters at maturity."),
    text("Séchage au soleil sur bâches propres et surélevées.", "Sun drying on clean, raised tarpaulins."),
    text("Aucune appellation ni certification n'est revendiquée dans cette démonstration.", "No appellation or certification is claimed in this demonstration."),
  ],
  production: {
    type: "crop",
    soilPreparation: step(
      text("Préparation du terrain", "Preparing the land"),
      text(
        "Les sols volcaniques de la plaine sont désherbés et des trous sont ouverts au pied de chaque tuteur. De la matière organique issue des résidus de bananiers y est ajoutée.",
        "The volcanic soils of the plain are cleared of weeds and holes are opened at the foot of each stake. Organic matter from banana residues is added.",
      ),
    ),
    sowingOrPlanting: step(
      text("Bouturage des lianes", "Planting vine cuttings"),
      text(
        "Des boutures de lianes sélectionnées sur les pieds les plus productifs sont plantées au début des pluies, au pied de tuteurs vivants.",
        "Vine cuttings selected from the most productive plants are planted at the start of the rains at the foot of living stakes.",
      ),
      photo("pepper-plantation"),
    ),
    cropCare: step(
      text("Palissage et paillage", "Training and mulching"),
      text(
        "Les lianes sont attachées régulièrement aux tuteurs, taillées pour favoriser les rameaux fructifères, et le pied est paillé avec des feuilles de bananier.",
        "Vines are regularly tied to the stakes and pruned to encourage fruiting branches, and the base is mulched with banana leaves.",
      ),
    ),
    irrigation: step(
      text("Gestion de l'eau", "Water management"),
      text(
        "La culture est pluviale. Pendant la saison sèche, seules les jeunes boutures sont arrosées à la main.",
        "The crop is rain-fed. During the dry season, only young cuttings are watered by hand.",
      ),
    ),
    cropProtection: step(
      text("Protection des cultures", "Crop protection"),
      text(
        "Des rigoles de drainage limitent l'excès d'eau au pied des lianes, principale cause de pourriture des racines selon le producteur.",
        "Drainage channels limit excess water at the base of the vines, which the grower sees as the main cause of root rot.",
      ),
    ),
    harvest: step(
      text("Cueillette des grappes", "Picking the clusters"),
      text(
        "Les grappes sont cueillies à la main, généralement entre novembre et février, lorsque quelques baies commencent à rougir.",
        "Clusters are picked by hand, usually between November and February, when a few berries start to turn red.",
      ),
      photo("pepper-fresh"),
    ),
    postHarvest: step(
      text("Transformation, tri et conditionnement", "Processing, sorting and packing"),
      text(
        "Pour le poivre noir, les baies sont égrappées puis séchées au soleil. Pour le poivre blanc, elles trempent plusieurs jours pour retirer la peau avant d'être lavées et séchées. Les grains sont ensuite triés à la main et conditionnés en sachets hermétiques.",
        "For black pepper, berries are stripped from the stems and sun dried. For white pepper, they are soaked for several days to remove the skin, then washed and dried. The peppercorns are then sorted by hand and packed in airtight pouches.",
      ),
      photo("pepper-dried"),
    ),
  },
  coverImage: photo("pepper-plantation"),
  gallery: [photo("pepper-fresh"), photo("pepper-dried"), photo("penja-market"), photo("banana-bunch")],
  foundedYear: 2009,
  areaHectares: 3,
  featured: true,
};
