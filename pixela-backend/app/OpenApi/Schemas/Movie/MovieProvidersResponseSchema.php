<?php

namespace App\OpenApi\Schemas\Movie;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="MovieProvidersResponse",
 *     description="Movie streaming providers response",
 *     @OA\Property(property="success", type="boolean", example=true),
 *     @OA\Property(
 *         property="data",
 *         type="object",
 *         @OA\Property(property="results", type="object",
 *             @OA\Property(property="ES", type="object",
 *                 @OA\Property(property="link", type="string"),
 *                 @OA\Property(property="flatrate", type="array", @OA\Items(ref="#/components/schemas/WatchProvider")),
 *                 @OA\Property(property="rent", type="array", @OA\Items(ref="#/components/schemas/WatchProvider")),
 *                 @OA\Property(property="buy", type="array", @OA\Items(ref="#/components/schemas/WatchProvider"))
 *             )
 *         )
 *     )
 * )
 */
interface MovieProvidersResponseSchema
{
} 