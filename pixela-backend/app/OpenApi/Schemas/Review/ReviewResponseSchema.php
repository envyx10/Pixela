<?php

namespace App\OpenApi\Schemas\Review;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="ReviewResponse",
 *     description="Single review response",
 *     @OA\Property(property="success", type="boolean", example=true),
 *     @OA\Property(property="message", type="string", example="Review operation successful"),
 *     @OA\Property(property="data", ref="#/components/schemas/Review")
 * )
 */
interface ReviewResponseSchema
{
} 