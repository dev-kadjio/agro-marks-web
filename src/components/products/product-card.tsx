import Image from "next/image";
import { useTranslations } from "next-intl";
import { FavoriteButton } from "@/components/favorites/favorite-button";
import { cardClasses } from "@/components/ui/styles";
import { Link } from "@/i18n/navigation";
import type { ProductSummary } from "@/services/view-models";
import { AvailabilityBadge } from "./availability-badge";
import { PriceTag } from "./price-tag";

export const productCardImageSizes = "(min-width: 1280px) 22rem, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw";

export function ProductCard({ product, headingLevel = "h3" }: { product: ProductSummary; headingLevel?: "h2" | "h3" }) {
  const t = useTranslations("products.card");
  const Heading = headingLevel;
  return (
    <article className={cardClasses}>
      <div className="relative aspect-4/3 overflow-hidden bg-cream">
        <Image
          src={product.photo.src}
          alt={product.photo.alt}
          fill
          sizes={productCardImageSizes}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="absolute right-3 top-3 z-10">
        <FavoriteButton kind="product" id={product.id} name={product.name} />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-muted">{product.categoryName}</p>
        <Heading className="mt-1 text-base font-semibold leading-snug text-ink">
          <Link
            href={`/products/${product.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-card focus-visible:after:outline-2 focus-visible:after:outline-forest"
          >
            {product.name}
          </Link>
        </Heading>
        <p className="mt-1 text-sm text-muted">
          {t("by", { farm: product.farmer.farmName })} · {product.farmer.city}
        </p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-4">
          <PriceTag price={product.price} unit={product.unit} />
          <AvailabilityBadge availability={product.availability} />
        </div>
      </div>
    </article>
  );
}
