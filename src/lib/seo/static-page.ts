import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { buildPageMetadata } from "./metadata";

type StaticPageKey = "about" | "contact" | "faq" | "legal" | "privacy" | "login" | "register" | "account";

export async function staticPageMetadata(key: StaticPageKey, options: { noIndex?: boolean } = {}): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("seo")]);
  return buildPageMetadata({
    locale,
    path: `/${key}`,
    title: t(`${key}.title`),
    description: t(`${key}.description`),
    noIndex: options.noIndex,
  });
}
