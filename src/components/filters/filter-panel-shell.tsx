"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { buttonClasses } from "@/components/ui/styles";
import { cn } from "@/lib/cn";
import { useFilterTransition } from "./filter-transition";

interface FilterPanelShellProps {
  readonly action: string;
  readonly activeCount: number;
  readonly onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  readonly children: ReactNode;
}

export function FilterPanelShell({ action, activeCount, onSubmit, children }: FilterPanelShellProps) {
  const t = useTranslations("filters");
  const { isPending } = useFilterTransition();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="rounded-card border border-line bg-white">
      <div className="flex items-center justify-between gap-3 p-4 lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className={buttonClasses({ variant: "secondary", className: "w-full" })}
        >
          <SlidersHorizontal aria-hidden="true" className="size-4" />
          {open ? t("hideFilters") : t("showFilters")}
          {activeCount > 0 ? <span className="text-muted">({t("activeCount", { count: activeCount })})</span> : null}
        </button>
      </div>
      <form
        id={panelId}
        action={action}
        method="get"
        role="search"
        onSubmit={onSubmit}
        className={cn("space-y-5 border-t border-line p-5 lg:block lg:border-t-0", open ? "block" : "hidden")}
      >
        <div className="hidden items-center justify-between lg:flex">
          <h2 className="text-base font-semibold text-ink">{t("title")}</h2>
          {activeCount > 0 ? <span className="text-xs text-muted">{t("activeCount", { count: activeCount })}</span> : null}
        </div>
        {children}
        <button type="submit" className={buttonClasses({ className: "w-full" })}>
          {t("apply")}
        </button>
        <p role="status" aria-live="polite" className="min-h-5 text-center text-xs text-muted">
          {isPending ? t("updating") : ""}
        </p>
      </form>
    </div>
  );
}
