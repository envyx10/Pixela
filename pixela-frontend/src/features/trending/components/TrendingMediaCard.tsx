'use client';
import Image from "next/image";
import { TrendingSerie } from "@/features/trending/type";
import { useState } from "react";
import { Badge } from "@/shared/components/Badge";
import { ActionButtons } from "@/shared/components/ActionButtons";
import { MediaInfoDetails } from "./MediaInfoDetails";

interface TrendingMediaCardProps {
  serie: TrendingSerie;
}

export const TrendingMediaCard = ({ serie }: TrendingMediaCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Determinar si hay una puntuación alta (más de 7.5)
  const isHighRated = serie.vote_average && serie.vote_average >= 7.5;

  //TODO: Implementar la funcionalidad de los botones
  const handleDetailsClick = () => {
    console.log("Ver detalles de", serie.title);
  };

  const handleFollowClick = () => {
    console.log("Seguir serie", serie.title);
  };

  const handleReviewsClick = () => {
    console.log("Ver reseñas de", serie.title);
  };
  
  return (
    <div 
      className="w-[375px] flex flex-col relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster principal */}
      <div className="relative w-full h-[528px] overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
          alt={serie.title}
          fill
          className="object-cover"
          priority
        />
        
        {/* Efecto de ruido para dar textura */}
        <div className="noise-effect opacity-5"></div>
        
        {/* Overlay con detalles - solo visible en hover */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-pixela-dark via-pixela-dark/70 to-transparent 
                     flex flex-col justify-end p-5 transition-opacity duration-300 
                     ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >

          {/* Información sobre la serie */}
          <MediaInfoDetails serie={serie} />

          {/* Botones de acción para información y seguimiento */}
          <ActionButtons 
            onDetailsClick={handleDetailsClick}
            onFollowClick={handleFollowClick}
            onReviewsClick={handleReviewsClick}
          />
        </div>
        
        {/* Badge de calificación - siempre visible */}
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
}; 