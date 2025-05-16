<?php

namespace App\OpenApi\Schemas\Movie;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="MovieImage",
 *     description="Movie image information",
 *     @OA\Property(property="file_path", type="string", example="/8kNruSfhk5IoE4eZOc4UpvDn6tq.jpg"),
 *     @OA\Property(property="width", type="integer", example=1920),
 *     @OA\Property(property="height", type="integer", example=1080),
 *     @OA\Property(property="aspect_ratio", type="number", format="float", example=1.78)
 * )
 */
interface MovieImageSchema
{
} 