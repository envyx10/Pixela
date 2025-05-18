<?php

namespace App\OpenApi\Schemas\User;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="ForgotPasswordRequest",
 *     description="Request body for password reset link",
 *     required={"email"},
 *     @OA\Property(property="email", type="string", format="email", example="john@example.com")
 * )
 */
interface ForgotPasswordRequestSchema
{
} 