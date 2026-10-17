import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { AuthProvider } from "@/components/auth/auth-provider";
import { FavoritesProvider } from "@/components/favorites/favorites-provider";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { brand } from "@/config/brand";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/json-ld";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("seo");
  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: brand.name,
    title: { default: t("defaultTitle"), template: `%s | ${brand.name}` },
    description: t("defaultDescription"),
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#173D2B",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const tSeo = await getTranslations("seo");

  return (
    <html lang={locale} className={inter.variable}>
      <body className="flex min-h-dvh flex-col bg-white font-sans text-ink antialiased">
        <NextIntlClientProvider>
          <FavoritesProvider>
            <AuthProvider>{children}</AuthProvider>
          </FavoritesProvider>
        </NextIntlClientProvider>
        <JsonLdScript
          data={[organizationJsonLd(locale, tSeo("defaultDescription")), websiteJsonLd(locale, tSeo("defaultDescription"))]}
        />
      </body>
    </html>
  );
}
