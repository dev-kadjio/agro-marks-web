import { z } from "zod";

export type RawSearchParams = Readonly<Record<string, string | readonly string[] | undefined>>;

export function firstValue(value: string | readonly string[] | undefined): string | undefined {
  return typeof value === "string" ? value : value?.[0];
}

export function enumParam<const T extends readonly [string, ...string[]]>(values: T) {
  return z.enum(values).optional().catch(undefined);
}

export function allowedParam(allowed: ReadonlySet<string>) {
  return z
    .string()
    .refine((value) => allowed.has(value))
    .optional()
    .catch(undefined);
}

export const queryParam = z
  .string()
  .trim()
  .max(80)
  .transform((value) => (value.length > 0 ? value : undefined))
  .optional()
  .catch(undefined);

export const pageParam = z.coerce.number().int().min(1).max(500).catch(1);

export const priceParam = z
  .string()
  .regex(/^\d{1,8}$/)
  .transform(Number)
  .optional()
  .catch(undefined);

export const flagParam = z
  .string()
  .transform((value) => value === "1" || value === "true")
  .catch(false);

export function pickFirstValues(params: RawSearchParams, keys: readonly string[]): Record<string, string | undefined> {
  return Object.fromEntries(keys.map((key) => [key, firstValue(params[key])]));
}

export function toQueryString(entries: Readonly<Record<string, string | number | boolean | undefined>>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(entries)) {
    if (value === undefined || value === false || value === "") continue;
    search.set(key, value === true ? "1" : String(value));
  }
  const result = search.toString();
  return result.length > 0 ? `?${result}` : "";
}
