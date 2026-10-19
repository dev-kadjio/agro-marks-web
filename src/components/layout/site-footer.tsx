import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";

const footerColumns = [
  {
    titleKey: "explore",
    links: [
      { key: "producers", href: "/producers" },
      { key: "categories", href: "/categories" },
      { key: "favorites", href: "/favorites" },
    ],
  },
  {
    titleKey: "platform",
    links: [
      { key: "about", href: "/about" },
      { key: "faq", href: "/faq" },
      { key: "contact", href: "/contact" },
    ],
  },
  {
    titleKey: "information",
    links: [
      { key: "legal", href: "/legal" },
      { key: "privacy", href: "/privacy" },
    ],
  },
] as const;

export function SiteFooter({ year }: { year: number }) {
  const t = useTranslations();
  return (
    <footer className="border-t border-line bg-cream">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)_1.2fr]">
          <div>
            <Logo variant="footer" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{t("footer.about")}</p>
          </div>
          {footerColumns.map((column) => (
            <nav key={column.titleKey} aria-labelledby={`footer-${column.titleKey}`}>
              <h2 id={`footer-${column.titleKey}`} className="text-sm font-semibold text-ink">
                {t(`footer.${column.titleKey}`)}
              </h2>
              <ul className="mt-3 space-y-1">
                {column.links.map((link) => (
                  <li key={link.key}>
                    <Link href={link.href} className="inline-flex min-h-9 items-center text-sm text-muted hover:text-forest hover:underline">
                      {t(`navigation.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h2 className="text-sm font-semibold text-ink">{t("footer.contactTitle")}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t("footer.contactText")}</p>
            <Link href="/contact" className="mt-3 inline-flex min-h-9 items-center text-sm font-medium text-forest hover:underline">
              {t("footer.contactCta")}
            </Link>
          </div>
        </div>
        <div className="mt-12 space-y-2 border-t border-line pt-6 text-xs leading-relaxed text-muted">
          <p>{t("footer.demoDisclaimer")}</p>
          <p>{t("footer.photoCredits")}</p>
          <p>{t("footer.rights", { year })}</p>
        </div>
      </Container>
    </footer>
  );
}
