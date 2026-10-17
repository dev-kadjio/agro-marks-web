import { defaultLocale, locales, type Locale, type LocalizedText } from "@/domain/locale";

export function localize(text: LocalizedText, locale: Locale): string {
  const value = text[locale];
  return value && value.trim().length > 0 ? value : text[defaultLocale];
}

export function allTranslations(text: LocalizedText): string[] {
  return locales.map((locale) => text[locale]).filter((value): value is string => Boolean(value));
}
