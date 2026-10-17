import { getTranslations } from "next-intl/server";
import { AccountView } from "@/components/auth/account-view";
import { Container } from "@/components/ui/container";
import { Notice } from "@/components/ui/notice";
import { staticPageMetadata } from "@/lib/seo/static-page";

export function generateMetadata() {
  return staticPageMetadata("account", { noIndex: true });
}

export default async function AccountPage() {
  const t = await getTranslations("auth");
  return (
    <Container>
      <div className="mx-auto w-full max-w-2xl py-12 sm:py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">{t("account.title")}</h1>
        <Notice className="mt-6">{t("notice")}</Notice>
        <div className="mt-8">
          <AccountView />
        </div>
      </div>
    </Container>
  );
}
