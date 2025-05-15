<?php

namespace App\OpenApi\Schemas\Series;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="SeriesDetails",
 *     description="Complete TV series details",
 *     allOf={
 *         @OA\Schema(ref="#/components/schemas/SeriesItem"),
 *         @OA\Schema(
 *             @OA\Property(property="number_of_seasons", type="integer", example=8),
 *             @OA\Property(property="number_of_episodes", type="integer", example=73),
 *             @OA\Property(property="status", type="string", example="Ended"),
 *             @OA\Property(property="genres", type="array", @OA\Items(
 *                 @OA\Property(property="id", type="integer"),
 *                 @OA\Property(property="name", type="string")
 *             ))
 *         )
 *     }
 * )
 */
interface SeriesDetailsSchema
{
}