import type { LocalizedText } from "./locale";

export interface ImageAsset {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: LocalizedText;
}

export interface PhotoCredit {
  readonly id: string;
  readonly src: string;
  readonly title: string;
  readonly author: string;
  readonly license: string;
  readonly licenseUrl: string | null;
  readonly sourceUrl: string;
}

export const editorialSlots = ["hero", "practices", "about"] as const;

export type EditorialSlot = (typeof editorialSlots)[number];
