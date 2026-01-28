import { useEffect } from "react";
import { useHeroStore } from "@/features/hero/store/heroStore";

/**
 * Hook personalizado para manejar la lógica de la barra de progreso
 * Actualiza el progreso cada 25ms cuando el carrusel está reproduciéndose
 */
export const useProgressBar = () => {
  const { isPlaying, currentImageIndex, setProgress, resetProgress } = useHeroStore();

  useEffect(() => {
    if (isPlaying) {
      resetProgress();
      
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 0.5, 100));
      }, 25);
      
      return () => clearInterval(progressInterval);
    }
  }, [isPlaying, currentImageIndex, setProgress, resetProgress]);
}; 