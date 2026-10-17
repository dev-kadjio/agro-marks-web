import { useFormatter, useTranslations } from "next-intl";
import type { Money, SaleUnit } from "@/domain/product";
import { cn } from "@/lib/cn";

interface PriceTagProps {
  readonly price: Money;
  readonly unit: SaleUnit;
  readonly size?: "md" | "lg";
}

export function PriceTag({ price, unit, size = "md" }: PriceTagProps) {
  const t = useTranslations("products");
  const format = useFormatter();
  const formatted = format.number(price.amount, { style: "currency", currency: price.currency, maximumFractionDigits: 0 });
  return (
    <p className={cn("text-ink", size === "lg" ? "text-2xl" : "text-base")}>
      <span className="font-semibold">{formatted}</span>
      <span className={cn("text-muted", size === "lg" ? "text-base" : "text-sm")}> / {t(`units.${unit}`)}</span>
    </p>
  );
}
