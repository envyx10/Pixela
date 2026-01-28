"use client";

import TrailerListItem from './TrailerListItem';
import { TrailerListProps } from '@/features/media/types/trailer';

export function TrailerList({
  trailers,
  selectedTrailerId,
  onSelectTrailer
}: TrailerListProps) {
  if (trailers.length <= 1) return null;
  
  // Siempre mostrar solo los primeros 5 trailers
  const displayTrailers = trailers.slice(0, Math.min(6, trailers.length));
  
  return (
    <div className="w-full lg:w-1/3">
      <div className="flex flex-col pr-3 space-y-4 overflow-visible">
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