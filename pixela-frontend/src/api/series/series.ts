import { Actor } from '@/features/media/types/people';
import { Serie } from '@/features/media/types/content';
import { API_ENDPOINTS } from '../shared/apiEndpoints';
import { DEFAULT_FETCH_OPTIONS } from '../shared/apiHelpers';
import { mapSerieFromApi } from './mapSerie';

export async function getSerieById(id: string): Promise<Serie> {
  const apiUrl = API_ENDPOINTS.SERIES.GET_BY_ID(id);
  console.log(`[DEBUG] getSerieById - Intentando conectar con: ${apiUrl}`);

  const response = await fetch(apiUrl, {
    ...DEFAULT_FETCH_OPTIONS,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[ERROR] getSerieById - Código ${response.status}, Respuesta: ${errorText}`);
    throw new Error(`Error al obtener la serie: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const rawSerie = data.data ?? data;

  if (!rawSerie?.id) {
    throw new Error('La serie recibida de la API no contiene un ID válido.');
  }

  // Obtener actores y trailers
  const serieActores = await getSerieActores(id);
  const serieVideos = await getSerieVideos(id);
  const serieProveedores = await getSerieProveedores(id);

  return mapSerieFromApi({
    ...rawSerie,
    actores: serieActores,
    trailers: serieVideos,
    proveedores: serieProveedores
  });
}

/**
 * Obtiene los actores de una serie
 * @param id ID de la serie
 * @returns Array de actores
 */
export async function getSerieActores(id: string): Promise<Actor[]> {
  const apiUrl = API_ENDPOINTS.SERIES.GET_CAST(id);
  console.log(`[DEBUG] getSerieActores - Intentando obtener cast para serie ${id}`);
  
  try {
    const response = await fetch(apiUrl, {
      ...DEFAULT_FETCH_OPTIONS,
    });

    if (!response.ok) {
      console.error(`[ERROR] getSerieActores - Código ${response.status}`);
      return [];
    }

    const data = await response.json();
    console.log(`[DEBUG] getSerieActores - Respuesta recibida:`, data);
    
    // Si la respuesta no es exitosa, retornamos array vacío
    if (!data.success || !data.data) {
      console.warn(`[WARN] getSerieActores - La respuesta no fue exitosa:`, data);
      return [];
    }

    // El array de actores está dentro de data.data.cast
    let actores = [];
    if (data.data.cast && Array.isArray(data.data.cast)) {
       actores = data.data.cast;
    } else {
       console.warn(`[WARN] getSerieActores - El campo 'cast' no se encontró o no es un array en data.data:`, data.data);
       return [];
    }

    // Filtramos actores sin foto y aseguramos el formato correcto
    return actores.filter((actor: Actor) => 
      actor && 
      typeof actor === 'object' && 
      actor.nombre && 
      actor.foto
    );
  } catch (error) {
    console.error('[ERROR] getSerieActores:', error);
    return [];
  }
}

/**
 * Obtiene los videos/trailers de una serie
 * @param id ID de la serie
 * @returns Array de videos
 */
export async function getSerieVideos(id: string): Promise<any[]> {
  const apiUrl = API_ENDPOINTS.SERIES.GET_VIDEOS(id);
  try {
    const response = await fetch(apiUrl, {
      ...DEFAULT_FETCH_OPTIONS,
    });

    if (!response.ok) {
      console.error(`[ERROR] getSerieVideos - Código ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.success ? (data.data.results || []) : [];
  } catch (error) {
    console.error('[ERROR] getSerieVideos:', error);
    return [];
  }
}

/**
 * Obtiene los proveedores de streaming de una serie
 * @param id ID de la serie
 * @param region Región para los proveedores (por defecto ES para España)
 * @returns Array de proveedores de streaming
 */
export async function getSerieProveedores(id: string, region: string = 'ES'): Promise<any[]> {
  const apiUrl = `${API_ENDPOINTS.SERIES.GET_WATCH_PROVIDERS(id)}?region=${region}`;
  try {
    const response = await fetch(apiUrl, {
      ...DEFAULT_FETCH_OPTIONS,
    });

    if (!response.ok) {
      console.error(`[ERROR] getSerieProveedores - Código ${response.status}`);
      return [];
    }

    const data = await response.json();
    if (!data.success || !data.data || !data.data.results || !data.data.results[region]) {
      return [];
    }
    
    // Combinamos todos los tipos de proveedores disponibles
    const providers = data.data.results[region];
    const allProviders = [
      ...(providers.flatrate || []), 
      ...(providers.rent || []), 
      ...(providers.buy || [])
    ];
    
    // Eliminamos duplicados basándonos en el ID del proveedor
    const uniqueProviders = allProviders.filter((provider, index, self) =>
      index === self.findIndex((p) => p.provider_id === provider.provider_id)
    );
    
    return uniqueProviders;
  } catch (error) {
    console.error('[ERROR] getSerieProveedores:', error);
    return [];
  }
}
