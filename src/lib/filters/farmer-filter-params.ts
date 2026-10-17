import { z } from "zod";
import { categoryIds } from "@/domain/category";
import { specialtyIds } from "@/domain/farmer";
import { regionIds } from "@/domain/region";
import { defaultFarmerCriteria, farmerSortOptions, type FarmerFilterCriteria } from "@/services/filtering/criteria";
import { enumParam, flagParam, pageParam, pickFirstValues, queryParam, toQueryString, type RawSearchParams } from "./search-params";

export const farmerParamKeys = ["q", "region", "specialty", "category", "available", "sort", "page"] as const;

const farmerParamsSchema = z.object({
  q: queryParam,
  region: enumParam(regionIds),
  specialty: enumParam(specialtyIds),
  category: enumParam(categoryIds),
  available: flagParam,
  sort: z.enum(farmerSortOptions).catch(defaultFarmerCriteria.sort),
  page: pageParam,
});

export function parseFarmerFilters(params: RawSearchParams): FarmerFilterCriteria {
  const parsed = farmerParamsSchema.parse(pickFirstValues(params, farmerParamKeys));
  return {
    query: parsed.q,
    regionId: parsed.region,
    specialtyId: parsed.specialty,
    categoryId: parsed.category,
    availableOnly: parsed.available,
    sort: parsed.sort,
    page: parsed.page,
  };
}

export function serializeFarmerFilters(criteria: FarmerFilterCriteria): string {
  return toQueryString({
    q: criteria.query,
    region: criteria.regionId,
    specialty: criteria.specialtyId,
    category: criteria.categoryId,
    available: criteria.availableOnly,
    sort: criteria.sort === defaultFarmerCriteria.sort ? undefined : criteria.sort,
    page: criteria.page > 1 ? criteria.page : undefined,
  });
}

export function countActiveFarmerFilters(criteria: FarmerFilterCriteria): number {
  return [criteria.query, criteria.regionId, criteria.specialtyId, criteria.categoryId, criteria.availableOnly || undefined].filter(
    Boolean,
  ).length;
}
