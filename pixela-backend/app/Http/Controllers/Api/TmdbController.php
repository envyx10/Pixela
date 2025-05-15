<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TmdbService;
use App\Transformers\TmdbTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Exception;

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
     * Get all categories/genres
     *
     * @return JsonResponse
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
     * Get all trending content
     *
     * @param Request $request
     * @return JsonResponse
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