import { getLocale } from "next-intl/server";
import { AccountLink } from "@/components/auth/account-link";
import { FavoritesLink } from "@/components/favorites/favorites-link";
import { Container } from "@/components/ui/container";
import { getPathname } from "@/i18n/navigation";
import { HeaderSearch, SearchShortcut } from "./header-search";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";
import { MainNav } from "./main-nav";
import { MobileMenu } from "./mobile-menu";

export async function SiteHeader() {
  const locale = await getLocale();
  const searchAction = getPathname({ href: "/products", locale });
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <Container className="relative flex h-16 items-center gap-3 sm:h-18 lg:gap-6">
        <Logo eager />
        <MainNav />
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <HeaderSearch action={searchAction} id="header-search" className="hidden w-56 xl:block" />
          <SearchShortcut />
          <LanguageSwitcher className="hidden sm:block" />
          <FavoritesLink />
          <AccountLink />
          <MobileMenu search={<HeaderSearch action={searchAction} id="mobile-search" />} />
        </div>
      </Container>
    </header>
  );
}
