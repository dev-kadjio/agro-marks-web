import type { Locale } from "@/domain/locale";
import type { EditorialSlot, PhotoCredit } from "@/domain/media";
import type { MediaRepository } from "@/repositories/contracts";
import { toPhotoView } from "./mappers";
import type { PhotoView } from "./view-models";

export interface MediaService {
  listPhotoCredits(): Promise<readonly PhotoCredit[]>;
  getEditorialPhoto(locale: Locale, slot: EditorialSlot): Promise<PhotoView | null>;
}

export function createMediaService(deps: { readonly media: MediaRepository }): MediaService {
  return {
    listPhotoCredits: () => deps.media.listPhotoCredits(),
    async getEditorialPhoto(locale, slot) {
      const image = await deps.media.findEditorialImage(slot);
      return image ? toPhotoView(image, locale) : null;
    },
  };
}
