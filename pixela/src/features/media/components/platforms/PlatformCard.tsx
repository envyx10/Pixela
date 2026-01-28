"use client";

import Image from 'next/image';
import { openPlatform } from './platformUtils';
import { formatImageUrl } from '@/api/peliculas/mapper/mapPelicula';
import { PlatformCardProps } from '@/features/media/types/platforms';

/**
 * Componente que muestra una tarjeta de plataforma de streaming
 * @param {PlatformCardProps} props - Propiedades del componente
 * @param {WatchProvider} props.provider - Proveedor de streaming
 * @returns {JSX.Element} Componente de tarjeta de plataforma de streaming
 */
export function PlatformCard({ provider }: PlatformCardProps) {
  const handleClick = () => {
    openPlatform(provider);
  };

  // Verificar y formatear URL del logo
  const logoUrl = provider.logo?.startsWith('http') 
    ? provider.logo 
    : formatImageUrl(provider.logo);
  
  return (
    <div
      onClick={handleClick}
      className="bg-[#1A1A1A] p-3 rounded-xl flex items-center gap-3 hover:bg-[#252525] transition duration-300 shadow-lg shadow-black/10 cursor-pointer select-none"
      role="button"
      tabIndex={0}
    >
      <div className="relative flex-shrink-0 w-8 h-8 overflow-hidden rounded-md">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={provider.nombre || 'Plataforma'}
            className="object-contain w-full h-full"
            width={32}
            height={32}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-xs text-gray-400 bg-gray-800">
            {(provider.nombre || '?').substring(0, 2)}
          </div>
        )}
      </div>
      <span className="font-medium text-white truncate">
        {provider.nombre || provider.id || 'Plataforma'}
      </span>
    </div>
  );
} 