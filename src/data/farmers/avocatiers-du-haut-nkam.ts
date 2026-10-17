import type { Farmer } from "@/domain/farmer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const avocatiersDuHautNkam: Farmer = {
  id: "farmer-14",
  slug: "avocatiers-du-haut-nkam",
  farmName: "Avocatiers du Haut-Nkam",
  producerName: "Clarisse Kamdem",
  tagline: text(
    "Verger d'avocatiers greffés et de variétés locales sur les collines de Bafang.",
    "Orchard of grafted and local avocado trees on the hills of Bafang.",
  ),
  presentation: text(
    "Clarisse Kamdem entretient un verger d'environ trois cents avocatiers, mêlant arbres greffés et vieux avocatiers locaux à gros fruits. Les variétés à maturité décalée lui permettent de proposer des avocats sur une longue partie de l'année.",
    "Clarisse Kamdem looks after an orchard of around three hundred avocado trees, mixing grafted trees with old local trees bearing large fruit. Varieties that ripen at different times let her offer avocados for much of the year.",
  ),
  story: text(
    "Les premiers avocatiers ont été plantés autour de la concession familiale pour l'ombre et la consommation. Après une formation au greffage, Clarisse a constitué une pépinière et transformé une ancienne caféière en verger, en conservant quelques bananiers pour l'ombrage des jeunes plants.",
    "The first avocado trees were planted around the family compound for shade and home use. After training in grafting, Clarisse set up a nursery and turned a former coffee plot into an orchard, keeping some banana plants to shade the young trees.",
  ),
  location: { city: "Bafang", regionId: "west" },
  specialtyIds: ["avocado", "fruit-orchards"],
  practiceIds: ["intercropping", "mulching", "manual-weeding", "composting"],
  commitments: [
    text("Cueillette à maturité physiologique, sans produit de mûrissement déclaré.", "Picked at physiological maturity, with no reported ripening agents."),
    text("Tri par calibre et par stade de maturité avant chaque vente.", "Sorted by size and ripeness before every sale."),
    text("Informations fictives à des fins de démonstration.", "Fictional information for demonstration purposes."),
  ],
  production: {
    type: "crop",
    soilPreparation: step(
      text("Préparation des fosses", "Preparing planting pits"),
      text(
        "Des fosses d'environ un mètre sont creusées en saison sèche et remplies de terre de surface mélangée à du compost, pour assurer un bon drainage, indispensable aux racines de l'avocatier.",
        "Pits of about one metre are dug in the dry season and filled with topsoil mixed with compost to ensure good drainage, which avocado roots need.",
      ),
    ),
    sowingOrPlanting: step(
      text("Greffage et plantation", "Grafting and planting"),
      text(
        "Les porte-greffes sont semés en pépinière à partir de noyaux locaux, puis greffés avec des variétés sélectionnées. Les plants sont mis en terre au début de la saison des pluies, espacés d'environ huit mètres.",
        "Rootstocks are sown in a nursery from local seeds and then grafted with selected varieties. Trees are planted out at the start of the rainy season, about eight metres apart.",
      ),
      photo("avocado-orchard"),
    ),
    cropCare: step(
      text("Taille et paillage", "Pruning and mulching"),
      text(
        "Une taille légère après la récolte limite la hauteur des arbres et facilite la cueillette. Le pied des arbres est paillé et des haricots sont cultivés entre les jeunes avocatiers.",
        "Light pruning after harvest keeps the trees low and makes picking easier. The base of each tree is mulched and beans are grown between the young trees.",
      ),
      photo("avocado-harvest-3"),
    ),
    irrigation: step(
      text("Arrosage des jeunes arbres", "Watering young trees"),
      text(
        "Les arbres adultes sont pluviaux. Pendant leurs deux premières saisons sèches, les jeunes plants sont arrosés à la main chaque semaine.",
        "Mature trees are rain-fed. During their first two dry seasons, young trees are watered by hand every week.",
      ),
    ),
    cropProtection: step(
      text("Protection des fruits", "Protecting the fruit"),
      text(
        "La productrice indique ramasser les fruits tombés et poser des pièges contre les mouches des fruits, et surveiller l'anthracnose pendant les périodes humides.",
        "The grower reports collecting fallen fruit, setting fruit fly traps and watching for anthracnose during wet periods.",
      ),
    ),
    harvest: step(
      text("Cueillette", "Picking"),
      text(
        "La grande récolte a lieu de mars à septembre, une récolte tardive de décembre à février. Les fruits sont cueillis durs, à la perche, puis mûrissent hors de l'arbre en quelques jours.",
        "The main harvest runs from March to September, with a late harvest from December to February. Fruit is picked firm with a pole and ripens off the tree within a few days.",
      ),
      photo("avocado-harvest-1"),
    ),
    postHarvest: step(
      text("Tri, conditionnement et conservation", "Sorting, packing and storage"),
      text(
        "Les avocats sont triés par calibre et par stade de maturité, puis rangés en cageots aérés garnis de feuilles. Ils sont stockés à l'ombre et vendus dans la semaine.",
        "Avocados are sorted by size and ripeness, then packed in ventilated crates lined with leaves. They are stored in the shade and sold within the week.",
      ),
      photo("avocados-post-harvest"),
    ),
  },
  coverImage: photo("avocado-harvest-3"),
  gallery: [photo("avocado-orchard"), photo("avocado-harvest-1"), photo("avocado-harvest-2"), photo("avocados-post-harvest")],
  foundedYear: 2012,
  areaHectares: 3,
  featured: true,
};
