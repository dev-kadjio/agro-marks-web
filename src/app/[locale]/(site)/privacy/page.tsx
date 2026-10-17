import { getLocale, getTranslations } from "next-intl/server";
import { TextSections } from "@/components/content/text-sections";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { staticPageMetadata } from "@/lib/seo/static-page";

const sections = ["controller", "collected", "local", "whatsapp", "cookies", "rights"] as const;

export function generateMetadata() {
  return staticPageMetadata("privacy");
}

export default async function PrivacyPage() {
  const [locale, t, tNav] = await Promise.all([getLocale(), getTranslations("privacy"), getTranslations("navigation")]);
  const crumbs = [
    { name: tNav("home"), path: "/" },
    { name: tNav("privacy"), path: "/privacy" },
  ];
  return (
    <>
      <PageHeader title={t("title")} intro={t("intro")} breadcrumbs={<Breadcrumbs items={crumbs} />} />
      <Container className="py-12 sm:py-16">
        <TextSections
          sections={sections.map((id) => ({ id, title: t(`sections.${id}.title`), text: t(`sections.${id}.text`) }))}
        />
      </Container>
      <JsonLdScript data={breadcrumbJsonLd(locale, crumbs)} />
    </>
  );
}
