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

    /**
     * Obtiene todas las series populares
     *
     * @return JsonResponse
     */
    public function getAllPopularSeries(): JsonResponse
    {
        try {
            $series = $this->tmdbSeriesService->getAllPopularSeries();
            $series = $series['results'];   

            $series = array_map(function($series) {
                return [
                    'id' => $series['id'],
                    'title' => $series['name'],
                    'poster_path' => $series['poster_path'],
                    'first_air_date' => $series['first_air_date'],
                    'vote_average' => $series['vote_average'],
                    'vote_count' => $series['vote_count'],
                    'overview' => $series['overview'],
                    'genres' => $series['genre_ids']
                ];
            }, $series);
        
            return response()->json([
                'success' => true,
                'data' => $series
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);

        }
    }

}