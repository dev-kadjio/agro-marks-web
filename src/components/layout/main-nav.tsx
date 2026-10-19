"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { isActivePath, mainNavigation } from "./navigation-items";

export function MainNav() {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  return (
    <nav aria-label={t("mainLabel")} className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {mainNavigation.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3 text-sm transition-colors",
                  active ? "font-medium text-forest" : "text-muted hover:text-forest",
                )}
              >
                {t(item.key)}
                {active ? <span aria-hidden="true" className="absolute inset-x-3 bottom-1.5 h-0.5 rounded-full bg-gold" /> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
