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
     * Obtains the details of a series by its ID
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
     * Obtain the list of popular series
     *
     * @return JsonResponse
     */
    public function getTrendingSeries(): JsonResponse
    {
        try {
            $series = $this->tmdbSeriesService->getTrendingSeries();
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
     * Obtain the list of top-rated series
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
     * Obtain the list of series currently airing
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
     * Obtain the list of series by genre
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

    /**
     * Obtiene los actores de una serie por su ID
     *
     * @param int $seriesId ID de la serie
     * @return JsonResponse
     */
    public function getSeriesCast(int $seriesId): JsonResponse
    {
        try {
            $castData = $this->tmdbSeriesService->getSeriesCast($seriesId); 
            
            return response()->json([
                'success' => true,
                'data' => $castData 
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtiene los videos (trailers) de una serie por su ID
     *
     * @param int $seriesId ID de la serie
     * @return JsonResponse
     */
    public function getSeriesVideos(int $seriesId): JsonResponse
    {
        try {
            $videos = $this->tmdbSeriesService->getSeriesVideos($seriesId);
            
            if (!$videos) {
                return response()->json([
                    'success' => false,
                    'message' => 'No videos found for this series'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $videos
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtiene las plataformas de streaming donde se puede ver una serie
     *
     * @param int $seriesId ID de la serie
     * @param Request $request
     * @return JsonResponse
     */
    public function getSeriesWatchProviders(int $seriesId, Request $request): JsonResponse
    {
        try {
            $region = $request->get('region', 'ES');
            $providers = $this->tmdbSeriesService->getSeriesWatchProviders($seriesId, $region);
            
            if (!$providers || empty($providers['results'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'No streaming providers found for this series'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $providers
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

}