import Image from "next/image";
import type { PhotoView } from "@/services/view-models";

export function ProducerGallery({ photos }: { photos: readonly PhotoView[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {photos.map((photo) => (
        <li key={photo.src}>
          <figure>
            <div className="relative aspect-square overflow-hidden rounded-card bg-cream">
              <Image src={photo.src} alt="" fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
            </div>
            <figcaption className="mt-2 text-xs leading-snug text-muted">{photo.alt}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
