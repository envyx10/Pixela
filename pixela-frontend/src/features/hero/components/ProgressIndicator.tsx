import clsx from 'clsx';
import { useHeroStore } from "../store";
import { FiPlay, FiPause } from "react-icons/fi";

const styles = {
  progress: {
    container: "absolute bottom-28 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-xl",
    content: "flex flex-col items-center gap-4",
    controls: "flex items-center justify-between w-full",
    counter: "text-pixela-light/70 text-sm font-medium"
  },
  bar: {
    container: "w-full h-1 bg-pixela-light/20 rounded-full overflow-hidden",
    fill: "h-full bg-pixela-accent"
  },
  dot: {
    base: "h-2 rounded-full transition-all duration-300",
    active: "bg-pixela-accent w-6",
    inactive: "bg-pixela-light/50 w-2 hover:bg-pixela-light/70"
  },
  playback: {
    button: "p-2 rounded-full bg-pixela-dark/40 backdrop-blur-sm text-pixela-light hover:text-pixela-accent hover:bg-pixela-dark/60 transition-all duration-300",
    icon: "h-4 w-4"
  }
} as const;

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
      styles.dot.base,
      isActive ? styles.dot.active : styles.dot.inactive
    )}
    aria-label={`Ir a imagen ${index + 1}`}
  />
);

/**
 * Componente que muestra la barra de progreso del carrusel
 */
const ProgressBar = ({ progress }: { progress: number }) => (
  <div className={styles.bar.container}>
    <div 
      className={styles.bar.fill}
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
    className={styles.playback.button}
    aria-label={isPlaying ? "Pausar" : "Reproducir"}
  >
    {isPlaying ? 
      <FiPause className={styles.playback.icon} /> : 
      <FiPlay className={styles.playback.icon} />
    }
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
    <div className={styles.progress.container}>
      <div className={styles.progress.content}>
        <ProgressBar progress={progress} />
        
        <div className={styles.progress.controls}>
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
          
          <div className={styles.progress.counter}>
            {currentImageIndex + 1}/{images.length}
          </div>
        </div>
      </div>
    </div>
  );
}; 