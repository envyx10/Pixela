"use client";

import { Trailer } from '../../types';
import { TrailerListItem } from './TrailerListItem';

interface TrailerListProps {
  trailers: Trailer[];
  selectedTrailerId: string;
  onSelectTrailer: (key: string) => void;
}

export function TrailerList({
  trailers,
  selectedTrailerId,
  onSelectTrailer
}: TrailerListProps) {
  if (trailers.length <= 1) return null;
  
  // Siempre mostrar solo los primeros 5 trailers
  const displayTrailers = trailers.slice(0, Math.min(6, trailers.length));
  
  return (
    <div className="lg:w-1/3 w-full">
      <div className="flex flex-col space-y-4 pr-3 overflow-visible">
        {displayTrailers.map((trailer, index) => (
          <TrailerListItem
            key={trailer.key}
            trailer={trailer}
            index={index}
            isSelected={selectedTrailerId === trailer.key}
            onSelect={() => onSelectTrailer(trailer.key)}
          />
        ))}
      </div>
    </div>
  );
} 