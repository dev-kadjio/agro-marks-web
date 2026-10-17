import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { getFormatter, getLocale, getTranslations } from "next-intl/server";
import { WhatsAppContact } from "@/components/contact/whatsapp-contact";
import { contactConfig } from "@/config/contact";
import { FavoriteButton } from "@/components/favorites/favorite-button";
import { AvailabilityBadge } from "@/components/products/availability-badge";
import { PriceTag } from "@/components/products/price-tag";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductGrid } from "@/components/products/product-grid";
import { SeasonalityCalendar } from "@/components/products/seasonality-calendar";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Notice } from "@/components/ui/notice";
import { Section } from "@/components/ui/section";
import { buttonClasses, linkClasses } from "@/components/ui/styles";
import { Link } from "@/i18n/navigation";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { localizedUrl } from "@/lib/seo/urls";
import { resolveWhatsAppContact } from "@/lib/whatsapp";
import { farmerService, productService } from "@/services";

export const instant = false;

export async function generateStaticParams() {
  const slugs = await productService.listSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/products/[slug]">): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const [product, t] = await Promise.all([productService.getProduct(locale, slug), getTranslations("seo")]);
  if (!product) {
    return { title: t("notFound.title"), robots: { index: false } };
  }
  return buildPageMetadata({
    locale,
    path: `/products/${product.slug}`,
    title: t("product.title", { product: product.name, farm: product.farmer.farmName }),
    description: t("product.description", { product: product.name, farm: product.farmer.farmName, city: product.farmer.city }),
    image: product.photo,
  });
}

export default async function ProductPage({ params }: PageProps<"/[locale]/products/[slug]">) {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const product = await productService.getProduct(locale, slug);
  if (!product) {
    notFound();
  }
  const [t, format, farmer, similar] = await Promise.all([
    getTranslations(),
    getFormatter(),
    farmerService.getFarmerProfile(locale, product.farmer.slug),
    productService.listSimilarProducts(locale, product.slug, 4),
  ]);
  const whatsappMessage = t("whatsapp.productMessage", {
    farm: product.farmer.farmName,
    product: product.name,
    price: format.number(product.price.amount, { style: "currency", currency: product.price.currency, maximumFractionDigits: 0 }),
    unit: t(`products.units.${product.unit}`),
    url: localizedUrl(locale, `/products/${product.slug}`),
  });
  const crumbs = [
    { name: t("navigation.home"), path: "/" },
    { name: t("navigation.products"), path: "/products" },
    { name: product.categoryName, path: `/categories/${product.categorySlug}` },
    { name: product.name, path: `/products/${product.slug}` },
  ];

  return (
    <>
      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={crumbs} />
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery photos={product.gallery} />
          <div>
            <Link href={`/categories/${product.categorySlug}`} className="text-sm font-medium text-gold hover:underline">
              {product.categoryName}
            </Link>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{product.name}</h1>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
              <MapPin aria-hidden="true" className="size-4 text-gold" />
              {t("products.card.by", { farm: product.farmer.farmName })} ·{" "}
              {t("farmers.profile.location", { city: product.farmer.city, region: t(`regions.${product.farmer.regionId}`) })}
            </p>
            <p className="mt-6 text-base leading-relaxed text-ink">{product.description}</p>

            <dl className="mt-8 divide-y divide-line rounded-card border border-line">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                <dt className="text-sm text-muted">{t("products.detail.price")}</dt>
                <dd>
                  <PriceTag price={product.price} unit={product.unit} size="lg" />
                </dd>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                <dt className="text-sm text-muted">{t("products.detail.unit")}</dt>
                <dd className="text-sm font-medium text-ink">{t(`products.units.${product.unit}`)}</dd>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                <dt className="text-sm text-muted">{t("products.availability.label")}</dt>
                <dd>
                  <AvailabilityBadge availability={product.availability} detailed />
                </dd>
              </div>
            </dl>
            <p className="mt-2 text-xs text-muted">{t("products.price.indicative")}</p>

            <div className="mt-6">
              <WhatsAppContact
                contact={resolveWhatsAppContact(product.farmer.whatsappNumber, contactConfig.platformWhatsAppNumber)}
                message={whatsappMessage}
                farmName={product.farmer.farmName}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <FavoriteButton kind="product" id={product.id} name={product.name} variant="labelled" />
              <Link href={`/farmers/${product.farmer.slug}`} className={buttonClasses({ variant: "secondary" })}>
                {t("products.detail.viewProducer")}
              </Link>
            </div>
            <Notice className="mt-6">{t("products.detail.noOrderNotice")}</Notice>

            <section aria-labelledby="seasonality-title" className="mt-10">
              <h2 id="seasonality-title" className="text-lg font-semibold text-ink">
                {t("products.detail.seasonality")}
              </h2>
              <div className="mt-4">
                <SeasonalityCalendar harvestMonths={product.harvestMonths} />
              </div>
            </section>
          </div>
        </div>
      </Container>

      {farmer ? (
        <section aria-labelledby="producer-title" className="bg-cream py-14 sm:py-16">
          <Container className="grid items-center gap-8 md:grid-cols-[18rem_1fr]">
            <div className="relative aspect-4/3 overflow-hidden rounded-card bg-white">
              <Image src={farmer.photo.src} alt={farmer.photo.alt} fill sizes="(min-width: 768px) 18rem, 100vw" className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium text-gold">{t("products.detail.producer")}</p>
              <h2 id="producer-title" className="mt-2 text-2xl font-semibold text-ink">
                {farmer.farmName}
              </h2>
              <p className="mt-1 text-sm text-muted">{t("farmers.profile.producer", { name: farmer.producerName })}</p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{farmer.presentation}</p>
              <Link href={`/farmers/${farmer.slug}`} className={`${linkClasses} mt-5 inline-flex min-h-11 items-center gap-2`}>
                {t("products.detail.viewProducer")}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </Container>
        </section>
      ) : null}

      {similar.length > 0 ? (
        <Section id="similar-products" title={t("products.detail.similar")}>
          <ProductGrid products={similar} />
        </Section>
      ) : null}

      <JsonLdScript data={[breadcrumbJsonLd(locale, crumbs), productJsonLd(locale, product)]} />
    </>
  );
}
