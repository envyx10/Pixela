<?php

namespace App\Services;

use App\Services\Traits\TmdbServiceTrait;
use App\Services\Traits\GenreMappingTrait;
use GuzzleHttp\Client;
use Exception;

class TmdbMovieService
{
    use TmdbServiceTrait;
    use GenreMappingTrait;

    public function __construct(Client $client)
    {
        $this->initializeTmdbService($client);
    }

    /**
     * Get the genre ID for movies by name
     *
     * @param string $genreName Name of the genre (e.g: 'action', 'drama')
     * @return int|null Movie genre ID or null if not found
     */
    public function getMovieGenreId(string $genreName): ?int
    {
        return $this->getGenreId($genreName, 'movie');
    }

    /**
     * Get the genre ID for movies based on the TV show genre ID
     *
     * @param int $tvGenreId TV show genre ID
     * @return int|null Movie genre ID or null if not found
     */
    public function getMovieGenreIdFromTvId(int $tvGenreId): ?int
    {
        return $this->convertGenreId($tvGenreId, 'tv', 'movie');
    }

    /**
     * Obtains details of a movie by its ID
     *
     * @param int $id ID of the movie
     * @return array
     * @throws Exception
     */
    public function getMovieById(int $id): array
    {
        return $this->makeRequest("/movie/{$id}");
    }

    /**
     * Obtains all trending movies
     *
     * @return array
     * @throws Exception
     */
    public function getTrendingMovies(int $page = 1): array
    {
        return $this->paginatedRequest("/trending/movie/week", [], $page);
    }

    /**
     * Obtains top rated movies
     *
     * @return array
     * @throws Exception
     */
    public function getTopRatedMovies(int $page = 1): array
    {
        return $this->paginatedRequest("/movie/top_rated", [], $page);
    }

    /**
     * Get all discovered movies (any genre)
     *
     * @param int $page Page number for pagination (default 1)
     * @return array
     * @throws Exception
     */
    public function getAllDiscoveredMovies(int $page = 1): array
    {
        return $this->paginatedRequest("/discover/movie", [], $page);
    }

    /**
     * Obtains now playing movies
     *
     * @return array
     * @throws Exception
     */
    public function getMovieNowPlaying(int $page = 1): array
    {
        return $this->paginatedRequest("/movie/now_playing", [], $page);
    }

    /**
     * Obtains all movies by genre
     *
     * @param int $genreId ID of the genre
     * @return array
     * @throws Exception
     */
    public function getMovieByGenre(int $genreId, int $page = 1): array
    {
        return $this->paginatedRequest("/discover/movie", [
            'with_genres' => $genreId
        ], $page);
    }

    /**
     * Get the cast of a movie by its ID
     *
     * @param int $movieId ID of the movie
     * @return array
     * @throws Exception
     */
    public function getMovieCast(int $movieId): array
    {
        try {
            $response = $this->makeRequest("/movie/{$movieId}/credits");
            
            if (!isset($response['cast']) || !is_array($response['cast'])) {
                return ['cast' => []];
            }

            // Mapear los actores manteniendo todos los datos originales
            $cast = array_map(function($actor) {
                return [
                    'id' => $actor['id'],
                    'nombre' => $actor['name'],
                    'personaje' => $actor['character'],
                    'foto' => $actor['profile_path'] 
                        ? "https://image.tmdb.org/t/p/w500{$actor['profile_path']}"
                        : "https://via.placeholder.com/500x750?text=No+Image"
                ];
            }, $response['cast']);

            return ['cast' => $cast];
        } catch (Exception $e) {
            return ['cast' => []];
        }
    }

    /**
     * Get the videos (trailers) of a movie by its ID
     *
     * @param int $movieId ID of the movie
     * @return array
     * @throws Exception
     */
    public function getMovieVideos(int $movieId): array
    {
        return $this->makeRequest("/movie/{$movieId}/videos", [
            'language' => 'es-ES'  // Incluir videos en español
        ]);
    }

    /**
     * Get the streaming platforms where a movie can be watched
     *
     * @param int $movieId ID of the movie
     * @param string $region Region code (default ES for Spain)
     * @return array
     * @throws Exception
     */
    public function getMovieWatchProviders(int $movieId, string $region = 'ES'): array
    {
        return $this->makeRequest("/movie/{$movieId}/watch/providers?watch_region={$region}");
    }

    /**
     * Get the creator of a movie by its ID
     *
     * @param int $movieId ID of the movie
     * @return array
     * @throws Exception
     */
    public function getMovieCreator(int $movieId): array
    {
        try {
            $response = $this->makeRequest("/movie/{$movieId}/credits");
            
            if (!isset($response['crew']) || !is_array($response['crew'])) {
                return ['creator' => null];
            }

            // Buscar el director (que es el creador principal en películas)
            $director = array_filter($response['crew'], function($member) {
                return $member['job'] === 'Director';
            });

            if (empty($director)) {
                return ['creator' => null];
            }

            $director = reset($director);
            
            return ['creator' => [
                'id' => $director['id'],
                'nombre' => $director['name'],
                'foto' => $director['profile_path'] 
                    ? "https://image.tmdb.org/t/p/w500{$director['profile_path']}"
                    : "https://via.placeholder.com/500x750?text=No+Image"
            ]];
        } catch (Exception $e) {
            return ['creator' => null];
        }
    }

    /**
     * Get all images for a specific movie
     *
     * @param int $movieId ID of the movie
     * @return array
     * @throws Exception
     */
    public function getMovieImages(int $movieId): array
    {
        try {
            $url = "{$this->baseUrl}/movie/{$movieId}/images";
            
            $response = $this->makeRequest("/movie/{$movieId}/images", [
                'include_image_language' => 'es,null'
            ]);
            
            if (!isset($response['backdrops']) || !isset($response['posters'])) {
                return [
                    'backdrops' => [],
                    'posters' => []
                ];
            }

            // Mapear los backdrops
            $backdrops = array_map(function($backdrop) {
                return [
                    'id' => $backdrop['file_path'],
                    'tipo' => 'backdrop',
                    'url' => "https://image.tmdb.org/t/p/original{$backdrop['file_path']}",
                    'ancho' => $backdrop['width'],
                    'alto' => $backdrop['height']
                ];
            }, $response['backdrops']);

            // Mapear los posters
            $posters = array_map(function($poster) {
                return [
                    'id' => $poster['file_path'],
                    'tipo' => 'poster',
                    'url' => "https://image.tmdb.org/t/p/original{$poster['file_path']}",
                    'ancho' => $poster['width'],
                    'alto' => $poster['height']
                ];
            }, $response['posters']);

            return [
                'backdrops' => $backdrops,
                'posters' => $posters
            ];
        } catch (Exception $e) {
            return [
                'backdrops' => [],
                'posters' => []
            ];
        }
    }

    /**
     * Get the reviews of a movie by its ID
     *
     * @param int $movieId ID of the movie
     * @param int $page Page number for pagination
     * @return array
     * @throws Exception
     */
    public function getMovieReviews(int $movieId, int $page = 1): array
    {
        return $this->paginatedRequest("/movie/{$movieId}/reviews", [
            'language' => 'es-ES'
        ], $page);
    }

    /**
     * Search for movies by query string
     *
     * @param string $query Search query
     * @param int $page Page number for pagination (default 1)
     * @return array
     * @throws Exception
     */
    public function searchMovies(string $query, int $page = 1): array
    {
        return $this->paginatedRequest("/search/movie", [
            'query' => $query,
            'language' => 'es-ES',
            'include_adult' => false
        ], $page);
    }
} 