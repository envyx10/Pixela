<?php

namespace App\OpenApi\Schemas\Common;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="ValidationErrorResponse",
 *     description="Validation error response",
 *     @OA\Property(property="success", type="boolean", example=false),
 *     @OA\Property(property="message", type="string", example="The given data was invalid."),
 *     @OA\Property(
 *         property="errors",
 *         type="object",
 *         additionalProperties={"type": "array", "items": {"type": "string"}},
 *         example={"email": {"The email field is required."}}
 *     )
 * )
 */
interface ValidationErrorResponseSchema
{
} 