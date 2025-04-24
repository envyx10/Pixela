"use client";

import { Media, Serie } from '../types/media';
import { useState } from 'react';
import { FaBookmark, FaPen, FaTimes } from 'react-icons/fa';

interface MediaPageProps {
  media: Media;
}

export const MediaPage = ({ media }: MediaPageProps) => {
  const isSerie = media.tipo === 'serie';
  const serie = media as Serie;
  
  // Filtrar solo trailers de YouTube válidos
  const youtubeTrailers = media.trailers
    .filter(trailer => 
      trailer.site?.toLowerCase() === 'youtube' && 
      trailer.key
    );
  
  const [selectedTrailer, setSelectedTrailer] = useState(youtubeTrailers[0]?.key || '');
  const [showPosterModal, setShowPosterModal] = useState(false);

  console.log('Actores:', media.actores);
  console.log('Creadores:', isSerie ? serie.creadores : 'No es serie');

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero Section */}
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
                onClick={() => setShowPosterModal(true)}
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
                  <span>2h 30min</span>
                )}
              </div>

              {/* Información de creadores para series */}
              {isSerie && serie.creadores && serie.creadores.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-gray-300 text-sm font-medium mb-2">
                    {serie.creadores.length > 1 ? 'Creadores' : 'Creador'}
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {serie.creadores.map((creador) => (
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
                    ))}
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

      {/* Poster Modal */}
      {showPosterModal && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowPosterModal(false)}
        >
          <div className="relative w-[80vw] h-[80vh] flex items-center justify-center">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-[#FF2D55] transition-colors duration-300"
              onClick={() => setShowPosterModal(false)}
            >
              <FaTimes className="w-8 h-8" />
            </button>
            <img 
              src={media.poster} 
              alt={media.titulo}
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl shadow-black/50"
            />
          </div>
        </div>
      )}

      {/* Content Sections */}
      <div className="relative z-10 -mt-20">
        <div className="container mx-auto px-4">
          {/* Proveedores de Streaming */}
          {media.proveedores && media.proveedores.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Disponible en</h2>
              <div className="flex flex-wrap gap-4">
                {media.proveedores.map((proveedor) => (
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
          )}

          {/* Reparto */}
          {media.actores && media.actores.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Reparto Principal</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {media.actores.slice(0, 6).map((actor) => (
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
          )}

          {/* Trailers */}
          {youtubeTrailers.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-5">Trailers y Videos</h2>
              <div className="max-w-[1000px]">
                <div className="flex gap-6">
                  {selectedTrailer && (
                    <div className="w-[calc(100%-280px)] aspect-video rounded-xl overflow-hidden bg-[#1A1A1A] shadow-2xl shadow-black/20">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${selectedTrailer}?autoplay=0&rel=0`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                  {youtubeTrailers.length > 1 && (
                    <div className="w-64">
                      <div className="grid grid-cols-2 gap-3">
                        {youtubeTrailers.map((trailer) => (
                          <button
                            key={trailer.key}
                            onClick={() => setSelectedTrailer(trailer.key)}
                            className={`group w-full rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 ${
                              selectedTrailer === trailer.key 
                                ? 'ring-2 ring-red-500 shadow-lg shadow-red-500/20' 
                                : 'hover:ring-2 hover:ring-white/50 shadow-lg shadow-black/10'
                            }`}
                          >
                            <div className="relative aspect-video">
                              <img
                                src={`https://img.youtube.com/vi/${trailer.key}/mqdefault.jpg`}
                                alt={trailer.nombre}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                </svg>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 