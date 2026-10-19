import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Benefits } from "@/components/home/benefits";
import { CallToAction } from "@/components/home/call-to-action";
import { CategoryTiles } from "@/components/home/category-tiles";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { PracticesSection } from "@/components/home/practices-section";
import { ProducerSearchForm } from "@/components/home/producer-search-form";
import { ProducerTypesIntro, type ProducerTypeHighlight } from "@/components/home/producer-types-intro";
import { Testimonials } from "@/components/home/testimonials";
import { ProducerGrid } from "@/components/producers/producer-grid";
import { Section } from "@/components/ui/section";
import { getPathname } from "@/i18n/navigation";
import { producerTypeOptions, regionOptions, specialtyOptions } from "@/lib/filters/option-labels";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { categoryService, mediaService, producerService } from "@/services";

const EXAMPLE_PRODUCER_SLUG = "cacaoyere-des-vergers-d-obala";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("seo.home")]);
  return buildPageMetadata({ locale, path: "/", title: t("title"), description: t("description"), absoluteTitle: true });
}

export default async function HomePage() {
  const locale = await getLocale();
  const [t, tCommon, categories, producers, filterOptions, heroPhoto, practicesPhoto] = await Promise.all([
    getTranslations("home"),
    getTranslations("common"),
    categoryService.listCategories(locale),
    producerService.listProducers(locale),
    producerService.getFilterOptions(locale),
    mediaService.getEditorialPhoto(locale, "hero"),
    mediaService.getEditorialPhoto(locale, "practices"),
  ]);
  const [types, regions, specialties] = await Promise.all([
    producerTypeOptions(filterOptions.types),
    regionOptions(filterOptions.regions.map((region) => region.value)),
    specialtyOptions(filterOptions.specialties.map((specialty) => specialty.value)),
  ]);
  const regionCount = new Set(producers.map((producer) => producer.regionId)).size;
  const highlights = filterOptions.types.flatMap((type): ProducerTypeHighlight[] => {
    const ofType = producers.filter((producer) => producer.type === type);
    const showcase = ofType.find((producer) => producer.featured) ?? ofType[0];
    return showcase ? [{ type, count: ofType.length, photo: showcase.photo }] : [];
  });
  const featured = producers.filter((producer) => producer.featured).slice(0, 6);

  return (
    <>
      {heroPhoto ? (
        <Hero photo={heroPhoto} stats={{ producers: producers.length, categories: categories.length, regions: regionCount }} />
      ) : null}

      <ProducerTypesIntro highlights={highlights} />

      <Section
        id="categories"
        title={t("categories.title")}
        description={t("categories.description")}
        tone="cream"
        action={{ href: "/categories", label: tCommon("viewAll") }}
      >
        <CategoryTiles categories={categories} />
      </Section>

      <Section id="find-producer" title={t("producerSearch.title")} description={t("producerSearch.description")}>
        <ProducerSearchForm action={getPathname({ href: "/producers", locale })} types={types} regions={regions} specialties={specialties} />
        <h3 className="mb-6 mt-12 text-lg font-semibold text-ink">{t("featuredProducers.title")}</h3>
        <p className="-mt-4 mb-6 text-sm text-muted">{t("featuredProducers.description")}</p>
        <ProducerGrid producers={featured} />
      </Section>

      <HowItWorks />
      <Benefits />
      {practicesPhoto ? <PracticesSection photo={practicesPhoto} exampleHref={`/producers/${EXAMPLE_PRODUCER_SLUG}`} /> : null}
      <Testimonials />
      <CallToAction
        title={t("cta.title")}
        description={t("cta.description", { producers: producers.length, regions: regionCount })}
        href="/producers"
        label={t("cta.button")}
      />
    </>
  );
}
