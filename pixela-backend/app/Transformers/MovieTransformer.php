<?php

namespace App\Transformers;

class MovieTransformer
{
    /**
     * Transforma los datos de una única película.
     *
     * @param array $movie
     * @return array
     */
    public static function transform(array $movie): array
    {
        return [
            'id'           => $movie['id'],
            'title'        => $movie['title'],
            'poster_path'  => $movie['poster_path'],
            'release_date' => $movie['release_date'],
            'vote_average' => $movie['vote_average'],
            'vote_count'   => $movie['vote_count'],
            'overview'     => $movie['overview'],
            'genres'       => $movie['genre_ids']
        ];
    }

    /**
     * Transforma un conjunto de películas.
     *
     * @param array $movies
     * @return array
     */
    public static function transformCollection(array $movies): array
    {
        return array_map([self::class, 'transform'], $movies);
    }
}
