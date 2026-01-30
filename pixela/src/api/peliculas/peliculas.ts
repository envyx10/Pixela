import { Pelicula } from '@/features/media/types/content';
import { API_ENDPOINTS } from '@/api/shared/apiEndpoints';
import { fetchWithErrorHandling } from '@/api/shared/apiHelpers';
import { mapPeliculaFromApi } from './mapper/mapPelicula'; 
import type {
  ApiImage, ApiProvider, ApiTrailer, ApiPelicula, ApiActor,
  ApiResponse, ApiCastResponse, ApiVideosResponse, ApiProvidersResponse, 
  ApiImagesResponse, ApiCreatorResponse
} from './types';

interface CrewMember {
  id: number;
  name: string;
  profile_path: string | null;
  job: string;
}

interface Creator {
  id: number;
  nombre: string;
  foto?: string;
}

interface ExtendedPeliculaResponse extends ApiPelicula {
  credits?: {
    cast: ApiActor[];
    crew: CrewMember[];
  };
  videos?: {
    results: ApiTrailer[];
  };
  'watch/providers'?: {
    results: {
      ES?: {
        flatrate?: ApiProvider[];
        rent?: ApiProvider[];
        buy?: ApiProvider[];
      };
    };
  };
  images?: {
    backdrops: ApiImage[];
    posters: ApiImage[];
  };
}

const deduplicateProviders = (providers: ApiProvider[]): ApiProvider[] => {
  const seen = new Set<number>();
  return providers.filter(provider => {
    if (!provider.provider_id) return false;
    
    if (seen.has(provider.provider_id)) {
      return false;
    }
    seen.add(provider.provider_id);
    return true;
  });
};

const extractDirector = (crew: CrewMember[]): Creator | undefined => {
  const director = crew.find(member => member.job === 'Director');
  
  if (!director) return undefined;
  
  return {
    id: director.id,
    nombre: director.name,
    foto: director.profile_path || undefined
  };
};


/**
 * Obtiene la película por ID junto con datos adicionales
 * @param id ID de la película
 * @returns Objeto Pelicula completo
 */
export async function getPeliculaById(id: string): Promise<Pelicula> {
  const response = await fetchWithErrorHandling<ApiResponse<ExtendedPeliculaResponse>>(
    API_ENDPOINTS.PELICULAS.GET_BY_ID(id)
  );
  
  if (!response?.data?.id) {
    throw new Error('Movie not found or invalid data');
  }

  const rawPelicula = response.data;
  const actores = rawPelicula.credits?.cast || [];
  const trailers = rawPelicula.videos?.results || [];
  
  const providersData = rawPelicula['watch/providers']?.results?.ES;
  const allProviders: ApiProvider[] = providersData ? [
    ...(providersData.flatrate || []),
    ...(providersData.rent || []),
    ...(providersData.buy || [])
  ] : [];
  
  const proveedores = deduplicateProviders(allProviders);
  
  const imagenes = {
    backdrops: rawPelicula.images?.backdrops || [],
    posters: rawPelicula.images?.posters || []
  };
  
  const creador = extractDirector(rawPelicula.credits?.crew || []);

  return mapPeliculaFromApi({
    ...rawPelicula,
    actores,
    trailers,
    proveedores,
    imagenes,
    creador
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
export async function getPeliculaProveedores(
  id: string, 
  region = 'ES'
): Promise<ApiProvider[]> {
  const data = await fetchWithErrorHandling<ApiProvidersResponse>(
    `${API_ENDPOINTS.PELICULAS.GET_WATCH_PROVIDERS(id)}?region=${region}`
  );
  
  if (!data?.success || !data.data?.results?.[region]) {
    return [];
  }
  
  const providers = data.data.results[region];
  const allProviders: ApiProvider[] = [
    ...(providers.flatrate || []),
    ...(providers.rent || []),
    ...(providers.buy || [])
  ];
  
  return deduplicateProviders(allProviders);
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
  
  if (!data?.success) return [];
  
  return [
    ...(data.data?.backdrops || []), 
    ...(data.data?.posters || [])
  ];
}
