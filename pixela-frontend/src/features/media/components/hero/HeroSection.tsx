"use client";

import { Media } from '../../types';
import { BackdropImage } from './backdrop/BackdropImage';
import { MediaPoster } from './poster/MediaPoster';
import { MediaTitle } from './title/MediaTitle';
import { GenresList } from './genres/GenresList';
import { MediaMetadata } from './metadata/MediaMetadata';
import { CreatorInfo } from './creators/CreatorInfo';
import { ActionButtons } from './actions/ActionButtons';

interface HeroSectionProps {
  media: Media;
  onPosterClick: () => void;
  title: string;
}

export function HeroSection({ media, onPosterClick, title }: HeroSectionProps) {
  // Mapeo exacto de tipo
  const getItemType = (tipo: 'pelicula' | 'serie'): 'movie' | 'series' =>
    tipo === 'pelicula' ? 'movie' : 'series';

  return (
    <div className="relative h-[80vh] w-full">
      {/* Backdrop con degradado */}
      <BackdropImage backdropUrl={media.backdrop} />
      
      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-end pb-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <MediaPoster 
            posterUrl={media.poster} 
            title={media.titulo} 
            onClick={onPosterClick} 
          />
          
          {/* Info */}
          <div className="flex-grow">
            <MediaTitle title={media.titulo} score={media.puntuacion} />
            <GenresList genres={media.generos} />
            <MediaMetadata media={media} />
            <CreatorInfo media={media} />
            
            <p className="text-gray-300 text-lg max-w-3xl leading-relaxed mb-8">
              {media.sinopsis}
            </p>

            <ActionButtons 
              tmdbId={Number(media.id)} 
              itemType={getItemType(media.tipo)}
              title={title}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 