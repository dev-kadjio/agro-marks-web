"use client";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import type { FavoriteKind } from "./favorites-store";
import { useFavorites } from "./favorites-provider";

interface FavoriteButtonProps {
  readonly kind: FavoriteKind;
  readonly id: string;
  readonly name: string;
  readonly variant?: "icon" | "labelled";
  readonly className?: string;
}

export function FavoriteButton({ kind, id, name, variant = "icon", className }: FavoriteButtonProps) {
  const t = useTranslations("favorites");
  const { isFavorite, toggle, available } = useFavorites();
  const active = isFavorite(kind, id);

  return (
    <button
      type="button"
      onClick={() => toggle(kind, id)}
      aria-pressed={active}
      aria-label={variant === "icon" ? (active ? t("remove", { name }) : t("add", { name })) : undefined}
      title={variant === "icon" ? (active ? t("removeShort") : t("addShort")) : undefined}
      disabled={!available}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border transition-colors duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest",
        active ? "border-forest bg-forest text-white hover:bg-moss" : "border-line bg-white text-forest hover:border-moss",
        variant === "icon" ? "size-10" : "min-h-11 px-4 text-sm font-medium",
        className,
      )}
    >
      <Heart aria-hidden="true" className="size-4" fill={active ? "currentColor" : "none"} />
      {variant === "labelled" ? <span>{active ? t("removeShort") : t("addShort")}</span> : null}
    </button>
  );
}
