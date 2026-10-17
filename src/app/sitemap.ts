import type { MetadataRoute } from "next";
import { locales } from "@/domain/locale";
import { alternateLanguages, localizedUrl } from "@/lib/seo/urls";
import { categoryService, farmerService, productService } from "@/services";

const staticPaths = ["/", "/products", "/farmers", "/categories", "/about", "/contact", "/faq", "/legal", "/privacy"] as const;

function entriesFor(path: string, priority: number): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: localizedUrl(locale, path),
    changeFrequency: "weekly",
    priority,
    alternates: { languages: alternateLanguages(path) },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [farmerSlugs, productSlugs, categorySlugs] = await Promise.all([
    farmerService.listSlugs(),
    productService.listSlugs(),
    categoryService.listSlugs(),
  ]);
  return [
    ...staticPaths.flatMap((path) => entriesFor(path, path === "/" ? 1 : 0.7)),
    ...categorySlugs.flatMap((slug) => entriesFor(`/categories/${slug}`, 0.6)),
    ...farmerSlugs.flatMap((slug) => entriesFor(`/farmers/${slug}`, 0.8)),
    ...productSlugs.flatMap((slug) => entriesFor(`/products/${slug}`, 0.6)),
  ];
}
