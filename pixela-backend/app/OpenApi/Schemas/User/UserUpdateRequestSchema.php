<?php

namespace App\OpenApi\Schemas\User;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="UserUpdateRequest",
 *     description="Request body for updating a user",
 *     required={"name", "email"},
 *     @OA\Property(property="name", type="string", example="John Doe"),
 *     @OA\Property(property="email", type="string", example="john@example.com"),
 *     @OA\Property(property="password", type="string", format="password", nullable=true, example="secret123"),
 *     @OA\Property(property="is_admin", type="boolean", nullable=true, example=false)
 * )
 */
interface UserUpdateRequestSchema
{
} 