import { isMonth, type Month } from "@/domain/calendar";

export function monthInTimeZone(date: Date, timeZone: string): Month {
  const value = Number(new Intl.DateTimeFormat("en-US", { month: "numeric", timeZone }).format(date));
  return isMonth(value) ? value : 1;
}

export function monthToDate(month: Month): Date {
  return new Date(Date.UTC(2026, month - 1, 15));
}
