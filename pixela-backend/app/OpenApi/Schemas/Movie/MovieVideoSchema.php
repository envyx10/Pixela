<?php

namespace App\OpenApi\Schemas\Movie;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="MovieVideo",
 *     description="Movie video information",
 *     @OA\Property(property="id", type="string", example="5d4b0c4b3d4b0c4b3d4b0c4b"),
 *     @OA\Property(property="key", type="string", example="dQw4w9WgXcQ"),
 *     @OA\Property(property="name", type="string", example="Official Trailer"),
 *     @OA\Property(property="site", type="string", example="YouTube"),
 *     @OA\Property(property="type", type="string", example="Trailer")
 * )
 */
interface MovieVideoSchema
{
} 