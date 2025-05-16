<?php

namespace App\OpenApi\Schemas\Movie;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="MovieImagesResponse",
 *     description="Movie images response",
 *     @OA\Property(property="success", type="boolean", example=true),
 *     @OA\Property(
 *         property="data",
 *         type="object",
 *         @OA\Property(property="backdrops", type="array", @OA\Items(ref="#/components/schemas/MovieImage")),
 *         @OA\Property(property="posters", type="array", @OA\Items(ref="#/components/schemas/MovieImage"))
 *     )
 * )
 */
interface MovieImagesResponseSchema
{
} 