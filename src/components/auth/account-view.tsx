"use client";

import { LogOut, UserRound } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { useFavorites } from "@/components/favorites/favorites-provider";
import { buttonClasses } from "@/components/ui/styles";
import { Link } from "@/i18n/navigation";
import { useAuth } from "./auth-provider";

export function AccountView() {
  const t = useTranslations("auth");
  const format = useFormatter();
  const { account, hydrated, logout } = useAuth();
  const { count } = useFavorites();

  if (!hydrated) {
    return (
      <p role="status" className="py-10 text-center text-muted">
        {t("loading")}
      </p>
    );
  }

  if (!account) {
    return (
      <div className="rounded-card border border-line bg-white p-8 text-center">
        <UserRound aria-hidden="true" className="mx-auto size-8 text-muted" />
        <h2 className="mt-4 text-lg font-semibold text-ink">{t("account.signedOutTitle")}</h2>
        <p className="mt-2 text-sm text-muted">{t("account.signedOutText")}</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/login" className={buttonClasses()}>
            {t("login.title")}
          </Link>
          <Link href="/register" className={buttonClasses({ variant: "secondary" })}>
            {t("register.title")}
          </Link>
        </div>
      </div>
    );
  }

  const details = [
    { key: "email", value: account.email },
    { key: "role", value: t(`roles.${account.role}`) },
    { key: "city", value: account.city ?? t("account.notProvided") },
    { key: "memberSince", value: format.dateTime(new Date(account.createdAt), { dateStyle: "long" }) },
    { key: "favorites", value: String(count) },
  ] as const;

  return (
    <div className="rounded-card border border-line bg-white p-6 sm:p-8">
      <div className="flex items-center gap-4">
        <span aria-hidden="true" className="inline-flex size-14 items-center justify-center rounded-full bg-forest text-xl font-semibold text-white">
          {account.name.charAt(0).toUpperCase()}
        </span>
        <div>
          <h2 className="text-xl font-semibold text-ink">{t("account.greeting", { name: account.name })}</h2>
          <p className="text-sm text-muted">{t(`roles.${account.role}`)}</p>
        </div>
      </div>
      <dl className="mt-8 divide-y divide-line border-y border-line">
        {details.map((detail) => (
          <div key={detail.key} className="flex flex-wrap justify-between gap-2 py-3">
            <dt className="text-sm text-muted">{t(`account.fields.${detail.key}`)}</dt>
            <dd className="text-sm font-medium text-ink">{detail.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/favorites" className={buttonClasses({ variant: "secondary" })}>
          {t("account.viewFavorites")}
        </Link>
        <button type="button" onClick={logout} className={buttonClasses({ variant: "ghost" })}>
          <LogOut aria-hidden="true" className="size-4" />
          {t("account.logout")}
        </button>
      </div>
    </div>
  );
}
