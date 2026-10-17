import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { CategoryTiles } from "@/components/home/category-tiles";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { categoryService } from "@/services";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("seo.categories")]);
  return buildPageMetadata({ locale, path: "/categories", title: t("title"), description: t("description") });
}

export default async function CategoriesPage() {
  const locale = await getLocale();
  const [t, categories] = await Promise.all([getTranslations(), categoryService.listCategories(locale)]);
  const crumbs = [
    { name: t("navigation.home"), path: "/" },
    { name: t("navigation.categories"), path: "/categories" },
  ];
  return (
    <>
      <PageHeader title={t("categories.list.title")} intro={t("categories.list.intro")} breadcrumbs={<Breadcrumbs items={crumbs} />} />
      <Container className="py-10 sm:py-14">
        <CategoryTiles categories={categories} headingLevel="h2" />
      </Container>
      <JsonLdScript data={breadcrumbJsonLd(locale, crumbs)} />
    </>
  );
}
