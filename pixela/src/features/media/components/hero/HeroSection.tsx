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
  refreshReviews?: () => void;
}

const STYLES = {
  container: "relative min-h-[80vh] w-full",
  contentWrapper: "relative container mx-auto px-4",
  mobile: {
    layout: "lg:hidden pt-36 md:pt-44 pb-8",
    innerContainer: "flex flex-col items-center gap-6",
    posterWidth: "w-48",
    content: "w-full",
    synopsis: "text-gray-300 text-base leading-relaxed mt-4 mb-6"
  },
  desktop: {
    layout: "hidden lg:flex h-[80vh] items-end pb-20",
    innerContainer: "flex flex-row gap-8",
    content: "flex-grow",
    synopsis: "text-gray-300 text-lg max-w-3xl leading-relaxed mb-8"
  }
} as const;

export function HeroSection({ media, onPosterClick, title, refreshReviews }: HeroSectionProps) {
  // Mapeo exacto de tipo
  const getItemType = (tipo: 'pelicula' | 'serie'): 'movie' | 'series' =>
    tipo === 'pelicula' ? 'movie' : 'series';

  return (
    <div className={STYLES.container}>
      {/* Backdrop con degradado */}
      <BackdropImage backdropUrl={media.backdrop} />
      
      {/* Content */}
      <div className={STYLES.contentWrapper}>
        {/* Mobile Layout */}
        <div className={STYLES.mobile.layout}>
          <div className={STYLES.mobile.innerContainer}>
            <MediaPoster 
              posterUrl={media.poster} 
              title={media.titulo} 
              onClick={onPosterClick}
              className={STYLES.mobile.posterWidth} 
            />
            <div className={STYLES.mobile.content}>
              <MediaTitle title={media.titulo} score={media.puntuacion} />
              <GenresList genres={media.generos} />
              <MediaMetadata media={media} />
              <CreatorInfo media={media} />
              
              <p className={STYLES.mobile.synopsis}>
                {media.sinopsis}
              </p>

              <ActionButtons 
                tmdbId={Number(media.id)} 
                itemType={getItemType(media.tipo)}
                title={title}
                refreshReviews={refreshReviews}
              />
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className={STYLES.desktop.layout}>
          <div className={STYLES.desktop.innerContainer}>
            <MediaPoster 
              posterUrl={media.poster} 
              title={media.titulo} 
              onClick={onPosterClick} 
            />
            
            <div className={STYLES.desktop.content}>
              <MediaTitle title={media.titulo} score={media.puntuacion} />
              <GenresList genres={media.generos} />
              <MediaMetadata media={media} />
              <CreatorInfo media={media} />
              
              <p className={STYLES.desktop.synopsis}>
                {media.sinopsis}
              </p>

              <ActionButtons 
                tmdbId={Number(media.id)} 
                itemType={getItemType(media.tipo)}
                title={title}
                refreshReviews={refreshReviews}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 