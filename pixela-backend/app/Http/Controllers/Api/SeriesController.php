<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TmdbSeriesService;
use App\Transformers\SeriesTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Exception;

/**
 * @OA\Tag(
 *     name="Series",
 *     description="Operations related to TV series - search, details, and metadata"
 * )
 */
class SeriesController extends Controller
{
    protected TmdbSeriesService $tmdbSeriesService;

    public function __construct(TmdbSeriesService $tmdbSeriesService)
    {
        $this->tmdbSeriesService = $tmdbSeriesService;
    }

    /**
     * Returns a paginated response
     *
     * @param array $series
     * @param int $page
     * @return JsonResponse
     */
    private function paginatedResponse(array $series, int $page)
    {
        return response()->json([
            'success' => true,
            'page' => $page,
            'total_pages' => $series['total_pages'] ?? null,
            'total_results' => $series['total_results'] ?? null,
            'data' => SeriesTransformer::transformCollection($series['results'] ?? [])
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/series/{seriesId}",
     *     summary="Get TV series details",
     *     description="Retrieves detailed information about a specific TV series by its ID",
     *     operationId="getSeriesDetails",
     *     tags={"Series"},
     *     @OA\Parameter(
     *         name="seriesId",
     *         in="path",
     *         required=true,
     *         description="ID of the TV series",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="TV series details retrieved successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", ref="#/components/schemas/SeriesDetails")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="TV series not found",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
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
     * @OA\Get(
     *     path="/api/series/trending",
     *     summary="Get trending TV series",
     *     description="Returns a paginated list of trending TV series",
     *     operationId="getTrendingSeries",
     *     tags={"Series"},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         required=false,
     *         description="Page number (default: 1)",
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of trending TV series",
     *         @OA\JsonContent(ref="#/components/schemas/PaginatedSeriesResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function getTrendingSeries(Request $request): JsonResponse
    {
        try {
            $page = $request->get('page', 1);
            $series = $this->tmdbSeriesService->getTrendingSeries($page);

            return $this->paginatedResponse($series, $page);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);

        }
    }

    /**
     * @OA\Get(
     *     path="/api/series/top-rated",
     *     summary="Get top-rated TV series",
     *     description="Returns a paginated list of top-rated TV series",
     *     operationId="getTopRatedSeries",
     *     tags={"Series"},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         required=false,
     *         description="Page number (default: 1)",
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of top-rated TV series",
     *         @OA\JsonContent(ref="#/components/schemas/PaginatedSeriesResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function getTopRatedSeries(Request $request): JsonResponse
    {
        try {
            $page = $request->get('page', 1);
            $series = $this->tmdbSeriesService->getTopRatedSeries($page);

            return $this->paginatedResponse($series, $page);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/series/on-the-air",
     *     summary="Get TV series currently on air",
     *     description="Returns a paginated list of TV series currently airing",
     *     operationId="getSeriesOnTheAir",
     *     tags={"Series"},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         required=false,
     *         description="Page number (default: 1)",
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of TV series currently on air",
     *         @OA\JsonContent(ref="#/components/schemas/PaginatedSeriesResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function getSeriesOnTheAir(Request $request): JsonResponse
    {
        try {
            $page = $request->get('page', 1);
            $series = $this->tmdbSeriesService->getSeriesOnTheAir($page);

            return $this->paginatedResponse($series, $page);
            
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/series/discover",
     *     summary="Discover TV series",
     *     description="Returns a paginated list of discovered TV series",
     *     operationId="getDiscoveredSeries",
     *     tags={"Series"},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         required=false,
     *         description="Page number (default: 1)",
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of discovered TV series",
     *         @OA\JsonContent(ref="#/components/schemas/PaginatedSeriesResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function getDiscoveredSeries(Request $request): JsonResponse
    {
        try {
            $page = $request->get('page', 1);
            $series = $this->tmdbSeriesService->getAllDiscoveredSeries($page);

            return $this->paginatedResponse($series, $page);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/series/genre/{genreId}",
     *     summary="Get TV series by genre",
     *     description="Returns a paginated list of TV series for a specific genre",
     *     operationId="getSeriesByGenre",
     *     tags={"Series"},
     *     @OA\Parameter(
     *         name="genreId",
     *         in="path",
     *         required=true,
     *         description="ID of the genre",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         required=false,
     *         description="Page number (default: 1)",
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of TV series for the specified genre",
     *         @OA\JsonContent(ref="#/components/schemas/PaginatedSeriesResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function getSeriesByGenre(Request $request, int $genreId): JsonResponse
    {
        try {
            $page = $request->get('page', 1);
            $series = $this->tmdbSeriesService->getSeriesByGenre($genreId, $page);

            return $this->paginatedResponse($series, $page);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }   

    /**
     * @OA\Get(
     *     path="/api/series/{seriesId}/cast",
     *     summary="Get TV series cast",
     *     description="Returns the cast list of a specific TV series",
     *     operationId="getSeriesCast",
     *     tags={"Series"},
     *     @OA\Parameter(
     *         name="seriesId",
     *         in="path",
     *         required=true,
     *         description="ID of the TV series",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="TV series cast",
     *         @OA\JsonContent(ref="#/components/schemas/SeriesCastResponse")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="TV series not found",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
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
     * @OA\Get(
     *     path="/api/series/{seriesId}/videos",
     *     summary="Get TV series videos",
     *     description="Returns videos (trailers, teasers, etc.) associated with a TV series",
     *     operationId="getSeriesVideos",
     *     tags={"Series"},
     *     @OA\Parameter(
     *         name="seriesId",
     *         in="path",
     *         required=true,
     *         description="ID of the TV series",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="TV series videos",
     *         @OA\JsonContent(ref="#/components/schemas/SeriesVideoResponse")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No videos found",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
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
     * @OA\Get(
     *     path="/api/series/{seriesId}/watch-providers",
     *     summary="Get streaming providers",
     *     description="Returns streaming platforms where the TV series is available",
     *     operationId="getSeriesWatchProviders",
     *     tags={"Series"},
     *     @OA\Parameter(
     *         name="seriesId",
     *         in="path",
     *         required=true,
     *         description="ID of the TV series",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="region",
     *         in="query",
     *         required=false,
     *         description="Region code (default: ES)",
     *         @OA\Schema(type="string", default="ES")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Streaming providers found",
     *         @OA\JsonContent(ref="#/components/schemas/SeriesProvidersResponse")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No providers found",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
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

    /**
     * @OA\Get(
     *     path="/api/series/{seriesId}/images",
     *     summary="Get TV series images",
     *     description="Returns images associated with a TV series (posters, backdrops, etc.)",
     *     operationId="getSeriesImages",
     *     tags={"Series"},
     *     @OA\Parameter(
     *         name="seriesId",
     *         in="path",
     *         required=true,
     *         description="ID of the TV series",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="TV series images",
     *         @OA\JsonContent(ref="#/components/schemas/SeriesImagesResponse")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="TV series not found",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function getSeriesImages(int $seriesId): JsonResponse
    {
        try {
            $images = $this->tmdbSeriesService->getSeriesImages($seriesId);
            
            return response()->json([
                'success' => true,
                'data' => $images
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
     *     path="/api/series/{seriesId}/reviews",
     *     summary="Get TV series reviews",
     *     description="Returns reviews and ratings associated with a TV series",
     *     operationId="getSeriesReviews",
     *     tags={"Series"},
     *     @OA\Parameter(
     *         name="seriesId",
     *         in="path",
     *         required=true,
     *         description="ID of the TV series",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="TV series reviews",
     *         @OA\JsonContent(ref="#/components/schemas/SeriesReviewsResponse")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="TV series not found",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function getSeriesReviews(int $seriesId): JsonResponse
    {
        try {
            $reviews = $this->tmdbSeriesService->getSeriesReviews($seriesId);
            
            return response()->json([
                'success' => true,
                'data' => $reviews
            ]);
            
        } catch (Exception $e) {
            return response()->json([
                'success' => false, 
                'message' => $e->getMessage()
            ], 500);
        }
    }

}