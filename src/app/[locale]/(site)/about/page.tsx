import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Notice } from "@/components/ui/notice";
import { PageHeader } from "@/components/ui/page-header";
import { buttonClasses } from "@/components/ui/styles";
import { Link } from "@/i18n/navigation";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { staticPageMetadata } from "@/lib/seo/static-page";
import { mediaService } from "@/services";

const values = ["transparency", "proximity", "quality", "nature"] as const;

export function generateMetadata() {
  return staticPageMetadata("about");
}

export default async function AboutPage() {
  const locale = await getLocale();
  const [t, tNav, photo] = await Promise.all([
    getTranslations("about"),
    getTranslations("navigation"),
    mediaService.getEditorialPhoto(locale, "about"),
  ]);
  const crumbs = [
    { name: tNav("home"), path: "/" },
    { name: tNav("about"), path: "/about" },
  ];
  return (
    <>
      <PageHeader title={t("title")} intro={t("intro")} breadcrumbs={<Breadcrumbs items={crumbs} />} />
      <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-2 lg:items-center">
        <section aria-labelledby="mission-title">
          <h2 id="mission-title" className="text-2xl font-semibold text-ink">
            {t("mission.title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{t("mission.text")}</p>
        </section>
        {photo ? (
          <div className="relative aspect-4/3 overflow-hidden rounded-card bg-cream">
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        ) : null}
      </Container>
      <section aria-labelledby="values-title" className="bg-cream py-12 sm:py-16">
        <Container>
          <h2 id="values-title" className="text-2xl font-semibold text-ink">
            {t("values.title")}
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <li key={value} className="rounded-card border border-line bg-white p-6">
                <h3 className="text-base font-semibold text-ink">{t(`values.${value}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(`values.${value}.text`)}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <Container className="py-12 sm:py-16">
        <section aria-labelledby="status-title" className="max-w-3xl">
          <h2 id="status-title" className="text-2xl font-semibold text-ink">
            {t("status.title")}
          </h2>
          <Notice className="mt-4">{t("status.text")}</Notice>
          <Link href="/producers" className={buttonClasses({ className: "mt-8" })}>
            {t("cta")}
          </Link>
        </section>
      </Container>
      <JsonLdScript data={breadcrumbJsonLd(locale, crumbs)} />
    </>
  );
}
