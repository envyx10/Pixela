<?php

namespace App\OpenApi\Schemas\Series;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="SeriesCastResponse",
 *     description="TV series cast response",
 *     @OA\Property(property="success", type="boolean", example=true),
 *     @OA\Property(
 *         property="data",
 *         type="array",
 *         @OA\Items(
 *             @OA\Property(property="id", type="integer", example=123),
 *             @OA\Property(property="name", type="string", example="Kit Harington"),
 *             @OA\Property(property="character", type="string", example="Jon Snow"),
 *             @OA\Property(property="profile_path", type="string", nullable=true)
 *         )
 *     )
 * )
 */
interface SeriesCastResponseSchema
{
} 