<?php

namespace App\Services\Traits;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use InvalidArgumentException;
use Exception;

trait TmdbServiceTrait
{
    protected Client $client;
    protected string $apiKey;
    protected string $baseUrl;
    protected string $language;
    protected int $timeout;

    protected function initializeTmdbService(Client $client): void
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
    protected function makeRequest(string $endpoint, array $extraQuery = []): array
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
            throw new Exception('Error fetching from TMDB: ' . $e->getMessage());
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
    protected function paginatedRequest(string $endpoint, array $params = [], int $page = 1): array
    {
        $params['page'] = $page;
        return $this->makeRequest($endpoint, $params);
    }
}