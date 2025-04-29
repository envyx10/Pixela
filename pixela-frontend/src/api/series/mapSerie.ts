import { Serie, WatchProvider } from '@/features/media/types/media';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

/**
 * Formatea la URL de la imagen
 * @param path
 * @returns 
 */
const formatImageUrl = (path: string): string =>
  path?.startsWith('/') ? `${TMDB_IMAGE_BASE_URL}${path}` : path || '';

/**
 * Mapea un actor
 * @param actor
 * @returns 
 */
const mapActor = (actor: any) => ({
  id: actor.id?.toString() || '',
  nombre: actor.nombre || actor.name || '',
  foto: formatImageUrl(actor.foto || actor.profile_path || ''),
  personaje: actor.personaje || actor.character || '',
});

/**
 * Mapea un trailer
 * @param trailer
 * @returns 
 */
const mapTrailer = (trailer: any) => ({
  id: trailer.id?.toString() || trailer.key || '',
  nombre: trailer.nombre || trailer.name || '',
  key: trailer.key || '',
  site: trailer.site || 'YouTube',
  tipo: trailer.tipo || trailer.type || '',
});

/**
 * Mapea un proveedor de streaming
 * @param provider
 * @returns 
 */
const mapProvider = (provider: any, tipo?: 'flatrate' | 'rent' | 'buy'): WatchProvider => ({
  id: provider.provider_id?.toString() || '',
  nombre: provider.provider_name || '',
  logo: formatImageUrl(provider.logo_path || ''),
  tipo: tipo
});

/**
 * Mapea un creador de serie
 * @param creator
 * @returns 
 */
const mapCreator = (creator: any) => ({
  id: creator.id?.toString() || '',
  nombre: creator.name || creator.nombre || '',
  foto: formatImageUrl(creator.profile_path || ''),
});

/**
 * Mapea los datos de la API a un objeto Serie
 * @param apiData 
 * @returns 
 */
export function mapSerieFromApi(apiData: any): Serie {
  // Procesar actores si existen
  let actores = [];
  if (apiData.actores && Array.isArray(apiData.actores)) {
    actores = apiData.actores.map(mapActor);
  } else if (apiData.credits?.cast && Array.isArray(apiData.credits.cast)) {
    actores = apiData.credits.cast.map(mapActor);
  } else if (apiData.cast && Array.isArray(apiData.cast)) {
    actores = apiData.cast.map(mapActor);
  }
  
  // Procesar trailers si existen
  let trailers = [];
  if (apiData.trailers && Array.isArray(apiData.trailers)) {
    trailers = apiData.trailers.map(mapTrailer);
  } else if (apiData.videos?.results && Array.isArray(apiData.videos.results)) {
    trailers = apiData.videos.results.map(mapTrailer);
  } else if (apiData.results && Array.isArray(apiData.results)) {
    trailers = apiData.results.map(mapTrailer);
  }

  // Procesar proveedores de streaming si existen
  let proveedores: WatchProvider[] = [];
  if (apiData.proveedores && Array.isArray(apiData.proveedores)) {
    proveedores = apiData.proveedores.map((p: any) => mapProvider(p));
  }

  // Procesar creadores si existen
  let creadores = [];
  if (apiData.creators && Array.isArray(apiData.creators)) {
    creadores = apiData.creators.map(mapCreator);
  } else if (apiData.created_by && Array.isArray(apiData.created_by)) {
    creadores = apiData.created_by.map(mapCreator);
  }

  return {
    id: apiData.id.toString(),
    titulo: apiData.nombre || apiData.titulo || apiData.name || apiData.title || '',
    sinopsis: apiData.descripcion || apiData.sinopsis || apiData.overview || '',
    fecha: apiData.fecha_estreno || apiData.fecha || apiData.first_air_date || '',
    generos: Array.isArray(apiData.generos)
      ? apiData.generos.map((g: any) => typeof g === 'string' ? g : g.nombre || g.name)
      : [apiData.generos],
    poster: formatImageUrl(apiData.poster_path || apiData.poster || ''),
    backdrop: formatImageUrl(apiData.backdrop_path || apiData.backdrop || ''),
    puntuacion: apiData.vote_average || apiData.puntuacion || 0,
    tipo: 'serie',
    temporadas: apiData.temporadas || apiData.number_of_seasons || 0,
    episodios: apiData.episodios || apiData.number_of_episodes || 0,
    actores: actores,
    trailers: trailers,
    proveedores: proveedores,
    creadores: creadores,
  };
}
