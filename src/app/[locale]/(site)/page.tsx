import type { Metadata } from "next";
import { getFormatter, getLocale, getTranslations } from "next-intl/server";
import { FarmerGrid } from "@/components/farmers/farmer-grid";
import { Benefits } from "@/components/home/benefits";
import { CallToAction } from "@/components/home/call-to-action";
import { CategoryTiles } from "@/components/home/category-tiles";
import { FarmerSearchForm } from "@/components/home/farmer-search-form";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { PracticesSection } from "@/components/home/practices-section";
import { Testimonials } from "@/components/home/testimonials";
import { ProductCarousel } from "@/components/products/product-carousel";
import { ProductGrid } from "@/components/products/product-grid";
import { Section } from "@/components/ui/section";
import { getPathname } from "@/i18n/navigation";
import { monthToDate } from "@/lib/calendar";
import { getCurrentMonth } from "@/lib/current-date";
import { regionOptions, specialtyOptions } from "@/lib/filters/option-labels";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { categoryService, farmerService, mediaService, productService } from "@/services";

const EXAMPLE_FARMER_SLUG = "cacaoyere-des-vergers-d-obala";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("seo.home")]);
  return buildPageMetadata({ locale, path: "/", title: t("title"), description: t("description"), absoluteTitle: true });
}

export default async function HomePage() {
  const locale = await getLocale();
  const month = await getCurrentMonth();
  const [t, tCommon, format, featured, categories, farmers, seasonal, farmerOptions, heroPhoto, practicesPhoto] =
    await Promise.all([
      getTranslations("home"),
      getTranslations("common"),
      getFormatter(),
      productService.listFeaturedProducts(locale, 8),
      categoryService.listCategories(locale),
      farmerService.listFarmers(locale),
      productService.listSeasonalProducts(locale, month, 4),
      farmerService.getFilterOptions(locale),
      mediaService.getEditorialPhoto(locale, "hero"),
      mediaService.getEditorialPhoto(locale, "practices"),
    ]);
  const [regions, specialties, popular] = await Promise.all([
    regionOptions(farmerOptions.regionIds),
    specialtyOptions(farmerOptions.specialtyIds),
    productService.listPopularProducts(
      locale,
      4,
      featured.map((product) => product.id),
    ),
  ]);
  const regionCount = new Set(farmers.map((farmer) => farmer.regionId)).size;
  const productCount = categories.reduce((sum, category) => sum + category.productCount, 0);
  const monthName = format.dateTime(monthToDate(month), { month: "long" });

  return (
    <>
      {heroPhoto ? <Hero photo={heroPhoto} stats={{ farmers: farmers.length, products: productCount, regions: regionCount }} /> : null}

      <Section id="featured" title={t("featured.title")} description={t("featured.description")} action={{ href: "/products", label: tCommon("viewAll") }}>
        <ProductCarousel label={t("featured.title")} products={featured} />
      </Section>

      <Section id="categories" title={t("categories.title")} description={t("categories.description")} tone="cream" action={{ href: "/categories", label: tCommon("viewAll") }}>
        <CategoryTiles categories={categories} />
      </Section>

      <Section id="find-farmer" title={t("farmerSearch.title")} description={t("farmerSearch.description")}>
        <FarmerSearchForm action={getPathname({ href: "/farmers", locale })} regions={regions} specialties={specialties} />
        <h3 className="mb-6 mt-12 text-lg font-semibold text-ink">{t("featuredFarmers.title")}</h3>
        <p className="-mt-4 mb-6 text-sm text-muted">{t("featuredFarmers.description")}</p>
        <FarmerGrid farmers={farmers.filter((farmer) => farmer.featured).slice(0, 6)} />
      </Section>

      <Section id="popular" title={t("popular.title")} description={t("popular.description")} tone="cream" action={{ href: "/products", label: tCommon("viewAll") }}>
        <ProductGrid products={popular} />
      </Section>

      <Section id="seasonal" title={t("seasonal.title", { month: monthName })} description={t("seasonal.description")}>
        {seasonal.length > 0 ? <ProductGrid products={seasonal} /> : <p className="text-muted">{t("seasonal.empty")}</p>}
      </Section>

      <HowItWorks />
      <Benefits />
      {practicesPhoto ? <PracticesSection photo={practicesPhoto} exampleHref={`/farmers/${EXAMPLE_FARMER_SLUG}`} /> : null}
      <Testimonials />
      <CallToAction
        title={t("cta.title")}
        description={t("cta.description", { farmers: farmers.length, regions: regionCount })}
        href="/farmers"
        label={t("cta.button")}
      />
    </>
  );
}
