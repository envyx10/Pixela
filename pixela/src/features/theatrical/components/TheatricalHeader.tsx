"use client";

import { useRef, useMemo } from "react";
import { TheatricalMovie } from "../types";
import { MediaCarousel } from "@/shared/components/MediaCarousel";
import { TrendingMediaCard } from "@/features/trending/components/content/TrendingMediaCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import QuoteSection from "@/features/quotes/components/QuoteSection";

// Estilos adaptados de TrendingHeader
const STYLES = {
  title:
    "font-black font-outfit tracking-wider uppercase leading-none w-full md:w-auto text-right break-words ml-auto text-pixela-accent",
  titleMobile: "block sm:hidden text-[64px] leading-[0.95] text-right pr-4",
  titleDesktop:
    "hidden sm:block text-[64px] md:text-[96px] lg:text-[128px] 2k:text-[100px] text-right sm:pr-0",
  container:
    "relative w-full bg-pixela-dark flex flex-col pt-8 md:pt-20 2k:pt-12 min-h-[50vh]",
  content:
    "flex-grow flex flex-col justify-center md:justify-start relative z-10 pb-16 md:pb-0 2k:pb-8",
  headerWrapper:
    "relative w-full bg-pixela-dark flex flex-col justify-center overflow-hidden items-stretch gap-8 px-4 py-12 lg:w-[85%] xl:w-[80%] 2k:w-[70%] lg:mx-auto lg:flex-row lg:items-end lg:justify-between lg:gap-0 lg:px-0 lg:py-0 2k:py-6 lg:overflow-visible lg:bg-transparent lg:relative",
  carouselWrapper: "w-full",
  slides: "flex gap-0",
  slide:
    "relative w-[280px] min-w-[280px] max-w-[280px] md:w-[375px] md:min-w-[375px] md:max-w-[375px] flex-none",
} as const;

export const TheatricalHeader = ({
  movies,
  quote,
}: {
  movies: TheatricalMovie[];
  quote?: { quote: string; author: string };
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  const animationElements = useMemo(
    () => [
      { ref: titleRef, duration: 0.8, ease: "power2.out" },
      { ref: carouselRef, duration: 0.8, ease: "power2.out", delay: "-=0.3" },
      { ref: quoteRef, duration: 0.6, ease: "power2.out", delay: "-=0.2" },
    ],
    [],
  );

  useScrollAnimation({
    trigger: containerRef,
    triggerStart: "top 80%",
    initialY: 30,
    elements: animationElements,
  });

  if (!movies || movies.length === 0) return null;

  return (
    <div id="cartelera" className={STYLES.container} ref={containerRef}>
      <div className={STYLES.content}>
        {/* Header con estructura idéntica a Tendencias para respetar espacios */}
        <div className={STYLES.headerWrapper}>
          {/* Espaciador flexible para empujar título a la derecha si es necesario */}
          <div className="flex-grow hidden lg:block" />

          <div ref={titleRef} className="ml-auto">
            <h2 className={STYLES.title}>
              <span className={STYLES.titleMobile}>
                TOP
                <br />
                CINE
              </span>
              <span className={STYLES.titleDesktop}>TOP CARTELERA</span>
            </h2>
          </div>
        </div>

        {/* Carrusel */}
        <div ref={carouselRef} className={STYLES.carouselWrapper}>
          <MediaCarousel
            className="trending-carousel mx-0"
            slidesClassName={STYLES.slides}
          >
            {movies.map((movie, index) => (
              <div key={movie.id} className={STYLES.slide}>
                <TrendingMediaCard
                  media={movie as any}
                  type="movies"
                  index={index}
                />
              </div>
            ))}
          </MediaCarousel>
        </div>

        {/* Cita justificada a la izquierda */}
        {quote && (
          <div ref={quoteRef}>
            <QuoteSection quote={quote} align="left" />
          </div>
        )}
      </div>
    </div>
  );
};
