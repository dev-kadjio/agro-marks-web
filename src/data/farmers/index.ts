import type { Farmer } from "@/domain/farmer";
import { ananeraieDeNjombe } from "./ananeraie-de-njombe";
import { avocatiersDuHautNkam } from "./avocatiers-du-haut-nkam";
import { cafeierDeFoumbot } from "./cafeier-de-foumbot";
import { champsDeLaBenoue } from "./champs-de-la-benoue";
import { champsDuLom } from "./champs-du-lom";
import { hautsDeDschang } from "./hauts-de-dschang";
import { jardinsDeSoa } from "./jardins-de-soa";
import { jardinsDuMayoTsanaga } from "./jardins-du-mayo-tsanaga";
import { muyukaFruitFarm } from "./muyuka-fruit-farm";
import { ndopValleyFarm } from "./ndop-valley-farm";
import { plateauDeMfou } from "./plateau-de-mfou";
import { poivriereDuMungo } from "./poivriere-du-mungo";
import { rucherDeNgaoundere } from "./rucher-de-ngaoundere";
import { vergersDObala } from "./vergers-d-obala";

export const farmers: readonly Farmer[] = [
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
];
