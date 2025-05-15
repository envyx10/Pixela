<?php

namespace App\OpenApi\Schemas\User;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="ResetPasswordRequest",
 *     description="Request body for resetting password",
 *     required={"token", "email", "password", "password_confirmation"},
 *     @OA\Property(property="token", type="string", example="reset-token-123"),
 *     @OA\Property(property="email", type="string", format="email", example="john@example.com"),
 *     @OA\Property(property="password", type="string", format="password", example="newpassword123"),
 *     @OA\Property(property="password_confirmation", type="string", format="password", example="newpassword123")
 * )
 */
interface ResetPasswordRequestSchema
{
} 