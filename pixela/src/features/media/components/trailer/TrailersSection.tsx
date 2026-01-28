"use client";

import { useMediaStore } from '@/features/media/store/mediaStore';
import { TrailersSectionProps } from '@/features/media/types/trailer';
import { TrailerPlayer } from './TrailerPlayer';
import { TrailerList } from './TrailerList';  

const STYLES = {
  container: {
    base: "mt-12 mb-24",
    title: "mb-5 text-2xl font-bold text-white",
    content: "flex flex-col gap-6 lg:flex-row"
  }
} as const;


/**
 * Componente que muestra la sección de trailers
 * @param {TrailersSectionProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente de sección de trailers
 */
export function TrailersSection({ trailers }: TrailersSectionProps) {
  // Filtrar solo trailers de YouTube válidos
  const youtubeTrailers = trailers.filter(trailer => 
    trailer.site?.toLowerCase() === 'youtube' && 
    trailer.key
  );

  const { selectedTrailerId, setSelectedTrailerId } = useMediaStore();
  
  if (youtubeTrailers.length === 0) return null;
  
  return (
    <div className={STYLES.container.base}>
      <h2 className={STYLES.container.title}>Trailers y Videos</h2>
      
      <div className={STYLES.container.content}>
        <TrailerPlayer trailerId={selectedTrailerId || youtubeTrailers[0]?.key || ''} />
        <TrailerList 
          trailers={youtubeTrailers} 
          selectedTrailerId={selectedTrailerId || youtubeTrailers[0]?.key || ''} 
          onSelectTrailer={setSelectedTrailerId} 
        />
      </div>
    </div>
  );
} 