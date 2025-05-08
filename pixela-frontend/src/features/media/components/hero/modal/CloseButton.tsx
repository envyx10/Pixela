"use client";

import { FaTimes } from 'react-icons/fa';

interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton = ({ onClick }: CloseButtonProps) => (
  <button 
    className="absolute -top-12 right-0 text-white hover:text-[#FF2D55] transition-colors duration-300"
    onClick={onClick}
  >
    <FaTimes className="w-8 h-8" />
  </button>
); 