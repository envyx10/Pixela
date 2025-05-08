<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TmdbMovieService;
use App\Transformers\MovieTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Exception;

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
     * Obtain the details of a movie by its ID
     *
     * @param Request $request
     * @param int $movieId ID de la película
     * @return JsonResponse
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
     * Obtain the list of movies that are trending
     *
     * @return JsonResponse
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
     * Obtain the list of movies that are popular
     *
     * @return JsonResponse
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
     * Obtain the list of all discovered movies
     *
     * @return JsonResponse
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
     * Obtain the list of movies that are now playing
     *
     * @return JsonResponse
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
     * Obtain the list of movies by genre
     *
     * @param int $genreId ID del género
     * @return JsonResponse
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
     * Obtiene los actores de una película por su ID
     *
     * @param int $movieId ID de la película
     * @return JsonResponse
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
     * Obtiene los videos (trailers) de una película por su ID
     *
     * @param int $movieId ID de la película
     * @return JsonResponse
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
     * Obtiene las plataformas de streaming donde se puede ver una película
     *
     * @param int $movieId ID de la película
     * @param Request $request
     * @return JsonResponse
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
     * Obtiene el creador de una película por su ID
     *
     * @param int $movieId ID de la película
     * @return JsonResponse
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
     * Obtiene las imágenes de una película por su ID
     *
     * @param int $movieId ID de la película
     * @return JsonResponse
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
}
