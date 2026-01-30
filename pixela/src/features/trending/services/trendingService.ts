import { TrendingSerie, TrendingMovie } from "@/features/trending/types";
import { MediaType } from "@/features/trending/types/common";
import { FetchOptions } from "@/features/trending/types/api";
import { API_BASE_URL } from "@/api/shared/apiEndpoints"; // PROD   UCTION: Cambiar {API_BASE_URL} por {API_URL}
import { DEFAULT_FETCH_OPTIONS } from "@/api/shared/apiHelpers";

const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;

// Interface para respuesta de la API de tendencias
interface TrendingResponse<T> {
    data: T[];
}

/**
 * Función base para realizar peticiones a la API de tendencias
 * @param mediaType Tipo de contenido (series o películas)
 * @param options Opciones de paginación
 * @returns Datos de la respuesta
 */
async function fetchTrendingMedia<T>(
    mediaType: MediaType,
    options: FetchOptions = {}
): Promise<T[]> {
    const { limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET } = options;
    const endpoint = `${API_BASE_URL}/${mediaType}/trending?limit=${limit}&offset=${offset}`; // PRODUCTION: Cambiar {API_BASE_URL} por {API_URL}

    try {
        if (process.env.NODE_ENV === 'development') {
            console.log(`Fetching trending ${mediaType} from: ${endpoint}`);
        }
        const response = await fetch(endpoint, {
            ...DEFAULT_FETCH_OPTIONS,
        });
        
        if (!response.ok) {
            throw new Error(`Error de API: ${response.status} ${response.statusText}`);
        }

        const data: TrendingResponse<T> = await response.json();
        return data.data;

    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error(`Error fetching trending ${mediaType}:`, error);
        }
        return [];
    }
}

/**
 * Obtiene las series en tendencia
 * @param limit Número de series a obtener
 * @param offset Punto de inicio para la paginación
 * @returns Lista de series en tendencia
 */
export async function getTrendingSeries(
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET
): Promise<TrendingSerie[]> {
    return fetchTrendingMedia<TrendingSerie>('series', { limit, offset });
}

/**
 * Obtiene las películas en tendencia
 * @param limit Número de películas a obtener
 * @param offset Punto de inicio para la paginación
 * @returns Lista de películas en tendencia
 */
export async function getTrendingMovies(
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET
): Promise<TrendingMovie[]> {
    return fetchTrendingMedia<TrendingMovie>('movies', { limit, offset });
} 