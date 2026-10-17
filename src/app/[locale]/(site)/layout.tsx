import { getTranslations } from "next-intl/server";
import { DemoBanner } from "@/components/layout/demo-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getCurrentYear } from "@/lib/current-date";

export default async function SiteLayout({ children }: LayoutProps<"/[locale]">) {
  const [t, year] = await Promise.all([getTranslations("navigation"), getCurrentYear()]);
  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-forest px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t("skipToContent")}
      </a>
      <DemoBanner />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <SiteFooter year={year} />
    </>
  );
}
