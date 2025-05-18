import { DiscoverResponse, TrendingSerie, TrendingMovie } from "./type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_INTERNAL_URL;
const DISCOVER_LIMIT = 7;

type MediaType = 'series' | 'movies';

/**
 * Función base para obtener contenido descubierto
 * @param type - Tipo de contenido a obtener ('series' o 'movies')
 * @returns Lista de contenido descubierto (máximo 7)
 */
async function fetchDiscoveredContent<T>(type: MediaType): Promise<T[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/${type}/discover?limit=${DISCOVER_LIMIT}`);
        
        if (!response.ok) {
            throw new Error(`Error de API: ${response.status} ${response.statusText}`);
        }

        const data: DiscoverResponse = await response.json();
        return (data.data as T[]).slice(0, DISCOVER_LIMIT);

    } catch (error) {
        console.error(`Error fetching discovered ${type}:`, error);
        return [];
    }
}

/**
 * Obtiene las series descubiertas
 * @returns Lista de series descubiertas (máximo 7)
 */
export const getDiscoveredSeries = (): Promise<TrendingSerie[]> => 
    fetchDiscoveredContent<TrendingSerie>('series');

/**
 * Obtiene las películas descubiertas
 * @returns Lista de películas descubiertas (máximo 7)
 */
export const getDiscoveredMovies = (): Promise<TrendingMovie[]> => 
    fetchDiscoveredContent<TrendingMovie>('movies'); 