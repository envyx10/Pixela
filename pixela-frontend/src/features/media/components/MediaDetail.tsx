"use client";

import { Media, Serie, Pelicula } from '../types/media';
import { ActorSlider } from './ActorSlider';
import { TrailerSection } from './TrailerSection';
import Image from 'next/image';

interface MediaDetailProps {
  media: Media;
}

export const MediaDetail = ({ media }: MediaDetailProps) => {
  const isSerie = media.tipo === 'serie';
  const serieData = isSerie ? media as Serie : null;
  const peliculaData = !isSerie ? media as Pelicula : null;

  // Función para formatear la duración a horas y minutos
  const formatDuracion = (minutos: number) => {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    
    if (horas === 0) {
      return `${minutosRestantes} min`;
    }
    
    return `${horas}h ${minutosRestantes > 0 ? `${minutosRestantes}min` : ''}`;
  };

  return (
    <>
      {/* Hero Section - Imagen Destacada Dominante */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        {/* Imagen backdrop como hero */}
        <div className="absolute inset-0">
          {media.backdrop ? (
            <Image
              src={media.backdrop}
              alt={`Imagen de fondo de ${media.titulo}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : media.poster ? (
            <Image
              src={media.poster}
              alt={`Póster de ${media.titulo}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-900" />
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
        </div>

        {/* Contenido superpuesto en el hero */}
        <div className="relative container mx-auto h-full px-4 flex flex-col justify-end pb-12">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            {/* Póster en el hero */}
            <div className="hidden md:block w-48 lg:w-64 flex-shrink-0">
              <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-2xl border-2 border-white/10">
                {media.poster ? (
                  <Image
                    src={media.poster}
                    alt={`Póster oficial de ${media.titulo}`}
                    fill
                    sizes="(max-width: 768px) 0vw, (max-width: 1024px) 192px, 256px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500">Sin imagen</span>
                  </div>
                )}
              </div>
            </div>

            {/* Información básica en el hero */}
            <div className="flex-1">
              <div className="flex gap-2 mb-3">
                {media.generos.slice(0, 3).map((genero, index) => (
                  <span 
                    key={index}
                    className="inline-block px-2.5 py-1 text-xs font-medium rounded-md bg-white/20 text-white backdrop-blur-sm"
                  >
                    {genero}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-md">
                {media.titulo}
              </h1>
              <div className="flex items-center gap-4 text-white/90 mb-5">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                  </svg>
                  <span className="font-semibold">{media.puntuacion.toFixed(1)}</span>
                </div>
                <span className="text-sm">{media.fecha}</span>
                {isSerie && serieData && (
                  <span className="text-sm">{serieData.temporadas} temporada{serieData.temporadas !== 1 ? 's' : ''}</span>
                )}
                {!isSerie && peliculaData && (
                  <span className="text-sm">{formatDuracion(peliculaData.duracion)}</span>
                )}
              </div>
              <p className="text-white/80 line-clamp-3 md:line-clamp-4 lg:w-3/4">
                {media.sinopsis}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8 -mt-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden p-6 md:p-8">
          {/* Descripción completa */}
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Sinopsis</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {media.sinopsis}
            </p>
            
            {/* Géneros completos */}
            <div className="flex flex-wrap gap-2">
              {media.generos.map((genero, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                >
                  {genero}
                </span>
              ))}
            </div>
          </div>
          
          {/* Información específica y Detalles */}
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Primera columna: información general */}
            <div>
              {isSerie && serieData && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Detalles de la Serie</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{serieData.temporadas}</div>
                      <div className="text-sm text-blue-500 dark:text-blue-300">Temporadas</div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{serieData.episodios}</div>
                      <div className="text-sm text-blue-500 dark:text-blue-300">Episodios</div>
                    </div>
                  </div>
                </div>
              )}

              {!isSerie && peliculaData && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Detalles de la Película</h2>
                  <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {formatDuracion(peliculaData.duracion)}
                    </div>
                    <div className="text-sm text-green-500 dark:text-green-300">Duración total</div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Segunda columna: info adicional */}
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Calificación</h2>
                <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-4 flex items-center">
                  <div className="text-5xl font-bold text-yellow-500 mr-3">{media.puntuacion.toFixed(1)}</div>
                  <div className="flex flex-col">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.round(media.puntuacion / 2) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <div className="text-sm text-yellow-600 dark:text-yellow-300">Puntuación de usuarios</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Trailers */}
          {media.trailers && media.trailers.length > 0 && (
            <div className="max-w-5xl mx-auto my-12">
              <TrailerSection trailers={media.trailers} />
            </div>
          )}
          
          {/* Actores */}
          <div className="max-w-5xl mx-auto my-12">
            <ActorSlider actores={media.actores} />
          </div>
        </div>
      </div>
    </>
  );
}; 