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
    private function makeRequest(string $endpoint): array
    {
        try {
            $response = $this->client->get("{$this->baseUrl}{$endpoint}", [
                'query'   => [
                    'api_key'  => $this->apiKey,
                    'language' => $this->language,
                ],
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
     * Obtains details of a series by its ID
     *
     * @param int $id ID de la serie
     * @return array
     * @throws Exception
     */
    public function getSeriesById(int $id): array
    {
        return $this->makeRequest("/tv/{$id}");
    }

    /**
     * Obtains the list of popular series
     *
     * @return array
     * @throws Exception
     */
    public function getTrendingSeries(): array
    {
        return $this->makeRequest("/trending/tv/week?with_watch_providers=8|384|119|9|337&watch_region=ES");
    } 

    /**
     * Obtains top rated series
     *
     * @return array
     * @throws Exception
     */
    public function getTopRatedSeries(): array
    {
        return $this->makeRequest("/tv/top_rated");
    }
    
    /**
    * Obtains the list of series currently airing
     *
     * @return array
     * @throws Exception
     */
    public function getSeriesOnTheAir(): array
    {
        return $this->makeRequest("/tv/on_the_air");
    }

    /**
     * Obtains the list of series by genre
     *
     * @param int $genreId ID del género
     * @return array
     * @throws Exception
     */
    public function getSeriesByGenre(int $genreId): array
    {
        return $this->makeRequest("/discover/tv?with_genres={$genreId}");
    }
    
    /**
     * Obtiene los actores de una serie por su ID
     *
     * @param int $seriesId ID de la serie
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
     * Obtiene los videos (trailers) de una serie por su ID
     *
     * @param int $seriesId ID de la serie
     * @return array
     * @throws Exception
     */
    public function getSeriesVideos(int $seriesId): array
    {
        return $this->makeRequest("/tv/{$seriesId}/videos");
    }

    /**
     * Obtiene las plataformas de streaming donde se puede ver una serie
     *
     * @param int $seriesId ID de la serie
     * @param string $region Código de región (por defecto ES para España)
     * @return array
     * @throws Exception
     */
    public function getSeriesWatchProviders(int $seriesId, string $region = 'ES'): array
    {
        return $this->makeRequest("/tv/{$seriesId}/watch/providers?watch_region={$region}");
    }
} 