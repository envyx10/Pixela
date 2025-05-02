<?php

namespace App\Transformers;

class MovieTransformer
{
    /**
     * Transforms all the data of a movie.
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
     * Transforms a collection of movies.
     *
     * @param array $movies
     * @return array
     */
    public static function transformCollection(array $movies): array
    {
        return array_map([self::class, 'transform'], $movies);
    }
}
