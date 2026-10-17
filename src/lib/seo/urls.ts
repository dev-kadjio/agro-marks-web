import { siteConfig } from "@/config/site";
import { locales, type Locale } from "@/domain/locale";

export function localizedPath(locale: Locale, path: string): string {
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

export function localizedUrl(locale: Locale, path: string): string {
  return absoluteUrl(localizedPath(locale, path));
}

export function alternateLanguages(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, localizedUrl(locale, path)])),
    "x-default": localizedUrl("fr", path),
  };
}
