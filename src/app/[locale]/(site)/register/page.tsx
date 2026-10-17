import { getTranslations } from "next-intl/server";
import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";
import { Container } from "@/components/ui/container";
import { staticPageMetadata } from "@/lib/seo/static-page";

export function generateMetadata() {
  return staticPageMetadata("register", { noIndex: true });
}

export default async function RegisterPage() {
  const t = await getTranslations("auth");
  return (
    <Container>
      <AuthCard title={t("register.title")} intro={t("register.intro")} notice={t("notice")}>
        <RegisterForm />
      </AuthCard>
    </Container>
  );
}
