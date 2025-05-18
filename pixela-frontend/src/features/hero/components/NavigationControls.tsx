import { useHeroStore } from "../store";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

/**
 * Props para el componente NavigationControls
 * @property {number} imagesLength - Número total de imágenes en el carrusel
 */
interface NavigationControlsProps {
  imagesLength: number;
}

/**
 * Props para el componente NavigationButton
 */
interface NavigationButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
}

/**
 * Componente que representa un botón de navegación del carrusel
 */
const NavigationButton = ({ direction, onClick }: NavigationButtonProps) => {
  const Icon = direction === 'prev' ? FiChevronLeft : FiChevronRight;
  const position = direction === 'prev' ? 'left-4' : 'right-4';
  const label = direction === 'prev' ? 'Imagen anterior' : 'Imagen siguiente';

  return (
    <div className={`absolute top-1/2 ${position} transform -translate-y-1/2 z-20`}>
      <button 
        onClick={onClick}
        className="p-2 rounded-full bg-pixela-dark/40 backdrop-blur-sm text-pixela-light hover:text-pixela-accent hover:bg-pixela-dark/60 transition-all duration-300"
        aria-label={label}
      >
        <Icon className="h-8 w-8" />
      </button>
    </div>
  );
};

/**
 * Componente que muestra los controles de navegación del carrusel
 * Permite navegar entre las imágenes usando botones de anterior/siguiente
 */
export const NavigationControls = ({ imagesLength }: NavigationControlsProps) => {
  const { prevImage, nextImage } = useHeroStore();

  return (
    <>
      <NavigationButton 
        direction="prev" 
        onClick={() => prevImage(imagesLength)} 
      />
      <NavigationButton 
        direction="next" 
        onClick={() => nextImage(imagesLength)} 
      />
    </>
  );
}; 