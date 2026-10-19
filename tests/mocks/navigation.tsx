import type { AnchorHTMLAttributes, ReactNode } from "react";
import { vi } from "vitest";

export const routerReplace = vi.fn();
export const routerPush = vi.fn();

export function Link({ href, children, locale, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; locale?: string; children: ReactNode }) {
  return (
    <a href={locale ? `/${locale}${href}` : href} {...props}>
      {children}
    </a>
  );
}

export const usePathname = () => "/producers";
export const useRouter = () => ({ replace: routerReplace, push: routerPush });
export const getPathname = ({ href, locale }: { href: string; locale: string }) => `/${locale}${href}`;
