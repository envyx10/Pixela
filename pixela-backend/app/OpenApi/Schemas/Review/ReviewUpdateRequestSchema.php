<?php

namespace App\OpenApi\Schemas\Review;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="ReviewUpdateRequest",
 *     description="Data required to update a review",
 *     required={"rating"},
 *     @OA\Property(property="rating", type="number", format="float", minimum=0, maximum=10, example=8.5),
 *     @OA\Property(property="review", type="string", nullable=true, example="An excellent movie...")
 * )
 */
interface ReviewUpdateRequestSchema
{
} 