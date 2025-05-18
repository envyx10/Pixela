<?php

namespace App\OpenApi\Schemas\Common;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="ErrorResponse",
 *     description="General error response",
 *     @OA\Property(property="success", type="boolean", example=false),
 *     @OA\Property(property="message", type="string", example="An error occurred")
 * )
 */
interface ErrorResponseSchema
{
} 