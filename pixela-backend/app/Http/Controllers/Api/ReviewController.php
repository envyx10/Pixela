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
 *     description="Operaciones relacionadas con reseñas de películas y series"
 * )
 */

class ReviewController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/reviews",
     *     summary="Añadir una nueva reseña",
     *     description="Crea una nueva reseña para una película o serie",
     *     operationId="addReview",
     *     tags={"Reviews"},
     *     security={{ "sanctum": {} }},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/ReviewRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Reseña creada exitosamente",
     *         @OA\JsonContent(ref="#/components/schemas/ReviewResponse")
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="La reseña ya existe o datos inválidos",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="No autenticado",
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
            'review'    => 'nullable|string'
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
     *     summary="Actualizar una reseña",
     *     description="Actualiza una reseña existente",
     *     operationId="updateReview",
     *     tags={"Reviews"},
     *     security={{ "sanctum": {} }},
     *     @OA\Parameter(
     *         name="review",
     *         in="path",
     *         required=true,
     *         description="ID de la reseña",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/ReviewUpdateRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Reseña actualizada exitosamente",
     *         @OA\JsonContent(ref="#/components/schemas/ReviewResponse")
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="No autorizado para actualizar esta reseña",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="No autenticado",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function update(Request $request, Review $review): JsonResponse
    {
        $user = $request->user();

        if ($review->user_id !== $user->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to update this review.'
            ], 403);
        }

        $data = $request->validate([
            'rating'    => 'required|numeric|min:0|max:10',
            'review'    => 'nullable|string'
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
     *     path="/api/reviews",
     *     summary="Listar reseñas del usuario",
     *     description="Obtiene todas las reseñas del usuario autenticado",
     *     operationId="listReviews",
     *     tags={"Reviews"},
     *     security={{ "sanctum": {} }},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de reseñas recuperada exitosamente",
     *         @OA\JsonContent(ref="#/components/schemas/ReviewListResponse")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="No autenticado",
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
     *     summary="Eliminar una reseña",
     *     description="Elimina una reseña específica",
     *     operationId="deleteReview",
     *     tags={"Reviews"},
     *     security={{ "sanctum": {} }},
     *     @OA\Parameter(
     *         name="review",
     *         in="path",
     *         required=true,
     *         description="ID de la reseña",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Reseña eliminada exitosamente",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Review deleted successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="No autorizado para eliminar esta reseña",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="No autenticado",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function delete(Request $request, Review $review): JsonResponse
    {
        $user = $request->user();

        if ($review->user_id !== $user->user_id) {
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
