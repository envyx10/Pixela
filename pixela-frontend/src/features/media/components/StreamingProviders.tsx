import { WatchProvider } from '../types';

interface StreamingProvidersProps {
  providers: WatchProvider[];
}

export const StreamingProviders = ({ providers }: StreamingProvidersProps) => {
  if (!providers || providers.length === 0) return null;
  
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Disponible en</h2>
      <div className="flex flex-wrap gap-4">
        {providers.map((proveedor) => (
          <div 
            key={proveedor.id}
            className="bg-[#1A1A1A] p-3 rounded-xl flex items-center gap-3 hover:bg-[#252525] transition duration-300 shadow-lg shadow-black/10"
          >
            <img 
              src={proveedor.logo} 
              alt={proveedor.nombre}
              className="w-8 h-8 rounded-md"
            />
            <span className="text-white font-medium">{proveedor.nombre}</span>
          </div>
        ))}
      </div>
    </div>
  );
}; 