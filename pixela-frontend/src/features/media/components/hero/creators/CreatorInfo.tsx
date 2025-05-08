"use client";

import { Media, Serie } from '../../../types';
import { CreatorAvatar } from './CreatorAvatar';

interface CreatorInfoProps {
  media: Media;
}

export const CreatorInfo = ({ media }: CreatorInfoProps) => {
  const isSerie = media.tipo === 'serie';
  const serie = media as Serie;
  
  // Si no hay creadores, no renderizamos nada
  if (!(isSerie ? (serie.creadores?.length ?? 0) > 0 : media.creador)) {
    return null;
  }
  
  return (
    <div className="mb-4">
      <h3 className="text-gray-300 text-sm font-medium mb-2">
        {isSerie 
          ? ((serie.creadores?.length ?? 0) > 1 ? 'Creadores' : 'Creador')
          : 'Director'
        }
      </h3>
      <div className="flex flex-wrap gap-4">
        {isSerie ? (
          (serie.creadores ?? []).map((creador) => (
            <CreatorAvatar 
              key={creador.id} 
              photo={creador.foto} 
              name={creador.nombre} 
            />
          ))
        ) : (
          media.creador && (
            <CreatorAvatar 
              photo={media.creador.foto} 
              name={media.creador.nombre} 
            />
          )
        )}
      </div>
    </div>
  );
}; 