<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use InvalidArgumentException;
use Exception;

class TmdbMovieService
{
    private const DEFAULT_LANGUAGE = 'es-ES';
    private const TIMEOUT = 10;

    protected Client $client;
    protected string $apiKey;
    protected string $baseUrl;

    public function __construct(Client $client)
    {
        $this->client = $client;
        $this->apiKey = env('TMDB_API_KEY');
        $this->baseUrl = rtrim(env('TMDB_BASE_URL', 'https://api.themoviedb.org/3'), '/');

        if (!$this->apiKey) {
            throw new InvalidArgumentException('TMDB_API_KEY environment variable not set.');
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
        try {
            $response = $this->client->get("{$this->baseUrl}/movie/{$id}", [
                'query' => [
                    'api_key' => $this->apiKey,
                    'language' => self::DEFAULT_LANGUAGE,
                ],
                'timeout' => self::TIMEOUT,
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

} 