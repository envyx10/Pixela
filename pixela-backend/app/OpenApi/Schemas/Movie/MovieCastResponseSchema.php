<?php

namespace App\OpenApi\Schemas\Movie;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="MovieCastResponse",
 *     description="Movie cast and crew response",
 *     @OA\Property(property="success", type="boolean", example=true),
 *     @OA\Property(property="data", ref="#/components/schemas/MovieCast")
 * )
 */
interface MovieCastResponseSchema
{
} 