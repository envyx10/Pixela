import { Pelicula } from '@/features/media/types/media';

// URL base para imágenes de TMDb
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

/**
 * Formatea la URL de la imagen
 * @param path
 * @returns 
 */
export const formatImageUrl = (path: string): string =>
  path?.startsWith('/') ? `${TMDB_IMAGE_BASE_URL}${path}` : path || '';

/**
 * Mapea un actor
 * @param actor
 * @returns 
 */
const mapActor = (actor: any) => ({
  id: actor.id.toString(),
  nombre: actor.nombre || actor.name,
  foto: formatImageUrl(actor.foto || actor.profile_path),
  personaje: actor.personaje || actor.character || '',
});

/**
 * Mapea un trailer
 * @param trailer
 * @returns 
 */
const mapTrailer = (trailer: any) => ({
  id: trailer.id.toString(),
  nombre: trailer.nombre || trailer.name,
  key: trailer.key,
  site: trailer.site || 'YouTube',
  tipo: trailer.tipo || trailer.type,
});

/**
 * Mapea los datos de la API a un objeto Pelicula
 * @param movieData 
 * @returns 
 */
export function mapPeliculaFromApi(movieData: any): Pelicula {
  if (!movieData || !movieData.id) {
    console.error('[ERROR] mapPeliculaFromApi - Datos de API incompletos:', movieData);
    throw new Error('Los datos recibidos de la API están incompletos o en un formato inesperado');
  }

  return {
    id: movieData.id.toString(),
    titulo: movieData.nombre || movieData.titulo || movieData.title,
    sinopsis: movieData.descripcion || movieData.sinopsis || movieData.overview,
    fecha: movieData.fecha_estreno || movieData.fecha || movieData.release_date,
    generos: movieData.generos 
      ? (Array.isArray(movieData.generos) 
          ? movieData.generos.map((g: any) => typeof g === 'string' ? g : g.nombre || g.name) 
          : [movieData.generos])
      : [],
    poster: formatImageUrl(movieData.poster_path || movieData.poster),
    backdrop: formatImageUrl(movieData.backdrop_path || movieData.backdrop),
    puntuacion: parseFloat(movieData.vote_average || movieData.puntuacion) || 0,
    tipo: 'pelicula',
    duracion: parseInt(movieData.duracion || movieData.runtime) || 0,
    actores: movieData.actores?.map(mapActor) || [],
    trailers: movieData.trailers?.map(mapTrailer) || [],
    creador: movieData.creador ? {
      id: movieData.creador.id.toString(),
      nombre: movieData.creador.nombre || movieData.creador.name,
      foto: formatImageUrl(movieData.creador.foto || movieData.creador.profile_path)
    } : undefined
  };
} 