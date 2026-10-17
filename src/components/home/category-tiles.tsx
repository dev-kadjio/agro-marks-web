import Image from "next/image";
import { useTranslations } from "next-intl";
import { cardClasses } from "@/components/ui/styles";
import { Link } from "@/i18n/navigation";
import type { CategorySummary } from "@/services/view-models";

export function CategoryTiles({ categories, headingLevel = "h3" }: { categories: readonly CategorySummary[]; headingLevel?: "h2" | "h3" }) {
  const t = useTranslations("categories.card");
  const Heading = headingLevel;
  return (
    <ul className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      {categories.map((category) => (
        <li key={category.id}>
          <article className={cardClasses}>
            <div className="relative aspect-3/2 overflow-hidden bg-cream">
              <Image
                src={category.photo.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <Heading className="text-base font-semibold leading-snug text-ink">
                <Link
                  href={`/categories/${category.slug}`}
                  className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-card focus-visible:after:outline-2 focus-visible:after:outline-forest"
                >
                  {category.name}
                </Link>
              </Heading>
              <p className="mt-1 text-sm text-muted">{t("productCount", { count: category.productCount })}</p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
