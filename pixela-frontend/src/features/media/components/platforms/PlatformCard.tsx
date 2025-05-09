"use client";

import { WatchProvider } from '../../types';
import { openPlatform } from './platformUtils';
import Image from 'next/image';
import { formatImageUrl } from '@/api/peliculas/mapPelicula';

interface PlatformCardProps {
  provider: WatchProvider;
}

export function PlatformCard({ provider }: PlatformCardProps) {
  const handleClick = () => {
    console.log('[DEBUG] PlatformCard - Click en proveedor:', provider);
    openPlatform(provider);
  };

  // Verificar y formatear URL del logo
  const logoUrl = provider.logo?.startsWith('http') 
    ? provider.logo 
    : formatImageUrl(provider.logo);
  
  console.log('[DEBUG] PlatformCard - Logo URL final:', logoUrl);
  
  return (
    <div
      onClick={handleClick}
      className="bg-[#1A1A1A] p-3 rounded-xl flex items-center gap-3 hover:bg-[#252525] transition duration-300 shadow-lg shadow-black/10 cursor-pointer select-none"
      role="button"
      tabIndex={0}
    >
      <div className="relative w-8 h-8 flex-shrink-0 overflow-hidden rounded-md">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={provider.nombre || 'Plataforma'}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-xs text-gray-400">
            {(provider.nombre || '?').substring(0, 2)}
          </div>
        )}
      </div>
      <span className="text-white font-medium truncate">
        {provider.nombre || provider.id || 'Plataforma'}
      </span>
    </div>
  );
} 