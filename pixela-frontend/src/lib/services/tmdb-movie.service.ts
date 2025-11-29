// TMDB Movie Service - migrated from Laravel TmdbMovieService.php

import TmdbService from './tmdb.service';
import { getGenreId, convertGenreId } from './genre-mapping';
import {
  Movie,
  MovieDetails,
  PaginatedResponse,
  CreditsResponse,
  VideosResponse,
  WatchProvidersResponse,
  ImagesResponse,
  Review,
  TransformedCastMember,
  TransformedCreator,
  TransformedImage,
  ContentType,
} from './tmdb.types';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/500x750?text=No+Image';

export class TmdbMovieService extends TmdbService {
  /**
   * Get the genre ID for movies by name
   */
  getMovieGenreId(genreName: string): number | null {
    return getGenreId(genreName, 'movie');
  }

  /**
   * Get the genre ID for movies based on the TV show genre ID
   */
  getMovieGenreIdFromTvId(tvGenreId: number): number | null {
    return convertGenreId(tvGenreId, 'tv', 'movie');
  }

  /**
   * Get details of a movie by its ID
   */
  async getMovieById(id: number): Promise<MovieDetails> {
    return this.makeRequest<MovieDetails>(`/movie/${id}`);
  }

  /**
   * Get all trending movies
   */
  async getTrendingMovies(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.paginatedRequest<Movie>('/trending/movie/week', {}, page);
  }

  /**
   * Get top rated movies
   */
  async getTopRatedMovies(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.paginatedRequest<Movie>('/movie/top_rated', {}, page);
  }

  /**
   * Get all discovered movies (any genre)
   */
  async getAllDiscoveredMovies(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.paginatedRequest<Movie>('/discover/movie', {}, page);
  }

  /**
   * Get now playing movies
   */
  async getMovieNowPlaying(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.paginatedRequest<Movie>('/movie/now_playing', {}, page);
  }

  /**
   * Get all movies by genre
   */
  async getMovieByGenre(genreId: number, page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.paginatedRequest<Movie>('/discover/movie', { with_genres: genreId }, page);
  }

  /**
   * Get the cast of a movie by its ID
   */
  async getMovieCast(movieId: number): Promise<{ cast: TransformedCastMember[] }> {
    try {
      const response = await this.makeRequest<CreditsResponse>(`/movie/${movieId}/credits`);

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
   * Get the videos (trailers) of a movie by its ID
   */
  async getMovieVideos(movieId: number): Promise<VideosResponse> {
    return this.makeRequest<VideosResponse>(`/movie/${movieId}/videos`, {
      language: 'es-ES',
    });
  }

  /**
   * Get the streaming platforms where a movie can be watched
   */
  async getMovieWatchProviders(movieId: number, region: string = 'ES'): Promise<WatchProvidersResponse> {
    return this.makeRequest<WatchProvidersResponse>(`/movie/${movieId}/watch/providers`, {
      watch_region: region,
    });
  }

  /**
   * Get the creator (director) of a movie by its ID
   */
  async getMovieCreator(movieId: number): Promise<{ creator: TransformedCreator | null }> {
    try {
      const response = await this.makeRequest<CreditsResponse>(`/movie/${movieId}/credits`);

      if (!response.crew || !Array.isArray(response.crew)) {
        return { creator: null };
      }

      const director = response.crew.find((member) => member.job === 'Director');

      if (!director) {
        return { creator: null };
      }

      return {
        creator: {
          id: director.id,
          nombre: director.name,
          foto: director.profile_path
            ? `${IMAGE_BASE_URL}/w500${director.profile_path}`
            : PLACEHOLDER_IMAGE,
        },
      };
    } catch {
      return { creator: null };
    }
  }

  /**
   * Get all images for a specific movie
   */
  async getMovieImages(movieId: number): Promise<{ backdrops: TransformedImage[]; posters: TransformedImage[] }> {
    try {
      const response = await this.makeRequest<ImagesResponse>(`/movie/${movieId}/images`, {
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
   * Get the reviews of a movie by its ID
   */
  async getMovieReviews(movieId: number, page: number = 1): Promise<PaginatedResponse<Review>> {
    return this.paginatedRequest<Review>(`/movie/${movieId}/reviews`, { language: 'es-ES' }, page);
  }

  /**
   * Search for movies by query string
   */
  async searchMovies(query: string, page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.paginatedRequest<Movie>('/search/movie', {
      query,
      language: 'es-ES',
      include_adult: false,
    }, page);
  }
}

// Singleton instance
let movieServiceInstance: TmdbMovieService | null = null;

export function getTmdbMovieService(): TmdbMovieService {
  if (!movieServiceInstance) {
    movieServiceInstance = new TmdbMovieService();
  }
  return movieServiceInstance;
}

export default TmdbMovieService;
