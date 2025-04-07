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
     * Obtiene los detalles de una película por su ID
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
     * Obtiene todas las películas populares
     *
     * @return JsonResponse
     */
    public function getAllPopularMovies(): JsonResponse
    {
        try {
            $movies = $this->tmdbMovieService->getAllPopularMovies();
            $movies = $movies['results'];
            $movies = MovieTransformer::transformCollection($movies);
            
            return response()->json([
                'success' => true,
                'data' => $movies
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);

        }   
    }

    /**
     * Obtiene las películas mejor valoradas
     *
     * @return JsonResponse
     */
    public function getTopRatedMovies(): JsonResponse
    {
        try {
            $movies = $this->tmdbMovieService->getTopRatedMovies();
            $movies = $movies['results'];
            $movies = MovieTransformer::transformCollection($movies);

            return response()->json([
                'success' => true,
                'data' => $movies
            ]);
            
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtiene las películas que se están estrenando en cines
     *
     * @return JsonResponse
     */
    public function getMovieNowPlaying(): JsonResponse
    {
        try {
            $movies = $this->tmdbMovieService->getMovieNowPlaying();
            $movies = $movies['results'];
            $movies = MovieTransformer::transformCollection($movies);

            return response()->json([
                'success' => true,
                'data' => $movies
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtiene todas las películas de un género
     *
     * @param int $genreId ID del género
     * @return JsonResponse
     */
    public function getMovieByGenre(int $genreId): JsonResponse
    {
        try {
            $movies = $this->tmdbMovieService->getMovieByGenre($genreId);
            $movies = $movies['results'];
            $movies = MovieTransformer::transformCollection($movies);

            return response()->json([
                'success' => true,
                'data' => $movies
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }       
    
}
