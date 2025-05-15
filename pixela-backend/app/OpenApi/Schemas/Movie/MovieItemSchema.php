<?php

namespace App\OpenApi\Schemas\Movie;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="MovieItem",
 *     description="Basic movie information",
 *     @OA\Property(property="id", type="integer", example=550),
 *     @OA\Property(property="title", type="string", example="Fight Club"),
 *     @OA\Property(property="overview", type="string", example="An insomniac office worker and a devil-may-care soapmaker..."),
 *     @OA\Property(property="release_date", type="string", format="date", example="1999-10-15"),
 *     @OA\Property(property="poster_path", type="string", nullable=true, example="/8kNruSfhk5IoE4eZOc4UpvDn6tq.jpg"),
 *     @OA\Property(property="vote_average", type="number", format="float", example=8.4)
 * )
 */
interface MovieItemSchema
{
} 