import "server-only";
import { cacheLife } from "next/cache";
import type { Month } from "@/domain/calendar";
import { TIME_ZONE } from "@/i18n/routing";
import { monthInTimeZone } from "./calendar";

export async function getCurrentMonth(): Promise<Month> {
  "use cache";
  cacheLife("hours");
  return monthInTimeZone(new Date(), TIME_ZONE);
}

export async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return Number(new Intl.DateTimeFormat("en-US", { year: "numeric", timeZone: TIME_ZONE }).format(new Date()));
}
