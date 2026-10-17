import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { FavoritesView } from "@/components/favorites/favorites-view";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Notice } from "@/components/ui/notice";
import { PageHeader } from "@/components/ui/page-header";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { farmerService, productService } from "@/services";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("seo.favorites")]);
  return buildPageMetadata({ locale, path: "/favorites", title: t("title"), description: t("description"), noIndex: true });
}

export default async function FavoritesPage() {
  const locale = await getLocale();
  const [t, products, farmers] = await Promise.all([
    getTranslations(),
    productService.listAllProducts(locale),
    farmerService.listFarmers(locale),
  ]);
  const crumbs = [
    { name: t("navigation.home"), path: "/" },
    { name: t("navigation.favorites"), path: "/favorites" },
  ];
  return (
    <>
      <PageHeader title={t("favorites.title")} intro={t("favorites.intro")} breadcrumbs={<Breadcrumbs items={crumbs} />}>
        <Notice className="mt-6 max-w-3xl">{t("favorites.localNotice")}</Notice>
      </PageHeader>
      <Container className="py-10 sm:py-14">
        <FavoritesView products={products} farmers={farmers} />
      </Container>
    </>
  );
}
