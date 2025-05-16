<?php

namespace App\OpenApi\Schemas\Movie;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="PaginatedMovieResponse",
 *     description="Paginated response containing movie items",
 *     allOf={
 *         @OA\Schema(ref="#/components/schemas/PaginatedResponse"),
 *         @OA\Schema(
 *             @OA\Property(
 *                 property="data",
 *                 type="array",
 *                 @OA\Items(ref="#/components/schemas/MovieItem")
 *             )
 *         )
 *     }
 * )
 */
interface PaginatedMovieResponseSchema
{
} 