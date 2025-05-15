<?php

namespace App\OpenApi;

use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="Pixela API Documentation",
 *     description="API Documentation for Pixela - A platform for tracking and managing your movie and series watching history"
 * )
 */

/**
 * @OA\Server(
 *     url=L5_SWAGGER_CONST_HOST,
 *     description="API Server"
 * )
 */

/**
 * @OA\SecurityScheme(
 *     securityScheme="sanctum",
 *     type="http",
 *     scheme="bearer",
 *     description="Authentication using Laravel Sanctum. Include the token in the Authorization header as 'Bearer {token}'"
 * )
 */

/**
 * @OA\Tag(
 *     name="Authentication",
 *     description="Endpoints for user authentication and registration"
 * )
 * 
 * @OA\Tag(
 *     name="Users",
 *     description="Endpoints for user management"
 * )
 * 
 * @OA\Tag(
 *     name="Movies",
 *     description="Endpoints for movie management"
 * )
 * 
 * @OA\Tag(
 *     name="Series",
 *     description="Endpoints for series management"
 * )
 * 
 * @OA\Tag(
 *     name="Categories",
 *     description="Endpoints for category management"
 * )
 * 
 * @OA\Tag(
 *     name="Favorites",
 *     description="Endpoints for managing user favorites"
 * )
 */

class Documentation
{
    // Esta clase es solo para documentación, no necesita implementación
} 