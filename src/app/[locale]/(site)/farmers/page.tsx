import { Suspense } from "react";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { FarmerDirectory } from "@/components/farmers/farmer-directory";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ResultsSkeleton } from "@/components/ui/results-skeleton";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("seo.farmers")]);
  return buildPageMetadata({ locale, path: "/farmers", title: t("title"), description: t("description") });
}

export default async function FarmersPage({ searchParams }: PageProps<"/[locale]/farmers">) {
  const [locale, t, tNav] = await Promise.all([getLocale(), getTranslations("farmers.list"), getTranslations("navigation")]);
  const crumbs = [
    { name: tNav("home"), path: "/" },
    { name: tNav("farmers"), path: "/farmers" },
  ];
  return (
    <>
      <PageHeader title={t("title")} intro={t("intro")} breadcrumbs={<Breadcrumbs items={crumbs} />} />
      <Container className="py-10 sm:py-14">
        <Suspense fallback={<ResultsSkeleton />}>
          <FarmerDirectory searchParams={searchParams} />
        </Suspense>
      </Container>
      <JsonLdScript data={breadcrumbJsonLd(locale, crumbs)} />
    </>
  );
}
