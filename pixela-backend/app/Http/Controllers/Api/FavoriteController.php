<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;    
use Illuminate\Support\Facades\Cache;
use GuzzleHttp\Client;
use Illuminate\Http\JsonResponse;

/**
 * @OA\Tag(
 *     name="Favorites",
 *     description="User favorites list management operations"
 * )
 */

// Los schemas se han movido a app/OpenApi/Schemas/Favorite.php
class FavoriteController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/favorites",
     *     summary="Add to favorites",
     *     description="Add a movie or series to user's favorites list",
     *     operationId="addFavorite",
     *     tags={"Favorites"},
     *     security={{ "sanctum": {} }},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/FavoriteRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Favorite added successfully",
     *         @OA\JsonContent(ref="#/components/schemas/FavoriteResponse")
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Favorite already exists",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function add(Request $request): JsonResponse
    {
        $data = $request->validate([
            'tmdb_id'   => 'required|integer',
            'item_type' => 'required|string|in:movie,series',
        ]);

        $user = $request->user();

        $exists = $user->favorites()
                    ->where('tmdb_id', $data['tmdb_id'])
                    ->where('item_type', $data['item_type'])
                    ->exists();
       
        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Favorite item already exists'
            ], 400);
        }

        $favorite = $user->favorites()->create($data);

        return response()->json([
            'success' => true,
            'message' => 'Favorite item added successfully',
            'data'    => $favorite
        ], 201);
    }

    /**
     * @OA\Delete(
     *     path="/api/favorites/{favorite}",
     *     summary="Remove from favorites",
     *     description="Remove a movie or series from user's favorites list",
     *     operationId="deleteFavorite",
     *     tags={"Favorites"},
     *     security={{ "sanctum": {} }},
     *     @OA\Parameter(
     *         name="favorite",
     *         in="path",
     *         required=true,
     *         description="ID of the favorite to delete",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Favorite removed successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Favorite item removed successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Not authorized to delete this favorite",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Favorite not found",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function delete(Request $request, Favorite $favorite): JsonResponse
    {
        $user = $request->user();

        if ($favorite->user_id !== $user->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to delete this favorite'
            ], 403);
        }

        $favorite->delete();

        return response()->json([
            'success' => true,
            'message' => 'Favorite item removed successfully'
        ], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/favorites",
     *     summary="List favorites",
     *     description="Get user's complete favorites list with details for each item",
     *     operationId="listFavorites",
     *     tags={"Favorites"},
     *     security={{ "sanctum": {} }},
     *     @OA\Response(
     *         response=200,
     *         description="Favorites list retrieved successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Favorites with details retrieved successfully"),
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Favorite")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function listWithDetails(Request $request): JsonResponse
    {
        $user = $request->user();
        $favorites = $user->favorites;

        $apiKey = env('TMDB_API_KEY');
        $language = 'es-ES';

        $client = new Client();

        $detailedFavorites = $favorites->map(function ($fav) use ($client, $apiKey, $language) {
            $tmdbId = $fav->tmdb_id;
            $type = $fav->item_type;

            $cacheKey = "tmdb_{$type}_{$tmdbId}_{$language}";

            $details = Cache::remember($cacheKey, now()->addHours(12), function () use ($client, $type, $tmdbId, $apiKey, $language) {
                $url = $type === 'movie'
                    ? "https://api.themoviedb.org/3/movie/{$tmdbId}"
                    : "https://api.themoviedb.org/3/tv/{$tmdbId}";

                try {
                    $response = $client->request('GET', $url, [
                        'query' => [
                            'api_key' => $apiKey,
                            'language' => $language,
                        ],
                        'timeout' => 5,
                    ]);
                    $body = $response->getBody()->getContents();
                    return json_decode($body, true);
                } catch (\Exception $e) {
                    return null;
                }
            });

            return [
                'id' => $fav->favorite_id,
                'user_id' => $fav->user_id,
                'tmdb_id' => $fav->tmdb_id,
                'item_type' => $fav->item_type,
                'title' => $type === 'movie' ? ($details['title'] ?? null) : ($details['name'] ?? null),
                'poster_path' => $details['poster_path'] ?? null,
                'release_date' => $type === 'movie' ? ($details['release_date'] ?? null) : ($details['first_air_date'] ?? null),
            ];
        });

        return response()->json([
            'success' => true,
            'message' => 'Favorites with details retrieved successfully',
            'data' => $detailedFavorites
        ]);
    }
 
}
