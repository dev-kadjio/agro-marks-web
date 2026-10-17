import { Check } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { Tag } from "@/components/ui/tag";
import type { FarmerProfile } from "@/services/view-models";

export function FarmerOverview({ farmer }: { farmer: FarmerProfile }) {
  const t = useTranslations();
  const format = useFormatter();
  const facts = [
    { key: "location", value: t("farmers.profile.location", { city: farmer.city, region: t(`regions.${farmer.regionId}`) }) },
    { key: "founded", value: t("farmers.profile.founded", { year: String(farmer.foundedYear) }) },
    { key: "area", value: t("farmers.profile.area", { area: format.number(farmer.areaHectares) }) },
    { key: "products", value: t("farmers.card.productCount", { count: farmer.productCount }) },
  ] as const;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-16">
      <div className="space-y-10">
        <section aria-labelledby="presentation-title">
          <h2 id="presentation-title" className="text-xl font-semibold text-ink">
            {t("farmers.profile.presentation")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">{farmer.presentation}</p>
        </section>
        <section aria-labelledby="story-title">
          <h2 id="story-title" className="text-xl font-semibold text-ink">
            {t("farmers.profile.story")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">{farmer.story}</p>
        </section>
        <section aria-labelledby="commitments-title">
          <h2 id="commitments-title" className="text-xl font-semibold text-ink">
            {t("farmers.profile.commitments")}
          </h2>
          <ul className="mt-4 space-y-3">
            {farmer.commitments.map((commitment) => (
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
            {t("farmers.profile.facts")}
          </h2>
          <dl className="mt-4 space-y-4">
            {facts.map((fact) => (
              <div key={fact.key}>
                <dt className="text-xs text-muted">{t(`farmers.profile.factsLabels.${fact.key}`)}</dt>
                <dd className="mt-0.5 text-sm font-medium text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section aria-labelledby="specialties-title">
          <h2 id="specialties-title" className="text-base font-semibold text-ink">
            {t("farmers.profile.specialties")}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {farmer.specialtyIds.map((id) => (
              <li key={id}>
                <Tag>{t(`specialties.${id}`)}</Tag>
              </li>
            ))}
          </ul>
        </section>
        {farmer.practiceIds.length > 0 ? (
          <section aria-labelledby="practices-list-title">
            <h2 id="practices-list-title" className="text-base font-semibold text-ink">
              {t("farmers.profile.practices")}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {farmer.practiceIds.map((id) => (
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
