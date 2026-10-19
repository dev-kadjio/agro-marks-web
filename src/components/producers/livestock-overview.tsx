import { useTranslations } from "next-intl";
import type { LivestockView } from "@/services/view-models";

export function LivestockOverview({ livestock }: { livestock: readonly LivestockView[] }) {
  const t = useTranslations("species");
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {livestock.map((group) => (
        <li key={group.speciesId} className="rounded-card border border-line bg-white p-6">
          <h3 className="text-lg font-semibold text-ink">{t(group.speciesId)}</h3>
          <p className="mt-2 text-base leading-relaxed text-muted">{group.description}</p>
        </li>
      ))}
    </ul>
  );
}
