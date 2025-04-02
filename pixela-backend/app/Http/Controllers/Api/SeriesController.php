<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TmdbSeriesService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Exception;

class SeriesController extends Controller
{
    protected TmdbSeriesService $tmdbSeriesService;

    public function __construct(TmdbSeriesService $tmdbSeriesService)
    {
        $this->tmdbSeriesService = $tmdbSeriesService;
    }

    /**
     * Obtiene los detalles de una serie por su ID
     *
     * @param Request $request
     * @param int $seriesId ID de la serie
     * @return JsonResponse
     */
    public function getSeriesDetails(Request $request, int $seriesId): JsonResponse
    {
        try {
            $seriesDetails = $this->tmdbSeriesService->getSeriesById($seriesId);
            
            if (!$seriesDetails) {
                return response()->json([
                    'success' => false,
                    'message' => 'Series not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $seriesDetails
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

}

