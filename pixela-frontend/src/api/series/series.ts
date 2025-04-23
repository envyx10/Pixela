import { Serie } from '@/features/media/types/media';
import { API_ENDPOINTS, DEFAULT_FETCH_OPTIONS } from '@/config/api';

// URL base para imágenes de TMDb
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

export async function getSerieById(id: string): Promise<Serie> {
  try {
    const apiUrl = API_ENDPOINTS.SERIES.GET_BY_ID(id);
    console.log(`[DEBUG] getSerieById - Intentando conectar con: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      ...DEFAULT_FETCH_OPTIONS,
    });

    console.log(`[DEBUG] getSerieById - Respuesta del servidor: Status ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[ERROR] getSerieById - Error en la respuesta: Código ${response.status}, Respuesta: ${errorText}`);
      throw new Error(`Error al obtener la serie: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('[DEBUG] getSerieById - Datos recibidos de la API:', data);

    const seriesData = data.data ? data.data : data;

    if (!seriesData || !seriesData.id) {
      console.error('[ERROR] getSerieById - Datos de API incompletos:', seriesData);
      throw new Error('Los datos recibidos de la API están incompletos o en un formato inesperado');
    }

    // Asegurarse de que las URLs de imágenes sean completas
    const posterPath = seriesData.poster_path || seriesData.poster || '';
    const backdropPath = seriesData.backdrop_path || seriesData.backdrop || '';
    
    // Comprobar si las URLs son relativas o absolutas
    const posterUrl = posterPath && posterPath.startsWith('/') 
      ? `${TMDB_IMAGE_BASE_URL}${posterPath}` 
      : (posterPath || '');
    
    const backdropUrl = backdropPath && backdropPath.startsWith('/') 
      ? `${TMDB_IMAGE_BASE_URL}${backdropPath}` 
      : (backdropPath || '');

    return {
      id: seriesData.id.toString(),
      titulo: seriesData.nombre || seriesData.titulo,
      sinopsis: seriesData.descripcion || seriesData.sinopsis || seriesData.overview,
      fecha: seriesData.fecha_estreno || seriesData.fecha || seriesData.first_air_date,
      generos: seriesData.generos 
        ? (Array.isArray(seriesData.generos) 
            ? seriesData.generos.map((g: any) => typeof g === 'string' ? g : g.nombre || g.name) 
            : [seriesData.generos])
        : [],
      poster: posterUrl,
      backdrop: backdropUrl,
      puntuacion: seriesData.vote_average || seriesData.puntuacion || 0,
      tipo: 'serie',
      temporadas: seriesData.temporadas || seriesData.number_of_seasons || 0,
      episodios: seriesData.episodios || seriesData.number_of_episodes || 0,
      actores: seriesData.actores 
        ? seriesData.actores.map((actor: any) => {
            const fotoPath = actor.foto || actor.profile_path || '';
            const fotoUrl = fotoPath && fotoPath.startsWith('/') 
              ? `${TMDB_IMAGE_BASE_URL}${fotoPath}` 
              : (fotoPath || '');
            
            return {
              id: actor.id.toString(),
              nombre: actor.nombre || actor.name,
              foto: fotoUrl,
              personaje: actor.personaje || actor.character || ''
            };
          })
        : [],
      trailers: seriesData.trailers 
        ? seriesData.trailers.map((trailer: any) => ({
            id: trailer.id.toString(),
            nombre: trailer.nombre || trailer.name,
            key: trailer.key,
            site: trailer.site || 'YouTube',
            tipo: trailer.tipo || trailer.type
          }))
        : []
    };
  } catch (error) {
    console.error('[ERROR] getSerieById - Error al obtener la serie:', error);
    throw error; // 🚫 Eliminado fallback silencioso
  }
}
