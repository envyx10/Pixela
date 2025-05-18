<?php

namespace App\Transformers;

class SeriesTransformer
{
    /**
     * Transforma los datos de una única serie.
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
     * Transforma un conjunto de series.
     *
     * @param array $series
     * @return array
     */
    public static function transformCollection(array $series): array
    {
        return array_map([self::class, 'transform'], $series);
    }

}