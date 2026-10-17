import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "@/domain/locale";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: false,
  localeCookie: false,
  alternateLinks: false,
});

export const TIME_ZONE = "Africa/Douala";
