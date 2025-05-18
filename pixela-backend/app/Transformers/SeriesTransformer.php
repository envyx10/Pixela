<?php

namespace App\Transformers;

class SeriesTransformer
{
    /**
     * Transforms all the data of a series.
     *
     * @param array $series
     * @return array
     */
    public static function transform(array $series): array
    {
        return [
            'id' => $series['id'],
            'title' => $series['name'],
            'poster_path' => $series['poster_path'],
            'first_air_date' => $series['first_air_date'],
            'vote_average' => $series['vote_average'],
            'vote_count' => $series['vote_count'],
            'overview' => $series['overview'],
            'genres' => $series['genre_ids']
        ];
    }

    /**
     * Transforms a collection of series.
     *
     * @param array $series
     * @return array
     */
    public static function transformCollection(array $series): array
    {
        return array_map([self::class, 'transform'], $series);
    }

}