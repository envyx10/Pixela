import { Trailer } from '../types';
import { useState } from 'react';

interface TrailersSectionProps {
  trailers: Trailer[];
}

export const TrailersSection = ({ trailers }: TrailersSectionProps) => {
  // Filtrar solo trailers de YouTube válidos
  const youtubeTrailers = trailers.filter(trailer => 
    trailer.site?.toLowerCase() === 'youtube' && 
    trailer.key
  );

  const [selectedTrailer, setSelectedTrailer] = useState(youtubeTrailers[0]?.key || '');
  
  if (youtubeTrailers.length === 0) return null;
  
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-5">Trailers y Videos</h2>
      <div className="max-w-[1000px]">
        <div className="flex gap-6">
          {selectedTrailer && (
            <div className="w-[calc(100%-280px)] aspect-video rounded-xl overflow-hidden bg-[#1A1A1A] shadow-2xl shadow-black/20">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedTrailer}?autoplay=0&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          {youtubeTrailers.length > 1 && (
            <div className="w-64">
              <div className="grid grid-cols-2 gap-3">
                {youtubeTrailers.map((trailer) => (
                  <button
                    key={trailer.key}
                    onClick={() => setSelectedTrailer(trailer.key)}
                    className={`group w-full rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 ${
                      selectedTrailer === trailer.key 
                        ? 'ring-2 ring-red-500 shadow-lg shadow-red-500/20' 
                        : 'hover:ring-2 hover:ring-white/50 shadow-lg shadow-black/10'
                    }`}
                  >
                    <div className="relative aspect-video">
                      <img
                        src={`https://img.youtube.com/vi/${trailer.key}/mqdefault.jpg`}
                        alt={trailer.nombre}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 