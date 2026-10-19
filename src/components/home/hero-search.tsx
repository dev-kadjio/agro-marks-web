import Form from "next/form";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const suggestions = ["first", "second", "third", "fourth"] as const;

export function HeroSearch({ action, className }: { action: string; className?: string }) {
  const t = useTranslations("home.hero.search");
  return (
    <div className={cn("rounded-card border border-line bg-white p-4 shadow-sm", className)}>
      <Form action={action} role="search">
        <label htmlFor="hero-search" className="block text-base font-semibold text-ink">
          {t("label")}
        </label>
        <p id="hero-search-hint" className="mt-1 text-sm text-muted">
          {t("hint")}
        </p>
        <div className="relative mt-3">
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-forest" />
          <input
            id="hero-search"
            name="q"
            type="search"
            maxLength={80}
            enterKeyHint="search"
            aria-describedby="hero-search-hint"
            placeholder={t("placeholder")}
            className="block min-h-14 w-full rounded-full border-2 border-forest bg-white pl-12 pr-32 text-base text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 inline-flex min-h-11 -translate-y-1/2 items-center rounded-full bg-forest px-5 text-sm font-semibold text-white transition-colors hover:bg-moss focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {t("submit")}
          </button>
        </div>
      </Form>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted">{t("suggestionsLabel")}</span>
        {suggestions.map((key) => (
          <Link
            key={key}
            href={`/producers?q=${encodeURIComponent(t(`suggestions.${key}`))}`}
            className="inline-flex min-h-9 items-center rounded-full bg-cream px-3 text-sm font-medium text-forest transition-colors hover:bg-forest hover:text-white"
          >
            {t(`suggestions.${key}`)}
          </Link>
        ))}
      </div>
    </div>
  );
}
