'use client';
import Image from "next/image";
import { TrendingSerie, TrendingMovie } from "../type";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface DiscoverCardProps {
  media: TrendingSerie | TrendingMovie;
  type: 'series' | 'movies';
  index: number;
}

export const DiscoverCard = ({ media, type, index }: DiscoverCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Seleccionar la mejor imagen según el tipo
  const imagePath = type === 'series' 
    ? media.poster_path || media.backdrop_path
    : media.backdrop_path || media.poster_path;
  const imageSize = 'w780';

  return (
    <div 
      className="relative w-[200px] h-[281px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pixela-accent/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={`https://image.tmdb.org/t/p/${imageSize}${imagePath}`}
        alt={media.title}
        fill
        className="object-cover rounded-2xl"
        sizes="200px"
        quality={95}
        priority={index < 2}
        loading={index < 2 ? "eager" : "lazy"}
      />
      
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent 
                   flex flex-col justify-end p-4 rounded-2xl transition-all duration-300 
                   ${isHovered ? 'opacity-100 backdrop-blur-sm' : 'opacity-0'}`}
      >
        <h3 className="text-white font-bold text-lg font-outfit line-clamp-1 mb-2">
          {media.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center bg-black/30 px-2 py-1 rounded-full">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-white font-semibold text-sm">{media.vote_average?.toFixed(1) || "N/A"}</span>
          </div>
          
          <span className="text-white/80 bg-black/30 px-2 py-1 rounded-full text-sm">
            {type === 'series' 
              ? (media as TrendingSerie).first_air_date?.split('-')[0]
              : (media as TrendingMovie).release_date?.split('-')[0]
            }
          </span>
        </div>

        <p className="text-white/90 text-sm line-clamp-2">
          {media.overview}
        </p>
      </div>

      {/* Efecto de brillo en hover */}
      <div 
        className={`absolute inset-0 rounded-2xl transition-opacity duration-300
                   ${isHovered ? 'opacity-100' : 'opacity-0'}
                   bg-gradient-to-t from-pixela-accent/20 to-transparent`}
      />
    </div>
  );
}; 