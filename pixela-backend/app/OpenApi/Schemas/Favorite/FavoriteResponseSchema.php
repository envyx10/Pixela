<?php

namespace App\OpenApi\Schemas\Favorite;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="FavoriteResponse",
 *     description="Favorite item response",
 *     @OA\Property(property="success", type="boolean", example=true),
 *     @OA\Property(property="message", type="string", example="Favorite item retrieved successfully"),
 *     @OA\Property(property="data", ref="#/components/schemas/Favorite")
 * )
 */
interface FavoriteResponseSchema
{
} 