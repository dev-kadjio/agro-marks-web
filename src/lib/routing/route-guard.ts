import { isLocale, type Locale } from "@/domain/locale";
import { slugCollections, type SlugCollection, type SlugIndex } from "@/repositories/contracts";

export const NOT_FOUND_SEGMENT = "page-not-found";

const staticSections = new Set(["farmers", "products", "categories", "favorites", "about", "contact", "faq", "legal", "privacy", "login", "register", "account", NOT_FOUND_SEGMENT]);

export type RouteCheck =
  | { readonly status: "pass" }
  | { readonly status: "bad-request" }
  | { readonly status: "not-found"; readonly locale: Locale };

function isSlugCollection(value: string): value is SlugCollection {
  return (slugCollections as readonly string[]).includes(value);
}

function safeDecode(value: string): string | null {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
}

export function checkRoute(pathname: string, slugs: SlugIndex): RouteCheck {
  const rawSegments = pathname.split("/").filter((segment) => segment.length > 0);
  const decoded = rawSegments.map(safeDecode);
  if (decoded.includes(null)) {
    return { status: "bad-request" };
  }
  const [locale, section, slug, ...extra] = decoded;
  if (!locale || !isLocale(locale) || !section) {
    return { status: "pass" };
  }
  const notFound: RouteCheck = { status: "not-found", locale };

  if (extra.length > 0) {
    return notFound;
  }
  if (slug === undefined) {
    return staticSections.has(section) ? { status: "pass" } : notFound;
  }
  if (isSlugCollection(section) && slug && slugs.has(section, slug)) {
    return { status: "pass" };
  }
  return notFound;
}
