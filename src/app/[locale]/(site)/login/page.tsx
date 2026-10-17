import { getTranslations } from "next-intl/server";
import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";
import { Container } from "@/components/ui/container";
import { staticPageMetadata } from "@/lib/seo/static-page";

export function generateMetadata() {
  return staticPageMetadata("login", { noIndex: true });
}

export default async function LoginPage() {
  const t = await getTranslations("auth");
  return (
    <Container>
      <AuthCard title={t("login.title")} intro={t("login.intro")} notice={t("notice")}>
        <LoginForm />
      </AuthCard>
    </Container>
  );
}
