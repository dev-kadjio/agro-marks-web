"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import type { ProducerType } from "@/domain/producer";
import { optionsInScope, pruneOutOfScope, type ProducerFacetOptions } from "@/lib/filters/facet-scope";
import { countActiveProducerFilters, serializeProducerFilters } from "@/lib/filters/producer-filter-params";
import type { ProducerFilterCriteria } from "@/services/filtering/criteria";
import type { Option } from "@/services/view-models";
import { SelectField, TextField } from "./fields";
import { FilterPanelShell } from "./filter-panel-shell";
import { useFilterTransition } from "./filter-transition";

export interface ProducerFilterPanelOptions extends ProducerFacetOptions {
  readonly types: readonly Option<ProducerType>[];
}

interface ProducerFilterPanelProps {
  readonly action: string;
  readonly criteria: ProducerFilterCriteria;
  readonly options: ProducerFilterPanelOptions;
  readonly lockCategory?: boolean;
}

export function ProducerFilterPanel({ action, criteria, options, lockCategory = false }: ProducerFilterPanelProps) {
  const t = useTranslations("filters");
  const { navigate } = useFilterTransition();
  const [query, setQuery] = useState(criteria.query ?? "");
  const [syncedQuery, setSyncedQuery] = useState(criteria.query ?? "");

  if ((criteria.query ?? "") !== syncedQuery) {
    setSyncedQuery(criteria.query ?? "");
    setQuery(criteria.query ?? "");
  }

  const paramOptions = { omitCategory: lockCategory };
  const typeScope = { type: criteria.type };

  function apply(patch: Partial<ProducerFilterCriteria>) {
    const next = pruneOutOfScope({ ...criteria, query: query.trim() || undefined, ...patch, page: 1 }, options);
    navigate(serializeProducerFilters(next, paramOptions));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    apply({});
  }

  return (
    <FilterPanelShell action={action} activeCount={countActiveProducerFilters(criteria, paramOptions)} onSubmit={onSubmit}>
      <TextField
        id="producer-filter-q"
        name="q"
        type="search"
        label={t("searchLabel")}
        placeholder={t("producerSearchPlaceholder")}
        value={query}
        maxLength={80}
        onChange={(event) => setQuery(event.target.value)}
      />
      {lockCategory || options.types.length < 2 ? null : (
        <SelectField
          id="producer-filter-type"
          name="type"
          label={t("type")}
          placeholder={t("allTypes")}
          value={criteria.type}
          options={options.types}
          onChange={(type) => apply({ type })}
        />
      )}
      <SelectField
        id="producer-filter-region"
        name="region"
        label={t("region")}
        placeholder={t("allRegions")}
        value={criteria.regionId}
        options={optionsInScope(options.regions, typeScope)}
        onChange={(regionId) => apply({ regionId })}
      />
      <SelectField
        id="producer-filter-city"
        name="city"
        label={t("city")}
        placeholder={t("allCities")}
        value={criteria.city}
        options={optionsInScope(options.cities, { ...typeScope, regionId: criteria.regionId })}
        onChange={(city) => apply({ city })}
      />
      <SelectField
        id="producer-filter-specialty"
        name="specialty"
        label={t("specialty")}
        placeholder={t("allSpecialties")}
        value={criteria.specialtyId}
        options={optionsInScope(options.specialties, typeScope)}
        onChange={(specialtyId) => apply({ specialtyId })}
      />
      {lockCategory ? null : (
        <SelectField
          id="producer-filter-category"
          name="category"
          label={t("category")}
          placeholder={t("allCategories")}
          value={criteria.categoryId}
          options={optionsInScope(options.categories, typeScope)}
          onChange={(categoryId) => apply({ categoryId })}
        />
      )}
      {criteria.sort !== "relevance" ? <input type="hidden" name="sort" value={criteria.sort} /> : null}
    </FilterPanelShell>
  );
}
