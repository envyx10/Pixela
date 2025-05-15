<?php

namespace App\OpenApi\Schemas\Tmdb;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="PaginatedResponse",
 *     description="Base schema for paginated responses",
 *     @OA\Property(property="success", type="boolean", example=true),
 *     @OA\Property(property="page", type="integer", example=1),
 *     @OA\Property(property="total_pages", type="integer", example=100),
 *     @OA\Property(property="total_results", type="integer", example=2000)
 * )
 */
interface PaginatedResponseSchema
{
} 