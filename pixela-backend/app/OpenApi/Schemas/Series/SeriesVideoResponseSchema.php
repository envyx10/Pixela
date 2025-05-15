<?php

namespace App\OpenApi\Schemas\Series;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="SeriesVideoResponse",
 *     description="TV series videos response",
 *     @OA\Property(property="success", type="boolean", example=true),
 *     @OA\Property(
 *         property="data",
 *         type="array",
 *         @OA\Items(
 *             @OA\Property(property="id", type="string", example="5c9d44ff0e0a267cd516988f"),
 *             @OA\Property(property="key", type="string", example="KPLWWIOCOOQ"),
 *             @OA\Property(property="name", type="string", example="Official Trailer"),
 *             @OA\Property(property="site", type="string", example="YouTube"),
 *             @OA\Property(property="type", type="string", example="Trailer")
 *         )
 *     )
 * )
 */
interface SeriesVideoResponseSchema
{
} 