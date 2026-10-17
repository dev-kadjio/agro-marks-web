"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import type { CategoryId } from "@/domain/category";
import type { SpecialtyId } from "@/domain/farmer";
import type { RegionId } from "@/domain/region";
import { countActiveFarmerFilters, serializeFarmerFilters } from "@/lib/filters/farmer-filter-params";
import type { FarmerFilterCriteria } from "@/services/filtering/criteria";
import type { Option } from "@/services/view-models";
import { SelectField, TextField } from "./fields";
import { FilterPanelShell } from "./filter-panel-shell";
import { useFilterTransition } from "./filter-transition";

export interface FarmerFilterPanelOptions {
  readonly regions: readonly Option<RegionId>[];
  readonly specialties: readonly Option<SpecialtyId>[];
  readonly categories: readonly Option<CategoryId>[];
}

interface FarmerFilterPanelProps {
  readonly action: string;
  readonly criteria: FarmerFilterCriteria;
  readonly options: FarmerFilterPanelOptions;
}

export function FarmerFilterPanel({ action, criteria, options }: FarmerFilterPanelProps) {
  const t = useTranslations("filters");
  const { navigate } = useFilterTransition();
  const [query, setQuery] = useState(criteria.query ?? "");
  const [syncedQuery, setSyncedQuery] = useState(criteria.query ?? "");

  if ((criteria.query ?? "") !== syncedQuery) {
    setSyncedQuery(criteria.query ?? "");
    setQuery(criteria.query ?? "");
  }

  function apply(patch: Partial<FarmerFilterCriteria>) {
    navigate(serializeFarmerFilters({ ...criteria, query: query.trim() || undefined, ...patch, page: 1 }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    apply({});
  }

  return (
    <FilterPanelShell action={action} activeCount={countActiveFarmerFilters(criteria)} onSubmit={onSubmit}>
      <TextField
        id="farmer-filter-q"
        name="q"
        type="search"
        label={t("searchLabel")}
        placeholder={t("farmerSearchPlaceholder")}
        value={query}
        maxLength={80}
        onChange={(event) => setQuery(event.target.value)}
      />
      <SelectField
        id="farmer-filter-region"
        name="region"
        label={t("region")}
        placeholder={t("allRegions")}
        value={criteria.regionId}
        options={options.regions}
        onChange={(regionId) => apply({ regionId })}
      />
      <SelectField
        id="farmer-filter-specialty"
        name="specialty"
        label={t("specialty")}
        placeholder={t("allSpecialties")}
        value={criteria.specialtyId}
        options={options.specialties}
        onChange={(specialtyId) => apply({ specialtyId })}
      />
      <SelectField
        id="farmer-filter-category"
        name="category"
        label={t("category")}
        placeholder={t("allCategories")}
        value={criteria.categoryId}
        options={options.categories}
        onChange={(categoryId) => apply({ categoryId })}
      />
      <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-ink">
        <input
          type="checkbox"
          name="available"
          value="1"
          checked={criteria.availableOnly}
          onChange={(event) => apply({ availableOnly: event.target.checked })}
          className="size-5 rounded border-line accent-forest"
        />
        {t("availableOnly")}
      </label>
      {criteria.sort !== "relevance" ? <input type="hidden" name="sort" value={criteria.sort} /> : null}
    </FilterPanelShell>
  );
}
