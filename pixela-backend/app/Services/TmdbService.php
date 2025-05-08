<?php

namespace App\Services;

use App\Services\Traits\TmdbServiceTrait;
use GuzzleHttp\Client;

class TmdbService
{
    use TmdbServiceTrait;

    public function __construct(Client $client)
    {
        $this->initializeTmdbService($client);
    }

    /**
     * Get all categories (movies and TV shows)
     *
     * @return array
     */
    public function getAllCategories(): array
    {
        return $this->makeRequest('/genre/movie/list');
    }

    /**
     * Get all trending content (movies and TV shows)
     *
     * @param int $page Page number for pagination
     * @return array
     */
    public function getAllTrending(int $page = 1): array
    {
        return $this->paginatedRequest("/trending/all/week", [], $page);
    }

}

