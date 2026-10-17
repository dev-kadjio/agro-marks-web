"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export interface CarouselSlide {
  readonly key: string;
  readonly content: ReactNode;
}

interface CarouselProps {
  readonly label: string;
  readonly slides: readonly CarouselSlide[];
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Carousel({ label, slides }: CarouselProps) {
  const t = useTranslations("carousel");
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setEdges({ atStart: track.scrollLeft <= 4, atEnd: track.scrollLeft >= maxScroll - 4 });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(track);
    track.addEventListener("scroll", updateEdges, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", updateEdges);
    };
  }, [updateEdges]);

  const scrollByPage = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.9, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, []);

  function onKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByPage(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByPage(-1);
    }
  }

  const controlClasses =
    "inline-flex size-11 items-center justify-center rounded-full border border-line bg-white text-forest transition-colors hover:border-moss disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <section aria-roledescription="carousel" aria-label={label}>
      <div className="mb-4 flex justify-end gap-2">
        <button type="button" className={controlClasses} onClick={() => scrollByPage(-1)} disabled={edges.atStart} aria-label={t("previous")}>
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <button type="button" className={controlClasses} onClick={() => scrollByPage(1)} disabled={edges.atEnd} aria-label={t("next")}>
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>
      <ul
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-2 focus-visible:outline-offset-4 sm:mx-0 sm:scroll-px-0 sm:px-0"
      >
        {slides.map((slide, index) => (
          <li
            key={slide.key}
            aria-roledescription="slide"
            aria-label={t("slide", { index: index + 1, total: slides.length })}
            className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] xl:w-[calc((100%-3.75rem)/4)]"
          >
            {slide.content}
          </li>
        ))}
      </ul>
    </section>
  );
}
