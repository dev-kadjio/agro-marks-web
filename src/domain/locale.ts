export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale = "fr" satisfies Locale;

type DefaultLocale = typeof defaultLocale;

export type LocalizedText = { readonly [L in DefaultLocale]: string } & {
  readonly [L in Exclude<Locale, DefaultLocale>]?: string;
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
