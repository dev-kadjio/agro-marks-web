import "server-only";
import { getLocale, getTranslations } from "next-intl/server";
import type { SpecialtyId } from "@/domain/farmer";
import type { RegionId } from "@/domain/region";
import { availabilityFilterOptions, type AvailabilityFilter } from "@/services/filtering/criteria";
import type { Option } from "@/services/view-models";

function sortByLabel<T extends string>(options: Option<T>[], locale: string): Option<T>[] {
  return options.sort((a, b) => a.label.localeCompare(b.label, locale));
}

export async function regionOptions(ids: readonly RegionId[]): Promise<Option<RegionId>[]> {
  const [t, locale] = await Promise.all([getTranslations("regions"), getLocale()]);
  return sortByLabel(
    ids.map((id) => ({ value: id, label: t(id) })),
    locale,
  );
}

export async function specialtyOptions(ids: readonly SpecialtyId[]): Promise<Option<SpecialtyId>[]> {
  const [t, locale] = await Promise.all([getTranslations("specialties"), getLocale()]);
  return sortByLabel(
    ids.map((id) => ({ value: id, label: t(id) })),
    locale,
  );
}

export async function availabilityOptions(): Promise<Option<AvailabilityFilter>[]> {
  const t = await getTranslations("filters.availabilityOptions");
  return availabilityFilterOptions.map((value) => ({ value, label: t(value) }));
}

export function mapToRecord<K extends string, V>(keys: readonly K[], build: (key: K) => V): Record<K, V> {
  return keys.reduce(
    (record, key) => {
      record[key] = build(key);
      return record;
    },
    {} as Record<K, V>,
  );
}
