import type { ReactElement, ReactNode } from "react";
import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { AuthProvider } from "@/components/auth/auth-provider";
import { FavoritesProvider } from "@/components/favorites/favorites-provider";
import type { FavoritesStore } from "@/components/favorites/favorites-store";
import type { Locale } from "@/domain/locale";
import en from "../messages/en.json";
import fr from "../messages/fr.json";

const messages = { fr, en } as const;

export function renderWithProviders(ui: ReactElement, options: { locale?: Locale; store?: FavoritesStore } = {}) {
  const locale = options.locale ?? "fr";
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <NextIntlClientProvider locale={locale} messages={messages[locale]} timeZone="Africa/Douala">
        <FavoritesProvider store={options.store}>
          <AuthProvider>{children}</AuthProvider>
        </FavoritesProvider>
      </NextIntlClientProvider>
    );
  }
  return render(ui, { wrapper: Wrapper });
}
