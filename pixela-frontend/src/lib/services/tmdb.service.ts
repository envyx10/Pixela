// Base TMDB Service - migrated from Laravel TmdbServiceTrait.php

import { TmdbConfig, GenreListResponse, PaginatedResponse } from './tmdb.types';

// Default configuration
const DEFAULT_CONFIG: TmdbConfig = {
  apiKey: process.env.TMDB_API_KEY || '',
  baseUrl: process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  language: process.env.TMDB_LANGUAGE || 'es-ES',
  timeout: parseInt(process.env.TMDB_TIMEOUT || '10000', 10),
};

/**
 * Base TMDB Service with shared functionality
 */
export class TmdbService {
  protected config: TmdbConfig;

  constructor(config?: Partial<TmdbConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };

    if (!this.config.apiKey) {
      throw new Error('TMDB_API_KEY environment variable not set.');
    }
  }

  /**
   * Make a request to the TMDB API
   */
  protected async makeRequest<T>(
    endpoint: string,
    extraQuery: Record<string, string | number | boolean> = {}
  ): Promise<T> {
    const url = new URL(`${this.config.baseUrl}${endpoint}`);
    
    // Add default query parameters
    url.searchParams.append('api_key', this.config.apiKey);
    url.searchParams.append('language', this.config.language);
    
    // Add extra query parameters
    for (const [key, value] of Object.entries(extraQuery)) {
      url.searchParams.append(key, String(value));
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('TMDB API request timeout');
      }
      throw new Error(`Error fetching from TMDB: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Make a paginated request to the TMDB API
   */
  protected async paginatedRequest<T>(
    endpoint: string,
    params: Record<string, string | number | boolean> = {},
    page: number = 1
  ): Promise<PaginatedResponse<T>> {
    return this.makeRequest<PaginatedResponse<T>>(endpoint, { ...params, page });
  }

  /**
   * Get all categories (movies and TV shows)
   */
  async getAllCategories(): Promise<GenreListResponse> {
    return this.makeRequest<GenreListResponse>('/genre/movie/list');
  }

  /**
   * Get all trending content (movies and TV shows)
   */
  async getAllTrending<T>(page: number = 1): Promise<PaginatedResponse<T>> {
    return this.paginatedRequest<T>('/trending/all/week', {}, page);
  }
}

// Singleton instance
let tmdbServiceInstance: TmdbService | null = null;

export function getTmdbService(): TmdbService {
  if (!tmdbServiceInstance) {
    tmdbServiceInstance = new TmdbService();
  }
  return tmdbServiceInstance;
}

export default TmdbService;
