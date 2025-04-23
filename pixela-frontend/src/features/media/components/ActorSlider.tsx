"use client";

import { Actor } from '../types/media';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface ActorSliderProps {
  actores: Actor[];
}

export const ActorSlider = ({ actores }: ActorSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      setScrollPos(sliderRef.current.scrollLeft - 300);
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      setScrollPos(sliderRef.current.scrollLeft + 300);
    }
  };

  if (!actores.length) {
    return null;
  }

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Reparto principal</h2>
      
      {/* Botones de navegación */}
      <div className="absolute right-0 top-1 space-x-2 z-10">
        <button
          onClick={scrollLeft}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          aria-label="Desplazar izquierda"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={scrollRight}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          aria-label="Desplazar derecha"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Contenedor del slider */}
      <div 
        ref={sliderRef}
        className="flex overflow-x-auto pb-6 -mx-4 px-4 space-x-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {actores.map((actor) => (
          <div key={actor.id} className="flex-shrink-0 w-36">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative aspect-[2/3] w-full">
                {actor.foto ? (
                  <Image
                    src={actor.foto}
                    alt={actor.nombre}
                    fill
                    sizes="(max-width: 768px) 144px, 144px"
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="font-medium text-sm truncate text-gray-900 dark:text-white">{actor.nombre}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{actor.personaje}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Estilo para ocultar la scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}; 