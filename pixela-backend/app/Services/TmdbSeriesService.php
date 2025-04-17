<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use InvalidArgumentException;
use Exception;

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
     * Realiza peticiones a la API de TMDb.
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
     * Obtiene información detallada de una serie por su ID
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
     * Undocumented function
     *
     * @return array
     */
    public function getTrendingSeries(): array{
        return $this->makeRequest("/trending/tv/week?with_watch_providers=8|384|119|9|337&watch_region=ES");
    }

    /**
     * Obtiene las series mejor valoradas
     *
     * @return array
     * @throws Exception
     */
    public function getTopRatedSeries(): array
    {
        return $this->makeRequest("/tv/top_rated");
    }
    
    /**
    * Obtiene las series que estan en emisión
     *
     * @return array
     * @throws Exception
     */
    public function getSeriesOnTheAir(): array
    {
        return $this->makeRequest("/tv/on_the_air");
    }

    /**
     * Obtiene todas las series de un género
     *
     * @param int $genreId ID del género
     * @return array
     * @throws Exception
     */
    public function getSeriesByGenre(int $genreId): array
    {
        return $this->makeRequest("/discover/tv?with_genres={$genreId}");
    }
    
    

} 