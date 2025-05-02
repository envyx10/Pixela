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
    public function getTrendingMovies(): JsonResponse
    {
        try {
            $movies = $this->tmdbMovieService->getTrendingMovies();
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
     * Obtain the list of movies that are popular
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
     * Obtain the list of movies that are now playing
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
     * Obtain the list of movies by genre
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
