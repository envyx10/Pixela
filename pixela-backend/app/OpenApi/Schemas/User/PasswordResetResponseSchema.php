<?php

namespace App\OpenApi\Schemas\User;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="PasswordResetResponse",
 *     description="Response after password reset or reset link sent",
 *     @OA\Property(property="success", type="boolean", example=true),
 *     @OA\Property(property="status", type="string", example="passwords.sent"),
 *     @OA\Property(property="message", type="string", example="Password reset link sent successfully")
 * )
 */
interface PasswordResetResponseSchema
{
} 