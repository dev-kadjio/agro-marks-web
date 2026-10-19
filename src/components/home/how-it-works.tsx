import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";

const steps = ["discover", "understand", "connect"] as const;

export function HowItWorks() {
  const t = useTranslations("home.howItWorks");
  return (
    <Section id="how-it-works" title={t("title")} description={t("description")}>
      <ol className="grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step} className="rounded-card border border-line bg-white p-6">
            <span aria-hidden="true" className="text-sm font-semibold text-gold">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-ink">{t(`steps.${step}.title`)}</h3>
            <p className="mt-2 text-base leading-relaxed text-muted">{t(`steps.${step}.text`)}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
