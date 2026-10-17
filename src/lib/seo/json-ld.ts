import { brand } from "@/config/brand";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/domain/locale";
import type { FarmerProfile, ProductDetail } from "@/services/view-models";
import { absoluteUrl, localizedPath, localizedUrl } from "./urls";

export type JsonLdObject = { readonly "@context": "https://schema.org" } & Readonly<Record<string, unknown>>;

export interface BreadcrumbItem {
  readonly name: string;
  readonly path: string;
}

export function organizationJsonLd(locale: Locale, description: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: brand.name,
    url: localizedUrl(locale, "/"),
    logo: absoluteUrl(brand.logo.src),
    description,
  };
}

export function websiteJsonLd(locale: Locale, description: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website-${locale}`,
    name: brand.name,
    url: localizedUrl(locale, "/"),
    inLanguage: locale,
    description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl(localizedPath(locale, "/products"))}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(locale: Locale, items: readonly BreadcrumbItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: localizedUrl(locale, item.path),
    })),
  };
}

export function productJsonLd(locale: Locale, product: ProductDetail): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.gallery.map((photo) => absoluteUrl(photo.src)),
    category: product.categoryName,
    url: localizedUrl(locale, `/products/${product.slug}`),
    brand: { "@type": "Brand", name: product.farmer.farmName },
  };
}

export function farmerJsonLd(locale: Locale, farmer: FarmerProfile, regionName: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: farmer.producerName,
    description: farmer.presentation,
    image: absoluteUrl(farmer.photo.src),
    url: localizedUrl(locale, `/farmers/${farmer.slug}`),
    jobTitle: farmer.farmName,
    address: {
      "@type": "PostalAddress",
      addressLocality: farmer.city,
      addressRegion: regionName,
      addressCountry: "CM",
    },
  };
}

export function serializeJsonLd(data: JsonLdObject | readonly JsonLdObject[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
