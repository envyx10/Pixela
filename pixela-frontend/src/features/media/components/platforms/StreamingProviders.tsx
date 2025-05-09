"use client";

import { WatchProvider } from '../../types';
import { PlatformCard } from './PlatformCard';

interface StreamingProvidersProps {
  providers: WatchProvider[];
}

export function StreamingProviders({ providers }: StreamingProvidersProps) {
  // Verificación y registro para depuración
  console.log('[DEBUG] StreamingProviders - Proveedores recibidos:', providers);
  
  if (!providers || providers.length === 0) {
    console.log('[DEBUG] StreamingProviders - No hay proveedores disponibles');
    return null;
  }
  
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Disponible en</h2>
      <div className="flex flex-wrap gap-4">
        {providers.map((provider) => (
          <PlatformCard 
            key={provider.id || Math.random().toString()} 
            provider={provider} 
          />
        ))}
      </div>
    </section>
  );
} 