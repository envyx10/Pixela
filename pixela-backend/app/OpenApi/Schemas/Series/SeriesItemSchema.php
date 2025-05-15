<?php

namespace App\OpenApi\Schemas\Series;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="SeriesItem",
 *     description="Basic TV series information",
 *     @OA\Property(property="id", type="integer", example=1399),
 *     @OA\Property(property="name", type="string", example="Game of Thrones"),
 *     @OA\Property(property="overview", type="string", example="Seven noble families fight for control of the mythical land of Westeros..."),
 *     @OA\Property(property="first_air_date", type="string", format="date", example="2011-04-17"),
 *     @OA\Property(property="poster_path", type="string", nullable=true, example="/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg"),
 *     @OA\Property(property="vote_average", type="number", format="float", example=8.4)
 * )
 */
interface SeriesItemSchema
{
}