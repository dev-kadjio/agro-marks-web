import Image from "next/image";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { FavoriteButton } from "@/components/favorites/favorite-button";
import { cardClasses } from "@/components/ui/styles";
import { Tag } from "@/components/ui/tag";
import { Link } from "@/i18n/navigation";
import type { ProducerSummary } from "@/services/view-models";
import { ProducerTypeBadge } from "./producer-type-badge";

export function ProducerCard({ producer }: { producer: ProducerSummary }) {
  const t = useTranslations();
  return (
    <article className={cardClasses}>
      <div className="relative aspect-4/3 overflow-hidden bg-cream">
        <Image
          src={producer.photo.src}
          alt={producer.photo.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <ProducerTypeBadge type={producer.type} className="absolute left-3 top-3 bg-white" />
      </div>
      <div className="absolute right-3 top-3 z-10">
        <FavoriteButton kind="producer" id={producer.id} name={producer.farmName} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <MapPin aria-hidden="true" className="size-4 shrink-0 text-gold" />
          {t("producers.profile.location", { city: producer.city, region: t(`regions.${producer.regionId}`) })}
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">
          <Link
            href={`/producers/${producer.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-card focus-visible:after:outline-2 focus-visible:after:outline-forest"
          >
            {producer.farmName}
          </Link>
        </h3>
        <p className="mt-0.5 text-sm text-muted">{producer.producerName}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink">{producer.tagline}</p>
        <ul aria-label={t("producers.profile.specialties")} className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {producer.specialtyIds.slice(0, 3).map((specialtyId) => (
            <li key={specialtyId}>
              <Tag>{t(`specialties.${specialtyId}`)}</Tag>
            </li>
          ))}
        </ul>
        <p aria-hidden="true" className="mt-4 text-sm font-medium text-forest group-hover:underline">
          {t("producers.card.viewProfile")}
        </p>
      </div>
    </article>
  );
}
