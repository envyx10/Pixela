'use client';
import './trending.css';
import { useState } from 'react';
import { useTrendingStore } from '@/features/trending/store';
import { TrendingMediaCarousel } from '@/features/trending/components/TrendingMediaCarousel';
import { TrendingButton } from './TrendingButton';

type MediaType = 'series' | 'movies';

export const TrendingHeader = () => {

  const series = useTrendingStore(state => state.series);
  const movies = useTrendingStore(state => state.movies);
  
  // Estado para controlar qué botón está activo
  const [activeButton, setActiveButton] = useState<MediaType>('series');
  
  // Obtener el contenido activo según el botón seleccionado
  const activeContent = activeButton === 'series' ? series : movies;
  
  const renderLoadingState = () => (
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

  const renderContent = () => (
    <div id="tendencias" className="relative w-full min-h-screen bg-pixela-dark flex flex-col">
      <div className="flex-grow flex flex-col justify-center relative z-10">
        <div className="w-[80%] mx-auto mb-4 flex items-end justify-between">
          <h2 className="text-[128px] font-[900] text-pixela-accent font-outfit tracking-wider uppercase leading-none">Tendencias</h2>
          
          <div className="mb-10">
            <div className="flex bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10 relative">
              <TrendingButton 
                isActive={activeButton === 'series'}
                onClick={() => setActiveButton('series')}
              >
                Series
              </TrendingButton>
              
              <TrendingButton 
                isActive={activeButton === 'movies'}
                onClick={() => setActiveButton('movies')}
              >
                Películas
              </TrendingButton>
            </div>
          </div>
        </div>
        
        <TrendingMediaCarousel 
          content={activeContent} 
          type={activeButton} 
        />
        
      </div>
    </div>
  );
  
  // Solo mostrar el estado de carga si no hay contenido disponible para el tipo activo
  if (!activeContent || activeContent.length === 0) {
    return renderLoadingState();
  }
  
  return renderContent();
}; 