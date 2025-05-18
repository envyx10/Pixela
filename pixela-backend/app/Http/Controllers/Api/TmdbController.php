<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TmdbService;
use App\Transformers\TmdbTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Exception;

/**
 * @OA\Tag(
 *     name="TMDB",
 *     description="General TMDB operations - categories and trending content"
 * )
 */
class TmdbController extends Controller
{
    protected TmdbService $tmdbService;

    public function __construct(TmdbService $tmdbService)
    {
        $this->tmdbService = $tmdbService;
    }

    private function paginatedResponse(array $data, int $page): JsonResponse
    {
        return response()->json([
            'success' => true,
            'page' => $page,
            'total_pages' => $data['total_pages'] ?? null,
            'total_results' => $data['total_results'] ?? null,
            'data' => TmdbTransformer::transformCollection($data['results'] ?? [])
        ]);
    }
    
    /**
     * @OA\Get(
     *     path="/api/tmdb/categories",
     *     summary="Get all categories/genres",
     *     description="Returns the complete list of categories/genres available in TMDB",
     *     operationId="getAllCategories",
     *     tags={"TMDB"},
     *     @OA\Response(
     *         response=200,
     *         description="Categories list retrieved successfully",
     *         @OA\JsonContent(ref="#/components/schemas/CategoryResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function getAllCategories(): JsonResponse
    {
        try {
            $categories = $this->tmdbService->getAllCategories();

            return response()->json([
                'success' => true,
                'data' => $categories['genres'] ?? []
            ]);
            
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/tmdb/trending",
     *     summary="Get trending content",
     *     description="Returns a paginated list of movies and series that are trending",
     *     operationId="getAllTrending",
     *     tags={"TMDB"},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         required=false,
     *         description="Page number (default: 1)",
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Trending content list retrieved successfully",
     *         @OA\JsonContent(
     *             allOf={
     *                 @OA\Schema(ref="#/components/schemas/PaginatedResponse"),
     *                 @OA\Schema(
     *                     @OA\Property(
     *                         property="data",
     *                         type="array",
     *                         @OA\Items(
     *                             @OA\Property(property="id", type="integer", example=550),
     *                             @OA\Property(property="title", type="string", example="Fight Club"),
     *                             @OA\Property(property="overview", type="string"),
     *                             @OA\Property(property="poster_path", type="string", nullable=true),
     *                             @OA\Property(property="backdrop_path", type="string", nullable=true),
     *                             @OA\Property(property="release_date", type="string", format="date", nullable=true),
     *                             @OA\Property(property="vote_average", type="number", format="float", example=8.4),
     *                             @OA\Property(property="media_type", type="string", enum={"movie", "tv"})
     *                         )
     *                     )
     *                 )
     *             }
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function getAllTrending(Request $request): JsonResponse
    {
        try {
            $page = $request->get('page', 1);
            $trending = $this->tmdbService->getAllTrending($page);
            
            return $this->paginatedResponse($trending, $page);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}