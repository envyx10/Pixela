import { Actor } from '../../types';
import Image from 'next/image';
import { memo } from 'react';
import clsx from 'clsx';

interface ActorCardProps {
  actor: Actor;
  className?: string;
}

export const ActorCard = memo(function ActorCard({ actor, className = '' }: ActorCardProps) {
  return (
    <div 
      className={clsx(
        "bg-[#1A1A1A] rounded-xl overflow-hidden group hover:bg-[#252525] transition duration-300 shadow-lg shadow-black/10",
        className
      )}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image 
          src={actor.foto} 
          alt={actor.nombre}
          fill
          sizes="(max-width: 640px) 140px, (max-width: 768px) 160px, 180px"
          className="object-cover"
          priority={false}
        />
      </div>
      <div className="p-3">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Nombre:</span>
          <h3 className="text-white font-medium text-sm truncate">{actor.nombre}</h3>
        </div>
        {actor.personaje && (
          <div className="flex flex-col mt-1">
            <span className="text-xs text-gray-500">Personaje:</span>
            <p className="text-gray-300 text-xs font-medium truncate">{actor.personaje}</p>
          </div>
        )}
      </div>
    </div>
  );
});

ActorCard.displayName = 'ActorCard'; 