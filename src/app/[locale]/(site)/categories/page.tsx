import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { CategoryTiles } from "@/components/home/category-tiles";
import { ProducerTypeBadge } from "@/components/producers/producer-type-badge";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { producerTypes } from "@/domain/producer";
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
  const groups = producerTypes
    .map((type) => ({ type, categories: categories.filter((category) => category.producerType === type) }))
    .filter((group) => group.categories.length > 0);

  return (
    <>
      <PageHeader title={t("categories.list.title")} intro={t("categories.list.intro")} breadcrumbs={<Breadcrumbs items={crumbs} />} />
      <Container className="space-y-14 py-10 sm:py-14">
        {groups.map((group) => (
          <section key={group.type} aria-labelledby={`categories-${group.type}`}>
            <div className="mb-6 max-w-2xl">
              <ProducerTypeBadge type={group.type} />
              <h2 id={`categories-${group.type}`} className="mt-3 text-2xl font-semibold tracking-tight text-ink">
                {t(`categories.groups.${group.type}.title`)}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-muted">{t(`categories.groups.${group.type}.description`)}</p>
            </div>
            <CategoryTiles categories={group.categories} showSummary />
          </section>
        ))}
      </Container>
      <JsonLdScript data={breadcrumbJsonLd(locale, crumbs)} />
    </>
  );
}
