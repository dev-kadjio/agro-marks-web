"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/styles";
import { Link } from "@/i18n/navigation";

export default function LocaleError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations();
  return (
    <Container className="flex flex-col items-center py-20 text-center sm:py-28">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">{t("errors.generic.title")}</h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{t("errors.generic.description")}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={reset} className={buttonClasses()}>
          {t("errors.generic.retry")}
        </button>
        <Link href="/" className={buttonClasses({ variant: "secondary" })}>
          {t("common.backHome")}
        </Link>
      </div>
    </Container>
  );
}
