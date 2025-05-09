<?php

namespace App\Services;

use App\Services\Traits\TmdbServiceTrait;
use GuzzleHttp\Client;
use Exception;
use Illuminate\Support\Facades\Log;

class TmdbSeriesService
{
    use TmdbServiceTrait;

    public function __construct(Client $client)
    {
        $this->initializeTmdbService($client);
    }

    /**
     * Get the details of a series by its ID
     *
     * @param int $id ID of the series
     * @return array
     * @throws Exception
     */
    public function getSeriesById(int $id): array
    {
        return $this->makeRequest("/tv/{$id}");
    }

    /**
     * Get the list of popular series
     *
     * @return array
     * @throws Exception
     */
    public function getTrendingSeries(int $page = 1): array
    {
        return $this->paginatedRequest("/trending/tv/week", [
            'with_watch_providers' => '8|384|119|9|337',
            'watch_region' => 'ES',
        ], $page);
    } 

    /**
     * Get the top rated series
     *
     * @return array
     * @throws Exception
     */
    public function getTopRatedSeries(int $page = 1): array
    {
        return $this->paginatedRequest("/tv/top_rated", [], $page);
    }

    /**
     * Get all discovered series (any genre)
     *
     * @param int $page Número de página para paginación (default 1)
     * @return array
     * @throws Exception
     */
    public function getAllDiscoveredSeries(int $page = 1): array
    {
        return $this->paginatedRequest("/discover/tv", [], $page);
    }
    
    /**
     * Get the list of series currently airing
     *
     * @return array
     * @throws Exception
     */
    public function getSeriesOnTheAir(int $page = 1): array
    {
        return $this->paginatedRequest("/tv/on_the_air", [], $page);
    }

    /**
     * Get the list of series by genre
     *
     * @param int $genreId ID of the genre
     * @return array
     * @throws Exception
     */
    public function getSeriesByGenre(int $genreId, int $page = 1): array
    {
        return $this->paginatedRequest("/discover/tv", [
            'with_genres' => $genreId,
        ], $page);
    }
    
    /**
     * Get the cast of a series by its ID
     *
     * @param int $seriesId ID of the series
     * @return array
     * @throws Exception
     */
    public function getSeriesCast(int $seriesId): array
    {
        try {
            $response = $this->makeRequest("/tv/{$seriesId}/credits");
            
            Log::debug('Respuesta de TMDb para el cast:', [
                'seriesId' => $seriesId,
                'rawResponse' => $response
            ]);

            if (!isset($response['cast']) || !is_array($response['cast'])) {
                Log::warning('Cast no encontrado en la respuesta de TMDb', [
                    'seriesId' => $seriesId
                ]);
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
            Log::error('Error al obtener el reparto de la serie', [
                'seriesId' => $seriesId,
                'error' => $e->getMessage()
            ]);
            return ['cast' => []];
        }
    }
    
    /**
     * Get the videos (trailers) of a series by its ID
     *
     * @param int $seriesId ID of the series
     * @return array
     * @throws Exception
     */
    public function getSeriesVideos(int $seriesId): array
    {
        return $this->makeRequest("/tv/{$seriesId}/videos", [
            'language' => 'es-ES'
        ]);
    }

    /**
     * Get the streaming platforms where a series can be watched
     *
     * @param int $seriesId ID of the series
     * @param string $region Region code (default ES for Spain)
     * @return array
     * @throws Exception
     */
    public function getSeriesWatchProviders(int $seriesId, string $region = 'ES'): array
    {
        return $this->makeRequest("/tv/{$seriesId}/watch/providers", [
            'watch_region' => $region
        ]);
    }

    /**
     * Get all images for a specific series
     *
     * @param int $seriesId ID of the series
     * @return array
     * @throws Exception
     */
    public function getSeriesImages(int $seriesId): array
    {
        try {
            $response = $this->makeRequest("/tv/{$seriesId}/images", [
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
     * Get the reviews of a series by its ID
     *
     * @param int $seriesId ID of the series
     * @param int $page Page number for pagination
     * @return array
     * @throws Exception
     */
    public function getSeriesReviews(int $seriesId, int $page = 1): array
    {
        return $this->paginatedRequest("/tv/{$seriesId}/reviews", [
            'language' => 'es-ES'
        ], $page);
    }
} 