import "server-only";
import { getLocale, getTranslations } from "next-intl/server";
import type { ProducerType, SpecialtyId } from "@/domain/producer";
import type { RegionId } from "@/domain/region";
import { availabilityFilterOptions, type AvailabilityFilter } from "@/services/filtering/criteria";
import type { FacetValue } from "@/services/producer-service";
import type { FacetOption, Option } from "@/services/view-models";

function sortByLabel<T extends Option<string>>(options: T[], locale: string): T[] {
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

export async function producerTypeOptions(types: readonly ProducerType[]): Promise<Option<ProducerType>[]> {
  const t = await getTranslations("producerTypes");
  return types.map((type) => ({ value: type, label: t(type) }));
}

export async function facetOptions<T extends string>(
  facets: readonly FacetValue<T>[],
  label: (value: T) => string,
): Promise<FacetOption<T>[]> {
  const locale = await getLocale();
  return sortByLabel(
    facets.map((facet) => ({ ...facet, label: label(facet.value) })),
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
