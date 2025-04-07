<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    /**
     * Agrega una película o serie a los favoritos del usuario
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function addFavorite(Request $request)
    {
        $request->validate([
            'tmdb_id' => 'required|integer',
            'item_type' => 'required|string',
        ]);

        try {
            $favorite = Favorite::create([
                'user_id' => Auth::user()->id,
                'tmdb_id' => $request->tmdb_id,
                'item_type' => $request->item_type,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Favorite item added successfully',
                    'data' => $favorite
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error adding favorite item',
                'error' => $e->getMessage()
            ], 500);
        }

    }

    /**
     * Elimina una película o serie de los favoritos del usuario
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function removeFavorite(Request $request)
    {
        $request->validate([
            'tmdb_id' => 'required|integer',
            'item_type' => 'required|string',
        ]);

        try {
            $favorite = Favorite::where('user_id', Auth::user()->id)
                ->where('tmdb_id', $request->tmdb_id)
                ->where('item_type', $request->item_type)
                ->first();

            if (!$favorite) {
                return response()->json([
                    'success' => false, 
                    'message' => 'Favorite item not found'
                ], 404);
            }

            $favorite->delete();

            return response()->json([
                'success' => true,
                'message' => 'Favorite item removed successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error removing favorite item',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtiene todos los favoritos del usuario
     * 
     * @return JsonResponse
     */
    public function getFavorites()
    {
        try {
            $favorites = Auth::user()->favorites;

            return response()->json([
                'success' => true,
                'message' => 'Favorites retrieved successfully',
                'data' => $favorites
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving favorites',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtiene todos los favoritos del usuario por tipo
     * 
     * @param string $itemType
     * @param int $tmdbId
     * @return JsonResponse
     */
    public function getFavoritesByType($itemType, $tmdbId)
    {
        try {
            $favorites = Auth::user()->favorites->where('item_type', $itemType)
                ->where('tmdb_id', $tmdbId)
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Favorites retrieved successfully',
                'data' => $favorites
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving favorites',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
}