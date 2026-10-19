import type { Producer } from "@/domain/producer";
import { ananeraieDeNjombe } from "./ananeraie-de-njombe";
import { avocatiersDuHautNkam } from "./avocatiers-du-haut-nkam";
import { bergerieDuDiamare } from "./bergerie-du-diamare";
import { cafeierDeFoumbot } from "./cafeier-de-foumbot";
import { canardsDeLaSanaga } from "./canards-de-la-sanaga";
import { champsDeLaBenoue } from "./champs-de-la-benoue";
import { champsDuLom } from "./champs-du-lom";
import { etangsDeMbalmayo } from "./etangs-de-mbalmayo";
import { fermeAvicoleDeMbanga } from "./ferme-avicole-de-mbanga";
import { fermeLaitiereDeBambui } from "./ferme-laitiere-de-bambui";
import { hautsDeDschang } from "./hauts-de-dschang";
import { jardinsDeSoa } from "./jardins-de-soa";
import { jardinsDuMayoTsanaga } from "./jardins-du-mayo-tsanaga";
import { muyukaFruitFarm } from "./muyuka-fruit-farm";
import { ndopValleyFarm } from "./ndop-valley-farm";
import { plateauDeMfou } from "./plateau-de-mfou";
import { poivriereDuMungo } from "./poivriere-du-mungo";
import { porcherieDesBamboutos } from "./porcherie-des-bamboutos";
import { pouletsDeChairDeMbankomo } from "./poulets-de-chair-de-mbankomo";
import { ranchDeMeiganga } from "./ranch-de-meiganga";
import { rucherDeNgaoundere } from "./rucher-de-ngaoundere";
import { vergersDObala } from "./vergers-d-obala";

export const producers: readonly Producer[] = [
  hautsDeDschang,
  cafeierDeFoumbot,
  poivriereDuMungo,
  vergersDObala,
  jardinsDeSoa,
  plateauDeMfou,
  rucherDeNgaoundere,
  champsDeLaBenoue,
  jardinsDuMayoTsanaga,
  muyukaFruitFarm,
  ndopValleyFarm,
  ananeraieDeNjombe,
  champsDuLom,
  avocatiersDuHautNkam,
  ranchDeMeiganga,
  fermeLaitiereDeBambui,
  porcherieDesBamboutos,
  bergerieDuDiamare,
  etangsDeMbalmayo,
  fermeAvicoleDeMbanga,
  pouletsDeChairDeMbankomo,
  canardsDeLaSanaga,
];
