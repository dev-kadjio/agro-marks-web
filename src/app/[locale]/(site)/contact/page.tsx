import { getLocale, getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/contact-form";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Notice } from "@/components/ui/notice";
import { PageHeader } from "@/components/ui/page-header";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { staticPageMetadata } from "@/lib/seo/static-page";

export function generateMetadata() {
  return staticPageMetadata("contact");
}

export default async function ContactPage() {
  const [locale, t, tNav] = await Promise.all([getLocale(), getTranslations("contact"), getTranslations("navigation")]);
  const crumbs = [
    { name: tNav("home"), path: "/" },
    { name: tNav("contact"), path: "/contact" },
  ];
  return (
    <>
      <PageHeader title={t("title")} intro={t("intro")} breadcrumbs={<Breadcrumbs items={crumbs} />} />
      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          <Notice>{t("notice")}</Notice>
          <ContactForm />
        </div>
        <aside aria-labelledby="contact-details-title">
          <h2 id="contact-details-title" className="text-base font-semibold text-ink">
            {t("detailsTitle")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{t("detailsText")}</p>
        </aside>
      </Container>
      <JsonLdScript data={breadcrumbJsonLd(locale, crumbs)} />
    </>
  );
}
