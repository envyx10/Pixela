import { DiscoverResponse, TrendingSerie, TrendingMovie } from "./type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_INTERNAL_URL;
const DISCOVER_LIMIT = 7;

/**
 * Obtiene las series descubiertas
 * @returns Lista de series descubiertas (máximo 7)
 */
export async function getDiscoveredSeries(): Promise<TrendingSerie[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/series/discover?limit=${DISCOVER_LIMIT}`);
        
        if (!response.ok) {
            throw new Error(`Error de API: ${response.status} ${response.statusText}`);
        }

        const data: DiscoverResponse = await response.json();
        return (data.data as TrendingSerie[]).slice(0, DISCOVER_LIMIT);

    } catch (error) {
        console.error('Error fetching discovered series:', error);
        return [];
    }
}

/**
 * Obtiene las películas descubiertas
 * @returns Lista de películas descubiertas (máximo 7)
 */
export async function getDiscoveredMovies(): Promise<TrendingMovie[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/movies/discover?limit=${DISCOVER_LIMIT}`);
        
        if (!response.ok) {
            throw new Error(`Error de API: ${response.status} ${response.statusText}`);
        }

        const data: DiscoverResponse = await response.json();
        return (data.data as TrendingMovie[]).slice(0, DISCOVER_LIMIT);

    } catch (error) {
        console.error('Error fetching discovered movies:', error);
        return [];
    }
} 