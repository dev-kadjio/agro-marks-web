import { Check } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { months, type Month } from "@/domain/calendar";
import { monthToDate } from "@/lib/calendar";
import { cn } from "@/lib/cn";

export function SeasonalityCalendar({ harvestMonths }: { harvestMonths: readonly Month[] }) {
  const t = useTranslations("products.detail");
  const format = useFormatter();

  if (harvestMonths.length === 0) {
    return <p className="text-sm text-muted">{t("noSeasonality")}</p>;
  }
  if (harvestMonths.length === 12) {
    return <p className="text-sm text-ink">{t("yearRound")}</p>;
  }

  const monthName = (month: Month, style: "long" | "short") => format.dateTime(monthToDate(month), { month: style });
  const harvestList = format.list(
    months.filter((month) => harvestMonths.includes(month)).map((month) => monthName(month, "long")),
    { type: "conjunction" },
  );

  return (
    <div>
      <p className="mb-3 text-sm text-muted">{t("harvestMonths")}</p>
      <p className="sr-only">{t("harvestMonthsList", { months: harvestList })}</p>
      <ul aria-hidden="true" className="grid grid-cols-6 gap-1.5 sm:grid-cols-12">
        {months.map((month) => {
          const active = harvestMonths.includes(month);
          return (
            <li
              key={month}
              className={cn(
                "flex flex-col items-center gap-1 rounded-md border py-2 text-xs capitalize",
                active ? "border-forest bg-forest text-white" : "border-line bg-white text-muted",
              )}
            >
              <span>{monthName(month, "short")}</span>
              {active ? <Check className="size-3" /> : <span className="h-3" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
