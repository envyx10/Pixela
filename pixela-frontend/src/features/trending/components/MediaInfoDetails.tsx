import { FaStar } from "react-icons/fa";
import { TrendingSerie, TrendingMovie } from "@/features/trending/type";

interface MediaInfoDetailsProps {
  media: TrendingSerie | TrendingMovie;
  type: 'series' | 'movies';
}

export const MediaInfoDetails = ({ media, type }: MediaInfoDetailsProps) => {
  // Obtener la fecha según el tipo de contenido
  const releaseDate = type === 'series' 
    ? (media as TrendingSerie).first_air_date 
    : (media as TrendingMovie).release_date;

  return (
    <div className="mb-4">
      <h3 className="text-pixela-light font-bold text-xl mb-2 font-outfit">
        {media.title}
      </h3>
      
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="text-pixela-light font-semibold">{media.vote_average?.toFixed(1) || "N/A"}</span>
        </div>
        
        {releaseDate && (
          <span className="text-pixela-light/80">{releaseDate.split('-')[0]}</span>
        )}
        
        <span className="text-pixela-light/90 bg-pixela-dark/60 px-2 py-0.5 rounded-sm text-xs">
          {type === 'series' ? 'Serie' : 'Película'}
        </span>
      </div>
    </div>
  );
}; 