import { fetchFromTmdb } from "@/lib/tmdb";
import { TheatricalMovie } from "../types";

export interface TmdbResult {
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  title?: string;
  overview?: string;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  release_date?: string;
}

interface TmdbResponse {
  results: TmdbResult[];
}

/**
 * Obtiene las películas que están actualmente en cartelera (Now Playing)
 * @param limit Número de películas a obtener
 * @returns Lista de películas en cartelera
 */
export async function getTheatricalMovies(
  limit: number,
): Promise<TheatricalMovie[]> {
  try {
    const data = await fetchFromTmdb<TmdbResponse>("movie/now_playing", {
      region: "ES", // Opcional: filtrar por región si se quiere
    });

    return data.results
      .filter((item) => item.backdrop_path && item.poster_path && item.title)
      .slice(0, limit)
      .map((item) => ({
        id: item.id,
        title: item.title || "",
        overview: item.overview || "",
        poster_path: item.poster_path!,
        backdrop_path: item.backdrop_path!,
        vote_average: item.vote_average || 0,
        vote_count: item.vote_count || 0,
        popularity: item.popularity || 0,
        release_date: item.release_date || "",
        created_at: new Date().toISOString(), // Placeholder
        updated_at: new Date().toISOString(), // Placeholder
      }));
  } catch (error) {
    console.error("Error fetching theatrical movies:", error);
    return [];
  }
}
