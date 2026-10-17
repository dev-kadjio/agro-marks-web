import type { Farmer } from "@/domain/farmer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const muyukaFruitFarm: Farmer = {
  id: "farmer-10",
  slug: "muyuka-fruit-farm",
  farmName: "Muyuka Fruit Farm",
  producerName: "Linda Ebot",
  tagline: text(
    "Verger mixte de papayers, d'avocatiers et de safoutiers au pied du mont Cameroun.",
    "Mixed orchard of papaya, avocado and safou trees at the foot of Mount Cameroon.",
  ),
  presentation: text(
    "Linda Ebot gère un verger diversifié où les papayers et les plantains assurent un revenu régulier pendant que les avocatiers et les safoutiers produisent de manière saisonnière.",
    "Linda Ebot runs a diversified orchard where papaya and plantain provide a steady income while avocado and safou trees produce seasonally.",
  ),
  story: text(
    "Linda est revenue à Muyuka après plusieurs années à Douala. Elle a replanté l'ancienne parcelle familiale en associant arbres fruitiers et cultures vivrières pour étaler les récoltes sur l'année.",
    "Linda returned to Muyuka after several years in Douala. She replanted the old family plot, combining fruit trees with food crops to spread harvests across the year.",
  ),
  location: { city: "Muyuka", regionId: "south-west" },
  specialtyIds: ["fruit-orchards", "avocado", "plantain"],
  practiceIds: ["agroforestry", "intercropping", "mulching"],
  commitments: [
    text("Fruits cueillis à maturité pour la vente locale.", "Fruit picked ripe for local sale."),
    text("Paillage systématique au pied des jeunes arbres.", "Systematic mulching around young trees."),
    text("Informations fictives à des fins de démonstration.", "Fictional information for demonstration purposes."),
  ],
  production: {
    type: "crop",
    soilPreparation: step(
      text("Préparation des fosses", "Preparing planting pits"),
      text(
        "Des fosses larges sont ouvertes et remplies de terre mélangée à du compost et à des cendres végétales avant chaque plantation d'arbre.",
        "Wide pits are dug and filled with soil mixed with compost and plant ash before each tree is planted.",
      ),
    ),
    sowingOrPlanting: step(
      text("Plantation du verger", "Planting the orchard"),
      text(
        "Les avocatiers greffés et les safoutiers sont plantés en saison des pluies, avec des rejets de plantain et des papayers entre les lignes.",
        "Grafted avocado trees and safou trees are planted in the rainy season, with plantain suckers and papaya between the rows.",
      ),
    ),
    cropCare: step(
      text("Entretien du verger", "Orchard care"),
      text(
        "Paillage, taille de formation des jeunes arbres et renouvellement des rejets de plantain après chaque régime.",
        "Mulching, formative pruning of young trees and renewal of plantain suckers after each bunch.",
      ),
    ),
    cropProtection: step(
      text("Protection", "Protection"),
      text(
        "Les fruits tombés sont ramassés pour limiter les mouches des fruits, et les régimes de plantain sont soutenus par des tuteurs.",
        "Fallen fruit is collected to limit fruit flies, and plantain bunches are propped with stakes.",
      ),
    ),
    harvest: step(
      text("Récolte", "Harvest"),
      text(
        "Les papayes et les plantains sont récoltés toute l'année. Les avocats sont cueillis surtout de mai à septembre et les safous de mai à août.",
        "Papaya and plantain are harvested year-round. Avocados are mainly picked from May to September and safou from May to August.",
      ),
      photo("plantain-bunches"),
    ),
    postHarvest: step(
      text("Tri et conditionnement", "Sorting and packing"),
      text(
        "Les fruits sont triés selon leur maturité, emballés dans des paniers garnis de feuilles et transportés tôt le matin vers Muyuka et Buea.",
        "Fruit is sorted by ripeness, packed in leaf-lined baskets and taken early in the morning to Muyuka and Buea.",
      ),
      photo("harvest-display"),
    ),
  },
  coverImage: photo("avocado-tree"),
  gallery: [photo("papaya"), photo("plantain-bunches"), photo("safou"), photo("potato-farm-buea")],
  foundedYear: 2019,
  areaHectares: 3.5,
  featured: true,
};
