import { Pelicula } from '@/features/media/types/content';
import { API_ENDPOINTS } from '../shared/apiEndpoints';
import { DEFAULT_FETCH_OPTIONS } from '../shared/apiHelpers';
import { mapPeliculaFromApi } from './mapPelicula';
import { Actor } from '@/features/media/types/people';
import { formatImageUrl } from './mapPelicula';

/**
 * Obtiene la película por ID junto con datos adicionales
 * @param id ID de la película
 * @returns Objeto Pelicula completo
 */
export async function getPeliculaById(id: string): Promise<Pelicula> {
  const apiUrl = API_ENDPOINTS.PELICULAS.GET_BY_ID(id);
  console.log(`[DEBUG] getPeliculaById - Intentando conectar con: ${apiUrl}`);

  const response = await fetch(apiUrl, {
    ...DEFAULT_FETCH_OPTIONS,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[ERROR] getPeliculaById - Código ${response.status}, Respuesta: ${errorText}`);
    throw new Error(`Error al obtener la película: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const rawPelicula = data.data ?? data;

  if (!rawPelicula?.id) {
    throw new Error('La película recibida de la API no contiene un ID válido.');
  }

  // Obtener información adicional de manera segura
  let peliculaActores: Actor[] = [];
  let peliculaVideos: any[] = [];
  let peliculaProveedores: any[] = [];
  let peliculaImagenes: any[] = [];
  let peliculaCreador = null;

  try {
    peliculaActores = await getPeliculaActores(id);
  } catch (error) {
    console.warn(`[WARN] No se pudieron obtener los actores: ${error}`);
  }

  try {
    peliculaVideos = await getPeliculaVideos(id);
  } catch (error) {
    console.warn(`[WARN] No se pudieron obtener los videos: ${error}`);
  }

  try {
    peliculaProveedores = await getPeliculaProveedores(id);
  } catch (error) {
    console.warn(`[WARN] No se pudieron obtener los proveedores: ${error}`);
  }

  try {
    peliculaImagenes = await getPeliculaImagenes(id);
  } catch (error) {
    console.warn(`[WARN] No se pudieron obtener las imágenes: ${error}`);
  }

  try {
    const creatorResponse = await fetch(`${apiUrl}/creator`, {
      ...DEFAULT_FETCH_OPTIONS,
    });

    if (creatorResponse.ok) {
      const creatorData = await creatorResponse.json();
      if (creatorData.success && creatorData.data.creator) {
        peliculaCreador = creatorData.data.creator;
      }
    }
  } catch (error) {
    console.warn(`[WARN] No se pudo obtener el creador: ${error}`);
  }

  return mapPeliculaFromApi({
    ...rawPelicula,
    actores: peliculaActores,
    trailers: peliculaVideos,
    proveedores: peliculaProveedores,
    imagenes: peliculaImagenes,
    creador: peliculaCreador
  });
}

/**
 * Obtiene los actores de una película
 * @param id ID de la película
 * @returns Array de actores
 */
export async function getPeliculaActores(id: string): Promise<Actor[]> {
  const apiUrl = API_ENDPOINTS.PELICULAS.GET_CAST(id);
  console.log(`[DEBUG] getPeliculaActores - Intentando obtener cast para película ${id}`);

  try {
    const response = await fetch(apiUrl, {
      ...DEFAULT_FETCH_OPTIONS,
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`[WARN] getPeliculaActores - No se encontraron actores para la película ${id}`);
        return [];
      }
      console.error(`[ERROR] getPeliculaActores - Código ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.success ? (data.data.cast || []) : [];
  } catch (error) {
    console.error('[ERROR] getPeliculaActores:', error);
    return [];
  }
}

/**
 * Obtiene los videos/trailers de una película
 * @param id ID de la película
 * @returns Array de videos
 */
export async function getPeliculaVideos(id: string): Promise<any[]> {
  const apiUrl = API_ENDPOINTS.PELICULAS.GET_VIDEOS(id);
  try {
    const response = await fetch(apiUrl, {
      ...DEFAULT_FETCH_OPTIONS,
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`[WARN] getPeliculaVideos - No se encontraron videos para la película ${id}`);
        return [];
      }
      console.error(`[ERROR] getPeliculaVideos - Código ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.success ? (data.data.results || []) : [];
  } catch (error) {
    console.error('[ERROR] getPeliculaVideos:', error);
    return [];
  }
}

/**
 * Obtiene los proveedores de streaming de una película
 * @param id ID de la película
 * @param region Región para los proveedores (por defecto ES para España)
 * @returns Array de proveedores de streaming
 */
export async function getPeliculaProveedores(id: string, region: string = 'ES'): Promise<any[]> {
  const apiUrl = `${API_ENDPOINTS.PELICULAS.GET_WATCH_PROVIDERS(id)}?region=${region}`;
  try {
    const response = await fetch(apiUrl, {
      ...DEFAULT_FETCH_OPTIONS,
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`[WARN] getPeliculaProveedores - No se encontraron proveedores para la película ${id}`);
        return [];
      }
      console.error(`[ERROR] getPeliculaProveedores - Código ${response.status}`);
      return [];
    }

    const data = await response.json();
    if (!data.success || !data.data || !data.data.results || !data.data.results[region]) {
      return [];
    }

    const providers = data.data.results[region];
    const allProviders = [
      ...(providers.flatrate || []),
      ...(providers.rent || []),
      ...(providers.buy || [])
    ];

    const uniqueProviders = allProviders.filter((provider, index, self) =>
      index === self.findIndex((p) => p.provider_id === provider.provider_id)
    );

    return uniqueProviders;
  } catch (error) {
    console.error('[ERROR] getPeliculaProveedores:', error);
    return [];
  }
}

/**
 * Obtiene las imágenes de una película (backdrops y posters)
 * @param id ID de la película
 * @returns Array de imágenes
 */
export async function getPeliculaImagenes(id: string): Promise<any[]> {
  const apiUrl = API_ENDPOINTS.PELICULAS.GET_IMAGES(id);
  console.log(`[DEBUG] getPeliculaImagenes - Obteniendo imágenes para película ${id}`);

  try {
    const response = await fetch(apiUrl, {
      ...DEFAULT_FETCH_OPTIONS,
    });

    if (!response.ok) {
      console.error(`[ERROR] getPeliculaImagenes - Código ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.success ? [...data.data.backdrops, ...data.data.posters] : [];
  } catch (error) {
    console.error('[ERROR] getPeliculaImagenes:', error);
    return [];
  }
}
