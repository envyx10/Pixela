"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { MediaContent } from "@/features/discover/types/media";
import { TrendingSerie, TrendingMovie } from "@/features/trending/types";
import clsx from "clsx";
import { Badge } from "@/shared/components/Badge";
import { ActionButtons } from "@/shared/components/ActionButtons";
import { useRouter } from "next/navigation";
import { DiscoverCardProps } from "@/features/discover/types/components";
import { MediaType } from "@/features/media/types";
import { tmdbImageHelpers, TMDB_PLACEHOLDER } from "@/lib/constants/tmdb";

const STYLES = {
  containerBase:
    "relative aspect-[2/3] group rounded-2xl overflow-hidden cursor-pointer",
  image: "object-cover",
  overlay:
    "absolute inset-0 bg-gradient-to-t from-pixela-dark via-pixela-dark/70 to-transparent flex flex-col justify-end p-3 sm:p-4 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto",
  overlayContent: "mb-3 sm:mb-4",
  title: "text-pixela-light font-bold text-lg sm:text-xl mb-2 font-outfit",
  infoContainer: "flex items-center gap-2 sm:gap-3 mb-3",
  rating: {
    container: "flex items-center",
    icon: "text-yellow-400 mr-1",
    value: "text-pixela-light font-semibold text-sm",
  },
  year: "text-pixela-light/80 text-sm",
  badge:
    "text-pixela-light/90 bg-pixela-dark/60 px-2 py-0.5 rounded-sm text-xs",
  noiseEffect: "noise-effect opacity-5",
} as const;

const HIGH_RATING_THRESHOLD = 8.0;

/**
 * Type guard para determinar si el contenido es una serie
 */
const isTrendingSerie = (media: MediaContent): media is TrendingSerie => {
  return "first_air_date" in media;
};

/**
 * Helper para obtener el título del media
 */
const getMediaTitle = (media: MediaContent): string => {
  if ("title" in media) {
    return (media as TrendingMovie).title;
  }
  return (media as TrendingSerie).name;
};

/**
 * Componente que renderiza el contenido superpuesto al hacer hover
 */
const OverlayContent = ({
  media,
  type,
  onFollowClick,
}: {
  media: MediaContent;
  type: MediaType;
  onFollowClick: () => void;
}) => {
  const releaseYear = isTrendingSerie(media)
    ? media.first_air_date?.split("-")[0]
    : media.release_date?.split("-")[0];

  return (
    <div className={STYLES.overlay}>
      <ActionButtons
        tmdbId={Number(media.id)}
        itemType={type === "serie" ? "series" : "movie"}
        onFollowClick={onFollowClick}
        followLabel="Favoritos"
      />
      <div className={STYLES.overlayContent}>
        <h3 className={STYLES.title}>{getMediaTitle(media)}</h3>

        <div className={STYLES.infoContainer}>
          <div className={STYLES.rating.container}>
            <FaStar className={STYLES.rating.icon} />
            <span className={STYLES.rating.value}>
              {media.vote_average?.toFixed(1) || "N/A"}
            </span>
          </div>

          {releaseYear && <span className={STYLES.year}>{releaseYear}</span>}

          <span className={STYLES.badge}>
            {type === "serie" ? "Serie" : "Película"}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * Componente que muestra una tarjeta de contenido multimedia (serie o película)
 */
export const DiscoverCard = ({
  media,
  type,
  index,
  isMobile,
}: DiscoverCardProps) => {
  const router = useRouter();

  const imagePath = media.poster_path || media.backdrop_path;

  const isHighRated = (media.vote_average ?? 0) >= HIGH_RATING_THRESHOLD;

  const containerClasses = clsx(
    STYLES.containerBase,
    isMobile ? "w-full" : "w-[200px]",
  );

  /**
   * Maneja el clic en el botón de seguir.
   * @returns {void}
   */
  const handleFollowClick = () => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "Seguir",
        type === "serie" ? "serie" : "película",
        getMediaTitle(media),
      );
    }
  };

  /**
   * Maneja el clic en la tarjeta de la película o serie.
   * @returns {void}
   */
  const handleCardClick = () => {
    const route =
      type === "serie" ? `/series/${media.id}` : `/movies/${media.id}`;
    router.push(route);
  };

  return (
    <div className={containerClasses} onClick={handleCardClick}>
      <Image
        src={tmdbImageHelpers.poster(imagePath) || TMDB_PLACEHOLDER.POSTER}
        alt={getMediaTitle(media)}
        fill
        className={STYLES.image}
        sizes={isMobile ? "(max-width: 768px) 50vw, 200px" : "200px"}
        quality={90}
        priority={index < 4}
        loading={index < 4 ? "eager" : "lazy"}
      />

      <div className={STYLES.noiseEffect} />

      <OverlayContent
        media={media}
        type={type}
        onFollowClick={handleFollowClick}
      />

      {isHighRated && (
        <Badge label="TOP PIXELA" position="top-left" variant="primary" />
      )}
    </div>
  );
};
