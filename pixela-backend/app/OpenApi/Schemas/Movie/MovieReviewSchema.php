<?php

namespace App\OpenApi\Schemas\Movie;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="MovieReview",
 *     description="Movie review information",
 *     @OA\Property(property="id", type="string", example="5d4b0c4b3d4b0c4b3d4b0c4b"),
 *     @OA\Property(property="author", type="string", example="John Doe"),
 *     @OA\Property(property="content", type="string", example="This movie was amazing..."),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="rating", type="number", format="float", minimum=0, maximum=10, example=8.5)
 * )
 */
interface MovieReviewSchema
{
} 