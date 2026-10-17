export const mainNavigation = [
  { key: "home", href: "/" },
  { key: "products", href: "/products" },
  { key: "farmers", href: "/farmers" },
  { key: "categories", href: "/categories" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export type MainNavigationKey = (typeof mainNavigation)[number]["key"];

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
