import clsx from 'clsx';
import { useHeroStore } from "../store";
import { FiPlay, FiPause } from "react-icons/fi";

interface ProgressIndicatorProps {
  images: string[];
}

export const ProgressIndicator = ({ images }: ProgressIndicatorProps) => {
  const { 
    setIsPlaying, 
    handleSlideChange, 
    currentImageIndex, 
    isPlaying, 
    progress,
    imagesLength 
  } = useHeroStore();

  return (
    <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-xl">
      <div className="flex flex-col items-center gap-4">
        {/* Barra de progreso */}
        <div className="w-full h-1 bg-pixela-light/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-pixela-accent" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between w-full">
          {/* Control de reproducción */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="p-2 rounded-full bg-pixela-dark/40 backdrop-blur-sm text-pixela-light hover:text-pixela-accent hover:bg-pixela-dark/60 transition-all duration-300"
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying ? <FiPause className="h-4 w-4" /> : <FiPlay className="h-4 w-4" />}
          </button>
          
          {/* Indicador de slides (pequeños puntos) */}
          <div className="flex space-x-2">
            {/* Generar indicadores basados en la longitud de imágenes */}
            {Array.from({ length: imagesLength }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={clsx(
                  "h-2 rounded-full transition-all duration-300",
                  index === currentImageIndex ? "bg-pixela-accent w-6" : "bg-pixela-light/50 w-2 hover:bg-pixela-light/70"
                )}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Contador de imágenes */}
          <div className="text-pixela-light/70 text-sm font-medium">
            {currentImageIndex + 1}/{imagesLength}
          </div>
        </div>
      </div>
    </div>
  );
}; 