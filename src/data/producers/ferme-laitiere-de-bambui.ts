import type { Breeder } from "@/domain/producer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const fermeLaitiereDeBambui: Breeder = {
  id: "producer-16",
  slug: "ferme-laitiere-de-bambui",
  type: "breeder",
  farmName: "Ferme laitière de Bambui",
  producerName: "Grace Nfor",
  tagline: text(
    "Petit troupeau laitier nourri aux fourrages cultivés sur les hauteurs de Bamenda.",
    "A small dairy herd fed on fodder grown in the Bamenda highlands.",
  ),
  presentation: text(
    "Grace Nfor élève une douzaine de vaches laitières croisées dans une étable couverte près de Bambui. Le lait est trait à la main deux fois par jour, puis transformé en partie en yaourt nature.",
    "Grace Nfor keeps a dozen crossbred dairy cows in a covered cowshed near Bambui. The cows are milked by hand twice a day and part of the milk is made into plain yoghurt.",
  ),
  story: text(
    "Après avoir suivi une formation en production laitière, Grace a commencé avec trois vaches. Elle a progressivement planté de l'herbe à éléphant sur les terrasses de la ferme pour nourrir le troupeau toute l'année.",
    "After training in dairy farming, Grace started with three cows. She gradually planted elephant grass on the farm's terraces to feed the herd all year round.",
  ),
  location: { city: "Bambui", regionId: "north-west" },
  specialtyIds: ["dairy"],
  practiceIds: ["fodder-crops", "composting"],
  livestock: [
    {
      speciesId: "cattle",
      description: text(
        "Douze vaches laitières croisées, leurs veaux et un taureau.",
        "Twelve crossbred dairy cows, their calves and one bull.",
      ),
    },
  ],
  commitments: [
    text("Fourrage cultivé sur la ferme et fauché chaque jour.", "Fodder grown on the farm and cut every day."),
    text("Lait filtré et refroidi dans l'heure qui suit la traite.", "Milk filtered and cooled within an hour of milking."),
    text("Informations non vérifiées, présentées à titre de démonstration.", "Unverified information, presented for demonstration purposes."),
  ],
  production: {
    type: "livestock",
    steps: [
      step(
        "housing",
        text("Étable et aire d'exercice", "Cowshed and exercise yard"),
        text(
          "Les vaches disposent d'une étable couverte avec une aire de couchage paillée, curée chaque matin. Une cour attenante leur permet de sortir en journée.",
          "The cows have a covered shed with a straw-bedded lying area that is mucked out every morning. An adjoining yard lets them go outside during the day.",
        ),
      ),
      step(
        "feeding",
        text("Fourrages et compléments", "Fodder and supplements"),
        text(
          "La ration repose sur l'herbe à éléphant fauchée et hachée, complétée par du foin en saison sèche et un concentré à base de tourteau de coton pour les vaches en lactation.",
          "The ration is based on cut and chopped elephant grass, topped up with hay in the dry season and a cottonseed cake concentrate for cows in milk.",
        ),
      ),
      step(
        "animalHealth",
        text("Suivi de la santé", "Health monitoring"),
        text(
          "L'éleveuse indique contrôler chaque jour les mamelles et l'appétit des vaches, et faire appel à un vétérinaire de Bamenda pour les vaccinations et les soins.",
          "The farmer reports checking the cows' udders and appetite every day and calling a vet from Bamenda for vaccinations and treatment.",
        ),
      ),
      step(
        "reproduction",
        text("Reproduction et vêlages", "Breeding and calving"),
        text(
          "Les vaches sont saillies par le taureau de la ferme. Chaque vêlage est noté dans un cahier afin d'étaler les lactations sur l'année.",
          "The cows are served by the farm's bull. Each calving is recorded in a notebook so that lactations are spread over the year.",
        ),
      ),
      step(
        "collection",
        text("Traite", "Milking"),
        text(
          "La traite se fait à la main, à 5 h et à 16 h, après nettoyage des trayons. Le lait est recueilli dans des seaux en inox.",
          "Milking is done by hand at 5 am and 4 pm after the teats have been cleaned. The milk is collected in stainless steel buckets.",
        ),
        photo("fulani-milk"),
      ),
      step(
        "postHarvest",
        text("Filtration et transformation", "Filtering and processing"),
        text(
          "Le lait est filtré, refroidi dans des bidons placés en eau froide, puis chauffé avant d'être transformé en yaourt nature dans la petite laiterie de la ferme.",
          "The milk is filtered, cooled in churns standing in cold water, then heated before being made into plain yoghurt in the farm's small dairy room.",
        ),
      ),
    ],
  },
  coverImage: photo("zebu-herd-mbororo"),
  gallery: [photo("fulani-milk"), photo("zebu-cameroon"), photo("manure-compost")],
  foundedYear: 2017,
  areaHectares: 4,
  featured: false,
};
