"use client";

import type { MouseEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ className, onSwitch }: { className?: string; onSwitch?: () => void }) {
  const t = useTranslations("navigation.language");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>, target: (typeof routing.locales)[number]) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    onSwitch?.();
    if (target !== locale) {
      router.replace(`${pathname}${window.location.search}`, { locale: target, scroll: false });
    }
  }

  return (
    <nav aria-label={t("label")} className={className}>
      <ul className="flex items-center rounded-full border border-line p-0.5">
        {routing.locales.map((target) => {
          const active = target === locale;
          return (
            <li key={target}>
              <Link
                href={pathname}
                locale={target}
                lang={target}
                hrefLang={target}
                aria-current={active ? "true" : undefined}
                onClick={(event) => handleClick(event, target)}
                className={cn(
                  "inline-flex min-h-9 min-w-10 items-center justify-center rounded-full px-2.5 text-xs font-semibold uppercase transition-colors",
                  active ? "bg-forest text-white" : "text-muted hover:text-forest",
                )}
              >
                <span aria-hidden="true">{target}</span>
                <span className="sr-only">
                  {t(target)}
                  {active ? ` (${t("current")})` : ""}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
