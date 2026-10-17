"use client";

import { Heart, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { FarmerGrid } from "@/components/farmers/farmer-grid";
import { ProductGrid } from "@/components/products/product-grid";
import { buttonClasses } from "@/components/ui/styles";
import { Link } from "@/i18n/navigation";
import type { FarmerSummary, ProductSummary } from "@/services/view-models";
import { useFavorites } from "./favorites-provider";

interface FavoritesViewProps {
  readonly products: readonly ProductSummary[];
  readonly farmers: readonly FarmerSummary[];
}

export function FavoritesView({ products, farmers }: FavoritesViewProps) {
  const t = useTranslations("favorites");
  const { favorites, hydrated, available, clear } = useFavorites();

  if (!hydrated) {
    return (
      <p role="status" className="py-10 text-center text-muted">
        {t("loading")}
      </p>
    );
  }

  if (!available) {
    return <p className="rounded-card border border-line bg-white p-6 text-muted">{t("unavailable")}</p>;
  }

  const favoriteProducts = products.filter((product) => favorites.product.includes(product.id));
  const favoriteFarmers = farmers.filter((farmer) => favorites.farmer.includes(farmer.id));

  if (favoriteProducts.length === 0 && favoriteFarmers.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-card border border-dashed border-line bg-white px-6 py-14 text-center">
        <Heart aria-hidden="true" className="size-8 text-muted" />
        <h2 className="mt-4 text-lg font-semibold text-ink">{t("empty.title")}</h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{t("empty.text")}</p>
        <Link href="/products" className={buttonClasses({ className: "mt-6" })}>
          {t("empty.cta")}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-14">
      <div className="flex justify-end">
        <button type="button" onClick={clear} className={buttonClasses({ variant: "secondary", size: "sm" })}>
          <Trash2 aria-hidden="true" className="size-4" />
          {t("clearAll")}
        </button>
      </div>
      <section aria-labelledby="favorite-products">
        <h2 id="favorite-products" className="mb-6 text-xl font-semibold text-ink">
          {t("products", { count: favoriteProducts.length })}
        </h2>
        {favoriteProducts.length > 0 ? <ProductGrid products={favoriteProducts} /> : <p className="text-muted">{t("empty.products")}</p>}
      </section>
      <section aria-labelledby="favorite-farmers">
        <h2 id="favorite-farmers" className="mb-6 text-xl font-semibold text-ink">
          {t("farmers", { count: favoriteFarmers.length })}
        </h2>
        {favoriteFarmers.length > 0 ? <FarmerGrid farmers={favoriteFarmers} /> : <p className="text-muted">{t("empty.farmers")}</p>}
      </section>
    </div>
  );
}
