<?php

namespace App\OpenApi\Schemas\Review;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Review",
 *     description="Review information",
 *     required={"id", "user_id", "tmdb_id", "item_type", "rating"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="user_id", type="integer", example=1),
 *     @OA\Property(property="user_name", type="string", example="John Doe"),
 *     @OA\Property(property="photo_url", type="string", nullable=true),
 *     @OA\Property(property="tmdb_id", type="integer", example=550),
 *     @OA\Property(property="item_type", type="string", enum={"movie", "series"}, example="movie"),
 *     @OA\Property(property="rating", type="number", format="float", minimum=0, maximum=10, example=8.5),
 *     @OA\Property(property="review", type="string", nullable=true, example="An excellent movie..."),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time"),
 *     @OA\Property(property="title", type="string", example="Fight Club"),
 *     @OA\Property(property="poster_path", type="string", nullable=true)
 * )
 */

interface ReviewSchema
{
} 