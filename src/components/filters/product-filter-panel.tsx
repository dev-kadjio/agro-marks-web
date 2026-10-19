"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import type { CategoryId } from "@/domain/category";
import type { RegionId } from "@/domain/region";
import { countActiveProductFilters, serializeProductFilters } from "@/lib/filters/product-filter-params";
import type { AvailabilityFilter, ProductFilterCriteria } from "@/services/filtering/criteria";
import type { Option } from "@/services/view-models";
import { fieldClasses, labelClasses } from "@/components/ui/styles";
import { SelectField, TextField } from "./fields";
import { FilterPanelShell } from "./filter-panel-shell";
import { useFilterTransition } from "./filter-transition";

export interface ProductFilterPanelOptions {
  readonly categories: readonly Option<CategoryId>[];
  readonly producers: readonly Option<string>[];
  readonly regions: readonly Option<RegionId>[];
  readonly availability: readonly Option<AvailabilityFilter>[];
}

interface ProductFilterPanelProps {
  readonly action: string;
  readonly criteria: ProductFilterCriteria;
  readonly options: ProductFilterPanelOptions;
  readonly lockCategory?: boolean;
}

interface TextValues {
  readonly query: string;
  readonly min: string;
  readonly max: string;
}

function toTextValues(criteria: ProductFilterCriteria): TextValues {
  return {
    query: criteria.query ?? "",
    min: criteria.minPrice?.toString() ?? "",
    max: criteria.maxPrice?.toString() ?? "",
  };
}

function parsePrice(value: string): number | undefined {
  return /^\d{1,8}$/.test(value.trim()) ? Number(value.trim()) : undefined;
}

export function ProductFilterPanel({ action, criteria, options, lockCategory = false }: ProductFilterPanelProps) {
  const t = useTranslations("filters");
  const { navigate } = useFilterTransition();
  const serialized = toTextValues(criteria);
  const [values, setValues] = useState<TextValues>(serialized);
  const [synced, setSynced] = useState<TextValues>(serialized);

  if (serialized.query !== synced.query || serialized.min !== synced.min || serialized.max !== synced.max) {
    setSynced(serialized);
    setValues(serialized);
  }

  const serializeOptions = { omitCategory: lockCategory };

  function apply(patch: Partial<ProductFilterCriteria>) {
    const next: ProductFilterCriteria = {
      ...criteria,
      query: values.query.trim() || undefined,
      minPrice: parsePrice(values.min),
      maxPrice: parsePrice(values.max),
      ...patch,
      page: 1,
    };
    navigate(serializeProductFilters(next, serializeOptions));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    apply({});
  }

  return (
    <FilterPanelShell action={action} activeCount={countActiveProductFilters(criteria, serializeOptions)} onSubmit={onSubmit}>
      <TextField
        id="product-filter-q"
        name="q"
        type="search"
        label={t("searchLabel")}
        placeholder={t("productSearchPlaceholder")}
        value={values.query}
        maxLength={80}
        onChange={(event) => setValues({ ...values, query: event.target.value })}
      />
      {lockCategory ? null : (
        <SelectField
          id="product-filter-category"
          name="category"
          label={t("category")}
          placeholder={t("allCategories")}
          value={criteria.categoryId}
          options={options.categories}
          onChange={(categoryId) => apply({ categoryId })}
        />
      )}
      <SelectField
        id="product-filter-producer"
        name="producer"
        label={t("producer")}
        placeholder={t("allProducers")}
        value={criteria.producerSlug}
        options={options.producers}
        onChange={(producerSlug) => apply({ producerSlug })}
      />
      <SelectField
        id="product-filter-region"
        name="region"
        label={t("region")}
        placeholder={t("allRegions")}
        value={criteria.regionId}
        options={options.regions}
        onChange={(regionId) => apply({ regionId })}
      />
      <fieldset>
        <legend className={labelClasses}>{t("price")}</legend>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="product-filter-min" className="sr-only">
              {t("minPrice")}
            </label>
            <input
              id="product-filter-min"
              name="min"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder={t("minPlaceholder")}
              value={values.min}
              onChange={(event) => setValues({ ...values, min: event.target.value })}
              className={fieldClasses}
            />
          </div>
          <div>
            <label htmlFor="product-filter-max" className="sr-only">
              {t("maxPrice")}
            </label>
            <input
              id="product-filter-max"
              name="max"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder={t("maxPlaceholder")}
              value={values.max}
              onChange={(event) => setValues({ ...values, max: event.target.value })}
              className={fieldClasses}
            />
          </div>
        </div>
      </fieldset>
      <SelectField
        id="product-filter-availability"
        name="availability"
        label={t("availability")}
        placeholder={t("allAvailability")}
        value={criteria.availability}
        options={options.availability}
        onChange={(availability) => apply({ availability })}
      />
      {criteria.sort !== "relevance" ? <input type="hidden" name="sort" value={criteria.sort} /> : null}
    </FilterPanelShell>
  );
}
