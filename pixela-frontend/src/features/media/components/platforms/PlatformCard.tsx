"use client";

import { WatchProvider } from '../../types';
import { openPlatform } from './platformUtils';
import Image from 'next/image';

interface PlatformCardProps {
  provider: WatchProvider;
}

export function PlatformCard({ provider }: PlatformCardProps) {
  const handleClick = () => {
    openPlatform(provider);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-[#1A1A1A] p-3 rounded-xl flex items-center gap-3 hover:bg-[#252525] transition duration-300 shadow-lg shadow-black/10 cursor-pointer select-none"
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="relative w-8 h-8">
        <Image 
          src={provider.logo} 
          alt={provider.nombre}
          className="rounded-md"
          fill
          sizes="32px"
          style={{objectFit: 'contain'}}
        />
      </div>
      <span className="text-white font-medium">{provider.nombre}</span>
    </div>
  );
} 