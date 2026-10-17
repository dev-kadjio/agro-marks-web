import Image from "next/image";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/styles";
import { Link } from "@/i18n/navigation";
import type { PhotoView } from "@/services/view-models";

const points = ["declared", "noLabel", "adapted"] as const;

export function PracticesSection({ photo, exampleHref }: { photo: PhotoView; exampleHref: string }) {
  const t = useTranslations("home.practices");
  return (
    <section aria-labelledby="practices-title" className="bg-white py-14 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-4/3 overflow-hidden rounded-card bg-cream">
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        </div>
        <div>
          <h2 id="practices-title" className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{t("description")}</p>
          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-base text-ink">
                <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-forest" />
                <span>{t(`points.${point}`)}</span>
              </li>
            ))}
          </ul>
          <Link href={exampleHref} className={buttonClasses({ variant: "secondary", className: "mt-8" })}>
            {t("cta")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
