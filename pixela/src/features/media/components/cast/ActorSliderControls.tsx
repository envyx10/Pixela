"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { memo } from 'react';
import { ActorSliderControlsProps } from '@/features/media/types/cast';

/**
 * Componente que muestra los controles de navegación para el carrusel de actores
 * @param {ActorSliderControlsProps} props - Propiedades del componente
 * @param {() => void} props.onPrevClick - Función para navegar al actor anterior
 * @param {() => void} props.onNextClick - Función para navegar al actor siguiente
 * @returns {JSX.Element} Componente de controles de navegación
 */
export const ActorSliderControls = memo(function ActorSliderControls({ 
  onPrevClick, 
  onNextClick 
}: ActorSliderControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onPrevClick}
        className="p-2 transition-colors rounded-full bg-pixela-dark/80 hover:bg-pixela-dark"
        aria-label="Anterior"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={onNextClick}
        className="p-2 transition-colors rounded-full bg-pixela-dark/80 hover:bg-pixela-dark"
        aria-label="Siguiente"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
});

ActorSliderControls.displayName = 'ActorSliderControls'; 