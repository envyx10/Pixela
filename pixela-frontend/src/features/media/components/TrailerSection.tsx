"use client";

import { Trailer } from '../types/media';
import { useState } from 'react';

interface TrailerSectionProps {
  trailers: Trailer[];
}

export const TrailerSection = ({ trailers }: TrailerSectionProps) => {
  const [activeTrailer, setActiveTrailer] = useState<Trailer | null>(
    trailers.length > 0 ? trailers[0] : null
  );

  if (!trailers.length) {
    return null;
  }

  // Filtrar solo trailers de YouTube para simplificar
  const youtubeTrailers = trailers.filter(trailer => trailer.site.toLowerCase() === 'youtube');

  if (!youtubeTrailers.length) {
    return null;
  }

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Trailers y videos</h2>

      {/* Reproductor principal */}
      <div className="mb-6">
        {activeTrailer && (
          <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${activeTrailer.key}?autoplay=0&rel=0`}
              title={activeTrailer.nombre}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        )}
      </div>

      {/* Lista de trailers */}
      {youtubeTrailers.length > 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {youtubeTrailers.map(trailer => (
            <div 
              key={trailer.id}
              className={`cursor-pointer group transition-all duration-200 ${
                activeTrailer?.id === trailer.id 
                  ? 'ring-2 ring-blue-500 dark:ring-blue-400 scale-[1.02]' 
                  : 'hover:scale-[1.02]'
              }`}
              onClick={() => setActiveTrailer(trailer)}
            >
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-md bg-gray-200 dark:bg-gray-800">
                <img
                  src={`https://img.youtube.com/vi/${trailer.key}/mqdefault.jpg`}
                  alt={trailer.nombre}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {trailer.nombre}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {trailer.tipo}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 