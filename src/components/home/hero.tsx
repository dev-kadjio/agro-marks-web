import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/styles";
import { Link } from "@/i18n/navigation";
import type { PhotoView } from "@/services/view-models";

interface HeroProps {
  readonly photo: PhotoView;
  readonly stats: { readonly producers: number; readonly categories: number; readonly regions: number };
}

export function Hero({ photo, stats }: HeroProps) {
  const t = useTranslations("home.hero");
  const format = useFormatter();
  return (
    <section aria-labelledby="hero-title" className="bg-cream">
      <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
        <div>
          <p className="text-sm font-medium text-gold">{t("eyebrow")}</p>
          <h1 id="hero-title" className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t("description")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/producers" className={buttonClasses({ size: "lg", className: "whitespace-nowrap" })}>
              {t("primaryCta")}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link href="/categories" className={buttonClasses({ variant: "secondary", size: "lg", className: "whitespace-nowrap" })}>
              {t("secondaryCta")}
            </Link>
          </div>
          <dl aria-label={t("stats.label")} className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-6">
            {(["producers", "categories", "regions"] as const).map((key) => (
              <div key={key} className="flex flex-col">
                <dt className="text-sm leading-snug text-muted">{t(`stats.${key}`, { count: stats[key] })}</dt>
                <dd className="order-first text-2xl font-semibold text-forest">{format.number(stats[key])}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative aspect-4/3 overflow-hidden rounded-card lg:aspect-5/4">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
