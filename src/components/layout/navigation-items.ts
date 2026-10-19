export const mainNavigation = [
  { key: "home", href: "/" },
  { key: "producers", href: "/producers" },
  { key: "categories", href: "/categories" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
  { key: "faq", href: "/faq" },
] as const;

export type MainNavigationKey = (typeof mainNavigation)[number]["key"];

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
