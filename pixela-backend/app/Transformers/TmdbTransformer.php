<?php

namespace App\Transformers;

class TmdbTransformer
{
    public static function transformCollection(array $items): array
    {
        return array_map(function ($item) {
            return self::transform($item);
        }, $items);
    }

    public static function transform(array $item): array
    {
        return [
            'id' => $item['id'] ?? null,
            'name' => $item['name'] ?? null,
            'title' => $item['title'] ?? null,
            'media_type' => $item['media_type'] ?? null,
            'poster_path' => $item['poster_path'] ?? null,
            'backdrop_path' => $item['backdrop_path'] ?? null,
            'overview' => $item['overview'] ?? null,
            'vote_average' => $item['vote_average'] ?? null,
            'release_date' => $item['release_date'] ?? ($item['first_air_date'] ?? null),
        ];
    }
} 