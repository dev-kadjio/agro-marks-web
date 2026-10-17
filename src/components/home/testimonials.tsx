import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { Notice } from "@/components/ui/notice";
import { Section } from "@/components/ui/section";

const items = ["t1", "t2", "t3"] as const;

export function Testimonials() {
  const t = useTranslations("home.testimonials");
  return (
    <Section id="testimonials" title={t("title")} description={t("description")} tone="cream">
      <ul className="grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <li key={item}>
            <figure className="flex h-full flex-col rounded-card border border-line bg-white p-6">
              <Quote aria-hidden="true" className="size-5 text-gold" />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink">{t(`items.${item}.quote`)}</blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="block font-medium text-ink">{t(`items.${item}.name`)}</span>
                <span className="text-muted">{t(`items.${item}.role`)}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <Notice className="mt-6">{t("notice")}</Notice>
    </Section>
  );
}
