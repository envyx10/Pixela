<?php

namespace App\OpenApi\Schemas\Review;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="ReviewListResponse",
 *     description="List of reviews response",
 *     @OA\Property(property="success", type="boolean", example=true),
 *     @OA\Property(property="message", type="string", example="Reviews retrieved successfully"),
 *     @OA\Property(
 *         property="data",
 *         type="array",
 *         @OA\Items(ref="#/components/schemas/Review")
 *     )
 * )
 */
interface ReviewListResponseSchema
{
} 