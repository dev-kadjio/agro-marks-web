import { getLocale, getTranslations } from "next-intl/server";
import { TextSections } from "@/components/content/text-sections";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { linkClasses } from "@/components/ui/styles";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { staticPageMetadata } from "@/lib/seo/static-page";
import { mediaService } from "@/services";

const sections = ["publisher", "director", "hosting", "content", "ip"] as const;

export function generateMetadata() {
  return staticPageMetadata("legal");
}

export default async function LegalPage() {
  const [locale, t, tNav, credits] = await Promise.all([
    getLocale(),
    getTranslations("legal"),
    getTranslations("navigation"),
    mediaService.listPhotoCredits(),
  ]);
  const crumbs = [
    { name: tNav("home"), path: "/" },
    { name: tNav("legal"), path: "/legal" },
  ];
  return (
    <>
      <PageHeader title={t("title")} intro={t("intro")} breadcrumbs={<Breadcrumbs items={crumbs} />} />
      <Container className="space-y-14 py-12 sm:py-16">
        <TextSections
          sections={sections.map((id) => ({ id, title: t(`sections.${id}.title`), text: t(`sections.${id}.text`) }))}
        />
        <section aria-labelledby="credits-title">
          <h2 id="credits-title" className="text-xl font-semibold text-ink">
            {t("credits.title")}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">{t("credits.intro")}</p>
          <ul className="mt-6 grid gap-x-8 gap-y-3 text-sm md:grid-cols-2">
            {credits.map((credit) => (
              <li key={credit.id} className="border-b border-line pb-3">
                <span className="block text-ink">{credit.title}</span>
                <span className="text-muted">
                  {credit.author} ·{" "}
                  {credit.licenseUrl ? (
                    <a href={credit.licenseUrl} className={linkClasses} rel="license noopener" target="_blank">
                      {credit.license}
                    </a>
                  ) : (
                    credit.license
                  )}{" "}
                  ·{" "}
                  <a href={credit.sourceUrl} className={linkClasses} rel="noopener" target="_blank">
                    {t("credits.source")}
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </Container>
      <JsonLdScript data={breadcrumbJsonLd(locale, crumbs)} />
    </>
  );
}
