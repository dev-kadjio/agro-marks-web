import type { Farmer } from "@/domain/producer";
import { step, text } from "../helpers";
import { photo } from "../photos";

export const vergersDObala: Farmer = {
  id: "producer-04",
  slug: "cacaoyere-des-vergers-d-obala",
  type: "farmer",
  farmName: "Cacaoyère des vergers d'Obala",
  producerName: "Thérèse Mbarga",
  tagline: text(
    "Cacao fermenté et séché sur place, associé au plantain et au macabo.",
    "Cocoa fermented and dried on site, grown alongside plantain and cocoyam.",
  ),
  presentation: text(
    "Thérèse Mbarga conduit une cacaoyère en système agroforestier dans la Lekié. Les cacaoyers poussent sous de grands arbres conservés, avec des plantains et du macabo pour l'alimentation de la famille et la vente.",
    "Thérèse Mbarga runs an agroforestry cocoa farm in the Lekié division. Cocoa trees grow under large retained trees, with plantain and cocoyam for the family and for sale.",
  ),
  story: text(
    "Reprise en 2011 après le décès de son père, la cacaoyère avait vieilli. Thérèse a régénéré les parcelles en replantant progressivement et s'est concentrée sur la qualité de la fermentation pour vendre ses fèves à de petits chocolatiers.",
    "When Thérèse took over the farm in 2011 after her father's death, the cocoa trees were old. She regenerated the plots by gradual replanting and focused on fermentation quality to sell her beans to small chocolate makers.",
  ),
  location: { city: "Obala", regionId: "centre" },
  specialtyIds: ["cocoa", "plantain", "tubers"],
  practiceIds: ["agroforestry", "intercropping", "composting", "sun-drying"],
  commitments: [
    text("Fermentation contrôlée de six jours avec brassages réguliers.", "Six-day controlled fermentation with regular turning."),
    text("Conservation des grands arbres d'ombrage existants.", "Existing large shade trees are retained."),
    text("Informations fournies à titre de démonstration.", "Information provided for demonstration purposes."),
  ],
  production: {
    type: "crop",
    steps: [
      step(
        "soilPreparation",
        text("Préparation sous couvert", "Preparing land under cover"),
        text(
          "Le sous-bois est éclairci à la machette sans brûlis. Les résidus végétaux sont laissés au sol pour former une litière.",
          "The undergrowth is thinned with a machete without burning. Plant residues are left on the ground to form a litter layer.",
        ),
      ),
      step(
        "sowingOrPlanting",
        text("Plantation et ombrage temporaire", "Planting and temporary shade"),
        text(
          "Les jeunes cacaoyers issus de pépinière sont plantés au début de la saison des pluies. Des plantains et du macabo sont installés entre les lignes pour ombrager les plants pendant leurs premières années.",
          "Young cocoa trees from the nursery are planted at the start of the rainy season. Plantain and cocoyam are planted between rows to shade the young trees during their first years.",
        ),
        photo("cocoyam-farm"),
      ),
      step(
        "cropCare",
        text("Entretien de la cacaoyère", "Caring for the cocoa trees"),
        text(
          "Deux désherbages par an, retrait des gourmands et réglage de l'ombrage en élaguant certaines branches des grands arbres.",
          "Weeding twice a year, removal of suckers and adjustment of shade by pruning branches of the large trees.",
        ),
      ),
      step(
        "cropProtection",
        text("Suivi sanitaire", "Health monitoring"),
        text(
          "Les cabosses atteintes de pourriture brune sont retirées et enfouies dès leur repérage lors des tournées hebdomadaires.",
          "Pods affected by black pod disease are removed and buried as soon as they are spotted during weekly rounds.",
        ),
      ),
      step(
        "harvest",
        text("Récolte des cabosses", "Harvesting the pods"),
        text(
          "La grande récolte a lieu de septembre à décembre et une petite récolte de mai à juillet. Seules les cabosses mûres sont coupées.",
          "The main harvest runs from September to December and a smaller one from May to July. Only ripe pods are cut.",
        ),
        photo("cocoa-pods"),
      ),
      step(
        "postHarvest",
        text("Fermentation, séchage et stockage", "Fermentation, drying and storage"),
        text(
          "Les cabosses sont ouvertes dans les jours suivant la récolte. Les fèves fermentent six jours dans des caisses en bois couvertes de feuilles de bananier, puis sèchent au soleil sur claies pendant une à deux semaines. Elles sont triées et stockées en sacs de jute.",
          "Pods are opened within days of harvest. Beans ferment for six days in wooden boxes covered with banana leaves, then dry in the sun on raised racks for one to two weeks. They are sorted and stored in jute bags.",
        ),
        photo("cocoa-beans-drying"),
      ),
    ],
  },
  coverImage: photo("cocoa-pods"),
  gallery: [photo("cocoa-beans-hands"), photo("cocoa-beans-drying"), photo("cocoyam"), photo("plantain-harvested")],
  foundedYear: 2011,
  areaHectares: 6,
  featured: true,
};
