import { fetchFromTmdb } from "@/lib/tmdb";
import { WeekendMovie, WeekendSerie } from "../types";

export interface TmdbResult {
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  title?: string;
  name?: string;
  overview?: string;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  release_date?: string;
  first_air_date?: string;
}

interface TmdbResponse {
  results: TmdbResult[];
}

/**
 * Obtiene las películas recomendadas para el fin de semana (Populares en streaming/general)
 * @param limit Número de películas a obtener
 * @returns Lista de películas para el fin de semana
 */
export async function getWeekendMovies(limit: number): Promise<WeekendMovie[]> {
  try {
    const data = await fetchFromTmdb<TmdbResponse>("movie/popular", {
      region: "ES",
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
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
  } catch (error) {
    console.error("Error fetching weekend movies:", error);
    return [];
  }
}

/**
 * Obtiene las series recomendadas para el fin de semana
 * @param limit Número de series a obtener
 * @returns Lista de series para el fin de semana
 */
export async function getWeekendSeries(limit: number): Promise<WeekendSerie[]> {
  try {
    const data = await fetchFromTmdb<TmdbResponse>("tv/popular", {
      // Opcional: watch_region=ES, sort_by=popularity.desc
    });

    return data.results
      .filter((item) => item.backdrop_path && item.poster_path && item.name)
      .slice(0, limit)
      .map((item) => ({
        id: item.id,
        title: item.name || "",
        name: item.name || "",
        overview: item.overview || "",
        poster_path: item.poster_path!,
        backdrop_path: item.backdrop_path!,
        vote_average: item.vote_average || 0,
        vote_count: item.vote_count || 0,
        popularity: item.popularity || 0,
        first_air_date: item.first_air_date || "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
  } catch (error) {
    console.error("Error fetching weekend series:", error);
    return [];
  }
}
