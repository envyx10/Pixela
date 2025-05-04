<?php


namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class ReviewController extends Controller
{
    /**
     * Add a review for a movie or series
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function add(Request $request)
    {
        $data = $request->validate([
            'item_type' => 'required|in:movie,series',
            'tmdb_id'   => 'required|integer',
            'rating'    => 'required|integer|min:1|max:10',
            'review'    => 'nullable|string'
        ]);


        $user = $request->user();


        $exists = $user->reviews()
                    ->where('item_type', $data['item_type'])
                    ->where('tmdb_id', $data['tmdb_id'])
                    ->exists();


        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Review already exists'
            ], 400);
        }


        $review = $user->reviews()->create($data);


        return response()->json([
            'success' => true,
            'message' => 'Review added successfully',
            'data'    => $review
        ], 201);
    }


    /**
     * Update a review
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request, Review $review)
    {
        $user = $request->user();


        if ($review->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to update this review.'
            ], 403);
        }


        $data = $request->validate([
            'rating'    => 'required|integer|min:1|max:10',
            'review'    => 'nullable|string'
        ]);




        $review->update($data);


        return response()->json([
            'success' => true,
            'message' => 'Review updated successfully',
            'data'    => $review
        ], 200);
    }


    /**
     * Lists all reviews of the user
     *
     * @return JsonResponse
     */
    public function list(Request $request)
    {
        $user = $request->user();


        $reviews = $user->reviews;


        return response()->json([
            'success' => true,
            'message' => 'Reviews retrieved successfully',
            'data'    => $reviews
        ], 200);
    }


    /**
     * Remove a review
     *
     * @param int $id
     * @return JsonResponse
     */
    public function delete(Request $request, Review $review)
    {
        $user = $request->user();


        if ($review->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to delete this review.'
            ], 403);
        }


        $review->delete();


        return response()->json([
            'success' => true,
            'message' => 'Review deleted successfully'
        ]);
    }
   
}
