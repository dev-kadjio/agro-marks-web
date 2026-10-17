import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { siteConfig } from "@/config/site";
import { locales, type Locale } from "@/domain/locale";
import { absoluteUrl, alternateLanguages, localizedUrl } from "./urls";

const openGraphLocales: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
};

interface PageMetadataInput {
  readonly locale: Locale;
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly image?: { readonly src: string; readonly width: number; readonly height: number; readonly alt: string };
  readonly absoluteTitle?: boolean;
  readonly noIndex?: boolean;
  readonly type?: "website" | "article";
}

export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const url = localizedUrl(input.locale, input.path);
  const image = input.image ?? { src: siteConfig.heroImage, width: 1200, height: 720, alt: brand.name };
  const images = [{ url: absoluteUrl(image.src), width: image.width, height: image.height, alt: image.alt }];
  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    alternates: {
      canonical: url,
      languages: alternateLanguages(input.path),
    },
    openGraph: {
      type: input.type ?? "website",
      siteName: brand.name,
      title: input.title,
      description: input.description,
      url,
      locale: openGraphLocales[input.locale],
      alternateLocale: locales.filter((locale) => locale !== input.locale).map((locale) => openGraphLocales[locale]),
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: images.map((entry) => entry.url),
    },
    robots: input.noIndex ? { index: false, follow: true } : undefined,
  };
}
