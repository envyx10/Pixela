<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use InvalidArgumentException;
use Exception;

class TmdbMovieService
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
     * Obtiene información detallada de una película por su ID
     *
     * @param int $id ID de la película
     * @return array
     * @throws Exception
     */
    public function getMovieById(int $id): array
    {
        return $this->makeRequest("/movie/{$id}");
    }

    /**
     * Obtiene todas las películas populares
     *
     * @return array
     * @throws Exception
     */
    public function getAllPopularMovies(): array
    {
        return $this->makeRequest("/movie/popular");
    }

    /**
     * Obtiene las películas mejor valoradas
     *
     * @return array
     * @throws Exception
     */
    public function getTopRatedMovies(): array
    {
        return $this->makeRequest("/movie/top_rated");
    }

    /**
     * Obtiene las películas que se están estrenando en cines
     *
     * @return array
     * @throws Exception
     */
    public function getMovieNowPlaying(): array
    {
        return $this->makeRequest("/movie/now_playing");
    }

    /**
     * Obtiene todas las películas de un género
     *
     * @param int $genreId ID del género
     * @return array
     * @throws Exception
     */
    public function getMovieByGenre(int $genreId): array
    {
        return $this->makeRequest("/discover/movie?with_genres={$genreId}");
    }

} 