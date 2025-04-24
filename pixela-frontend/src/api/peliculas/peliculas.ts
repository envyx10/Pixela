import { Pelicula } from '@/features/media/types/media';
import { API_ENDPOINTS, DEFAULT_FETCH_OPTIONS } from '@/config/api';
import { mapPeliculaFromApi } from './mapPelicula';

export async function getPeliculaById(id: string): Promise<Pelicula> {
  try {
    const apiUrl = API_ENDPOINTS.PELICULAS.GET_BY_ID(id);
    console.log(`[DEBUG] getPeliculaById - Intentando conectar con: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      ...DEFAULT_FETCH_OPTIONS,
    });

    console.log(`[DEBUG] getPeliculaById - Respuesta del servidor: Status ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[ERROR] getPeliculaById - Error en la respuesta: Código ${response.status}, Respuesta: ${errorText}`);
      throw new Error(`Error al obtener la película: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('[DEBUG] getPeliculaById - Datos recibidos de la API:', data);

    const movieData = data.data ? data.data : data;

    return mapPeliculaFromApi(movieData);
  } catch (error) {
    console.error('[ERROR] getPeliculaById - Error al obtener la película:', error);
    throw error; // 🚫 Eliminado fallback silencioso
  }
}
