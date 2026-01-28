import { Pelicula } from '@/features/media/types/content';
import { API_ENDPOINTS } from '@/api/shared/apiEndpoints';
import { fetchWithErrorHandling } from '@/api/shared/apiHelpers';
import { mapPeliculaFromApi } from './mapper/mapPelicula'; 
import type {
  ApiImage, ApiProvider, ApiTrailer, ApiPelicula, ApiActor,
  ApiResponse, ApiCastResponse, ApiVideosResponse, ApiProvidersResponse, 
  ApiImagesResponse, ApiCreatorResponse
} from './types';


/**
 * Obtiene la película por ID junto con datos adicionales
 * @param id ID de la película
 * @returns Objeto Pelicula completo
 */
export async function getPeliculaById(id: string): Promise<Pelicula> {
  const data = await fetchWithErrorHandling<ApiResponse<ApiPelicula>>(
    API_ENDPOINTS.PELICULAS.GET_BY_ID(id)
  );
  
  if (!data?.data?.id) {
    throw new Error('Película no encontrada o datos inválidos');
  }

  const rawPelicula = data.data as any;

  // Extract embedded data (appended in backend route)
  const actores = rawPelicula.credits?.cast || [];
  const trailers = rawPelicula.videos?.results || [];
  
  // Extract providers for ES region
  const providersData = rawPelicula['watch/providers']?.results?.ES;
  const proveedores = providersData ? [
      ...(providersData.flatrate || []),
      ...(providersData.rent || []),
      ...(providersData.buy || [])
  ] : [];

  // Deduplicate providers
  const uniqueProveedores = proveedores.filter((provider: any, index: number, self: any[]) =>
    index === self.findIndex((p: any) => p.provider_id === provider.provider_id)
  );

  // Images
  const imagenesData = rawPelicula.images || { backdrops: [], posters: [] };

  // Creator (Find Director in Crew)
  const crew = rawPelicula.credits?.crew || [];
  const director = crew.find((p: any) => p.job === 'Director');
  const creador = director ? {
      id: director.id,
      nombre: director.name,
      foto: director.profile_path
  } : undefined;


  return mapPeliculaFromApi({
    ...rawPelicula,
    actores: actores,
    trailers: trailers,
    proveedores: uniqueProveedores,
    imagenes: {
      backdrops: imagenesData.backdrops || [],
      posters: imagenesData.posters || []
    },
    creador: creador
  });
}

/**
 * Obtiene los actores de una película
 * @param id ID de la película
 * @returns Array de actores
 */
export async function getPeliculaActores(id: string): Promise<ApiActor[]> {
  const data = await fetchWithErrorHandling<ApiCastResponse>(
    API_ENDPOINTS.PELICULAS.GET_CAST(id)
  );
  return data?.success ? (data.data?.cast || []) : [];
}

/**
 * Obtiene los videos/trailers de una película
 * @param id ID de la película
 * @returns Array de videos
 */
export async function getPeliculaVideos(id: string): Promise<ApiTrailer[]> {
  const data = await fetchWithErrorHandling<ApiVideosResponse>(
    API_ENDPOINTS.PELICULAS.GET_VIDEOS(id)
  );
  return data?.success ? (data.data?.results || []) : [];
}

/**
 * Obtiene los proveedores de streaming de una película
 * @param id ID de la película
 * @param region Región para los proveedores (por defecto ES para España)
 * @returns Array de proveedores de streaming
 */
export async function getPeliculaProveedores(id: string, region = 'ES'): Promise<ApiProvider[]> {
  const data = await fetchWithErrorHandling<ApiProvidersResponse>(
    `${API_ENDPOINTS.PELICULAS.GET_WATCH_PROVIDERS(id)}?region=${region}`
  );
  
  if (!data?.success || !data.data?.results?.[region]) return [];
  
  const providers = data.data.results[region];
  const allProviders = [
    ...(providers.flatrate || []),
    ...(providers.rent || []),
    ...(providers.buy || [])
  ];
  
  return allProviders.filter((provider, index, self) =>
    index === self.findIndex(p => p.provider_id === provider.provider_id)
  );
}

/**
 * Obtiene las imágenes de una película (backdrops y posters)
 * @param id ID de la película
 * @returns Array de imágenes
 */
export async function getPeliculaImagenes(id: string): Promise<ApiImage[]> {
  const data = await fetchWithErrorHandling<ApiImagesResponse>(
    API_ENDPOINTS.PELICULAS.GET_IMAGES(id)
  );
  return data?.success ? [...(data.data?.backdrops || []), ...(data.data?.posters || [])] : [];
}
