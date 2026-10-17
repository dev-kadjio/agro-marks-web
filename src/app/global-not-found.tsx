import type { Metadata } from "next";
import { Inter } from "next/font/google";
import en from "../../messages/en.json";
import fr from "../../messages/fr.json";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: `404 — ${fr.errors.notFound.title} / ${en.errors.notFound.title}`,
  robots: { index: false },
};

const versions = [
  { locale: "fr", messages: fr },
  { locale: "en", messages: en },
] as const;

export default function GlobalNotFound() {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="flex min-h-dvh items-center justify-center bg-cream px-4 font-sans text-ink antialiased">
        <main className="grid w-full max-w-3xl gap-6 sm:grid-cols-2">
          {versions.map(({ locale, messages }) => (
            <section key={locale} lang={locale} className="rounded-card border border-line bg-white p-8">
              <p className="text-sm font-semibold text-gold">404</p>
              <h1 className="mt-3 text-2xl font-semibold text-ink">{messages.errors.notFound.title}</h1>
              <p className="mt-3 text-sm leading-relaxed text-muted">{messages.errors.notFound.description}</p>
              <a
                href={`/${locale}`}
                className="mt-6 inline-flex min-h-11 items-center rounded-full bg-forest px-5 text-sm font-medium text-white hover:bg-moss"
              >
                {messages.common.backHome}
              </a>
            </section>
          ))}
        </main>
      </body>
    </html>
  );
}
