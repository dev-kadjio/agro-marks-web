import type { Farmer } from "@/domain/producer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const hautsDeDschang: Farmer = {
  id: "producer-01",
  slug: "ferme-des-hauts-de-dschang",
  type: "farmer",
  farmName: "Ferme des Hauts de Dschang",
  producerName: "Mireille Ngoufo",
  tagline: text(
    "Légumes des hautes terres cultivés en rotation sur les collines de la Menoua.",
    "Highland vegetables grown in rotation on the hills of the Menoua division.",
  ),
  presentation: text(
    "Mireille Ngoufo cultive des carottes, des choux, des poireaux et des pommes de terre sur des parcelles en pente autour de Dschang. Le climat frais d'altitude permet d'étaler les récoltes sur une grande partie de l'année.",
    "Mireille Ngoufo grows carrots, cabbage, leeks and potatoes on sloping plots around Dschang. The cool highland climate makes it possible to spread harvests over much of the year.",
  ),
  story: text(
    "L'exploitation a commencé sur un demi-hectare familial. Après une formation en maraîchage, Mireille a introduit la rotation des cultures et le compostage des fientes de volaille achetées à des éleveurs voisins. Elle travaille aujourd'hui avec deux saisonniers pendant les grandes récoltes.",
    "The farm started on half a hectare of family land. After training in market gardening, Mireille introduced crop rotation and composting of poultry manure bought from neighbouring farmers. She now works with two seasonal workers during the main harvests.",
  ),
  location: { city: "Dschang", regionId: "west" },
  specialtyIds: ["highland-vegetables", "market-gardening"],
  practiceIds: ["crop-rotation", "composting", "mulching", "manual-weeding"],
  commitments: [
    text("Rotation sur trois ans entre choux, carottes et légumineuses.", "Three-year rotation between cabbage, carrots and legumes."),
    text("Récolte le matin et vente dans les 48 heures.", "Morning harvest and sale within 48 hours."),
    text("Pratiques déclarées par le producteur, non vérifiées par un organisme tiers.", "Practices reported by the grower, not verified by a third party."),
  ],
  production: {
    type: "crop",
    steps: [
      step(
        "soilPreparation",
        text("Travail du sol et fertilisation", "Tillage and fertilisation"),
        text(
          "Le sol est travaillé à la houe en billons perpendiculaires à la pente dès les premières pluies de mars. Du fumier de volaille composté pendant trois mois est incorporé avant chaque cycle.",
          "The soil is hoed into ridges across the slope as soon as the first rains arrive in March. Poultry manure composted for three months is worked in before each cycle.",
        ),
        photo("manure-compost"),
      ),
      step(
        "sowingOrPlanting",
        text("Pépinière et repiquage", "Nursery and transplanting"),
        text(
          "Les choux et les poireaux sont semés en pépinière puis repiqués après quatre à cinq semaines. Les carottes sont semées directement en lignes sur des planches affinées.",
          "Cabbage and leeks are sown in a nursery bed and transplanted after four to five weeks. Carrots are sown directly in rows on finely prepared beds.",
        ),
        photo("lettuce-seedlings"),
      ),
      step(
        "cropCare",
        text("Entretien des parcelles", "Plot maintenance"),
        text(
          "Désherbage manuel toutes les deux à trois semaines et paillage avec des tiges de maïs broyées pour garder l'humidité et limiter l'érosion.",
          "Hand weeding every two to three weeks and mulching with chopped maize stalks to retain moisture and limit erosion.",
        ),
      ),
      step(
        "irrigation",
        text("Gestion de l'eau", "Water management"),
        text(
          "Les cultures sont essentiellement pluviales de mars à octobre. En saison sèche, les jeunes plants sont arrosés à l'arrosoir à partir d'une source captée en haut de la parcelle.",
          "Crops are mainly rain-fed from March to October. In the dry season, young plants are watered by can from a spring captured at the top of the plot.",
        ),
      ),
      step(
        "cropProtection",
        text("Protection des cultures", "Crop protection"),
        text(
          "La rotation limite les maladies du sol. Les pépinières sont couvertes de voiles anti-insectes et la productrice indique utiliser des préparations à base de piment contre les chenilles du chou.",
          "Rotation limits soil-borne diseases. Nursery beds are covered with insect netting and the grower reports using chili-based preparations against cabbage caterpillars.",
        ),
      ),
      step(
        "harvest",
        text("Récolte", "Harvest"),
        text(
          "Récolte à la main tôt le matin : les choux sont coupés au couteau, les carottes arrachées après un léger arrosage pour ne pas les casser.",
          "Hand harvest early in the morning: cabbages are cut with a knife and carrots are pulled after light watering so they do not break.",
        ),
      ),
      step(
        "postHarvest",
        text("Tri, conditionnement et conservation", "Sorting, packing and storage"),
        text(
          "Les légumes sont triés par calibre, les carottes légèrement lavées, puis conditionnés en caisses aérées ou en sacs. Ils sont stockés à l'ombre et vendus dans les deux jours.",
          "Vegetables are sorted by size, carrots are lightly washed, then packed in ventilated crates or bags. They are kept in the shade and sold within two days.",
        ),
      ),
    ],
  },
  coverImage: photo("farmer-mixed-cropping"),
  gallery: [photo("dschang-lake"), photo("cabbage-market"), photo("carrots"), photo("potatoes-cabbages")],
  foundedYear: 2014,
  areaHectares: 2.5,
  featured: true,
};
