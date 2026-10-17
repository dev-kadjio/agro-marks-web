"use client";

import { useTranslations } from "next-intl";
import type { Option } from "@/services/view-models";
import { SelectField } from "./fields";
import { useFilterTransition } from "./filter-transition";

interface SortSelectProps<T extends string> {
  readonly id: string;
  readonly value: T;
  readonly options: readonly Option<T>[];
  readonly queries: Readonly<Record<T, string>>;
}

export function SortSelect<T extends string>({ id, value, options, queries }: SortSelectProps<T>) {
  const t = useTranslations("filters");
  const { navigate } = useFilterTransition();
  return (
    <div className="w-full sm:w-56">
      <SelectField
        id={id}
        name="sort"
        label={t("sort")}
        value={value}
        options={options}
        onChange={(next) => {
          if (next) navigate(queries[next]);
        }}
      />
    </div>
  );
}
