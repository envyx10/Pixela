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

}
