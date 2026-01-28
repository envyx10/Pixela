'use client';
import Image from "next/image";
import { useState, memo } from "react";
import { Badge } from "@/shared/components/Badge";
import { ActionButtons } from "@/shared/components/ActionButtons";
import { MediaInfoDetails } from "./MediaInfoDetails";
import { useRouter } from 'next/navigation';
import type { TrendingMediaCardProps, PosterImageProps, OverlayContentProps } from '@/features/trending/types';

/**
 * Estilos constantes para el componente TrendingMediaCard
 */
const STYLES = {
  card: 'w-[280px] md:w-[375px] flex flex-col relative group cursor-pointer',
  posterContainer: 'relative w-full h-[395px] md:h-[528px] overflow-hidden',
  noiseEffect: 'noise-effect opacity-5'
} as const;

const HIGH_RATING_THRESHOLD = 8.0;
const INITIALLY_VISIBLE_ITEMS = 3;
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

/**
 * Componente que renderiza la imagen del póster de un medio
 * @param {PosterImageProps} props - Props del componente
 * @returns {JSX.Element} Imagen del póster
 */
const PosterImage = memo(({ posterPath, title, isInitiallyVisible }: PosterImageProps) => (
  <Image
    src={`${TMDB_IMAGE_BASE_URL}${posterPath || ''}`}
    alt={title || 'Media poster'}
    fill
    className="object-cover"
    priority={isInitiallyVisible}
    sizes="(max-width: 768px) 100vw, 375px"
    loading={isInitiallyVisible ? "eager" : "lazy"}
  />
));

PosterImage.displayName = 'PosterImage';


/**
 * Componente que renderiza el contenido superpuesto al hacer hover sobre una tarjeta
 * @param {OverlayContentProps} props - Props del componente
 * @returns {JSX.Element} Contenido superpuesto
 */
const OverlayContent = memo(({ media, type, onFollowClick }: OverlayContentProps) => (
  <div className="absolute inset-0 flex flex-col justify-end p-5 transition-all duration-500 ease-in-out bg-gradient-to-t from-pixela-dark via-pixela-dark/70 to-transparent">
    <ActionButtons 
      tmdbId={Number(media.id)}
      itemType={type === 'series' ? 'series' : 'movie'}
      onFollowClick={onFollowClick}
    />
    <MediaInfoDetails media={media} type={type} />
  </div>
));

OverlayContent.displayName = 'OverlayContent';

/**
 * Componente que renderiza una tarjeta de medio en tendencia
 * @param {TrendingMediaCardProps} props - Props del componente
 * @returns {JSX.Element} Tarjeta de medio
 */
export const TrendingMediaCard = memo(({ media, type, index = 0 }: TrendingMediaCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  
  const isHighRated = media.vote_average >= HIGH_RATING_THRESHOLD;
  const isInitiallyVisible = index < INITIALLY_VISIBLE_ITEMS;

  const handleFollowClick = () => {
    console.log("Seguir", type === 'series' ? 'serie' : 'película', media.title);
  };
  
  /**
   * Maneja el clic en la tarjeta de la película o serie.
   * @returns {void}
   */
  const handleCardClick = () => {
    router.push(`/${type}/${media.id}`);
  };
  
  return (
    <div 
      className={STYLES.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className={STYLES.posterContainer}>
        <PosterImage 
          posterPath={media.poster_path}
          title={media.title}
          isInitiallyVisible={isInitiallyVisible}
        />
        
        <div className={STYLES.noiseEffect} />
        
        {isHovered && (
          <OverlayContent 
            media={media}
            type={type}
            onFollowClick={handleFollowClick}
          />
        )}
        
        {isHighRated && (
          <Badge 
            label="TOP PIXELA"
            position="top-left"
            variant="primary"
          />
        )}
      </div>
    </div>
  );
});

TrendingMediaCard.displayName = 'TrendingMediaCard'; 