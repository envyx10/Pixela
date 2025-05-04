<?php


namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;    


class FavoriteController extends Controller
{
    /**
     * Add a movie or series to the user's favorites list
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function add(Request $request)
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
     * Update a favorite item
     *
     * @param Request $request
     * @return JsonResponse
     */
    /* public function update(Request $request, Favorite $favorite)
    {
        $user = $request->user();


        if ($favorite->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to update this favorite.'
            ], 403);
        }


        $data = $request->validate([
            'tmdb_id'   => 'required|integer',
            'item_type' => 'required|string|in:movie,series',
        ]);


        $favorite->update($data);


        return response()->json([
            'success' => true,
            'message' => 'Favorite item updated successfully',
            'data'    => $favorite
        ], 200);
    } */


    /**
     * Remove a movie or series from the user's favorites list
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function delete(Request $request, Favorite $favorite)
    {
        $user = $request->user();


        if ($favorite->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to delete this favorite.'
            ], 403);
        }


        $favorite->delete();


        return response()->json([
            'success' => true,
            'message' => 'Favorite item removed successfully'
        ], 200);
    }


    /**
     * Obtain all favorites of the user
     *
     * @return JsonResponse
     */
    public function list(Request $request)
    {
        $user = $request->user();


        $favorites = $user->favorites;


        return response()->json([
            'success' => true,
            'message' => 'Favorites retrieved successfully',
            'data' => $favorites
        ], 200);
    }
 
}
