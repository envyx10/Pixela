<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TmdbMovieService;
use App\Transformers\MovieTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Exception;

/**
 * @OA\Tag(
 *     name="Movies",
 *     description="Movie operations - search, details and metadata"
 * )
 */

class MovieController extends Controller
{
    protected TmdbMovieService $tmdbMovieService;

    public function __construct(TmdbMovieService $tmdbMovieService)
    {
        $this->tmdbMovieService = $tmdbMovieService;
    }

    /**
     * Returns a paginated response
     *
     * @param array $movies
     * @param int $page
     * @return JsonResponse
     */
    private function paginatedResponse(array $movies, int $page)
    {
        return response()->json([
            'success' => true,
            'page' => $page,
            'total_pages' => $movies['total_pages'] ?? null,
            'total_results' => $movies['total_results'] ?? null,
            'data' => MovieTransformer::transformCollection($movies['results'] ?? [])
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/movies/{movieId}",
     *     summary="Get movie details",
     *     description="Get detailed information about a specific movie by its ID",
     *     operationId="getMovieDetails",
     *     tags={"Movies"},
     *     @OA\Parameter(
     *         name="movieId",
     *         in="path",
     *         required=true,
     *         description="Movie ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Movie details retrieved successfully",
     *         @OA\JsonContent(ref="#/components/schemas/MovieDetailResponse")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Movie not found",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function getMovieDetails(Request $request, int $movieId): JsonResponse
    {
        try {
            $movieDetails = $this->tmdbMovieService->getMovieById($movieId);
            
            if (!$movieDetails) {
                return response()->json([
                    'success' => false,
                    'message' => 'Movie not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $movieDetails
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
     *     path="/api/movies/trending",
     *     summary="Get trending movies",
     *     description="Returns a paginated list of trending movies",
     *     operationId="getTrendingMovies",
     *     tags={"Movies"},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         required=false,
     *         description="Page number (default: 1)",
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Trending movies list",
     *         @OA\JsonContent(ref="#/components/schemas/PaginatedMovieResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function getTrendingMovies(Request $request): JsonResponse
    {
        try {
            $page = $request->get('page', 1);
            $movies = $this->tmdbMovieService->getTrendingMovies($page);
            
            return $this->paginatedResponse($movies, $page);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);

        }   
    }

    /**
     * @OA\Get(
     *     path="/api/movies/top-rated",
     *     summary="Get top rated movies",
     *     description="Returns a paginated list of top rated movies",
     *     operationId="getTopRatedMovies",
     *     tags={"Movies"},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         required=false,
     *         description="Page number (default: 1)",
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Top rated movies list",
     *         @OA\JsonContent(ref="#/components/schemas/PaginatedMovieResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function getTopRatedMovies(Request $request): JsonResponse
    {
        try {
            $page = $request->get('page', 1);
            $movies = $this->tmdbMovieService->getTopRatedMovies($page);
            
            return $this->paginatedResponse($movies, $page);
            
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/movies/discover",
     *     summary="Discover movies",
     *     description="Returns a paginated list of discovered movies",
     *     operationId="getDiscoveredMovies",
     *     tags={"Movies"},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         required=false,
     *         description="Page number (default: 1)",
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Discovered movies list",
     *         @OA\JsonContent(ref="#/components/schemas/PaginatedMovieResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function getDiscoveredMovies(Request $request): JsonResponse
    {
        try {
            $page = $request->get('page', 1);
            $movies = $this->tmdbMovieService->getAllDiscoveredMovies($page);
            
            return $this->paginatedResponse($movies, $page);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/movies/now-playing",
     *     summary="Get now playing movies",
     *     description="Returns a paginated list of movies currently in theaters",
     *     operationId="getMovieNowPlaying",
     *     tags={"Movies"},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         required=false,
     *         description="Page number (default: 1)",
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Now playing movies list",
     *         @OA\JsonContent(ref="#/components/schemas/PaginatedMovieResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function getMovieNowPlaying(Request $request): JsonResponse
    {
        try {
            $page = $request->get('page', 1);
            $movies = $this->tmdbMovieService->getMovieNowPlaying($page);
            
            return $this->paginatedResponse($movies, $page);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/movies/genre/{genreId}",
     *     summary="Get movies by genre",
     *     description="Returns a paginated list of movies for a specific genre",
     *     operationId="getMovieByGenre",
     *     tags={"Movies"},
     *     @OA\Parameter(
     *         name="genreId",
     *         in="path",
     *         required=true,
     *         description="Genre ID",
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
     *         description="Movies list for the specified genre",
     *         @OA\JsonContent(ref="#/components/schemas/PaginatedMovieResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function getMovieByGenre(Request $request, int $genreId): JsonResponse
    {
        try {
            $page = $request->get('page', 1);
            $movies = $this->tmdbMovieService->getMovieByGenre($genreId, $page);
            
            return $this->paginatedResponse($movies, $page);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }       

    /**
     * @OA\Get(
     *     path="/api/movies/{movieId}/cast",
     *     summary="Get movie cast",
     *     description="Returns the cast and crew list for a specific movie",
     *     operationId="getMovieCast",
     *     tags={"Movies"},
     *     @OA\Parameter(
     *         name="movieId",
     *         in="path",
     *         required=true,
     *         description="Movie ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Movie cast and crew",
     *         @OA\JsonContent(ref="#/components/schemas/MovieCastResponse")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Movie not found",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function getMovieCast(int $movieId): JsonResponse
    {
        try {
            $castData = $this->tmdbMovieService->getMovieCast($movieId); 
            
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
     *     path="/api/movies/{movieId}/videos",
     *     summary="Get movie videos",
     *     description="Returns videos (trailers, teasers, etc.) associated with a movie",
     *     operationId="getMovieVideos",
     *     tags={"Movies"},
     *     @OA\Parameter(
     *         name="movieId",
     *         in="path",
     *         required=true,
     *         description="Movie ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Movie videos",
     *         @OA\JsonContent(ref="#/components/schemas/MovieVideoResponse")
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
    public function getMovieVideos(int $movieId): JsonResponse
    {
        try {
            $videos = $this->tmdbMovieService->getMovieVideos($movieId);
            
            if (!$videos) {
                return response()->json([
                    'success' => false,
                    'message' => 'No videos found for this movie'
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
     *     path="/api/movies/{movieId}/watch-providers",
     *     summary="Get streaming providers",
     *     description="Returns streaming platforms where the movie is available",
     *     operationId="getMovieWatchProviders",
     *     tags={"Movies"},
     *     @OA\Parameter(
     *         name="movieId",
     *         in="path",
     *         required=true,
     *         description="Movie ID",
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
     *         @OA\JsonContent(ref="#/components/schemas/MovieProvidersResponse")
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
    public function getMovieWatchProviders(int $movieId, Request $request): JsonResponse
    {
        try {
            $region = $request->get('region', 'ES');
            $providers = $this->tmdbMovieService->getMovieWatchProviders($movieId, $region);
            
            if (!$providers || empty($providers['results'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'No streaming providers found for this movie'
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
     *     path="/api/movies/{movieId}/creator",
     *     summary="Get movie creator",
     *     description="Returns information about the movie's creator/director",
     *     operationId="getMovieCreator",
     *     tags={"Movies"},
     *     @OA\Parameter(
     *         name="movieId",
     *         in="path",
     *         required=true,
     *         description="Movie ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Creator information retrieved successfully",
     *         @OA\JsonContent(ref="#/components/schemas/MovieCreatorResponse")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Movie not found",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function getMovieCreator(int $movieId): JsonResponse
    {
        try {
            $creatorData = $this->tmdbMovieService->getMovieCreator($movieId); 
            
            return response()->json([
                'success' => true,
                'data' => $creatorData 
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
     *     path="/api/movies/{movieId}/images",
     *     summary="Get movie images",
     *     description="Returns a collection of images associated with the movie (posters, backdrops, etc.)",
     *     operationId="getMovieImages",
     *     tags={"Movies"},
     *     @OA\Parameter(
     *         name="movieId",
     *         in="path",
     *         required=true,
     *         description="Movie ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Images retrieved successfully",
     *         @OA\JsonContent(ref="#/components/schemas/MovieImagesResponse")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Movie not found",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function getMovieImages(int $movieId): JsonResponse
    {
        try {
            $images = $this->tmdbMovieService->getMovieImages($movieId);
            
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
     *     path="/api/movies/{movieId}/reviews",
     *     summary="Get movie reviews",
     *     description="Returns reviews and ratings associated with the movie",
     *     operationId="getMovieReviews",
     *     tags={"Movies"},
     *     @OA\Parameter(
     *         name="movieId",
     *         in="path",
     *         required=true,
     *         description="Movie ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Reviews retrieved successfully",
     *         @OA\JsonContent(ref="#/components/schemas/MovieReviewsResponse")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Movie not found",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function getMovieReviews(int $movieId): JsonResponse
    {
        try {
            $reviews = $this->tmdbMovieService->getMovieReviews($movieId);
            
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
