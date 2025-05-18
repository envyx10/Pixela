<?php

namespace App\OpenApi\Schemas\Favorite;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Favorite",
 *     type="object",
 *     title="Favorite",
 *     description="Información de un favorito",
 *     required={"id", "user_id", "tmdb_id", "item_type"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="user_id", type="integer", example=1),
 *     @OA\Property(property="tmdb_id", type="integer", example=550),
 *     @OA\Property(property="item_type", type="string", enum={"movie", "series"}, example="movie"),
 *     @OA\Property(property="title", type="string", example="Fight Club"),
 *     @OA\Property(property="poster_path", type="string", nullable=true),
 *     @OA\Property(property="release_date", type="string", format="date", nullable=true),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2024-05-10T15:00:00Z")
 * )
 */

interface FavoriteSchema
{
} 