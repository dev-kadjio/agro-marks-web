import { z } from "zod";
import { categoryIds } from "@/domain/category";
import { regionIds } from "@/domain/region";
import {
  availabilityFilterOptions,
  defaultProductCriteria,
  productSortOptions,
  type ProductFilterCriteria,
} from "@/services/filtering/criteria";
import {
  allowedParam,
  enumParam,
  pageParam,
  pickFirstValues,
  priceParam,
  queryParam,
  toQueryString,
  type RawSearchParams,
} from "./search-params";

export const productParamKeys = ["q", "category", "producer", "region", "min", "max", "availability", "sort", "page"] as const;

function productParamsSchema(producerSlugs: ReadonlySet<string>) {
  return z.object({
    q: queryParam,
    category: enumParam(categoryIds),
    producer: allowedParam(producerSlugs),
    region: enumParam(regionIds),
    min: priceParam,
    max: priceParam,
    availability: enumParam(availabilityFilterOptions),
    sort: z.enum(productSortOptions).catch(defaultProductCriteria.sort),
    page: pageParam,
  });
}

export function parseProductFilters(params: RawSearchParams, producerSlugs: ReadonlySet<string>): ProductFilterCriteria {
  const parsed = productParamsSchema(producerSlugs).parse(pickFirstValues(params, productParamKeys));
  const [minPrice, maxPrice] =
    parsed.min !== undefined && parsed.max !== undefined && parsed.min > parsed.max
      ? [parsed.max, parsed.min]
      : [parsed.min, parsed.max];
  return {
    query: parsed.q,
    categoryId: parsed.category,
    producerSlug: parsed.producer,
    regionId: parsed.region,
    minPrice,
    maxPrice,
    availability: parsed.availability,
    sort: parsed.sort,
    page: parsed.page,
  };
}

export function serializeProductFilters(criteria: ProductFilterCriteria, options?: { omitCategory?: boolean }): string {
  return toQueryString({
    q: criteria.query,
    category: options?.omitCategory ? undefined : criteria.categoryId,
    producer: criteria.producerSlug,
    region: criteria.regionId,
    min: criteria.minPrice,
    max: criteria.maxPrice,
    availability: criteria.availability,
    sort: criteria.sort === defaultProductCriteria.sort ? undefined : criteria.sort,
    page: criteria.page > 1 ? criteria.page : undefined,
  });
}

export function countActiveProductFilters(criteria: ProductFilterCriteria, options?: { omitCategory?: boolean }): number {
  return [
    criteria.query,
    options?.omitCategory ? undefined : criteria.categoryId,
    criteria.producerSlug,
    criteria.regionId,
    criteria.minPrice,
    criteria.maxPrice,
    criteria.availability,
  ].filter((value) => value !== undefined).length;
}
