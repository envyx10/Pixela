<?php

namespace App\OpenApi\Schemas\User;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="UserResponse",
 *     description="Single user response",
 *     @OA\Property(property="success", type="boolean", example=true),
 *     @OA\Property(property="message", type="string", example="User operation successful"),
 *     @OA\Property(property="user", ref="#/components/schemas/User")
 * )
 */
interface UserResponseSchema
{
} 