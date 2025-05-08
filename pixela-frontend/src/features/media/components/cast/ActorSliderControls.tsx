"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { memo } from 'react';

interface ActorSliderControlsProps {
  onPrevClick: () => void;
  onNextClick: () => void;
}

export const ActorSliderControls = memo(function ActorSliderControls({ 
  onPrevClick, 
  onNextClick 
}: ActorSliderControlsProps) {
  return (
    <div className="flex space-x-2">
      <button 
        onClick={onPrevClick}
        aria-label="Anterior"
        className="w-7 h-7 rounded-full flex items-center justify-center bg-pixela-dark/30 text-gray-400 border border-gray-700/30 hover:bg-pixela-dark/50 hover:text-white transition-colors"
      >
        <FiChevronLeft className="h-4 w-4" />
      </button>
      <button 
        onClick={onNextClick}
        aria-label="Siguiente"
        className="w-7 h-7 rounded-full flex items-center justify-center bg-pixela-dark/30 text-gray-400 border border-gray-700/30 hover:bg-pixela-dark/50 hover:text-white transition-colors"
      >
        <FiChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
});

ActorSliderControls.displayName = 'ActorSliderControls'; 