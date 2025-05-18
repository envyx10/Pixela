<?php

namespace App\OpenApi\Schemas\Movie;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="MovieCast",
 *     description="Movie cast and crew information",
 *     @OA\Property(property="id", type="integer", example=550),
 *     @OA\Property(property="cast", type="array", @OA\Items(
 *         @OA\Property(property="id", type="integer", example=819),
 *         @OA\Property(property="name", type="string", example="Edward Norton"),
 *         @OA\Property(property="character", type="string", example="The Narrator"),
 *         @OA\Property(property="profile_path", type="string", nullable=true, example="/5XBzD5WuTyVQZeS4VI25z2moMeY.jpg"),
 *         @OA\Property(property="order", type="integer", example=0)
 *     )),
 *     @OA\Property(property="crew", type="array", @OA\Items(
 *         @OA\Property(property="id", type="integer", example=7467),
 *         @OA\Property(property="name", type="string", example="David Fincher"),
 *         @OA\Property(property="job", type="string", example="Director"),
 *         @OA\Property(property="department", type="string", example="Directing"),
 *         @OA\Property(property="profile_path", type="string", nullable=true, example="/dcYtGQxqQxQxQxQxQxQxQxQxQxQx.jpg")
 *     ))
 * )
 */
interface MovieCastSchema
{
} 