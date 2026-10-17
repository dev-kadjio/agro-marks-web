import type { LocalizedText } from "@/domain/locale";
import type { ImageAsset } from "@/domain/media";
import type { ProductionStep } from "@/domain/production";

export function text(fr: string, en: string): LocalizedText {
  return { fr, en };
}

export function step(title: LocalizedText, description: LocalizedText, image?: ImageAsset): ProductionStep {
  return image ? { title, description, image } : { title, description };
}
