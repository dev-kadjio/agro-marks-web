import type { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowDown, MapPin } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { WhatsAppContact } from "@/components/contact/whatsapp-contact";
import { FavoriteButton } from "@/components/favorites/favorite-button";
import { LivestockOverview } from "@/components/producers/livestock-overview";
import { ProducedItems } from "@/components/producers/produced-items";
import { ProducerGallery } from "@/components/producers/producer-gallery";
import { ProducerGrid } from "@/components/producers/producer-grid";
import { ProducerOverview } from "@/components/producers/producer-overview";
import { ProducerTypeBadge } from "@/components/producers/producer-type-badge";
import { ProductionProcess } from "@/components/producers/production-process";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Notice } from "@/components/ui/notice";
import { Section } from "@/components/ui/section";
import { buttonClasses } from "@/components/ui/styles";
import { contactConfig } from "@/config/contact";
import { breadcrumbJsonLd, producerJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { localizedUrl } from "@/lib/seo/urls";
import { resolveWhatsAppContact } from "@/lib/whatsapp";
import { producerService } from "@/services";

export const instant = false;

interface ProfileSection {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly content: ReactNode;
}

export async function generateStaticParams() {
  const slugs = await producerService.listSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/producers/[slug]">): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const [producer, t] = await Promise.all([producerService.getProducerProfile(locale, slug), getTranslations()]);
  if (!producer) {
    return { title: t("seo.notFound.title"), robots: { index: false } };
  }
  return buildPageMetadata({
    locale,
    path: `/producers/${producer.slug}`,
    title: t("seo.producer.title", { farm: producer.farmName, type: t(`producerTypes.${producer.type}`), city: producer.city }),
    description: t("seo.producer.description", { tagline: producer.tagline }),
    image: producer.photo,
    type: "article",
  });
}

export default async function ProducerProfilePage({ params }: PageProps<"/[locale]/producers/[slug]">) {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const producer = await producerService.getProducerProfile(locale, slug);
  if (!producer) {
    notFound();
  }
  const [t, similar] = await Promise.all([getTranslations(), producerService.listSimilarProducers(locale, producer.slug, 3)]);
  const regionName = t(`regions.${producer.regionId}`);
  const crumbs = [
    { name: t("navigation.home"), path: "/" },
    { name: t("navigation.producers"), path: "/producers" },
    { name: producer.farmName, path: `/producers/${producer.slug}` },
  ];
  const sections: ProfileSection[] = [
    ...(producer.livestock.length > 0
      ? [
          {
            id: "livestock",
            title: t("producers.profile.livestockTitle"),
            description: t("producers.profile.livestockDescription"),
            content: <LivestockOverview livestock={producer.livestock} />,
          },
        ]
      : []),
    {
      id: "production",
      title: t("producers.production.title"),
      description: t("producers.production.description"),
      content: <ProductionProcess production={producer.production} />,
    },
    ...(producer.outputs.length > 0
      ? [
          {
            id: "outputs",
            title: t("producers.profile.outputsTitle", { type: producer.type }),
            description: t("producers.profile.outputsDescription", { type: producer.type }),
            content: <ProducedItems items={producer.outputs} />,
          },
        ]
      : []),
    { id: "gallery", title: t("producers.profile.gallery"), content: <ProducerGallery photos={producer.gallery} /> },
    ...(similar.length > 0
      ? [{ id: "similar", title: t("producers.profile.similar"), content: <ProducerGrid producers={similar} /> }]
      : []),
  ];

  return (
    <>
      <div className="border-b border-line bg-cream">
        <Container className="pt-8">
          <Breadcrumbs items={crumbs} />
        </Container>
        <Container className="pb-10">
          <div className="relative aspect-16/9 overflow-hidden rounded-card bg-white sm:aspect-21/9">
            <Image src={producer.photo.src} alt={producer.photo.alt} fill loading="eager" fetchPriority="high" sizes="(min-width: 1280px) 80rem, 100vw" className="object-cover" />
          </div>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <ProducerTypeBadge type={producer.type} className="bg-white" />
                <p className="flex items-center gap-1.5 text-sm text-muted">
                  <MapPin aria-hidden="true" className="size-4 text-gold" />
                  {t("producers.profile.location", { city: producer.city, region: regionName })}
                </p>
              </div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{producer.farmName}</h1>
              <p className="mt-2 text-base text-muted">{t("producers.profile.runBy", { name: producer.producerName })}</p>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink">{producer.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#production" className={buttonClasses()}>
                {t("producers.profile.productionCta")}
                <ArrowDown aria-hidden="true" className="size-4" />
              </a>
              <FavoriteButton kind="producer" id={producer.id} name={producer.farmName} variant="labelled" />
            </div>
          </div>
          <div className="mt-6 max-w-md">
            <WhatsAppContact
              contact={resolveWhatsAppContact(producer.whatsappNumber, contactConfig.platformWhatsAppNumber)}
              message={t("whatsapp.producerMessage", { farm: producer.farmName, url: localizedUrl(locale, `/producers/${producer.slug}`) })}
              farmName={producer.farmName}
            />
          </div>
        </Container>
      </div>

      <Container className="py-14 sm:py-16">
        <ProducerOverview producer={producer} />
      </Container>

      {sections.map((section, index) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          description={section.description}
          tone={index % 2 === 0 ? "cream" : "white"}
        >
          {section.content}
        </Section>
      ))}

      <Container className="py-14">
        <Notice>{t("producers.profile.demoNotice")}</Notice>
      </Container>

      <JsonLdScript data={[breadcrumbJsonLd(locale, crumbs), producerJsonLd(locale, producer, regionName)]} />
    </>
  );
}
