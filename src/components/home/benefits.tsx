import { CalendarDays, HandHeart, Layers, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";

const items = [
  { key: "origin", Icon: MapPin },
  { key: "knowHow", Icon: HandHeart },
  { key: "diversity", Icon: Layers },
  { key: "seasons", Icon: CalendarDays },
] as const;

export function Benefits() {
  const t = useTranslations("home.benefits");
  return (
    <Section id="benefits" title={t("title")} description={t("description")} tone="cream">
      <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ key, Icon }) => (
          <li key={key}>
            <Icon aria-hidden="true" className="size-6 text-forest" />
            <h3 className="mt-4 text-base font-semibold text-ink">{t(`items.${key}.title`)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t(`items.${key}.text`)}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
