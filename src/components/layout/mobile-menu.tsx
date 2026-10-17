"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { LanguageSwitcher } from "./language-switcher";
import { isActivePath, mainNavigation } from "./navigation-items";

export function MobileMenu({ search }: { search: ReactNode }) {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a, input, button")?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-full text-forest transition-colors hover:bg-cream"
      >
        {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
      </button>
      <div
        id={panelId}
        ref={panelRef}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-white shadow-sm"
      >
        <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 sm:px-6">
          <div onSubmitCapture={close}>{search}</div>
          <nav aria-label={t("mobileLabel")}>
            <ul className="divide-y divide-line">
              {mainNavigation.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-12 items-center text-base",
                        active ? "font-semibold text-forest" : "text-ink hover:text-forest",
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link href="/favorites" onClick={close} className="flex min-h-12 items-center text-base text-ink hover:text-forest">
                  {t("favorites")}
                </Link>
              </li>
              <li>
                <Link href="/account" onClick={close} className="flex min-h-12 items-center text-base text-ink hover:text-forest">
                  {t("account")}
                </Link>
              </li>
            </ul>
          </nav>
          <LanguageSwitcher className="sm:hidden" onSwitch={close} />
        </div>
      </div>
    </div>
  );
}
