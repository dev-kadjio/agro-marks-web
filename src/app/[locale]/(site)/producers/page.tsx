import { Suspense } from "react";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { ProducerDirectory } from "@/components/producers/producer-directory";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ResultsSkeleton } from "@/components/ui/results-skeleton";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("seo.producers")]);
  return buildPageMetadata({ locale, path: "/producers", title: t("title"), description: t("description") });
}

export default async function ProducersPage({ searchParams }: PageProps<"/[locale]/producers">) {
  const [locale, t, tNav] = await Promise.all([getLocale(), getTranslations("producers.list"), getTranslations("navigation")]);
  const crumbs = [
    { name: tNav("home"), path: "/" },
    { name: tNav("producers"), path: "/producers" },
  ];
  return (
    <>
      <PageHeader title={t("title")} intro={t("intro")} breadcrumbs={<Breadcrumbs items={crumbs} />} />
      <Container className="py-10 sm:py-14">
        <Suspense fallback={<ResultsSkeleton />}>
          <ProducerDirectory basePath="/producers" searchParams={searchParams} />
        </Suspense>
      </Container>
      <JsonLdScript data={breadcrumbJsonLd(locale, crumbs)} />
    </>
  );
}
