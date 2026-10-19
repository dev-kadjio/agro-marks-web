import type { Farmer } from "@/domain/producer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const jardinsDuMayoTsanaga: Farmer = {
  id: "producer-09",
  slug: "jardins-du-mayo-tsanaga",
  type: "farmer",
  farmName: "Jardins du Mayo Tsanaga",
  producerName: "Ibrahim Daouda",
  tagline: text(
    "Oignons de contre-saison, oseille de Guinée et piments séchés autour de Maroua.",
    "Off-season onions, roselle and dried chili around Maroua.",
  ),
  presentation: text(
    "Ibrahim Daouda cultive des oignons rouges pendant la saison sèche, sur des parcelles irriguées le long du mayo. En saison des pluies, il produit de l'oseille de Guinée et des piments qu'il fait sécher.",
    "Ibrahim Daouda grows red onions during the dry season on irrigated plots along the seasonal river. In the rainy season he grows roselle and chili peppers, which he dries.",
  ),
  story: text(
    "La famille d'Ibrahim cultivait le sorgho. Il a développé la culture de l'oignon il y a une dizaine d'années après avoir creusé un puits et acquis une petite motopompe partagée avec deux voisins.",
    "Ibrahim's family grew sorghum. He developed onion growing around ten years ago after digging a well and buying a small motor pump shared with two neighbours.",
  ),
  location: { city: "Maroua", regionId: "far-north" },
  specialtyIds: ["onions", "market-gardening"],
  practiceIds: ["crop-rotation", "manual-weeding", "sun-drying"],
  commitments: [
    text("Rotation entre oignons et céréales pluviales.", "Rotation between onions and rain-fed cereals."),
    text("Séchage des oignons au champ avant stockage.", "Onions are cured in the field before storage."),
    text("Données fictives à des fins de démonstration.", "Fictional data for demonstration purposes."),
  ],
  production: {
    type: "crop",
    steps: [
      step(
        "soilPreparation",
        text("Aménagement des planches", "Preparing the beds"),
        text(
          "Après le retrait des eaux du mayo, les planches sont aménagées en cuvettes pour retenir l'eau d'irrigation, puis amendées avec du fumier.",
          "Once the seasonal river recedes, beds are shaped into basins to hold irrigation water and amended with manure.",
        ),
        photo("far-north-vegetable-field"),
      ),
      step(
        "sowingOrPlanting",
        text("Pépinière et repiquage", "Nursery and transplanting"),
        text(
          "L'oignon est semé en pépinière en octobre puis repiqué en novembre. L'oseille et les piments sont semés au début de la saison des pluies.",
          "Onions are sown in a nursery in October and transplanted in November. Roselle and chili are sown at the start of the rainy season.",
        ),
      ),
      step(
        "cropCare",
        text("Entretien", "Crop care"),
        text(
          "Désherbage manuel régulier et binage léger pour aérer le sol autour des bulbes.",
          "Regular hand weeding and light hoeing to loosen the soil around the bulbs.",
        ),
      ),
      step(
        "irrigation",
        text("Irrigation de contre-saison", "Off-season irrigation"),
        text(
          "Pendant la saison sèche, l'eau du puits est pompée et distribuée par des rigoles environ deux fois par semaine, selon la chaleur.",
          "During the dry season, well water is pumped and distributed through channels about twice a week, depending on the heat.",
        ),
      ),
      step(
        "cropProtection",
        text("Protection des cultures", "Crop protection"),
        text(
          "Le producteur surveille les thrips et alterne les parcelles d'une année sur l'autre pour limiter les maladies.",
          "The grower monitors thrips and alternates plots from year to year to limit disease.",
        ),
      ),
      step(
        "harvest",
        text("Récolte", "Harvest"),
        text(
          "Les oignons sont arrachés de février à avril, lorsque les feuilles se couchent. Les calices d'oseille sont cueillis en fin de saison des pluies.",
          "Onions are lifted from February to April once the leaves fall over. Roselle calyces are picked at the end of the rainy season.",
        ),
        photo("onion-field"),
      ),
      step(
        "postHarvest",
        text("Séchage, tri et stockage", "Curing, sorting and storage"),
        text(
          "Les oignons sèchent au champ quelques jours, puis sont triés et stockés dans un grenier ventilé sur claies. L'oseille et les piments sont séchés à l'ombre et conditionnés en sachets.",
          "Onions cure in the field for a few days, then are sorted and stored in a ventilated granary on racks. Roselle and chili are shade-dried and packed in pouches.",
        ),
      ),
    ],
  },
  coverImage: photo("far-north-vegetable-field"),
  gallery: [photo("onions-cameroon"), photo("onion-field"), photo("hibiscus-field"), photo("chili-pile")],
  foundedYear: 2015,
  areaHectares: 1.5,
  featured: false,
};
