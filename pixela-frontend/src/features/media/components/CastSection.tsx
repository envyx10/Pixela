import { Actor } from '../types';

interface CastSectionProps {
  actors: Actor[];
}

export const CastSection = ({ actors }: CastSectionProps) => {
  if (!actors || actors.length === 0) return null;
  
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Reparto Principal</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {actors.slice(0, 6).map((actor) => (
          <div 
            key={actor.id}
            className="bg-[#1A1A1A] rounded-xl overflow-hidden group hover:bg-[#252525] transition duration-300 shadow-lg shadow-black/10"
          >
            <div className="relative aspect-[2/3]">
              <img 
                src={actor.foto} 
                alt={actor.nombre}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="text-white font-medium text-sm">{actor.nombre}</h3>
              <p className="text-gray-400 text-xs">{actor.personaje}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 