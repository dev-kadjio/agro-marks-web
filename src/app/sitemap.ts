import type { MetadataRoute } from "next";
import { locales } from "@/domain/locale";
import { alternateLanguages, localizedUrl } from "@/lib/seo/urls";
import { categoryService, producerService } from "@/services";

const staticPaths = ["/", "/producers", "/categories", "/about", "/contact", "/faq", "/legal", "/privacy"] as const;

function entriesFor(path: string, priority: number): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: localizedUrl(locale, path),
    changeFrequency: "weekly",
    priority,
    alternates: { languages: alternateLanguages(path) },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [producerSlugs, categorySlugs] = await Promise.all([producerService.listSlugs(), categoryService.listSlugs()]);
  return [
    ...staticPaths.flatMap((path) => entriesFor(path, path === "/" ? 1 : 0.7)),
    ...categorySlugs.flatMap((slug) => entriesFor(`/categories/${slug}`, 0.6)),
    ...producerSlugs.flatMap((slug) => entriesFor(`/producers/${slug}`, 0.8)),
  ];
}
