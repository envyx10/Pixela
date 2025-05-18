<?php

namespace App\OpenApi\Schemas\Series;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="PaginatedSeriesResponse",
 *     description="Paginated response of TV series",
 *     @OA\Property(property="success", type="boolean", example=true),
 *     @OA\Property(property="page", type="integer", example=1),
 *     @OA\Property(property="total_pages", type="integer", example=100),
 *     @OA\Property(property="total_results", type="integer", example=2000),
 *     @OA\Property(
 *         property="data",
 *         type="array",
 *         @OA\Items(ref="#/components/schemas/SeriesItem")
 *     )
 * )
 */
interface PaginatedSeriesResponseSchema
{
} 