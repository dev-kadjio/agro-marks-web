import Form from "next/form";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export function SearchShortcut() {
  const t = useTranslations("navigation.search");
  return (
    <Link
      href="/products#product-filter-q"
      aria-label={t("label")}
      className="hidden size-11 items-center justify-center rounded-full text-forest transition-colors hover:bg-cream lg:inline-flex xl:hidden"
    >
      <Search aria-hidden="true" className="size-5" />
    </Link>
  );
}

export function HeaderSearch({ action, id, className }: { action: string; id: string; className?: string }) {
  const t = useTranslations("navigation.search");
  return (
    <Form action={action} role="search" className={cn("relative", className)}>
      <label htmlFor={id} className="sr-only">
        {t("label")}
      </label>
      <input
        id={id}
        name="q"
        type="search"
        maxLength={80}
        placeholder={t("placeholder")}
        className="block min-h-11 w-full rounded-full border border-line bg-cream pl-4 pr-11 text-sm text-ink placeholder:text-muted transition-colors hover:border-moss focus-visible:border-forest focus-visible:bg-white focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-forest"
      />
      <button
        type="submit"
        aria-label={t("submit")}
        className="absolute right-1 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-forest hover:bg-white"
      >
        <Search aria-hidden="true" className="size-4" />
      </button>
    </Form>
  );
}
