import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing, TIME_ZONE } from "./routing";

export default getRequestConfig(async ({ locale: requested }) => {
  const candidate = requested ?? (await rootParams.locale());
  if (!hasLocale(routing.locales, candidate)) {
    notFound();
  }
  return {
    locale: candidate,
    timeZone: TIME_ZONE,
    messages: (await import(`../../messages/${candidate}.json`)).default,
  };
});
