import clsx from 'clsx';
import { useHeroStore } from "../store";
import { FiPlay, FiPause } from "react-icons/fi";

/**
 * Props para el componente ProgressIndicator
 * @property {string[]} images - Array de URLs de imágenes para el carrusel
 */
interface ProgressIndicatorProps {
  images: string[];
}

/**
 * Componente que muestra un punto de control para una imagen específica
 */
const SlideDot = ({ 
  index, 
  isActive, 
  onClick 
}: { 
  index: number; 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={clsx(
      "h-2 rounded-full transition-all duration-300",
      isActive ? "bg-pixela-accent w-6" : "bg-pixela-light/50 w-2 hover:bg-pixela-light/70"
    )}
    aria-label={`Ir a imagen ${index + 1}`}
  />
);

/**
 * Componente que muestra la barra de progreso del carrusel
 */
const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full h-1 bg-pixela-light/20 rounded-full overflow-hidden">
    <div 
      className="h-full bg-pixela-accent" 
      style={{ width: `${progress}%` }}
    />
  </div>
);

/**
 * Componente que muestra los controles de reproducción del carrusel
 */
const PlaybackControl = ({ 
  isPlaying, 
  onToggle 
}: { 
  isPlaying: boolean; 
  onToggle: () => void;
}) => (
  <button 
    onClick={onToggle} 
    className="p-2 rounded-full bg-pixela-dark/40 backdrop-blur-sm text-pixela-light hover:text-pixela-accent hover:bg-pixela-dark/60 transition-all duration-300"
    aria-label={isPlaying ? "Pausar" : "Reproducir"}
  >
    {isPlaying ? <FiPause className="h-4 w-4" /> : <FiPlay className="h-4 w-4" />}
  </button>
);

/**
 * Componente que muestra el indicador de progreso y controles del carrusel
 * Incluye barra de progreso, controles de reproducción y navegación por puntos
 */
export const ProgressIndicator = ({ images }: ProgressIndicatorProps) => {
  const { 
    setIsPlaying, 
    handleSlideChange, 
    currentImageIndex, 
    isPlaying, 
    progress 
  } = useHeroStore();

  return (
    <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-xl">
      <div className="flex flex-col items-center gap-4">
        <ProgressBar progress={progress} />
        
        <div className="flex items-center justify-between w-full">
          <PlaybackControl 
            isPlaying={isPlaying} 
            onToggle={() => setIsPlaying(!isPlaying)} 
          />
          
          <div className="flex space-x-2">
            {images.map((_, index) => (
              <SlideDot
                key={index}
                index={index}
                isActive={index === currentImageIndex}
                onClick={() => handleSlideChange(index)}
              />
            ))}
          </div>
          
          <div className="text-pixela-light/70 text-sm font-medium">
            {currentImageIndex + 1}/{images.length}
          </div>
        </div>
      </div>
    </div>
  );
}; 