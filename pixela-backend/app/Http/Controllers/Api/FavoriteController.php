<?php


namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;    
use Illuminate\Support\Facades\Cache;
use GuzzleHttp\Client;
use Illuminate\Http\JsonResponse;
class FavoriteController extends Controller
{
    /**
     * Add a movie or series to the user's favorites list
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function add(Request $request): JsonResponse
    {
        $data = $request->validate([
            'tmdb_id'   => 'required|integer',
            'item_type' => 'required|string|in:movie,series',
        ]);

        $user = $request->user();

        $exists = $user->favorites()
                    ->where('tmdb_id', $request->tmdb_id)
                    ->where('item_type', $request->item_type)
                    ->exists();
       
        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Favorite item already exists'
            ], 400);
        }

        $favorite = $user->favorites()->create($data);

        return response()->json([
            'success' => true,
            'message' => 'Favorite item added successfully',
            'data'    => $favorite
        ], 201);
    }

    /**
     * Remove a movie or series from the user's favorites list
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function delete(Request $request, Favorite $favorite): JsonResponse
    {
        $user = $request->user();

        if ($favorite->user_id !== $user->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to delete this favorite.',
                'favorite_id' => $favorite->favorite_id,
                'favorite_user_id' => $favorite->user_id,
                'user_id' => $user->user_id,
            ], 403);
        }

        $favorite->delete();

        return response()->json([
            'success' => true,
            'message' => 'Favorite item removed successfully'
        ], 200);
    }

    /**
     * Obtain all favorites of the user with details
     *
     * @return JsonResponse
     */
    public function listWithDetails(Request $request): JsonResponse
    {
        $user = $request->user();
        $favorites = $user->favorites;

        $apiKey = env('TMDB_API_KEY');
        $language = 'es-ES';

        $client = new Client();

        $detailedFavorites = $favorites->map(function ($fav) use ($client, $apiKey, $language) {
            $tmdbId = $fav->tmdb_id;
            $type = $fav->item_type;

            $cacheKey = "tmdb_{$type}_{$tmdbId}_{$language}";

            $details = Cache::remember($cacheKey, now()->addHours(12), function () use ($client, $type, $tmdbId, $apiKey, $language) {
                $url = $type === 'movie'
                    ? "https://api.themoviedb.org/3/movie/{$tmdbId}"
                    : "https://api.themoviedb.org/3/tv/{$tmdbId}";

                try {
                    $response = $client->request('GET', $url, [
                        'query' => [
                            'api_key' => $apiKey,
                            'language' => $language,
                        ],
                        'timeout' => 5,
                    ]);
                    $body = $response->getBody()->getContents();
                    return json_decode($body, true);
                } catch (\Exception $e) {
                    return null;
                }
            });

            return [
                'id' => $fav->favorite_id,
                'user_id' => $fav->user_id,
                'tmdb_id' => $fav->tmdb_id,
                'item_type' => $fav->item_type,
                'title' => $type === 'movie' ? ($details['title'] ?? null) : ($details['name'] ?? null),
                'poster_path' => $details['poster_path'] ?? null,
                'release_date' => $type === 'movie' ? ($details['release_date'] ?? null) : ($details['first_air_date'] ?? null),
            ];
        });

        return response()->json([
            'success' => true,
            'message' => 'Favorites with details retrieved successfully',
            'data' => $detailedFavorites
        ]);
    }
 
}
