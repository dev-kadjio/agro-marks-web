"use client";

import { UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "./auth-provider";

export function AccountLink() {
  const t = useTranslations("auth");
  const { account, hydrated } = useAuth();
  const signedIn = hydrated && account !== null;

  return (
    <Link
      href={signedIn ? "/account" : "/login"}
      aria-label={signedIn ? t("account.linkSignedIn", { name: account.name }) : t("login.title")}
      className="relative inline-flex size-11 items-center justify-center rounded-full text-forest transition-colors hover:bg-cream"
    >
      {signedIn ? (
        <span aria-hidden="true" className="inline-flex size-8 items-center justify-center rounded-full bg-forest text-sm font-semibold text-white">
          {account.name.charAt(0).toUpperCase()}
        </span>
      ) : (
        <UserRound aria-hidden="true" className="size-5" />
      )}
    </Link>
  );
}
