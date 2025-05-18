<?php

namespace App\OpenApi\Schemas\Movie;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="WatchProvider",
 *     description="Streaming provider information",
 *     @OA\Property(property="provider_id", type="integer", example=8),
 *     @OA\Property(property="provider_name", type="string", example="Netflix"),
 *     @OA\Property(property="logo_path", type="string", example="/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg")
 * )
 */
interface WatchProviderSchema
{
} 