<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TmdbSeriesService;
use App\Transformers\SeriesTransformer;
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
     * Obtiene todas las series trending
     *
     * @return JsonResponse
     */
    public function getTrendingSeries(): JsonResponse
    {

        try {

            $series = $this->tmdbSeriesService->getTrendingSeries();
            $series = $series['results'];
            $series = SeriesTransformer::transformCollection($series);
            return response()->json(['success' => true, 'data' => $series]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }





    /**
     * Obtiene las series mejor valoradas
     *
     * @return JsonResponse
     */
    public function getTopRatedSeries(): JsonResponse
    {
        try {
            $series = $this->tmdbSeriesService->getTopRatedSeries();
            $series = $series['results'];
            $series = SeriesTransformer::transformCollection($series);

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

    /**
     * Obtiene las series que se están estrenando en cines
     *
     * @return JsonResponse
     */
    public function getSeriesOnTheAir(): JsonResponse
    {
        try {
            $series = $this->tmdbSeriesService->getSeriesOnTheAir();
            $series = $series['results'];
            $series = SeriesTransformer::transformCollection($series);

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

    /**
     * Obtiene todas las series de un género
     *
     * @param int $genreId ID del género
     * @return JsonResponse
     */
    public function getSeriesByGenre(int $genreId): JsonResponse
    {
        try {
            $series = $this->tmdbSeriesService->getSeriesByGenre($genreId);
            $series = $series['results'];
            $series = SeriesTransformer::transformCollection($series);

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
