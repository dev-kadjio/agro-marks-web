import type { CategoryId } from "@/domain/category";
import type { ProducerType, SpecialtyId } from "@/domain/producer";
import type { RegionId } from "@/domain/region";
import type { ProducerFilterCriteria } from "@/services/filtering/criteria";
import type { FacetOption, FacetScope } from "@/services/view-models";

export interface ActiveScope {
  readonly type?: ProducerType;
  readonly regionId?: RegionId;
}

export function isInScope(facet: FacetScope, scope: ActiveScope): boolean {
  return (!scope.type || facet.producerTypes.includes(scope.type)) && (!scope.regionId || facet.regionIds.includes(scope.regionId));
}

export function optionsInScope<T extends string>(options: readonly FacetOption<T>[], scope: ActiveScope): FacetOption<T>[] {
  return options.filter((option) => isInScope(option, scope));
}

export interface ProducerFacetOptions {
  readonly regions: readonly FacetOption<RegionId>[];
  readonly cities: readonly FacetOption<string>[];
  readonly specialties: readonly FacetOption<SpecialtyId>[];
  readonly categories: readonly FacetOption<CategoryId>[];
}

function keepIfInScope<T extends string>(
  value: T | undefined,
  options: readonly FacetOption<T>[],
  scope: ActiveScope,
): T | undefined {
  if (value === undefined) return undefined;
  const option = options.find((candidate) => candidate.value === value);
  return option && isInScope(option, scope) ? value : undefined;
}

export function pruneOutOfScope(criteria: ProducerFilterCriteria, options: ProducerFacetOptions): ProducerFilterCriteria {
  const regionId = keepIfInScope(criteria.regionId, options.regions, { type: criteria.type });
  const scope = { type: criteria.type, regionId };
  return {
    ...criteria,
    regionId,
    city: keepIfInScope(criteria.city, options.cities, scope),
    specialtyId: keepIfInScope(criteria.specialtyId, options.specialties, { type: criteria.type }),
    categoryId: keepIfInScope(criteria.categoryId, options.categories, { type: criteria.type }),
  };
}
