import { CalendarClock, CalendarX, CircleCheck, Clock } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import type { Month } from "@/domain/calendar";
import type { ProductAvailability } from "@/domain/product";
import { monthToDate } from "@/lib/calendar";
import { cn } from "@/lib/cn";

const icons = {
  "in-stock": CircleCheck,
  limited: Clock,
  "pre-order": CalendarClock,
  "out-of-season": CalendarX,
} as const;

const tones = {
  "in-stock": "text-forest",
  limited: "text-gold",
  "pre-order": "text-moss",
  "out-of-season": "text-muted",
} as const;

export function AvailabilityBadge({ availability, detailed = false }: { availability: ProductAvailability; detailed?: boolean }) {
  const t = useTranslations("products.availability");
  const format = useFormatter();
  const Icon = icons[availability.status];
  const monthName = (month: Month) => format.dateTime(monthToDate(month), { month: "long" });

  let label: string;
  if (detailed && availability.status === "pre-order") {
    label = t("preOrderDetail", { month: monthName(availability.expectedMonth) });
  } else if (detailed && availability.status === "out-of-season") {
    label = t("outOfSeasonDetail", { month: monthName(availability.nextSeasonMonth) });
  } else {
    label = t(availability.status);
  }

  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", tones[availability.status])}>
      <Icon aria-hidden="true" className="size-3.5 shrink-0" />
      <span>{label}</span>
    </span>
  );
}
