<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use GuzzleHttp\Client;

/**
 * @OA\Tag(
 *     name="Reviews",
 *     description="Operations related to movie and series reviews"
 * )
 */

class ReviewController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/reviews",
     *     summary="Add a new review",
     *     description="Creates a new review for a movie or series",
     *     operationId="addReview",
     *     tags={"Reviews"},
     *     security={{ "sanctum": {} }},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/ReviewRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Review created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/ReviewResponse")
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Review already exists or invalid data",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function add(Request $request): JsonResponse
    {
        $data = $request->validate([
            'item_type' => 'required|in:movie,series',
            'tmdb_id'   => 'required|integer',
            'rating'    => 'required|numeric|min:0|max:10',
            'review'    => 'nullable|string|max:600'
        ]);

        $user = $request->user();

        $exists = $user->reviews()
                    ->where('item_type', $data['item_type'])
                    ->where('tmdb_id', $data['tmdb_id'])
                    ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Review already exists'
            ], 400);
        }

        $review = $user->reviews()->create($data);

        return response()->json([
            'success' => true,
            'message' => 'Review added successfully',
            'data'    => $review
        ], 201);
    }


    /**
     * @OA\Put(
     *     path="/api/reviews/{review}",
     *     summary="Update a review",
     *     description="Updates an existing review",
     *     operationId="updateReview",
     *     tags={"Reviews"},
     *     security={{ "sanctum": {} }},
     *     @OA\Parameter(
     *         name="review",
     *         in="path",
     *         required=true,
     *         description="Review ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/ReviewUpdateRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Review updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/ReviewResponse")
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Unauthorized to update this review",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function update(Request $request, Review $review): JsonResponse
    {
        $user = $request->user();

        if ($review->user_id !== $user->user_id && !$user->is_admin) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to update this review.'
            ], 403);
        }

        $data = $request->validate([
            'rating'    => 'required|numeric|min:0|max:10',
            'review'    => 'nullable|string|max:600'
        ]);

        $review->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Review updated successfully',
            'data'    => $review
        ], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/reviews/media/{tmdbId}/{itemType}",
     *     summary="Get reviews for specific media",
     *     description="Gets all the reviews from all users for a specific movie or series",
     *     operationId="getReviewsByMedia",
     *     tags={"Reviews"},
     *     security={{ "sanctum": {} }},
     *     @OA\Parameter(
     *         name="tmdbId",
     *         in="path",
     *         required=true,
     *         description="TMDB ID of the movie or series",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="itemType",
     *         in="path",
     *         required=true,
     *         description="Type of media",
     *         @OA\Schema(type="string", enum={"movie", "series"})
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Reviews list retrieved successfully",
     *         @OA\JsonContent(ref="#/components/schemas/ReviewListResponse")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function getReviewsByMedia(Request $request, int $tmdbId, string $itemType): JsonResponse
    {
        // Validar que el itemType sea válido
        if (!in_array($itemType, ['movie', 'series'])) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid item type. Must be either "movie" or "series".'
            ], 400);
        }

        // Obtener todas las reseñas para este tmdbId e itemType
        $reviews = Review::with('user')
            ->where('tmdb_id', $tmdbId)
            ->where('item_type', $itemType)
            ->orderBy('created_at', 'desc')
            ->get();

        $apiKey = env('TMDB_API_KEY');
        $language = 'es-ES';
        $client = new Client();

        // Obtener detalles del medio desde TMDB (solo una vez)
        $cacheKey = "tmdb_{$itemType}_{$tmdbId}_{$language}";
        $details = Cache::remember($cacheKey, now()->addHours(12), function () use ($client, $itemType, $tmdbId, $apiKey, $language) {
            $url = $itemType === 'movie'
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

        $detailedReviews = $reviews->map(function ($review) use ($details, $itemType) {
            return [
                'id' => $review->review_id,
                'user_id' => $review->user_id,
                'user_name' => $review->user ? $review->user->name : null,
                'photo_url' => $review->user ? $review->user->photo_url : null,
                'tmdb_id' => $review->tmdb_id,
                'item_type' => $review->item_type,
                'rating' => $review->rating,
                'review' => $review->review,
                'created_at' => $review->created_at,
                'updated_at' => $review->updated_at,
                'title' => $itemType === 'movie' ? ($details['title'] ?? null) : ($details['name'] ?? null),
                'poster_path' => $details['poster_path'] ?? null,
            ];
        });

        return response()->json([
            'success' => true,
            'message' => 'Reviews retrieved successfully',
            'data'    => $detailedReviews
        ], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/reviews",
     *     summary="List user reviews",
     *     description="Gets all the reviews of the authenticated user",
     *     operationId="listReviews",
     *     tags={"Reviews"},
     *     security={{ "sanctum": {} }},
     *     @OA\Response(
     *         response=200,
     *         description="Reviews list retrieved successfully",
     *         @OA\JsonContent(ref="#/components/schemas/ReviewListResponse")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function list(Request $request): JsonResponse
    {
        $user = $request->user();
        $reviews = $user->reviews;

        $apiKey = env('TMDB_API_KEY');
        $language = 'es-ES';
        $client = new Client();

        $detailedReviews = $reviews->map(function ($review) use ($client, $apiKey, $language) {
            $tmdbId = $review->tmdb_id;
            $type = $review->item_type;

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
                'id' => $review->review_id,
                'user_id' => $review->user_id,
                'user_name' => $review->user ? $review->user->name : null,
                'photo_url' => $review->user ? $review->user->photo_url : null,
                'tmdb_id' => $review->tmdb_id,
                'item_type' => $review->item_type,
                'rating' => $review->rating,
                'review' => $review->review,
                'created_at' => $review->created_at,
                'updated_at' => $review->updated_at,
                'title' => $type === 'movie' ? ($details['title'] ?? null) : ($details['name'] ?? null),
                'poster_path' => $details['poster_path'] ?? null,
            ];
        });

        return response()->json([
            'success' => true,
            'message' => 'Reviews retrieved successfully',
            'data'    => $detailedReviews
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/reviews/{review}",
     *     summary="Delete a review",
     *     description="Deletes a specific review",
     *     operationId="deleteReview",
     *     tags={"Reviews"},
     *     security={{ "sanctum": {} }},
     *     @OA\Parameter(
     *         name="review",
     *         in="path",
     *         required=true,
     *         description="Review ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Review deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Review deleted successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Unauthorized to delete this review",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function delete(Request $request, Review $review): JsonResponse
    {
        $user = $request->user();

        if ($review->user_id !== $user->user_id && !$user->is_admin) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to delete this review.'
            ], 403);
        }

        $review->delete();

        return response()->json([
            'success' => true,
            'message' => 'Review deleted successfully'
        ]);
    }
   
}
