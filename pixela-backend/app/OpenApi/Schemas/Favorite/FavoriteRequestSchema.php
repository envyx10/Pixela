<?php

namespace App\OpenApi\Schemas\Favorite;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="FavoriteRequest",
 *     type="object",
 *     title="Favorite Request",
 *     description="Datos necesarios para añadir un favorito",
 *     required={"item_type", "tmdb_id"},
 *     @OA\Property(property="item_type", type="string", enum={"movie", "series"}, example="movie"),
 *     @OA\Property(property="tmdb_id", type="integer", example=550)
 * )
 */
interface FavoriteRequestSchema
{
} 