import { Media, Serie } from '../types';
import { FaBookmark, FaPen } from 'react-icons/fa';

interface HeroSectionProps {
  media: Media;
  onPosterClick: () => void;
}

export const HeroSection = ({ media, onPosterClick }: HeroSectionProps) => {
  const isSerie = media.tipo === 'serie';
  const serie = media as Serie;

  return (
    <div className="relative h-[80vh] w-full">
      {/* Backdrop Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${media.backdrop})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/90 to-[#0F0F0F]/40" />
      </div>
      
      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-end pb-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-64 flex-shrink-0">
            <div 
              className="relative group cursor-pointer"
              onClick={onPosterClick}
            >
              <img 
                src={media.poster} 
                alt={media.titulo}
                className="w-full h-auto rounded-lg shadow-2xl shadow-black/50 transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-medium">Ampliar</span>
              </div>
            </div>
          </div>
          
          {/* Info */}
          <div className="flex-grow">
            <div className="flex flex-col gap-4 mb-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                {media.titulo}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-[#FF2D55]/10 px-3 py-1 rounded-full">
                  <span className="text-[#FF2D55] text-xl font-bold">{media.puntuacion.toFixed(1)}</span>
                  <span className="text-[#FF2D55] ml-1">★</span>
                </div>
                {media.puntuacion >= 8.5 && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-[#FF2D55] rounded-full blur-sm opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative bg-[#FF2D55]/10 backdrop-blur-sm px-3 py-1 rounded-full border border-[#FF2D55]/20">
                      <span className="text-[#FF2D55] text-sm font-light tracking-wider">TOP PIXELA</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Géneros como chips más vistosos */}
            <div className="flex flex-wrap gap-2 mb-4">
              {media.generos.map((genero, index) => (
                <span 
                  key={index}
                  className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium hover:bg-red-600/30 transition duration-300 shadow-sm shadow-red-950/30"
                >
                  {genero}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-gray-400 mb-4 text-sm">
              <span>{new Date(media.fecha).getFullYear()}</span>
              <span>•</span>
              {isSerie ? (
                <>
                  <span>{(media as Serie).temporadas} Temporadas</span>
                  <span>•</span>
                  <span>{(media as Serie).episodios} Episodios</span>
                </>
              ) : (
                <>
                  <span>{media.duracion} minutos</span>
                  <span>•</span>
                  <span>Película</span>
                </>
              )}
            </div>

            {/* Información de creadores para series y películas */}
            {(isSerie ? (serie.creadores?.length ?? 0) > 0 : media.creador) && (
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
                      <div key={creador.id} className="flex items-center gap-2">
                        {creador.foto && (
                          <img 
                            src={creador.foto} 
                            alt={creador.nombre}
                            className="w-10 h-10 rounded-full object-cover border-2 border-red-600/30"
                          />
                        )}
                        <span className="text-white font-medium">{creador.nombre}</span>
                      </div>
                    ))
                  ) : (
                    media.creador && (
                      <div className="flex items-center gap-2">
                        {media.creador.foto && (
                          <img 
                            src={media.creador.foto} 
                            alt={media.creador.nombre}
                            className="w-10 h-10 rounded-full object-cover border-2 border-red-600/30"
                          />
                        )}
                        <span className="text-white font-medium">{media.creador.nombre}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            <p className="text-gray-300 text-lg max-w-3xl leading-relaxed mb-8">
              {media.sinopsis}
            </p>

            <div className="flex gap-4">
              <button className="bg-[#FF2D55] hover:bg-[#FF2D55]/90 text-white p-3 rounded-lg font-medium transition duration-300 flex items-center gap-2 shadow-lg shadow-[#FF2D55]/20">
                <FaBookmark className="w-5 h-5" />
              </button>
              <button className="bg-[#1A1A1A] hover:bg-[#252525] text-white px-8 py-3 rounded-lg font-medium transition duration-300 flex items-center gap-2 border border-white/10">
                <FaPen className="w-5 h-5" />
                Hacer Reseña
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 