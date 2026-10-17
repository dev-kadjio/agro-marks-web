import type { ReactNode } from "react";
import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface ResultsToolbarProps {
  readonly total: number;
  readonly hasActiveFilters: boolean;
  readonly resetHref: string;
  readonly sort: ReactNode;
}

export function ResultsToolbar({ total, hasActiveFilters, resetHref, sort }: ResultsToolbarProps) {
  const t = useTranslations("filters");
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p role="status" aria-live="polite" className="text-base font-medium text-ink">
          {t("results", { count: total })}
        </p>
        {hasActiveFilters ? (
          <Link
            href={resetHref}
            scroll={false}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-forest underline-offset-4 hover:underline"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
            {t("reset")}
          </Link>
        ) : null}
      </div>
      {sort}
    </div>
  );
}
