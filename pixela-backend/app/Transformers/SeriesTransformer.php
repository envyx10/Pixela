<?php

namespace App\Transformers;

class SeriesTransformer
{
    /**
     * Transforma los datos de una única serie.
     * Maneja tanto los datos detallados (con 'genres' y 'created_by') 
     * como los datos de lista (con 'genre_ids').
     *
     * @param array $series Datos de la serie desde la API de TMDb.
     * @return array Datos transformados.
     */
    public static function transform(array $series): array
    {
        // Extraer nombres de géneros
        $genres = [];
        if (isset($series['genres']) && is_array($series['genres'])) {
            // Usar el array 'genres' si existe (respuesta detallada)
            $genres = array_column($series['genres'], 'name');
        } elseif (isset($series['genre_ids']) && is_array($series['genre_ids'])) {
            // Usar 'genre_ids' si 'genres' no existe (respuesta de lista)
            // Necesitaríamos un mapeo de ID a nombre aquí si quisiéramos nombres
            // Por ahora, devolveremos los IDs como estaba antes para las listas
            $genres = $series['genre_ids']; 
        }

        // Extraer información completa de los creadores
        $creators = [];
        if (isset($series['created_by']) && is_array($series['created_by']) && count($series['created_by']) > 0) {
            // Mapear todos los creadores con su id, nombre y foto
            $creators = array_map(function($creator) {
                return [
                    'id' => $creator['id'] ?? null,
                    'name' => $creator['name'] ?? null,
                    'profile_path' => isset($creator['profile_path']) 
                        ? 'https://image.tmdb.org/t/p/w200' . $creator['profile_path']
                        : null
                ];
            }, $series['created_by']);
        }

        // Extraer solo el nombre del primer creador para mantener compatibilidad con código anterior
        $creatorName = !empty($creators) ? $creators[0]['name'] : null;

        return [
            'id' => $series['id'] ?? null,
            'title' => $series['name'] ?? null,
            'poster_path' => isset($series['poster_path']) ? 'https://image.tmdb.org/t/p/w500' . $series['poster_path'] : null, // Añadir base URL
            'backdrop_path' => isset($series['backdrop_path']) ? 'https://image.tmdb.org/t/p/w1280' . $series['backdrop_path'] : null, // Añadir backdrop
            'first_air_date' => $series['first_air_date'] ?? null,
            'last_air_date' => $series['last_air_date'] ?? null, // Añadir last_air_date
            'number_of_seasons' => $series['number_of_seasons'] ?? null, // Añadir número de temporadas
            'number_of_episodes' => $series['number_of_episodes'] ?? null, // Añadir número de episodios
            'vote_average' => isset($series['vote_average']) ? round($series['vote_average'], 1) : null, // Redondear voto
            'vote_count' => $series['vote_count'] ?? null,
            'overview' => $series['overview'] ?? null,
            'genres' => $genres, // Usar los géneros procesados (nombres o IDs)
            'creator' => $creatorName, // Mantener el campo simple para compatibilidad
            'creators' => $creators, // Nuevo campo con todos los creadores y sus datos completos
            'status' => $series['status'] ?? null, // Añadir estado (Returning Series, Ended, etc.)
        ];
    }

    /**
     * Transforms a collection of series.
     *
     * @param array $seriesCollection Colección de datos de series desde la API de TMDb.
     * @return array Colección de datos transformados.
     */
    public static function transformCollection(array $seriesCollection): array
    {
        // Filtrar elementos que no son arrays antes de mapear
        $validSeries = array_filter($seriesCollection, 'is_array');
        return array_map([self::class, 'transform'], $validSeries);
    }

}
