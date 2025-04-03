<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TmdbMovieService;
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

            $movies = array_map(function($movie) {
                return [
                    'id' => $movie['id'],
                    'title' => $movie['title'],
                    'poster_path' => $movie['poster_path'],
                    'release_date' => $movie['release_date'],
                    'vote_average' => $movie['vote_average'],
                    'vote_count' => $movie['vote_count'],
                    'overview' => $movie['overview'],
                    'genres' => $movie['genre_ids']
                ];
            }, $movies);
            
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
