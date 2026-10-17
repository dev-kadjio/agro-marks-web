"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SelectField } from "@/components/filters/fields";
import { ProductGrid } from "@/components/products/product-grid";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonClasses } from "@/components/ui/styles";
import type { CategoryId } from "@/domain/category";
import { availabilityFilterOptions, productSortOptions, type AvailabilityFilter, type ProductSort } from "@/services/filtering/criteria";
import { filterProducts } from "@/services/filtering/product-filters";
import type { Option, ProductSummary } from "@/services/view-models";

interface ExplorerState {
  readonly categoryId?: CategoryId;
  readonly availability?: AvailabilityFilter;
  readonly sort: ProductSort;
}

const initialState: ExplorerState = { sort: "relevance" };

export function FarmerProductsExplorer({ products }: { products: readonly ProductSummary[] }) {
  const t = useTranslations("filters");
  const locale = useLocale();
  const [state, setState] = useState<ExplorerState>(initialState);

  const categoryOptions = useMemo<Option<CategoryId>[]>(() => {
    const seen = new Map<CategoryId, string>();
    products.forEach((product) => seen.set(product.categoryId, product.categoryName));
    return [...seen].map(([value, label]) => ({ value, label }));
  }, [products]);

  const visible = useMemo(() => filterProducts(products, state, locale), [products, state, locale]);
  const isFiltered = state.categoryId !== undefined || state.availability !== undefined;

  return (
    <div>
      <div className="mb-6 grid gap-4 rounded-card border border-line bg-white p-4 sm:grid-cols-3 sm:p-5">
        {categoryOptions.length > 1 ? (
          <SelectField
            id="farmer-products-category"
            name="category"
            label={t("category")}
            placeholder={t("allCategories")}
            value={state.categoryId}
            options={categoryOptions}
            onChange={(categoryId) => setState({ ...state, categoryId })}
          />
        ) : null}
        <SelectField
          id="farmer-products-availability"
          name="availability"
          label={t("availability")}
          placeholder={t("allAvailability")}
          value={state.availability}
          options={availabilityFilterOptions.map((value) => ({ value, label: t(`availabilityOptions.${value}`) }))}
          onChange={(availability) => setState({ ...state, availability })}
        />
        <SelectField
          id="farmer-products-sort"
          name="sort"
          label={t("sort")}
          value={state.sort}
          options={productSortOptions.map((value) => ({ value, label: t(`sortOptions.${value}`) }))}
          onChange={(sort) => setState({ ...state, sort: sort ?? "relevance" })}
        />
      </div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p role="status" aria-live="polite" className="text-sm font-medium text-ink">
          {t("results", { count: visible.length })}
        </p>
        {isFiltered ? (
          <button type="button" onClick={() => setState(initialState)} className={buttonClasses({ variant: "ghost", size: "sm" })}>
            {t("reset")}
          </button>
        ) : null}
      </div>
      {visible.length > 0 ? (
        <ProductGrid products={visible} />
      ) : (
        <EmptyState title={t("empty.title")} description={t("empty.products")} />
      )}
    </div>
  );
}
