import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProducerTypeBadge } from "@/components/producers/producer-type-badge";
import { Section } from "@/components/ui/section";
import { cardClasses } from "@/components/ui/styles";
import type { ProducerType } from "@/domain/producer";
import { Link } from "@/i18n/navigation";
import type { PhotoView } from "@/services/view-models";

export interface ProducerTypeHighlight {
  readonly type: ProducerType;
  readonly count: number;
  readonly photo: PhotoView;
}

export function ProducerTypesIntro({ highlights }: { highlights: readonly ProducerTypeHighlight[] }) {
  const t = useTranslations("home.producerTypes");
  return (
    <Section id="producer-types" title={t("title")} description={t("description")}>
      <ul className="grid gap-6 md:grid-cols-2">
        {highlights.map((highlight) => (
          <li key={highlight.type}>
            <article className={cardClasses}>
              <div className="relative aspect-21/9 overflow-hidden bg-cream">
                <Image src={highlight.photo.src} alt={highlight.photo.alt} fill sizes="(min-width: 768px) 45vw, 90vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <ProducerTypeBadge type={highlight.type} />
                  <span className="text-sm text-muted">{t("count", { count: highlight.count })}</span>
                </div>
                <p className="mt-4 text-base leading-relaxed text-ink">{t(`${highlight.type}.text`)}</p>
                <Link
                  href={`/producers?type=${highlight.type}`}
                  className="mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-sm font-medium text-forest underline-offset-4 after:absolute after:inset-0 after:content-[''] hover:underline focus-visible:outline-none focus-visible:after:rounded-card focus-visible:after:outline-2 focus-visible:after:outline-forest"
                >
                  {t(`${highlight.type}.cta`)}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
