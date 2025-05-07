<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use InvalidArgumentException;
use Exception;
use Illuminate\Support\Facades\Log;

class TmdbSeriesService
{
    private Client $client;
    private string $apiKey;
    private string $baseUrl;
    private string $language;
    private int $timeout;

    public function __construct(Client $client)
    {
        $this->client = $client;
        $this->apiKey = config('tmdb.api_key');
        $this->baseUrl = config('tmdb.base_url');
        $this->language = config('tmdb.language');
        $this->timeout = config('tmdb.timeout');

        if (!$this->apiKey) {
            throw new InvalidArgumentException('TMDB_API_KEY environment variable not set.');
        }
    }

    /**
     * Make a request to the TMDB API
     *
     * @param string $endpoint
     * @return array
     * @throws Exception
     */
    private function makeRequest(string $endpoint, array $extraQuery = []): array
    {
        try {
            $query = array_merge([
                'api_key'  => $this->apiKey,
                'language' => $this->language,
            ], $extraQuery);

            $response = $this->client->get("{$this->baseUrl}{$endpoint}", [
                'query'   => $query,
                'timeout' => $this->timeout,
            ]);

            $data = json_decode($response->getBody()->getContents(), true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception('Error decoding TMDB API response');
            }

            return $data;

        } catch (GuzzleException $e) {
            throw new Exception('Error fetching movie from TMDB: ' . $e->getMessage());
        }
    }

    /**
     * Make a paginated request to the TMDB API
     *
     * @param string $endpoint
     * @param array $params
     * @param int $page
     * @return array
     */
    private function paginatedRequest(string $endpoint, array $params = [], int $page = 1): array
    {
        $params['page'] = $page;
        return $this->makeRequest($endpoint, $params);
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
        return $this->makeRequest("/tv/{$seriesId}/videos");
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
} 