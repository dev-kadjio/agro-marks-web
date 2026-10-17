import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

interface PaginationProps {
  readonly page: number;
  readonly pageCount: number;
  readonly hrefForPage: (page: number) => string;
}

const itemClasses =
  "inline-flex size-11 items-center justify-center rounded-full border text-sm font-medium transition-colors";

export function Pagination({ page, pageCount, hrefForPage }: PaginationProps) {
  const t = useTranslations("pagination");
  if (pageCount <= 1) {
    return null;
  }
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  return (
    <nav aria-label={t("label")} className="mt-10 flex flex-col items-center gap-3">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          {page > 1 ? (
            <Link href={hrefForPage(page - 1)} className={cn(itemClasses, "border-line hover:border-moss")} aria-label={t("previous")}>
              <ChevronLeft aria-hidden="true" className="size-4" />
            </Link>
          ) : (
            <span className={cn(itemClasses, "border-line opacity-40")} aria-hidden="true">
              <ChevronLeft className="size-4" />
            </span>
          )}
        </li>
        {pages.map((value) => (
          <li key={value}>
            <Link
              href={hrefForPage(value)}
              aria-label={t("page", { page: value })}
              aria-current={value === page ? "page" : undefined}
              className={cn(
                itemClasses,
                value === page ? "border-forest bg-forest text-white" : "border-line text-ink hover:border-moss",
              )}
            >
              {value}
            </Link>
          </li>
        ))}
        <li>
          {page < pageCount ? (
            <Link href={hrefForPage(page + 1)} className={cn(itemClasses, "border-line hover:border-moss")} aria-label={t("next")}>
              <ChevronRight aria-hidden="true" className="size-4" />
            </Link>
          ) : (
            <span className={cn(itemClasses, "border-line opacity-40")} aria-hidden="true">
              <ChevronRight className="size-4" />
            </span>
          )}
        </li>
      </ul>
      <p className="text-sm text-muted">{t("status", { page, pageCount })}</p>
    </nav>
  );
}
