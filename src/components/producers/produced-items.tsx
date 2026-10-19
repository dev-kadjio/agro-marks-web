import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { cardClasses } from "@/components/ui/styles";
import { months, type Month } from "@/domain/calendar";
import { monthToDate } from "@/lib/calendar";
import type { ProducedItemView } from "@/services/view-models";

function useSeasonalityLabel() {
  const t = useTranslations("producers.profile");
  const format = useFormatter();
  return (harvestMonths: readonly Month[]) => {
    if (harvestMonths.length === 0) return t("noSeasonality");
    if (harvestMonths.length === 12) return t("seasonality", { months: t("yearRound") });
    const names = months
      .filter((month) => harvestMonths.includes(month))
      .map((month) => format.dateTime(monthToDate(month), { month: "long" }));
    return t("seasonality", { months: format.list(names, { type: "conjunction" }) });
  };
}

export function ProducedItems({ items }: { items: readonly ProducedItemView[] }) {
  const seasonality = useSeasonalityLabel();
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id}>
          <article className={cardClasses}>
            <div className="relative aspect-4/3 overflow-hidden bg-cream">
              <Image
                src={item.photo.src}
                alt={item.photo.alt}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="text-xs text-muted">{item.categoryName}</p>
              <h3 className="mt-1 text-base font-semibold leading-snug text-ink">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-ink">
                <CalendarDays aria-hidden="true" className="size-4 shrink-0 text-gold" />
                {seasonality(item.harvestMonths)}
              </p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
