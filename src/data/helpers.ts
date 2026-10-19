import type { LocalizedText } from "@/domain/locale";
import type { ImageAsset } from "@/domain/media";
import type { ProductionStep } from "@/domain/production";

export function text(fr: string, en: string): LocalizedText {
  return { fr, en };
}

export function step<const S extends string>(
  stage: S,
  title: LocalizedText,
  description: LocalizedText,
  image?: ImageAsset,
): ProductionStep<S> {
  return image ? { stage, title, description, image } : { stage, title, description };
}
