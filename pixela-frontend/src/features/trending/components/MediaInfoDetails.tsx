import { FaStar } from "react-icons/fa";
import { TrendingSerie, TrendingMovie } from "@/features/trending/type";
import { memo } from "react";

// Constantes
const MEDIA_TYPE_LABELS = {
  series: 'Serie',
  movies: 'Película'
} as const;

// Tipos
type MediaType = 'series' | 'movies';

interface MediaInfoDetailsProps {
  media: TrendingSerie | TrendingMovie;
  type: MediaType;
}

// Componentes internos
const RatingDisplay = memo(({ rating }: { rating: number }) => (
  <div className="flex items-center">
    <FaStar className="text-yellow-400 mr-1" />
    <span className="text-pixela-light font-semibold">
      {rating?.toFixed(1) || "N/A"}
    </span>
  </div>
));

RatingDisplay.displayName = 'RatingDisplay';

const MediaTypeBadge = memo(({ type }: { type: MediaType }) => (
  <span className="text-pixela-light/90 bg-pixela-dark/60 px-2 py-0.5 rounded-sm text-xs">
    {MEDIA_TYPE_LABELS[type]}
  </span>
));

MediaTypeBadge.displayName = 'MediaTypeBadge';

export const MediaInfoDetails = memo(({ media, type }: MediaInfoDetailsProps) => {
  const releaseDate = type === 'series' 
    ? (media as TrendingSerie).first_air_date 
    : (media as TrendingMovie).release_date;

  return (
    <div className="mb-4">
      <h3 className="text-pixela-light font-bold text-xl mb-2 font-outfit">
        {media.title}
      </h3>
      
      <div className="flex items-center gap-3 mb-3">
        <RatingDisplay rating={media.vote_average} />
        
        {releaseDate && (
          <span className="text-pixela-light/80">
            {releaseDate.split('-')[0]}
          </span>
        )}
        
        <MediaTypeBadge type={type} />
      </div>
    </div>
  );
});

MediaInfoDetails.displayName = 'MediaInfoDetails'; 