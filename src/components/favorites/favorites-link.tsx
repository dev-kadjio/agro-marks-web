"use client";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { useFavorites } from "./favorites-provider";

export function FavoritesLink({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const t = useTranslations("navigation");
  const { count, hydrated } = useFavorites();
  const visibleCount = hydrated ? count : 0;

  return (
    <Link
      href="/favorites"
      onClick={onNavigate}
      aria-label={t("favoritesWithCount", { count: visibleCount })}
      className={cn(
        "relative inline-flex size-11 items-center justify-center rounded-full text-forest transition-colors hover:bg-cream",
        className,
      )}
    >
      <Heart aria-hidden="true" className="size-5" />
      {visibleCount > 0 ? (
        <span
          aria-hidden="true"
          className="absolute right-1 top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-semibold leading-5 text-white"
        >
          {visibleCount}
        </span>
      ) : null}
    </Link>
  );
}
