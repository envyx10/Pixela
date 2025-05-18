<?php

namespace App\OpenApi\Schemas\Movie;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="MovieCreatorResponse",
 *     description="Movie creator/director response",
 *     @OA\Property(property="success", type="boolean", example=true),
 *     @OA\Property(
 *         property="data",
 *         type="object",
 *         @OA\Property(property="id", type="integer"),
 *         @OA\Property(property="name", type="string"),
 *         @OA\Property(property="profile_path", type="string", nullable=true),
 *         @OA\Property(property="job", type="string", example="Director"),
 *         @OA\Property(property="department", type="string", example="Directing")
 *     )
 * )
 */
interface MovieCreatorResponseSchema
{
} 