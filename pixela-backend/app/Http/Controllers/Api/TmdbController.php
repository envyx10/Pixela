<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TmdbService;
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
 
    public function getAllCategories(): JsonResponse
    {
        try {
            $categories = $this->tmdbService->getAllCategories();

            return response()->json([
                'success' => true,
                'data' => $categories
            ]);
            
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getAllTrending(Request $request): JsonResponse
    {
        try {
            $page = $request->get('page', 1);
            $trending = $this->tmdbService->getAllTrending($page);

            return response()->json([
                'success' => true,
                'data' => $trending
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}