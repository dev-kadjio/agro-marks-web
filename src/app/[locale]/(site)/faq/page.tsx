import { ChevronDown } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { staticPageMetadata } from "@/lib/seo/static-page";

const questions = ["what", "order", "prices", "farmers", "certification", "favorites", "join", "languages"] as const;

export function generateMetadata() {
  return staticPageMetadata("faq");
}

export default async function FaqPage() {
  const [locale, t, tNav] = await Promise.all([getLocale(), getTranslations("faq"), getTranslations("navigation")]);
  const crumbs = [
    { name: tNav("home"), path: "/" },
    { name: tNav("faq"), path: "/faq" },
  ];
  return (
    <>
      <PageHeader title={t("title")} intro={t("intro")} breadcrumbs={<Breadcrumbs items={crumbs} />} />
      <Container className="py-12 sm:py-16">
        <ul className="max-w-3xl divide-y divide-line rounded-card border border-line bg-white">
          {questions.map((key) => (
            <li key={key}>
              <details className="group px-5 sm:px-6">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-medium text-ink [&::-webkit-details-marker]:hidden">
                  <h2 className="text-base font-medium">{t(`items.${key}.question`)}</h2>
                  <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
                </summary>
                <p className="pb-5 text-base leading-relaxed text-muted">{t(`items.${key}.answer`)}</p>
              </details>
            </li>
          ))}
        </ul>
      </Container>
      <JsonLdScript data={breadcrumbJsonLd(locale, crumbs)} />
    </>
  );
}
