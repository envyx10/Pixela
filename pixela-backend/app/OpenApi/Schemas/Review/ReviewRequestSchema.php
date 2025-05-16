<?php

namespace App\OpenApi\Schemas\Review;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="ReviewRequest",
 *     description="Data required to create a review",
 *     required={"item_type", "tmdb_id", "rating"},
 *     @OA\Property(property="item_type", type="string", enum={"movie", "series"}, example="movie"),
 *     @OA\Property(property="tmdb_id", type="integer", example=550),
 *     @OA\Property(property="rating", type="number", format="float", minimum=0, maximum=10, example=8.5),
 *     @OA\Property(property="review", type="string", nullable=true, example="An excellent movie...")
 * )
 */
interface ReviewRequestSchema
{
} 