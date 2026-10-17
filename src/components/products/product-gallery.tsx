"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import type { PhotoView } from "@/services/view-models";

export function ProductGallery({ photos }: { photos: readonly PhotoView[] }) {
  const t = useTranslations("products.detail");
  const [selected, setSelected] = useState(0);
  const current = photos[selected] ?? photos[0];

  if (!current) {
    return null;
  }

  return (
    <div>
      <div className="relative aspect-4/3 overflow-hidden rounded-card border border-line bg-cream">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          loading="eager"
          fetchPriority={selected === 0 ? "high" : "auto"}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      {photos.length > 1 ? (
        <ul aria-label={t("gallery")} className="mt-3 grid grid-cols-4 gap-3">
          {photos.map((photo, index) => (
            <li key={photo.src}>
              <button
                type="button"
                onClick={() => setSelected(index)}
                aria-label={t("showPhoto", { index: index + 1 })}
                aria-current={index === selected ? "true" : undefined}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-lg border-2 transition-colors",
                  index === selected ? "border-forest" : "border-transparent hover:border-line",
                )}
              >
                <Image src={photo.src} alt="" fill loading="eager" sizes="120px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
