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
  
  return (
    <div className="lg:w-1/3 w-full">
      <div className="flex flex-col space-y-3 max-h-[360px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {trailers.map((trailer, index) => (
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