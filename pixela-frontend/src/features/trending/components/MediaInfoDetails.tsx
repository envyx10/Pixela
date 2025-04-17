import { FaStar } from "react-icons/fa";
import { TrendingSerie } from "@/features/trending/type";

interface MediaInfoDetailsProps {
  serie: TrendingSerie;
}

export const MediaInfoDetails = ({ serie }: MediaInfoDetailsProps) => {
  return (
    <div className="mb-4">
      <h3 className="text-pixela-light font-bold text-xl mb-2 font-outfit">
        {serie.title}
      </h3>
      
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="text-pixela-light font-semibold">{serie.vote_average?.toFixed(1) || "N/A"}</span>
        </div>
        
        {serie.first_air_date && (
          <span className="text-pixela-light/80">{serie.first_air_date.split('-')[0]}</span>
        )}
        
        <span className="text-pixela-light/90 bg-pixela-dark/60 px-2 py-0.5 rounded-sm text-xs">
          Serie
        </span>
      </div>
    </div>
  );
}; 