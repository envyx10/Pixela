"use client";

import { FaPlay } from "react-icons/fa";
import { Trailer } from '../../types';

interface TrailerListItemProps {
  trailer: Trailer;
  isSelected: boolean;
  onSelect: () => void;
  index?: number;
}

export function TrailerListItem({ 
  trailer, 
  isSelected, 
  onSelect,
  index 
}: TrailerListItemProps) {
  return (
    <button
      onClick={onSelect}
      className={`flex items-stretch rounded-lg overflow-hidden transition-all duration-200 ${
        isSelected 
          ? 'bg-gradient-to-r from-gray-900 to-[#252525] border border-gray-700 shadow-lg' 
          : 'bg-[#1A1A1A] border border-transparent'
      }`}
    >
      {/* Miniatura */}
      <div className="relative w-24 h-16 flex-shrink-0">
        <img
          src={`https://img.youtube.com/vi/${trailer.key}/default.jpg`}
          alt={trailer.nombre || 'Video thumbnail'}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isSelected ? 'brightness-110 contrast-110' : 'brightness-90'
          }`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`rounded-full p-1.5 transition-all duration-200 ${
            isSelected
              ? 'bg-white/20 backdrop-blur-sm scale-110'
              : 'bg-black/40'
          }`}>
            <FaPlay className={`w-2 h-2 ${
              isSelected ? 'text-white' : 'text-gray-300'
            }`} />
          </div>
        </div>
      </div>
      
      {/* Información del trailer */}
      <div className="p-2 pl-3 text-left flex flex-col justify-center flex-grow min-w-0">
        <p className={`text-sm truncate transition-colors duration-200 ${
          isSelected ? 'text-white font-medium' : 'text-gray-300'
        }`}>
          {trailer.nombre || `Trailer ${index !== undefined ? index + 1 : ''}`}
        </p>
      </div>
    </button>
  );
} 