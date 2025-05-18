<?php

namespace App\OpenApi\Schemas\Series;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="SeriesImagesResponse",
 *     description="TV series images response",
 *     @OA\Property(property="success", type="boolean", example=true),
 *     @OA\Property(
 *         property="data",
 *         type="object",
 *         @OA\Property(property="backdrops", type="array", @OA\Items(
 *             @OA\Property(property="file_path", type="string"),
 *             @OA\Property(property="width", type="integer"),
 *             @OA\Property(property="height", type="integer")
 *         )),
 *         @OA\Property(property="posters", type="array", @OA\Items(
 *             @OA\Property(property="file_path", type="string"),
 *             @OA\Property(property="width", type="integer"),
 *             @OA\Property(property="height", type="integer")
 *         ))
 *     )
 * )
 */
interface SeriesImagesResponseSchema
{
} 