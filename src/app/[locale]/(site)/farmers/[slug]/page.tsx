import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { WhatsAppContact } from "@/components/contact/whatsapp-contact";
import { FavoriteButton } from "@/components/favorites/favorite-button";
import { FarmerGallery } from "@/components/farmers/farmer-gallery";
import { FarmerGrid } from "@/components/farmers/farmer-grid";
import { FarmerOverview } from "@/components/farmers/farmer-overview";
import { FarmerProductsExplorer } from "@/components/farmers/farmer-products-explorer";
import { ProductionProcess } from "@/components/farmers/production-process";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Notice } from "@/components/ui/notice";
import { Section } from "@/components/ui/section";
import { buttonClasses } from "@/components/ui/styles";
import { contactConfig } from "@/config/contact";
import { breadcrumbJsonLd, farmerJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { localizedUrl } from "@/lib/seo/urls";
import { resolveWhatsAppContact } from "@/lib/whatsapp";
import { farmerService, productService } from "@/services";

export const instant = false;

export async function generateStaticParams() {
  const slugs = await farmerService.listSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/farmers/[slug]">): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const [farmer, t] = await Promise.all([farmerService.getFarmerProfile(locale, slug), getTranslations("seo")]);
  if (!farmer) {
    return { title: t("notFound.title"), robots: { index: false } };
  }
  return buildPageMetadata({
    locale,
    path: `/farmers/${farmer.slug}`,
    title: t("farmer.title", { farm: farmer.farmName, city: farmer.city }),
    description: t("farmer.description", { tagline: farmer.tagline }),
    image: farmer.photo,
    type: "article",
  });
}

export default async function FarmerProfilePage({ params }: PageProps<"/[locale]/farmers/[slug]">) {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const farmer = await farmerService.getFarmerProfile(locale, slug);
  if (!farmer) {
    notFound();
  }
  const [t, products, similar] = await Promise.all([
    getTranslations(),
    productService.listFarmerProducts(locale, farmer.id),
    farmerService.listSimilarFarmers(locale, farmer.slug, 3),
  ]);
  const regionName = t(`regions.${farmer.regionId}`);
  const crumbs = [
    { name: t("navigation.home"), path: "/" },
    { name: t("navigation.farmers"), path: "/farmers" },
    { name: farmer.farmName, path: `/farmers/${farmer.slug}` },
  ];

  return (
    <>
      <div className="border-b border-line bg-cream">
        <Container className="pt-8">
          <Breadcrumbs items={crumbs} />
        </Container>
        <Container className="pb-10">
          <div className="relative aspect-16/9 overflow-hidden rounded-card bg-white sm:aspect-21/9">
            <Image src={farmer.photo.src} alt={farmer.photo.alt} fill loading="eager" fetchPriority="high" sizes="(min-width: 1280px) 80rem, 100vw" className="object-cover" />
          </div>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="flex items-center gap-1.5 text-sm text-muted">
                <MapPin aria-hidden="true" className="size-4 text-gold" />
                {t("farmers.profile.location", { city: farmer.city, region: regionName })}
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{farmer.farmName}</h1>
              <p className="mt-2 text-base text-muted">{t("farmers.profile.producer", { name: farmer.producerName })}</p>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink">{farmer.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#products" className={buttonClasses()}>
                {t("farmers.profile.productsCta")}
              </a>
              <FavoriteButton kind="farmer" id={farmer.id} name={farmer.farmName} variant="labelled" />
            </div>
          </div>
          <div className="mt-6 max-w-md">
            <WhatsAppContact
              contact={resolveWhatsAppContact(farmer.whatsappNumber, contactConfig.platformWhatsAppNumber)}
              message={t("whatsapp.farmerMessage", { farm: farmer.farmName, url: localizedUrl(locale, `/farmers/${farmer.slug}`) })}
              farmName={farmer.farmName}
            />
          </div>
        </Container>
      </div>

      <Container className="py-14 sm:py-16">
        <FarmerOverview farmer={farmer} />
      </Container>

      <Section id="production" title={t("farmers.production.title")} description={t("farmers.production.description")} tone="cream">
        <ProductionProcess type={farmer.productionType} stages={farmer.production} />
      </Section>

      <Section id="gallery" title={t("farmers.profile.gallery")}>
        <FarmerGallery photos={farmer.gallery} />
      </Section>

      <Section
        id="products"
        title={t("farmers.profile.productsTitle", { name: farmer.farmName })}
        description={t("farmers.profile.productsDescription")}
        tone="cream"
      >
        <FarmerProductsExplorer products={products} />
      </Section>

      {similar.length > 0 ? (
        <Section id="similar" title={t("farmers.profile.similar")}>
          <FarmerGrid farmers={similar} />
        </Section>
      ) : null}

      <Container className="pb-14">
        <Notice>{t("farmers.profile.demoNotice")}</Notice>
      </Container>

      <JsonLdScript data={[breadcrumbJsonLd(locale, crumbs), farmerJsonLd(locale, farmer, regionName)]} />
    </>
  );
}
