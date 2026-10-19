import { Suspense } from "react";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { ProductCatalog } from "@/components/products/product-catalog";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Notice } from "@/components/ui/notice";
import { PageHeader } from "@/components/ui/page-header";
import { ResultsSkeleton } from "@/components/ui/results-skeleton";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("seo.products")]);
  return buildPageMetadata({ locale, path: "/products", title: t("title"), description: t("description"), noIndex: true });
}

export default async function ProductsPage({ searchParams }: PageProps<"/[locale]/products">) {
  const [locale, t] = await Promise.all([getLocale(), getTranslations()]);
  const crumbs = [
    { name: t("navigation.home"), path: "/" },
    { name: t("navigation.products"), path: "/products" },
  ];
  return (
    <>
      <PageHeader title={t("products.list.title")} intro={t("products.list.intro")} breadcrumbs={<Breadcrumbs items={crumbs} />}>
        <Notice className="mt-6 max-w-3xl">{t("products.detail.noOrderNotice")}</Notice>
      </PageHeader>
      <Container className="py-10 sm:py-14">
        <Suspense fallback={<ResultsSkeleton count={9} />}>
          <ProductCatalog basePath="/products" searchParams={searchParams} />
        </Suspense>
      </Container>
      <JsonLdScript data={breadcrumbJsonLd(locale, crumbs)} />
    </>
  );
}
