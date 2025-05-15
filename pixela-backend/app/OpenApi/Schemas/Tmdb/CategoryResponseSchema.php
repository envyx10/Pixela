<?php

namespace App\OpenApi\Schemas\Tmdb;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="CategoryResponse",
 *     description="Response containing list of categories/genres",
 *     @OA\Property(property="success", type="boolean", example=true),
 *     @OA\Property(
 *         property="data",
 *         type="array",
 *         @OA\Items(
 *             @OA\Property(property="id", type="integer", example=28),
 *             @OA\Property(property="name", type="string", example="Action")
 *         )
 *     )
 * )
 */
interface CategoryResponseSchema
{
} 