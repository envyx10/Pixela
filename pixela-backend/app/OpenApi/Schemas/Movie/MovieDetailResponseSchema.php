<?php

namespace App\OpenApi\Schemas\Movie;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="MovieDetailResponse",
 *     description="Movie details response",
 *     @OA\Property(property="success", type="boolean", example=true),
 *     @OA\Property(property="data", ref="#/components/schemas/MovieDetails")
 * )
 */
interface MovieDetailResponseSchema
{
} 