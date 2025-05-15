<?php

namespace App\OpenApi\Schemas\User;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="UserListResponse",
 *     description="Users list response",
 *     allOf={
 *         @OA\Schema(ref="#/components/schemas/PaginatedResponse"),
 *         @OA\Schema(
 *             @OA\Property(
 *                 property="data",
 *                 type="array",
 *                 @OA\Items(ref="#/components/schemas/User")
 *             )
 *         )
 *     }
 * )
 */
interface UserListResponseSchema
{
} 