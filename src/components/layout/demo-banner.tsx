import { useTranslations } from "next-intl";

export function DemoBanner() {
  const t = useTranslations("common");
  return (
    <div className="bg-forest px-4 py-2 text-center text-xs leading-relaxed text-white">
      <span className="font-semibold">{t("demoBadge")}</span>
      <span aria-hidden="true"> · </span>
      <span>{t("demoNotice")}</span>
    </div>
  );
}
