import { PawPrint, Sprout } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ProducerType } from "@/domain/producer";
import { cn } from "@/lib/cn";

const icons = {
  farmer: Sprout,
  breeder: PawPrint,
} as const satisfies Record<ProducerType, unknown>;

export function ProducerTypeBadge({ type, className }: { type: ProducerType; className?: string }) {
  const t = useTranslations("producerTypes");
  const Icon = icons[type];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full bg-cream px-2.5 py-1 text-xs font-medium text-forest", className)}>
      <Icon aria-hidden="true" className="size-3.5" />
      {t(type)}
    </span>
  );
}
