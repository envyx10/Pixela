"use client";

import { Trailer } from '../../types';
import { useState } from 'react';
import { TrailerPlayer } from './TrailerPlayer';
import { TrailerList } from './TrailerList';

interface TrailersSectionProps {
  trailers: Trailer[];
}

export function TrailersSection({ trailers }: TrailersSectionProps) {
  // Filtrar solo trailers de YouTube válidos
  const youtubeTrailers = trailers.filter(trailer => 
    trailer.site?.toLowerCase() === 'youtube' && 
    trailer.key
  );

  const [selectedTrailer, setSelectedTrailer] = useState(youtubeTrailers[0]?.key || '');
  
  if (youtubeTrailers.length === 0) return null;
  
  return (
    <div className="mt-12 mb-24">
      <h2 className="text-2xl font-bold text-white mb-5">Trailers y Videos</h2>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <TrailerPlayer trailerId={selectedTrailer} />
        <TrailerList 
          trailers={youtubeTrailers} 
          selectedTrailerId={selectedTrailer} 
          onSelectTrailer={setSelectedTrailer} 
        />
      </div>
    </div>
  );
} 