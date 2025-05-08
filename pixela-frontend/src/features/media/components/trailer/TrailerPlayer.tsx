import React from 'react';

interface TrailerPlayerProps {
  trailerId: string;
}

export function TrailerPlayer({ trailerId }: TrailerPlayerProps) {
  if (!trailerId) return null;
  
  return (
    <div className="lg:w-2/3 w-full aspect-video rounded-xl overflow-hidden bg-[#1A1A1A] shadow-xl">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${trailerId}?autoplay=0&rel=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
} 