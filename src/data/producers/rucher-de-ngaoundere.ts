import type { Breeder } from "@/domain/producer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const rucherDeNgaoundere: Breeder = {
  id: "producer-07",
  slug: "rucher-du-mont-ngaoundere",
  type: "breeder",
  farmName: "Rucher du mont Ngaoundéré",
  producerName: "Bello Hamadou",
  tagline: text(
    "Miels de savane récoltés deux fois par an sur le plateau de l'Adamaoua.",
    "Savannah honey harvested twice a year on the Adamawa plateau.",
  ),
  presentation: text(
    "Bello Hamadou entretient une soixantaine de ruches à barres en lisière de savane arborée. Il propose un miel clair, un miel ambré et de la cire brute selon les récoltes.",
    "Bello Hamadou keeps around sixty top-bar hives at the edge of wooded savannah. He offers light honey, amber honey and raw beeswax depending on the harvest.",
  ),
  story: text(
    "Bello a appris l'apiculture avec des ruches traditionnelles en écorce. Il est passé progressivement aux ruches à barres pour récolter les rayons sans détruire les colonies.",
    "Bello learned beekeeping with traditional bark hives. He gradually moved to top-bar hives so he could harvest combs without destroying the colonies.",
  ),
  location: { city: "Ngaoundéré", regionId: "adamawa" },
  specialtyIds: ["beekeeping"],
  practiceIds: [],
  livestock: [
    {
      speciesId: "honeybee",
      description: text(
        "Une soixantaine de colonies d'abeilles locales logées dans des ruches à barres.",
        "Around sixty colonies of local bees kept in top-bar hives.",
      ),
    },
  ],
  commitments: [
    text("Réserves de miel laissées aux colonies à chaque récolte.", "Honey reserves are left for the colonies at every harvest."),
    text("Ruchers installés à l'écart des champs traités, selon l'apiculteur.", "Apiaries placed away from treated fields, according to the beekeeper."),
    text("Informations non vérifiées, présentées à titre de démonstration.", "Unverified information, presented for demonstration purposes."),
  ],
  production: {
    type: "beekeeping",
    steps: [
      step(
        "apiarySetup",
        text("Installation du rucher", "Setting up the apiary"),
        text(
          "Les ruches à barres sont posées sur des supports à environ un mètre du sol, à l'ombre partielle d'arbres de savane et près d'un point d'eau.",
          "Top-bar hives are placed on stands about one metre above the ground, in the partial shade of savannah trees and near a water source.",
        ),
        photo("mont-ngaoundere"),
      ),
      step(
        "colonyCare",
        text("Suivi des colonies", "Colony care"),
        text(
          "Une visite mensuelle permet de vérifier l'état des colonies, les réserves et la présence de ravageurs. Les colonies ne sont pas nourries, sauf en cas de disette exceptionnelle.",
          "A monthly visit checks colony health, stores and pests. Colonies are not fed except in exceptional dearth.",
        ),
        photo("honeycomb-frame"),
      ),
      step(
        "harvest",
        text("Récolte des rayons", "Harvesting combs"),
        text(
          "Les rayons operculés sont prélevés en fin de floraison, généralement en mars-avril et en novembre, en laissant une partie des réserves.",
          "Capped combs are taken at the end of flowering, usually in March–April and November, leaving part of the stores.",
        ),
      ),
      step(
        "postHarvest",
        text("Extraction, filtration et mise en pot", "Extraction, filtering and jarring"),
        text(
          "Le miel est extrait par pressage à froid, filtré, laissé à décanter quelques jours puis mis en pots de verre. La cire est fondue et moulée en pains. Les pots sont conservés à l'abri de la chaleur.",
          "Honey is extracted by cold pressing, filtered, left to settle for a few days and then jarred in glass. The wax is melted and moulded into blocks. Jars are stored away from heat.",
        ),
        photo("honey-jar"),
      ),
    ],
  },
  coverImage: photo("mont-ngaoundere"),
  gallery: [photo("honeycomb-frame"), photo("beekeeper-cameroon"), photo("honey-jar")],
  foundedYear: 2008,
  areaHectares: 1,
  featured: true,
};
