import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/styles";
import { Link } from "@/i18n/navigation";

export function NotFoundContent() {
  const t = useTranslations();
  return (
    <Container className="flex flex-col items-center py-20 text-center sm:py-28">
      <p className="text-sm font-semibold text-gold">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{t("errors.notFound.title")}</h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{t("errors.notFound.description")}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={buttonClasses()}>
          {t("common.backHome")}
        </Link>
        <Link href="/producers" className={buttonClasses({ variant: "secondary" })}>
          {t("errors.notFound.producers")}
        </Link>
        <Link href="/categories" className={buttonClasses({ variant: "secondary" })}>
          {t("errors.notFound.categories")}
        </Link>
      </div>
    </Container>
  );
}
