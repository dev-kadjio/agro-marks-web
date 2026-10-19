import { z } from "zod";
import { categoryIds } from "@/domain/category";
import { producerTypes, specialtyIds } from "@/domain/producer";
import { regionIds } from "@/domain/region";
import { defaultProducerCriteria, producerSortOptions, type ProducerFilterCriteria } from "@/services/filtering/criteria";
import { allowedParam, enumParam, pageParam, pickFirstValues, queryParam, toQueryString, type RawSearchParams } from "./search-params";

export const producerParamKeys = ["q", "type", "region", "city", "specialty", "category", "sort", "page"] as const;

export interface ProducerParamOptions {
  readonly omitCategory?: boolean;
}

function producerParamsSchema(cities: ReadonlySet<string>) {
  return z.object({
    q: queryParam,
    type: enumParam(producerTypes),
    region: enumParam(regionIds),
    city: allowedParam(cities),
    specialty: enumParam(specialtyIds),
    category: enumParam(categoryIds),
    sort: z.enum(producerSortOptions).catch(defaultProducerCriteria.sort),
    page: pageParam,
  });
}

export function parseProducerFilters(params: RawSearchParams, cities: ReadonlySet<string>): ProducerFilterCriteria {
  const parsed = producerParamsSchema(cities).parse(pickFirstValues(params, producerParamKeys));
  return {
    query: parsed.q,
    type: parsed.type,
    regionId: parsed.region,
    city: parsed.city,
    specialtyId: parsed.specialty,
    categoryId: parsed.category,
    sort: parsed.sort,
    page: parsed.page,
  };
}

export function serializeProducerFilters(criteria: ProducerFilterCriteria, options?: ProducerParamOptions): string {
  return toQueryString({
    q: criteria.query,
    type: criteria.type,
    region: criteria.regionId,
    city: criteria.city,
    specialty: criteria.specialtyId,
    category: options?.omitCategory ? undefined : criteria.categoryId,
    sort: criteria.sort === defaultProducerCriteria.sort ? undefined : criteria.sort,
    page: criteria.page > 1 ? criteria.page : undefined,
  });
}

export function countActiveProducerFilters(criteria: ProducerFilterCriteria, options?: ProducerParamOptions): number {
  return [
    criteria.query,
    criteria.type,
    criteria.regionId,
    criteria.city,
    criteria.specialtyId,
    options?.omitCategory ? undefined : criteria.categoryId,
  ].filter((value) => value !== undefined).length;
}
