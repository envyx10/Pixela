'use client';

import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MediaContent, MediaType } from "../type";
import { TrendingSerie } from "@/features/trending/type";
import clsx from "clsx";

interface DiscoverCardProps {
  media: MediaContent;
  type: MediaType;
  index: number;
}

const STYLES = {
  container: "relative w-[200px] h-[281px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pixela-accent/20",
  image: "object-cover rounded-2xl",
  overlay: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-4 rounded-2xl transition-all duration-300",
  title: "text-white font-bold text-lg font-outfit line-clamp-1 mb-2",
  ratingContainer: "flex items-center bg-black/30 px-2 py-1 rounded-full",
  ratingIcon: "text-yellow-400 mr-1",
  ratingText: "text-white font-semibold text-sm",
  yearContainer: "text-white/80 bg-black/30 px-2 py-1 rounded-full text-sm",
  overview: "text-white/90 text-sm line-clamp-2",
  glowEffect: "absolute inset-0 rounded-2xl transition-opacity duration-300 bg-gradient-to-t from-pixela-accent/20 to-transparent"
} as const;

/**
 * Type guard para determinar si el contenido es una serie
 */
const isTrendingSerie = (media: MediaContent): media is TrendingSerie => {
  return 'first_air_date' in media;
};

/**
 * Componente que muestra una tarjeta de contenido multimedia (serie o película)
 */
export const DiscoverCard = ({ media, type, index }: DiscoverCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const imagePath = type === 'series' 
    ? media.poster_path || media.backdrop_path
    : media.backdrop_path || media.poster_path;
  
  const releaseYear = isTrendingSerie(media)
    ? media.first_air_date?.split('-')[0]
    : media.release_date?.split('-')[0];

  return (
    <div 
      className={STYLES.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w780${imagePath}`}
        alt={media.title}
        fill
        className={STYLES.image}
        sizes="200px"
        quality={95}
        priority={index < 2}
        loading={index < 2 ? "eager" : "lazy"}
      />
      
      <div 
        className={clsx(STYLES.overlay, {
          'opacity-100 backdrop-blur-sm': isHovered,
          'opacity-0': !isHovered
        })}
      >
        <h3 className={STYLES.title}>
          {media.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <div className={STYLES.ratingContainer}>
            <FaStar className={STYLES.ratingIcon} />
            <span className={STYLES.ratingText}>
              {media.vote_average?.toFixed(1) || "N/A"}
            </span>
          </div>
          
          <span className={STYLES.yearContainer}>
            {releaseYear}
          </span>
        </div>

        <p className={STYLES.overview}>
          {media.overview}
        </p>
      </div>

      <div 
        className={clsx(STYLES.glowEffect, {
          'opacity-100': isHovered,
          'opacity-0': !isHovered
        })}
      />
    </div>
  );
}; 