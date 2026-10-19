import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ProductionView } from "@/services/view-models";

export function ProductionProcess({ production }: { production: ProductionView }) {
  const t = useTranslations("producers.production");
  return (
    <div>
      <p className="text-sm font-medium text-gold">{t(`type.${production.type}`)}</p>
      <ol className="mt-6 space-y-6">
        {production.stages.map((stage, index) => (
          <li key={stage.key} className="relative grid gap-5 rounded-card border border-line bg-white p-5 sm:p-6 md:grid-cols-[1fr_16rem]">
            <div>
              <p className="flex items-center gap-3 text-sm text-muted">
                <span
                  aria-hidden="true"
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-forest text-sm font-semibold text-white"
                >
                  {index + 1}
                </span>
                <span>
                  <span className="sr-only">{t("stepLabel", { index: index + 1 })} — </span>
                  {t(`stages.${production.type}.${stage.key}` as Parameters<typeof t>[0])}
                </span>
              </p>
              <h3 className="mt-3 text-lg font-semibold text-ink">{stage.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted">{stage.description}</p>
            </div>
            {stage.photo ? (
              <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-cream md:aspect-auto md:min-h-40">
                <Image src={stage.photo.src} alt={stage.photo.alt} fill sizes="(min-width: 768px) 16rem, 90vw" className="object-cover" />
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
