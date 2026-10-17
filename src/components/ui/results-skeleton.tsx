import { useTranslations } from "next-intl";

export function ResultsSkeleton({ count = 6 }: { count?: number }) {
  const t = useTranslations("common");
  return (
    <div role="status" className="grid gap-8 lg:grid-cols-[18rem_1fr]">
      <span className="sr-only">{t("loading")}</span>
      <div aria-hidden="true" className="h-72 rounded-card border border-line bg-cream" />
      <ul aria-hidden="true" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }, (_, index) => (
          <li key={index} className="h-80 rounded-card border border-line bg-cream" />
        ))}
      </ul>
    </div>
  );
}
