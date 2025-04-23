import { Pelicula } from '@/features/media/types/media';
import { API_ENDPOINTS, DEFAULT_FETCH_OPTIONS } from '@/config/api';

// URL base para imágenes de TMDb
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

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

    if (!movieData || !movieData.id) {
      console.error('[ERROR] getPeliculaById - Datos de API incompletos:', movieData);
      throw new Error('Los datos recibidos de la API están incompletos o en un formato inesperado');
    }

    // Asegurarse de que las URLs de imágenes sean completas
    const posterPath = movieData.poster_path || movieData.poster || '';
    const backdropPath = movieData.backdrop_path || movieData.backdrop || '';
    
    // Comprobar si las URLs son relativas o absolutas
    const posterUrl = posterPath && posterPath.startsWith('/') 
      ? `${TMDB_IMAGE_BASE_URL}${posterPath}` 
      : (posterPath || '');
    
    const backdropUrl = backdropPath && backdropPath.startsWith('/') 
      ? `${TMDB_IMAGE_BASE_URL}${backdropPath}` 
      : (backdropPath || '');

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
      poster: posterUrl,
      backdrop: backdropUrl,
      puntuacion: parseFloat(movieData.vote_average || movieData.puntuacion) || 0,
      tipo: 'pelicula',
      duracion: parseInt(movieData.duracion || movieData.runtime) || 0,
      actores: movieData.actores
        ? movieData.actores.map((actor: any) => {
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
      trailers: movieData.trailers
        ? movieData.trailers.map((trailer: any) => ({
            id: trailer.id.toString(),
            nombre: trailer.nombre || trailer.name,
            key: trailer.key,
            site: trailer.site || 'YouTube',
            tipo: trailer.tipo || trailer.type
          }))
        : []
    };
  } catch (error) {
    console.error('[ERROR] getPeliculaById - Error al obtener la película:', error);
    throw error; // 🚫 Eliminado fallback silencioso
  }
}
