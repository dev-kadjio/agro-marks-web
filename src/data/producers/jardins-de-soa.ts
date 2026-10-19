import type { Farmer } from "@/domain/producer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const jardinsDeSoa: Farmer = {
  id: "producer-05",
  slug: "les-jardins-de-soa",
  type: "farmer",
  farmName: "Les Jardins de Soa",
  producerName: "Sylvie Atangana",
  tagline: text(
    "Maraîchage périurbain et légumes feuilles récoltés à la demande près de Yaoundé.",
    "Peri-urban market gardening and leafy greens harvested to order near Yaoundé.",
  ),
  presentation: text(
    "À une vingtaine de kilomètres de Yaoundé, Sylvie Atangana cultive des légumes feuilles traditionnels comme le ndolé et le njama njama, ainsi que des tomates, du gombo, des piments et des aubergines africaines.",
    "About twenty kilometres from Yaoundé, Sylvie Atangana grows traditional leafy greens such as bitter leaf and huckleberry, as well as tomatoes, okra, chili peppers and African eggplant.",
  ),
  story: text(
    "Après des études d'agronomie, Sylvie a loué des parcelles en bas-fond pour profiter de l'eau disponible toute l'année. Elle organise les récoltes en fonction des commandes des restaurants et des familles du voisinage.",
    "After studying agronomy, Sylvie rented lowland plots to make use of year-round water. She schedules harvests according to orders from restaurants and nearby families.",
  ),
  location: { city: "Soa", regionId: "centre" },
  specialtyIds: ["leafy-vegetables", "market-gardening"],
  practiceIds: ["composting", "mulching", "crop-rotation", "integrated-pest-management"],
  commitments: [
    text("Récolte le jour de la vente pour les légumes feuilles.", "Leafy greens are harvested on the day of sale."),
    text("Rotation des planches entre légumes feuilles et légumes-fruits.", "Beds rotate between leafy greens and fruiting vegetables."),
    text("Pratiques déclarées par la productrice, non certifiées.", "Practices reported by the grower, not certified."),
  ],
  production: {
    type: "crop",
    steps: [
      step(
        "soilPreparation",
        text("Planches surélevées et compost", "Raised beds and compost"),
        text(
          "Les planches sont surélevées pour éviter l'engorgement en saison des pluies et enrichies avec un compost de déchets verts et de fientes.",
          "Beds are raised to avoid waterlogging in the rainy season and enriched with compost made from green waste and poultry manure.",
        ),
      ),
      step(
        "sowingOrPlanting",
        text("Semis, boutures et repiquage", "Sowing, cuttings and transplanting"),
        text(
          "Tomates, piments et aubergines sont semés en plaques puis repiqués. Le gombo est semé directement et le ndolé est multiplié par boutures.",
          "Tomatoes, chili and eggplant are sown in trays and then transplanted. Okra is sown directly and bitter leaf is propagated from cuttings.",
        ),
        photo("tomato-seedlings"),
      ),
      step(
        "cropCare",
        text("Récoltes échelonnées", "Staggered harvests"),
        text(
          "Les légumes feuilles sont coupés tous les quinze jours environ, ce qui stimule la repousse. Les tomates sont tuteurées et désherbées à la main.",
          "Leafy greens are cut roughly every fortnight, which encourages regrowth. Tomatoes are staked and weeded by hand.",
        ),
      ),
      step(
        "irrigation",
        text("Arrosage", "Watering"),
        text(
          "En saison sèche, les planches sont arrosées matin et soir à partir d'un puits creusé dans le bas-fond.",
          "In the dry season, beds are watered morning and evening from a well dug in the lowland.",
        ),
        photo("watering-woman"),
      ),
      step(
        "cropProtection",
        text("Protection des cultures", "Crop protection"),
        text(
          "La productrice combine rotation, observation régulière des ravageurs et extraits de neem selon ses déclarations.",
          "According to the grower, she combines rotation, regular pest scouting and neem extracts.",
        ),
      ),
      step(
        "harvest",
        text("Récolte à la commande", "Harvest to order"),
        text(
          "Les feuilles sont récoltées tôt le matin le jour de la livraison ; les tomates sont cueillies au stade tournant.",
          "Leaves are picked early in the morning on delivery day; tomatoes are picked as they start to colour.",
        ),
      ),
      step(
        "postHarvest",
        text("Lavage, bottelage et vente rapide", "Washing, bundling and quick sale"),
        text(
          "Les légumes feuilles sont lavés, triés et bottelés. Les tomates sont triées par maturité en paniers. Tout est vendu le jour même ou le lendemain.",
          "Leafy greens are washed, sorted and bundled. Tomatoes are sorted by ripeness into baskets. Everything is sold the same day or the next.",
        ),
        photo("sorting-produce"),
      ),
    ],
  },
  coverImage: photo("lettuce-seedlings"),
  gallery: [photo("bitter-leaf"), photo("huckleberry"), photo("okra"), photo("tomatoes-baskets")],
  foundedYear: 2017,
  areaHectares: 1.2,
  featured: true,
};
