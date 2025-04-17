'use client';
import './trending.css';
import { useState } from 'react';
import { useTrendingStore } from '@/features/trending/store';
import { TrendingMediaCarousel } from './TrendingMediaCarousel';

export const TrendingHeader = () => {
  const series = useTrendingStore(state => state.series);
  
  // Estado para controlar qué botón está activo
  const [activeButton, setActiveButton] = useState('series');
  
  if (!series || series.length === 0) {
    return (
      <div className="relative w-full h-screen bg-pixela-dark flex flex-col justify-center">
        <div className="w-[80%] mx-auto mb-4">
          <h2 className="text-[128px] font-[900] text-pixela-accent font-outfit tracking-wider uppercase leading-none mb-8">Tendencias</h2>
        </div>
        <div className="flex justify-center">
          <div className="w-[375px] h-[528px] bg-gray-800 flex items-center justify-center">
            <p className="text-pixela-light">Cargando...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative w-full h-screen bg-pixela-dark flex flex-col">
      {/* Contenedor principal que usa flexbox para empujar el contenido hacia la parte inferior */}
      <div className="flex-grow flex flex-col justify-end relative z-10">
        {/* Título TENDENCIAS y botones de filtro */}
        <div className="w-[80%] mx-auto mb-4 flex items-end justify-between">
          <h2 className="text-[128px] font-[900] text-pixela-accent font-outfit tracking-wider uppercase leading-none">Tendencias</h2>
          
          {/* Botones para Series y Películas usando solo Tailwind */}
          <div className="mb-10">
            <div className="flex bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10 relative">
              {/* Botón de Series */}
              <button 
                className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                  activeButton === 'series' 
                    ? 'text-pixela-dark bg-pixela-accent shadow-lg shadow-pixela-accent/20' 
                    : 'text-white/80 hover:text-white'
                }`}
                onClick={() => setActiveButton('series')}
                aria-pressed={activeButton === 'series'}
              >
                Series
              </button>
              
              {/* Botón de Películas */}
              <button 
                className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                  activeButton === 'movies' 
                    ? 'text-pixela-dark bg-pixela-accent shadow-lg shadow-pixela-accent/20' 
                    : 'text-white/80 hover:text-white'
                }`}
                onClick={() => setActiveButton('movies')}
                aria-pressed={activeButton === 'movies'}
              >
                Películas
              </button>
            </div>
          </div>
        </div>
        
        {/* Carrusel de series */}
        <TrendingMediaCarousel series={series} />
      </div>
    </div>
  );
}; 