<?php

namespace App\OpenApi\Schemas\User;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="UserCreateRequest",
 *     description="Request body for creating a user",
 *     required={"name", "email", "password", "is_admin"},
 *     @OA\Property(property="name", type="string", example="John Doe"),
 *     @OA\Property(property="email", type="string", example="john@example.com"),
 *     @OA\Property(property="password", type="string", format="password", example="secret123"),
 *     @OA\Property(property="password_confirmation", type="string", format="password", example="secret123"),
 *     @OA\Property(property="is_admin", type="boolean", example=false)
 * )
 */
interface UserCreateRequestSchema
{
} 