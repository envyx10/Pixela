// TMDB Series Service - migrated from Laravel TmdbSeriesService.php

import TmdbService from './tmdb.service';
import { getGenreId, convertGenreId } from './genre-mapping';
import {
  Series,
  SeriesDetails,
  PaginatedResponse,
  CreditsResponse,
  VideosResponse,
  WatchProvidersResponse,
  ImagesResponse,
  Review,
  TransformedCastMember,
  TransformedImage,
} from './tmdb.types';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/500x750?text=No+Image';

export class TmdbSeriesService extends TmdbService {
  /**
   * Get the genre ID for TV shows by name
   */
  getTvGenreId(genreName: string): number | null {
    return getGenreId(genreName, 'tv');
  }

  /**
   * Get the genre ID for TV shows based on the movie genre ID
   */
  getTvGenreIdFromMovieId(movieGenreId: number): number | null {
    return convertGenreId(movieGenreId, 'movie', 'tv');
  }

  /**
   * Get the details of a series by its ID
   */
  async getSeriesById(id: number): Promise<SeriesDetails> {
    return this.makeRequest<SeriesDetails>(`/tv/${id}`);
  }

  /**
   * Get the list of trending series
   */
  async getTrendingSeries(page: number = 1): Promise<PaginatedResponse<Series>> {
    return this.paginatedRequest<Series>('/trending/tv/week', {
      with_watch_providers: '8|384|119|9|337',
      watch_region: 'ES',
    }, page);
  }

  /**
   * Get the top rated series
   */
  async getTopRatedSeries(page: number = 1): Promise<PaginatedResponse<Series>> {
    return this.paginatedRequest<Series>('/tv/top_rated', {}, page);
  }

  /**
   * Get all discovered series (any genre)
   */
  async getAllDiscoveredSeries(page: number = 1): Promise<PaginatedResponse<Series>> {
    return this.paginatedRequest<Series>('/discover/tv', {
      with_watch_providers: '8|384|119|9|337',
      watch_region: 'ES',
    }, page);
  }

  /**
   * Get the list of series currently airing
   */
  async getSeriesOnTheAir(page: number = 1): Promise<PaginatedResponse<Series>> {
    return this.paginatedRequest<Series>('/tv/on_the_air', {}, page);
  }

  /**
   * Get the list of series by genre
   */
  async getSeriesByGenre(genreId: number, page: number = 1): Promise<PaginatedResponse<Series>> {
    return this.paginatedRequest<Series>('/discover/tv', {
      with_genres: genreId,
      language: 'es-ES',
    }, page);
  }

  /**
   * Get the cast of a series by its ID
   */
  async getSeriesCast(seriesId: number): Promise<{ cast: TransformedCastMember[] }> {
    try {
      const response = await this.makeRequest<CreditsResponse>(`/tv/${seriesId}/credits`);

      if (!response.cast || !Array.isArray(response.cast)) {
        return { cast: [] };
      }

      const cast = response.cast.map((actor) => ({
        id: actor.id,
        nombre: actor.name,
        personaje: actor.character,
        foto: actor.profile_path
          ? `${IMAGE_BASE_URL}/w500${actor.profile_path}`
          : PLACEHOLDER_IMAGE,
      }));

      return { cast };
    } catch {
      return { cast: [] };
    }
  }

  /**
   * Get the videos (trailers) of a series by its ID
   */
  async getSeriesVideos(seriesId: number): Promise<VideosResponse> {
    return this.makeRequest<VideosResponse>(`/tv/${seriesId}/videos`, {
      language: 'es-ES',
    });
  }

  /**
   * Get the streaming platforms where a series can be watched
   */
  async getSeriesWatchProviders(seriesId: number, region: string = 'ES'): Promise<WatchProvidersResponse> {
    return this.makeRequest<WatchProvidersResponse>(`/tv/${seriesId}/watch/providers`, {
      watch_region: region,
    });
  }

  /**
   * Get all images for a specific series
   */
  async getSeriesImages(seriesId: number): Promise<{ backdrops: TransformedImage[]; posters: TransformedImage[] }> {
    try {
      const response = await this.makeRequest<ImagesResponse>(`/tv/${seriesId}/images`, {
        include_image_language: 'es,null',
      });

      if (!response.backdrops || !response.posters) {
        return { backdrops: [], posters: [] };
      }

      const backdrops = response.backdrops.map((backdrop) => ({
        id: backdrop.file_path,
        tipo: 'backdrop' as const,
        url: `${IMAGE_BASE_URL}/original${backdrop.file_path}`,
        ancho: backdrop.width,
        alto: backdrop.height,
      }));

      const posters = response.posters.map((poster) => ({
        id: poster.file_path,
        tipo: 'poster' as const,
        url: `${IMAGE_BASE_URL}/original${poster.file_path}`,
        ancho: poster.width,
        alto: poster.height,
      }));

      return { backdrops, posters };
    } catch {
      return { backdrops: [], posters: [] };
    }
  }

  /**
   * Get the reviews of a series by its ID
   */
  async getSeriesReviews(seriesId: number, page: number = 1): Promise<PaginatedResponse<Review>> {
    return this.paginatedRequest<Review>(`/tv/${seriesId}/reviews`, { language: 'es-ES' }, page);
  }

  /**
   * Search for TV series by query string
   */
  async searchSeries(query: string, page: number = 1): Promise<PaginatedResponse<Series>> {
    return this.paginatedRequest<Series>('/search/tv', {
      query,
      language: 'es-ES',
      include_adult: false,
    }, page);
  }
}

// Singleton instance
let seriesServiceInstance: TmdbSeriesService | null = null;

export function getTmdbSeriesService(): TmdbSeriesService {
  if (!seriesServiceInstance) {
    seriesServiceInstance = new TmdbSeriesService();
  }
  return seriesServiceInstance;
}

export default TmdbSeriesService;
