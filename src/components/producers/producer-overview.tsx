import { Check } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { Tag } from "@/components/ui/tag";
import type { ProducerProfile } from "@/services/view-models";

export function ProducerOverview({ producer }: { producer: ProducerProfile }) {
  const t = useTranslations();
  const format = useFormatter();
  const facts = [
    { key: "type", value: t(`producerTypes.${producer.type}`) },
    { key: "location", value: t("producers.profile.location", { city: producer.city, region: t(`regions.${producer.regionId}`) }) },
    { key: "founded", value: t("producers.profile.founded", { year: String(producer.foundedYear) }) },
    { key: "area", value: t("producers.profile.area", { area: format.number(producer.areaHectares) }) },
    { key: "outputs", value: t("producers.profile.outputCount", { count: producer.outputs.length }) },
  ] as const;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-16">
      <div className="space-y-10">
        <section aria-labelledby="presentation-title">
          <h2 id="presentation-title" className="text-xl font-semibold text-ink">
            {t("producers.profile.presentation")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">{producer.presentation}</p>
        </section>
        <section aria-labelledby="story-title">
          <h2 id="story-title" className="text-xl font-semibold text-ink">
            {t("producers.profile.story")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">{producer.story}</p>
        </section>
        <section aria-labelledby="commitments-title">
          <h2 id="commitments-title" className="text-xl font-semibold text-ink">
            {t("producers.profile.commitments")}
          </h2>
          <ul className="mt-4 space-y-3">
            {producer.commitments.map((commitment) => (
              <li key={commitment} className="flex gap-3 text-base text-ink">
                <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-forest" />
                <span>{commitment}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <aside className="space-y-8 lg:border-l lg:border-line lg:pl-10">
        <section aria-labelledby="facts-title">
          <h2 id="facts-title" className="text-base font-semibold text-ink">
            {t("producers.profile.facts")}
          </h2>
          <dl className="mt-4 space-y-4">
            {facts.map((fact) => (
              <div key={fact.key}>
                <dt className="text-xs text-muted">{t(`producers.profile.factsLabels.${fact.key}`)}</dt>
                <dd className="mt-0.5 text-sm font-medium text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section aria-labelledby="specialties-title">
          <h2 id="specialties-title" className="text-base font-semibold text-ink">
            {t("producers.profile.specialties")}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {producer.specialtyIds.map((id) => (
              <li key={id}>
                <Tag>{t(`specialties.${id}`)}</Tag>
              </li>
            ))}
          </ul>
        </section>
        {producer.practiceIds.length > 0 ? (
          <section aria-labelledby="practices-list-title">
            <h2 id="practices-list-title" className="text-base font-semibold text-ink">
              {t("producers.profile.practices")}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {producer.practiceIds.map((id) => (
                <li key={id}>
                  <Tag>{t(`practices.${id}`)}</Tag>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </aside>
    </div>
  );
}
