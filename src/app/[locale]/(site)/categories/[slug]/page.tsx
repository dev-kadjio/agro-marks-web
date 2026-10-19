import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ProducerDirectory } from "@/components/producers/producer-directory";
import { ProducerTypeBadge } from "@/components/producers/producer-type-badge";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ResultsSkeleton } from "@/components/ui/results-skeleton";
import { Tag } from "@/components/ui/tag";
import { Link } from "@/i18n/navigation";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { categoryService } from "@/services";

export const instant = false;

export async function generateStaticParams() {
  const slugs = await categoryService.listSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/categories/[slug]">): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const [category, t] = await Promise.all([categoryService.getCategory(locale, slug), getTranslations("seo")]);
  if (!category) {
    return { title: t("notFound.title"), robots: { index: false } };
  }
  return buildPageMetadata({
    locale,
    path: `/categories/${category.slug}`,
    title: t("category.title", { category: category.name }),
    description: t("category.description", { summary: category.summary }),
    image: category.photo,
  });
}

export default async function CategoryPage({ params, searchParams }: PageProps<"/[locale]/categories/[slug]">) {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const category = await categoryService.getCategory(locale, slug);
  if (!category) {
    notFound();
  }
  const [t, categories] = await Promise.all([getTranslations(), categoryService.listCategories(locale)]);
  const crumbs = [
    { name: t("navigation.home"), path: "/" },
    { name: t("navigation.categories"), path: "/categories" },
    { name: category.name, path: `/categories/${category.slug}` },
  ];
  const others = categories.filter((other) => other.id !== category.id);

  return (
    <>
      <PageHeader title={category.name} intro={category.introduction} breadcrumbs={<Breadcrumbs items={crumbs} />}>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <ProducerTypeBadge type={category.producerType} className="bg-white" />
          <span className="text-sm font-medium text-forest">{t("categories.card.producerCount", { count: category.producerCount })}</span>
        </div>
        <nav aria-labelledby="other-categories" className="mt-6">
          <h2 id="other-categories" className="text-sm font-medium text-ink">
            {t("categories.detail.otherCategories")}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {others.map((other) => (
              <li key={other.id}>
                <Link href={`/categories/${other.slug}`} className="inline-flex min-h-9 items-center">
                  <Tag className="hover:border-moss hover:text-forest">{other.name}</Tag>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>
      <Container className="py-10 sm:py-14">
        <h2 className="sr-only">{t("categories.detail.producersTitle")}</h2>
        <Suspense fallback={<ResultsSkeleton count={6} />}>
          <ProducerDirectory basePath={`/categories/${category.slug}`} searchParams={searchParams} lockedCategoryId={category.id} />
        </Suspense>
      </Container>
      <JsonLdScript data={breadcrumbJsonLd(locale, crumbs)} />
    </>
  );
}
