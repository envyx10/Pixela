<?php

namespace App\OpenApi\Schemas\Series;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="SeriesProvidersResponse",
 *     description="TV series streaming providers response",
 *     @OA\Property(property="success", type="boolean", example=true),
 *     @OA\Property(
 *         property="data",
 *         type="object",
 *         @OA\Property(property="results", type="object",
 *             @OA\Property(property="ES", type="object",
 *                 @OA\Property(property="link", type="string"),
 *                 @OA\Property(property="flatrate", type="array", @OA\Items(
 *                     @OA\Property(property="provider_id", type="integer"),
 *                     @OA\Property(property="provider_name", type="string"),
 *                     @OA\Property(property="logo_path", type="string")
 *                 ))
 *             )
 *         )
 *     )
 * )
 */
interface SeriesProvidersResponseSchema
{
} 