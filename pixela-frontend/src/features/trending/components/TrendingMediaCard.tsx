'use client';
import Image from "next/image";
import { TrendingSerie, TrendingMovie } from "@/features/trending/type";
import { useState, memo } from "react";
import { Badge } from "@/shared/components/Badge";
import { ActionButtons } from "@/shared/components/ActionButtons";
import { MediaInfoDetails } from "./MediaInfoDetails";
import { useRouter } from 'next/navigation';


/**
 * Constantes para la configuración del componente
 */
const STYLES = {
  card: 'w-[375px] flex flex-col relative group',
  posterContainer: 'relative w-full h-[528px] overflow-hidden',
  noiseEffect: 'noise-effect opacity-5'
} as const;

const HIGH_RATING_THRESHOLD = 7.5;
const INITIALLY_VISIBLE_ITEMS = 3;
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

/**
 * Tipo que representa el tipo de medio (series o películas)
 */
type MediaType = 'series' | 'movies';

/**
 * Props para el componente TrendingMediaCard
 * @property {TrendingSerie | TrendingMovie} media - Datos del medio a mostrar
 * @property {MediaType} type - Tipo de medio (series o películas)
 * @property {number} [index] - Índice opcional del medio en la lista
 */
interface TrendingMediaCardProps {
  media: TrendingSerie | TrendingMovie;
  type: MediaType;
  index?: number;
}

/**
 * Props para el componente PosterImage
 * @property {string} posterPath - Ruta de la imagen del póster
 * @property {string} title - Título del medio
 * @property {boolean} isInitiallyVisible - Indica si el elemento debe cargarse prioritariamente
 */
interface PosterImageProps {
  posterPath: string;
  title: string;
  isInitiallyVisible: boolean;
}

/**
 * Componente que renderiza la imagen del póster de un medio
 * @param {PosterImageProps} props - Props del componente
 * @returns {JSX.Element} Imagen del póster
 */
const PosterImage = memo(({ posterPath, title, isInitiallyVisible }: PosterImageProps) => (
  <Image
    src={`${TMDB_IMAGE_BASE_URL}${posterPath}`}
    alt={title}
    fill
    className="object-cover"
    priority={isInitiallyVisible}
    sizes="(max-width: 768px) 100vw, 375px"
    loading={isInitiallyVisible ? "eager" : "lazy"}
  />
));

PosterImage.displayName = 'PosterImage';

/**
 * Props para el componente OverlayContent
 * @property {TrendingSerie | TrendingMovie} media - Datos del medio
 * @property {MediaType} type - Tipo de medio (series o películas)
 * @property {() => void} onFollowClick - Función a ejecutar al hacer clic en seguir
 * @property {() => void} onReviewsClick - Función a ejecutar al hacer clic en reseñas
 */
interface OverlayContentProps {
  media: TrendingSerie | TrendingMovie;
  type: MediaType;
  onFollowClick: () => void;
  onReviewsClick: () => void;
}

/**
 * Componente que renderiza el contenido superpuesto al hacer hover sobre una tarjeta
 * @param {OverlayContentProps} props - Props del componente
 * @returns {JSX.Element} Contenido superpuesto
 */
const OverlayContent = memo(({ media, type, onFollowClick, onReviewsClick }: OverlayContentProps) => (
  <div className="absolute inset-0 bg-gradient-to-t from-pixela-dark via-pixela-dark/70 to-transparent 
                 flex flex-col justify-end p-5 transition-opacity duration-300">
    <MediaInfoDetails media={media} type={type} />
    <ActionButtons 
      tmdbId={Number(media.id)}
      itemType={type === 'series' ? 'series' : 'movie'}
      onFollowClick={onFollowClick}
      onReviewsClick={onReviewsClick}
      detailsHref={`/${type}/${media.id}`}
    />
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

  const handleReviewsClick = () => {
    router.prefetch(`/${type}/${media.id}`);
    router.push(`/${type}/${media.id}`);
  };
  
  return (
    <div 
      className={STYLES.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
            onReviewsClick={handleReviewsClick}
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