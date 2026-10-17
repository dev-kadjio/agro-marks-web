import Image from "next/image";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { FavoriteButton } from "@/components/favorites/favorite-button";
import { cardClasses } from "@/components/ui/styles";
import { Tag } from "@/components/ui/tag";
import { Link } from "@/i18n/navigation";
import type { FarmerSummary } from "@/services/view-models";

export function FarmerCard({ farmer }: { farmer: FarmerSummary }) {
  const t = useTranslations();
  return (
    <article className={cardClasses}>
      <div className="relative aspect-4/3 overflow-hidden bg-cream">
        <Image
          src={farmer.photo.src}
          alt={farmer.photo.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="absolute right-3 top-3 z-10">
        <FavoriteButton kind="farmer" id={farmer.id} name={farmer.farmName} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <MapPin aria-hidden="true" className="size-4 shrink-0 text-gold" />
          {t("farmers.profile.location", { city: farmer.city, region: t(`regions.${farmer.regionId}`) })}
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">
          <Link
            href={`/farmers/${farmer.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-card focus-visible:after:outline-2 focus-visible:after:outline-forest"
          >
            {farmer.farmName}
          </Link>
        </h3>
        <p className="mt-0.5 text-sm text-muted">{farmer.producerName}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink">{farmer.tagline}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {farmer.specialtyIds.slice(0, 3).map((specialtyId) => (
            <li key={specialtyId}>
              <Tag>{t(`specialties.${specialtyId}`)}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
